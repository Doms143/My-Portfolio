import { motion, useInView } from "motion/react";
import { useRef } from "react";

const experience = [
  {
    role: "Senior Software Engineer",
    company: "Acme Corp.",
    period: "2022 - Present",
    desc: "Architecting high-scale frontend systems and micro-frontends using React and Next.js. Led a team of 5 engineers to redesign the entire customer portal.",
  },
  {
    role: "Full Stack Developer",
    company: "Nexus Dynamics",
    period: "2019 - 2022",
    desc: "Built full-stack solutions using Node.js and React. Transitioned the legacy monolithic architecture into a scalable containerized microservices infrastructure.",
  },
  {
    role: "Frontend Engineer",
    company: "Creative Studio Alpha",
    period: "2017 - 2019",
    desc: "Focused on intense, animation-heavy marketing sites and e-commerce platforms. Mastered performant CSS and JavaScript animations.",
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="experience" className="py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-16">
          <div className="md:col-span-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-8">
              04 // Timeline
            </h2>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-4xl md:text-6xl tracking-tighter uppercase font-black italic text-white">
              Experience.
            </h3>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <div className="hidden md:block col-span-4" />
          <div className="col-span-1 md:col-span-8">
            <div className="space-y-16 border-l border-white/20 pl-8 md:pl-16 relative">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="absolute -left-[37px] md:-left-[69px] top-1.5 w-2 h-2 bg-swiss-black border-[1.5px] border-white/40 rounded-full group-hover:border-swiss-red transition-colors" />
                  
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff4d00] mb-2">{item.period}</p>
                  <h4 className="text-2xl md:text-4xl tracking-tight font-black uppercase group-hover:italic transition-all">
                    {item.role}
                  </h4>
                  <h5 className="text-sm font-medium text-white/40 mb-4 uppercase tracking-widest">{item.company}</h5>
                  <p className="text-white/60 leading-relaxed max-w-2xl text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
