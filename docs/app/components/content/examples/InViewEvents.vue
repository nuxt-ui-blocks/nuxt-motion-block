<template>
  <div class="mx-auto max-w-2xl space-y-4 p-6">
    <MInView
      :view-options="{ threshold: 0.4, margin: '0px 0px -80px 0px' }"
      @animation-start="onStart"
      @animation-complete="onComplete"
    >
      <div class="rounded-2xl border border-default p-6 text-center">
        <p class="text-sm text-muted">
          Status: <span class="font-medium text-highlighted">{{ status }}</span>
        </p>
      </div>
    </MInView>

    <div class="h-40" />
  </div>
</template>

<script setup lang="ts">
const status = ref('waiting')
const onStart = () => {
  status.value = 'animating'
}
const onComplete = () => {
  status.value = 'settled'
}
</script>
