/**
 * TEMPORARY verification stub — delete after docs QA.
 *
 * `nuxt-og-image@5.1.12` fails to build in this workspace: it imports
 * `createHeadCore` from `@unhead/vue`, but the resolved copy is `@unhead/vue@3.4.2`,
 * which does not export it. That breaks Nitro for every route including `/`.
 *
 * The only thing the docs use from that module is
 * `defineOgImageComponent('Docs', …)` in `app/pages/[...slug].vue`, called inside
 * `if (import.meta.server)` with its return value discarded. A no-op is therefore
 * behaviourally equivalent for render QA.
 */
export function defineOgImageComponent(
  _component?: string,
  _props?: Record<string, unknown>,
): void {}
