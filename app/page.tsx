'use client'

import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import InitialModal from "@/app/_components/templates/initialModal";
import HeroSection from "@/app/_components/templates/heroSection";
import AboutSection from "@/app/_components/templates/aboutSection";
import ProjectCard from "@/app/_components/ingredients/projectCard";
import TechCard from "@/app/_components/ingredients/techCard";
import ProjectDetailModal from "@/app/_components/templates/projectDetailModal";

// Types
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

interface Tech {
  name: string;
  description: string;
  icon?: any;
  iconPath?: string;
  color: string;
}

// Data
const PROJECTS: Project[] = [
  {
    id: "routem",
    title: "Routem",
    description: "A web application designed for sharing travel and walking routes.",
    longDescription: "Routemは、現在チーム開発中のプロジェクトで、その主な利用目的は、旅行日程の共有です。自分の町のおすすめの散策ルートや、過去良かったデートプランの共有、また投稿されたルートをそのまま自分のルートに組み込み、旅のプランを明確化する機能を現在実装しています。将来的にはこのルート内の各商業施設の予約を、このサイトからできるようにしようと考えています。主な技術スタックはNext.js、Typescriptで、地図にはMapboxを用いています。なお、現在の遷移先はそのモックです。",
    url: "https://kickorganiclovers.github.io/Routem_Mock/",
    githubUrl: "https://github.com/AvocadoMafia/Routem",
    videoSrc: "/my-portfolio/publishedImages/routem/routem_laptop.mp4",
    mobileVideoSrc: "/my-portfolio/publishedImages/routem/routem_mobile.mp4",
    tags: ["Next.js", "Typescript", "Prisma", "Mapbox", "Docker"]
  },
  {
    id: "cluee",
    title: "Cluee",
    description: "An article-based social networking service designed for sharing knowledge.",
    longDescription: "Clueeは知識共有型SNSであり、「自分の持つちょっとした知識を、困っている誰かのために役立てる」という目的のため作成されました。非エンジニアでも扱いやすい非markdownのテキストエディタTipTapの採用や、スマホ表示において少ない画面占有率の中で効率よく必要な情報を伝えるための動的ヘッダの採用など、アプリのように使えるUIを意識して開発を行いました。主な技術スタックはNext.js、TypeScriptで、現在はOCI(Oracle Cloud Infrastructure)にデプロイし、公開しています。",
    url: "https://cluee.jp",
    githubUrl: "https://github.com/KickOrganicLovers/Cluee",
    videoSrc: "/my-portfolio/publishedImages/cluee/cluee_laptop.mp4",
    mobileVideoSrc: "/my-portfolio/publishedImages/cluee/cluee_mobile.mp4",
    tags: ["Next.js", "Typescript", "Tailwind.css", "Prisma", "Mapbox", "Docker", "OCI"]
  }
];

const TECH_STACK: Tech[] = [
  {
    name: "TypeScript",
    description: "現在の主な使用言語。使用期間は二年ほど。",
    iconPath: "/my-portfolio/techIcons/TypeScript.png",
    color: "text-blue-400"
  },
  {
    name: "React",
    description: "使用期間は三年ほど。redux、zustandやtailwind等を組み合わせて使用。",
    iconPath: "/my-portfolio/techIcons/React.png",
    color: "text-cyan-400"
  },
  {
    name: "Next.js",
    description: "使用期間は二年ほど。フルスタックwebアプリケーションの開発に使用。",
    iconPath: "/my-portfolio/techIcons/Next.js.png",
    color: "text-white"
  },
  {
    name: "Express.js",
    description: "バックエンドの学習で初めて触りました。",
    iconPath: "/my-portfolio/techIcons/Express.png",
    color: "text-green-400"
  },
  {
    name: "Docker",
    description: "使用期間は1年ほど・各種apiの開発環境構築、デプロイ環境として使用。",
    iconPath: "/my-portfolio/techIcons/Docker.png",
    color: "text-blue-500"
  },
  {
    name: "AWS",
    description: "初期のデプロイにEC2、S3を使用。",
    iconPath: "/my-portfolio/techIcons/AWS.png",
    color: "text-orange-400"
  },
  {
    name: "OCI",
    description: "コスト面を理由にawsから移行後、VM、ObjectStrageを利用。Clueeの現在のデプロイ先。",
    iconPath: "/my-portfolio/techIcons/Oracle.png",
    color: "text-red-500"
  },
  {
    name: "Java",
    description: "中学生のころ初めて触った言語であり、利用目的はMinecraftでのmod開発。その後サーブレット、JSP、SpringBootに触れた。",
    iconPath: "/my-portfolio/techIcons/Java.png",
    color: "text-red-400"
  },
  {
    name: "Kotlin",
    description: "javaから移行。SpringBootを用いたwebサーバー開発の学習で用いた。",
    iconPath: "/my-portfolio/techIcons/Kotlin.png",
    color: "text-purple-500"
  },
  {
    name: "C++",
    description: "UnrealEngineの触りと、授業で利用した経験あり。",
    iconPath: "/my-portfolio/techIcons/C++ (CPlusPlus).png",
    color: "text-blue-600"
  }
];

export default function Home() {
  const [showInitial, setShowInitial] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (showInitial || selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    if (!showInitial) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 10) {
        setShowInitial(false);
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dy = (e.touches[0]?.clientY ?? 0) - touchStartY;
      if (dy < -20) {
        setShowInitial(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        setShowInitial(false);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', onWheel as any);
      window.removeEventListener('touchstart', onTouchStart as any);
      window.removeEventListener('touchmove', onTouchMove as any);
      window.removeEventListener('keydown', onKeyDown as any);
    };
  }, [showInitial, selectedProject]);

  return (
    <div className={'w-full min-h-screen'}>
      <main className="min-h-screen bg-black text-white selection:bg-white/20">
        <HeroSection />
        <AboutSection />

        {/* Works Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 space-y-32">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center md:text-left">Selected Works</h2>

          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              onSelect={setSelectedProject}
            />
          ))}
        </section>

        {/* Tech Stack Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center md:text-left">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TECH_STACK.map((tech) => (
              <TechCard key={tech.name} tech={tech} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-sm">© 2026 Ukyo Takamatsu. All rights reserved.</p>
            <div className="flex gap-8 text-sm text-white/60">
              <a href="https://github.com/KickOrganicLovers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href="mailto:ukyo21owls@icloud.com" className="hover:text-white transition-colors">Email</a>
            </div>
          </div>
        </footer>
      </main>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Initial full-screen overlay */}
      <AnimatePresence>
        {showInitial && (
          <motion.div
            key="initial-overlay"
            className={'w-full h-full fixed inset-0 z-50'}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <InitialModal />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
