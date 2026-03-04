"use client";

import { motion, useSpring, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

interface NavItemProps {
  activeLink: string;
  link?: string;
  name: string;
  action?: () => void;
  element: React.ReactNode;
  isFirst: boolean;
  hasDivider?: boolean;
  mouseX: MotionValue<number>;
}

export default function NavItem({
  activeLink,
  link,
  name,
  action,
  element,
  isFirst,
  hasDivider,
  mouseX,
}: NavItemProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [45, 80, 45]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const isActive = link && link === activeLink;

  const motionProps = {
    style: { width, height: 45 },
    className: `nav-item peer flex items-center justify-center rounded-2xl md:rounded-full transition-colors 
    ${isActive ? "text-[var(--primary)] bg-[var(--primary)]/10" : "text-[var(--text-secondary)] hover:bg-nav-hover"}
    `,
  };

  const inner = (
    <>
      {isFirst ? (
        <div className="w-full h-full relative overflow-hidden rounded-full p-1 border border-nav-border">
          <Image
            src="/images/profile/profile.png"
            alt="Profile"
            fill
            className="object-cover rounded-full"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {element}
        </div>
      )}
    </>
  );

  return (
    <>
      {hasDivider && (
        <hr className="my-auto h-8 w-px bg-nav-divider mx-1 border-0" />
      )}
      <div className="group relative shrink-0 hover:z-10 flex">
        {link && !action ? (
          <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={link}
            {...motionProps}
          >
            {inner}
          </motion.a>
        ) : (
          <motion.button
            ref={ref as React.Ref<HTMLButtonElement>}
            onClick={action}
            {...motionProps}
          >
            {inner}
          </motion.button>
        )}
        <span className="pointer-events-none absolute -top-8 left-1/2 -z-10 -translate-x-1/2 pb-4 opacity-0 transition-[top,opacity] group-hover:pointer-events-auto group-hover:-top-10 group-hover:opacity-100">
          <span className="whitespace-nowrap rounded-md bg-nav-tooltip-bg px-3 py-1.5 text-xs font-medium text-nav-tooltip-text shadow-md border border-nav-border">
            {name}
          </span>
        </span>
        {isActive && (
          <div className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]" />
        )}
      </div>
    </>
  );
}
