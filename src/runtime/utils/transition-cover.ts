/**
 * The leading cover shared by the shader-transition components.
 *
 * The React sources swap the wrapped children at the sweep's midpoint while the
 * shader is still mid-draw. Vue has no equivalent: a slot holds whatever the
 * parent last rendered, so holding the old content until midpoint is not
 * possible. These components therefore update the slot immediately and put an
 * opaque cover in front of it, clearing that cover over the opening stretch of
 * the sweep so the swap happens behind an opaque surface.
 *
 * Cover opacity is derived from *progress* rather than wall-clock time so the
 * cover always tracks the shader in front of it, whatever easing the sweep uses.
 */

/**
 * Fraction of the sweep over which the cover clears.
 *
 * Long enough that the swap is fully hidden, short enough that the effect still
 * reads as a reveal rather than as a fade from black.
 */
export const TRANSITION_COVER_CLEAR_PROGRESS = 0.22

/**
 * Opacity for the cover at a given eased sweep progress.
 *
 * Reached from `clamp01` and division rather than an early return so the curve
 * stays monotonic: a progress of 0 is fully opaque and 1 is fully clear.
 */
export function transitionCoverOpacity(progress: number, clearAt = TRANSITION_COVER_CLEAR_PROGRESS): number {
  if (clearAt <= 0) return 0
  return Math.max(0, Math.min(1, 1 - progress / clearAt))
}
