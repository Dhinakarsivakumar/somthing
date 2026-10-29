import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState, useCallback, useEffect } from 'react';
import { ProposalContext } from '../context/ProposalContext';
import FloatingElements from './FloatingElements';

/* ================================================================== */
/*  SVG COMPONENTS                                                     */
/* ================================================================== */

/** Feminine hand – palm-down, slender fingers, painted nails */
function FeminineHand({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Wrist / Palm */}
      <path
        d="M90 310 C90 280, 85 240, 95 200 C100 180, 110 170, 130 160
           L170 160 C190 170, 200 180, 205 200 C215 240, 210 280, 210 310 Z"
        fill="#F5D0C5"
        stroke="#e0b5a8"
        strokeWidth="1.5"
      />
      {/* Palm top curve */}
      <ellipse cx="150" cy="165" rx="48" ry="18" fill="#F5D0C5" />

      {/* Pinky finger */}
      <path
        d="M95 200 C88 190, 78 160, 72 130 C68 112, 70 100, 78 95
           C86 90, 94 96, 96 110 C100 130, 98 155, 100 170"
        fill="#F5D0C5"
        stroke="#e0b5a8"
        strokeWidth="1.2"
      />
      {/* Pinky nail */}
      <ellipse cx="75" cy="97" rx="6" ry="8" fill="#f4a0b0" stroke="#e88a9c" strokeWidth="0.8" />

      {/* Ring finger – prominent, slightly longer */}
      <path
        d="M115 175 C110 155, 105 120, 100 85 C97 65, 100 50, 110 45
           C120 40, 128 50, 130 68 C133 90, 128 130, 125 160"
        fill="#F5D0C5"
        stroke="#e0b5a8"
        strokeWidth="1.2"
      />
      {/* Ring finger nail */}
      <ellipse cx="107" cy="48" rx="7.5" ry="9.5" fill="#f4a0b0" stroke="#e88a9c" strokeWidth="0.8" />

      {/* Middle finger */}
      <path
        d="M140 168 C137 145, 132 105, 128 65 C125 42, 130 25, 142 20
           C154 15, 160 30, 160 50 C160 75, 155 120, 150 160"
        fill="#F5D0C5"
        stroke="#e0b5a8"
        strokeWidth="1.2"
      />
      {/* Middle nail */}
      <ellipse cx="140" cy="23" rx="8" ry="10" fill="#f4a0b0" stroke="#e88a9c" strokeWidth="0.8" />

      {/* Index finger */}
      <path
        d="M168 165 C170 140, 172 105, 175 72 C177 50, 182 35, 192 32
           C202 29, 208 42, 206 60 C204 82, 195 125, 185 160"
        fill="#F5D0C5"
        stroke="#e0b5a8"
        strokeWidth="1.2"
      />
      {/* Index nail */}
      <ellipse cx="194" cy="34" rx="7.5" ry="9" fill="#f4a0b0" stroke="#e88a9c" strokeWidth="0.8" />

      {/* Thumb */}
      <path
        d="M205 195 C215 185, 230 170, 240 155 C248 143, 252 135, 248 128
           C244 121, 234 124, 228 134 C220 148, 212 168, 208 185"
        fill="#F5D0C5"
        stroke="#e0b5a8"
        strokeWidth="1.2"
      />
      {/* Thumb nail */}
      <ellipse cx="247" cy="132" rx="6" ry="8" fill="#f4a0b0" stroke="#e88a9c" strokeWidth="0.8" />

      {/* Subtle knuckle highlights */}
      <circle cx="80" cy="120" r="3" fill="#f0c4b8" opacity="0.5" />
      <circle cx="108" cy="78" r="3.5" fill="#f0c4b8" opacity="0.5" />
      <circle cx="140" cy="58" r="3.5" fill="#f0c4b8" opacity="0.5" />
      <circle cx="178" cy="65" r="3" fill="#f0c4b8" opacity="0.5" />
    </svg>
  );
}

