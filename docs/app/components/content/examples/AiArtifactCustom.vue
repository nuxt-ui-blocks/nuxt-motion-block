<template>
  <div class="w-full max-w-md">
    <MAiArtifact
      default-pane="code"
      title="theme.json"
      :copy-text="json"
    >
      <template #preview>
        <ul class="space-y-2 p-1">
          <li
            v-for="token in tokens"
            :key="token.name"
            class="flex items-center gap-2 text-xs"
          >
            <span
              class="size-4 rounded-full border border-default"
              :style="{ background: token.value }"
            />
            <span class="text-highlighted">{{ token.name }}</span>
            <span class="ml-auto font-mono text-muted">{{ token.value }}</span>
          </li>
        </ul>
      </template>

      <template #code>
        {{ json }}
      </template>
    </MAiArtifact>
  </div>
</template>

<script setup lang="ts">
const tokens = [
  { name: 'primary', value: 'oklch(0.62 0.19 259)' },
  { name: 'success', value: 'oklch(0.72 0.17 152)' },
  { name: 'warning', value: 'oklch(0.8 0.16 84)' },
  { name: 'error', value: 'oklch(0.64 0.21 25)' },
]

const json = JSON.stringify(
  Object.fromEntries(tokens.map(token => [token.name, token.value])),
  null,
  2,
)
</script>
