import { fileURLToPath } from 'node:url'
import { defineConfig, type UserConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

const stub = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// `#imports` / `#build/app.config` are Nuxt/Nitro virtual modules imported by `@nuxt/ui`'s
// `useComponentProps` and `utils/tv`. Node resolves `#` specifiers as package subpath imports,
// which bypasses Vite aliases, so intercept them in a `resolveId` hook that runs first instead.
const nuxtVirtualStubs = {
  name: 'nuxt-virtual-stubs',
  enforce: 'pre' as const,
  resolveId(source: string) {
    if (source === '#imports') return stub('./test/stubs/imports.ts')
    if (source === '#build/app.config') return stub('./test/stubs/app.config.ts')
    return null
  },
}

export default defineConfig({
  // `@vitejs/plugin-vue@6` resolves the Rolldown-powered Vite 8 types while `vitest@3` still
  // resolves the Rollup-powered Vite 7 types, so the two `Plugin` shapes disagree even though the
  // plugin itself is version-agnostic at runtime.
  plugins: [
    nuxtVirtualStubs as unknown as NonNullable<UserConfig['plugins']>[number],
    vue() as unknown as NonNullable<UserConfig['plugins']>[number],
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    server: {
      deps: {
        // `@nuxt/ui`'s runtime files import the Nuxt virtual modules handled above; inline them so
        // Vite (not Node) resolves those specifiers.
        inline: [/@nuxt\/ui/],
      },
    },
  },
})
