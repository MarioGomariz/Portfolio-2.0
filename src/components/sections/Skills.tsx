"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/ui/section";
import {
  HtmlIcon,
  CssIcon,
  JavaScriptIcon,
  TsIcon,
  ReactIcon,
  NodeIcon,
  NextJS,
  AstroIcon,
  GitIcon,
  FigmaIcon,
  DatabaseIcon,
} from "@/components/icons/dev";
import { useLanguage } from "@/providers/LanguageProvider";
import Github from "../icons/Github";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Función para renderizar el icono correcto según el nombre
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "HtmlIcon":
      return HtmlIcon;
    case "CssIcon":
      return CssIcon;
    case "JavaScriptIcon":
      return JavaScriptIcon;
    case "TsIcon":
      return TsIcon;
    case "ReactIcon":
      return ReactIcon;
    case "NodeIcon":
      return NodeIcon;
    case "NextJS":
      return NextJS;
    case "AstroIcon":
      return AstroIcon;
    case "GithubIcon":
      return Github;
    case "GitIcon":
      return GitIcon;
    case "FigmaIcon":
      return FigmaIcon;
    case "DatabaseIcon":
      return DatabaseIcon;
    default:
      return null;
  }
};

// Definir una interfaz para el tipo Skill
interface Skill {
  name: string;
  icon: string;
  level?: number;
}

// Componente para renderizar una skill en el carousel
const SkillItem = ({ skill }: { skill: Skill }) => {
  const IconComponent = getIconComponent(skill.icon);
  return (
    <div className="carousel-item group flex flex-col items-center justify-center p-4 rounded-lg dark-card hover:border-[var(--primary)]/50 transition-colors min-w-[120px]">
      <div
        className="p-3 rounded-full mb-3 transition-colors"
        style={{
          backgroundColor: "var(--background-element)",
        }}
      >
        {IconComponent && (
          <IconComponent
            className="w-8 h-8"
            style={{ color: "var(--primary)" }}
          />
        )}
      </div>
      <span className="text-sm text-center dark-text transition-colors group-hover:text-[var(--primary)]">
        {skill.name}
      </span>
    </div>
  );
};

export default function Skills() {
  const { portfolioData, language } = useLanguage();
  const { skills } = portfolioData;

  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [skills]);

  return (
    <section ref={sectionRef} id="skills" className="pt-20 wrapper">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <SectionTitle title={language === "es" ? "Stack Tecnológico" : "Tech Stack"} />
      </div>

      {/* Carousel infinito de skills */}
      <div ref={carouselRef} className="mt-20">
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll">
            {skills.map((skill) => (
              <li key={skill.name} className="mx-8">
                <SkillItem skill={skill} />
              </li>
            ))}
          </ul>
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll"
            aria-hidden="true"
          >
            {skills.map((skill) => (
              <li key={skill.name} className="mx-8">
                <SkillItem skill={skill} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

