import { defineConfig, type UserConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // `@vitejs/plugin-vue@6` resolves the Rolldown-powered Vite 8 types while `vitest@3` still
  // resolves the Rollup-powered Vite 7 types, so the two `Plugin` shapes disagree even though the
  // plugin itself is version-agnostic at runtime.
  plugins: [vue() as unknown as NonNullable<UserConfig['plugins']>[number]],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
})
