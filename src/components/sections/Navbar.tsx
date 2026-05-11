import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

const links = [
  { name: "About", href: "#about" },
  { name: "Stack", href: "#stack" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/0",
        scrolled ? "bg-[#0a0a0a]/80 backdrop-blur-md border-white/10 py-6" : "bg-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Magnetic>
          <a href="#" className="p-2 -m-2 text-xl font-black tracking-tighter uppercase mix-blend-difference z-10 hover:italic transition-all">
            Dominic<span className="text-swiss-red">.</span>
          </a>
        </Magnetic>
        
        <nav className="hidden md:flex items-center gap-8 mix-blend-difference z-10">
          {links.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Magnetic>
                <a
                  href={link.href}
                  className="p-2 -m-2 text-[11px] font-semibold tracking-widest uppercase text-white/50 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </nav>
        
        <Magnetic>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center border border-white/20 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-swiss-red hover:text-white transition-colors hover:border-transparent mix-blend-difference z-10"
          >
            AVAILABLE RIGHT NOW
          </a>
        </Magnetic>
      </div>
    </motion.header>
  );
}