/** Heart-shaped ring SVG */
function HeartRing({ className, glowing }: { className?: string; glowing?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gold band */}
      <ellipse cx="30" cy="52" rx="14" ry="8" stroke="#C9A84C" strokeWidth="3.5" fill="none" />
      <ellipse cx="30" cy="52" rx="14" ry="8" stroke="#e0c06a" strokeWidth="1.5" fill="none" opacity="0.5" />

      {/* Heart shape on top */}
      <path
        d="M30 42 C30 42, 12 28, 12 18 C12 10, 18 4, 24 4 C28 4, 30 8, 30 12
           C30 8, 32 4, 36 4 C42 4, 48 10, 48 18 C48 28, 30 42, 30 42 Z"
        fill="#C21E56"
        stroke="#a8184a"
        strokeWidth="1"
      />
      {/* Heart highlight */}
      <path
        d="M22 14 C22 10, 26 8, 28 12"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Glow filter */}
      {glowing && (
        <>
          <defs>
            <filter id="ring-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <ellipse cx="30" cy="52" rx="16" ry="10" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.4" filter="url(#ring-glow)" />
        </>
      )}
    </svg>
  );
}

/** Masculine hand – broader, slightly darker skin */
function MasculineHand({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: 'scaleX(-1)' }}
    >
      {/* Wrist / Palm */}
      <path
        d="M80 310 C80 275, 75 235, 88 195 C95 175, 108 162, 130 155
           L180 155 C200 162, 212 175, 218 195 C230 235, 225 275, 225 310 Z"
        fill="#D4A574"
        stroke="#c09060"
        strokeWidth="1.5"
      />
      <ellipse cx="155" cy="160" rx="55" ry="20" fill="#D4A574" />

      {/* Pinky */}
      <path
        d="M88 195 C80 182, 68 152, 62 125 C58 105, 62 92, 72 87
           C82 82, 90 90, 92 106 C96 128, 92 158, 95 175"
        fill="#D4A574"
        stroke="#c09060"
        strokeWidth="1.5"
      />
      <ellipse cx="68" cy="90" rx="7" ry="8" fill="#c89a6c" stroke="#b88a5c" strokeWidth="0.8" />

      {/* Ring finger */}
      <path
        d="M112 170 C108 148, 102 112, 96 78 C93 58, 97 42, 108 37
           C119 32, 128 44, 130 62 C133 85, 127 130, 122 158"
        fill="#D4A574"
        stroke="#c09060"
        strokeWidth="1.5"
      />
      <ellipse cx="105" cy="40" rx="8" ry="10" fill="#c89a6c" stroke="#b88a5c" strokeWidth="0.8" />

      {/* Middle finger */}
      <path
        d="M145 162 C142 138, 136 98, 132 56 C129 32, 135 15, 148 10
           C161 5, 168 22, 167 42 C166 68, 160 118, 155 158"
        fill="#D4A574"
        stroke="#c09060"
        strokeWidth="1.5"
      />
      <ellipse cx="146" cy="14" rx="9" ry="11" fill="#c89a6c" stroke="#b88a5c" strokeWidth="0.8" />

      {/* Index finger */}
      <path
        d="M175 160 C178 135, 182 98, 186 66 C188 44, 194 30, 205 27
           C216 24, 222 38, 219 56 C216 78, 205 122, 195 158"
        fill="#D4A574"
        stroke="#c09060"
        strokeWidth="1.5"
      />
      <ellipse cx="208" cy="30" rx="8" ry="10" fill="#c89a6c" stroke="#b88a5c" strokeWidth="0.8" />

      {/* Thumb */}
      <path
        d="M218 192 C228 180, 245 162, 255 145 C262 132, 265 122, 260 115
           C255 108, 244 112, 238 124 C230 140, 222 162, 220 182"
        fill="#D4A574"
        stroke="#c09060"
        strokeWidth="1.5"
      />
      <ellipse cx="258" cy="119" rx="7" ry="9" fill="#c89a6c" stroke="#b88a5c" strokeWidth="0.8" />

      {/* Knuckle accents */}
      <circle cx="72" cy="115" r="3.5" fill="#c9985e" opacity="0.4" />
      <circle cx="105" cy="70" r="4" fill="#c9985e" opacity="0.4" />
      <circle cx="146" cy="48" r="4" fill="#c9985e" opacity="0.4" />
      <circle cx="190" cy="58" r="3.5" fill="#c9985e" opacity="0.4" />
    </svg>
  );
}

