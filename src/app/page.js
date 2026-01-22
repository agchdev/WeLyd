"use client";
import CustomCursor from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import Hero from "@/components/sections/hero";
import Panels from "@/components/sections/panels";
import HorizontalScroll from "@/components/sections/horizontal-scroll";
import Plans from "@/components/sections/plans";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";

export default function Home() {
  const siteMode = process.env.NEXT_PUBLIC_SITE_MODE || "full";
  const isCountdown = siteMode === "countdown";

  return (
    <main className="relative min-h-screen">
      {isCountdown ? (
        <Hero showCountdown />
      ) : (
        <>
          <CustomCursor />
          <Navbar />
          <Hero />
          <Panels />
          <HorizontalScroll />
          <Plans />
          <Projects />
          <Contact />
        </>
      )}
    </main>
  );
}
