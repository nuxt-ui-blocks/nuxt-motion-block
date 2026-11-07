import { computed, reactive } from 'vue'
import { useColorMode as useVueUseColorMode } from '@vueuse/core'

/**
 * Nuxt-compatible `useColorMode`, built on @vueuse/core. Returns a **reactive**
 * object whose properties are unwrapped in templates (Nuxt-color-mode's shape):
 *
 * - `value` — resolved mode: `'light'` | `'dark'` (never `'auto'`)
 * - `preference` — stored preference: `'light'` | `'dark'` | `'system'` (writable)
 * - `system` — the OS-level mode
 * - `store` — the stored preference value
 */
export function useColorMode() {
  const vueUse = useVueUseColorMode()
  const store = vueUse.store
  const state = reactive({
    value: computed<'light' | 'dark'>(() =>
      store.value === 'auto' ? vueUse.system.value : (store.value as 'light' | 'dark'),
    ),
    preference: computed({
      get(): 'light' | 'dark' | 'system' {
        return store.value === 'auto' ? 'system' : (store.value as 'light' | 'dark')
      },
      set(v: 'light' | 'dark' | 'system') {
        store.value = (v === 'system' ? 'auto' : v) as 'light' | 'dark' | 'auto'
      },
    }),
    system: vueUse.system,
    store,
  })
  return state
}
