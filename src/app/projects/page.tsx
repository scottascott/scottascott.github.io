import type { Metadata } from "next";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — Scott Wang",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          A few things I&apos;ve built outside of work.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-xl border border-black/10 p-6 transition-colors hover:border-black/20 dark:border-white/15 dark:hover:border-white/30"
          >
            <h2 className="font-semibold transition-colors group-hover:underline">
              {project.name}
            </h2>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 px-2.5 py-0.5 text-xs text-zinc-600 dark:border-white/15 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
