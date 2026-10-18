<template>
  <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-48 w-full max-w-md mx-auto">
    <MGlowingEffect
      :glow="true"
      :disabled="false"
      variant="white"
      class="rounded-xl"
    />
    <div class="relative z-10 h-full flex flex-col justify-between">
      <h3 class="text-lg font-bold text-white">
        White Variant
      </h3>
      <p class="text-slate-400 text-sm">
        Monochrome glowing effect
      </p>
    </div>
  </div>
</template>
