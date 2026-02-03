

import Banner from "@/components/home/Banner";
import ChatDemo from "@/components/home/ChatDemo";
import Features from "@/components/home/Features";
import Header from "@/components/Header";
import Hero from "@/components/sections/hero";

export default function Home() {
  const siteMode = process.env.NEXT_PUBLIC_SITE_MODE || "full";
  const isCountdown = siteMode === "countdown" || siteMode === "contdown";

  return (

    <main className="relative min-h-screen">
      {isCountdown ? <Hero /> :
        <>
          <Header />
          <Banner />
          <ChatDemo />
          <Features />
        </>
      }
    </main>
  );
}
