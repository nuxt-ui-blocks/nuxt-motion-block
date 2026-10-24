export type SocialIcon = 'x' | 'bluesky' | 'threads' | 'link'

export interface SocialPlatform {
  /** Host shown next to the handle, e.g. `x.com`. */
  domain: string
  /** Which glyph to draw. Unknown values fall back to a globe. */
  icon?: SocialIcon
  /** Accessible name and the label used by the indicator. */
  name: string
  /** Where the handle links to. */
  url: string
}

/**
 * The built-in list used when `<SocialSelector>` is rendered without a
 * `platforms` prop. Kept in a module so the prop default can reference it —
 * `withDefaults` may only use values declared outside the setup scope.
 */
export const DEFAULT_PLATFORMS: SocialPlatform[] = [
  { domain: 'x.com', icon: 'x', name: 'X', url: 'https://x.com/' },
  { domain: 'bsky.app', icon: 'bluesky', name: 'Bluesky', url: 'https://bsky.app/' },
  { domain: 'threads.net', icon: 'threads', name: 'Threads', url: 'https://threads.net/' },
]
