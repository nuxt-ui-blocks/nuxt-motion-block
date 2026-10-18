<template>
  <div class="flex w-full flex-col items-center gap-6 py-10">
    <MDock
      position="inline"
      variant="bottom"
      :magnification="72"
      :distance="140"
      :panel-height="64"
    >
      <MDockItem
        v-for="app in apps"
        :key="app.name"
        v-slot="{ width, isHovered, scale }"
        :aria-label="app.name"
        @click="lastOpened = app.name"
      >
        <MDockLabel :is-hovered="isHovered">
          {{ app.name }}
        </MDockLabel>
        <MDockIcon
          :width="width"
          :scale="scale"
          :name="app.icon"
          class="text-highlighted"
        />
      </MDockItem>
    </MDock>

    <p class="text-sm text-muted">
      {{ lastOpened ? `Opening ${lastOpened}\u2026` : 'Hover to magnify, click to launch.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const apps = [
  { name: 'Home', icon: 'i-lucide-home' },
  { name: 'Products', icon: 'i-lucide-package' },
  { name: 'Messages', icon: 'i-lucide-message-circle' },
  { name: 'Mail', icon: 'i-lucide-mail' },
  { name: 'Photos', icon: 'i-lucide-image' },
  { name: 'Music', icon: 'i-lucide-music' },
  { name: 'Settings', icon: 'i-lucide-settings' },
]

const lastOpened = ref<string | null>(null)
</script>
