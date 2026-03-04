"use client";

import { SectionTitle } from "@/components/ui/section";
import { useLanguage } from "@/providers/LanguageProvider";

export default function SoftSkills() {
  const { portfolioData, language } = useLanguage();
  const { softSkills } = portfolioData;

  return (
    <section id="soft-skills" className="py-20 mt-10 wrapper">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <SectionTitle title={language === "es" ? "Habilidades blandas" : "Soft Skills"} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {softSkills.map((skill) => (
          <article
            key={skill.title}
            className="group p-6 rounded-lg dark-card hover:border-blue-500"
          >
            <div className="flex items-center mb-4">
              <h3
                className="text-xl font-semibold transition-colors"
                style={{
                  color: "var(--text-accent)",
                }}
              >
                {skill.title}
              </h3>
            </div>

            <div className="">
              {skill.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm dark-text-muted mb-3">
                  {p}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
