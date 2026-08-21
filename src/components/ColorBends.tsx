"use client"

import React, { useEffect, useRef } from "react"
// Three.js types are unavailable in the current project configuration.
// @ts-expect-error TS7016: no declaration file for module "three"
import * as THREE from "three"

type ColorBendsProps = {
  className?: string
  style?: React.CSSProperties

  rotation?: number
  speed?: number

  autoRotate?: number

  scale?: number
  frequency?: number
  warpStrength?: number

  mouseInfluence?: number
  parallax?: number

  noise?: number
}

const frag = `
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;

uniform vec2 uRot;

uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;

uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;

uniform float uNoise;

varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;

  // -----------------------------
  // normalized coordinates
  // -----------------------------

  vec2 p = vUv * 2.0 - 1.0;

  // subtle pointer parallax
  p += uPointer * uParallax * 0.08;

  // rotation
  vec2 rp = vec2(
    p.x * uRot.x - p.y * uRot.y,
    p.x * uRot.y + p.y * uRot.x
  );

  // correct aspect ratio
  vec2 q = vec2(
    rp.x * (uCanvas.x / uCanvas.y),
    rp.y
  );

  q /= max(uScale, 0.0001);

  // slight lens / bend
  q /= 0.65 + 0.18 * dot(q, q);

  // motion
  q.x += sin(t * 0.7) * 0.35;
  q.y += cos(t * 0.45) * 0.08;

  // -----------------------------
  // pointer influence
  // -----------------------------

  vec2 toward = uPointer - rp;

  q += toward * uMouseInfluence * 0.12;

  // -----------------------------
  // curve field
  // -----------------------------

  vec2 s = q;

  vec2 wave = sin(
    1.6 * (s.yx * uFrequency)
    + 2.2 * cos(s * uFrequency + t * 0.35)
  );

  float warpAmount = clamp(uWarpStrength, 0.0, 2.0);

  vec2 warped =
    s +
    (wave - s) *
    warpAmount *
    0.55;

  // -----------------------------
  // upper curve
  // -----------------------------

  float upperShape =
    length(
      warped +
      sin(
        4.8 * warped.y * uFrequency
        - 2.4 * t
      ) / 4.2
    );

  upperShape += warped.y * 0.42;

  float upperMask =
    1.0 -
    smoothstep(
      0.05,
      0.52,
      upperShape
    );

  // -----------------------------
  // lower curve
  // -----------------------------

  vec2 lower = warped;

  lower.x += 0.15;

  float lowerShape =
    length(
      lower +
      sin(
        5.2 * lower.y * uFrequency
        - 2.15 * t
        + 2.1
      ) / 4.0
    );

  lowerShape -= lower.y * 0.38;

  float lowerMask =
    1.0 -
    smoothstep(
      0.06,
      0.53,
      lowerShape
    );

  // -----------------------------
  // theme colors
  // -----------------------------

  // amber
  vec3 amber = vec3(
    0.961,
    0.620,
    0.043
  );

  // lighter amber edge
  vec3 amberLight = vec3(
    0.984,
    0.749,
    0.141
  );

  // cyan
  vec3 cyan = vec3(
    0.024,
    0.714,
    0.831
  );

  // lighter cyan edge
  vec3 cyanLight = vec3(
    0.133,
    0.827,
    0.933
  );

  // -----------------------------
  // color variation
  // -----------------------------

  float amberMix =
    0.5 +
    0.5 *
    sin(
      warped.x * 2.5 +
      t * 0.45
    );

  float cyanMix =
    0.5 +
    0.5 *
    cos(
      warped.x * 2.2 -
      t * 0.35
    );

  vec3 upperColor =
    mix(
      amber,
      amberLight,
      amberMix * 0.45
    );

  vec3 lowerColor =
    mix(
      cyan,
      cyanLight,
      cyanMix * 0.45
    );

  // -----------------------------
  // white background
  // -----------------------------

  vec3 bg = vec3(1.0);

  vec3 col = bg;

  // Blend amber upper curve
  col = mix(
    col,
    upperColor,
    clamp(upperMask, 0.0, 1.0)
  );

  // Blend cyan lower curve
  col = mix(
    col,
    lowerColor,
    clamp(lowerMask, 0.0, 1.0)
  );

  // -----------------------------
  // overlap glow
  // -----------------------------

  float overlap =
    upperMask *
    lowerMask;

  vec3 overlapColor =
    mix(
      amber,
      cyan,
      0.5
    );

  col = mix(
    col,
    overlapColor,
    overlap * 0.22
  );

  // -----------------------------
  // subtle noise
  // -----------------------------

  if (uNoise > 0.0001) {
    float n =
      fract(
        sin(
          dot(
            gl_FragCoord.xy +
            vec2(uTime * 20.0),
            vec2(
              12.9898,
              78.233
            )
          )
        ) *
        43758.5453123
      );

    col +=
      (n - 0.5) *
      uNoise;

    col = clamp(
      col,
      0.0,
      1.0
    );
  }

  gl_FragColor = vec4(
    col,
    1.0
  );
}
`

