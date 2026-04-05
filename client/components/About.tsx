import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvData } from "@shared/cv-data";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Scroll-driven fade in animation for heading
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
          scrub: 0.5, // Smooth scroll-driven animation
          markers: false,
        },
      }
    );

    // Scroll-driven animations for content
    if (contentRef.current) {
      const paragraphs = contentRef.current.querySelectorAll("p");
      paragraphs.forEach((para, index) => {
        gsap.fromTo(
          para,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 20%",
              scrub: 0.5,
            },
          }
        );
      });
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
      data-section="about"
      className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-12 lg:px-16 bg-background overflow-hidden py-20 md:py-32"
    >
      <div className="max-w-4xl mx-auto py-12 md:py-20">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl font-light text-red-500 mb-12 md:mb-16"
        >
          About Me
        </h2>

        {/* Content */}
        <div
          ref={contentRef}
          className="space-y-8 md:space-y-10"
        >
          <p className="text-xl md:text-2xl font-light text-foreground/90 leading-relaxed max-w-3xl">
            I'm a video editor and graphic designer with a passion for creating visual content that tells compelling stories. With 2.5+ years of experience, I've worked with diverse brands to elevate their visual presence and drive real engagement.
          </p>

          <p className="text-lg md:text-xl font-light text-foreground/70 leading-relaxed max-w-3xl">
            My approach centers on understanding the unique identity and goals of each brand, then crafting designs and edits that resonate with their audience. Whether it's a promotional video, social media content, or complete brand identity design, I bring attention to detail and creative problem-solving to every project.
          </p>

          <p className="text-lg md:text-xl font-light text-foreground/70 leading-relaxed max-w-3xl">
            I believe in the power of visual storytelling to create meaningful connections. Every frame, every edit, every design choice is intentional—designed to communicate, inspire, and drive results.
          </p>
        </div>
      </div>
    </section>
  );
}
