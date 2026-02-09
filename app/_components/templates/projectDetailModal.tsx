import { motion } from "motion/react";
import { X, ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  url: string;
  githubUrl?: string;
  videoSrc: string;
  mobileVideoSrc?: string;
  tags: string[];
}

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.article
        layoutId={project.id}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 rounded-3xl border border-white/10 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-4 sm:p-8 bg-black">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Desktop Preview */}
            <div className="flex-1 w-full max-w-2xl aspect-video bg-neutral-900 relative rounded-lg overflow-hidden border border-white/5">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={project.videoSrc} type="video/mp4" />
              </video>
              <div className="absolute top-4 left-4 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] uppercase tracking-widest text-white/70 border border-white/10">
                Desktop
              </div>
            </div>

            {/* Mobile Preview */}
            {project.mobileVideoSrc && (
              <div className="w-full max-w-[200px] md:w-auto shrink-0 flex items-center justify-center">
                <div className="relative w-full aspect-[9/19.5] bg-black rounded-[32px] border-[6px] border-neutral-700 shadow-2xl overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-3 bg-neutral-700 rounded-b-xl z-20" />

                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full"
                  >
                    <source src={project.mobileVideoSrc} type="video/mp4" />
                  </video>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white/90">Description</h3>
            <p className="text-white/70 leading-relaxed text-lg whitespace-pre-wrap">
              {project.longDescription}
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
            >
              Visit Website
              <ExternalLink size={20} />
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors border border-white/10"
              >
                View on GitHub
                <Github size={20} />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
