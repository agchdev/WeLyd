"use client";
import CustomCursor from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import Hero from "@/components/sections/hero";
import HorizontalScroll from "@/components/sections/horizontal-scroll";
import Plans from "@/components/sections/plans";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <Navbar />

      <Hero />
      <HorizontalScroll />
      <Plans />
      <Projects />
      <Contact />
    </main>
  );
}
