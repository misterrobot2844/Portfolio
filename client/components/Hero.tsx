import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cvData } from "@shared/cv-data";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2F913f3a1b6ef143769ac48d3e10cbdd58%2F7937f40967da44d2839dd9c93555dd0d?format=webp&width=1600&height=900";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!heroRef.current || !bgRef.current || !contentRef.current) return;

    // Entrance animation for text (on load)
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      0
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
      0.2
    );

    // Scroll-triggered background reveal and parallax
    gsap.to(bgRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrub for scroll-driven animation
        markers: false,
      },
    });

    // Parallax effect on background
    gsap.to(bgRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // Text parallax (moves in opposite direction for depth)
    gsap.to(contentRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      data-section="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-200/40 via-red-100/30 to-red-50/50 pt-20"
    >
      {/* Background Image Layer - Initially Hidden, Smaller Size, Rounded & Wavy */}
      <div
        ref={bgRef}
        className="absolute left-1/2 -translate-x-1/2 bottom-24 w-1/4 h-1/3 opacity-0 overflow-hidden"
        style={{
          willChange: "transform, opacity",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 95% 90%, 85% 92%, 70% 90%, 50% 95%, 30% 92%, 15% 90%, 5% 88%, 0% 85%)",
        }}
      >
        <div
          className="w-full h-full rounded-2xl"
          style={{
            backgroundImage: `url('${HERO_IMAGE}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 via-red-50/40 to-transparent pointer-events-none" />

      {/* Content Layer - Foreground */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 md:px-8 max-w-3xl"
        style={{ willChange: "transform" }}
      >
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 leading-tight mb-6"
        >
          Design with a Human Touch
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto mb-12"
        >
          Creating visual stories through motion, design, and strategic creativity
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#portfolio"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Wave Effect at Bottom - More Wavy and Curly */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path
            d="M0,60 Q150,20 300,50 T600,40 T900,60 T1200,45 L1200,150 L0,150 Z"
            fill="#fef2f2"
            stroke="none"
          />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
