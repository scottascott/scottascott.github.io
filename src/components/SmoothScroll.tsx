"use client";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
