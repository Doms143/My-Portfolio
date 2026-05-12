import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiThreedotjs,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiRedis, SiGraphql,
  SiDocker, SiKubernetes, SiGithubactions, SiVercel, SiLinux,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const iconMap: Record<string, ReactNode> = {
  "React": <SiReact size={18} />,
  "Next.js": <SiNextdotjs size={18} />,
  "TypeScript": <SiTypescript size={18} />,
  "Tailwind CSS": <SiTailwindcss size={18} />,
  "Framer Motion": <SiFramer size={18} />,
  "WebGL / Three.js": <SiThreedotjs size={18} />,
  "Node.js": <SiNodedotjs size={18} />,
  "Express": <SiExpress size={18} />,
  "PostgreSQL": <SiPostgresql size={18} />,
  "MongoDB": <SiMongodb size={18} />,
  "Redis": <SiRedis size={18} />,
  "GraphQL": <SiGraphql size={18} />,
  "Docker": <SiDocker size={18} />,
  "Kubernetes": <SiKubernetes size={18} />,
  "AWS": <FaAws size={18} />,
  "CI/CD Actions": <SiGithubactions size={18} />,
  "Vercel": <SiVercel size={18} />,
  "Linux": <SiLinux size={18} />,
};

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
                    className="group flex items-center gap-3 cursor-crosshair text-white/70 hover:text-white transition-colors"
                  >
                    <span className="text-white/40 group-hover:text-swiss-red transition-colors shrink-0">
                      {iconMap[skill] ?? null}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
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
