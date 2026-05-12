import { motion } from "motion/react";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";
import { useState } from "react";
import React from "react";

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = {
    name: !formData.name.trim() ? "Name is required" : "",
    email: !formData.email.trim() ? "Email is required" : !validateEmail(formData.email) ? "Invalid email format" : "",
    message: !formData.message.trim() ? "Message is required" : "",
  };

  const isValid = Object.values(errors).every(e => !e);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(prev => ({ ...prev, [e.target.id]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;
    
    setFormState("submitting");
    
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
      setSubmitAttempted(false);
      
      setTimeout(() => {
        setFormState("idle");
      }, 3000);
    }, 1500);
  };

  const showError = (field: string) => (touched[field] || submitAttempted) && errors[field];

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
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 relative">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={formState !== "idle"}
                    className={cn(
                      "w-full bg-transparent border-b py-4 text-white focus:outline-none transition-all duration-300 rounded-none placeholder:text-white/20 font-medium disabled:opacity-50",
                      showError("name") ? "border-swiss-red" : "border-white/20 focus:border-swiss-red"
                    )}
                    placeholder="John Doe"
                  />
                  <div className={cn("absolute bottom-0 left-0 h-[1px] bg-swiss-red transition-all duration-500", showError("name") ? "w-full" : "w-0 peer-focus:w-full")} />
                  {showError("name") && <p className="text-swiss-red text-[10px] uppercase tracking-widest font-bold mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2 relative">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={formState !== "idle"}
                    className={cn(
                      "w-full bg-transparent border-b py-4 text-white focus:outline-none transition-all duration-300 rounded-none placeholder:text-white/20 font-medium disabled:opacity-50 peer",
                      showError("email") ? "border-swiss-red" : "border-white/20 focus:border-swiss-red"
                    )}
                    placeholder="john@example.com"
                  />
                  <div className={cn("absolute bottom-0 left-0 h-[1px] bg-swiss-red transition-all duration-500", showError("email") ? "w-full" : "w-0 peer-focus:w-full")} />
                  {showError("email") && <p className="text-swiss-red text-[10px] uppercase tracking-widest font-bold mt-1">{errors.email}</p>}
                </div>
              </div>
              
              <div className="space-y-2 relative">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Message</label>
                <textarea 
                  id="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={formState !== "idle"}
                  rows={4}
                  className={cn(
                    "w-full bg-transparent border-b py-4 text-white focus:outline-none transition-all duration-300 resize-none rounded-none placeholder:text-white/20 font-medium disabled:opacity-50 peer",
                    showError("message") ? "border-swiss-red" : "border-white/20 focus:border-swiss-red"
                  )}
                  placeholder="Tell me about your project..."
                />
                <div className={cn("absolute bottom-0 left-0 h-[1px] bg-swiss-red transition-all duration-500", showError("message") ? "w-full" : "w-0 peer-focus:w-full")} />
                {showError("message") && <p className="text-swiss-red text-[10px] uppercase tracking-widest font-bold mt-1">{errors.message}</p>}
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
                <Magnetic>
                  <button 
                    type="submit" 
                    disabled={formState !== "idle"}
                    className="relative overflow-hidden bg-white text-[#0a0a0a] px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-swiss-red hover:text-white transition-colors group disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
                  >
                    <span className={`block transition-transform duration-500 ${formState === "submitting" ? "-translate-y-[150%]" : "translate-y-0"}`}>
                      {formState === "success" ? "Message Sent" : "Send Message"}
                    </span>
                    <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${formState === "submitting" ? "translate-y-0" : "translate-y-[150%]"}`}>
                      Sending...
                    </span>
                  </button>
                </Magnetic>
                <a href="/My%20Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors group">
                  Resume PDF (2.4mb)
                  <span className="group-hover:animate-bounce">↓</span>
                </a>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
