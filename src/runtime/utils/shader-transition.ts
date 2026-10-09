import { clamp01, easeInOutCubic, easeOutQuart } from './webgl'

/**
 * The sweep driver shared by the shader-transition components.
 *
 * All three transition components run the same two-phase loop: progress eases up
 * over `duration`, then a short fade clears the overlay so it cannot leave a
 * half-drawn frame behind. What differs between them is only the easing curve
 * and how each interprets progress, so those are the only knobs exposed.
 *
 * Progress is reported *after* easing, so a caller deriving a cover fade from it
 * gets a fade that tracks the sweep rather than the clock.
 */
export interface ShaderTransitionPlayback {
  /** Stops the playback and releases its frame callback. */
  cancel: () => void
}

export interface ShaderTransitionOptions {
  /** Total sweep time, in milliseconds. Clamped up to `MIN_SWEEP_MS`. */
  duration: number
  /**
   * Curve applied to raw sweep progress before it reaches `setProgress`.
   *
   * Defaults to `easeOutQuart`, which is what most of the sources use. A source
   * with its own curve passes it here rather than growing a second driver: the
   * loop is the same, only the mapping from clock to progress differs.
   */
  ease?: (progress: number) => number
  /** Called once, after the closing fade has finished. */
  onRest: () => void
  /**
   * Curve applied to the closing fade.
   *
   * Defaults to `easeInOutCubic`, which is what the sdf-blob and shader-reveal
   * sources use. The prism source fades with a plain smoothstep, so it passes
   * its own curve here rather than the driver growing a second fade loop.
   */
  outroEase?: (progress: number) => number
  /** Overlay opacity, 0..1. */
  setAlpha: (alpha: number) => void
  /** Sweep progress, 0..1, already eased. */
  setProgress: (progress: number) => void
  /** Duration of the closing fade, in milliseconds. */
  outroMs: number
}

/**
 * Below this a sweep finishes inside a single frame and reads as a jump cut
 * rather than as motion. The floor matters most for `duration: 0`, which is the
 * reduced-motion path.
 */
export const MIN_SWEEP_MS = 80

/**
 * Default fade at the end of a sweep.
 *
 * The overlay has to end fully transparent, and a long fade would let the
 * visitor read the settled content through a half-drawn overlay. The fade covers
 * a swap that has already happened; it is not part of the effect.
 */
export const DEFAULT_OUTRO_MS = 90

/**
 * Runs a sweep from 0 to 1, then fades the overlay out.
 *
 * The driver owns nothing but time. It does not know what is being covered, so
 * the components stay free to derive whatever they need from `setProgress`.
 */
export function playShaderTransition({
  duration,
  ease,
  onRest,
  outroEase,
  outroMs,
  setAlpha,
  setProgress,
}: ShaderTransitionOptions): ShaderTransitionPlayback {
  const sweepMs = Math.max(MIN_SWEEP_MS, duration)
  const fadeMs = Math.max(1, outroMs)
  const startedAt = performance.now()
  const applyEase = ease ?? easeOutQuart
  const applyOutroEase = outroEase ?? easeInOutCubic

  let frame = 0
  let cancelled = false

  setAlpha(1)

  const finish = () => {
    const fadeStartedAt = performance.now()

    const fade = () => {
      if (cancelled) return

      const raw = clamp01((performance.now() - fadeStartedAt) / fadeMs)
      setAlpha(1 - applyOutroEase(raw))

      if (raw < 1) {
        frame = requestAnimationFrame(fade)
        return
      }

      setAlpha(0)
      setProgress(0)
      onRest()
    }

    frame = requestAnimationFrame(fade)
  }

  const advance = () => {
    if (cancelled) return

    const raw = clamp01((performance.now() - startedAt) / sweepMs)
    setProgress(applyEase(raw))

    if (raw < 1) {
      frame = requestAnimationFrame(advance)
      return
    }

    setProgress(1)
    finish()
  }

  frame = requestAnimationFrame(advance)

  return {
    cancel: () => {
      cancelled = true
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    },
  }
}
