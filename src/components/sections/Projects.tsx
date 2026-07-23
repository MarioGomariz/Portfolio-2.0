"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/cards";
import { useLanguage } from "@/providers/LanguageProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const { portfolioData, language } = useLanguage();
  const { projects } = portfolioData;

  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={sectionRef} id="projects" className="pt-20 wrapper">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <SectionTitle title={language === "es" ? "Proyectos" : "Projects"} />
      </div>

      <div
        ref={cardsContainerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
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

