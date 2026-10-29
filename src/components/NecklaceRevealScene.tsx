import { motion, AnimatePresence } from 'framer-motion';
import { useState, useContext, useEffect, useMemo } from 'react';
import { ProposalContext } from '../context/ProposalContext';
import FloatingElements from './FloatingElements';
import { Heart } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Seeded random helper (same as FloatingElements)                   */
/* ------------------------------------------------------------------ */
function seeded(i: number, off: number) {
  return ((i * 9301 + off * 49297) % 233280) / 233280;
}

/* ------------------------------------------------------------------ */
/*  Sparkle / particle sub-components                                 */
/* ------------------------------------------------------------------ */
function Sparkles({ count = 20 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: seeded(i, 40) * 200 - 100,
        y: -(seeded(i, 41) * 300 + 60),
        size: 4 + seeded(i, 42) * 8,
        delay: seeded(i, 43) * 2,
        dur: 2 + seeded(i, 44) * 2,
      })),
    [count],
  );

  return (
    <>
      {items.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background:
              s.id % 3 === 0
                ? 'radial-gradient(circle,#ffe08a,#c9a84c)'
                : s.id % 3 === 1
                  ? 'radial-gradient(circle,#ff8fa3,#e05272)'
                  : 'radial-gradient(circle,#fff,#ffd700)',
            left: '50%',
            top: '50%',
            boxShadow: '0 0 6px 2px rgba(255,215,0,0.4)',
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: s.x,
            y: s.y,
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 0.8, 0],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
}

function RisingHearts({ count = 10 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: seeded(i, 50) * 160 - 80,
        delay: seeded(i, 51) * 3,
        dur: 3 + seeded(i, 52) * 2,
        size: 14 + seeded(i, 53) * 14,
      })),
    [count],
  );

  return (
    <>
      {items.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            fontSize: h.size,
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: h.x,
            y: [0, -200, -350],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: h.dur,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG Necklace fallback                                             */
/* ------------------------------------------------------------------ */
function SVGNecklace() {
  return (
    <svg
      viewBox="0 0 200 260"
      className="w-48 h-60 md:w-56 md:h-72 drop-shadow-xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chain – delicate curve */}
      <defs>
        <linearGradient id="chainGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5d78e" />
          <stop offset="50%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#f5d78e" />
        </linearGradient>
        <linearGradient id="pendantGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe08a" />
          <stop offset="100%" stopColor="#c9a84c" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Chain links */}
      <motion.path
        d="M40,10 Q40,10 50,20 Q70,50 80,80 Q90,110 100,130 Q110,110 120,80 Q130,50 150,20 Q160,10 160,10"
        fill="none"
        stroke="url(#chainGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Small chain dots for texture */}
      {Array.from({ length: 12 }, (_, i) => {
        const side = i < 6 ? -1 : 1;
        const idx = i < 6 ? i : 11 - i;
        const cx = 100 + side * (60 - idx * 10);
        const cy = 10 + idx * 24;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="1.5"
            fill="#f5d78e"
            opacity={0.6}
          />
        );
      })}

      {/* Heart pendant */}
      <motion.path
        d="M100,165 C100,165 75,145 75,158 C75,172 100,195 100,195 C100,195 125,172 125,158 C125,145 100,165 100,165 Z"
        fill="url(#pendantGrad)"
        stroke="#c9a84c"
        strokeWidth="1.5"
        filter="url(#glow)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ transformOrigin: '100px 175px' }}
      />

      {/* Crystal in center */}
      <motion.circle
        cx="100"
        cy="172"
        r="6"
        fill="rgba(255,255,255,0.5)"
        stroke="#fff"
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
      />

      {/* Sparkle accents */}
      <motion.circle
        cx="85"
        cy="155"
        r="2"
        fill="#fff"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2.5 }}
      />
      <motion.circle
        cx="115"
        cy="160"
        r="1.5"
        fill="#fff"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 3 }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Glowing heart outline behind necklace (stroke-dasharray animation)*/
