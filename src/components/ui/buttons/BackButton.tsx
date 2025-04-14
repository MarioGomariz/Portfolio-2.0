"use client";

import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.back()}
      className="mb-6 btn btn-secondary cursor-pointer"
    >
      <ArrowBackIcon className="w-4 h-4" />
      Volver
    </button>
  );
}
