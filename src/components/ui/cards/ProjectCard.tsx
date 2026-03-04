import FolderIcon from "@/components/icons/Folder";
import { Project } from "@/data/portfolio.json";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-lg dark-card transition-all duration-200 hover:border-border-hover card-hover h-full flex flex-col">
      <a
        href={`/projects-info/${project.slug}`}
        className="flex flex-col p-5 flex-grow"
      >
        <header className="flex items-center gap-2 text-xl font-semibold dark-text mb-4">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: "var(--background-element)" }}
          >
            <FolderIcon
              className="w-5 h-5"
              style={{ color: "var(--primary)" }}
            />
          </div>
          <span className="transition-colors duration-300 group-hover:text-txt-accent">
            {project.title}
          </span>
        </header>

        <div className="text-sm dark-text-muted mb-4">
          <p className="line-clamp-3">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs mt-auto">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tag">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="tag">+{project.tags.length - 3}</span>
          )}
        </div>
      </a>
    </article>
  );
}
