<template>
  <div class="flex w-full flex-col items-center gap-3">
    <MMorphSurface @submit="onSubmit" />

    <p class="h-4 text-xs text-muted">
      {{ last === '' ? 'Click the dock, then press ⌘↵ or Ctrl↵.' : `Sent: ${last}` }}
    </p>
  </div>
</template>

<script setup lang="ts">
const last = ref('')

function onSubmit(value: string) {
  last.value = value
}
</script>
