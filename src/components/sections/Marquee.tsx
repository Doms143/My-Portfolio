import { motion } from "motion/react";

export function Marquee() {
  return (
    <section className="py-8 border-y border-white/10 overflow-hidden bg-swiss-red flex items-center">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        className="flex whitespace-nowrap w-fit shrink-0"
      >
        {[...Array(4)].map((_, i) => (
          <h2 key={i} className="text-4xl md:text-6xl lg:text-[7vw] leading-none font-black uppercase italic tracking-tighter text-[#0a0a0a] px-8 select-none flex items-center hover:text-white transition-colors duration-500">
            DOMINIC TACATANI <span className="text-white/50 mx-8 font-sans">//</span> SOFTWARE DEVELOPER <span className="text-white/50 mx-8 font-sans">//</span>
          </h2>
        ))}
      </motion.div>
    </section>
  );
}
