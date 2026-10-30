import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState, useCallback, useEffect } from 'react';
import { ProposalContext } from '../context/ProposalContext';
import FloatingElements from './FloatingElements';

/* ------------------------------------------------------------------ */
/*  Burst heart that flies outward on button click                     */
/* ------------------------------------------------------------------ */
function BurstHeart({ index }: { index: number }) {
  const angle = (index / 24) * Math.PI * 2;
  const distance = 180 + Math.random() * 220;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;

  return (
    <motion.span
      className="absolute text-2xl pointer-events-none"
      style={{ left: '50%', top: '50%' }}
      initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
      animate={{
        opacity: [1, 1, 0],
        x: tx,
        y: ty,
        scale: [0.5, 1.3, 0.8],
        rotate: Math.random() * 360,
      }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
    >
      ❤️
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  IntroScene                                                         */
/* ------------------------------------------------------------------ */
export default function IntroScene() {
  const { goToScene } = useContext(ProposalContext);

  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [bursting, setBursting] = useState(false);
  const [burstHearts, setBurstHearts] = useState<number[]>([]);

  /* staggered word reveal for the headline */
  const headline = 'Every love story is special, but ours is my favorite.';
  const words = headline.split(' ');

  /* Auto-reveal second line + button */
  useEffect(() => {
    const t1 = setTimeout(() => setShowSecondLine(true), 2500);
    const t2 = setTimeout(() => setShowButton(true), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* Button click handler */
  const handleOpen = useCallback(() => {
    setBursting(true);
    setBurstHearts(Array.from({ length: 24 }, (_, i) => i));
    setTimeout(() => goToScene('HEART_RING_PROPOSAL'), 1500);
  }, [goToScene]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: '#722F37' }}
    >
      {/* Floating stars, hearts & petals */}
      <FloatingElements heartCount={14} petalCount={8} starCount={40} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-2xl">

        {/* Staggered headline */}
        <motion.h1
          className="font-['Playfair_Display',serif] text-3xl sm:text-4xl md:text-5xl leading-snug text-white/95 font-semibold tracking-wide"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.6 },
            },
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.7, ease: 'easeOut' },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Second line */}
        <AnimatePresence>
          {showSecondLine && (
            <motion.p
              className="font-['Playfair_Display',serif] text-xl sm:text-2xl text-white/80 italic"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              Maria, I made something special just for you. ❤️
            </motion.p>
          )}
        </AnimatePresence>

        {/* CTA button */}
        <AnimatePresence>
          {showButton && !bursting && (
            <motion.button
              className="relative mt-4 px-8 py-4 rounded-full text-white font-semibold text-lg tracking-wide cursor-pointer border-0 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #e0c06a, #C9A84C)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: [1, 1.04, 1],
                boxShadow: [
                  '0 0 20px rgba(201,168,76,0.3)',
                  '0 0 40px rgba(201,168,76,0.6)',
                  '0 0 20px rgba(201,168,76,0.3)',
                ],
              }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpen}
            >
              Open Your Little Surprise 💌
            </motion.button>
          )}
        </AnimatePresence>

        {/* Burst hearts */}
        <AnimatePresence>
          {bursting && (
            <div className="relative">
              {burstHearts.map((i) => (
                <BurstHeart key={i} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