/* Sparkles around the ring */
function RingSparkles() {
  const sparkles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const r = 28 + Math.random() * 14;
    return {
      id: i,
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      delay: i * 0.3,
    };
  });

  return (
    <>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: 4,
            height: 4,
            left: `calc(50% + ${s.x}px)`,
            top: `calc(50% + ${s.y}px)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1.2, 0.3],
          }}
          transition={{
            duration: 1.2,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

/* Celebration burst */
function CelebrationBurst() {
  const items = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const dist = 120 + Math.random() * 200;
    return {
      id: i,
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist - 100,
      emoji: i % 3 === 0 ? '🌹' : i % 3 === 1 ? '❤️' : '✨',
      delay: Math.random() * 0.5,
    };
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute text-xl"
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
          animate={{
            opacity: [1, 1, 0],
            x: item.tx,
            y: item.ty,
            scale: [0.4, 1.2, 0.6],
          }}
          transition={{ duration: 1.8, delay: item.delay, ease: 'easeOut' }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Text messages                                                      */
/* ================================================================== */
const MESSAGES = [
  { text: 'Maria, my love... ❤️', delay: 0, size: 'text-2xl sm:text-3xl' },
  { text: 'I have something special for you.', delay: 2, size: 'text-xl sm:text-2xl' },
  {
    text: 'You have already found a place in my heart. Now, I want to give you something that represents my love.',
    delay: 4,
    size: 'text-lg sm:text-xl',
  },
  {
    text: 'Maria, I love you. Will you accept this heart ring from me? ❤️💍',
    delay: 6,
    size: 'text-2xl sm:text-3xl font-bold',
  },
];

/* ================================================================== */
/*  MAIN COMPONENT                                                     */
/* ================================================================== */
export default function HeartRingScene() {
  const { goToScene, setHeartRingAccepted } = useContext(ProposalContext);

  /* Phase tracking */
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [gentleMsg, setGentleMsg] = useState(false);
  const [phase, setPhase] = useState<
    'TEXT' | 'RING_ANIM' | 'CELEBRATE' | 'AFTER'
  >('TEXT');
  const [showContinue, setShowContinue] = useState(false);

  /* Reveal messages one by one */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    MESSAGES.forEach((m, i) => {
      timers.push(
        setTimeout(() => setVisibleMsgs((v) => Math.max(v, i + 1)), m.delay * 1000),
      );
    });
    // Show buttons 1.5s after last message
    timers.push(
      setTimeout(
        () => setShowButtons(true),
        (MESSAGES[MESSAGES.length - 1].delay + 1.5) * 1000,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  /* "I need a moment" handler */
  const handleMoment = useCallback(() => {
    setGentleMsg(true);
  }, []);

  /* "Yes" handler – starts ring placement animation */
  const handleYes = useCallback(() => {
    setHeartRingAccepted(true);
    setShowButtons(false);
    setGentleMsg(false);
    setPhase('RING_ANIM');

    // After ring animation completes (hand moves + ring settles ≈ 4s), celebrate
    setTimeout(() => setPhase('CELEBRATE'), 4000);
    // After celebration, show after-text
    setTimeout(() => setPhase('AFTER'), 6500);
    // Show continue button
    setTimeout(() => setShowContinue(true), 12000);
  }, [setHeartRingAccepted]);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom, #722F37, #a85060, #d4919a)',
      }}
    >
      <FloatingElements heartCount={10} petalCount={6} starCount={25} />

      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl px-6 gap-4">

        {/* ---- TEXT MESSAGES ---- */}
        <div className="flex flex-col items-center gap-4 mb-6">
          {MESSAGES.slice(0, visibleMsgs).map((m, i) => (
            <motion.p
              key={i}
              className={`font-['Playfair_Display',serif] ${m.size} text-white/90 italic text-center leading-relaxed`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {m.text}
            </motion.p>
          ))}
        </div>

        {/* ---- HANDS + RING AREA ---- */}
        <div className="relative w-full flex items-center justify-center"
          style={{ height: 'clamp(220px, 40vw, 380px)' }}
        >
          {/* Feminine hand (left, stationary) */}
          <motion.div
            className="absolute"
            style={{
              width: 'clamp(120px, 22vw, 220px)',
              left: '15%',
              bottom: '0',
            }}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <FeminineHand className="w-full h-auto" />
          </motion.div>

          {/* Masculine hand (right, animates toward feminine hand) */}
          <motion.div
            className="absolute"
            style={{
              width: 'clamp(130px, 24vw, 240px)',
              right: '15%',
              bottom: '0',
            }}
            initial={{ opacity: 0, x: 80 }}
            animate={
              phase === 'RING_ANIM' || phase === 'CELEBRATE' || phase === 'AFTER'
                ? { opacity: 1, x: -30 }
                : { opacity: 1, x: 0 }
            }
            transition={
              phase === 'RING_ANIM'
                ? { duration: 2, ease: 'easeInOut' }
                : { duration: 1.2, delay: 0.6 }
            }
          >
            <MasculineHand className="w-full h-auto" />

            {/* Ring held by masculine hand – moves to ring finger */}
            <AnimatePresence>
              {(phase === 'RING_ANIM' || phase === 'CELEBRATE' || phase === 'AFTER') && (
                <motion.div
                  className="absolute"
                  style={{ width: 40, height: 44 }}
                  initial={{
                    opacity: 0,
                    left: '40%',
                    top: '30%',
                    scale: 0.8,
                  }}
                  animate={
                    phase === 'RING_ANIM'
                      ? {
                          opacity: 1,
                          /* Move ring toward the feminine hand's ring finger area */
                          left: '-140%',
                          top: '15%',
                          scale: 1,
                        }
                      : {
                          opacity: 1,
                          left: '-140%',
                          top: '15%',
                          scale: [1, 1.15, 1],
                        }
                  }
                  transition={
                    phase === 'RING_ANIM'
                      ? { duration: 2.5, delay: 0.8, ease: 'easeInOut' }
                      : {
                          scale: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                        }
                  }
                >
                  <HeartRing
                    className="w-full h-full"
                    glowing={phase === 'CELEBRATE' || phase === 'AFTER'}
                  />
                  {(phase === 'CELEBRATE' || phase === 'AFTER') && <RingSparkles />}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Golden glow behind ring area during celebration */}
          <AnimatePresence>
            {(phase === 'CELEBRATE' || phase === 'AFTER') && (
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 160,
                  height: 160,
                  left: '35%',
                  top: '20%',
                  background:
                    'radial-gradient(circle, rgba(201,168,76,0.35) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0.7], scale: [0.5, 1.3, 1] }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>

          {/* Celebration burst */}
          <AnimatePresence>
            {phase === 'CELEBRATE' && <CelebrationBurst />}
          </AnimatePresence>
        </div>

        {/* ---- BUTTONS ---- */}
        <AnimatePresence>
          {showButtons && phase === 'TEXT' && (
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              {/* Yes button */}
              <motion.button
                className="px-8 py-4 rounded-full text-white font-bold text-lg cursor-pointer border-0 shadow-lg"
                style={{
                  background:
                    'linear-gradient(135deg, #C9A84C, #e0c06a, #C9A84C)',
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(201,168,76,0.3)',
                    '0 0 40px rgba(201,168,76,0.6)',
                    '0 0 20px rgba(201,168,76,0.3)',
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                onClick={handleYes}
              >
                Yes, I accept your ring! ❤️
              </motion.button>

              {/* Moment button */}
              <motion.button
                className="px-5 py-2.5 rounded-full text-white/70 text-sm cursor-pointer border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleMoment}
              >
                I need a moment...
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gentle "take your time" message */}
        <AnimatePresence>
          {gentleMsg && phase === 'TEXT' && (
            <motion.p
              className="font-['Playfair_Display',serif] text-lg text-white/80 italic mt-2 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
            >
              Take all the time you need, my love. I'll be right here. ❤️
            </motion.p>
          )}
        </AnimatePresence>

        {/* ---- AFTER RING PLACEMENT TEXT ---- */}
        <AnimatePresence>
          {phase === 'AFTER' && (
            <motion.div
              className="flex flex-col items-center gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              <motion.p
                className="font-['Playfair_Display',serif] text-2xl sm:text-3xl text-white font-bold text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                She said yes to the first little promise. ❤️
              </motion.p>
              <motion.p
                className="font-['Playfair_Display',serif] text-lg sm:text-xl text-white/80 italic text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.5 }}
              >
                One ring, one beautiful memory, and a heart full of love.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- CONTINUE BUTTON ---- */}
        <AnimatePresence>
          {showContinue && phase === 'AFTER' && (
            <motion.button
              className="mt-6 px-8 py-4 rounded-full text-white font-semibold text-lg cursor-pointer border-0 shadow-lg"
              style={{
                background:
                  'linear-gradient(135deg, #C9A84C, #e0c06a, #C9A84C)',
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
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => goToScene('MARRIAGE_PROPOSAL')}
            >
              Continue ❤️
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
