import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { Magnetic } from "./Magnetic";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/dominic-tacatani-9860b33a2/", name: "LinkedIn" },
  { icon: Github, href: "https://github.com/Doms143", name: "GitHub" },
  { icon: Twitter, href: "https://x.com/Domzu01", name: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/domzu1/?hl=en", name: "Instagram" },
  { icon: Mail, href: "mailto:dominictacatani123@gmail.com", name: "Email" },
];

export function FloatingLinks() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 3 }}
      className="fixed left-6 lg:left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center mix-blend-difference"
    >
      <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-white/30 mb-6" />
      
      <div className="flex flex-col items-center gap-4">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <Magnetic key={social.name}>
              <a 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
                aria-label={social.name}
              >
                <div className="absolute inset-0 rounded-full border border-white/0 transition-all duration-300 group-hover:border-white/20 group-hover:scale-110 bg-white/0 group-hover:bg-white/10" />
                <Icon size={22} strokeWidth={1.5} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </Magnetic>
          );
        })}
      </div>

      <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-white/30 mt-6" />
    </motion.div>
  );
}
