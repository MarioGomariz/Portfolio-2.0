import { Home, Projects, Skills, SoftSkills } from "@/components/sections";

export default function Page() {
  return (
    <main className="px-4 sm:px-8 md:px-16 lg:px-32">
      <Home />
      <Projects />
      <Skills />
      <SoftSkills />
    </main>
  );
}
