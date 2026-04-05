import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const navContentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

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

      // Determine if we've scrolled past hero
      const heroSection = document.querySelector("[data-section='hero']");
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const scrolled = heroRect.bottom < 100;
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current || !navContentRef.current) return;

    if (isScrolled) {
      // Expand to left sidebar
      gsap.to(navRef.current, {
        left: 0,
        top: 0,
        xPercent: 0,
        width: "auto",
        duration: 0.6,
        ease: "power3.inOut",
      });

      gsap.to(navContentRef.current, {
        flexDirection: "column",
        gap: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
    } else {
      // Return to center
      gsap.to(navRef.current, {
        left: "50%",
        top: "1.5rem",
        xPercent: -50,
        duration: 0.6,
        ease: "power3.inOut",
      });

      gsap.to(navContentRef.current, {
        flexDirection: "row",
        gap: 8,
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [isScrolled]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Person's Name - Top Left */}
      <div className="fixed top-6 left-6 z-50 font-serif">
        <p className="text-lg font-light text-gray-800">{cvData.name.split(" ")[0]}</p>
        <p className="text-lg font-light text-red-500">{cvData.name.split(" ")[1]}</p>
      </div>

      {/* Floating/Sidebar Navigation */}
      <nav
        ref={navRef}
        className={cn(
          "fixed z-50 transition-colors",
          isScrolled
            ? "left-0 top-0 h-screen w-28 bg-background/95 border-r border-red-300/30 backdrop-blur-lg flex flex-col items-center py-8"
            : "left-1/2 top-6 -translate-x-1/2 bg-background/80 backdrop-blur-md rounded-full border border-red-300/40 px-12"
        )}
        style={{
          boxShadow: isScrolled ? "4px 0 20px rgba(0,0,0,0.1)" : "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <div
          ref={navContentRef}
          className={cn(
            "flex gap-8 transition-all",
            isScrolled && "flex-col gap-10 w-full px-0"
          )}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "relative group flex items-center justify-center rounded-lg transition-all duration-300 p-3 text-lg",
                activeSection === link.id
                  ? "text-red-500 bg-red-500/10"
                  : "text-gray-400 hover:text-red-400 hover:bg-red-500/5",
                isScrolled && "w-full"
              )}
              title={link.label}
            >
              <div className="flex items-center justify-center text-xl">
                {link.icon}
              </div>

              {/* Tooltip on hover for horizontal nav */}
              {!isScrolled && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-semibold">
                  {link.label}
                </span>
              )}

              {/* Active indicator for sidebar */}
              {isScrolled && activeSection === link.id && (
                <>
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-full" />
                  <div className="absolute inset-0 bg-red-500/10 rounded-lg" />
                </>
              )}

              {/* Hover effect for sidebar */}
              {isScrolled && activeSection !== link.id && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-red-500/5 rounded-lg transition-opacity" />
              )}
            </a>
          ))}
        </div>

        {/* Sidebar footer info */}
        {isScrolled && (
          <div className="mt-auto pt-8 border-t border-red-300/30 flex flex-col items-center gap-3">
            <div className="text-center">
              <p className="text-xs font-bold text-gray-800 truncate px-2">{cvData.name.split(" ")[0]}</p>
              <p className="text-xs text-red-500 font-light truncate px-2">{cvData.name.split(" ")[1]}</p>
            </div>
          </div>
        )}

        {/* Decorative red line - appears on sidebar */}
        {isScrolled && (
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-red-400 to-red-500 opacity-60" />
        )}
      </nav>

      {/* Decorative X marks - floating on sidebar */}
      {isScrolled && (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-32 pointer-events-none">
          <svg className="w-8 h-8 text-red-500 opacity-70 ml-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg className="w-8 h-8 text-red-500 opacity-70 ml-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Mobile floating nav indicator (hero only) */}
      {!isScrolled && (
        <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 text-center text-xs text-foreground/50 font-light hidden sm:block pointer-events-none">
          ↓ Scroll to explore
        </div>
      )}
    </>
  );
}
