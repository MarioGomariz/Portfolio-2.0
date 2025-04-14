"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/cards";
import portfolioData from "@/data/portfolio.json";

export default function ProjectsPage() {
  const { projects } = portfolioData;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Extraer todas las tecnologías únicas de los proyectos
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();

  // Filtrar proyectos cuando cambia el término de búsqueda o las etiquetas seleccionadas
  useEffect(() => {
    const filtered = projects.filter(project => {
      // Filtrar por término de búsqueda
      const matchesSearch = searchTerm === "" || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtrar por etiquetas seleccionadas
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => project.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
    
    setFilteredProjects(filtered);
  }, [searchTerm, selectedTags, projects]);

  // Manejar la selección/deselección de etiquetas
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  return (
    <main className="pt-20 wrapper animate-fade-in">
      <div className="mb-10 animate-slide-in">
        <SectionTitle title="Todos los proyectos" />
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
          Volver al inicio
        </Link>
      </div>

      {/* Buscador y filtros */}
      <div className="mb-8 animate-slide-in delay-200">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Buscador */}
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar proyectos..."
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
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Filtro de tecnologías */}
        <div className="mb-6">
          <h3 className="text-sm mb-2 dark-text-muted">Filtrar por tecnología:</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
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
      </div>

      {/* Resultados */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.slug}
              className="animate-scale-in"
              style={{ animationDelay: `${(index % 3 + 1) * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 dark-card rounded-lg animate-fade-in">
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
          <h3 className="text-xl font-semibold mb-2">No se encontraron proyectos</h3>
          <p className="text-sm dark-text-muted">
            Intenta con otros términos de búsqueda o filtros diferentes
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
          >
            Mostrar todos los proyectos
          </button>
        </div>
      )}
    </main>
  );
}
