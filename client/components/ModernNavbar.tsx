import { useEffect, useState } from "react";
import { Home, FileText, Briefcase, Settings2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { cvData } from "@shared/cv-data";

interface NavLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  { id: "hero", label: "Home", href: "#hero", icon: <Home size={20} /> },
  { id: "about", label: "About", href: "#about", icon: <FileText size={20} /> },
  {
    id: "portfolio",
    label: "Portfolio",
    href: "#portfolio",
    icon: <Briefcase size={20} />,
  },
  { id: "experience", label: "Experience", href: "#experience", icon: <Settings2 size={20} /> },
  { id: "contact", label: "Contact", href: "#contact", icon: <Mail size={20} /> },
];

const LOGO_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2F34370327f1eb4e9597af1f76cad19ce0%2F624139f05db246a196839befdae8e1ce?format=webp&width=800&height=1200";

export function ModernNavbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const navHeight = window.innerHeight;
      let currentSection = "hero";

      sections.forEach((section) => {
        const sectionId = section.getAttribute("data-section");
        const rect = section.getBoundingClientRect();

        if (rect.top <= navHeight / 3) {
          currentSection = sectionId || "hero";
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="relative bg-transparent">
      <div className="h-16 flex items-center justify-center">
        {/* Logo / Name Section - Absolute Left */}
        <div className="absolute left-6 md:left-12 flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white">
            <img
              src={LOGO_IMAGE}
              alt="MAD Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm">
            <span className="font-light text-foreground">{cvData.name.split(" ")[0]}</span>
            <span className="font-light text-accent ml-1">{cvData.name.split(" ")[1]}</span>
          </div>
        </div>

        {/* Centered Navigation Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "relative flex items-center justify-center transition-all duration-300 p-1.5 text-sm",
                activeSection === link.id
                  ? "text-accent font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title={link.label}
            >
              <div className="flex items-center justify-center">
                {link.icon}
              </div>

              {/* Active indicator */}
              {activeSection === link.id && (
                <div className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent rounded-full" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
