<template>
  <div class="p-4 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
      Div Grid
    </h3>
    <MDivGrid
      :rows="5"
      :cols="10"
      :cell-size="40"
      border-color="border"
      fill-color="primary"
      class="mx-auto"
      @cell-click="handleCellClick"
    />
  </div>
</template>

<script setup lang="ts">
const handleCellClick = (row: number, col: number) => {
  console.log(`Cell clicked: row ${row}, col ${col}`)
}
</script>
