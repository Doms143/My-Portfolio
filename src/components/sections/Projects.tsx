import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  // -------------------------------------------------------------
  // Instructions: How to add a new project
  // 1. Copy an existing object inside this array.
  // 2. Increment the 'id', 'title', 'category', 'tech', 'year'.
  // 3. For 'color', use a Tailwind CSS background utility (e.g. 'bg-zinc-800' or 'bg-[#0a0a0a]').
  // 4. Add 'images: ["url1", "url2"]' array (optional).
  // 5. Add 'link: "https://yourlink.com"' string (optional).
  // -------------------------------------------------------------
  {
    id: "01",
    title: "Omni.System",
    category: "Financial Dashboard",
    tech: ["React", "TypeScript", "D3.js", "Node.js"],
    year: "2023",
    color: "bg-zinc-900",
  },
  {
    id: "02",
    title: "Neuro/Net",
    category: "Machine Learning UI",
    tech: ["Next.js", "Python", "Tailwind", "Framer Motion"],
    year: "2024",
    color: "bg-[#111]",
  },
  {
    id: "03",
    title: "Basel E-Commerce",
    category: "Retail Platform",
    tech: ["Shopify", "React", "GraphQL", "Redis"],
    year: "2024",
    color: "bg-zinc-950",
  },
];

function ProjectCard({ project, index, progress }: { project: any, index: number, progress: any }) {
  const y = useTransform(progress, [0, 1], [0, -50 * index]);
  const scale = useTransform(progress, [index * 0.25, 1], [1, 0.95]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (project.images && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (project.images && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const hasImages = project.images && project.images.length > 0;

  return (
    <motion.div
      style={{ y, scale, top: `calc(10vh + ${index * 60}px)` }}
      className={`sticky w-full h-[70vh] md:h-[80vh] ${project.color} border border-white/10 p-8 md:p-16 flex flex-col justify-between origin-top group backdrop-blur-md overflow-hidden`}
    >
      {hasImages && (
        <div className="absolute inset-0 z-0">
          <img 
            src={project.images[currentImageIndex]} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-20 group-hover:opacity-60 transition-opacity duration-700" 
          />
          {project.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 text-white rounded-full hover:bg-swiss-red transition-colors opacity-0 group-hover:opacity-100 z-20"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 text-white rounded-full hover:bg-swiss-red transition-colors opacity-0 group-hover:opacity-100 z-20"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
        </div>
      )}

      <div className="flex justify-between items-start relative z-20 pointer-events-none">
        <h3 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase leading-none select-none transition-colors group-hover:text-white text-stroke text-stroke-hover">
          {project.title}
        </h3>
        <span className="text-2xl md:text-4xl font-mono text-swiss-gray pointer-events-auto">{project.id}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-8 mt-auto relative z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Category</h4>
          <p className="text-lg font-bold group-hover:italic transition-all">{project.category}</p>
        </div>
        <div className="pointer-events-auto">
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-2 text-[11px] text-white/40 leading-snug">
            {project.tech.map((t: string) => (
              <span key={t} className="px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-[#f2f2f2] bg-black/50 backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:items-end justify-between pointer-events-auto">
          <div className="text-left md:text-right w-full">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Year</h4>
            <p className="font-mono text-lg text-white/40">{project.year}</p>
          </div>
          {project.link ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 mt-4 md:mt-0 text-[10px] font-bold uppercase tracking-widest hover:text-swiss-red transition-colors text-[#f2f2f2]"
            >
              View Case <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          ) : (
            <button className="flex items-center gap-2 mt-4 md:mt-0 text-[10px] font-bold uppercase tracking-widest hover:text-swiss-red transition-colors text-[#f2f2f2]">
              View Case <ArrowUpRight size={14} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="bg-swiss-black relative">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-16">
          03 // Selected Works
        </h2>
      </div>

      <div ref={containerRef} className="pb-32 px-4 md:px-12 relative" style={{ height: "300vh" }}>
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            progress={scrollYProgress} 
          />
        ))}
      </div>
    </section>
  );
}
