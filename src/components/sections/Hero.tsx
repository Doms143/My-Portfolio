import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { SnakeGame } from "./SnakeGame";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const cebuTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(cebuTime);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-end pb-24 overflow-hidden pt-24">
      {/* Background Interactive Snake Game */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <SnakeGame />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-9">
            <div className="overflow-hidden mb-2">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="whitespace-nowrap pr-4 text-[18vw] md:text-[14vw] lg:text-[13vw] xl:text-[160px] leading-[0.85] font-black tracking-tighter uppercase italic"
              >
                Dominic
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="whitespace-nowrap pr-4 text-[18vw] md:text-[14vw] lg:text-[13vw] xl:text-[160px] leading-[0.85] font-black tracking-tighter uppercase italic text-swiss-red flex items-center gap-4"
              >
                Tacatani.
              </motion.h1>
            </div>
          </div>
          
          <div className="lg:col-span-3 pb-4 flex flex-col gap-8 md:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <h2 className="text-white/80 font-bold uppercase tracking-widest text-xs mb-4">Software Developer.</h2>
              <p className="text-swiss-gray text-sm md:text-base font-medium uppercase tracking-widest inline-block">
                Building digital experiences at the intersection of minimal design and solid engineering.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="md:mt-12 flex flex-col gap-8"
            >
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-swiss-gray">
                <span className="inline-block w-8 h-[1px] bg-swiss-gray/50" />
                Scroll
                <motion.div 
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-4 h-6 border border-swiss-gray/50 rounded-full flex justify-center p-1"
                >
                  <div className="w-1 h-1 bg-swiss-red rounded-full" />
                </motion.div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-4">
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 mb-1">Local Time</h4>
                  <p className="font-mono text-xs tracking-widest text-[#f2f2f2]">{time} PHT</p>
                </div>
                <div className="text-right">
                  <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 mb-1">Status</h4>
                  <p className="font-mono text-xs tracking-widest text-[#f2f2f2] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-swiss-red animate-pulse block"></span>
                    ONLINE
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
