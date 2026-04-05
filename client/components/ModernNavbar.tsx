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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-red-300/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo / Name Section */}
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white">
            <img 
              src={LOGO_IMAGE}
              alt="MAD Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="font-serif text-lg">
            <span className="font-light text-gray-800">{cvData.name.split(" ")[0]}</span>
            <span className="font-light text-red-500 ml-1">{cvData.name.split(" ")[1]}</span>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "relative group flex items-center justify-center transition-all duration-300 p-2",
                activeSection === link.id
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-400"
              )}
              title={link.label}
            >
              <div className="flex items-center justify-center text-xl">
                {link.icon}
              </div>

              {/* Tooltip on hover */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-light">
                {link.label}
              </span>

              {/* Active indicator */}
              {activeSection === link.id && (
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
