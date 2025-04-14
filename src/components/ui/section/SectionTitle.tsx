import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

export default function SectionTitle({ title, children }: Props) {
  return (
    <div className="relative">
      <h2 className="text-3xl font-bold flex items-center gap-3 dark-text">
        {children}
        <span className="relative inline-block">
          {title}
          {/* Línea que se anima */}
          <span
            className="absolute -bottom-1 left-0 h-[4px] bg-gradient-to-r from-red-500 to-red-700 [animation:fillLine_1.5s_ease-out_forwards] w-0"
          />
        </span>
      </h2>
    </div>
  );
}
