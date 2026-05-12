import { motion, AnimatePresence, animate } from "motion/react";
import { useEffect, useState, useRef } from "react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const readyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const MIN_DURATION = 2000;
    const startTime = Date.now();

    const tryFinish = () => {
      const elapsed = Date.now() - startTime;
      const remaining = MIN_DURATION - elapsed;
      if (remaining <= 0) {
        setIsLoading(false);
      } else {
        timerRef.current = setTimeout(() => setIsLoading(false), remaining);
      }
    };

    const onPageReady = () => {
      readyRef.current = true;
      tryFinish();
    };

    if (document.readyState === "complete") {
      onPageReady();
    } else {
      window.addEventListener("load", onPageReady);
    }

    // Fallback – finish after MIN_DURATION regardless
    timerRef.current = setTimeout(() => {
      if (!readyRef.current) {
        readyRef.current = true;
      }
      setIsLoading(false);
    }, MIN_DURATION);

    const controls = animate(0, 100, {
      duration: 1.8,
      ease: "easeInOut",
      onUpdate: (value) => {
        setProgress(Math.round(value));
      }
    });

    return () => {
      window.removeEventListener("load", onPageReady);
      clearTimeout(timerRef.current);
      controls.stop();
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
          className="fixed inset-0 z-[999] bg-[#0a0a0a] flex items-center justify-center border-b border-swiss-red/20 origin-top"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="text-swiss-red font-black text-6xl md:text-9xl uppercase italic tracking-tighter"
            >
              System.Init<span className="text-white">_</span>
            </motion.div>
          </div>
          
          {/* Percentage */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-4xl md:text-6xl font-black font-mono text-white/80 tracking-widest uppercase"
          >
            {progress}%
          </motion.div>

          {/* Progress bar at bottom */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 h-1 bg-swiss-red transform-origin-left w-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
