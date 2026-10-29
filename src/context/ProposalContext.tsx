import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** All possible scenes in the proposal flow. */
export type ProposalScene =
  | 'INTRO'
  | 'HEART_RING_PROPOSAL'
  | 'HEART_RING_ACCEPTED'
  | 'MARRIAGE_PROPOSAL'
  | 'BOTH_RINGS_ACCEPTED'
  | 'MARIA_MESSAGE'
  | 'NECKLACE_REVEAL'
  | 'VOICE_MESSAGE'
  | 'FINAL_SCENE'

/** Ordered list of primary milestone scenes for progress tracking. */
export const SCENE_ORDER: readonly ProposalScene[] = [
  'INTRO',
  'HEART_RING_PROPOSAL',
  'MARRIAGE_PROPOSAL',
  'MARIA_MESSAGE',
  'NECKLACE_REVEAL',
  'VOICE_MESSAGE',
  'FINAL_SCENE',
] as const

/** Total number of primary scenes for progress bar. */
export const TOTAL_SCENES = SCENE_ORDER.length

export interface ProposalState {
  /** The current scene being displayed. */
  currentScene: ProposalScene
  /** Whether Maria accepted the heart ring. */
  heartRingAccepted: boolean
  /** Whether Maria accepted the marriage ring. */
  marriageRingAccepted: boolean
  /** Maria's personal message text. */
  mariaMessage: string
  /** Whether the necklace gift has been revealed. */
  necklaceRevealed: boolean
  /** Whether the voice message has been played. */
  voicePlayed: boolean
  /** Whether background music is enabled. */
  musicEnabled: boolean
  /** Total number of scenes. */
  totalScenes: number
  /** Index of the current scene (0-based). */
  currentSceneIndex: number
  /** Navigate to a specific scene. */
  goToScene: (scene: ProposalScene) => void
  /** Set Maria's personal message. */
  setMariaMessage: (message: string) => void
  /** Toggle background music on/off. */
  toggleMusic: () => void
  /** Mark or toggle heart ring acceptance. */
  setHeartRingAccepted: (val?: boolean) => void
  acceptHeartRing: () => void
  /** Mark or toggle marriage proposal acceptance. */
  setMarriageAccepted: (val?: boolean) => void
  acceptMarriageRing: () => void
  /** Mark the necklace as revealed. */
  revealNecklace: () => void
  /** Mark the voice message as played. */
  markVoicePlayed: () => void
  /** Reset entire proposal experience. */
  resetExperience: () => void
}

export const ProposalContext = createContext<ProposalState>({
  currentScene: 'INTRO',
  heartRingAccepted: false,
  marriageRingAccepted: false,
  mariaMessage: '',
  necklaceRevealed: false,
  voicePlayed: false,
  musicEnabled: false,
  totalScenes: TOTAL_SCENES,
  currentSceneIndex: 0,
  goToScene: () => {},
  setMariaMessage: () => {},
  toggleMusic: () => {},
  setHeartRingAccepted: () => {},
  acceptHeartRing: () => {},
  setMarriageAccepted: () => {},
  acceptMarriageRing: () => {},
  revealNecklace: () => {},
  markVoicePlayed: () => {},
  resetExperience: () => {},
})

interface ProposalProviderProps {
  children: ReactNode
}

export function ProposalProvider({ children }: ProposalProviderProps) {
  const [currentScene, setCurrentScene] = useState<ProposalScene>('INTRO')
  const [heartRingAccepted, setHeartRingAcceptedState] = useState(false)
  const [marriageRingAccepted, setMarriageRingAcceptedState] = useState(false)
  const [mariaMessage, setMariaMessageState] = useState('')
  const [necklaceRevealed, setNecklaceRevealed] = useState(false)
  const [voicePlayed, setVoicePlayed] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(false)

  const currentSceneIndex = useMemo(() => {
    const idx = SCENE_ORDER.indexOf(currentScene)
    return idx >= 0 ? idx : 0
  }, [currentScene])

  const goToScene = useCallback((scene: ProposalScene) => {
    setCurrentScene(scene)
  }, [])

  const setMariaMessage = useCallback((message: string) => {
    setMariaMessageState(message)
  }, [])

  const toggleMusic = useCallback(() => {
    setMusicEnabled((prev) => !prev)
  }, [])

  const setHeartRingAccepted = useCallback((val: boolean = true) => {
    setHeartRingAcceptedState(val)
  }, [])

  const acceptHeartRing = useCallback(() => {
    setHeartRingAcceptedState(true)
  }, [])

  const setMarriageAccepted = useCallback((val: boolean = true) => {
    setMarriageRingAcceptedState(val)
  }, [])

  const acceptMarriageRing = useCallback(() => {
    setMarriageRingAcceptedState(true)
  }, [])

  const revealNecklace = useCallback(() => {
    setNecklaceRevealed(true)
  }, [])

  const markVoicePlayed = useCallback(() => {
    setVoicePlayed(true)
  }, [])

  const resetExperience = useCallback(() => {
    setCurrentScene('INTRO')
    setHeartRingAcceptedState(false)
    setMarriageRingAcceptedState(false)
    setMariaMessageState('')
    setNecklaceRevealed(false)
    setVoicePlayed(false)
  }, [])

  const value = useMemo<ProposalState>(
    () => ({
      currentScene,
      heartRingAccepted,
      marriageRingAccepted,
      mariaMessage,
      necklaceRevealed,
      voicePlayed,
      musicEnabled,
      totalScenes: TOTAL_SCENES,
      currentSceneIndex,
      goToScene,
      setMariaMessage,
      toggleMusic,
      setHeartRingAccepted,
      acceptHeartRing,
      setMarriageAccepted,
      acceptMarriageRing,
      revealNecklace,
      markVoicePlayed,
      resetExperience,
    }),
    [
      currentScene,
      heartRingAccepted,
      marriageRingAccepted,
      mariaMessage,
      necklaceRevealed,
      voicePlayed,
      musicEnabled,
      currentSceneIndex,
      goToScene,
      setMariaMessage,
      toggleMusic,
      setHeartRingAccepted,
      acceptHeartRing,
      setMarriageAccepted,
      acceptMarriageRing,
      revealNecklace,
      markVoicePlayed,
      resetExperience,
    ],
  )

  return (
    <ProposalContext.Provider value={value}>
      {children}
    </ProposalContext.Provider>
  )
}

/**
 * Hook to access the proposal context.
 */
export function useProposal(): ProposalState {
  return useContext(ProposalContext)
}

export default ProposalContext
