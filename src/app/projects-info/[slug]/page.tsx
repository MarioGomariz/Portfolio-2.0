import { notFound } from "next/navigation";
import WorldMap from "@/components/icons/WorldMap";
import portfolioData from "@/data/portfolio.json";
import LinkIcon from "@/components/icons/LinkIcon";
import { BackButton } from "@/components/ui/buttons";

export async function generateStaticParams() {
  const { projects } = portfolioData;
  return projects.map((project) => ({ slug: project.slug }));
}

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function ProjectPage(props: PageProps) {
  const { slug } = props.params;
  const { projects } = portfolioData;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <main className="py-16 wrapper max-w-4xl mx-auto">
      <div>
        <BackButton />
      </div>

      <div
        className="relative pl-6 mb-8"
        style={{ borderLeft: "2px solid var(--primary)" }}
      >
        <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
        <p className="dark-text-muted mb-6 max-w-2xl">{project.summary}</p>

        <div className="flex flex-wrap gap-3 text-xs mb-3">
          {project.tags.map((tag, idx) => (
            <span key={`tag-${idx}`} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {project.tools && project.tools.length > 0 && (
          <div className="flex flex-wrap gap-3 text-xs mb-6 pt-3 border-t border-[var(--border-color)]/50">
            {project.tools.map((tool, idx) => (
              <span
                key={`tool-${idx}`}
                className="px-3 py-1.5 rounded-full bg-[var(--background-element)] text-[var(--text-secondary)] border border-[var(--border-color)] flex items-center gap-1.5"
              >
                <svg
                  className="w-3.5 h-3.5 text-[var(--text-muted)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
        {project.description && (
          <div className="flex flex-col gap-4 w-full prose-invert max-w-none">
            <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] mb-1">
              Descripción del proyecto
            </h2>
            <div className="flex flex-col gap-3 text-[var(--text-secondary)]">
              {typeof project.description === "string" ? (
                <p className="leading-relaxed text-base">
                  {project.description}
                </p>
              ) : (
                Array.isArray(project.description) &&
                project.description.map((paragraph, i) => {
                  const isListItem = paragraph.trim().startsWith("•");

                  if (isListItem) {
                    const text = paragraph.replace("•", "").trim();
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 ml-1 group"
                      >
                        <span className="text-[var(--primary)] mt-0.5 opacity-90 group-hover:opacity-100 transition-opacity shrink-0">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <p className="flex-1 leading-snug text-sm md:text-[0.95rem] group-hover:text-white transition-colors duration-300">
                          {text}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className="leading-relaxed text-base text-gray-300"
                    >
                      {paragraph}
                    </p>
                  );
                })
              )}
            </div>

            {/* Botones de acción movidos debajo del texto para aprovechar el espacio */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-sm py-2 px-4 w-fit"
                >
                  <WorldMap className="w-4 h-4" />
                  Ver demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-sm py-2 px-4 w-fit"
                >
                  <LinkIcon className="w-4 h-4" />
                  Ver repositorio
                </a>
              )}
            </div>
          </div>
        )}

        <div className="sticky top-24 overflow-hidden rounded-xl bg-[var(--background-card)] border border-[var(--border-color)] shadow-2xl shadow-[var(--primary)]/5 max-w-2xl w-full mx-auto">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </main>
  );
}
