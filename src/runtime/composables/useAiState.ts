import type { MotionValue } from 'motion-v'
import { motionValue } from 'motion-v'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { onBeforeUnmount, ref, shallowRef, toValue, watch } from 'vue'
import type { AiChatStatus } from '../types/ai'

/**
 * The six states an AI surface can be in.
 *
 * Deliberately the smallest set that can describe a real turn: waiting for
 * input, taking it in, working, writing, finished, or broken.
 */
export type AIState = 'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'

/**
 * What each state *does*, independent of how any given component renders it.
 *
 * Deliberately not an overlay. Bolting one shared graphic onto every orb makes
 * four different materials look like the same widget wearing a costume.
 * Instead: a shader warps, a canvas ring loses harmonics, a character changes
 * expression. Same vocabulary, different flesh.
 */
export type AIStateMotif = 'breathe' | 'receive' | 'scan' | 'pulse' | 'ping' | 'fault'

export type AIStateAccent = 'success' | 'danger' | null

/**
 * The full per-state tuning surface.
 *
 * Twelve numbers is a lot to carry around, and it is still fewer than the
 * component-specific values it replaces. Anything a component wants to express
 * that is not listed here probably wants its own prop instead.
 */
export type AIStateMotion = {
  /** Semantic accent to paint with, or `null` to keep the surface's own colour. */
  accent: AIStateAccent
  /** How much light the state throws off its own silhouette. */
  glow: number
  /** Degrees of hue rotation applied to the surface. */
  hueRotate: number
  /** Overall brightness of the state's own animation. */
  intensity: number
  /** The behaviour the state is made of. */
  motif: AIStateMotif
  /** Seconds between pulses. Slow enough to read as a rhythm, not a strobe. */
  pulseSeconds: number
  /** 0 = the surface ignores the amplitude, 1 = the surface is driven by it. */
  reactivity: number
  /** Saturation multiplier. Below 1 desaturates rather than brightening. */
  saturation: number
  /** Resting size. Deviating far enough to move layout is a component's decision. */
  scale: number
  /** Multiplier on the state animation's natural tempo. */
  speed: number
  /** How much the surface tumbles. Stalled states twitch; flowing states turn. */
  tumble: number
  /** Surface detail. Low reads as a clean field, high reads as churn. */
  turbulence: number
}

/**
 * Each state owns a distinct motif, so the six are told apart by *what* moves
 * rather than by how fast — which is the only thing that survives a glance, a
 * small screen, or a slow connection.
 */
export const AI_STATE_MOTION: Record<AIState, AIStateMotion> = {
  done: {
    accent: 'success',
    glow: 0.7,
    hueRotate: 0,
    intensity: 0.4,
    motif: 'ping',
    pulseSeconds: 0.65,
    reactivity: 0,
    saturation: 1,
    // The arrival itself overshoots once; components settle back toward `idle`.
    scale: 1.1,
    speed: 0.8,
    tumble: 0.02,
    // The field settles almost flat — stillness is what reads as "finished".
    turbulence: 0.08,
  },
  error: {
    accent: 'danger',
    glow: 0.25,
    hueRotate: 0,
    intensity: 0.5,
    motif: 'fault',
    pulseSeconds: 0.9,
    reactivity: 0,
    // Desaturating reads as a state change; growing reads as an attention grab.
    saturation: 0.3,
    scale: 0.96,
    speed: 1,
    // Tumble stalls while turbulence stays mid: the surface twitches in place
    // instead of flowing, which is what "not working" looks like.
    tumble: 0,
    turbulence: 0.55,
  },
  idle: {
    accent: null,
    glow: 0.15,
    hueRotate: 0,
    intensity: 0.3,
    motif: 'breathe',
    // A resting surface still moves, slowly. Fully static reads as broken.
    pulseSeconds: 4.5,
    // Nothing should flail at the microphone while it is meant to be resting.
    reactivity: 0,
    saturation: 0.75,
    scale: 0.94,
    speed: 0.6,
    tumble: 0.012,
    turbulence: 0.14,
  },
  listening: {
    accent: null,
    glow: 0.6,
    hueRotate: 0,
    intensity: 0.75,
    motif: 'receive',
    pulseSeconds: 1.6,
    // The one state that is genuinely driven by the input signal.
    reactivity: 1,
    saturation: 1.05,
    // Leans into the voice rather than shrinking away from it.
    scale: 1.06,
    speed: 1,
    tumble: 0.03,
    turbulence: 0.42,
  },
  streaming: {
    accent: null,
    glow: 0.45,
    // A slight cool drift, so output never looks like input.
    hueRotate: -10,
    intensity: 0.6,
    motif: 'pulse',
    pulseSeconds: 1.25,
    reactivity: 0.6,
    saturation: 1,
    scale: 1.02,
    speed: 1.4,
    tumble: 0.06,
    turbulence: 0.5,
  },
  thinking: {
    accent: null,
    glow: 0.35,
    hueRotate: 18,
    intensity: 1,
    motif: 'scan',
    pulseSeconds: 1.1,
    reactivity: 0.15,
    saturation: 1,
    // High churn, unchanged silhouette: the work is visible without the orb
    // growing and unsettling the layout around it.
    scale: 1,
    speed: 2.4,
    tumble: 0.14,
    turbulence: 0.95,
  },
}

