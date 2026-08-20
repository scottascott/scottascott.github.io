import Link from "next/link";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20">
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {profile.location}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {profile.name}
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        {profile.title} · {profile.tagline}
      </p>
      <p className="max-w-xl leading-7 text-zinc-700 dark:text-zinc-300">
        {profile.summary}
      </p>
      <div className="flex gap-4 pt-2 text-sm font-medium">
        <Link
          href="/resume"
          className="rounded-full bg-foreground px-5 py-2.5 text-background transition-colors hover:opacity-90"
        >
          View Resume
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:bg-black/[.04] dark:border-white/15 dark:hover:bg-white/[.06]"
        >
          View Projects
        </Link>
      </div>
    </div>
  );
}
