<template>
  <MAnimatedGroup
    :stagger-children="0.3"
    class="flex flex-wrap gap-4"
  >
    <div
      v-for="i in 8"
      :key="i"
      class="h-12 w-12 rounded-lg bg-secondary"
    />
  </MAnimatedGroup>
</template>
