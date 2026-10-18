<template>
  <div class="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div class="relative rounded-2xl border border-default bg-accented/40 p-5">
      <MGlowingEffect
        :glow="true"
        :disabled="false"
        :border-width="2"
        :spread="80"
        :proximity="56"
        :inactive-zone="0.05"
        class="rounded-2xl"
      />
      <div class="relative z-10 flex flex-col gap-2">
        <span class="text-sm font-medium text-muted">Default</span>
        <h4 class="text-base font-semibold text-highlighted">
          Multi-colour trail
        </h4>
        <p class="text-sm text-muted">
          Conic + radial stops follow the cursor with a tight, lively sweep.
        </p>
      </div>
    </div>
    <div class="relative rounded-2xl border border-default bg-accented/40 p-5">
      <MGlowingEffect
        :glow="true"
        :disabled="false"
        variant="white"
        :border-width="2"
        :spread="90"
        :proximity="64"
        :inactive-zone="0.08"
        class="rounded-2xl"
      />
      <div class="relative z-10 flex flex-col gap-2">
        <span class="text-sm font-medium text-muted">White</span>
        <h4 class="text-base font-semibold text-highlighted">
          Clean halo
        </h4>
        <p class="text-sm text-muted">
          Monochrome glow that reads crisply on dark surfaces.
        </p>
      </div>
    </div>
    <div class="relative rounded-2xl border border-default bg-accented/40 p-5">
      <MGlowingEffect
        :glow="true"
        :disabled="false"
        :blur="6"
        :border-width="2"
        :spread="120"
        :proximity="72"
        :inactive-zone="0.1"
        :movement-duration="1.2"
        class="rounded-2xl"
      />
      <div class="relative z-10 flex flex-col gap-2">
        <span class="text-sm font-medium text-muted">Soft blur</span>
        <h4 class="text-base font-semibold text-highlighted">
          Large aura
        </h4>
        <p class="text-sm text-muted">
          Wider spread, more blur and faster snap towards the pointer.
        </p>
      </div>
    </div>
    <div class="relative rounded-2xl border border-default bg-accented/40 p-5 sm:col-span-2 lg:col-span-3">
      <MGlowingEffect
        :glow="true"
        :disabled="false"
        :colors="['#60a5fa', '#a78bfa', '#34d399', '#fbbf24']"
        :border-width="2"
        :spread="70"
        :proximity="64"
        :inactive-zone="0.12"
        :movement-duration="1.6"
        class="rounded-2xl"
      />
      <div class="relative z-10 flex flex-col gap-2">
        <span class="text-sm font-medium text-muted">Custom palette</span>
        <h4 class="text-base font-semibold text-highlighted">
          Brand-matched glow
        </h4>
        <p class="text-sm text-muted">
          Pass any four CSS colours (or theme tokens) to recolour the conic trail.
        </p>
      </div>
    </div>
  </div>
</template>
