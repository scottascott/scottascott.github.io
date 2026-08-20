import type { Metadata } from "next";
import { education, experience, profile, skills } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume — Scott Wang",
};

export default function ResumePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-14 px-6 py-16">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {profile.title} · {profile.location}
        </p>
      </div>

      <section>
        <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-500">
          Skills
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-medium">{category}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 px-3 py-1 text-xs text-zinc-700 dark:border-white/15 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-500">
          Experience
        </h2>
        <div className="mt-4 flex flex-col gap-10">
          {experience.map((job) => (
            <div key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-semibold">
                  {job.role} · {job.company}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                  {job.period}
                </p>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {job.location}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="text-zinc-400 dark:text-zinc-600">
                      &bull;
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-500">
          Education
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          {education.map((item) => (
            <div
              key={item.school}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
            >
              <div>
                <h3 className="font-semibold">{item.school}</h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {item.degree}
                </p>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {item.period}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
