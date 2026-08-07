"use client";

import { useEffect, useRef, useState } from "react";

interface UseCarouselResult {
  isLeftDisabled: boolean;
  isRightDisabled: boolean;
  progress: number;
  scrollLeft: () => void;
  scrollRight: () => void;
  carouselRef: React.RefObject<HTMLDivElement>;
}

export function useCarousel(): UseCarouselResult {
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = Math.max(scrollWidth - clientWidth, 0);
        setIsLeftDisabled(scrollLeft <= 2);
        setIsRightDisabled(maxScroll === 0 || scrollLeft >= maxScroll - 2);
        setProgress(maxScroll === 0 ? 100 : Math.min(100, (scrollLeft / maxScroll) * 100));
      }
    };

    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(carousel);
    handleScroll();

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollByPage = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    carousel.scrollBy({
      left: direction * carousel.clientWidth * 0.85,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  };

  const scrollLeft = () => scrollByPage(-1);
  const scrollRight = () => scrollByPage(1);

  return {
    isLeftDisabled,
    isRightDisabled,
    progress,
    scrollLeft,
    scrollRight,
    carouselRef
  };
}
