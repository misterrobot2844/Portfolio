import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvData } from "@shared/cv-data";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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
      data-section="skills"
      className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-12 lg:px-16 bg-background overflow-hidden py-20 md:py-32"
    >
      <div className="max-w-5xl mx-auto py-12 md:py-20">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-8 md:mb-12"
        >
          Skills & Tools
        </h2>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {cvData.skills.map((skillGroup, idx) => (
            <div key={idx} className="opacity-0 animate-fadeIn" style={{ animationDelay: `${idx * 0.1}s` }}>
              <h3 className="text-lg md:text-xl font-light text-foreground/80 mb-6 uppercase tracking-wider">
                {skillGroup.category}
              </h3>

              <div className="space-y-3">
                {skillGroup.items.map((item, i) => (
                  <div
                    key={i}
                    className="text-base md:text-lg font-light text-foreground/60 flex items-center gap-3"
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Core Competencies Section */}
        <div className="mt-24 md:mt-32 pt-20 md:pt-28 border-t border-foreground/10">
          <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-3xl">
            Over the years, I've developed expertise across the full spectrum of content creation—from initial concept and storyboarding through post-production and final delivery. I'm comfortable with both technical tools and creative direction, and I thrive in collaborative environments where clear communication drives exceptional results.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
