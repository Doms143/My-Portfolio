import { motion } from "motion/react";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-swiss-black">
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] pointer-events-none opacity-5">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
          <polygon points="0,100 100,0 100,100" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-8">
              06 // Connect
            </h2>
            
            <div className="space-y-8 text-sm font-medium text-white/60">
              <p className="leading-relaxed">
                Interested in working together? Drop me a line and I'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-4">
                <a href="mailto:dominictacatani123@gmail.com" className="block outline-none text-xl sm:text-2xl pt-2 pb-2 font-black italic hover:text-swiss-red transition-all break-all sm:break-normal">
                  dominictacatani123@gmail.com
                </a>
                <p className="font-mono text-white/40 tracking-widest text-[10px] uppercase">09292891124</p>
              </div>
              
              <div className="flex flex-wrap gap-x-6 gap-y-3 uppercase text-[10px] tracking-widest font-bold text-white/40">
                <Magnetic>
                  <a href="https://www.linkedin.com/in/dominic-tacatani-9860b33a2/" target="_blank" rel="noreferrer" className="block p-2 -m-2 hover:text-white transition-colors">LinkedIn</a>
                </Magnetic>
                <Magnetic>
                  <a href="https://github.com/Doms143" target="_blank" rel="noreferrer" className="block p-2 -m-2 hover:text-white transition-colors">GitHub</a>
                </Magnetic>
                <Magnetic>
                  <a href="https://x.com/Domzu01" target="_blank" rel="noreferrer" className="block p-2 -m-2 hover:text-white transition-colors">X/Twitter</a>
                </Magnetic>
                <Magnetic>
                  <a href="https://www.instagram.com/domzu1/?hl=en" target="_blank" rel="noreferrer" className="block p-2 -m-2 hover:text-white transition-colors">Instagram</a>
                </Magnetic>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-swiss-red transition-colors rounded-none placeholder:text-white/20 font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-swiss-red transition-colors rounded-none placeholder:text-white/20 font-medium"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Message</label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-swiss-red transition-colors resize-none rounded-none placeholder:text-white/20 font-medium"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
                <Magnetic>
                  <button 
                    type="button" 
                    className="bg-white text-[#0a0a0a] px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-swiss-red hover:text-white transition-colors"
                  >
                    Send Message
                  </button>
                </Magnetic>
                <a href="#" className="flex gap-2 items-center text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors group">
                  Resume PDF (2.4mb)
                  <span className="group-hover:animate-bounce">â</span>
                </a>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
