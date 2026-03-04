"use client";

import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import { useLanguage } from "@/providers/LanguageProvider";

export default function BackButton() {
  const { language } = useLanguage();
  
  return (
    <a
    href="/projects"
      className="mb-6 btn btn-secondary cursor-pointer"
    >
      <ArrowBackIcon className="w-4 h-4" />
      {language === "es" ? "Volver a proyectos" : "Back to projects"}
    </a>
  );
}
