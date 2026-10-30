<template>
  <div
    ref="container"
    class="relative flex h-72 w-full flex-col items-center justify-between rounded-xl border border-default bg-default py-8"
  >
    <div
      ref="from"
      class="z-10 flex size-12 items-center justify-center rounded-full border border-default bg-elevated"
    >
      <UIcon
        name="i-lucide-cloud"
        class="size-5 text-highlighted"
      />
    </div>

    <div
      ref="to"
      class="z-10 flex size-12 items-center justify-center rounded-full border border-default bg-elevated"
    >
      <UIcon
        name="i-lucide-server"
        class="size-5 text-highlighted"
      />
    </div>

    <MAnimatedBeam
      :container-ref="container"
      :from-ref="from"
      :to-ref="to"
      :curvature="70"
      :duration="3"
      reverse
    />
  </div>
</template>

<script setup lang="ts">
const container = ref<HTMLElement | null>(null)
const from = ref<HTMLElement | null>(null)
const to = ref<HTMLElement | null>(null)
</script>
