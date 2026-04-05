import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvData } from "@shared/cv-data";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.5,
        },
      }
    );

    // Staggered items animation
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll("[data-project]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "top 10%",
            scrub: 0.5,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="portfolio"
      className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-12 lg:px-16 bg-background overflow-hidden py-20 md:py-32"
    >
      <div className="max-w-5xl mx-auto py-12 md:py-20">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl font-light text-red-500 mb-16 md:mb-24"
        >
          My Work
        </h2>

        {/* Projects List */}
        <div ref={itemsRef} className="space-y-16 md:space-y-20">
          {cvData.projects.map((project, index) => (
            <div
              key={project.id}
              data-project
              className="border-b border-foreground/10 pb-16 md:pb-20 last:border-b-0"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                {/* Number */}
                <div className="text-6xl md:text-7xl font-light text-foreground/20 flex-shrink-0 -mt-2">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-3xl md:text-4xl font-light text-foreground mb-3">
                    {project.title}
                  </h3>

                  <p className="text-lg md:text-xl text-foreground/60 font-light mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm uppercase tracking-wider text-foreground/50 font-light">
                      {project.category}
                    </span>
                    <span className="text-sm text-foreground/40">•</span>
                    <span className="text-sm text-foreground/50">{project.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 md:mt-28 pt-16 md:pt-20 border-t border-foreground/10">
          <p className="text-lg md:text-xl text-foreground/70 font-light mb-6">
            View more of my work on Behance and LinkedIn
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={cvData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <span className="font-light">Behance</span>
              <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={cvData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <span className="font-light">LinkedIn</span>
              <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
