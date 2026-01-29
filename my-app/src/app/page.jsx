
"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/main/hero.jsx";
import HeroVideo from "@/main/HeroVideo";
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

      {/* MAIN CONTENT */}
      <main className="min-h-screen bg-gray-50 pt-24">
        <>
          <Hero />
        </>
      </main>
    </>
  )}
</>

  );
}

