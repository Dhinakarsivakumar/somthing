import { motion, AnimatePresence } from 'framer-motion';
import { useState, useContext, useCallback, useMemo } from 'react';
import { ProposalContext } from '../context/ProposalContext';
import FloatingElements from './FloatingElements';

/* ─── Feminine hand SVG with heart ring pre-placed on ring finger ─── */
function FeminineHandWithHeartRing({ showSecondRing }: { showSecondRing: boolean }) {
  return (
    <svg viewBox="0 0 220 320" width="220" height="320" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Palm */}
      <ellipse cx="110" cy="210" rx="62" ry="80" fill="#F5CBA7" />
      <ellipse cx="110" cy="210" rx="62" ry="80" fill="url(#palmGlow)" />

      {/* Wrist */}
      <rect x="72" y="260" width="76" height="60" rx="20" fill="#F5CBA7" />

      {/* Pinky finger */}
      <rect x="38" y="110" width="22" height="90" rx="11" fill="#F5CBA7" />
      <ellipse cx="49" cy="110" rx="11" ry="8" fill="#F5CBA7" />

      {/* Ring finger - has heart ring */}
      <rect x="66" y="80" width="24" height="110" rx="12" fill="#F5CBA7" />
      <ellipse cx="78" cy="80" rx="12" ry="8" fill="#F5CBA7" />
      {/* Heart Ring on ring finger */}
      <g>
        {/* Gold band */}
        <rect x="64" y="140" width="28" height="10" rx="5" fill="#C9A84C" />
        <rect x="64" y="140" width="28" height="10" rx="5" fill="url(#ringShine)" opacity="0.5" />
        {/* Heart stone */}
        <g transform="translate(78, 138)">
          <path d="M0,-4 C-2,-8 -7,-8 -7,-4 C-7,0 0,5 0,5 C0,5 7,0 7,-4 C7,-8 2,-8 0,-4Z"
            fill="#C21E56" stroke="#A01848" strokeWidth="0.5" />
          <path d="M-1,-4 C-2,-6 -5,-6 -5,-4 C-5,-2 -1,1 -1,1Z" fill="#E84880" opacity="0.5" />
        </g>
      </g>

      {/* Middle finger */}
      <rect x="96" y="65" width="26" height="120" rx="13" fill="#F5CBA7" />
      <ellipse cx="109" cy="65" rx="13" ry="9" fill="#F5CBA7" />
      {/* Second ring placement target (middle finger) */}
      {showSecondRing && (
        <g>
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {/* Gold band */}
            <rect x="94" y="128" width="30" height="10" rx="5" fill="#C9A84C" />
            <rect x="94" y="128" width="30" height="10" rx="5" fill="url(#ringShine)" opacity="0.5" />
            {/* Diamond stone */}
            <g transform="translate(109, 124)">
              <polygon points="0,-7 5,-2 3,2 -3,2 -5,-2" fill="#FFFFFF" stroke="#E0D8C0" strokeWidth="0.5" />
              <polygon points="0,-7 5,-2 0,0" fill="#F0F0F0" opacity="0.7" />
              <polygon points="0,-7 -5,-2 0,0" fill="#FAFAFA" opacity="0.9" />
              <polygon points="5,-2 3,2 0,0" fill="#E8E8E8" opacity="0.6" />
              <polygon points="-5,-2 -3,2 0,0" fill="#F5F5F5" opacity="0.8" />
              <polygon points="3,2 -3,2 0,0" fill="#ECECEC" opacity="0.7" />
              {/* Sparkle on diamond */}
              <motion.circle
                cx="0" cy="-3" r="1.5"
                fill="white"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.6, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </g>
          </motion.g>
        </g>
      )}

      {/* Index finger */}
      <rect x="128" y="80" width="24" height="105" rx="12" fill="#F5CBA7" />
      <ellipse cx="140" cy="80" rx="12" ry="8" fill="#F5CBA7" />

      {/* Thumb */}
      <rect x="150" y="175" width="22" height="60" rx="11" fill="#F5CBA7" transform="rotate(25, 161, 205)" />

      {/* Nail details */}
      <ellipse cx="49" cy="108" rx="7" ry="5" fill="#FADADD" opacity="0.7" />
      <ellipse cx="78" cy="78" rx="8" ry="5" fill="#FADADD" opacity="0.7" />
      <ellipse cx="109" cy="63" rx="9" ry="6" fill="#FADADD" opacity="0.7" />
      <ellipse cx="140" cy="78" rx="8" ry="5" fill="#FADADD" opacity="0.7" />

      {/* Ring sparkle animations */}
      {showSecondRing && (
        <>
          <motion.circle cx="78" cy="134" r="3" fill="white" opacity="0"
            animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
          <motion.circle cx="109" cy="122" r="3" fill="white" opacity="0"
            animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }} />
        </>
      )}

      <defs>
        <radialGradient id="palmGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FDEBD0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F5CBA7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ringShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#FFF8DC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Masculine hand SVG holding a proposal ring ─── */
