import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProposalProvider, useProposal } from './context/ProposalContext'
import IntroScene from './components/IntroScene'
import HeartRingScene from './components/HeartRingScene'
import MarriageProposalScene from './components/MarriageProposalScene'
import MariaMessageScene from './components/MariaMessageScene'
import NecklaceRevealScene from './components/NecklaceRevealScene'
import VoiceMessageScene from './components/VoiceMessageScene'
import FinalScene from './components/FinalScene'
import MusicControl from './components/MusicControl'
import ProgressIndicator from './components/ProgressIndicator'

/**
 * Global audio player component for romantic background music.
 * Responds to `musicEnabled` state in ProposalContext.
 * If local romantic-music.mp3 is provided, plays that; otherwise uses Web Audio API
 * to generate a gentle, dreamy romantic ambient chime/pad harmony!
 */
function BackgroundMusicManager() {
  const { musicEnabled } = useProposal()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const synthCtxRef = useRef<AudioContext | null>(null)
  const synthIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    // Attempt to load /assets/romantic-music.mp3
    const audio = new Audio('./assets/romantic-music.mp3')
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (musicEnabled) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If romantic-music.mp3 is not present or blocked, fallback to gentle dreamy ambient chord generator
          try {
            if (!synthCtxRef.current) {
              const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
              synthCtxRef.current = new AudioCtx()
            }
            const ctx = synthCtxRef.current
            if (ctx.state === 'suspended') {
              ctx.resume()
            }

            // Romantic chords: F major, C major, D minor, Bb major in gentle sine waves
            const chords = [
              [349.23, 440.00, 523.25], // F4, A4, C5
              [261.63, 329.63, 392.00], // C4, E4, G4
              [293.66, 349.23, 440.00], // D4, F4, A4
              [233.08, 293.66, 349.23], // Bb3, D4, F4
            ]
            let chordIdx = 0

            const playNextChord = () => {
              if (!musicEnabled || !synthCtxRef.current) return
              const c = chords[chordIdx % chords.length]
              chordIdx++

              c.forEach((freq) => {
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()
                osc.type = 'sine'
                osc.frequency.setValueAtTime(freq, ctx.currentTime)

                gain.gain.setValueAtTime(0, ctx.currentTime)
                gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5)
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5.5)

                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.start(ctx.currentTime)
                osc.stop(ctx.currentTime + 6)
              })
            }

            playNextChord()
            synthIntervalRef.current = window.setInterval(playNextChord, 5000)
          } catch {
            // Audio context not allowed or failed
          }
        })
      }
    } else {
      audio.pause()
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current)
        synthIntervalRef.current = null
      }
    }

    return () => {
      audio.pause()
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current)
        synthIntervalRef.current = null
      }
    }
  }, [musicEnabled])

  return null
}

function MainProposalContent() {
  const { currentScene } = useProposal()

  const renderScene = () => {
    switch (currentScene) {
      case 'INTRO':
        return <IntroScene key="intro" />
      case 'HEART_RING_PROPOSAL':
      case 'HEART_RING_ACCEPTED':
        return <HeartRingScene key="heart-ring" />
      case 'MARRIAGE_PROPOSAL':
      case 'BOTH_RINGS_ACCEPTED':
        return <MarriageProposalScene key="marriage-proposal" />
      case 'MARIA_MESSAGE':
        return <MariaMessageScene key="maria-message" />
      case 'NECKLACE_REVEAL':
        return <NecklaceRevealScene key="necklace-reveal" />
      case 'VOICE_MESSAGE':
        return <VoiceMessageScene key="voice-message" />
      case 'FINAL_SCENE':
        return <FinalScene key="final-scene" />
      default:
        return <IntroScene key="default-intro" />
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#120509] text-white overflow-x-hidden">
      {/* Top Floating Music Control */}
      <MusicControl />

      {/* Persistent Scene Switcher with Framer Motion transitions */}
      <main className="w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full min-h-screen"
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Progress Bar at bottom */}
      <ProgressIndicator />
    </div>
  )
}

export default function App() {
  return (
    <ProposalProvider>
      <BackgroundMusicManager />
      <MainProposalContent />
    </ProposalProvider>
  )
}
