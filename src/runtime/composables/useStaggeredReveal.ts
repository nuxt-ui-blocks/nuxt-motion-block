import { useInView, useReducedMotion } from 'motion-v'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

export interface UseStaggeredRevealOptions<S, T> {
  /** Reactively reads the component's `triggerOnView` prop. */
  triggerOnView: () => boolean
  /**
   * The hidden (start) visual state. Must be a module-level constant: motion-v
   * compares `initial` against `animate` by reference to decide whether there
   * is anything to animate, so a fresh literal per render would make it think
   * every element re-animates on each update.
   */
  hiddenState: S
  /** The shown (end) visual state. Same identity requirements as above. */
  shownState: T
  /**
   * Skip the scroll wait under reduced motion. Defaults to `true`: with a
   * zero-length transition the resolved state commits immediately, so there is
   * nothing left to defer, and waiting would keep text invisible until a scroll
   * a preference-driven user may never perform. `FocusBlurResolve` opts out —
   * it intentionally keeps its single element hidden until seen.
   */
  skipWaitOnReducedMotion?: boolean
}

export interface UseStaggeredRevealResult<S, T> {
  /** Root element observed for the scroll-into-view trigger. */
  containerRef: Ref<HTMLElement | null>
  waitingForView: ComputedRef<boolean>
  /**
   * Always the hidden state, on the server and the client alike. Deriving it
   * from the motion preference would strand hidden styles: the server cannot
   * know the preference, and `initial` is only read when the visual element is
   * created, so a client that changed its mind could never clear the SSR
   * attributes. Suppressing the *transition* instead keeps one identical
   * server/client tree.
   */
  initialState: S
  /**
   * Stays on the hidden state until the wait clears, then flips to the shown
   * state. Referencing the same object as `initial` while waiting is
   * intentional: motion-v skips the animation entirely when the two match,
   * which is exactly the waiting case.
   */
  animateState: ComputedRef<S | T>
  /**
   * True while transitions should collapse to a zero-length commit. Zero
   * duration rather than no animation at all: motion-v treats "nothing to
   * animate" as "write nothing" and would leave the hidden styles stranded; a
   * zero-length transition still commits the resolved values within one frame.
   */
  transitionCollapsed: ComputedRef<boolean>
}

/**
 * Shared plumbing for the staggered-reveal family (SoftBlurIn, BlurOutUp,
 * MaskRevealUp, StaggerFromCenter, and the rest). Centralises the pieces every
 * member duplicates verbatim: the `useInView` observation, the scroll-wait
 * gate, the always-hidden `initial` state and the hidden-until-seen `animate`
 * target. The caller keeps whatever makes it distinct — the split (characters,
 * words, lines), the hidden/shown state values and the per-element transition.
 *
 * Observing is unconditional rather than gated on `triggerOnView`: a hook has
 * to run every render, and the observer is idle until something scrolls, so
 * gating it would add a branch for no gain.
 */
export function useStaggeredReveal<S, T>(
  options: UseStaggeredRevealOptions<S, T>,
): UseStaggeredRevealResult<S, T> {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = ref<HTMLElement | null>(null)
  const inView = useInView(containerRef, { once: true })

  const waitingForView = computed(() => {
    const reducedMotionSkipsWait = options.skipWaitOnReducedMotion === false

    if (!reducedMotionSkipsWait && shouldReduceMotion.value) {
      return false
    }

    return options.triggerOnView() && !inView.value
  })

  const initialState = options.hiddenState

  const animateState = computed<S | T>(() =>
    waitingForView.value ? options.hiddenState : options.shownState,
  )

  const transitionCollapsed = computed(
    () => shouldReduceMotion.value || waitingForView.value,
  )

  return { containerRef, waitingForView, initialState, animateState, transitionCollapsed }
}