function MasculineHandWithRing() {
  return (
    <svg viewBox="0 0 200 300" width="200" height="300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Palm */}
      <ellipse cx="100" cy="180" rx="55" ry="72" fill="#D4A574" />

      {/* Wrist */}
      <rect x="62" y="230" width="76" height="70" rx="18" fill="#D4A574" />

      {/* Thumb – extending to hold ring */}
      <rect x="30" y="140" width="24" height="65" rx="12" fill="#D4A574" transform="rotate(-15, 42, 172)" />

      {/* Index finger - curled around ring */}
      <rect x="50" y="85" width="26" height="100" rx="13" fill="#D4A574" />
      <ellipse cx="63" cy="85" rx="13" ry="9" fill="#D4A574" />

      {/* Middle finger */}
      <rect x="80" y="72" width="26" height="105" rx="13" fill="#D4A574" />
      <ellipse cx="93" cy="72" rx="13" ry="9" fill="#D4A574" />

      {/* Ring finger */}
      <rect x="110" y="82" width="24" height="95" rx="12" fill="#D4A574" />
      <ellipse cx="122" cy="82" rx="12" ry="8" fill="#D4A574" />

      {/* Pinky */}
      <rect x="138" y="100" width="22" height="80" rx="11" fill="#D4A574" />
      <ellipse cx="149" cy="100" rx="11" ry="7" fill="#D4A574" />

      {/* Nails */}
      <ellipse cx="63" cy="83" rx="8" ry="5" fill="#C9956A" opacity="0.5" />
      <ellipse cx="93" cy="70" rx="9" ry="5" fill="#C9956A" opacity="0.5" />
      <ellipse cx="122" cy="80" rx="8" ry="5" fill="#C9956A" opacity="0.5" />
      <ellipse cx="149" cy="98" rx="7" ry="4" fill="#C9956A" opacity="0.5" />

      {/* Ring being held between thumb and index finger */}
      <g transform="translate(42, 138)">
        {/* Gold band */}
        <ellipse cx="0" cy="0" rx="10" ry="12" fill="none" stroke="#C9A84C" strokeWidth="4" />
        <ellipse cx="0" cy="0" rx="10" ry="12" fill="none" stroke="url(#mRingShine)" strokeWidth="2" opacity="0.6" />
        {/* Diamond on top */}
        <g transform="translate(0, -12)">
          <polygon points="0,-8 6,-3 4,3 -4,3 -6,-3" fill="#FFFFFF" stroke="#E0D8C0" strokeWidth="0.6" />
          <polygon points="0,-8 6,-3 0,0" fill="#F0F0F0" opacity="0.7" />
          <polygon points="0,-8 -6,-3 0,0" fill="#FAFAFA" opacity="0.9" />
          <polygon points="6,-3 4,3 0,0" fill="#E8E8E8" opacity="0.6" />
          <polygon points="-6,-3 -4,3 0,0" fill="#F5F5F5" opacity="0.8" />
          <polygon points="4,3 -4,3 0,0" fill="#ECECEC" opacity="0.7" />
          {/* Sparkle */}
          <motion.circle cx="0" cy="-4" r="2" fill="white"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }} />
        </g>
      </g>

      <defs>
        <linearGradient id="mRingShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#FFF8DC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Celebration burst particles ─── */
