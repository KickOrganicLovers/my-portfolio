import { motion } from "motion/react";

interface Tech {
  name: string;
  description: string;
  icon?: any;
  iconPath?: string;
  color: string;
}

interface TechCardProps {
  tech: Tech;
}

export default function TechCard({ tech }: TechCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-2 rounded-xl bg-white/5 flex items-center justify-center`}>
          {tech.iconPath ? (
            <img src={tech.iconPath} alt={tech.name} className="w-8 h-8 object-contain" />
          ) : (
            <tech.icon size={24} className={tech.color} />
          )}
        </div>
        <h3 className="text-xl font-bold">{tech.name}</h3>
      </div>
      <p className="text-white/60 leading-relaxed text-sm">
        {tech.description}
      </p>
    </motion.div>
  );
}
