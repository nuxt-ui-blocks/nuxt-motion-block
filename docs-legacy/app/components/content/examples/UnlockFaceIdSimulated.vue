<template>
  <div class="w-full max-w-md rounded-xl border border-default p-5">
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-highlighted">Secure vault</span>
        <span class="text-xs text-muted">{{ label }}</span>
      </div>

      <MUnlockFaceId
        :error-message="message"
        :status="status"
        size="96px"
        @scan="verify"
      >
        <div class="flex h-full w-full flex-col items-center justify-center gap-1">
          <span class="text-sm font-semibold text-highlighted">1,284 items</span>
          <span class="text-[10px] text-muted">Face ID required</span>
        </div>
      </MUnlockFaceId>
    </div>
  </div>
</template>

<script setup lang="ts">
// Controlled, because a real face-matching call decides the outcome. The
// component only *asks*: `@scan` fires on activation, and you hand it back a
// status. Swap `verify` for your own call.
const status = ref<'idle' | 'scanning' | 'success' | 'error'>('idle')
const message = ref('Face not recognized.')

let timer: ReturnType<typeof setTimeout> | undefined

function verify() {
  status.value = 'scanning'
  clearTimeout(timer)
  timer = setTimeout(() => {
    status.value = Math.random() < 0.5 ? 'success' : 'error'
  }, 1600)
}

const label = computed(() => status.value)

onBeforeUnmount(() => clearTimeout(timer))
</script>