const vert = `
varying vec2 vUv;

void main() {
  vUv = uv;

  gl_Position = vec4(
    position,
    1.0
  );
}
`

export default function ColorBends({
  className = "",
  style,

  rotation = 0,
  speed = 0.65,

  autoRotate = 1.2,

  scale = 1.05,
  frequency = 1.1,
  warpStrength = 1.05,

  mouseInfluence = 0.65,
  parallax = 0.35,

  noise = 0.015,
}: ColorBendsProps) {
  const containerRef =
    useRef<HTMLDivElement | null>(
      null,
    )

  const rendererRef =
    useRef<THREE.WebGLRenderer | null>(
      null,
    )

  const materialRef =
    useRef<THREE.ShaderMaterial | null>(
      null,
    )

  const rafRef =
    useRef<number | null>(
      null,
    )

  const resizeObserverRef =
    useRef<ResizeObserver | null>(
      null,
    )

  const pointerTargetRef =
    useRef(
      new THREE.Vector2(0, 0),
    )

  const pointerCurrentRef =
    useRef(
      new THREE.Vector2(0, 0),
    )

  const pointerSmoothRef =
    useRef(5)

  const rotationRef =
    useRef(rotation)

  const autoRotateRef =
    useRef(autoRotate)

  useEffect(() => {
    const container =
      containerRef.current

    if (!container) return

    // -----------------------------
    // scene
    // -----------------------------

    const scene =
      new THREE.Scene()

    const camera =
      new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0,
        1,
      )

    const geometry =
      new THREE.PlaneGeometry(
        2,
        2,
      )

    const material =
      new THREE.ShaderMaterial({
        vertexShader: vert,

        fragmentShader: frag,

        uniforms: {
          uCanvas: {
            value:
              new THREE.Vector2(
                1,
                1,
              ),
          },

          uTime: {
            value: 0,
          },

          uSpeed: {
            value: speed,
          },

          uRot: {
            value:
              new THREE.Vector2(
                1,
                0,
              ),
          },

          uScale: {
            value: scale,
          },

          uFrequency: {
            value: frequency,
          },

          uWarpStrength: {
            value:
              warpStrength,
          },

          uPointer: {
            value:
              new THREE.Vector2(
                0,
                0,
              ),
          },

          uMouseInfluence: {
            value:
              mouseInfluence,
          },

          uParallax: {
            value: parallax,
          },

          uNoise: {
            value: noise,
          },
        },
      })

    materialRef.current =
      material

    const mesh =
      new THREE.Mesh(
        geometry,
        material,
      )

    scene.add(mesh)

    // -----------------------------
    // renderer
    // -----------------------------

    const renderer =
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference:
          "high-performance",
      })

    rendererRef.current =
      renderer

    renderer.outputColorSpace =
      THREE.SRGBColorSpace

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio ||
        1,
        2,
      ),
    )

    // white background
    renderer.setClearColor(
      0xffffff,
      1,
    )

    renderer.domElement.style.width =
      "100%"

    renderer.domElement.style.height =
      "100%"

    renderer.domElement.style.display =
      "block"

    container.appendChild(
      renderer.domElement,
    )

    // -----------------------------
    // resize
    // -----------------------------

    const handleResize = () => {
      const w =
        container.clientWidth || 1

      const h =
        container.clientHeight ||
        1

      renderer.setSize(
        w,
        h,
        false,
      )

        ; (
          material.uniforms.uCanvas
            .value as THREE.Vector2
        ).set(w, h)
    }

    handleResize()

    if (
      "ResizeObserver" in window
    ) {
      const observer =
        new ResizeObserver(
          handleResize,
        )

      observer.observe(container)

      resizeObserverRef.current =
        observer
    } else {
      globalThis.addEventListener(
        "resize",
        handleResize,
      )
    }

    // -----------------------------
    // pointer
    // -----------------------------

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      const rect =
        container.getBoundingClientRect()

      const x =
        ((event.clientX -
          rect.left) /
          rect.width) *
        2 -
        1

      const y =
        -(
          ((event.clientY -
            rect.top) /
            rect.height) *
          2 -
          1
        )

      pointerTargetRef.current.set(
        x,
        y,
      )
    }

    const handlePointerLeave =
      () => {
        pointerTargetRef.current.set(
          0,
          0,
        )
      }

    container.addEventListener(
      "pointermove",
      handlePointerMove,
    )

    container.addEventListener(
      "pointerleave",
      handlePointerLeave,
    )

    // -----------------------------
    // animation
    // -----------------------------

    const clock =
      new THREE.Clock()

    const loop = () => {
      const dt =
        clock.getDelta()

      const elapsed =
        clock.elapsedTime

      material.uniforms.uTime.value =
        elapsed

      const deg =
        rotationRef.current +
        autoRotateRef.current *
        elapsed

      const rad =
        (deg * Math.PI) / 180

      const c =
        Math.cos(rad)

      const s =
        Math.sin(rad)

        ; (
          material.uniforms.uRot
            .value as THREE.Vector2
        ).set(c, s)

      // smooth mouse movement
      const current =
        pointerCurrentRef.current

      const target =
        pointerTargetRef.current

      const amount =
        Math.min(
          1,
          dt *
          pointerSmoothRef.current,
        )

      current.lerp(
        target,
        amount,
      )

        ; (
          material.uniforms.uPointer
            .value as THREE.Vector2
        ).copy(current)

      renderer.render(
        scene,
        camera,
      )

      rafRef.current =
        requestAnimationFrame(loop)
    }

    rafRef.current =
      requestAnimationFrame(loop)

    // -----------------------------
    // cleanup
    // -----------------------------

    return () => {
      if (
        rafRef.current !== null
      ) {
        cancelAnimationFrame(
          rafRef.current,
        )
      }

      if (
        resizeObserverRef.current
      ) {
        resizeObserverRef.current.disconnect()
      } else {
        window.removeEventListener(
          "resize",
          handleResize,
        )
      }

      container.removeEventListener(
        "pointermove",
        handlePointerMove,
      )

      container.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      )

      geometry.dispose()

      material.dispose()

      renderer.dispose()

      if (
        renderer.domElement
          .parentElement ===
        container
      ) {
        container.removeChild(
          renderer.domElement,
        )
      }
    }
  }, [])

  // -----------------------------
  // update props
  // -----------------------------

  useEffect(() => {
    const material =
      materialRef.current

    if (!material) return

    rotationRef.current =
      rotation

    autoRotateRef.current =
      autoRotate

    material.uniforms.uSpeed.value =
      speed

    material.uniforms.uScale.value =
      scale

    material.uniforms.uFrequency.value =
      frequency

    material.uniforms.uWarpStrength.value =
      warpStrength

    material.uniforms.uMouseInfluence.value =
      mouseInfluence

    material.uniforms.uParallax.value =
      parallax

    material.uniforms.uNoise.value =
      noise
  }, [
    rotation,
    speed,
    autoRotate,
    scale,
    frequency,
    warpStrength,
    mouseInfluence,
    parallax,
    noise,
  ])

  return (
    <div
      ref={containerRef}
      className={`
        relative
        overflow-hidden
        bg-white
        ${className}
      `}
      style={style}
    />
  )
}