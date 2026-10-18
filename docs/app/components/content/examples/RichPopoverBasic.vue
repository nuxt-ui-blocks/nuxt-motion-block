<template>
  <div class="flex w-full max-w-md flex-col items-start gap-4">
    <MRichPopover arrow>
      <UButton
        label="Release notes"
        icon="i-lucide-megaphone"
        trailing-icon="i-lucide-chevron-down"
      />
      <template #content>
        <div class="w-72 space-y-4 p-4">
          <div>
            <p class="text-sm font-semibold">
              v4.2.0
            </p>
            <p class="text-xs text-muted">
              Shipped two days ago
            </p>
          </div>

          <ul class="space-y-2 text-sm">
            <li
              v-for="entry in entries"
              :key="entry"
              class="flex gap-2"
            >
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-4 shrink-0 text-success"
              />
              <span>{{ entry }}</span>
            </li>
          </ul>

          <UButton
            label="Read the changelog"
            icon="i-lucide-arrow-up-right"
            size="sm"
            block
          />
        </div>
      </template>
    </MRichPopover>

    <p class="text-xs text-muted">
      Escape, an outside click, or the trigger itself dismisses it.
    </p>
  </div>
</template>

<script setup lang="ts">
const entries = [
  'Dock keeps magnification between sessions',
  'DockItem exposes an active prop',
  'The bezier spring now matches the reference curve',
]
</script>
