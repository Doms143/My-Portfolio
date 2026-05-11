import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);

  return (
    <footer ref={ref} className="bg-[#0a0a0a] text-white overflow-hidden pt-24 pb-12 px-6 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        <div className="mb-24 md:mb-32">
          <motion.a 
            href="#contact"
            className="group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 hover:text-swiss-red transition-colors"
          >
            <span className="w-8 h-[1px] bg-white/20 group-hover:bg-swiss-red transition-colors" />
            Start a project
          </motion.a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div style={{ y }} className="w-full md:w-auto">
            <h2 className="text-[15vw] md:text-[6vw] leading-[0.8] tracking-tighter font-black uppercase select-none italic hover:text-[#ff4d00] transition-colors">
              Tacatani.
            </h2>
          </motion.div>
          
          <div className="flex flex-col items-start md:items-end gap-2 text-[9px] uppercase tracking-widest font-bold pb-2 text-white/40">
            <p>10.3157° N, 123.8854° E // CEBU, PHILIPPINES</p>
            <p>Built with Swiss Precision</p>
            <p>© {new Date().getFullYear()} Dominic Tacatani</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
