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
    title: "AccessLaw",
    category: "Capstone Project",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    year: "2023",
    color: "bg-zinc-900",
    images: ["/images/projects/accesslaw-1.png", "/images/projects/accesslaw-2.png", "/images/projects/accesslaw-3.png", "/images/projects/accesslaw-4.png", "/images/projects/accesslaw-5.png"],
    link: "https://example.com"
  },
  {
    id: "02",
    title: "Lifewood",
    category: "Web Development",
    tech: ["Next.js", "TypeScript", "TailwindCSS"],
    year: "2024",
    color: "bg-[#111]",
    images: ["/images/projects/lifewood-1.png", "/images/projects/lifewood-2.png"],
  },
  {
    id: "03",
    title: "FAINANCE",
    category: "AI Agent for Lifewood",
    tech: ["Python", "React", "OpenAI API"],
    year: "2024",
    color: "bg-zinc-950",
    images: ["/images/projects/fainance-1.png", "/images/projects/fainance-2.png"],
  },
  {
    id: "04",
    title: "Behind You",
    category: "Game Development",
    tech: ["Unity", "C#", "Blender"],
    year: "2025",
    color: "bg-zinc-900",
    images: ["/images/projects/behind-you-1.png", "/images/projects/behind-you-2.png"],
  },
  {
    id: "05",
    title: "A&M Online Grocery Store",
    category: "Online Grocery Ordering Website",
    tech: ["React", "Node.js", "PostgreSQL"],
    year: "2025",
    color: "bg-[#050505]",
    images: ["/images/projects/am-grocery-1.png", "/images/projects/am-grocery-2.png"],
  },
];

function ProjectCard({ project, index, progress }: { project: any, index: number, progress: any }) {
  const y = useTransform(progress, [0, 1], [0, -50 * index]);
  const scale = useTransform(progress, [index * 0.2, 1], [1, 1 - index * 0.02]);
  const imgY = useTransform(progress, [0, 1], ["-5%", "5%"]);
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
      style={{ y, scale, top: `calc(5vh + ${index * 40}px)` }}
      className={`sticky w-full h-[75vh] md:h-[75vh] ${project.color} border border-white/10 p-8 md:p-12 flex flex-col justify-between origin-top group backdrop-blur-md overflow-hidden`}
    >
      {hasImages && (
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center p-4 md:p-12">
          <motion.img 
            style={{ y: imgY, scale: 1.05 }}
            src={project.images[currentImageIndex]} 
            alt={project.title} 
            className="w-full h-full object-contain opacity-20 group-hover:opacity-60 transition-opacity duration-700" 
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />
        </div>
      )}

      <div className="flex justify-between items-start relative z-20 pointer-events-none gap-4">
        <h3 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-none select-none transition-colors group-hover:text-white text-stroke text-stroke-hover max-w-[85%] break-words">
          {project.title}
        </h3>
        <span className="text-xl md:text-4xl font-mono text-swiss-gray pointer-events-auto shrink-0">{project.id}</span>
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

      <div ref={containerRef} className="pb-32 px-4 md:px-12 relative">
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
