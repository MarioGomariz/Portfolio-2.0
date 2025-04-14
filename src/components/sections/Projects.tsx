import { SectionTitle } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/cards";
import portfolioData from "@/data/portfolio.json";

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="pt-20 wrapper animate-fade-in">

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 animate-slide-in">
        <SectionTitle title="Proyectos" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.slice(0, 3).map((project, index) => (
          <div
            key={index}
            className="animate-scale-in"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <a
        href="/projects"
        className="text-red-400 hover:text-red-300 text-sm transition-all hover:translate-x-1 animate-fade-in delay-100 mt-4 md:mt-0 flex items-center mb-8"
      >
        Ver todos
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </section>
  );
}
