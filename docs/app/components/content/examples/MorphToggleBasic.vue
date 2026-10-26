<template>
  <div class="flex flex-col items-start gap-6 py-8">
    <div class="flex items-center gap-3">
      <MMorphToggle
        v-model="email"
        label="Email notifications"
      />
      <span class="text-sm text-muted">Email notifications</span>
    </div>

    <div class="flex items-center gap-3">
      <MMorphToggle
        v-model="morph"
        label="Weekly digest"
        variant="morph"
      />
      <span class="text-sm text-muted">Weekly digest (morph)</span>
    </div>

    <div class="flex items-center gap-3">
      <MMorphToggle
        v-model="dark"
        label="Dark mode"
        size="lg"
        variant="icon"
      >
        <template #icon-on>
          <UIcon
            class="size-3.5"
            name="i-lucide-moon"
          />
        </template>
        <template #icon-off>
          <UIcon
            class="size-3.5"
            name="i-lucide-sun"
          />
        </template>
      </MMorphToggle>
      <span class="text-sm text-muted">Dark mode (icon)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref(true)
const morph = ref(false)
const dark = ref(true)
</script>
