"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/cards";
import { useLanguage } from "@/providers/LanguageProvider";

export default function ProjectsPage() {
  const { portfolioData, language } = useLanguage();
  const { projects } = portfolioData;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Extraer todas las tecnologías y herramientas
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags)),
  ).sort();

  const allTools = Array.from(
    new Set(projects.flatMap((project) => project.tools || [])),
  ).sort();

  // Filtrar proyectos cuando cambia el término de búsqueda o las etiquetas seleccionadas
  useEffect(() => {
    const filtered = projects.filter((project) => {
      // Filtrar por término de búsqueda
      const matchesSearch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtrar por etiquetas seleccionadas
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every(
          (tag) =>
            project.tags.includes(tag) ||
            (project.tools && project.tools.includes(tag)),
        );

      return matchesSearch && matchesTags;
    });

    setFilteredProjects(filtered);
  }, [searchTerm, selectedTags, projects]);

  // Manejar la selección/deselección de etiquetas
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  return (
    <main className="pt-20 wrapper">
      <div className="mb-10">
        <SectionTitle title={language === "es" ? "Todos los proyectos" : "All Projects"} />
        <Link
          href="/"
          className="text-red-400 hover:text-red-300 text-sm transition-all hover:-translate-x-1 flex items-center mt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 rotate-180"
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
          {language === "es" ? "Volver al inicio" : "Back to Home"}
        </Link>
      </div>

      {/* Buscador y filtros */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Buscador */}
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === "es" ? "Buscar proyectos..." : "Search projects..."}
              className="w-full px-4 py-2 pl-10 rounded-lg dark-card focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Botón para limpiar filtros */}
          {(searchTerm || selectedTags.length > 0) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              {language === "es" ? "Limpiar filtros" : "Clear filters"}
            </button>
          )}
        </div>

        {/* Filtro de Múltiples Ejes */}
        <div className="mb-6 space-y-4">
          <div>
            <h3 className="text-sm mb-2 dark-text-muted">
              {language === "es" ? "Filtrar por tecnología:" : "Filter by technology:"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={`tag-${tag}`}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-red-500 text-white"
                      : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {allTools.length > 0 && (
            <div>
              <h3 className="text-sm mb-2 dark-text-muted">
                {language === "es" ? "Filtrar por herramienta:" : "Filter by tool:"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTools.map((tool) => (
                  <button
                    key={`tool-${tool}`}
                    onClick={() => toggleTag(tool)}
                    className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1.5 ${
                      selectedTags.includes(tool)
                        ? "bg-[var(--background-element)] text-white border border-[var(--border-color)]"
                        : "bg-[var(--background-element)]/50 text-[var(--text-secondary)] border border-transparent hover:border-[var(--border-color)]"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 text-[var(--text-muted)]"
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
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resultados */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 dark-card rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-4 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2">
            {language === "es" ? "No se encontraron proyectos" : "No projects found"}
          </h3>
          <p className="text-sm dark-text-muted">
            {language === "es" ? "Intenta con otros términos de búsqueda o filtros diferentes" : "Try with other search terms or different filters"}
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
          >
            {language === "es" ? "Mostrar todos los proyectos" : "Show all projects"}
          </button>
        </div>
      )}
    </main>
  );
}
