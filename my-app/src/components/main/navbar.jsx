"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${show ? "bg-white shadow-md translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LEFT: Auth */}
        <div className="flex items-center space-x-6 text-[#0a1a3a] font-medium">
          <a
            href="/login"
            className="hover:opacity-70 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-2 border border-[#0a1a3a] rounded-full
            hover:bg-[#0a1a3a] hover:text-white transition"
          >
            Sign Up
          </a>
        </div>

        {/* RIGHT: Logo */}
        <h1 className="text-2xl font-bold tracking-wide text-[#0a1a3a]">
          MyBrand
        </h1>
      </div>
    </nav>
  );
}
