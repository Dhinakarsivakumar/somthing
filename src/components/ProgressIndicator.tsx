import { motion } from 'framer-motion'
import { useProposal } from '../context/ProposalContext'

/**
 * A subtle, elegant progress indicator showing which scene Maria is on.
 * Displays small dots with champagne gold coloring and smooth transitions.
 */
export default function ProgressIndicator() {
  const { currentSceneIndex, totalScenes } = useProposal()

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
        className="flex items-center gap-2 rounded-full px-4 py-2"
        style={{
          background: 'rgba(114, 47, 55, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(201, 168, 76, 0.12)',
        }}
      >
        {Array.from({ length: totalScenes }, (_, i) => {
          const isActive = i === currentSceneIndex
          const isCompleted = i < currentSceneIndex

          return (
            <motion.div
              key={i}
              className="relative"
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.85,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Background dot */}
              <motion.div
                className="rounded-full"
                initial={false}
                animate={{
                  width: isActive ? 24 : 8,
                  height: 8,
                  backgroundColor: isActive
                    ? '#C9A84C'
                    : isCompleted
                      ? 'rgba(201, 168, 76, 0.5)'
                      : 'rgba(201, 168, 76, 0.15)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />

              {/* Active glow effect */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background: '#C9A84C',
                    filter: 'blur(4px)',
                  }}
                />
              )}
            </motion.div>
          )
        })}

        {/* Scene counter text */}
        <motion.span
          className="ml-2 text-xs font-medium tabular-nums"
          style={{
            color: 'rgba(201, 168, 76, 0.6)',
            fontFamily: 'var(--font-elegant)',
          }}
          initial={false}
          animate={{ opacity: 1 }}
          key={currentSceneIndex}
        >
          {currentSceneIndex + 1}/{totalScenes}
        </motion.span>
      </motion.div>
    </div>
  )
}
