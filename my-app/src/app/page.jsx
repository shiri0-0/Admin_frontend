
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/main/navbar";
import HeroVideo from "@/components/main/HeroVideo";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "auto";
  }, [showIntro]);

  return (
    <>
      {showIntro ? (
        <HeroVideo onFinish={() => setShowIntro(false)} />
      ) : (
        <>
          <Navbar />

          
        </>
      )}
    </>
  );
}