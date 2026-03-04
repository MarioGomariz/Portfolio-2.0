"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";

// Define the icons directly here, or import them if available.
// I will create simple fallback icons if the user hasn't provided specifics for the Nav.

const ExperienceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const ProjectsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const SkillsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
  </svg>
);

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export default function Nav() {
  const [activeLink, setActiveLink] = useState("/#home");
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const SoftSkillsIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const SunIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );

  const MoonIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );

  const LINKS = [
    {
      name: language === "es" ? "Inicio" : "Home",
      link: "/#home",
      element: <HomeIcon />,
    },
    {
      name: language === "es" ? "Proyectos" : "Projects",
      link: "/#projects",
      element: <ProjectsIcon />,
    },
    {
      name: language === "es" ? "Experiencia" : "Experience",
      link: "/#experience",
      element: <ExperienceIcon />,
    },
    {
      name: "Stack",
      link: "/#skills",
      element: <SkillsIcon />,
    },
    {
      name: language === "es" ? "Habilidades Blandas" : "Soft Skills",
      link: "/#soft-skills",
      element: <SoftSkillsIcon />,
    },
    {
      name: language === "es" ? "Idioma" : "Language",
      action: () => setLanguage(language === "es" ? "en" : "es"),
      element: <span className="font-bold text-sm uppercase">{language}</span>,
    },
    {
      name: language === "es" ? "Tema" : "Theme",
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
      element: theme === "dark" ? <MoonIcon /> : <SunIcon />,
    },
  ];

  const mouseX = useMotionValue(Infinity);

  const scrollSpy = () => {
    for (let i = LINKS.length - 2; i >= 0; i--) {
      // Avoid calling this for items without link
      if (!LINKS[i].link) continue;

      const id = LINKS[i].link?.replace("/#", "");
      if (!id) continue;

      const section = document.getElementById(id);
      if (!section) continue;
      const rect = section.getBoundingClientRect();

      if (rect.top <= 300) {
        setActiveLink(LINKS[i].link!);
        break;
      }
    }
  };

  useEffect(() => {
    scrollSpy(); // Initial check
    window.addEventListener("scroll", scrollSpy);
    return () => window.removeEventListener("scroll", scrollSpy);
  }, [scrollSpy]);

  return (
    <motion.div
      onMouseMove={(e: React.MouseEvent) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-8 left-1/2 z-[99999] flex h-16 -translate-x-1/2 items-end gap-2 p-2"
    >
      <div className="absolute inset-0 -z-10 size-full rounded-2xl md:rounded-full bg-nav-bg backdrop-blur-xl border border-nav-border shadow-lg" />
      {LINKS.map((item, i) => (
        <NavItem
          key={i}
          activeLink={activeLink}
          {...item}
          isFirst={i === 0}
          hasDivider={i === LINKS.length - 2 || i === LINKS.length - 1}
          mouseX={mouseX}
        />
      ))}
    </motion.div>
  );
}
