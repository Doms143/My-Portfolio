import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Monitor, Layers, Zap, Cloud } from "lucide-react";

const services = [
  {
    icon: <Monitor size={32} strokeWidth={1.5} />,
    title: "Web Development",
    desc: "Performant, scaleable, and resilient frontend applications using modern frameworks like React and Next.js.",
    className: "md:col-span-2 md:row-span-2 bg-[#111] border border-white/10 rounded-2xl",
  },
  {
    icon: <Layers size={32} strokeWidth={1.5} />,
    title: "UI/UX Architecture",
    desc: "Bridging the gap between design and engineering with pixel-perfect implementation and accessible components.",
    className: "md:col-span-1 md:row-span-1 bg-[#111] border border-white/10 rounded-2xl",
  },
  {
    icon: <Zap size={32} strokeWidth={1.5} />,
    title: "API Development",
    desc: "Robust backend services and REST/GraphQL APIs architected for speed and seamless integration.",
    className: "md:col-span-1 md:row-span-1 bg-[#111] border border-white/10 rounded-2xl",
  },
  {
    icon: <Cloud size={32} strokeWidth={1.5} />,
    title: "Cloud & DevOps",
    desc: "Automated deployments, containerized environments, and cloud infrastructure management.",
    className: "md:col-span-2 md:row-span-1 bg-swiss-red/10 border border-swiss-red/30 rounded-2xl",
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 px-6 bg-transparent text-white border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4 md:mb-8">
              05 // Capabilities
            </h2>
            <h3 className="text-4xl md:text-6xl tracking-tighter uppercase font-black italic">
              Services.
            </h3>
          </div>
          <p className="text-white/60 max-w-sm text-sm">
            Comprehensive digital solutions bridging the gap between exceptional design and robust engineering.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 md:p-12 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-white/30 transition-all duration-500 group ${service.className} flex flex-col justify-between min-h-[300px] overflow-hidden relative`}
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="text-white/40 group-hover:text-white transition-colors duration-500 mb-12 relative z-10">
                {service.icon}
              </div>
              <div className="relative z-10">
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:italic transition-all duration-500">{service.title}</h4>
                <p className="text-white/60 leading-relaxed text-sm max-w-md group-hover:text-white/80 transition-colors duration-500">
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
