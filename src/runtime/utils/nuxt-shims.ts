// Framework-neutral source of truth for imports that were previously
// resolved through Nuxt's `#imports` alias. Same APIs, resolvable from
// any Vue 3 consumer (Nuxt, Vite, Laravel/AdonisJS Inertia).
//
// `useColorMode` wraps @vueuse/core's to match Nuxt-color-mode semantics:
// `value` is the resolved light/dark (computed), `preference` is the raw stored
// value (`light` | `dark` | `system`).
export { useColorMode } from './use-color-mode'
// `useToast` and `defineShortcuts` are public Nuxt UI composables; they
// resolve without Nuxt because they are plain runtime functions that
// depend on app-level providers the consumer sets up (`<UApp>`).
export { useToast, defineShortcuts } from '@nuxt/ui/composables'
