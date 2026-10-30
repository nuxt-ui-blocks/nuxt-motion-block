<template>
  <div
    ref="container"
    class="relative flex h-64 w-full items-center justify-between rounded-xl border border-default bg-default px-10"
  >
    <div
      ref="from"
      class="z-10 flex size-12 items-center justify-center rounded-full border border-default bg-elevated"
    >
      <UIcon
        name="i-lucide-user"
        class="size-5 text-highlighted"
      />
    </div>

    <div
      ref="to"
      class="z-10 flex size-12 items-center justify-center rounded-full border border-default bg-elevated"
    >
      <UIcon
        name="i-lucide-database"
        class="size-5 text-highlighted"
      />
    </div>

    <MAnimatedBeam
      :container-ref="container"
      :from-ref="from"
      :to-ref="to"
      :curvature="-40"
    />
  </div>
</template>

<script setup lang="ts">
const container = ref<HTMLElement | null>(null)
const from = ref<HTMLElement | null>(null)
const to = ref<HTMLElement | null>(null)
</script>
