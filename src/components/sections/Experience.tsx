"use client";

import { SectionTitle } from "@/components/ui/section";
import { useLanguage } from "@/providers/LanguageProvider";
import Link from "next/link";
import LinkIcon from "@/components/icons/LinkIcon";
import { useRef, useState, useEffect, useCallback } from "react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  projectSlug?: string;
  responsibilities: string[];
}

function getStartYear(period: string): string {
  const match = period.match(/\d{4}/);
  return match ? match[0] : period;
}

const ArrowIcon = ({ flipped = false }: { flipped?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 45 8"
    width="45"
    height="8"
    aria-hidden="true"
    style={{ transform: flipped ? "scaleX(-1)" : undefined }}
  >
    <path
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 1L1 4L5 7M1 4L44 4"
    />
  </svg>
);

export default function Experience() {
  const { portfolioData, language } = useLanguage();
  const experience: ExperienceItem[] = portfolioData.experience;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-card]");
    const card = cards[index];
    if (!card) return;
    const containerCenter = container.offsetWidth / 2;
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    container.scrollTo({ left: cardCenter - containerCenter, behavior: "smooth" });
  }, []);

  const updateActive = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-card]")
    );
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    updateActive();
    container.addEventListener("scroll", updateActive, { passive: true });
    return () => container.removeEventListener("scroll", updateActive);
  }, [experience, updateActive]);

  if (!experience || experience.length === 0) return null;

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === experience.length - 1;

  return (
    <section id="experience" className="pt-20 wrapper">
      <style>{`
        .exp-scroll-container {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 50%;
          overflow-x: auto;
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
          -webkit-mask-image: linear-gradient(to right, transparent, rgba(255,255,255,0.3) 50px 8%, white, rgba(255,255,255,0.3) 92% calc(100% - 50px), transparent);
          mask-image: linear-gradient(to right, transparent, rgba(255,255,255,0.3) 50px 8%, white, rgba(255,255,255,0.3) 92% calc(100% - 50px), transparent);
        }
        .exp-scroll-container::-webkit-scrollbar { display: none; }

        .exp-card {
          scroll-snap-align: center;
          scroll-snap-stop: always;
          position: relative;
          padding-block-start: 56px;
        }

        .exp-timeline-line::before {
          content: '';
          position: absolute;
          top: 26px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            rgba(255,255,255,0.15) calc(50% - 18px),
            transparent calc(50% - 18px),
            transparent calc(50% + 18px),
            rgba(255,255,255,0.15) calc(50% + 18px)
          );
        }
        .exp-timeline-line.is-first::before {
          background: linear-gradient(
            to right,
            transparent calc(50% + 18px),
            rgba(255,255,255,0.15) calc(50% + 18px)
          );
        }
        .exp-timeline-line.is-last::before {
          background: linear-gradient(
            to right,
            rgba(255,255,255,0.15) calc(50% - 18px),
            transparent calc(50% - 18px)
          );
        }

        .exp-node::after {
          content: '';
          position: absolute;
          top: 16px;
          left: 50%;
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255,255,255,0.4);
          background: var(--primary-dark);
          rotate: 45deg;
          translate: -50% 0;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .exp-node.is-active::after {
          border-color: var(--primary);
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary), 0 0 24px rgba(255, 58, 65, 0.35);
        }

        @media (max-width: 48rem) {
          .exp-scroll-container {
            grid-auto-columns: 85%;
            -webkit-mask-image: linear-gradient(to right, transparent, rgba(255,255,255,0.5) 5px, white, rgba(255,255,255,0.5) calc(100% - 5px), transparent);
            mask-image: linear-gradient(to right, transparent, rgba(255,255,255,0.5) 5px, white, rgba(255,255,255,0.5) calc(100% - 5px), transparent);
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          .exp-scroll-container {
            scroll-behavior: smooth;
          }
        }
      `}</style>

      {/* Section header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <SectionTitle
          title={language === "es" ? "Experiencia Laboral" : "Work Experience"}
        />
      </div>

      {/* Year markers + arrow buttons */}
      <div className="flex items-center justify-center gap-3 mb-2 px-2">
        {/* Left arrow */}
        <button
          aria-label="Previous experience"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={isFirst}
          className="text-[var(--text-secondary)] hover:text-[var(--primary)] disabled:opacity-0 disabled:pointer-events-none shrink-0 outline-none focus:outline-none"
          style={{ transition: "opacity 0.3s ease, color 0.2s ease" }}
        >
          <ArrowIcon />
        </button>

        {/* Year tabs */}
        <div className="flex items-center gap-4 md:gap-6 overflow-hidden">
          {experience.map((job, index) => {
            const year = getStartYear(job.period);
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to ${job.company} (${year})`}
                className="text-base md:text-lg font-light tracking-wide transition-all duration-300 whitespace-nowrap shrink-0"
                style={{
                  color: isActive
                    ? "var(--primary)"
                    : "var(--text-secondary)",
                  fontWeight: isActive ? 600 : 300,
                  minWidth: "5ch",
                  textAlign: "center",
                }}
              >
                {year}
              </button>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          aria-label="Next experience"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={isLast}
          className="text-[var(--text-secondary)] hover:text-[var(--primary)] disabled:opacity-0 disabled:pointer-events-none shrink-0 outline-none focus:outline-none"
          style={{ transition: "opacity 0.3s ease, color 0.2s ease" }}
        >
          <ArrowIcon flipped />
        </button>
      </div>

      {/* Scroll container */}
      <div ref={scrollRef} className="exp-scroll-container">
        {/* Fake spacer — first */}
        <div aria-hidden="true" />

        {experience.map((job, index) => {
          const isActive = index === activeIndex;
          const isFirstCard = index === 0;
          const isLastCard = index === experience.length - 1;

          return (
            <div
              key={index}
              data-card
              className={[
                "exp-card exp-timeline-line exp-node",
                isFirstCard ? "is-first" : "",
                isLastCard ? "is-last" : "",
                isActive ? "is-active" : "",
                "px-6 md:px-10 pb-8 text-center",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Card content */}
              <div
                className="dark-card rounded-xl border p-5 md:p-6 text-left transition-all duration-300"
                style={{
                  borderColor: isActive
                    ? "var(--primary)"
                    : "var(--border-color)",
                  boxShadow: isActive
                    ? "0 0 24px rgba(255, 58, 65, 0.15), 0 4px 30px rgba(0,0,0,0.3)"
                    : "0 4px 30px rgba(0,0,0,0.2)",
                  opacity: isActive ? 1 : 0.55,
                  transform: isActive ? "scale(1)" : "scale(0.97)",
                  transition:
                    "opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* Company */}
                <h3
                  className="text-xl md:text-2xl font-semibold mb-1"
                  style={{ color: "var(--primary)" }}
                >
                  {job.company}
                </h3>

                {/* Period */}
                <span
                  className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-3"
                  style={{
                    color: "var(--primary)",
                    background: "rgba(255,58,65,0.1)",
                  }}
                >
                  {job.period}
                </span>

                {/* Role */}
                <h4
                  className="text-base md:text-lg font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {job.role}
                </h4>

                {/* Responsibilities */}
                <ul className="flex flex-col gap-2">
                  {job.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="mt-1 shrink-0"
                        style={{ color: "var(--primary)" }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Project link */}
                {job.projectSlug && (
                  <div
                    className="mt-5 pt-4 border-t"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <Link
                      href={`/projects-info/${job.projectSlug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium transition-colors group/link"
                      style={{ color: "var(--text-accent)" }}
                    >
                      <LinkIcon className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      {language === "es"
                        ? "Ver detalles del proyecto"
                        : "View project details"}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Fake spacer — last */}
        <div aria-hidden="true" />
      </div>
    </section>
  );
}
