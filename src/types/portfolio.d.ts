declare module "@/data/portfolio.json" {
  export interface PersonalInfo {
    name: string;
    profession: string;
    description: string;
  }

  export interface SocialLink {
    name: string;
    url: string;
    ariaLabel: string;
    icon: string;
  }

  export interface Project {
    id: number;
    title: string;
    slug: string;
    summary: string;
    description?: string | string[];
    tags: string[];
    image: string;
    demoUrl?: string;
    repoUrl?: string;
  }

  export interface Skill {
    name: string;
    icon: string;
    category: 'technology' | 'tool';
  }

  export interface SoftSkill {
    title: string;
    paragraphs: string[];
  }

  export interface PortfolioData {
    personalInfo: PersonalInfo;
    socialLinks: SocialLink[];
    projects: Project[];
    skills: Skill[];
    softSkills: SoftSkill[];
  }

  const portfolioData: PortfolioData;
  export default portfolioData;
}
