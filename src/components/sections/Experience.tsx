"use client";

import { SectionTitle } from "@/components/ui/section";
import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";
import LinkIcon from "@/components/icons/LinkIcon";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  projectSlug?: string;
  responsibilities: string[];
}

export default function Experience() {
  const { portfolioData, language } = useLanguage();
  const experience: ExperienceItem[] = portfolioData.experience;

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="pt-20 wrapper">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <SectionTitle title={language === "es" ? "Experiencia Laboral" : "Work Experience"} />
      </div>

      <div className="relative border-l-2 border-[var(--border-color)] ml-3 md:ml-4">
        {experience.map((job, index) => (
          <div key={index} className="mb-10 ml-6 md:ml-10 relative group">
            {/* Timeline dot */}
            <span className="absolute -left-[35px] md:-left-[51px] flex h-5 w-5 items-center justify-center rounded-full bg-[var(--background)] border-2 border-[var(--primary)] group-hover:bg-[var(--primary)] transition-colors duration-300"></span>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
              <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary-light)] transition-colors duration-300">
                {job.role}
              </h3>
              <span className="text-sm font-medium text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full w-fit">
                {job.period}
              </span>
            </div>

            <h4 className="text-lg font-semibold text-[var(--text-secondary)] mb-4 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {job.company}
            </h4>

            <div className="dark-card p-5 md:p-6 rounded-xl border border-[var(--border-color)] shadow-lg shadow-black/20 hover:border-[var(--primary)]/30 transition-colors duration-300">
              <ul className="flex flex-col gap-3">
                {job.responsibilities.map((resp, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[var(--text-secondary)]"
                  >
                    <span className="text-[var(--primary)] mt-1 shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="text-[0.95rem] leading-relaxed">
                      {resp}
                    </span>
                  </li>
                ))}
              </ul>

              {job.projectSlug && (
                <div className="mt-6 pt-4 border-t border-[var(--border-color)]/50">
                  <Link
                    href={`/projects-info/${job.projectSlug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary-light)] hover:text-white transition-colors group/link"
                  >
                    <LinkIcon className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    Ver detalles del proyecto
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
