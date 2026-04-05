import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvData } from "@shared/cv-data";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

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

    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll("[data-experience]");
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
      id="experience"
      data-section="experience"
      className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-12 lg:px-16 bg-background overflow-hidden py-20 md:py-32"
    >
      <div className="max-w-4xl mx-auto py-12 md:py-20">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-8 md:mb-12"
        >
          Experience
        </h2>

        {/* Timeline */}
        <div ref={itemsRef} className="space-y-16 md:space-y-20">
          {cvData.experience.map((exp) => (
            <div key={exp.id} data-experience className="group">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Timeline marker */}
                <div className="flex-shrink-0 w-full md:w-48">
                  <p className="text-sm uppercase tracking-wider text-foreground/50 font-light">
                    {exp.period}
                  </p>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8 md:pb-12 border-b border-foreground/10 last:border-b-0">
                  <h3 className="text-base md:text-lg font-light text-foreground mb-1">
                    {exp.role}
                  </h3>

                  <p className="text-sm md:text-base font-light text-accent mb-3">
                    {exp.company}
                  </p>

                  <p className="text-sm md:text-base font-light text-foreground/70 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Key achievements */}
                  <ul className="space-y-2">
                    {exp.achievements.slice(0, 3).map((achievement, idx) => (
                      <li
                        key={idx}
                        className="text-xs md:text-sm font-light text-foreground/60 flex items-start gap-3"
                      >
                        <span className="text-red-500 mt-1.5 flex-shrink-0">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
