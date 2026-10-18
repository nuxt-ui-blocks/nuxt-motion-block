export interface PlaygroundPropSnapshot {
  name: string
  value: unknown
}

export interface PlaygroundSnapshot {
  tag: string
  props: PlaygroundPropSnapshot[]
  slot: string
}

/**
 * Shared, SSR-safe registry of live playground state keyed by component name.
 * `ComponentPlayground` writes each snapshot; `PlaygroundCode` reads it to
 * render the live, copyable usage snippet below the customizer.
 */
export function usePlaygroundState() {
  return useState<Record<string, PlaygroundSnapshot>>('playground-state', () => ({}))
}
