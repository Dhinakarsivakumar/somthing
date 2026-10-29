import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseAudioOptions {
  /** URL or path to the audio file. */
  src: string
  /** Whether the audio should loop. */
  loop?: boolean
  /** Initial volume (0 to 1). */
  volume?: number
  /** Whether to attempt autoplay on mount. */
  autoPlay?: boolean
}

export interface UseAudioReturn {
  /** Whether the audio is currently playing. */
  isPlaying: boolean
  /** Whether the audio is loading. */
  isLoading: boolean
  /** Whether the audio failed to load. */
  hasError: boolean
  /** Current volume (0 to 1). */
  volume: number
  /** Current playback time in seconds. */
  currentTime: number
  /** Total duration in seconds. */
  duration: number
  /** Start playback. */
  play: () => Promise<void>
  /** Pause playback. */
  pause: () => void
  /** Toggle play/pause. */
  toggle: () => Promise<void>
  /** Set the volume (0 to 1). */
  setVolume: (vol: number) => void
  /** Seek to a specific time in seconds. */
  seek: (time: number) => void
  /** Reference to the underlying HTMLAudioElement. */
  audioRef: React.RefObject<HTMLAudioElement | null>
}

/**
 * Custom hook for managing audio playback.
 * Handles browser autoplay restrictions gracefully by catching
 * play() rejections and retrying on user interaction.
 */
export function useAudio({
  src,
  loop = false,
  volume: initialVolume = 0.5,
  autoPlay = false,
}: UseAudioOptions): UseAudioReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [volume, setVolumeState] = useState(initialVolume)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const pendingAutoPlay = useRef(autoPlay)

  // Create and configure the audio element
  useEffect(() => {
    if (!src) return

    const audio = new Audio(src)
    audio.loop = loop
    audio.volume = initialVolume
    audio.preload = 'auto'
    audioRef.current = audio

    const handleCanPlay = () => {
      setIsLoading(false)
      setHasError(false)

      // Attempt autoplay if requested
      if (pendingAutoPlay.current) {
        pendingAutoPlay.current = false
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          // Browser blocked autoplay — this is expected.
          // Audio will start on first user interaction via play()/toggle().
          setIsPlaying(false)
        })
      }
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
      setIsPlaying(false)
    }

    const handleEnded = () => {
      if (!loop) {
        setIsPlaying(false)
      }
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleDurationChange = () => {
      setDuration(audio.duration)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('canplaythrough', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [src, loop, initialVolume])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      await audio.play()
      setIsPlaying(true)
    } catch (err) {
      // Handle autoplay restriction: set up a one-time user-interaction listener
      console.warn('Audio play blocked by browser. Will retry on interaction.', err)
      const retryPlay = async () => {
        try {
          await audio.play()
          setIsPlaying(true)
        } catch {
          // Still blocked — give up silently
        }
        document.removeEventListener('click', retryPlay)
        document.removeEventListener('touchstart', retryPlay)
        document.removeEventListener('keydown', retryPlay)
      }
      document.addEventListener('click', retryPlay, { once: true })
      document.addEventListener('touchstart', retryPlay, { once: true })
      document.addEventListener('keydown', retryPlay, { once: true })
    }
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      await play()
    } else {
      pause()
    }
  }, [play, pause])

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol))
    setVolumeState(clamped)
    if (audioRef.current) {
      audioRef.current.volume = clamped
    }
  }, [])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(time, audioRef.current.duration || 0))
    }
  }, [])

  return {
    isPlaying,
    isLoading,
    hasError,
    volume,
    currentTime,
    duration,
    play,
    pause,
    toggle,
    setVolume,
    seek,
    audioRef,
  }
}
