import AmbientGlow from "@/components/AmbientGlow";
import Reveal from "@/components/Reveal";
import { education, experience, profile, projects } from "@/lib/data";

export default function Home() {
  return (
    <>
      <div
        id="top"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-line px-6 py-24 sm:px-12 lg:px-24"
      >
        <AmbientGlow />
        <div className="relative z-10 max-w-[1040px]">
          <p className="mb-7 flex items-center gap-3 font-mono text-[12.5px] tracking-[0.22em] text-amber uppercase">
            <span className="h-px w-7 bg-amber" />
            Senior Software Engineer
          </p>
          <h1 className="mb-6 text-balance font-serif text-[clamp(3.4rem,9vw,7.2rem)] leading-[0.94] font-semibold tracking-[-0.015em] text-ink">
            Scott
            <br />
            Wang
          </h1>
          <p className="mb-10 max-w-[34ch] text-[clamp(1.15rem,2.1vw,1.55rem)] leading-snug font-medium text-ink-soft">
            Frontend Craft <span className="text-cyan">×</span> Full-Stack
            Engineering
          </p>
          <div className="grid items-end gap-8 sm:grid-cols-[minmax(0,46ch)_auto] sm:gap-16">
            <p className="max-w-[46ch] text-[1.02rem] leading-[1.75] text-ink-muted">
              {profile.summary}
            </p>
            <div className="min-w-[260px] rounded border border-line bg-panel/55 p-6 backdrop-blur-xl">
              <p className="mb-4 font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
                Education
              </p>
              <div className="flex flex-col gap-3">
                {education.map((item) => (
                  <div key={item.school}>
                    <span className="block font-serif text-base text-ink">
                      {item.school}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] text-ink-muted">
                      {item.degree}
                    </span>
                    <span className="block text-[12.5px] text-ink-muted">
                      {item.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-6 z-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase sm:left-12 lg:left-24">
          <span className="h-8 w-px bg-gradient-to-b from-ink-muted to-transparent" />
          Scroll
        </div>
      </div>

      <section
        id="experience"
        className="mx-auto max-w-[1200px] px-6 py-28 sm:px-12 lg:px-24"
      >
        <div className="mb-14">
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold text-ink italic">
            Experience
          </h2>
        </div>
        <div className="relative flex flex-col gap-14">
          <div className="pointer-events-none absolute top-2 bottom-2 left-[5px] hidden w-px bg-gradient-to-b from-cyan to-amber opacity-40 sm:block" />
          {experience.map((job) => (
            <Reveal key={job.company}>
              <div className="relative grid gap-2 border-l border-line pl-6 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:gap-10 sm:border-0 sm:pl-11">
                <span className="absolute top-1.5 left-0 hidden h-[11px] w-[11px] -translate-x-1/2 rounded-full border-[1.5px] border-cyan bg-bg sm:block" />
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
      </section>

      <section
        id="projects"
        className="mx-auto max-w-[1200px] px-6 py-28 sm:px-12 lg:px-24"
      >
        <div className="mb-14 flex flex-wrap items-baseline justify-between gap-8">
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold text-ink italic">
            Projects
          </h2>
          <span className="font-mono text-xs tracking-[0.16em] text-ink-muted uppercase">
            Selected
          </span>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project.name}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded border border-line bg-panel/50 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
              >
                <div
                  className="relative flex aspect-[16/10] items-end border-b border-line p-4"
                  style={{
                    background:
                      "radial-gradient(circle at 25% 25%, var(--cyan-dim), transparent 55%), radial-gradient(circle at 75% 70%, var(--amber-dim), transparent 55%), #0d0b09",
                  }}
                >
                  <span className="rounded-full border border-line-strong px-3 py-1 font-mono text-[10.5px] tracking-[0.14em] text-ink-muted uppercase">
                    Preview video coming soon
                  </span>
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
        className="mx-auto max-w-[1200px] px-6 py-28 sm:px-12 lg:px-24"
      >
        <div className="mb-14 flex flex-wrap items-baseline justify-between gap-8">
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold text-ink italic">
            Contact
          </h2>
          <span className="font-mono text-xs tracking-[0.16em] text-ink-muted uppercase">
            Say hello
          </span>
        </div>
        <div className="grid items-center gap-12 sm:grid-cols-[minmax(0,46ch)_auto]">
          <Reveal>
            <p className="text-balance font-serif text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.35] font-medium text-ink italic">
              Open to new opportunities and conversations about frontend
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
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
