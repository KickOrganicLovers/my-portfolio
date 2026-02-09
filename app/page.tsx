'use client'

import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import InitialModal from "@/app/_components/templates/initialModal";

export default function Home() {
  const [showInitial, setShowInitial] = useState(true);

  useEffect(() => {
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
      window.removeEventListener('wheel', onWheel as any);
      window.removeEventListener('touchstart', onTouchStart as any);
      window.removeEventListener('touchmove', onTouchMove as any);
      window.removeEventListener('keydown', onKeyDown as any);
    };
  }, [showInitial]);

  return (
    <div className={'w-full min-h-screen'}>
      {/* Main page content (background). Replace with your actual content) */}
      <main className={"relative z-0 p-8 space-y-6"}>
        <h1 className="text-3xl font-bold">Main Page</h1>
        <p className="text-gray-600">スクロールしてモーダルを閉じ、コンテンツを表示します。</p>
        <div className="h-[200vh] bg-gradient-to-b from-transparent to-gray-100 rounded-md" />
      </main>

      {/* Initial full-screen overlay that flies up on scroll */}
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
