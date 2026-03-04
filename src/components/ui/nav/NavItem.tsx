"use client";

import { motion, useSpring, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavItemProps {
  activeLink: string;
  link?: string;
  name: string;
  action?: () => void;
  element: React.ReactNode;
  isFirst: boolean;
  isLast: boolean;
  mouseX: MotionValue<number>;
}

export default function NavItem({
  activeLink,
  link,
  name,
  action,
  element,
  isFirst,
  isLast,
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

  const content = (
    <div className="group relative shrink-0 hover:z-10 flex">
      <motion.button
        ref={ref}
        onClick={action}
        className={`nav-item peer flex items-center justify-center rounded-2xl md:rounded-full transition-colors 
        ${isActive ? "text-[var(--primary)] bg-[var(--primary)]/10" : "text-[var(--text-secondary)] hover:bg-white/5"}
        `}
        style={{ width, height: 45 }}
      >
        {isFirst ? (
          <div className="w-full h-full relative overflow-hidden rounded-full p-1 border border-white/10 dark:border-white/5">
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
      </motion.button>
      <span className="pointer-events-none absolute -top-8 left-1/2 -z-10 -translate-x-1/2 pb-4 opacity-0 transition-[top,opacity] group-hover:pointer-events-auto group-hover:-top-10 group-hover:opacity-100">
        <span className="whitespace-nowrap rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium text-black shadow-md dark:bg-neutral-900 dark:text-neutral-50 dark:border dark:border-white/10">
          {name}
        </span>
      </span>
      {isActive && (
        <div className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]" />
      )}
    </div>
  );

  return (
    <>
      {isLast && (
        <hr className="my-auto h-8 w-px bg-neutral-300 dark:bg-neutral-700 mx-1 border-0" />
      )}
      {link && !action ? (
        <Link href={link || ""} scroll={true} passHref legacyBehavior>
          {content}
        </Link>
      ) : (
        content
      )}
    </>
  );
}
