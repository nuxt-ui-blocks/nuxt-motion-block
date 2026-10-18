<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gray-900">
    <MAnimatedSpotlight
      :gradient-first="'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(280, 100%, 85%, .1) 0, hsla(280, 100%, 55%, .05) 50%, hsla(280, 100%, 45%, 0) 80%)'"
      :gradient-second="'radial-gradient(50% 50% at 50% 50%, hsla(180, 100%, 85%, .08) 0, hsla(180, 100%, 55%, .03) 80%, transparent 100%)'"
      :gradient-third="'radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 85%, .06) 0, hsla(200, 100%, 45%, .03) 80%, transparent 100%)'"
      :duration="8"
      :translate-y="-300"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-white space-y-4">
      <h3 class="text-2xl font-bold">
        Custom Colors
      </h3>
      <p class="text-center max-w-md text-gray-300">
        Spotlight with custom gradient colors
      </p>
    </div>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
