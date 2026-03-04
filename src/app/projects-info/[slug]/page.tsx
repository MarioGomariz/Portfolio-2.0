import portfolioDataEn from "@/data/portfolio.en.json";
import portfolioDataEs from "@/data/portfolio.es.json";
import ProjectContent from "./ProjectContent";

export async function generateStaticParams() {
  // Combine all slugs from both languages to ensure all static pages are generated
  const allProjects = [
    ...portfolioDataEn.projects,
    ...portfolioDataEs.projects,
  ];
  const uniqueSlugs = Array.from(new Set(allProjects.map((p) => p.slug)));

  return uniqueSlugs.map((slug) => ({ slug }));
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
