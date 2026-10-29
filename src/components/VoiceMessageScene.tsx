import { motion, AnimatePresence } from 'framer-motion';
import { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { ProposalContext } from '../context/ProposalContext';
import FloatingElements from './FloatingElements';
import {
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Waveform Visualizer                                                */
/* ------------------------------------------------------------------ */
function WaveformBars({ isPlaying }: { isPlaying: boolean }) {
  const barCount = 24;
  return (
    <div className="flex items-end gap-[3px] h-16 md:h-20 justify-center">
      {Array.from({ length: barCount }, (_, i) => {
        const baseHeight = 20 + Math.sin(i * 0.8) * 15 + Math.cos(i * 1.3) * 10;
        return (
          <motion.div
            key={i}
            className="w-1.5 md:w-2 rounded-full"
            style={{
              background:
                'linear-gradient(to top, #c9a84c, #f5d78e, #ffe08a)',
              boxShadow: '0 0 4px rgba(201,168,76,0.3)',
            }}
            animate={
              isPlaying
                ? {
                    height: [
                      baseHeight * 0.3,
                      baseHeight,
                      baseHeight * 0.5,
                      baseHeight * 0.9,
                      baseHeight * 0.3,
                    ],
                  }
                : { height: 4 }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.8 + (i % 5) * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.05,
                  }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating soft particles for background                             */
/* ------------------------------------------------------------------ */
function SoftParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-5" aria-hidden="true">
      {Array.from({ length: 20 }, (_, i) => {
        const size = 4 + (i % 5) * 3;
        const left = ((i * 47) % 100);
        const top = ((i * 31) % 100);
        const dur = 4 + (i % 4) * 2;
        const delay = (i % 7) * 0.8;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background:
                i % 2 === 0
                  ? 'rgba(255,200,180,0.3)'
                  : 'rgba(201,168,76,0.2)',
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}

/* ================================================================== */
/*  MAIN SCENE COMPONENT                                              */
/* ================================================================== */
export default function VoiceMessageScene() {
  const { goToScene } = useContext(ProposalContext);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [_audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showSyncText, setShowSyncText] = useState(false);
  const [progress, setProgress] = useState(0);

  /* Setup audio element */
  useEffect(() => {
    const audio = new Audio('/assets/proposal-voice.mp3');
    audio.preload = 'auto';
    audio.volume = volume;

    audio.addEventListener('canplaythrough', () => setAudioLoaded(true));
    audio.addEventListener('error', () => setAudioError(true));
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setHasPlayed(true);
      setShowContinue(true);
    });
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  /* Sync volume */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlay = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setShowSyncText(true);
    } catch {
      // Browser blocked autoplay — already handled by button interaction
      setAudioError(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const handleReplay = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setHasPlayed(false);
    setShowSyncText(true);
    setProgress(0);
    handlePlay();
  }, [handlePlay]);

  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-8"
      style={{
        background:
          'linear-gradient(135deg, #1a0a12 0%, #2d1520 40%, #3a1f30 70%, #1a0a12 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Warm ambient glow */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 60%)',
        }}
      />

      <SoftParticles />
      <FloatingElements heartCount={6} petalCount={4} starCount={20} />

      {/* ---- Main content ---- */}
      <motion.div
        className="flex flex-col items-center gap-8 w-full max-w-md"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title text */}
        <motion.p
          className="text-xl md:text-2xl text-center font-light leading-relaxed"
          style={{ color: '#f5d0d8' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          And now, one last thing from my heart to yours… ❤️
        </motion.p>

        {/* Audio Player Card */}
        <motion.div
          className="w-full rounded-2xl p-6 md:p-8 flex flex-col items-center gap-6"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(201,168,76,0.25)',
            boxShadow:
              '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Pulsing heart icon */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart
              className="w-12 h-12 md:w-14 md:h-14"
              fill="#e05272"
              color="#e05272"
            />
          </motion.div>

          {/* Waveform */}
          <WaveformBars isPlaying={isPlaying} />

          {/* Progress bar */}
          {(isPlaying || hasPlayed) && !audioError && (
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, #c9a84c, #f5d78e)',
                  width: `${progress * 100}%`,
                }}
              />
            </div>
          )}

          {/* Sync text */}
          <AnimatePresence>
            {showSyncText && isPlaying && (
              <motion.p
                className="text-lg md:text-xl italic text-center"
                style={{ color: '#f5d78e' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                I love you, Maria.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Error / Placeholder message */}
          {audioError && (
            <motion.p
              className="text-sm text-center px-4 py-2 rounded-lg"
              style={{
                color: '#e0b8c4',
                background: 'rgba(224,82,114,0.1)',
                border: '1px solid rgba(224,82,114,0.2)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Voice recording placeholder — add your recording to{' '}
              <code className="text-xs">public/assets/proposal-voice.mp3</code>
            </motion.p>
          )}

          {/* Controls */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {/* Main play/pause/replay button */}
            {!hasPlayed ? (
              <motion.button
                className="px-7 py-3.5 rounded-full text-base md:text-lg font-semibold cursor-pointer border-0 flex items-center gap-2"
                style={{
                  background:
                    'linear-gradient(135deg, #c9a84c 0%, #f5d78e 50%, #c9a84c 100%)',
                  color: '#2d1520',
                  boxShadow:
                    '0 0 25px rgba(201,168,76,0.4), 0 4px 16px rgba(0,0,0,0.3)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isPlaying ? handlePause : handlePlay}
                disabled={audioError}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" /> Listen to My Voice ❤️
                  </>
                )}
              </motion.button>
            ) : (
              <motion.button
                className="px-6 py-3 rounded-full text-base font-semibold cursor-pointer border-0 flex items-center gap-2"
                style={{
                  background:
                    'linear-gradient(135deg, #c9a84c 0%, #f5d78e 50%, #c9a84c 100%)',
                  color: '#2d1520',
                  boxShadow:
                    '0 0 20px rgba(201,168,76,0.3), 0 4px 12px rgba(0,0,0,0.3)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReplay}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <RotateCcw className="w-5 h-5" /> Replay ❤️
              </motion.button>
            )}

            {/* Volume controls */}
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-full cursor-pointer border-0 bg-white/10 hover:bg-white/20 transition-colors"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-[#f5d0d8]" />
                ) : (
                  <Volume2 className="w-5 h-5 text-[#f5d0d8]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-20 md:w-24 accent-[#c9a84c] cursor-pointer"
                aria-label="Volume"
              />
            </div>
          </div>
        </motion.div>

        {/* Continue button */}
        <AnimatePresence>
          {showContinue && (
            <motion.button
              className="px-8 py-3.5 rounded-full text-lg font-semibold cursor-pointer border-0"
              style={{
                background: 'linear-gradient(135deg, #e05272, #c94060)',
                color: '#fff',
                boxShadow:
                  '0 0 25px rgba(224,82,114,0.4), 0 4px 16px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.8 }}
              onClick={() => goToScene('FINAL_SCENE')}
            >
              Continue to Our Final Moment ❤️
            </motion.button>
          )}
        </AnimatePresence>

        {/* Skip option */}
        <motion.button
          className="text-sm cursor-pointer border-0 bg-transparent underline decoration-dotted underline-offset-4"
          style={{ color: 'rgba(240,208,216,0.5)' }}
          whileHover={{ color: 'rgba(240,208,216,0.8)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => {
            audioRef.current?.pause();
            goToScene('FINAL_SCENE');
          }}
        >
          <span className="flex items-center gap-1">
            <SkipForward className="w-3.5 h-3.5" /> Skip
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
