"use client";

import Image from "next/image";
import { useState } from "react";

type Project = {
  name: string;
  type: string;
  description: string;
  tech: string[];
  url: string;
  video: string;
  poster: string;
  ratio: number;
  tile: "wide" | "tall" | "standard";
};

export default function BentoProjectCard({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!playing) {
      event.preventDefault();
      setPlaying(true);
    }
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      onClick={handleClick}
      className="group relative block h-full overflow-hidden rounded border border-line bg-panel/50 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
    >
      <div
        className="relative w-full overflow-hidden border-b border-line lg:absolute lg:inset-0 lg:h-full lg:border-b-0"
        style={{ aspectRatio: project.ratio }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 25% 25%, var(--cyan-dim), transparent 55%), radial-gradient(circle at 75% 70%, var(--amber-dim), transparent 55%), var(--media-base)",
          }}
        />
        {playing ? (
          <video
            key={project.video}
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="relative h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <Image
            src={project.poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 brightness-90 saturate-[0.85]"
          />
        )}
      </div>
      <div className="relative px-5 py-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-gradient-to-t lg:from-bg lg:via-bg/80 lg:to-transparent lg:px-5 lg:pt-12 lg:pb-4">
        <h3 className="font-serif text-lg text-ink lg:text-xl">
          {project.name}
        </h3>
        <div
          className={`mt-2 max-h-40 translate-y-0 overflow-hidden opacity-100 transition-all duration-500 ease-out ${playing
            ? "lg:mt-0 lg:max-h-0 lg:translate-y-2 lg:opacity-0"
            : "lg:mt-2 lg:max-h-40 lg:translate-y-0 lg:opacity-100"
            }`}
        >
          <p className="mb-1.5 font-mono text-[10px] tracking-[0.14em] text-cyan uppercase">
            {project.type}
          </p>
          <p className="text-xs leading-relaxed text-ink-muted">
            {project.description}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line-strong bg-bg/40 px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] text-ink-soft"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          STRONGER HOVER EDGE EFFECT
      ========================================================= */}

      {/* Inner frame */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          rounded-[inherit]

          ring-1
          ring-inset
          ring-white/[0.05]

          transition-all
          duration-500

          group-hover:ring-white/[0.12]
        "
      />

      {/* Cyan — top edge */}
      <div
        className="
          pointer-events-none
          absolute
          top-0
          left-[4%]
          z-30

          h-[1.5px]
          w-[46%]

          bg-gradient-to-r
          from-transparent
          via-cyan/0
          to-transparent

          opacity-0
          blur-[0.2px]

          transition-all
          duration-700
          ease-out

          group-hover:left-[8%]
          group-hover:w-[58%]
          group-hover:via-cyan/90
          group-hover:opacity-100

          group-hover:drop-shadow-[0_0_5px_var(--cyan)]
        "
      />

      {/* Cyan — left edge */}
      <div
        className="
          pointer-events-none
          absolute
          top-[4%]
          left-0
          z-30

          h-[32%]
          w-[1.5px]

          bg-gradient-to-b
          from-transparent
          via-cyan/0
          to-transparent

          opacity-0

          transition-all
          duration-700
          ease-out

          group-hover:top-[8%]
          group-hover:h-[46%]
          group-hover:via-cyan/60
          group-hover:opacity-100

          group-hover:drop-shadow-[0_0_5px_var(--cyan)]
        "
      />

      {/* Amber — bottom edge */}
      <div
        className="
          pointer-events-none
          absolute
          right-[4%]
          bottom-0
          z-30

          h-[1.5px]
          w-[42%]

          bg-gradient-to-r
          from-transparent
          via-amber/0
          to-transparent

          opacity-0
          blur-[0.2px]

          transition-all
          duration-700
          ease-out

          group-hover:right-[8%]
          group-hover:w-[54%]
          group-hover:via-amber/85
          group-hover:opacity-100

          group-hover:drop-shadow-[0_0_5px_var(--amber)]
        "
      />

      {/* Amber — right edge */}
      <div
        className="
          pointer-events-none
          absolute
          right-0
          bottom-[4%]
          z-30

          h-[30%]
          w-[1.5px]

          bg-gradient-to-t
          from-transparent
          via-amber/0
          to-transparent

          opacity-0

          transition-all
          duration-700
          ease-out

          group-hover:bottom-[8%]
          group-hover:h-[44%]
          group-hover:via-amber/60
          group-hover:opacity-100

          group-hover:drop-shadow-[0_0_5px_var(--amber)]
        "
      />
    </a>
  );
}
