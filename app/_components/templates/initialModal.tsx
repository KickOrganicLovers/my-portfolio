import {useEffect, useMemo, useState} from "react";
import {motion} from "motion/react";

const KANA = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const FALLING_MESSAGES = [
  "これは高松右京のポートフォリオです。",
  "This is Ukyo Takamatsu's Portfolio",
  "I can speak english. Hey, can you give me an \"appuru\".",
  "物価高がすごくてかつやしか食べられません。",
  "くるまやらーめんは世界一おいしい食べ物です。",
  "Detrás de todos los pasatiempos se esconde el deseo de ser popular.",
  "Ma langue principale est le Typescript.",
  "The Next.js Image component is crap.",
  "미래의 꿈은 키아누 리브스입니다",
  "我喜欢的电影是《绿皮书》。",
  "Hey, you guys who work out—what do you use those muscles for?",
  "В основе каждого хобби лежит желание быть популярным.",
  "ファミマで一番おいしいのは100円のジャスミン茶です。紅茶系も安くておいしいです。",
  "Typescript、nullとかundefinedとかunknownとかneverとかそこら辺の使い分けがいまだに完璧にできていません。",
  "Ik heb nog niet zoveel resultaten geboekt, maar ik heb wel een portfolio samengesteld.",
  "RX7, her zaman hayran olduğum inanılmaz derecede şık bir otomobildir, ancak litre başına sadece yaklaşık 23 kilometre yol yapabilmektedir.",
  "Windows has too many background processes and is slow, so I prefer Mac."
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomMessage() {
  return FALLING_MESSAGES[randomInt(0, FALLING_MESSAGES.length - 1)];
}

export default function InitialModal() {
  const STREAMS = 18; // number of falling text columns
  const FULL_TEXT = "Hello There!";
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Precompute stream parameters once per mount so animation is stable
  const streams = useMemo(() => {
    return Array.from({ length: STREAMS }).map((_, i) => {
      const left = ((i + 0.5) / STREAMS) * 100; // percentage across the screen
      const duration = randomInt(7, 13); // seconds for one fall (slightly slower)
      const delay = Math.random() * 5; // stagger start
      const size = randomInt(18, 32); // adjusted font size for sentences
      return {
        id: i,
        left,
        duration,
        delay,
        size,
        text: getRandomMessage(),
      };
    });
  }, []);

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= FULL_TEXT.length) {
        setDisplayText(FULL_TEXT.slice(0, currentIdx));
        currentIdx++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 100); // adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#1a1a1a] to-black text-white overflow-hidden">
      {/* subtle vignette */}
      <div className="w-full h-full pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />

      {/* Falling text columns */}
      {streams.map((s) => (
        <motion.span
          key={s.id}
          initial={{ y: "-60%", opacity: 0 }}
          animate={{ y: "120%", opacity: [0, 1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "linear",
            delay: s.delay,
            times: [0, 0.18, 0.82, 1],
          }}
          className="absolute top-[-60%] select-none font-mono tracking-tight leading-none"
          style={{
            left: `${s.left}%`,
            fontSize: `${s.size}px`,
            writingMode: "vertical-rl",
            textShadow: "0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.3)", // soft white glow
            color: "#ffffff", // white
            willChange: "transform, opacity",
          }}
        >
          {s.text}
        </motion.span>
      ))}

      {/* Center radial dim and glass card */}
      {/* Soft radial dim behind the card to improve contrast */}
      <div className="absolute inset-0 grid place-items-center z-[5] pointer-events-none">
        <div className="w-[min(85vw,640px)] h-[min(85vw,640px)] rounded-full opacity-70"
             style={{
               background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, transparent 70%)"
             }}
        />
      </div>

      {/* iPhone-like glass card */}
      <div className="absolute inset-0 grid place-items-center z-10 px-6 sm:px-8">
        <motion.article
          aria-label="Introduction"
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[640px] select-none rounded-2xl border border-white/30  backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.45)] overflow-hidden"
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.025) 65%, rgba(255,255,255,0) 100%)"
          }}
        >


          <div className="relative p-6 sm:p-8 md:p-10">
            <h1 className="text-white/95 text-2xl sm:text-4xl md:text-5xl font-semibold tracking-wide min-h-[1.2em]">
              {displayText}
              {!isTypingComplete && "_"}
            </h1>
            <p className="mt-3 sm:mt-4 text-white/80 text-sm sm:text-base leading-relaxed">
              A minimalist entry to my personal portfolio.
            </p>
            <div className="mt-4 sm:mt-5 md:mt-6 grid gap-1.5 text-white/70 text-xs sm:text-sm">
              <div className="uppercase tracking-wider text-white/50">Name</div>
              <div className="font-medium text-white/85">Ukyo Takamatsu <span className="text-white/50">/</span> 高松右京</div>
              <div className="uppercase tracking-wider text-white/50 mt-3">GitHub</div>
              <div className="font-mono flex items-center gap-2">
                <img src="/my-portfolio/my_icon.jpg" alt="Icon" className="w-5 h-5 rounded-full border border-white/20" />
                @Feet_Up
              </div>
            </div>

            <div className="mt-8 sm:mt-10 flex items-center gap-2 text-white/85">
              <svg className="size-5 sm:size-6 opacity-90 motion-reduce:animate-none animate-bounce"
                   viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14m0 0-5-5m5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm sm:text-base">Scroll down to enter</span>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
