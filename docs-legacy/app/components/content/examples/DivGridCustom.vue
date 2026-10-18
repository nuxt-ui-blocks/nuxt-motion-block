<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Custom Div Grid
    </h3>
    <MDivGrid
      :rows="8"
      :cols="12"
      :cell-size="25"
      border-color="#7e22ce"
      fill-color="rgba(192, 132, 252, 0.3)"
      :interactive="true"
      class="mx-auto"
      @cell-click="handleCellClick"
    />
  </div>
</template>

<script setup lang="ts">
const handleCellClick = (row: number, col: number) => {
  console.log(`Custom grid cell clicked: row ${row}, col ${col}`)
}
</script>
