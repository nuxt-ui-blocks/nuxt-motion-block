<template>
  <MScrollProgress
    :spring-options="{ stiffness: 100, damping: 30 }"
    class="bg-gradient-to-r from-emerald-500 to-teal-600"
  />
  <div class="space-y-4 p-4">
    <div
      v-for="i in 10"
      :key="i"
      class="h-32 bg-primary rounded"
    />
  </div>
</template>
