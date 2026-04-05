import { ReactNode, useState, useEffect } from "react";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { ModernNavbar } from "./ModernNavbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useLenisScroll();
  const [sectionNumber, setSectionNumber] = useState("01");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const navHeight = window.innerHeight;
      let currentNumber = "01";

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navHeight / 3) {
          currentNumber = String(index + 1).padStart(2, "0");
        }
      });

      setSectionNumber(currentNumber);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <ModernNavbar />

      {/* Section Numbering - Right Side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none">
        <div className="text-4xl font-light text-gray-300 tracking-wider">
          {sectionNumber}
        </div>
        <div className="w-12 h-px bg-red-300/40"></div>
      </div>

      {children}
    </div>
  );
}
