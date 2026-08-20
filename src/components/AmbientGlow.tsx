"use client"

import { useEffect, useRef } from "react"

type Blob = {
  x: number
  y: number
  baseRadius: number
  color: string
  speedX: number
  speedY: number
  phaseX: number
  phaseY: number
  mouseStrength: number
}

const blobs: Blob[] = [
  {
    x: 0.72,
    y: 0.28,
    baseRadius: 0.42,
    color: "69,230,201",
    speedX: 0.00045,
    speedY: 0.00032,
    phaseX: 0,
    phaseY: 1.3,
    mouseStrength: 0.13,
  },
  {
    x: 0.24,
    y: 0.76,
    baseRadius: 0.38,
    color: "230,163,74",
    speedX: 0.00033,
    speedY: 0.00048,
    phaseX: 2.1,
    phaseY: 0.4,
    mouseStrength: -0.1,
  },
]

export default function AmbientGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = canvas?.parentElement

    if (!canvas || !wrap) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    let frame = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    let mouseX = 0.5
    let mouseY = 0.5

    let smoothMouseX = 0.5
    let smoothMouseY = 0.5

    let pointerActive = false

    const resize = () => {
      const width = wrap.clientWidth
      const height = wrap.clientHeight

      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = width * dpr
      canvas.height = height * dpr

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()

      mouseX = (event.clientX - rect.left) / rect.width
      mouseY = (event.clientY - rect.top) / rect.height

      pointerActive = true
    }

    const onPointerLeave = () => {
      pointerActive = false
    }

    resize()

    window.addEventListener("resize", resize)

    wrap.addEventListener("pointermove", onPointerMove, {
      passive: true,
    })

    wrap.addEventListener("pointerleave", onPointerLeave)

    const drawBlob = (
      blob: Blob,
      index: number,
      t: number,
      width: number,
      height: number,
    ) => {
      // -----------------------------
      // 自己运动
      // -----------------------------

      const autoX =
        Math.sin(t * blob.speedX + blob.phaseX) * 0.13 +
        Math.sin(t * blob.speedX * 0.37 + blob.phaseY) * 0.04

      const autoY =
        Math.sin(t * blob.speedY + blob.phaseY) * 0.11 +
        Math.cos(t * blob.speedY * 0.52 + blob.phaseX) * 0.045

      // -----------------------------
      // 鼠标影响
      // -----------------------------

      const pointerX = pointerActive
        ? (smoothMouseX - 0.5) * blob.mouseStrength
        : 0

      const pointerY = pointerActive
        ? (smoothMouseY - 0.5) * blob.mouseStrength
        : 0

      // -----------------------------
      // 呼吸
      // -----------------------------

      const breathe =
        1 +
        Math.sin(t * 0.0007 + index * 2.2) * 0.12 +
        Math.sin(t * 0.00021 + index) * 0.05

      const brightness =
        0.28 +
        Math.sin(t * 0.0006 + index * 1.7) * 0.07

      const x =
        (blob.x + autoX + pointerX) * width

      const y =
        (blob.y + autoY + pointerY) * height

      const radius =
        blob.baseRadius *
        breathe *
        Math.max(width, height)

      // -----------------------------
      // 主 glow
      // -----------------------------

      const gradient = ctx.createRadialGradient(
        x,
        y,
        radius * 0.03,
        x,
        y,
        radius,
      )

      gradient.addColorStop(
        0,
        `rgba(${blob.color},${brightness})`,
      )

      gradient.addColorStop(
        0.18,
        `rgba(${blob.color},${brightness * 0.8})`,
      )

      gradient.addColorStop(
        0.45,
        `rgba(${blob.color},${brightness * 0.38})`,
      )

      gradient.addColorStop(
        0.75,
        `rgba(${blob.color},${brightness * 0.12})`,
      )

      gradient.addColorStop(
        1,
        `rgba(${blob.color},0)`,
      )

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // -----------------------------
      // 内部 core
      // 让运动更容易看出来
      // -----------------------------

      const coreRadius = radius * 0.38

      const coreGradient = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        coreRadius,
      )

      coreGradient.addColorStop(
        0,
        `rgba(${blob.color},${brightness * 0.35})`,
      )

      coreGradient.addColorStop(
        1,
        `rgba(${blob.color},0)`,
      )

      ctx.fillStyle = coreGradient
      ctx.fillRect(0, 0, width, height)
    }

    const draw = (t: number) => {
      const width = wrap.clientWidth
      const height = wrap.clientHeight

      ctx.clearRect(0, 0, width, height)

      // 鼠标不是瞬间跟随，而是有惯性
      const targetMouseX = pointerActive ? mouseX : 0.5
      const targetMouseY = pointerActive ? mouseY : 0.5

      smoothMouseX +=
        (targetMouseX - smoothMouseX) * 0.045

      smoothMouseY +=
        (targetMouseY - smoothMouseY) * 0.045

      blobs.forEach((blob, index) => {
        drawBlob(
          blob,
          index,
          prefersReducedMotion ? 0 : t,
          width,
          height,
        )
      })

      if (!prefersReducedMotion) {
        frame = requestAnimationFrame(draw)
      }
    }

    frame = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)

      wrap.removeEventListener(
        "pointermove",
        onPointerMove,
      )

      wrap.removeEventListener(
        "pointerleave",
        onPointerLeave,
      )

      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  )
}