/** Semantic accents. Deliberately not tokens — orbs render outside a theme. */
export const AI_ACCENT_COLORS: Record<'success' | 'danger', string> = {
  danger: 'oklch(63% 0.21 25)',
  success: 'oklch(72% 0.17 150)',
}

/**
 * The accent token, when the state carries one.
 *
 * A class-safe counterpart to `getAIStateAccentColor`, for the places that
 * theme through a class rather than an inline colour — most of them, since
 * components that forward unknown attributes to an inner element cannot take a
 * style binding for the box itself.
 */
export const getAIStateAccent = (state: AIState | undefined): AIStateAccent =>
  AI_STATE_MOTION[state ?? 'idle']?.accent ?? null

/**
 * The state needs a colour, and that colour is the caller's own unless the
 * state carries an accent of its own. Most states deliberately do not.
 */
export const getAIStateAccentColor = (state: AIState | undefined, fallback: string): string => {
  const accent = getAIStateAccent(state)
  return accent ? AI_ACCENT_COLORS[accent] : fallback
}

export const getAIStateMotion = (state: AIState | undefined): AIStateMotion =>
  AI_STATE_MOTION[state ?? 'idle'] ?? AI_STATE_MOTION.idle

/**
 * A state, expressed the way a submit button talks.
 *
 * `ChatPromptSubmit` only understands four of these, and it draws a very
 * different button for each — so the translation has to collapse a six-state
 * machine onto four answers. The two collapses are the interesting ones:
 * `listening` still accepts input, so it stays `ready`, and `done` has returned
 * to a resting surface, so it does too. Only `thinking` and `streaming` are
 * genuinely "a turn is in flight".
 */
const AI_STATE_CHAT_STATUS: Record<AIState, AiChatStatus> = {
  idle: 'ready',
  listening: 'ready',
  thinking: 'submitted',
  streaming: 'streaming',
  done: 'ready',
  error: 'error',
}

export const getAIChatStatus = (state: AIState | undefined): AiChatStatus =>
  AI_STATE_CHAT_STATUS[state ?? 'idle'] ?? 'ready'

/**
 * A live amplitude, 0–1.
 *
 * A `MotionValue` is the preferred form: it updates outside the render cycle,
 * so a 60fps audio signal never triggers a re-render.
 */
export type AIAmplitude = number | MotionValue<number> | undefined

const isMotionValue = (value: AIAmplitude): value is MotionValue<number> =>
  typeof value === 'object' && value !== null && 'get' in value

/**
 * Normalises any accepted amplitude form into a `MotionValue`.
 *
 * Vue adaptation: takes a getter rather than a plain value, because a prop read
 * once at setup would be frozen at mount and a later `state`/`amplitude` change
 * would be silently ignored. A plain number is still mirrored into the value on
 * every change.
 */
export const useAmplitudeValue = (amplitude: MaybeRefOrGetter<AIAmplitude>): MotionValue<number> => {
  const fallback = motionValue(0)

  watch(
    () => toValue(amplitude),
    (value) => {
      if (typeof value === 'number') {
        fallback.set(value)
      }
    },
    { immediate: true },
  )

  // A MotionValue is read straight through, so a 60fps signal never lands in a
  // watcher and never touches the render cycle.
  return isMotionValue(toValue(amplitude)) ? (toValue(amplitude) as MotionValue<number>) : fallback
}

export type AudioAmplitudeStatus = 'idle' | 'requesting' | 'active' | 'denied' | 'unsupported'

export type UseAudioAmplitudeOptions = {
  autoStart?: boolean
  smoothing?: number
  fftSize?: number
}

export type UseAudioAmplitudeResult = {
  amplitude: MotionValue<number>
  /**
   * Vue adaptation: a `Ref`, not a bare value. In React the hook returns state
   * and re-renders the consumer when it changes; here the ref *is* the change
   * signal, and reading `.value` inside a template is what tracks it.
   */
  status: Ref<AudioAmplitudeStatus>
  start: () => Promise<void>
  stop: () => void
}

