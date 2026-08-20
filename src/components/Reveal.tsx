"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

type FadeInProps = {
  children: React.ReactNode
  className?: string
}

const FadeIn = ({ children, className = "" }: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [32, 0, 0, -32]
  )

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn