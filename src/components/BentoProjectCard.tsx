import LazyVideo from "@/components/LazyVideo";

type Project = {
  name: string;
  url: string;
  video: string;
  ratio: number;
  tile: "wide" | "tall" | "standard";
};

export default function BentoProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
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
              "radial-gradient(circle at 25% 25%, var(--cyan-dim), transparent 55%), radial-gradient(circle at 75% 70%, var(--amber-dim), transparent 55%), #0d0b09",
          }}
        />
        <LazyVideo
          src={project.video}
          className="relative h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="relative px-5 py-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-gradient-to-t lg:from-bg lg:via-bg/70 lg:to-transparent lg:px-5 lg:pt-10 lg:pb-4">
        <h3 className="font-serif text-lg text-ink lg:text-xl">
          {project.name}
        </h3>
      </div>
    </a>
  );
}
