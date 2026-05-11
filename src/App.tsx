import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Marquee } from "@/components/sections/Marquee";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <Preloader />
      <ReactLenis root>
        <div className="bg-swiss-black min-h-screen text-white font-sans selection:bg-swiss-red selection:text-white relative cursor-none md:cursor-auto">
        <CustomCursor />
        {/* Scroll Progress Indicator */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-swiss-red transform-origin-left z-[100]" 
          style={{ scaleX, originX: 0 }} 
        />
        {/* Background Noise Filter */}
        <div 
          className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-screen" 
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}
        />
        {/* Architectural Grid Lines */}
        <div className="fixed inset-0 z-0 pointer-events-none flex justify-center overflow-hidden">
          <div className="w-full max-w-7xl h-full flex justify-between px-6">
            <div className="w-px h-full bg-white/[0.03]" />
            <div className="hidden md:block w-px h-full bg-white/[0.03]" />
            <div className="w-px h-full bg-white/[0.03]" />
            <div className="hidden md:block w-px h-full bg-white/[0.03]" />
            <div className="w-px h-full bg-white/[0.03]" />
          </div>
        </div>
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Marquee />
          <TechStack />
          <Projects />
          <Experience />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
    </>
  );
}
