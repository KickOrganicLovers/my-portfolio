import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center md:text-left">About Me</h2>
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div className="space-y-6">
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/my-portfolio/my_image.jpg"
                alt="Ukyo Takamatsu"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-widest text-white/40">Location</p>
              <p className="text-white/80">Chiba, Japan</p>
            </div>
          </div>
          <div className="space-y-8 text-white/70 text-lg leading-relaxed">
            <p>
              現在東洋大学学部生3年、webアプリケーションの開発を主としたソフトウェアエンジニアを志望しています。<br/>中学生のころ、MinecraftのMOD開発を通じてJavaに触れたことが、プログラミングの世界への第一歩でした。
            </p>
            <p>
              現在はTypeScript、React、Next.jsを中心としたモダンなWeb開発をメインに活動しており、
              UIの細かな挙動から、インフラ（AWS/OCI）を含めたフルスタックな開発まで幅広く手がけています。
              大学2年次に記事投稿型SNS、Clueeを完全個人でフルスタック開発、公開し、現在では海外向けの旅行日程共有アプリRoutemを友人とチームを組んでアジャイルで開発しています。
            </p>
            <p>
              大学受験で挫折した経験があり、その経験をモチベーションとして今まで実践的な知識の習得に注力してきました。
              将来、何か自分の中でアイデアが思いついた際、すぐにそれをプロダクトとして世に出せるだけの技術を習得したいと考えています。
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
