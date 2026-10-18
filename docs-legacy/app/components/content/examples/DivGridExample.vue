<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Div Grid
    </h3>
    <MDivGrid
      :rows="5"
      :cols="10"
      :cell-size="40"
      border-color="#4b5563"
      fill-color="rgba(59, 130, 246, 0.3)"
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
