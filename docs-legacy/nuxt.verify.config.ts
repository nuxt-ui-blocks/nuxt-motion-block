// TEMPORARY verification config — delete after docs QA.
//
// Reuses the real `nuxt.config.ts` verbatim but drops `nuxt-og-image`, which
// cannot be built in this workspace (see `app/utils/og-image-verify-stub.ts`),
// and points its only used export at a no-op stub. Nothing else is changed, so
// what renders here is what renders in the real config.
import { defineNuxtConfig } from 'nuxt/config'
import base from './nuxt.config'

export default defineNuxtConfig({
  ...base,
  modules: (base.modules ?? []).filter(
    entry => typeof entry !== 'string' || !entry.startsWith('nuxt-og-image'),
  ),
  imports: {
    presets: [
      {
        from: '~/utils/og-image-verify-stub',
        imports: ['defineOgImageComponent'],
      },
    ],
  },
})
