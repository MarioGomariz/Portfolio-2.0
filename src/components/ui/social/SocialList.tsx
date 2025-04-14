import GitHub from "@/components/icons/Github";
import Linkedin from "@/components/icons/Linkedin";
import portfolioData from "@/data/portfolio.json";

export default function SocialList() {
  const { socialLinks } = portfolioData;

  // Función para renderizar el icono correcto según el nombre
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "GitHub":
        return <GitHub className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <ul className="flex gap-4">
      {socialLinks.map((social, index) => (
        <li key={index}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            className="btn btn-primary"
          >
            {renderIcon(social.icon)}
            <span>{social.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
