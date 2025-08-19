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
    <section id="home" className="wrapper pt-20">
      <div className="w-full">
        {/* Main card with background image - full width and height */}
        <div className="w-full h-[400px] rounded-3xl bg-white relative flex flex-col overflow-hidden gap-10 justify-end p-6 dark:bg-raisin-black lg:h-[500px] lg:p-10">
          {/* Gradient overlay */}
          <div className="absolute bg-gradient-to-t from-black/80 to-transparent top-0 left-0 bottom-0 right-0 z-[2]" />
          
          {/* Background image */}
          <Image
            src="/images/coding.jpg"
            alt="Coding background"
            fill
            className="absolute w-full h-full object-cover left-0 top-0"
            priority
          />
          
          {/* Content overlay */}
          <div className="w-full flex flex-col z-[2] absolute left-0 bottom-0 leading-4 pb-5 pl-5 text-white">
            <h1 className="text-5xl font-bold leading-7 mb-2">
              {personalInfo.name}
            </h1>
            <span className="text-lg font-medium leading-9" style={{ color: "var(--primary)" }}>
              {personalInfo.profession}
            </span>
            <SocialList />
          </div>
        </div>

      </div>
    </section>
  );
}
