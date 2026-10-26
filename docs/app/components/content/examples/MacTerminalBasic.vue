<template>
  <div class="flex w-full justify-center">
    <MMacTerminal
      class="w-full max-w-xl"
      title="nuxt-motion-block — zsh"
      :max-height="320"
      :lines="session"
    />
  </div>
</template>

<script setup lang="ts">
type Line = {
  id: string
  text: string
  type: 'command' | 'output' | 'error' | 'success' | 'comment'
  delay?: number
}

const session: Line[] = [
  { id: 'install', type: 'command', text: 'pnpm add nuxt-motion-block' },
  { id: 'install-done', type: 'success', text: '✓ Packages installed in 4.2s' },
  { id: 'dev', type: 'command', text: 'pnpm dev', delay: 350 },
  { id: 'dev-ready', type: 'output', text: 'Nuxt 4.5.2  ready in 640 ms' },
  { id: 'dev-local', type: 'comment', text: 'Local:    http://localhost:3000/' },
  { id: 'test', type: 'command', text: 'pnpm test', delay: 350 },
  { id: 'test-done', type: 'success', text: '✓ 42 tests passed in 1.8s' },
  { id: 'lint', type: 'command', text: 'pnpm lint', delay: 350 },
  { id: 'lint-warn', type: 'error', text: 'warning  Unexpected console statement  no-console' },
  { id: 'lint-done', type: 'comment', text: '1 problem (0 errors, 1 warning)' },
]
</script>
