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
    <main className="py-16 wrapper max-w-4xl mx-auto animate-fade-in">
      <div className="animate-slide-in">
        <BackButton />
      </div>

      <div className="relative pl-6 mb-8" style={{ borderLeft: '2px solid var(--primary)' }}>
        <h1 className="text-4xl font-bold mb-3 animate-slide-in delay-100">{project.title}</h1>
        <p className="dark-text-muted mb-6 animate-fade-in delay-200 max-w-2xl">{project.summary}</p>

        <div className="flex flex-wrap gap-3 text-xs animate-fade-in delay-300 mb-6">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="tag"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg mb-8 dark-card max-w-2xl mx-auto">
        <img
          src={project.image}
          alt={project.title}
          className="w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in delay-400">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <WorldMap className="w-5 h-5" />
            Ver demo
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <LinkIcon className="w-5 h-5" />
            Ver repositorio
          </a>
        )}
      </div>

      {project.description && (
        <div className="animate-fade-in delay-500 prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-accent)' }}>
            Descripción del proyecto
          </h2>
          <div className="dark-text-muted">
            {typeof project.description === 'string' ? (
              <p>{project.description}</p>
            ) : (
              Array.isArray(project.description) && project.description.map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}
