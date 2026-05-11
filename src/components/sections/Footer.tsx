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
    <footer ref={ref} className="bg-[#0a0a0a] text-white overflow-hidden py-12 px-6 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
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
    </footer>
  );
}
