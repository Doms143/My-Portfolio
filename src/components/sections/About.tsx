import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TextReveal, BlockReveal } from "@/components/ui/TextReveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="about" ref={ref} className="py-32 px-6 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-4 flex flex-col items-start gap-8">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              01 // About Me
            </h2>
            
            {/* Profile Picture Container */}
            <div className="relative w-full max-w-[280px] aspect-[4/5] group overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-swiss-red/20 group-hover:bg-transparent transition-colors z-10 duration-500 blend-multiply pointer-events-none" />
              <motion.img 
                style={{ y: imgY, scale: 1.2 }}
                src="/images/profile.png" 
                alt="Dominic Tacatani" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 origin-center"
              />
            </div>
          </div>
          
          <div className="md:col-span-8">
            <motion.div style={{ y }} className="space-y-12">
              <h3 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
                <BlockReveal>
                  I translate complex technical problems into <span className="italic font-serif">scalable</span> software solutions. Focus on pristine code and minimalist interfaces.
                </BlockReveal>
              </h3>
              
              <div className="space-y-6 text-white/60 text-sm max-w-2xl leading-relaxed">
                <BlockReveal delay={0.1}>
                  <p>
                    With a foundation in both graphic design and computer science, my approach marries the stark, structured beauty of Swiss design with robust modern engineering.
                  </p>
                </BlockReveal>
                <BlockReveal delay={0.2}>
                  <p>
                    I believe that the best code, like the best design, is invisible—doing its job efficiently without calling unnecessary attention to itself. Currently specializing in React architectures, backend APIs, and performant web experiences.
                  </p>
                </BlockReveal>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
                <BlockReveal delay={0.3}>
                  <div>
                    <h4 className="text-5xl font-black italic text-white mb-2">05+</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-swiss-red">Years Experience</p>
                  </div>
                </BlockReveal>
                <BlockReveal delay={0.4}>
                  <div>
                    <h4 className="text-5xl font-black italic text-white mb-2">05</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-swiss-red">Projects Delivered</p>
                  </div>
                </BlockReveal>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
