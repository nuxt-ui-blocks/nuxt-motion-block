<template>
  <MScrollProgress class="bg-gradient-to-r from-purple-500 to-indigo-600" />
  <div class="space-y-4 p-4">
    <div
      v-for="i in 10"
      :key="i"
      class="h-32 bg-tertiary rounded"
    />
  </div>
</template>
