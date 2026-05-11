import { motion } from "motion/react";
import React from "react";

export function TextReveal({ 
  children,
  className = "",
  delay = 0,
}: { 
  children: string;
  className?: string;
  delay?: number;
}) {
  const words = children.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden relative mr-[0.25em]">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.7,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + i * 0.02,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function BlockReveal({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 0.8,
          ease: [0.33, 1, 0.68, 1],
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
