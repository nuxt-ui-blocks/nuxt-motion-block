import type { Transition } from 'motion-v'

/**
 * Shared motion vocabulary.
 *
 * Upstream smoothui re-declares these two constants independently inside every
 * one of its 14 AI components (`ai-branch` even carries a comment recording that
 * it was refactored *to* these tokens). Centralising them here keeps every port
 * in this package on identical curves.
 *
 * They are frozen deliberately: a component that re-renders per frame or per
 * token must not hand Motion a fresh transition object each time, because a
 * changed transition identity restarts the animation.
 */
export const SPRING_DEFAULT = Object.freeze({
  type: 'spring',
  bounce: 0.1,
  duration: 0.25,
}) as unknown as Transition

/** A cubic-bezier control quadruple, matching Motion's `EasingDefinition`. */
export type CubicBezier = [number, number, number, number]

export const EASE_OUT = Object.freeze([0.23, 1, 0.32, 1]) as unknown as CubicBezier

export const EASE_IN_OUT = Object.freeze([0.645, 0.045, 0.355, 1]) as unknown as CubicBezier

/** `easeOutQuart` — the reveal ramp used by every WebGL transition engine. */
export const easeOutQuart = (t: number) => 1 - (1 - t) ** 4

/** `easeOutCubic` — used by the aperture engine, which lands faster than quart. */
export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

/** `easeInOutCubic` — the content-swap outro fade. */
export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2)
