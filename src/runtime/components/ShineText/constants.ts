export const DEFAULT_SHINE_DURATION = 2.5
export const DEFAULT_SHINE_REPEAT_DELAY = 0.6
export const DEFAULT_SHINE_BASE_COLOR = 'var(--ui-text-muted)'
export const DEFAULT_SHINE_COLOR = 'var(--ui-text)'

/**
 * The gradient is authored so the bright band sits in the middle 20% of the
 * sweep: `base 40% -> shine 50% -> base 60%`. Because `backgroundSize` is
 * 250%, the band is narrow relative to the box, which reads as a specular
 * highlight travelling across the letterforms rather than a colour wash.
 */
export const SHINE_GRADIENT_ANGLE = '110deg'
export const SHINE_BASE_STOP = '40%'
export const SHINE_PEAK_STOP = '50%'
export const SHINE_RETURN_STOP = '60%'
export const SHINE_BACKGROUND_SIZE = '250% 100%'

/**
 * `backgroundPositionX` travels from fully past the right edge to fully past
 * the left edge. 150% is safely outside the 250%-wide gradient on both ends, so
 * the highlight never appears to pop in or out.
 */
export const SHINE_START_POSITION = '150%'
export const SHINE_END_POSITION = '-150%'
