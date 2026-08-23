"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

type RevealTextProps = {
  children: React.ReactNode
  className?: string
}

const RevealText = ({
  children,
  className = "",
}: RevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.2, 1, 1, 0.2]
  )

  const skewX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [-10, 0, 0, 10]
  )

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1.08, 1, 1, 1.08]
  )

  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ["0.08em", "0em", "0em", "0.08em"]
  )

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [-12, 0, 0, 12]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        skewX,
        scaleX,
        letterSpacing,
        x,
        transformOrigin: "left center",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default RevealText