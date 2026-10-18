<template>
  <div class="flex w-full max-w-lg flex-col items-center gap-6">
    <div class="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
      <MAnimatedTooltip
        v-for="side in sides"
        :key="side"
        :text="`Opens on the ${side}`"
        :content="{ side, sideOffset: 8, collisionPadding: 8 }"
        :delay-duration="150"
        arrow
      >
        <UButton
          :label="side"
          color="neutral"
          variant="outline"
          class="w-full justify-center capitalize"
        />
      </MAnimatedTooltip>
    </div>

    <p class="text-xs text-dimmed">
      The entrance is offset from the side it opens on, so the bubble always scales in from the edge it appears beside.
    </p>
  </div>
</template>

<script setup lang="ts">
const sides = ['top', 'right', 'bottom', 'left'] as const
</script>
