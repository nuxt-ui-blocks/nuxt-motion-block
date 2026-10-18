<script setup lang="ts">
import { ref } from 'vue'

const MAX_PINNED = 4

const items = [
  { id: 'conv-nadia', title: 'Priya Nair', meta: '"Numbers are in — they look good."', icon: 'i-lucide-message-circle' },
  { id: 'team-launch', title: 'Launch Command Center', meta: '8 members · active now', icon: 'i-lucide-rocket' },
  { id: 'doc-roadmap', title: 'Plan draft', meta: 'Edited today by Lena', icon: 'i-lucide-file-text' },
  { id: 'pr-registry', title: 'feat: registry bundling', meta: '#482 · 2 approvals, 1 change requested', icon: 'i-lucide-git-pull-request' },
  { id: 'design-tokens', title: 'Style tokens · v4', meta: '3 new comments', icon: 'i-lucide-figma' },
  { id: 'conv-hiro', title: 'Kenji Sato', meta: '"Shipping the fix tonight."', icon: 'i-lucide-star' },
  { id: 'team-support', title: 'Support Desk', meta: '12 members · 4 unread', icon: 'i-lucide-users' },
  { id: 'chan-announcements', title: 'Announcements', meta: 'Posted 2h ago', icon: 'i-lucide-megaphone' },
]

const DEFAULT_PINNED = ['conv-nadia', 'team-launch', 'doc-roadmap']

const pinned = ref<string[]>([...DEFAULT_PINNED])

const handlePinnedChange = (ids: string[]) => {
  pinned.value = ids
}
</script>

<template>
  <div class="flex h-[26rem] w-full gap-4 overflow-hidden rounded-2xl border border-default bg-default p-4">
    <div class="flex min-h-0 min-w-0 flex-1 flex-col gap-2.5">
      <header class="flex shrink-0 items-baseline justify-between gap-3">
        <h3 class="font-semibold text-base text-highlighted tracking-tight">
          Inbox
        </h3>
        <span class="text-muted text-xs tabular-nums">
          {{ pinned.length }} / {{ MAX_PINNED }} pinned
        </span>
      </header>

      <div class="min-h-0 flex-1 overflow-y-auto pr-1">
        <MPinnedList
          :items="items"
          :pinned-ids="pinned"
          :max-pinned="MAX_PINNED"
          empty-pinned-message="Nothing pinned yet — pin a row to keep it at the top."
          label="Inbox rows"
          show-divider
          @update:pinned="handlePinnedChange"
        />
      </div>
    </div>

    <aside class="hidden w-52 shrink-0 flex-col gap-3 rounded-xl border border-default bg-default/70 p-3 sm:flex">
      <div>
        <p class="font-medium text-sm text-highlighted">
          Try it
        </p>
        <p class="mt-1 text-muted text-xs leading-relaxed">
          Click a row, or tab into the list and use the keys below. Pinning
          launches the row into the pinned group on an overshooting spring,
          the pin snaps 45°, and the rows underneath close the gap one after
          another.
        </p>
      </div>

      <ul class="flex flex-col gap-1.5 text-muted text-xs">
        <li class="flex items-center gap-1.5">
          <kbd class="rounded border border-default bg-elevated px-1.5 font-mono">↑</kbd>
          <kbd class="rounded border border-default bg-elevated px-1.5 font-mono">↓</kbd>
          Move between rows
        </li>
        <li class="flex items-center gap-1.5">
          <kbd class="rounded border border-default bg-elevated px-1.5 font-mono">P</kbd>
          Pin / unpin the focused row
        </li>
        <li class="flex items-center gap-1.5">
          <kbd class="rounded border border-default bg-elevated px-1.5 font-mono">Home</kbd>
          <kbd class="rounded border border-default bg-elevated px-1.5 font-mono">End</kbd>
          First / last
        </li>
      </ul>

      <div class="mt-auto flex flex-col gap-1.5">
        <UButton
          size="xs"
          variant="outline"
          @click="pinned = [...DEFAULT_PINNED]"
        >
          Reset
        </UButton>
        <UButton
          size="xs"
          variant="ghost"
          :disabled="pinned.length === 0"
          @click="pinned = []"
        >
          Unpin all
        </UButton>
      </div>
    </aside>
  </div>
</template>
