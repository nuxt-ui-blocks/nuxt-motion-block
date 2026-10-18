<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MSdfBlobTransition
      :transition-key="transitionKey"
      :variant="variant"
      class="h-44 rounded-2xl"
    >
      <div class="grid h-full place-items-center bg-gradient-to-br from-rose-500 to-pink-950 text-center text-white">
        <div class="space-y-1 px-6">
          <p class="text-xs uppercase tracking-widest text-white/60">
            {{ variant }}
          </p>
          <p class="text-2xl font-semibold">
            Signed distance blobs
          </p>
        </div>
      </div>
    </MSdfBlobTransition>

    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="name in variants"
        :key="name"
        size="sm"
        :label="name"
        color="neutral"
        :variant="variant === name ? 'solid' : 'outline'"
        @click="select(name)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const variants = ['circle', 'final', 'merge', 'radial', 'warped'] as const

type Variant = typeof variants[number]

const variant = ref<Variant>('final')
const transitionKey = ref(0)

function select(name: Variant) {
  variant.value = name
  transitionKey.value++
}
</script>
