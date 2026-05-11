import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Monitor, Layers, Zap, Cloud } from "lucide-react";

const services = [
  {
    icon: <Monitor size={32} strokeWidth={1.5} />,
    title: "Web Development",
    desc: "Performant, scaleable, and resilient frontend applications using modern frameworks like React and Next.js.",
    className: "md:col-span-2 md:row-span-2 bg-[#111]",
  },
  {
    icon: <Layers size={32} strokeWidth={1.5} />,
    title: "UI/UX Architecture",
    desc: "Bridging the gap between design and engineering with pixel-perfect implementation and accessible components.",
    className: "md:col-span-1 md:row-span-1 bg-[#0a0a0a]",
  },
  {
    icon: <Zap size={32} strokeWidth={1.5} />,
    title: "API Development",
    desc: "Robust backend services and REST/GraphQL APIs architected for speed and seamless integration.",
    className: "md:col-span-1 md:row-span-1 bg-[#0a0a0a]",
  },
  {
    icon: <Cloud size={32} strokeWidth={1.5} />,
    title: "Cloud & DevOps",
    desc: "Automated deployments, containerized environments, and cloud infrastructure management.",
    className: "md:col-span-2 md:row-span-1 bg-zinc-900 border-t border-white/5",
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section className="py-32 px-6 bg-transparent text-white border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-16">
          <div className="md:col-span-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-8">
              05 // Capabilities
            </h2>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-4xl md:text-6xl tracking-tighter uppercase font-black italic">
              Services.
            </h3>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 md:p-12 hover:bg-white/5 transition-all group ${service.className} flex flex-col justify-between min-h-[250px]`}
            >
              <div className="text-white/40 group-hover:text-swiss-red transition-colors mb-12">
                {service.icon}
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:italic transition-all">{service.title}</h4>
                <p className="text-white/60 leading-relaxed text-sm max-w-sm">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
