<template>
  <div class="flex w-full items-center justify-center">
    <MMagneticField class="flex flex-wrap justify-center gap-3 p-10">
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        data-magnetic
        class="rounded-full border border-default bg-default px-4 py-2 text-sm text-default shadow-sm"
      >
        {{ tag }}
      </button>
    </MMagneticField>
  </div>
</template>

<script setup lang="ts">
/**
 * Every chip gets its own spring, so sweeping the cursor across the row leaves a
 * wake instead of moving the group as one block.
 */
const tags = ['Nuxt', 'Vue', 'Motion', 'Tailwind', 'TypeScript']
</script>
