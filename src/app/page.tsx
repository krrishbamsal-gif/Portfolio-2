"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

// Dynamically import Three.js scene (no SSR — canvas must run client-side)
const TunnelScene = dynamic(() => import("@/components/three/TunnelScene"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3.5s loading period to let the particle assembly animation assemble your photo completely
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen with Particle Convergence Photo & KRRISH reveal */}
      <LoadingScreen isLoading={isLoading} />

      {/* 3D Background — fixed behind everything */}
      <TunnelScene />

      {/* Main Content — sits above the 3D background */}
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
