<template>
  <div class="flex flex-col items-center gap-4">
    <MShineText
      class="text-2xl font-semibold"
      text="Sweep every 4 seconds"
    />
    <MShineText
      class="text-2xl font-semibold"
      :duration="4"
      text="Sweep every 4 seconds, paused 2s"
    />
  </div>
</template>
