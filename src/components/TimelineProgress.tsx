"use client";

import { useLenis } from "lenis/react";
import { useRef } from "react";

export default function TimelineProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useLenis(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;

    const rect = track.getBoundingClientRect();
    const viewportRef = window.innerHeight * 0.5;
    const progress = Math.min(
      1,
      Math.max(0, (viewportRef - rect.top) / rect.height),
    );
    fill.style.height = `${progress * 100}%`;
  });

  return (
    <div
      ref={trackRef}
      className="pointer-events-none absolute top-2 bottom-2 left-[5px] hidden w-px bg-line-strong sm:block"
    >
      <div
        ref={fillRef}
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan to-amber"
        style={{ height: "0%" }}
      />
    </div>
  );
}
