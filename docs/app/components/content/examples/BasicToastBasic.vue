<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="option in options"
        :key="option.type"
        :label="option.label"
        :color="option.color"
        size="sm"
        variant="outline"
        @click="show(option.type)"
      />
    </div>

    <p class="text-xs text-muted">
      Each toast lives for 3s, or until you close it.
    </p>

    <MBasicToast
      :message="message"
      :type="type"
      :is-visible="isVisible"
      @update:is-visible="isVisible = $event"
    />
  </div>
</template>

<script setup lang="ts">
type ToastKind = 'success' | 'error' | 'info' | 'warning'

const options: { type: ToastKind, label: string, color: string }[] = [
  { type: 'success', label: 'Success', color: 'success' },
  { type: 'error', label: 'Error', color: 'error' },
  { type: 'info', label: 'Info', color: 'info' },
  { type: 'warning', label: 'Warning', color: 'warning' },
]

const copy: Record<ToastKind, string> = {
  success: 'Deploy finished — build 4821 is live.',
  error: 'Upload failed: the file is larger than 25 MB.',
  info: 'Three files are staged and ready to sync.',
  warning: 'Your trial ends in two days.',
}

const type = ref<ToastKind>('info')
const message = ref(copy.info)
const isVisible = ref(true)

function show(next: ToastKind) {
  type.value = next
  message.value = copy[next]
  isVisible.value = false
  // Flipping the flag back to true in the same tick would be swallowed by the
  // watcher; letting the `false` settle first re-adds the toast with a fresh
  // timer.
  nextTick(() => {
    isVisible.value = true
  })
}
</script>
