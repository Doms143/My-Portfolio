import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";

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
    tech: ["PHP", "Laravel", "JavaScript", "TailwindCSS", "Python", "OpenAI", "MySQL"],
    year: "2025",
    color: "bg-zinc-900",
    images: ["/images/projects/accesslaw-1.png", "/images/projects/accesslaw-2.png", "/images/projects/accesslaw-3.png", "/images/projects/accesslaw-4.png", "/images/projects/accesslaw-5.png"],
    description: "The study, titled \"ACCESSLAW: An Accessible AI-Powered Legal Counsel for Public Attorneys and Low-Income Citizens in Lapu-Lapu City,\" addresses the lack of accessible legal support by integrating AI chatbot technology, lawyer-client matching, case profiling, and legal document generation into a single web-based platform. The system aims to empower low-income individuals by providing them with accurate and timely legal assistance, while also aiding public attorneys in handling and tracking cases more efficiently.",
  },
  {
    id: "02",
    title: "Lifewood",
    category: "Web Development",
    tech: ["HTML", "JavaScript", "MySQL", "TailwindCSS"],
    year: "2026",
    color: "bg-[#111]",
    images: ["/images/projects/lifewood-1.png", "/images/projects/lifewood-2.png", "/images/projects/lifewood-3.png", "/images/projects/lifewood-4.png"],
  },
  {
    id: "03",
    title: "FAINANCE",
    category: "AI Agent for Lifewood",
    tech: ["Python", "JavaScript", "CSS", "TypeScript"],
    year: "2026",
    color: "bg-zinc-950",
    images: ["/images/projects/fainance-1.png", "/images/projects/fainance-2.png", "/images/projects/fainance-3.png"],
  },
  {
    id: "04",
    title: "Behind You",
    category: "Game Development",
    tech: ["C#", "Unity"],
    year: "2026",
    color: "bg-zinc-900",
    images: ["/images/projects/behind-you-1.png", "/images/projects/behind-you-2.png"],
  },
  {
    id: "05",
    title: "A&M Online Grocery Store",
    category: "Online Grocery Ordering Website",
    tech: ["JavaScript", "Python", "HTML", "CSS"],
    year: "2026",
    color: "bg-[#050505]",
    images: ["/images/projects/am-grocery-1.png", "/images/projects/am-grocery-2.png"],
    link: "https://a-m-market.vercel.app/",
  },
];

function ProjectCard({ project, index, progress, onOpenModal }: { project: any, index: number, progress: any, onOpenModal: (project: any) => void }) {
  const y = useTransform(progress, [0, 1], [0, -50 * index]);
  const scale = useTransform(progress, [index * 0.2, 1], [1, 1 - index * 0.02]);
  const imgY = useTransform(progress, [0, 1], ["-5%", "5%"]);
  const [imageError, setImageError] = useState(false);

  const hasImages = project.images && project.images.length > 0 && !imageError;

  return (
    <motion.div
      style={{ y, scale, top: `calc(5vh + ${index * 40}px)` }}
      className={`sticky w-full h-[75vh] md:h-[75vh] ${project.color} border border-white/10 p-8 md:p-12 flex flex-col justify-between origin-top group backdrop-blur-md overflow-hidden`}
    >
      {hasImages && (
        <div 
          className="absolute inset-0 z-0 overflow-hidden cursor-pointer"
          onClick={() => onOpenModal(project)}
        >
          <div className="absolute top-[22%] md:top-[18%] bottom-[28%] md:bottom-[25%] left-4 md:left-12 right-4 md:right-12 flex items-center justify-center z-10">
            {/* Mockup Container */}
            <div className="relative w-full h-full max-w-6xl rounded-xl overflow-hidden border border-white/20 bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-4">
              <motion.img 
                loading="lazy"
                style={{ y: imgY, scale: 1.05 }}
                src={project.images[0]} 
                alt={project.title} 
                onError={() => setImageError(true)}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-30 transition-opacity duration-700" 
              />
              
              {/* Hover Overlay Message */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 translate-y-8 group-hover:translate-y-0">
                <span className="px-6 py-3 bg-white text-black font-bold text-xs tracking-widest uppercase rounded-full shadow-2xl flex items-center gap-2">
                  View Project <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0 pointer-events-none" />
        </div>
      )}

      <div className="flex justify-between items-start relative z-20 pointer-events-none gap-4">
        <h3 
          onClick={() => onOpenModal(project)}
          className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase leading-none select-none transition-all duration-300 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] group-hover:[-webkit-text-stroke:1px_#ff4d00] group-hover:text-[#ff4d00] max-w-[85%] break-words pointer-events-auto cursor-pointer"
        >
          {project.title}
        </h3>
        <span className="text-2xl md:text-5xl font-mono text-swiss-gray pointer-events-auto shrink-0 z-20">{project.id}</span>
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
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 mt-4 md:mt-0 text-[10px] font-bold uppercase tracking-widest hover:text-swiss-red transition-colors text-[#f2f2f2]"
            >
              Visit Site <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const modal = modalRef.current;
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.images && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.images && project.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-12 md:right-12 p-4 bg-white/10 hover:bg-swiss-red text-white rounded-full transition-colors z-50"
      >
        <X size={24} />
      </button>

      <div 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl h-[80vh] flex flex-col md:flex-row bg-[#111] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      >
        {/* Carousel Section */}
        <div className="relative w-full md:w-2/3 h-1/2 md:h-full bg-black/50 flex items-center justify-center p-8 group">
          {project.images && project.images.length > 0 ? (
            <>
              <motion.img 
                key={currentImageIndex}
                loading="lazy"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={project.images[currentImageIndex]} 
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
              />
              {project.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-swiss-red text-white border border-white/10 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm shadow-xl"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-swiss-red text-white border border-white/10 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm shadow-xl"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {project.images.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${currentImageIndex === i ? "w-8 bg-swiss-red" : "w-2 bg-white/30 hover:bg-white/60"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
             <div className="text-white/40 font-mono tracking-widest text-sm">NO IMAGES AVAILABLE</div>
          )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/3 h-1/2 md:h-full p-8 md:p-12 flex flex-col overflow-y-auto border-t md:border-t-0 md:border-l border-white/10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase text-white mb-2">{project.title}</h2>
          <div className="text-swiss-red font-mono tracking-widest text-sm mb-12">{project.year} // {project.category}</div>
          
          <div className="mb-12">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="px-3 py-1.5 border border-white/20 rounded text-[11px] uppercase tracking-widest text-white bg-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-auto text-sm">
            {project.description || `A detailed look into ${project.title}, exploring its design, development process, and architecture. This project showcases modern web development techniques and problem-solving skills to build scalable, responsive applications.`}
          </p>
          
          {project.link && (
            <a 
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-12 inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-swiss-red hover:text-white transition-colors"
            >
              Visit Live Project <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>,
    document.body
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="bg-swiss-black relative">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-16">
          03 // Selected Works
        </h2>
      </div>

      <div ref={containerRef} className="pb-32 px-4 md:px-12 relative">
        {projects.map((project, index) => (
          <div key={project.id}>
            <ProjectCard 
              project={project} 
              index={index} 
              progress={scrollYProgress}
              onOpenModal={setSelectedProject}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
