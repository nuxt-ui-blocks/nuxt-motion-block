<template>
  <div class="flex flex-col items-center gap-4">
    <MBottomUpLetters
      class="text-2xl font-semibold"
      :stagger="0"
      text="No stagger"
    />
    <MBottomUpLetters
      class="text-2xl font-semibold"
      :stagger="88"
      text="Default stagger"
    />
    <MBottomUpLetters
      class="text-2xl font-semibold"
      :stagger="220"
      text="Slow cascade"
    />
  </div>
</template>
