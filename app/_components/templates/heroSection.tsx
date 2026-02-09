import { motion } from "motion/react";
import { Github, Layers, Mail } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <div className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
          <img
            src="/my-portfolio/my_icon.jpg"
            alt="Ukyo Takamatsu"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Ukyo Takamatsu</h1>
        <p className="text-xl md:text-2xl text-white/60 mb-8 font-light">from Toyo University / Aspiring Software Engineer</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://github.com/KickOrganicLovers" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2">
            <Github size={18} />
            GitHub
          </a>
          <a href="https://github.com/AvocadoMafia" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2">
            <Layers size={18} />
            Organization
          </a>
          <a href="mailto:ukyo21owls@icloud.com" className="px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2">
            <Mail size={18} />
            Contact
          </a>
        </div>
      </motion.div>

      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
