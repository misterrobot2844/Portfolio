import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvData } from "@shared/cv-data";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
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
      data-section="services"
      className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-12 lg:px-16 bg-background overflow-hidden py-20 md:py-32"
    >
      <div className="max-w-5xl mx-auto py-12 md:py-20">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-8 md:mb-12"
        >
          Why Work with Me?
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {cvData.services.map((service, idx) => (
            <div
              key={service.id}
              className="group opacity-0 animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl font-light text-red-500/30 flex-shrink-0 mt-2">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl md:text-3xl font-light text-foreground group-hover:text-red-500 transition-colors">
                  {service.title}
                </h3>
              </div>

              <p className="text-lg md:text-xl font-light text-foreground/60 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 md:mt-28 pt-16 md:pt-20 border-t border-foreground/10 text-center">
          <h3 className="text-3xl md:text-4xl font-light text-red-500 mb-8">
            Ready to Start Your Project?
          </h3>
          <p className="text-xl md:text-2xl font-light text-foreground/70 mb-12 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch to discuss your vision.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-lg font-light text-foreground hover:text-red-500 transition-colors group border-b-2 border-transparent hover:border-red-500 pb-1"
          >
            Start a Project
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
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
