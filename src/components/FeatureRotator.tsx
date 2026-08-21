"use client";

import { useEffect, useState } from "react";

const features = [
  {
    title: "Frontend Systems",
    stack: "React · Next.js · TypeScript",
    description: "Complex UI, design systems and performance.",
  },
  {
    title: "Full-Stack Products",
    stack: "Node.js · APIs · PostgreSQL",
    description: "Production-ready applications from UI to backend.",
  },
  {
    title: "Fintech Platforms",
    stack: "Trading · Payments · Wallets",
    description: "Experience building regulated financial products.",
  },
];

const TYPE_SPEED = 25;
const DELETE_SPEED = 25;
const PAUSE_MS = 3800;

export default function FeatureRotator({
  className = "",
}: {
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const feature = features[index];
  const title = feature.title;

  useEffect(() => {
    if (!deleting && length === title.length) {
      const timeout = setTimeout(() => setDeleting(true), PAUSE_MS);
      return () => clearTimeout(timeout);
    }

    if (deleting && length === 0) {
      const timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % features.length);
      }, 0);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => setLength((l) => l + (deleting ? -1 : 1)),
      deleting ? DELETE_SPEED : TYPE_SPEED,
    );
    return () => clearTimeout(timeout);
  }, [length, deleting, index, title.length]);

  const subtextVisible = !deleting && length === title.length;

  return (
    <div className={className}>
      <div className="relative pl-5">
        {/* accent line */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-1 h-12 w-px bg-gradient-to-b from-cyan/70 via-cyan/30 to-transparent"
        />

        {/* title */}
        <p className="font-serif text-xl leading-tight text-ink sm:text-2xl">
          {title.slice(0, length)}

          <span
            aria-hidden="true"
            className="ml-1 inline-block w-[2px] animate-[blink_1s_infinite] bg-current align-middle"
            style={{ height: "0.8em" }}
          />
        </p>

        <div
          className={`transition-all duration-500 ${subtextVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0"
            }`}
        >
          {/* stack */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {feature.stack.split("·").map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan/15 bg-cyan/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.13em] text-cyan/90"
              >
                {item.trim()}
              </span>
            ))}
          </div>

          {/* description */}
          <p className="mt-3 max-w-sm text-sm leading-6 text-ink-muted">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}
