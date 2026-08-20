"use client";

import { useEffect, useState } from "react";

const words = ["Frontend Craft", "Full-Stack Applications", "Fintech Products"];

const TYPE_SPEED = 45;
const DELETE_SPEED = 25;
const PAUSE_MS = 1400;

export default function Typewriter({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];

    if (!deleting && length === word.length) {
      const timeout = setTimeout(() => setDeleting(true), PAUSE_MS);
      return () => clearTimeout(timeout);
    }

    if (deleting && length === 0) {
      const timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 0);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => setLength((l) => l + (deleting ? -1 : 1)),
      deleting ? DELETE_SPEED : TYPE_SPEED,
    );
    return () => clearTimeout(timeout);
  }, [length, deleting, index]);

  return (
    <span className={className}>
      {words[index].slice(0, length)}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[2px] animate-[blink_1s_infinite] bg-current align-middle"
        style={{ height: "0.9em" }}
      />
    </span>
  );
}
