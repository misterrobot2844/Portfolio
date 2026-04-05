import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useScrollAnimation = (
  ref: React.RefObject<HTMLElement>,
  animation: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline,
  options: AnimationOptions = {}
) => {
  const {
    trigger,
    start = "top center",
    end = "bottom center",
    scrub = false,
    markers = false,
    onEnter,
    onLeave,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const tween = animation(element);

    if (!tween) return;

    ScrollTrigger.create({
      trigger: trigger || element,
      start,
      end,
      scrub,
      markers,
      onEnter: () => onEnter?.(),
      onLeave: () => onLeave?.(),
    });

    tween.scrollTrigger?.refresh();

    return () => {
      tween.kill();
      tween.scrollTrigger?.kill();
    };
  }, [ref, animation, trigger, start, end, scrub, markers, onEnter, onLeave]);
};

export const useStaggerAnimation = (
  ref: React.RefObject<HTMLElement>,
  selector: string,
  options: AnimationOptions = {}
) => {
  const {
    trigger,
    start = "top 80%",
    scrub = false,
    markers = false,
    onEnter,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trigger || ref.current,
          start,
          scrub,
          markers,
          onEnter: () => onEnter?.(),
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === (trigger || ref.current)) {
          trigger.kill();
        }
      });
    };
  }, [ref, selector, trigger, start, scrub, markers, onEnter]);
};

export const useParallax = (
  ref: React.RefObject<HTMLElement>,
  speed: number = 0.5
) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => window.innerHeight * speed,
      scrollTrigger: {
        trigger: ref.current,
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [ref, speed]);
};
