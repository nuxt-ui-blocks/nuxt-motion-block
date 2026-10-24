<template>
  <div class="flex w-full justify-center py-2">
    <MAuthForm
      v-model:mode="mode"
      :status="status"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

type Mode = 'sign-in' | 'sign-up'
type Status = 'idle' | 'submitting' | 'success' | 'error'

const mode = ref<Mode>('sign-in')
const status = ref<Status>('idle')

let timer: ReturnType<typeof setTimeout> | null = null

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function onSubmit() {
  clearTimer()
  status.value = 'submitting'

  timer = setTimeout(() => {
    status.value = 'success'
    timer = setTimeout(() => {
      status.value = 'idle'
    }, 2200)
  }, 900)
}

onBeforeUnmount(clearTimer)
</script>
