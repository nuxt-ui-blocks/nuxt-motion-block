<template>
  <div class="flex w-full flex-col items-center gap-4 py-2">
    <MDivGrid
      :key="clicks"
      :rows="8"
      :cols="12"
      :cell-size="20"
      :clicked-cell="clicked"
      border-color="border"
      fill-color="primary"
      class="overflow-hidden rounded-lg border border-default"
      @cell-click="onCellClick"
    />

    <p class="text-sm text-muted">
      <template v-if="clicked">
        Ripple from row <span class="font-medium text-highlighted">{{ clicked.row }}</span>, column <span class="font-medium text-highlighted">{{ clicked.col }}</span>
      </template>
      <template v-else>
        Click any cell to trigger the ripple.
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const clicked = ref<{ row: number, col: number } | null>(null)
const clicks = ref(0)

const onCellClick = (row: number, col: number) => {
  clicked.value = { row, col }
  clicks.value++
}
</script>
