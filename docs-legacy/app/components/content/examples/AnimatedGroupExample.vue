<template>
  <MAnimatedGroup class="grid grid-cols-3 gap-4 flex-wrap">
    <div
      v-for="i in 6"
      :key="i"
      class="h-20 w-20 rounded-lg bg-primary"
    />
  </MAnimatedGroup>
</template>
