<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-center gap-8">
      <div
        v-for="size in sizes"
        :key="size"
        class="flex flex-col items-center gap-2"
      >
        <MSiriOrb
          :size="size"
          state="speaking"
        />
        <span class="text-xs text-muted">{{ size }}</span>
      </div>
    </div>

    <p class="text-center text-xs text-muted">
      Blur, contrast, dot size, rim and mask radius all derive from
      <code>size</code> — there is no separate scale prop to keep in sync.
    </p>
  </div>
</template>

<script setup lang="ts">
const sizes = ['72px', '120px', '200px']
</script>
