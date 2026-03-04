import portfolioDataEn from "@/data/portfolio.en.json";
import portfolioDataEs from "@/data/portfolio.es.json";
import { useLanguage } from "@/providers/LanguageProvider";
import ProjectContent from "./ProjectContent";

export async function generateStaticParams() {
  const {language} = useLanguage();
  const { projects } = language === "en" ? portfolioDataEn : portfolioDataEs;
  return projects.map((project) => ({ slug: project.slug }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProjectPage(props: PageProps) {
  const { slug } = await props.params;

  return <ProjectContent slug={slug} />;
}
