import { motion, AnimatePresence } from 'framer-motion';
import { useState, useContext, useEffect, useMemo } from 'react';
import { ProposalContext } from '../context/ProposalContext';
import FloatingElements from './FloatingElements';
import { Heart } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Seeded random helper                                               */
/* ------------------------------------------------------------------ */
function seeded(i: number, off: number) {
  return ((i * 9301 + off * 49297) % 233280) / 233280;
}

/* ------------------------------------------------------------------ */
/*  Golden floating particles                                          */
/* ------------------------------------------------------------------ */
function GoldenParticles({ count = 30 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${seeded(i, 60) * 100}%`,
        top: `${seeded(i, 61) * 100}%`,
        size: 2 + seeded(i, 62) * 4,
        delay: seeded(i, 63) * 6,
        dur: 3 + seeded(i, 64) * 4,
        opacity: 0.2 + seeded(i, 65) * 0.5,
      })),
    [count],
  );

  return (
    <div className="fixed inset-0 pointer-events-none -z-5" aria-hidden="true">
      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background:
              'radial-gradient(circle, rgba(255,215,0,0.8), rgba(201,168,76,0.4))',
            boxShadow: '0 0 4px rgba(255,215,0,0.3)',
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative Heart with names                                        */
/* ------------------------------------------------------------------ */
function DecorativeHeart() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay: 5, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 240 220"
        className="w-56 h-52 md:w-72 md:h-64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e05272" />
            <stop offset="100%" stopColor="#c94060" />
          </linearGradient>
          <linearGradient id="heartStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5d78e" />
            <stop offset="50%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#f5d78e" />
          </linearGradient>
          <filter id="heartShadow">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="8"
              floodColor="#c94060"
              floodOpacity="0.4"
            />
          </filter>
          <filter id="heartGlow2">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Heart shape */}
        <motion.path
          d="M120,195 C120,195 30,140 30,80 C30,45 55,20 85,30 C100,35 112,50 120,60 C128,50 140,35 155,30 C185,20 210,45 210,80 C210,140 120,195 120,195 Z"
          fill="url(#heartFill)"
          stroke="url(#heartStroke)"
          strokeWidth="3"
          filter="url(#heartShadow)"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />

        {/* Decorative inner heart outline */}
        <motion.path
          d="M120,175 C120,175 50,130 50,85 C50,58 70,40 90,48 C102,52 112,62 120,72 C128,62 138,52 150,48 C170,40 190,58 190,85 C190,130 120,175 120,175 Z"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          filter="url(#heartGlow2)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />

        {/* Text inside heart */}
        <text
          x="120"
          y="105"
          textAnchor="middle"
          className="text-sm"
          fill="#f5d78e"
          fontFamily="Georgia, serif"
          fontSize="16"
          fontStyle="italic"
        >
          Forever Yours
        </text>

        {/* Small decorative dots */}
        <circle cx="90" cy="70" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="150" cy="70" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="120" cy="140" r="2" fill="rgba(255,255,255,0.4)" />
      </svg>

      {/* Sparkle accents around heart */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const r = 120;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-yellow-200"
            style={{
              left: `calc(50% + ${Math.cos(rad) * r}px)`,
              top: `calc(50% + ${Math.sin(rad) * r}px)`,
              boxShadow: '0 0 6px rgba(255,215,0,0.5)',
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{
              duration: 2,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </motion.div>
  );
}

/* ================================================================== */
/*  MAIN SCENE COMPONENT                                              */
/* ================================================================== */
export default function FinalScene() {
  const { goToScene, setHeartRingAccepted, setMarriageAccepted } =
    useContext(ProposalContext);

  const [showParagraph, setShowParagraph] = useState(false);
  const [showClosing, setShowClosing] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [keepMoment, setKeepMoment] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowParagraph(true), 2500);
    const t2 = setTimeout(() => setShowClosing(true), 6000);
    const t3 = setTimeout(() => setShowHeart(true), 8000);
    const t4 = setTimeout(() => setShowButtons(true), 11000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleRestart = () => {
    setHeartRingAccepted(false);
    setMarriageAccepted(false);
    goToScene('INTRO');
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-12"
      style={{
        background:
          'linear-gradient(135deg, #1a0a14 0%, #2d1528 25%, #3d2040 50%, #2d1528 75%, #1a0a14 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Dreamy radial overlay */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(224,82,114,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 70%, rgba(201,168,76,0.06) 0%, transparent 50%)',
        }}
      />

      <FloatingElements heartCount={15} petalCount={10} starCount={40} />
      <GoldenParticles count={35} />

      {/* ---- Content ---- */}
      <motion.div
        className="flex flex-col items-center gap-8 w-full max-w-lg z-10"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <motion.h1
          className="text-2xl md:text-4xl text-center"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: '#f5d0d8',
            textShadow: '0 0 20px rgba(224,82,114,0.3)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          To my beautiful Maria,
        </motion.h1>

        {/* Paragraph */}
        <AnimatePresence>
          {showParagraph && (
            <motion.p
              className="text-base md:text-lg text-center font-light leading-relaxed"
              style={{ color: '#e0b8c4' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              Thank you for being part of my story. I hope this little surprise
              made you smile, because making you happy means so much to me.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Closing line */}
        <AnimatePresence>
          {showClosing && (
            <motion.p
              className="text-lg md:text-xl text-center italic"
              style={{
                color: '#f5d78e',
                textShadow: '0 0 15px rgba(201,168,76,0.3)',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              From my heart to yours, with all my love. ❤️
            </motion.p>
          )}
        </AnimatePresence>

        {/* Decorative heart */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <DecorativeHeart />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- Buttons ---- */}
        <AnimatePresence>
          {showButtons && (
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.button
                className="px-7 py-3.5 rounded-full text-base font-semibold cursor-pointer border-0 flex items-center gap-2"
                style={{
                  background:
                    'linear-gradient(135deg, #e05272, #c94060)',
                  color: '#fff',
                  boxShadow:
                    '0 0 25px rgba(224,82,114,0.35), 0 4px 16px rgba(0,0,0,0.3)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                Watch Our Story Again 💕
              </motion.button>

              <motion.button
                className="px-7 py-3.5 rounded-full text-base font-semibold cursor-pointer border-0 flex items-center gap-2"
                style={{
                  background:
                    'linear-gradient(135deg, #c9a84c 0%, #f5d78e 50%, #c9a84c 100%)',
                  color: '#2d1520',
                  boxShadow:
                    '0 0 25px rgba(201,168,76,0.35), 0 4px 16px rgba(0,0,0,0.3)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setKeepMoment(true)}
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                Keep This Moment ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keep this moment message */}
        <AnimatePresence>
          {keepMoment && (
            <motion.div
              className="mt-6 px-8 py-6 rounded-2xl text-center"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(201,168,76,0.3)',
                boxShadow:
                  '0 8px 32px rgba(0,0,0,0.3), 0 0 60px rgba(224,82,114,0.1)',
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mb-3"
              >
                <Heart
                  className="w-10 h-10 mx-auto"
                  fill="#e05272"
                  color="#e05272"
                />
              </motion.div>
              <motion.p
                className="text-lg md:text-xl italic"
                style={{
                  color: '#f5d0d8',
                  textShadow: '0 0 10px rgba(224,82,114,0.2)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                This moment lives in our hearts forever ❤️
              </motion.p>
              <motion.p
                className="text-sm mt-3"
                style={{ color: 'rgba(201,168,76,0.7)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                — With all my love, always and forever —
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
