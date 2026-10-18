<template>
  <div class="relative w-full max-w-xl rounded-2xl border border-default bg-gradient-to-br from-muted/40 to-accented/30 p-6 shadow-sm">
    <MGlowingEffect
      :glow="true"
      :disabled="false"
      :proximity="48"
      :inactive-zone="0.15"
      :spread="60"
      :blur="0"
      class="rounded-2xl"
    />
    <div class="relative z-10 flex flex-col gap-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-lg font-semibold text-highlighted">
            Interactive Glow
          </h3>
          <p class="text-sm text-muted">
            Moves smoothly toward your pointer and fades out when near the centre or outside the proximity ring.
          </p>
        </div>
        <UBadge
          color="primary"
          variant="soft"
        >
          Live
        </UBadge>
      </div>
      <div class="flex flex-wrap gap-2">
        <UButton
          color="primary"
          variant="soft"
          size="sm"
        >
          Call to Action
        </UButton>
        <UButton
          color="neutral"
          variant="ghost"
          size="sm"
        >
          Secondary
        </UButton>
      </div>
    </div>
  </div>
</template>