/* ------------------------------------------------------------------ */
function GlowingHeartOutline() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="absolute w-64 h-64 md:w-80 md:h-80 -z-10"
      style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 2, delay: 1 }}
    >
      <defs>
        <filter id="heartGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d="M100,180 C100,180 30,130 30,80 C30,50 55,30 80,40 C90,44 100,55 100,55 C100,55 110,44 120,40 C145,30 170,50 170,80 C170,130 100,180 100,180 Z"
        fill="none"
        stroke="url(#chainGrad)"
        strokeWidth="2"
        filter="url(#heartGlow)"
        strokeDasharray="500"
        initial={{ strokeDashoffset: 500 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
      />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Gift Box SVG                                                       */
/* ------------------------------------------------------------------ */
function GiftBox({
  isOpen,
  onAnimationComplete,
}: {
  isOpen: boolean;
  onAnimationComplete?: () => void;
}) {
  return (
    <div className="relative w-52 h-56 md:w-64 md:h-68 mx-auto">
      {/* Shadow */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-6 rounded-[50%] bg-black/30 blur-md"
        animate={{ scaleX: isOpen ? 1.3 : 1, opacity: isOpen ? 0.2 : 0.4 }}
        transition={{ duration: 1 }}
      />

      {/* Box body */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-36 md:w-52 md:h-40 rounded-md overflow-hidden"
        style={{
          background:
            'linear-gradient(145deg, #8b3a42 0%, #722F37 40%, #5e2630 100%)',
          boxShadow:
            'inset 0 2px 8px rgba(255,200,200,0.15), 0 8px 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Velvet texture lines */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute w-full h-px"
            style={{
              top: `${15 + i * 15}%`,
              background:
                'linear-gradient(90deg, transparent, rgba(255,200,200,0.08), transparent)',
            }}
          />
        ))}

        {/* Gold trim – bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{
            background: 'linear-gradient(90deg, #b8942e, #f5d78e, #c9a84c)',
          }}
        />
        {/* Gold trim – top */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: 'linear-gradient(90deg, #b8942e, #f5d78e, #c9a84c)',
          }}
        />
        {/* Gold trim – left */}
        <div
          className="absolute top-0 left-0 bottom-0 w-1.5"
          style={{
            background: 'linear-gradient(180deg, #b8942e, #f5d78e, #c9a84c)',
          }}
        />
        {/* Gold trim – right */}
        <div
          className="absolute top-0 right-0 bottom-0 w-1.5"
          style={{
            background: 'linear-gradient(180deg, #b8942e, #f5d78e, #c9a84c)',
          }}
        />

        {/* Vertical ribbon on box */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-5"
              style={{
                background:
                  'linear-gradient(90deg, #b8942e, #f5d78e, #f5d78e, #b8942e)',
                boxShadow: '0 0 8px rgba(201,168,76,0.3)',
              }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeIn' }}
            />
          )}
        </AnimatePresence>

        {/* Horizontal ribbon on box */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-5"
              style={{
                background:
                  'linear-gradient(180deg, #b8942e, #f5d78e, #f5d78e, #b8942e)',
                boxShadow: '0 0 8px rgba(201,168,76,0.3)',
              }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeIn' }}
            />
          )}
        </AnimatePresence>

        {/* Gold heart emblem on front */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <Heart
            className="w-6 h-6"
            fill="#c9a84c"
            color="#f5d78e"
            strokeWidth={1.5}
          />
        </div>

        {/* Golden light from inside */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center top, rgba(255,215,100,0.8) 0%, rgba(201,168,76,0.3) 40%, transparent 70%)',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Lid – uses perspective for 3D hinge */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-48 md:w-56"
        style={{
          bottom: '60%',
          perspective: 600,
          transformStyle: 'preserve-3d',
          zIndex: isOpen ? 0 : 10,
        }}
      >
        <motion.div
          style={{
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateX: isOpen ? -110 : 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          onAnimationComplete={() => {
            if (isOpen && onAnimationComplete) onAnimationComplete();
          }}
        >
          {/* Lid front face */}
          <div
            className="w-full h-12 md:h-14 rounded-t-md"
            style={{
              background:
                'linear-gradient(145deg, #8b3a42 0%, #722F37 40%, #5e2630 100%)',
              boxShadow:
                'inset 0 2px 8px rgba(255,200,200,0.15), 0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            {/* Gold trim on lid */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 rounded-t-md"
              style={{
                background:
                  'linear-gradient(90deg, #b8942e, #f5d78e, #c9a84c)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                background:
                  'linear-gradient(90deg, #b8942e, #f5d78e, #c9a84c)',
              }}
            />
            <div
              className="absolute top-0 left-0 bottom-0 w-1.5 rounded-tl-md"
              style={{
                background:
                  'linear-gradient(180deg, #b8942e, #f5d78e, #c9a84c)',
              }}
            />
            <div
              className="absolute top-0 right-0 bottom-0 w-1.5 rounded-tr-md"
              style={{
                background:
                  'linear-gradient(180deg, #b8942e, #f5d78e, #c9a84c)',
              }}
            />

            {/* Ribbon on lid */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-5"
                  style={{
                    background:
                      'linear-gradient(90deg, #b8942e, #f5d78e, #f5d78e, #b8942e)',
                  }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Ribbon bow on top */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{ bottom: '78%' }}
            exit={{ scale: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
          >
            <svg
              width="80"
              height="50"
              viewBox="0 0 80 50"
              className="drop-shadow-md"
            >
              {/* Left loop */}
              <path
                d="M40,30 C30,25 10,5 15,15 C18,22 30,28 40,30"
                fill="none"
                stroke="#f5d78e"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M40,30 C30,25 10,5 15,15 C18,22 30,28 40,30"
                fill="rgba(201,168,76,0.3)"
              />
              {/* Right loop */}
              <path
                d="M40,30 C50,25 70,5 65,15 C62,22 50,28 40,30"
                fill="none"
                stroke="#f5d78e"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M40,30 C50,25 70,5 65,15 C62,22 50,28 40,30"
                fill="rgba(201,168,76,0.3)"
              />
              {/* Center knot */}
              <circle cx="40" cy="30" r="5" fill="#c9a84c" />
              {/* Tails */}
              <path
                d="M38,35 Q32,45 28,48"
                fill="none"
                stroke="#f5d78e"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M42,35 Q48,45 52,48"
                fill="none"
                stroke="#f5d78e"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  MAIN SCENE COMPONENT                                              */
/* ================================================================== */
export default function NecklaceRevealScene() {
  const { goToScene } = useContext(ProposalContext);

  const [showSecondText, setShowSecondText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);
  const [lidDone, setLidDone] = useState(false);
  const [showNecklace, setShowNecklace] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [necklaceImgExists, setNecklaceImgExists] = useState(false);
  const [bgTransitioned, setBgTransitioned] = useState(false);

  /* Check if necklace image exists */
  useEffect(() => {
    const img = new Image();
    img.onload = () => setNecklaceImgExists(true);
    img.onerror = () => setNecklaceImgExists(false);
    img.src = '/assets/necklace.png';
  }, []);

  /* Text sequencing */
  useEffect(() => {
    const t1 = setTimeout(() => setShowSecondText(true), 3000);
    const t2 = setTimeout(() => setShowButton(true), 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* After lid finishes opening → show necklace & effects */
  useEffect(() => {
    if (!lidDone) return;
    const t1 = setTimeout(() => {
      setBgTransitioned(true);
      setShowNecklace(true);
    }, 800);
    const t2 = setTimeout(() => setShowMessages(true), 3500);
    const t3 = setTimeout(() => setShowContinue(true), 11000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [lidDone]);

  const handleOpen = () => {
    setBoxOpened(true);
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Dynamic background */}
      <motion.div
        className="fixed inset-0 -z-20"
        animate={{
          background: bgTransitioned
            ? 'linear-gradient(135deg, #2d1b2e 0%, #4a2040 30%, #6b3a5a 60%, #d4a0a0 100%)'
            : 'linear-gradient(135deg, #0d0d0d 0%, #1a0a0f 40%, #2d1520 80%, #1a0a0f 100%)',
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      {/* Warm ambient glow */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.08) 0%, transparent 60%)',
        }}
      />

      <FloatingElements heartCount={8} petalCount={6} starCount={25} />

      {/* ---- Pre-open content ---- */}
      <AnimatePresence>
        {!boxOpened && (
          <motion.div
            className="flex flex-col items-center gap-6 w-full max-w-xl"
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            {/* First text */}
            <motion.p
              className="text-xl md:text-2xl text-center font-light leading-relaxed"
              style={{ color: '#f0d0d8' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              Maria, my love… I have one more surprise for you. ❤️
            </motion.p>

            {/* Second text */}
            <AnimatePresence>
              {showSecondText && (
                <motion.p
                  className="text-lg md:text-xl text-center font-light"
                  style={{ color: '#e0b8c0' }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  Close your eyes for a second… just kidding! Your surprise is
                  right here. 🎁
                </motion.p>
              )}
            </AnimatePresence>

            {/* Gift Box */}
            <div className="my-4">
              <GiftBox isOpen={false} />
            </div>

            {/* Open button */}
            <AnimatePresence>
              {showButton && (
                <motion.button
                  className="mt-2 px-8 py-4 rounded-full text-lg md:text-xl font-semibold text-white cursor-pointer border-0"
                  style={{
                    background:
                      'linear-gradient(135deg, #c9a84c 0%, #f5d78e 50%, #c9a84c 100%)',
                    color: '#2d1520',
                    boxShadow:
                      '0 0 30px rgba(201,168,76,0.4), 0 4px 20px rgba(0,0,0,0.3)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  onClick={handleOpen}
                >
                  Open Your Final Surprise ✨
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Box opening sequence ---- */}
      <AnimatePresence>
        {boxOpened && !showNecklace && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          >
            <GiftBox
              isOpen={true}
              onAnimationComplete={() => setLidDone(true)}
            />

            {/* Particles rising from box */}
            {lidDone && (
              <div className="absolute" style={{ bottom: '35%' }}>
                <Sparkles count={24} />
                <RisingHearts count={12} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Necklace reveal ---- */}
      <AnimatePresence>
        {showNecklace && (
          <motion.div
            className="flex flex-col items-center gap-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Glowing heart outline behind necklace */}
            <GlowingHeartOutline />

            {/* Necklace */}
            <motion.div
              className="relative"
              initial={{ y: 100, scale: 0.5, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ rotateY: [0, 8, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ perspective: 800 }}
              >
                {necklaceImgExists ? (
                  <motion.img
                    src="/assets/necklace.png"
                    alt="Necklace for Maria"
                    className="w-48 h-auto md:w-64 drop-shadow-2xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                ) : (
                  <SVGNecklace />
                )}
              </motion.div>

              {/* Light reflections / sparkles on necklace */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-white"
                style={{ boxShadow: '0 0 10px 4px rgba(255,255,255,0.6)' }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
              <motion.div
                className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-white"
                style={{ boxShadow: '0 0 8px 3px rgba(255,215,0,0.5)' }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 2,
                }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-yellow-200"
                style={{ boxShadow: '0 0 8px 3px rgba(255,215,0,0.4)' }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: 3,
                }}
              />
            </motion.div>

            {/* Rising sparkles background effect */}
            <div className="absolute -z-5 pointer-events-none">
              <Sparkles count={16} />
            </div>

            {/* ---- Post-animation messages ---- */}
            <AnimatePresence>
              {showMessages && (
                <motion.div
                  className="flex flex-col items-center gap-5 mt-6 max-w-lg px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.p
                    className="text-lg md:text-xl text-center font-light italic"
                    style={{ color: '#f5d0d8' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                  >
                    Maria, every gift has a story, and this one carries a little
                    piece of my heart.
                  </motion.p>

                  <motion.p
                    className="text-base md:text-lg text-center font-light"
                    style={{ color: '#e0b8c4' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 2 }}
                  >
                    I may not always be beside you physically, but I want you to
                    feel my love, my care, and my presence in your life.
                  </motion.p>

                  <motion.h2
                    className="text-2xl md:text-4xl text-center font-bold mt-4"
                    style={{
                      background:
                        'linear-gradient(135deg, #f5d78e, #ffe08a, #c9a84c)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: 'none',
                      filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.5))',
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 1.5,
                      delay: 4.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    I LOVE YOU, MARIA. FOREVER AND ALWAYS. ❤️💍
                  </motion.h2>

                  {/* Continue button */}
                  <AnimatePresence>
                    {showContinue && (
                      <motion.button
                        className="mt-6 px-8 py-3 rounded-full text-lg font-semibold cursor-pointer border-0"
                        style={{
                          background:
                            'linear-gradient(135deg, #e05272, #c94060)',
                          color: '#fff',
                          boxShadow:
                            '0 0 25px rgba(224,82,114,0.4), 0 4px 16px rgba(0,0,0,0.3)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                        onClick={() => goToScene('VOICE_MESSAGE')}
                      >
                        Continue ❤️
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
