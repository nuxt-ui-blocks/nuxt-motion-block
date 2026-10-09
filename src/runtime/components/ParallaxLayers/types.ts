/** Axis, or both, along which layers separate. */
export type ParallaxDirection = 'vertical' | 'horizontal' | 'both'

/**
 * Layout data for a single layer. Content is not carried here — it is supplied
 * through the `layer` slot, so this prop stays plain serialisable data.
 */
export interface ParallaxLayerConfig {
  /** Unique key for this layer. */
  id: string
  /** Multiplier on the parallax offset. Deeper layers travel further. */
  depth: number
  /** CSS blur in px, for atmospheric separation. */
  blur?: number
  /** Final opacity. Defaults to 1. */
  opacity?: number
}
