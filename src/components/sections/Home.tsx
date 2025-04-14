"use client";

import { useEffect } from "react";
import { SocialList } from "@/components/ui/social";
import portfolioData from "@/data/portfolio.json";
import Image from "next/image";

export default function Home() {
  const { personalInfo } = portfolioData;

  useEffect(() => {
    const updatePath = () => {
      const textMain = document.getElementById("anim-p");
      const path = document.getElementById(
        "border-path"
      ) as SVGPathElement | null;

      if (textMain && path) {
        path.setAttribute(
          "d",
          `M0,0 V${textMain.offsetHeight} H${textMain.offsetWidth} v${textMain.offsetHeight}`
        );

        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = `${pathLength}`;
        path.style.strokeDashoffset = `${pathLength}`;
      }
    };

    window.addEventListener("resize", updatePath);
    updatePath();

    return () => window.removeEventListener("resize", updatePath);
  }, []);

  return (
    <section
      id="home"
      className="wrapper flex flex-col md:flex-row justify-between items-start pt-20 gap-8"
    >
      <div className="flex-1 relative">
        <div id="anim-p" className="relative animate-fade-in">
          <span
            className="text-lg font-medium mb-2 block"
            style={{ color: "var(--primary)" }}
          >
            {personalInfo.profession}
          </span>
          <h1 className="text-5xl font-bold mb-4 dark-text">
            {personalInfo.name}
          </h1>
        </div>

        <p className="mt-6 max-w-xl dark-text-muted font-sans animate-fade-in delay-400 text-base leading-relaxed">
          {personalInfo.description}
        </p>

        <div className="mt-8 animate-fade-in delay-500">
          <SocialList />
        </div>
      </div>
      
      <div className="flex-shrink-0 w-full md:w-72 h-72 relative animate-fade-in delay-300 rounded-3xl overflow-hidden" 
      style={{ boxShadow: "0 0 100px var(--primary)" }}
      >
        <Image
          src="/images/profile/profile.webp"
          alt="Foto de perfil"
          fill
          sizes="(max-width: 768px) 100vw, 288px"
          style={{
            objectFit: "cover",
          }}
          priority
        />
      </div>
    </section>
  );
}
