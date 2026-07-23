"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/ui/section";
import { useLanguage } from "@/providers/LanguageProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SoftSkills() {
  const { portfolioData, language } = useLanguage();
  const { softSkills } = portfolioData;

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const articles = containerRef.current?.children;
      if (articles && articles.length > 0) {
        gsap.fromTo(
          articles,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [softSkills]);

  return (
    <section ref={sectionRef} id="soft-skills" className="py-20 mt-10 wrapper">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <SectionTitle
          title={language === "es" ? "Habilidades blandas" : "Soft Skills"}
        />
      </div>

      <div ref={containerRef} className="grid gap-8 md:grid-cols-2">
        {softSkills.map((skill) => (
          <article
            key={skill.title}
            className="group p-6 rounded-lg dark-card hover:border-[var(--primary)]/50 transition-colors"
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

