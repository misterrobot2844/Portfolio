import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvData } from "@shared/cv-data";
import { Mail, Linkedin, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll("[data-contact]");
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
      id="contact"
      data-section="contact"
      className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-12 lg:px-16 bg-foreground text-background overflow-hidden py-20 md:py-32"
    >
      <div className="max-w-5xl mx-auto py-12 md:py-20">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-2xl md:text-3xl lg:text-4xl font-light text-primary mb-8 md:mb-12"
        >
          Get In Touch
        </h2>

        {/* Contact Methods */}
        <div ref={contentRef} className="space-y-6 md:space-y-8 mb-8 md:mb-12">
          {/* Email */}
          <a
            href={`mailto:${cvData.email}`}
            data-contact
            className="group block hover:translate-x-2 transition-transform"
          >
            <div className="flex items-start gap-6">
              <Mail size={28} className="flex-shrink-0 text-primary mt-1" />
              <div>
                <p className="text-sm uppercase tracking-wider text-background/60 font-light mb-2">
                  Email
                </p>
                <p className="text-base md:text-lg font-light text-background group-hover:text-primary transition-colors">
                  {cvData.email}
                </p>
              </div>
            </div>
          </a>

          {/* Behance */}
          <a
            href={cvData.website}
            target="_blank"
            rel="noopener noreferrer"
            data-contact
            className="group block hover:translate-x-2 transition-transform"
          >
            <div className="flex items-start gap-6">
              <ExternalLink size={28} className="flex-shrink-0 text-primary mt-1" />
              <div>
                <p className="text-sm uppercase tracking-wider text-background/60 font-light mb-2">
                  Behance
                </p>
                <p className="text-base md:text-lg font-light text-background group-hover:text-primary transition-colors">
                  View My Portfolio
                </p>
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={cvData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-contact
            className="group block hover:translate-x-2 transition-transform"
          >
            <div className="flex items-start gap-6">
              <Linkedin size={28} className="flex-shrink-0 text-primary mt-1" />
              <div>
                <p className="text-sm uppercase tracking-wider text-background/60 font-light mb-2">
                  LinkedIn
                </p>
                <p className="text-base md:text-lg font-light text-background group-hover:text-primary transition-colors">
                  Connect With Me
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="border-t border-background/20 pt-6 md:pt-8">
          <p className="text-xs font-light text-background/60">
            © {new Date().getFullYear()} Muhammad Ahmad. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