function CelebrationBurst() {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * Math.PI * 2;
      const distance = 80 + Math.random() * 200;
      const emojis = ['❤️', '💕', '🌸', '✨', '💍', '💖', '🌹'];
      return {
        id: i,
        emoji: emojis[i % emojis.length],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 12 + Math.random() * 16,
        delay: Math.random() * 0.5,
        rotate: Math.random() * 360,
      };
    }), []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ fontSize: p.size }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.5],
            rotate: p.rotate,
          }}
          transition={{
            duration: 3,
            delay: p.delay,
            ease: 'easeOut',
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Golden particles overlay ─── */
function GoldenParticles() {
  const dots = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: 'radial-gradient(circle, #FFD700, #C9A84C)',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
            y: [0, -30, -60],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Marriage Proposal Scene ─── */
export default function MarriageProposalScene() {
  const { goToScene, setMarriageAccepted } = useContext(ProposalContext);

  const [phase, setPhase] = useState<
    'text1' | 'text2' | 'text3' | 'buttons' | 'thinking' | 'ringAnimation' | 'celebration'
  >('text1');

  const [showSecondRing, setShowSecondRing] = useState(false);

  const handleYes = useCallback(() => {
    setMarriageAccepted(true);
    setPhase('ringAnimation');

    // After 2s ring approach, place the ring
    setTimeout(() => {
      setShowSecondRing(true);
    }, 2000);

    // Switch to celebration after ring is placed
    setTimeout(() => {
      setPhase('celebration');
    }, 3500);
  }, [setMarriageAccepted]);

  const handleThink = useCallback(() => {
    setPhase('thinking');
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #3d2810 0%, #1a0e05 50%, #0d0703 100%)',
      }}
    >
      {/* Warm ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(201,168,76,0.15) 0%, transparent 60%)',
        }}
      />

      <FloatingElements heartCount={8} petalCount={6} starCount={20} />

      {/* ═══ TEXT SEQUENCE ═══ */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-2xl mx-auto text-center">

        {/* Phase: Text 1 */}
        <AnimatePresence>
          {(phase === 'text1' || phase === 'text2' || phase === 'text3' || phase === 'buttons') && (
            <motion.p
              className="text-amber-200/90 text-lg md:text-xl mb-6 font-light italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              onAnimationComplete={() => {
                if (phase === 'text1') {
                  setTimeout(() => setPhase('text2'), 3000);
                }
              }}
            >
              Maria, the first ring was a little promise from my heart...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Phase: Text 2 */}
        <AnimatePresence>
          {(phase === 'text2' || phase === 'text3' || phase === 'buttons') && (
            <motion.p
              className="text-amber-100/90 text-lg md:text-xl mb-8 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              onAnimationComplete={() => {
                if (phase === 'text2') {
                  setTimeout(() => setPhase('text3'), 2000);
                }
              }}
            >
              But now, I want to ask you something that could change our lives forever.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Phase: Text 3 – The big question */}
        <AnimatePresence>
          {(phase === 'text3' || phase === 'buttons') && (
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(255,215,0,0.3)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              onAnimationComplete={() => {
                if (phase === 'text3') {
                  setTimeout(() => setPhase('buttons'), 500);
                }
              }}
            >
              Maria, will you marry me? ❤️💍
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(phase === 'text3' || phase === 'buttons') && (
            <motion.p
              className="text-amber-200/80 text-base md:text-lg mb-10 max-w-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              You are the person I want beside me, today, tomorrow, and for all the days that follow.
            </motion.p>
          )}
        </AnimatePresence>

        {/* ═══ BUTTONS ═══ */}
        <AnimatePresence>
          {phase === 'buttons' && (
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              {/* YES button */}
              <motion.button
                className="relative px-12 py-5 rounded-full text-xl md:text-2xl font-bold text-white cursor-pointer border-none"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #FFD700, #DAA520)',
                  boxShadow: '0 0 30px rgba(201,168,76,0.4), 0 0 60px rgba(255,215,0,0.2)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201,168,76,0.6), 0 0 80px rgba(255,215,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(201,168,76,0.3), 0 0 40px rgba(255,215,0,0.15)',
                    '0 0 35px rgba(201,168,76,0.5), 0 0 70px rgba(255,215,0,0.25)',
                    '0 0 20px rgba(201,168,76,0.3), 0 0 40px rgba(255,215,0,0.15)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                onClick={handleYes}
              >
                YES, MY LOVE! 💍❤️
              </motion.button>

              {/* Think about it button */}
              <motion.button
                className="px-6 py-2 rounded-full text-sm text-amber-300/60 bg-transparent border border-amber-400/20 cursor-pointer hover:text-amber-300/80 hover:border-amber-400/40 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleThink}
              >
                Let me think about it...
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ THINKING RESPONSE ═══ */}
        <AnimatePresence>
          {phase === 'thinking' && (
            <motion.p
              className="text-amber-200/90 text-lg md:text-xl italic mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              I understand, my love. Take your time. I'll be here waiting. ❤️
            </motion.p>
          )}
        </AnimatePresence>

        {/* ═══ RING ANIMATION PHASE ═══ */}
        <AnimatePresence>
          {phase === 'ringAnimation' && (
            <motion.div
              className="relative flex items-end justify-center gap-0 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Feminine hand with heart ring */}
              <motion.div
                animate={showSecondRing ? { scale: 1.1 } : {}}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                <FeminineHandWithHeartRing showSecondRing={showSecondRing} />
              </motion.div>

              {/* Masculine hand approaching */}
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={showSecondRing
                  ? { x: -30, opacity: 1 }
                  : { x: 40, opacity: 1 }
                }
                transition={{ duration: 2, ease: 'easeInOut' }}
              >
                {!showSecondRing && <MasculineHandWithRing />}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ CELEBRATION PHASE ═══ */}
        <AnimatePresence>
          {phase === 'celebration' && (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Hands with both rings */}
              <motion.div
                className="relative mb-8"
                initial={{ scale: 1 }}
                animate={{ scale: 1.15 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              >
                <FeminineHandWithHeartRing showSecondRing={true} />

                {/* Dual ring sparkle effects */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 45%, rgba(255,215,0,0.15) 0%, transparent 50%)',
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Celebration burst */}
              <CelebrationBurst />
              <GoldenParticles />

              {/* Cinematic text */}
              <motion.h2
                className="text-2xl md:text-4xl font-bold text-center mb-4"
                style={{
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                Two rings. Two beautiful promises. One future together. ❤️
              </motion.h2>

              <motion.p
                className="text-amber-200/90 text-lg md:text-xl italic mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 2 }}
              >
                Maria, I choose you — today and always.
              </motion.p>

              {/* Continue button */}
              <motion.button
                className="px-10 py-4 rounded-full text-lg font-semibold text-white cursor-pointer border-none"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                  boxShadow: '0 0 25px rgba(201,168,76,0.4)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 4 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(201,168,76,0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToScene('MARIA_MESSAGE')}
              >
                Continue ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
