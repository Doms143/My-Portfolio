import { motion, useInView } from "motion/react";
import { useRef } from "react";

const stack = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL / Three.js"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
  },
  {
    category: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD Actions", "Vercel", "Linux"],
  },
];

export function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="stack" ref={ref} className="py-32 px-6 bg-swiss-dark text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-24">
          <div className="md:col-span-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-8">
              02 // Technical Stack
            </h2>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-4xl md:text-6xl tracking-tighter uppercase font-black italic">
              Tools of the Trade
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
          {stack.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
            >
              <h4 className="text-lg font-bold mb-8 uppercase tracking-wider border-b border-white/10 pb-4 text-swiss-red">
                {group.category}
              </h4>
              <ul className="space-y-4 text-sm font-medium italic">
                {group.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: groupIndex * 0.2 + skillIndex * 0.1 }}
                    className="group flex items-center gap-4 cursor-crosshair text-white/70 hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-swiss-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
