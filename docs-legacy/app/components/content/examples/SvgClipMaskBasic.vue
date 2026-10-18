<template>
  <div class="w-full max-w-md">
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="shape in shapes"
        :key="shape"
        class="h-48"
      >
        <MSvgClipMask
          :shape="shape"
          animate="morph"
          :duration="6"
          class="h-full w-full"
        >
          <img
            :src="`https://picsum.photos/seed/${shape}/400/400`"
            :alt="`${shape} masked photo`"
            class="h-full w-full object-cover"
          >
        </MSvgClipMask>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const shapes = ['blob', 'arch', 'diamond', 'wave'] as const
</script>
