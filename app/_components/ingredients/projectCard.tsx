import { ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  url: string;
  videoSrc: string;
  mobileVideoSrc?: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  idx: number;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, idx, onSelect }: ProjectCardProps) {
  return (
    <article className="grid md:grid-cols-2 gap-12 items-center">
      <div className={`space-y-6 ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
        <h3
          className="text-2xl md:text-4xl font-bold cursor-pointer hover:text-white/70 transition-colors inline-block"
          onClick={() => onSelect(project)}
        >
          {project.title}
        </h3>
        <p className="text-lg text-white/70 leading-relaxed">
          {project.description}
        </p>
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => onSelect(project)}
            className="group flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            Details
            <ExternalLink className="w-4 h-4" />
          </button>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            View Project
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
      <div className={`relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-white/5 border border-white/10 ${idx % 2 !== 0 ? 'md:order-1' : ''}`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={project.videoSrc} type="video/mp4" />
        </video>
      </div>
    </article>
  );
}
