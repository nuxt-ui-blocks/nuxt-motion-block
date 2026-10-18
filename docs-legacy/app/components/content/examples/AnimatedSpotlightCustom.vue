<template>
  <div class="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-900">
    <MAnimatedSpotlight
      :translate-y="-150"
      :width="600"
      :height="1200"
      :small-width="300"
      :duration="5"
      :x-offset="150"
      gradient-first="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(280, 100%, 85%, .08) 0, hsla(280, 100%, 55%, .02) 50%, hsla(280, 100%, 45%, 0) 80%)"
      gradient-second="radial-gradient(50% 50% at 50% 50%, hsla(280, 100%, 85%, .06) 0, hsla(280, 100%, 55%, .02) 80%, transparent 100%)"
      gradient-third="radial-gradient(50% 50% at 50% 50%, hsla(280, 100%, 85%, .04) 0, hsla(280, 100%, 45%, .02) 80%, transparent 100%)"
    />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-white">
        Custom Animated Spotlight
      </h3>
    </div>
  </div>
</template>
