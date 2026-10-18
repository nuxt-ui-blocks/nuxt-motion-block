<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTrueFocus
      sentence="Ship code that lasts"
      manual-mode
      :blur-amount="4"
      border-color="amber"
      glow-color="rgba(245, 158, 11, 0.8)"
      :animation-duration="0.35"
      :pause-between-animations="1.5"
      class="text-2xl"
    />
    <p class="max-w-sm text-center text-sm text-muted">
      Manual mode: the focus follows the word you hover. The corner brackets
      carry a drop shadow tinted by the border colour, so an amber frame gets an
      amber halo — and `glowColor` resolves through the same theme colour
      resolver, ready for slots that want it.
    </p>
  </div>
</template>
