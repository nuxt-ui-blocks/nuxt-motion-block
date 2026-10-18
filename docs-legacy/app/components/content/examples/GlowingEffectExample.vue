<template>
  <div class="min-h-screen bg-slate-900 p-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-48">
        <MGlowingEffect
          :blur="0"
          :border-width="3"
          :spread="80"
          :glow="true"
          :disabled="false"
          :proximity="64"
          :inactive-zone="0.01"
          class="rounded-xl"
        />
        <div class="relative z-10 h-full flex flex-col justify-between">
          <h3 class="text-lg font-bold text-white">
            Default Glow
          </h3>
          <p class="text-slate-400 text-sm">
            Multi-color gradient effect
          </p>
        </div>
      </div>
      <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-48">
        <MGlowingEffect
          :blur="0"
          :border-width="3"
          :spread="80"
          :glow="true"
          :disabled="false"
          :proximity="64"
          :inactive-zone="0.01"
          variant="white"
          class="rounded-xl"
        />
        <div class="relative z-10 h-full flex flex-col justify-between">
          <h3 class="text-lg font-bold text-white">
            White Glow
          </h3>
          <p class="text-slate-400 text-sm">
            Clean monochrome effect
          </p>
        </div>
      </div>
      <div class="relative rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 h-48">
        <MGlowingEffect
          :blur="8"
          :border-width="3"
          :spread="120"
          :glow="true"
          :disabled="false"
          :proximity="64"
          :inactive-zone="0.01"
          class="rounded-xl"
        />
        <div class="relative z-10 h-full flex flex-col justify-between">
          <h3 class="text-lg font-bold text-white">
            Wide Blur Glow
          </h3>
          <p class="text-slate-400 text-sm">
            Larger spread area with blur
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
