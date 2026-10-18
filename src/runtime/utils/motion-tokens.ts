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

/**
 * Stiffness-based spring for values that track a continuously-changing input,
 * such as scroll progress.
 *
 * These are physical springs rather than duration springs, so they cannot
 * reuse `SPRING_DEFAULT`: a spring that has to follow a scroll position needs
 * to settle onto whatever the finger just left behind, and a fixed `duration`
 * would lag or overshoot by an amount that varies with scroll velocity.
 */
export const SPRING_SCROLL = Object.freeze({
  type: 'spring',
  stiffness: 200,
  damping: 30,
  mass: 0.5,
}) as unknown as Transition

/**
 * Stiffer, lighter spring for pointer tracking — lower mass so the layer
 * catches up to the cursor before it has moved on.
 */
export const SPRING_POINTER = Object.freeze({
  type: 'spring',
  stiffness: 150,
  damping: 20,
  mass: 0.3,
}) as unknown as Transition

/**
 * Snappy spring for discrete, stepped travel — a slider notch settling onto the
 * slot the pointer released it over. Stiffer and heavier than `SPRING_POINTER`
 * because the target is a fixed resting place, not a moving cursor.
 */
export const SPRING_SNAP = Object.freeze({
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.5,
}) as unknown as Transition

/**
 * Reduced-motion stand-in for `SPRING_SNAP`.
 *
 * Reduced motion is a request to remove *movement*, not to remove *feedback*:
 * swapping the spring out entirely would leave the notch stuck wherever the
 * pointer last dragged it, with no confirmation the value changed. A very short
 * duration spring still lands on the new value, it just stops travelling on the
 * way there.
 */
export const SPRING_REDUCED = Object.freeze({
  type: 'spring',
  duration: 0.08,
}) as unknown as Transition

/**
 * Tilt spring for a card that rotates toward the pointer.
 *
 * Heavier and better damped than `SPRING_POINTER` because the thing being moved
 * is the whole surface rather than a layer of it, and a card that keeps
 * oscillating after the cursor has stopped reads as broken rather than springy.
 */
export const SPRING_TILT = Object.freeze({
  type: 'spring',
  stiffness: 240,
  damping: 28,
  mass: 0.6,
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
