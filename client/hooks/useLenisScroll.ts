import { useEffect } from "react";

export const useLenisScroll = () => {
  useEffect(() => {
    let lenis: any = null;

    const initializeLenis = async () => {
      try {
        // Import modules
        const [LenisModule, gsapModule, ScrollTriggerModule] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        const Lenis = LenisModule.default;
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.default;

        if (!Lenis || !gsap) return;

        // Register ScrollTrigger plugin
        if (!gsap.plugins.scrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }

        // Initialize Lenis with momentum-based scrolling
        lenis = new Lenis({
          duration: 1.2, // Scroll duration
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
          wheelMultiplier: 1,
        });

        // Sync Lenis with GSAP ticker for smooth animations
        const updateScrollTrigger = () => {
          ScrollTrigger.update();
        };

        // Create RAF loop
        let rafId: number;
        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };

        // Start RAF loop
        rafId = requestAnimationFrame(raf);

        // Update ScrollTrigger on Lenis scroll
        lenis.on("scroll", updateScrollTrigger);

        // Cleanup function
        return () => {
          cancelAnimationFrame(rafId);
          lenis?.destroy();
        };
      } catch (error) {
        console.debug("Lenis initialization skipped - using native scroll");
      }
    };

    // Initialize after DOM is ready
    const initPromise = initializeLenis();

    // Cleanup
    return () => {
      initPromise.then((cleanup) => cleanup?.());
    };
  }, []);
};
