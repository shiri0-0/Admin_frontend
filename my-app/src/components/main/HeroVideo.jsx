"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo({ onFinish }) {
  const containerRef = useRef(null);
  const skippedRef = useRef(false);

  useEffect(() => {
    const skipVideo = () => {
      if (skippedRef.current) return;
      skippedRef.current = true;

      if (containerRef.current) {
        containerRef.current.classList.add(
          "opacity-0",
          "scale-110"
        );
      }

      setTimeout(() => {
        onFinish();
      }, 700);
    };

    // ⏱️ AUTO END (GIF duration)
    const AUTO_END_TIME = 3500; // ms (GIF ke length ke hisaab se change karo)
    const timer = setTimeout(skipVideo, AUTO_END_TIME);

    const options = { once: true };

    // 🖱️ Scroll / touch / key = skip
    window.addEventListener("wheel", skipVideo, options);
    window.addEventListener("touchmove", skipVideo, options);
    window.addEventListener("keydown", skipVideo, options);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("wheel", skipVideo);
      window.removeEventListener("touchmove", skipVideo);
      window.removeEventListener("keydown", skipVideo);
    };
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black
      transition-all duration-700 ease-out"
    >
      {/* GIF */}
      <img
        src="/mainit.gif"
        alt="Intro"
        className="w-full h-full object-cover scale-105"
      />

    </div>
  );
}
