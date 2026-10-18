<template>
  <MGlassPanel
    background-image="https://picsum.photos/seed/neon-alley/1200/800"
    :ui="{ card: 'backdrop-blur-2xl bg-black/45 border border-white/20' }"
    class="w-full max-w-md rounded-3xl"
  >
    <div class="space-y-3 text-white">
      <p class="text-xs font-medium uppercase tracking-widest text-white/70">
        Custom surface
      </p>
      <h3 class="text-xl font-semibold">
        Tint the frost
      </h3>
      <p class="text-sm leading-relaxed text-white/80">
        The <code>ui</code> prop retargets the inner card, so blur, tint and border can
        be tuned per instance — darker here, so the text stays legible over a busy photo.
      </p>
      <UButton
        label="Read the theming guide"
        color="neutral"
        variant="solid"
      />
    </div>
  </MGlassPanel>
</template>
