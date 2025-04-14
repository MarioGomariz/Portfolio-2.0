import { SectionTitle } from "@/components/ui/section";
import {
  HtmlIcon,
  CssIcon,
  JavaScriptIcon,
  TsIcon,
  ReactIcon,
  NodeIcon,
  NextJS,
  AstroIcon,  
  GitIcon,
  FigmaIcon,
} from "@/components/icons/dev"; 
import portfolioData from "@/data/portfolio.json";
import Github from "../icons/Github";

// Función para renderizar el icono correcto según el nombre
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "HtmlIcon":
      return HtmlIcon;
    case "CssIcon":
      return CssIcon;
    case "JavaScriptIcon":
      return JavaScriptIcon;
    case "TsIcon":
      return TsIcon;
    case "ReactIcon":
      return ReactIcon;
    case "NodeIcon":
      return NodeIcon;
    case "NextJS":
      return NextJS;
    case "AstroIcon":
      return AstroIcon;
    case "GithubIcon":
      return Github;
    case "GitIcon":
      return GitIcon;
    case "FigmaIcon":
      return FigmaIcon;
    default:
      return null;
  }
};

// Definir una interfaz para el tipo Skill
interface Skill {
  name: string;
  icon: string;
  level?: number;
  // Añade aquí otras propiedades que pueda tener skill
}

// Componente para renderizar una skill
const SkillItem = ({ skill, index }: { skill: Skill, index: number }) => {
  const IconComponent = getIconComponent(skill.icon);
  return (
    <div 
      key={skill.name} 
      className="group flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 animate-scale-in dark-card hover:border-blue-500"
      style={{ animationDelay: `${(index + 1) * 50}ms` }}
    >
      <div className="p-3 rounded-full mb-3 transition-colors" 
        style={{ 
          backgroundColor: 'var(--background-element)',
        }}>
        {IconComponent && 
          <IconComponent className="w-8 h-8" style={{ color: 'var(--primary)' }} />
        }
      </div>
      <span className="text-sm text-center dark-text transition-colors group-hover:text-blue-300">
        {skill.name}
      </span>
    </div>
  );
};

export default function Skills() {
  const { skills } = portfolioData;
  
  // Filtrar skills por categoría
  const technologies = skills.filter(skill => skill.category === 'technology');
  const tools = skills.filter(skill => skill.category === 'tool');

  return (
    <section id="skills" className="pt-20 wrapper animate-fade-in">
      <div className="animate-slide-in mb-12">
        <SectionTitle title="Stack tecnológico" />
      </div>
      
      {/* Sección de Tecnologías */}
      <div className="mt-8 animate-fade-in delay-200">
        <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-accent)' }}>
          Tecnologías
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {technologies.map((skill, index) => (
            <SkillItem key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
      
      {/* Sección de Herramientas */}
      <div className="mt-12 animate-fade-in delay-300">
        <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-accent)' }}>
          Herramientas
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tools.map((skill, index) => (
            <SkillItem key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
