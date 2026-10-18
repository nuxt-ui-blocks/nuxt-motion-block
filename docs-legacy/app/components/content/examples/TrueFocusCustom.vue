<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Custom True Focus
    </h3>
    <MTrueFocus
      sentence="Custom Focus Effect"
      :manual-mode="false"
      :blur-amount="8"
      border-color="blue"
      glow-color="rgba(0, 0, 255, 0.6)"
      :animation-duration="1.5"
      :pause-between-animations="2"
    />
  </div>
</template>
