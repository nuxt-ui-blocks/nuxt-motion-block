<template>
  <fieldset class="flex w-full max-w-md flex-col gap-4 rounded-xl border border-default p-5">
    <legend class="px-1 text-xs font-medium uppercase tracking-widest text-dimmed">
      Notifications
    </legend>

    <MCheckbox
      v-for="channel in channels"
      :key="channel.key"
      v-model="enabled[channel.key]"
      :label="channel.label"
      :draw-duration="channel.drawDuration"
    />

    <p class="border-t border-default pt-3 text-xs text-muted">
      {{ enabledCount }} of {{ channels.length }} channels enabled
    </p>
  </fieldset>
</template>

<script setup lang="ts">
const channels = [
  { key: 'product', label: 'Product updates', drawDuration: 0.3 },
  { key: 'security', label: 'Security alerts', drawDuration: 0.3 },
  { key: 'digest', label: 'Weekly digest', drawDuration: 0.7 },
]

const enabled = reactive<Record<string, boolean>>({
  product: true,
  security: true,
  digest: false,
})

const enabledCount = computed(() => Object.values(enabled).filter(Boolean).length)
</script>
