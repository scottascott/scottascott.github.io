"use client"

import React, { useEffect, useRef } from "react"
// three does not currently provide declarations in this project.
// @ts-expect-error Missing declaration file for module "three".
import * as THREE from "three"

type SoftBendsProps = {
  className?: string
  style?: React.CSSProperties

  speed?: number
  rotation?: number
  autoRotate?: number

  scale?: number
  frequency?: number
  warpStrength?: number

  mouseInfluence?: number
  parallax?: number

  noise?: number
}

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
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

uniform vec3 uBase;
uniform float uAccentStrength;

varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;

  // --------------------------------
  // Base coordinates
  // --------------------------------

  vec2 p = vUv * 2.0 - 1.0;

  p += uPointer * uParallax * 0.035;

  vec2 rp = vec2(
    p.x * uRot.x - p.y * uRot.y,
    p.x * uRot.y + p.y * uRot.x
  );

  vec2 q = vec2(
    rp.x * (uCanvas.x / uCanvas.y),
    rp.y
  );

  q /= max(uScale, 0.0001);

  // Very subtle lens distortion
  q /= 0.82 + 0.10 * dot(q, q);

  // Slow autonomous drift
  q.x += sin(t * 0.55) * 0.16;
  q.y += cos(t * 0.38) * 0.035;

  // --------------------------------
  // Mouse influence
  // --------------------------------

  vec2 toward = uPointer - rp;

  q += toward * uMouseInfluence * 0.055;

  // --------------------------------
  // Organic deformation
  // --------------------------------

  vec2 wave = sin(
    1.35 * (q.yx * uFrequency)
    + 1.6 * cos(q * uFrequency + t * 0.24)
  );

  vec2 warped =
    q +
    (wave - q) *
    uWarpStrength *
    0.18;

  // --------------------------------
  // Upper amber ribbon
  // --------------------------------

  float upperWave =
    sin(
      warped.x * 2.0 +
      t * 0.72
    ) * 0.11
    +
    sin(
      warped.x * 0.75 -
      t * 0.28
    ) * 0.055;

  float upperCenter =
    0.30 +
    upperWave;

  float upperDist =
    abs(
      warped.y -
      upperCenter
    );

  // Narrow band
  float upperCore =
    1.0 -
    smoothstep(
      0.025,
      0.105,
      upperDist
    );

  // Soft outer glow
  float upperGlow =
    1.0 -
    smoothstep(
      0.04,
      0.23,
      upperDist
    );

  // --------------------------------
  // Lower cyan ribbon
  // --------------------------------

  float lowerWave =
    sin(
      warped.x * 1.65 -
      t * 0.58 +
      1.8
    ) * 0.12
    +
    cos(
      warped.x * 0.62 +
      t * 0.24
    ) * 0.045;

  float lowerCenter =
    -0.31 +
    lowerWave;

  float lowerDist =
    abs(
      warped.y -
      lowerCenter
    );

  float lowerCore =
    1.0 -
    smoothstep(
      0.025,
      0.105,
      lowerDist
    );

  float lowerGlow =
    1.0 -
    smoothstep(
      0.04,
      0.23,
      lowerDist
    );

  // --------------------------------
  // Soft theme colors
  // --------------------------------

  vec3 white = uBase;

  // Soft amber
  vec3 amber = vec3(
    0.961,
    0.620,
    0.043
  );

  // Soft cyan
  vec3 cyan = vec3(
    0.024,
    0.714,
    0.831
  );

  // Move both colors strongly toward white.
  vec3 softAmber =
    mix(
      white,
      amber,
      0.52
    );

  vec3 softCyan =
    mix(
      white,
      cyan,
      0.48
    );

  // --------------------------------
  // Compose
  // --------------------------------

  vec3 col = white;

  // Glow is intentionally very faint
  col = mix(
    col,
    softAmber,
    clamp(upperGlow * 0.19 * uAccentStrength, 0.0, 1.0)
  );

  col = mix(
    col,
    softCyan,
    clamp(lowerGlow * 0.17 * uAccentStrength, 0.0, 1.0)
  );

  // Core gets slightly more color
  col = mix(
    col,
    softAmber,
    clamp(upperCore * 0.4 * uAccentStrength, 0.0, 1.0)
  );

  col = mix(
    col,
    softCyan,
    clamp(lowerCore * 0.37 * uAccentStrength, 0.0, 1.0)
  );

  // --------------------------------
  // Edge fade
  // Keep more whitespace
  // --------------------------------

  float horizontalFade =
    smoothstep(
      1.45,
      0.72,
      abs(rp.x)
    );

  float verticalFade =
    smoothstep(
      1.05,
      0.58,
      abs(rp.y)
    );

  float fade =
    horizontalFade *
    verticalFade;

  col =
    mix(
      white,
      col,
      fade
    );

  // --------------------------------
  // Very subtle grain
  // --------------------------------

  if (uNoise > 0.0001) {
    float n =
      fract(
        sin(
          dot(
            gl_FragCoord.xy +
            vec2(uTime * 5.0),
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

    col =
      clamp(
        col,
        0.0,
        1.0
      );
  }

  gl_FragColor =
    vec4(
      col,
      1.0
    );
}
`

function getThemeBase(): [number, number, number] {
  if (typeof document === "undefined") return [1, 1, 1]

  const isLight =
    document.documentElement.getAttribute("data-theme") === "light"

  return isLight
    ? [0x17 / 255, 0x13 / 255, 0x0f / 255]
    : [1, 1, 1]
}

function getAccentStrength(): number {
  if (typeof document === "undefined") return 1

  const isLight =
    document.documentElement.getAttribute("data-theme") === "light"

  return isLight ? 1.9 : 1
}

export default function SoftBends({
  className = "",
  style,

  speed = 0.65,
  rotation = 0,
  autoRotate = 0.4,

  scale = 1.15,
  frequency = 0.9,
  warpStrength = 0.65,

  mouseInfluence = 0.5,
  parallax = 0.25,

  noise = 0.006,
}: SoftBendsProps) {
  const containerRef =
    useRef<HTMLDivElement | null>(
      null
    )

  const rendererRef =
    useRef<THREE.WebGLRenderer | null>(
      null
    )

  const materialRef =
    useRef<THREE.ShaderMaterial | null>(
      null
    )

  const rafRef =
    useRef<number | null>(
      null
    )

  const resizeObserverRef =
    useRef<ResizeObserver | null>(
      null
    )

  const pointerTargetRef =
    useRef(
      new THREE.Vector2(0, 0)
    )

  const pointerCurrentRef =
    useRef(
      new THREE.Vector2(0, 0)
    )

  const rotationRef =
    useRef(rotation)

  const autoRotateRef =
    useRef(autoRotate)

  useEffect(() => {
    const container =
      containerRef.current

    if (!container) return

    const scene =
      new THREE.Scene()

    const camera =
      new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0,
        1
      )

    const geometry =
      new THREE.PlaneGeometry(
        2,
        2
      )

    const material =
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,

        uniforms: {
          uCanvas: {
            value:
              new THREE.Vector2(
                1,
                1
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
                0
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
                0
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

          uBase: {
            value:
              new THREE.Vector3(
                ...getThemeBase()
              ),
          },

          uAccentStrength: {
            value:
              getAccentStrength(),
          },
        },
      })

    materialRef.current =
      material

    const mesh =
      new THREE.Mesh(
        geometry,
        material
      )

    scene.add(mesh)

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
        2
      )
    )

    const [baseR, baseG, baseB] =
      getThemeBase()

    renderer.setClearColor(
      new THREE.Color(
        baseR,
        baseG,
        baseB
      ),
      1
    )

    renderer.domElement.style.width =
      "100%"

    renderer.domElement.style.height =
      "100%"

    renderer.domElement.style.display =
      "block"

    container.appendChild(
      renderer.domElement
    )

    const resize = () => {
      const width =
        container.clientWidth || 1

      const height =
        container.clientHeight || 1

      renderer.setSize(
        width,
        height,
        false
      )

        ; (
          material.uniforms
            .uCanvas
            .value as THREE.Vector2
        ).set(
          width,
          height
        )
    }

    resize()

    if (
      "ResizeObserver" in window
    ) {
      const observer =
        new ResizeObserver(
          resize
        )

      observer.observe(
        container
      )

      resizeObserverRef.current =
        observer
    } else {
      (window as Window).addEventListener(
        "resize",
        resize
      )
    }

    // -------------------------
    // Theme (light / dark)
    // -------------------------

    const applyTheme = () => {
      const [r, g, b] =
        getThemeBase()

        ; (
          material.uniforms
            .uBase
            .value as THREE.Vector3
        ).set(r, g, b)

      renderer.setClearColor(
        new THREE.Color(r, g, b),
        1
      )

      material.uniforms
        .uAccentStrength
        .value =
        getAccentStrength()
    }

    const themeObserver =
      new MutationObserver(
        applyTheme
      )

    themeObserver.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: [
          "data-theme",
        ],
      }
    )

    // -------------------------
    // Mouse
    // -------------------------

    const handlePointerMove = (
      event: PointerEvent
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
        y
      )
    }

    const handlePointerLeave =
      () => {
        pointerTargetRef.current.set(
          0,
          0
        )
      }

    container.addEventListener(
      "pointermove",
      handlePointerMove
    )

    container.addEventListener(
      "pointerleave",
      handlePointerLeave
    )

    // -------------------------
    // Animation
    // -------------------------

    const clock =
      new THREE.Clock()

    const animate = () => {
      const dt =
        clock.getDelta()

      const elapsed =
        clock.elapsedTime

      material.uniforms
        .uTime.value =
        elapsed

      const deg =
        rotationRef.current +
        autoRotateRef.current *
        elapsed

      const rad =
        (deg * Math.PI) /
        180

      const cos =
        Math.cos(rad)

      const sin =
        Math.sin(rad)

        ; (
          material.uniforms
            .uRot
            .value as THREE.Vector2
        ).set(
          cos,
          sin
        )

      // Smooth / weighted pointer
      const current =
        pointerCurrentRef.current

      const target =
        pointerTargetRef.current

      current.lerp(
        target,
        Math.min(
          1,
          dt * 4
        )
      )

        ; (
          material.uniforms
            .uPointer
            .value as THREE.Vector2
        ).copy(
          current
        )

      renderer.render(
        scene,
        camera
      )

      rafRef.current =
        requestAnimationFrame(
          animate
        )
    }

    rafRef.current =
      requestAnimationFrame(
        animate
      )

    return () => {
      if (
        rafRef.current !== null
      ) {
        cancelAnimationFrame(
          rafRef.current
        )
      }

      if (
        resizeObserverRef.current
      ) {
        resizeObserverRef.current.disconnect()
      } else {
        window.removeEventListener(
          "resize",
          resize
        )
      }

      container.removeEventListener(
        "pointermove",
        handlePointerMove
      )

      container.removeEventListener(
        "pointerleave",
        handlePointerLeave
      )

      themeObserver.disconnect()

      geometry.dispose()

      material.dispose()

      renderer.dispose()

      if (
        renderer.domElement
          .parentElement ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        )
      }
    }
  }, [])

  useEffect(() => {
    const material =
      materialRef.current

    if (!material) return

    rotationRef.current =
      rotation

    autoRotateRef.current =
      autoRotate

    material.uniforms
      .uSpeed.value =
      speed

    material.uniforms
      .uScale.value =
      scale

    material.uniforms
      .uFrequency.value =
      frequency

    material.uniforms
      .uWarpStrength.value =
      warpStrength

    material.uniforms
      .uMouseInfluence.value =
      mouseInfluence

    material.uniforms
      .uParallax.value =
      parallax

    material.uniforms
      .uNoise.value =
      noise
  }, [
    speed,
    rotation,
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