"use client";

import { SectionTitle } from "@/components/ui/section";
import { useLanguage } from "@/providers/LanguageProvider";

interface EducationItem {
  title: string;
  institution: string;
  location: string;
  period: string;
}

export default function Education() {
  const { portfolioData, language } = useLanguage();
  const education: EducationItem[] = (portfolioData as any).education;

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="pt-20 wrapper">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <SectionTitle title={language === "es" ? "Educación" : "Education"} />
      </div>

      <div className="relative border-l-2 border-[var(--border-color)] ml-3 md:ml-4">
        {education.map((item, index) => (
          <div key={index} className="mb-6 ml-6 md:ml-10 relative group">
            {/* Timeline dot */}
            <span className="absolute -left-[35px] md:-left-[51px] flex h-5 w-5 items-center justify-center rounded-full bg-[var(--background)] border-2 border-[var(--primary)] group-hover:bg-[var(--primary)] transition-colors duration-300" />

            <div className="dark-card p-5 md:p-6 rounded-xl border border-[var(--border-color)] shadow-lg shadow-black/20 hover:border-[var(--primary)]/30 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-txt-primary group-hover:text-txt-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <span className="text-sm font-medium text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full w-fit shrink-0">
                  {item.period}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422A12.083 12.083 0 0121 12c0 3.866-3.582 7-8 7s-8-3.134-8-7a12.083 12.083 0 012.84-7.422L12 14z"
                  />
                </svg>
                <span className="text-sm font-semibold">
                  {item.institution}
                </span>
                <span className="text-[var(--border-color)]">·</span>
                <span className="text-sm">{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
