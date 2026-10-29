import { motion, AnimatePresence } from 'framer-motion'
import { useState, useContext, useMemo } from 'react'
import { ProposalContext } from '../context/ProposalContext'
import FloatingElements from './FloatingElements'
import { Heart, Edit3, Send, ArrowRight, Sparkles } from 'lucide-react'

export default function MariaMessageScene() {
  const { mariaMessage, setMariaMessage, goToScene } = useContext(ProposalContext)
  const [inputText, setInputText] = useState(mariaMessage || '')
  const [isSubmitted, setIsSubmitted] = useState(Boolean(mariaMessage))
  const [validationError, setValidationError] = useState('')

  const handleSend = () => {
    const trimmed = inputText.trim()
    if (!trimmed) {
      setValidationError('Please write a little something from your heart, my love ❤️')
      return
    }
    setValidationError('')
    setMariaMessage(trimmed)
    setIsSubmitted(true)
  }

  const handleEdit = () => {
    setIsSubmitted(false)
  }

  const handleContinue = () => {
    goToScene('NECKLACE_REVEAL')
  }

  // Floating decorative hearts around card
  const decorativeHearts = useMemo(
    () => [
      { id: 1, top: '-15px', left: '10%', delay: 0 },
      { id: 2, top: '-20px', right: '15%', delay: 0.7 },
      { id: 3, bottom: '-15px', left: '15%', delay: 1.2 },
      { id: 4, bottom: '-18px', right: '10%', delay: 0.4 },
    ],
    []
  )

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-12 select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #3d141e 0%, #1e0910 60%, #0d0407 100%)',
      }}
    >
      {/* Background ambient floating elements */}
      <FloatingElements intensity={8} hearts petals particles />

      {/* Ambient background glow circles */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -z-0 opacity-25"
        style={{
          background: 'radial-gradient(circle, #C21E56 0%, transparent 70%)',
          filter: 'blur(70px)',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Intimate Story Header */}
        <motion.div
          className="text-center mb-8 px-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-[#C9A84C]/30"
            style={{
              background: 'rgba(201, 168, 76, 0.08)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-xs uppercase tracking-widest text-[#F4C2C2] font-medium">
              Chapter Four • Your Words
            </span>
            <Sparkles className="w-4 h-4 text-[#C9A84C]" />
          </motion.div>

          <motion.p
            className="text-lg md:text-xl font-['Cormorant_Garamond',serif] italic text-[#F4C2C2]/90 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            My love, now I want to hear something from your heart. ❤️
          </motion.p>

          <motion.h2
            className="font-['Playfair_Display',serif] text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #FFFFF0 0%, #F4C2C2 50%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            What would you like to say to me, Maria?
          </motion.h2>
        </motion.div>

        {/* Dynamic Card Area: Form vs Display Note */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* Input Form State */
            <motion.div
              key="input-form"
              className="w-full relative"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl border border-[#C9A84C]/40 shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(114, 47, 55, 0.45) 0%, rgba(30, 9, 16, 0.75) 100%)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                }}
              >
                {/* Textarea Input */}
                <div className="relative mb-6">
                  <textarea
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value)
                      if (validationError) setValidationError('')
                    }}
                    placeholder="Write whatever your heart wants to tell me... ❤️"
                    rows={5}
                    maxLength={1000}
                    className="w-full rounded-2xl p-4 sm:p-5 text-lg sm:text-xl text-[#FFFFF0] placeholder-[#F4C2C2]/45 font-['Dancing_Script',cursive] leading-relaxed resize-none focus:outline-none transition-all duration-300 border border-[#C9A84C]/30 focus:border-[#C9A84C] focus:ring-4 focus:ring-[#C9A84C]/20"
                    style={{
                      background: 'rgba(20, 6, 12, 0.65)',
                    }}
                  />
                  <div className="flex justify-between items-center mt-2 px-1 text-xs text-[#F4C2C2]/60">
                    <span>{validationError ? <span className="text-rose-400 font-sans">{validationError}</span> : 'Your words will stay close to my heart'}</span>
                    <span>{inputText.length}/1000</span>
                  </div>
                </div>

                {/* Send Button */}
                <motion.button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={`w-full py-4 px-6 rounded-full font-semibold text-base sm:text-lg tracking-wide flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer ${
                    inputText.trim()
                      ? 'text-[#2a0e16] shadow-lg cursor-pointer hover:brightness-110'
                      : 'text-white/40 cursor-not-allowed opacity-60'
                  }`}
                  style={{
                    background: inputText.trim()
                      ? 'linear-gradient(135deg, #C9A84C 0%, #E6CA65 50%, #C9A84C 100%)'
                      : 'rgba(201, 168, 76, 0.2)',
                    boxShadow: inputText.trim() ? '0 0 25px rgba(201, 168, 76, 0.45)' : 'none',
                  }}
                  whileHover={inputText.trim() ? { scale: 1.02 } : {}}
                  whileTap={inputText.trim() ? { scale: 0.98 } : {}}
                >
                  <Send className="w-5 h-5" />
                  <span>Send Your Love 💌</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* Handwritten Letter Display Note */
            <motion.div
              key="letter-display"
              className="w-full relative"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            >
              {/* Floating Decorative mini hearts around note */}
              {decorativeHearts.map((dh) => (
                <motion.div
                  key={dh.id}
                  className="absolute z-20 text-[#C21E56]"
                  style={{
                    top: dh.top,
                    left: dh.left,
                    right: dh.right,
                    bottom: dh.bottom,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.25, 1],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: dh.delay,
                    ease: 'easeInOut',
                  }}
                >
                  <Heart className="w-6 h-6 fill-current filter drop-shadow-[0_0_8px_rgba(194,30,86,0.8)]" />
                </motion.div>
              ))}

              {/* Parchment Love Letter Card */}
              <div
                className="relative rounded-3xl p-8 sm:p-10 border-2 border-[#C9A84C]/70 shadow-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #FFF9E6 0%, #FFF2CC 50%, #FDEBD0 100%)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(201, 168, 76, 0.4)',
                }}
              >
                {/* Decorative corner ribbons/stamps */}
                <div className="flex items-center justify-between border-b border-[#C9A84C]/40 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#C21E56] fill-[#C21E56]" />
                    <span className="font-['Playfair_Display',serif] text-sm sm:text-base font-semibold text-[#722F37] tracking-wider uppercase">
                      Maria's message to my heart ❤️
                    </span>
                  </div>
                  <span className="text-xs font-['Cormorant_Garamond',serif] italic text-[#722F37]/70">
                    Forever Cherished
                  </span>
                </div>

                {/* The Typed Message in Romantic Handwritten Script */}
                <div className="py-4 px-2 min-h-[140px] flex items-center justify-center">
                  <p className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl md:text-4xl text-[#722F37] text-center leading-relaxed whitespace-pre-wrap font-medium">
                    "{mariaMessage}"
                  </p>
                </div>

                {/* Bottom Signature Line */}
                <div className="mt-6 pt-4 border-t border-[#C9A84C]/30 flex justify-end items-center">
                  <p className="font-['Dancing_Script',cursive] text-xl text-[#C21E56]">
                    — Maria ❤️
                  </p>
                </div>
              </div>

              {/* Action Buttons: Edit or Proceed */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center items-center">
                <motion.button
                  onClick={handleEdit}
                  className="px-6 py-3 rounded-full text-[#F4C2C2] hover:text-[#FFFFF0] border border-[#C9A84C]/40 hover:border-[#C9A84C] flex items-center gap-2 text-sm tracking-wide transition-all duration-200 cursor-pointer"
                  style={{ background: 'rgba(114, 47, 55, 0.3)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit3 className="w-4 h-4 text-[#C9A84C]" />
                  <span>Edit Message ✏️</span>
                </motion.button>

                <motion.button
                  onClick={handleContinue}
                  className="px-8 py-3.5 rounded-full text-[#2a0e16] font-semibold text-base sm:text-lg flex items-center gap-3 transition-all duration-300 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C 0%, #F5D78E 50%, #C9A84C 100%)',
                    boxShadow: '0 0 25px rgba(201, 168, 76, 0.45)',
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(201, 168, 76, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Continue to Your Final Surprise 🎁</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
