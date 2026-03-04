"use client";

import GitHub from "@/components/icons/Github";
import Linkedin from "@/components/icons/Linkedin";
import Mail from "@/components/icons/Mail";
import { useLanguage } from "@/providers/LanguageProvider";

export default function SocialList() {
  const { portfolioData, language } = useLanguage();
  const { socialLinks } = portfolioData;

  // Función para renderizar el icono correcto según el nombre
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "GitHub":
        return <GitHub className="w-5 h-5" />;
      case "Mail":
        return <Mail className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <ul className="flex gap-4">
      {socialLinks.map((social, index) => (
        <li key={index}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            className="btn btn-primary"
          >
            {renderIcon(social.icon)}
            <span className="hidden sm:inline">{social.name}</span>
          </a>
        </li>
      ))}
      <li>
        <a
          href={
            language === "es"
              ? "/CV_Mario_Gomariz_es.pdf"
              : "/CV_Mario_Gomariz_en.pdf"
          }
          download
          className="btn btn-primary"
        >
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          <span className="hidden sm:inline">
            {language === "es" ? "CV" : "CV"}
          </span>
        </a>
      </li>
    </ul>
  );
}
