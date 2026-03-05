"use client";

import { SectionTitle } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/cards";
import { useLanguage } from "@/providers/LanguageProvider";

export default function Projects() {
  const { portfolioData, language } = useLanguage();
  const { projects } = portfolioData;

  return (
    <section id="projects" className="pt-20 wrapper">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <SectionTitle title={language === "es" ? "Proyectos" : "Projects"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.slice(0, 6).map((project, index) => (
          <div key={index} className={index >= 3 ? "hidden sm:block" : ""}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <a
        href="/projects"
        className="text-txt-accent hover:text-txt-accent-hover text-sm mt-4 md:mt-0 flex items-center mb-8"
      >
        {language === "es" ? "Ver todos" : "View all"}
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
