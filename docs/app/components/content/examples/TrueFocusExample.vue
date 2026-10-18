<template>
  <div class="p-6 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
      True Focus
    </h3>
    <MTrueFocus
      sentence="True Focus"
      :manual-mode="false"
      :blur-amount="5"
      border-color="red"
      :animation-duration="2"
      :pause-between-animations="1"
    />
  </div>
</template>