const DEFAULT_SMOOTHING = 0.55
const DEFAULT_FFT_SIZE = 512
/** Loud normal speech is nowhere near 1.0 RMS, so raw RMS needs scaling. */
const RMS_TO_UNIT = 3.2
/** Attack is faster than release, so consonants stay crisp. */
const ATTACK_FACTOR = 0.35

/**
 * Live microphone amplitude.
 *
 * SSR-safe, permission-aware, and silent on failure — a denied prompt leaves
 * the amplitude at 0 so the consuming component simply falls back to its
 * ambient animation rather than showing an error the user cannot act on.
 *
 * Vue adaptation: the React `useAnimationFrame` hook has no Vue equivalent, so
 * the per-frame RMS read is a plain `requestAnimationFrame` loop scoped to the
 * component's lifetime.
 */
export const useAudioAmplitude = (
  options: MaybeRefOrGetter<UseAudioAmplitudeOptions> = {},
): UseAudioAmplitudeResult => {
  const amplitude = motionValue(0)
  const status = ref<AudioAmplitudeStatus>('idle')

  const streamRef = shallowRef<MediaStream | null>(null)
  const contextRef = shallowRef<AudioContext | null>(null)
  const analyserRef = shallowRef<AnalyserNode | null>(null)
  const bufferRef = shallowRef<Float32Array<ArrayBuffer> | null>(null)

  const smoothing = () => toValue(options)?.smoothing ?? DEFAULT_SMOOTHING
  const fftSize = () => toValue(options)?.fftSize ?? DEFAULT_FFT_SIZE

  const stop = () => {
    streamRef.value?.getTracks().forEach(track => track.stop())
    streamRef.value = null
    contextRef.value?.close().catch(() => {})
    contextRef.value = null
    analyserRef.value = null
    bufferRef.value = null
    amplitude.set(0)
    status.value = 'idle'
  }

  const start = async () => {
    if (analyserRef.value) return

    if (typeof window === 'undefined') {
      status.value = 'unsupported'
      return
    }

    const AudioContextCtor
      = window.AudioContext
        ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

    if (!AudioContextCtor || !navigator.mediaDevices?.getUserMedia) {
      status.value = 'unsupported'
      return
    }

    status.value = 'requesting'

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const context = new AudioContextCtor()
      const analyser = context.createAnalyser()
      analyser.fftSize = fftSize()
      context.createMediaStreamSource(stream).connect(analyser)

      streamRef.value = stream
      contextRef.value = context
      analyserRef.value = analyser
      bufferRef.value = new Float32Array(analyser.fftSize)
      status.value = 'active'
    }
    catch {
      status.value = 'denied'
    }
  }

  let handle = 0

  if (typeof window !== 'undefined') {
    const tick = () => {
      const analyser = analyserRef.value
      const buffer = bufferRef.value
      if (analyser && buffer) {
        analyser.getFloatTimeDomainData(buffer)

        let sum = 0
        for (let index = 0; index < buffer.length; index += 1) {
          const sample = buffer[index] ?? 0
          sum += sample * sample
        }

        const rms = Math.sqrt(sum / buffer.length)
        const target = Math.min(1, rms * RMS_TO_UNIT)
        const previous = amplitude.get()
        const factor = target > previous ? smoothing() * ATTACK_FACTOR : smoothing()

        amplitude.set(previous + (target - previous) * (1 - factor))
      }
      handle = requestAnimationFrame(tick)
    }
    handle = requestAnimationFrame(tick)
    onBeforeUnmount(() => cancelAnimationFrame(handle))
  }

  if (toValue(options)?.autoStart) {
    void start()
  }

  onBeforeUnmount(stop)

  return { amplitude, start, status, stop }
}

/**
 * Amplitude generator for demos, docs and previews — no microphone involved.
 *
 * Vue adaptation: the state is a getter, so the energy follows the current
 * {@link AIState} even when it changes after mount.
 */
export const useSimulatedAmplitude = (state: MaybeRefOrGetter<AIState> = 'idle'): MotionValue<number> => {
  const amplitude = motionValue(0)

  if (typeof window !== 'undefined') {
    let handle = 0

    const tick = (time: number) => {
      const motion = getAIStateMotion(toValue(state))
      const t = time / 1000

      // Three detuned sines read as organic; a single sine reads as a metronome.
      const envelope
        = 0.5
          + 0.3 * Math.sin(t * 2.1 * motion.speed)
          + 0.14 * Math.sin(t * 5.3 * motion.speed + 1.7)
          + 0.06 * Math.sin(t * 11.7 * motion.speed + 0.4)

      amplitude.set(Math.min(1, Math.max(0, envelope * motion.intensity)))
      handle = requestAnimationFrame(tick)
    }
    handle = requestAnimationFrame(tick)
    onBeforeUnmount(() => cancelAnimationFrame(handle))
  }

  return amplitude
}
