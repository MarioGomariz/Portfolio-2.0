"use client";

import ArrowBackIcon from "@/components/icons/ArrowBackIcon";

export default function BackButton() {
  
  return (
    <a
    href="/projects"
      className="mb-6 btn btn-secondary cursor-pointer"
    >
      <ArrowBackIcon className="w-4 h-4" />
      Volver a proyectos
    </a>
  );
}
