import AmbientGlow from "@/components/AmbientGlow";
import ColorBends from "@/components/ColorBends";
import LazyVideo from "@/components/LazyVideo";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import TimelineProgress from "@/components/TimelineProgress";
import Typewriter from "@/components/Typewriter";
import { education, experience, profile, projects } from "@/lib/data";

export default function Home() {
  return (
    <>
      <div
        id="top"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 sm:px-12 lg:px-24 sm:border-b sm:border-line"
      >
        <AmbientGlow className="max-sm:hidden" />
        <div className="relative z-10 mx-auto max-w-[1040px]">
          <Reveal className="mb-7 flex items-center gap-3 font-mono text-[12.5px] tracking-[0.22em] text-amber uppercase">
            <span className="h-px w-7 bg-amber" />
            Senior Software Engineer
          </Reveal>
          <Reveal className="relative mb-6 w-fit text-balance font-serif text-[clamp(5.5rem,10vw,8.5rem)] leading-[0.94] font-semibold tracking-[-0.015em] text-transparent">
            SCOTT
            <br />
            WANG
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0"
              style={{
                top: "-0.3em",
                bottom: "-0.3em",
                WebkitMaskImage: "url(#name-mask)",
                maskImage: "url(#name-mask)",
              }}
            >
              <ColorBends className="h-full w-full" />
            </div>
            <svg width="0" height="0" className="absolute">
              <defs>
                <mask id="name-mask" maskContentUnits="objectBoundingBox">
                  <rect width="1" height="1" fill="black" />
                  <svg
                    x="0"
                    y="0"
                    width="1"
                    height="1"
                    viewBox="0 0 148 134"
                    preserveAspectRatio="none"
                    overflow="visible"
                  >
                    <text
                      x="0"
                      y="57"
                      fontFamily="var(--font-serif)"
                      fontWeight="600"
                      fontSize="36"
                      fill="white"
                    >
                      SCOTT
                    </text>
                    <text
                      x="0"
                      y="106"
                      fontFamily="var(--font-serif)"
                      fontWeight="600"
                      fontSize="36"
                      fill="white"
                    >
                      WANG
                    </text>
                  </svg>
                </mask>
              </defs>
            </svg>
          </Reveal>
          <Reveal className="mb-10 max-w-[34ch] text-[clamp(1.15rem,2.1vw,1.55rem)] leading-snug font-medium text-ink-soft">
            <Typewriter />
          </Reveal>
          <Reveal className="max-w-[46ch] text-[1.02rem] leading-[1.75] text-ink-muted">
            {profile.summary}
          </Reveal>
        </div>
      </div>

      <section
        id="experience"
        className="mx-auto max-w-[1200px] overflow-x-hidden px-6 py-28 sm:overflow-x-visible sm:px-12 lg:px-24"
      >
        <div className="mb-14">
          <RevealText className="font-serif font-semibold text-[clamp(2rem,4vw,3rem)] text-ink italic">
            Experience
          </RevealText>
        </div>
        <div className="relative flex flex-col gap-14">
          <TimelineProgress />
          {experience.map((job) => (
            <Reveal key={job.company}>
              <div className="relative grid gap-2 border-l border-line pl-6 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:gap-10 sm:border-0 sm:pl-11">
                <span className="absolute top-1.5 left-0 hidden h-[11px] w-[11px] rounded-full border-[1.5px] border-t-cyan border-r-cyan border-b-cyan border-l-transparent bg-bg sm:block animate-[spin_3s_linear_infinite]" />
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-2xl text-ink">
                    {job.company}
                  </span>
                  <span className="font-mono text-xs text-ink-muted">
                    <span className="text-amber">{job.role}</span>
                    <br />
                    {job.period}, {job.location}
                  </span>
                </div>
                <div className="rounded border border-line bg-panel/50 p-6 backdrop-blur-lg">
                  <ul className="flex flex-col gap-2">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-sm leading-6 text-ink-muted"
                      >
                        <span className="text-ink-muted/60">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 border-t border-line pt-10">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            Education
          </p>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
            {education.map((item) => (
              <div key={item.school} className="space-y-1">
                <p className="text-sm font-medium text-ink">
                  {item.school}
                </p>

                <p className="text-sm leading-relaxed text-ink-muted">
                  {item.degree}
                </p>

                <p className="font-mono text-[11px] tracking-wide text-ink-muted/60">
                  {item.period}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        id="projects"
        className="mx-auto max-w-[1200px] overflow-x-hidden px-6 py-28 sm:overflow-x-visible sm:px-12 lg:px-24"
      >
        <div className="mb-14">
          <RevealText className="font-serif font-semibold text-[clamp(2rem,4vw,3rem)] text-ink italic">
            Projects
          </RevealText>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project.name}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded border border-line bg-panel/50 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
              >
                <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-line">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 25% 25%, var(--cyan-dim), transparent 55%), radial-gradient(circle at 75% 70%, var(--amber-dim), transparent 55%), #0d0b09",
                    }}
                  />
                  <LazyVideo
                    src={project.video}
                    className="relative h-full w-full scale-100 object-contain mix-blend-screen transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="px-6 pt-6 pb-7">
                  <h3 className="mb-2.5 font-serif text-2xl text-ink">
                    {project.name}
                  </h3>
                  <p className="mb-4 text-sm leading-[1.65] text-ink-muted">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[10.5px] tracking-[0.06em] text-ink-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-[1200px] overflow-x-hidden px-6 py-28 sm:overflow-x-visible sm:px-12 lg:px-24"
      >
        <div className="mb-14">
          <RevealText className="font-serif font-semibold text-[clamp(2rem,4vw,3rem)] text-ink italic">
            Contact
          </RevealText>
        </div>
        <div className="grid items-center gap-12 sm:grid-cols-[minmax(0,46ch)_auto]">
          <Reveal>
            <p className="text-balance font-serif text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.35] font-medium text-ink-muted italic">
              <span className="inline-block animate-bounce">OPEN</span> to new opportunities and conversations about frontend
              craft and full-stack engineering.
            </p>
          </Reveal>
          <Reveal>
            <div className="min-w-[300px] overflow-hidden rounded border border-line bg-panel/55 backdrop-blur-xl">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-baseline justify-between gap-6 px-6 py-5 transition-colors hover:bg-panel/90"
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
                  Email
                </span>
                <span className="text-right text-sm text-ink-soft group-hover:text-cyan">
                  {profile.email}
                </span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-6 border-t border-line px-6 py-5 transition-colors hover:bg-panel/90"
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
                  LinkedIn
                </span>
                <span className="text-right text-sm break-words text-ink-soft group-hover:text-amber">
                  {profile.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              </a>
              <a
                href={profile.githubPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-6 border-t border-line px-6 py-5 transition-colors hover:bg-panel/90"
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
                  GitHub <span className="text-[9px]">Personal</span>
                </span>
                <span className="text-right text-sm break-words text-ink-soft group-hover:text-cyan">
                  {profile.githubPersonal.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              </a>
              <a
                href={profile.githubWork}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-6 border-t border-line px-6 py-5 transition-colors hover:bg-panel/90"
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
                  GitHub <span className="text-[9px]">VirgoCX Work</span>
                </span>
                <span className="text-right text-sm break-words text-ink-soft group-hover:text-amber">
                  {profile.githubWork.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
