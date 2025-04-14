import { SectionTitle } from "@/components/ui/section";
import portfolioData from "@/data/portfolio.json";

export default function SoftSkills() {
  const { softSkills } = portfolioData;
  
  return (
    <section id="soft-skills" className="py-20 wrapper animate-fade-in">
      <div className="animate-slide-in mb-12">
        <SectionTitle title="Habilidades blandas" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {softSkills.map((skill, index) => (
          <article 
            key={skill.title} 
            className="group p-6 rounded-lg dark-card transition-all duration-300 hover:border-blue-500 animate-scale-in"
            style={{ animationDelay: `${(index + 1) * 150}ms` }}
          >
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-semibold transition-colors" 
                style={{ 
                  color: 'var(--text-accent)',
                }}>
                {skill.title}
              </h3>
            </div>
            
            <div className="pl-14">
              {skill.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm dark-text-muted mb-3 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
