<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="option in options"
        :key="option.color"
        :label="option.label"
        :color="option.color"
        size="sm"
        variant="outline"
        @click="push(option)"
      />
    </div>

    <p class="text-xs text-muted">
      Toasts stack in the corner, spring in and fade out with motion-v, and dismiss
      themselves after 5s — hover the stack to pause the timers. The toaster is
      mounted once for the whole documentation app, so this example only pushes
      toasts.
    </p>
  </div>
</template>

<script setup lang="ts">
type ToastColor = 'success' | 'error' | 'info' | 'warning'

const options: { color: ToastColor, label: string, title: string, description: string }[] = [
  { color: 'success', label: 'Success', title: 'Deploy finished', description: 'Build 4821 is live.' },
  { color: 'error', label: 'Error', title: 'Upload failed', description: 'The file is larger than 25 MB.' },
  { color: 'info', label: 'Info', title: 'Three files staged', description: 'Ready to sync.' },
  { color: 'warning', label: 'Warning', title: 'Trial ending', description: 'Your trial ends in two days.' },
]

const toast = useToast()

function push(option: { color: ToastColor, title: string, description: string }) {
  toast.add({ title: option.title, description: option.description, color: option.color })
}
</script>
