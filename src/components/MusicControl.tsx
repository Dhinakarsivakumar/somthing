import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useProposal } from '../context/ProposalContext'

/**
 * Floating music control button (mute/unmute) in the top-right corner.
 * Features a glass-like background with subtle animation.
 */
export default function MusicControl() {
  const { musicEnabled, toggleMusic } = useProposal()

  return (
    <div className="music-control">
      <motion.button
        onClick={toggleMusic}
        className={`glass-button cursor-pointer ${musicEnabled ? 'is-playing' : ''}`}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: musicEnabled
            ? '#C9A84C'
            : 'rgba(201, 168, 76, 0.4)',
        }}
        initial={{ opacity: 0, scale: 0.5, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={musicEnabled ? 'Mute background music' : 'Play background music'}
        title={musicEnabled ? 'Mute music' : 'Play music'}
      >
        <motion.div
          initial={false}
          animate={{ rotate: musicEnabled ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {musicEnabled ? (
            <Volume2 size={20} strokeWidth={1.5} />
          ) : (
            <VolumeX size={20} strokeWidth={1.5} />
          )}
        </motion.div>
      </motion.button>
    </div>
  )
}
