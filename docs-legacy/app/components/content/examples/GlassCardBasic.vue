<template>
  <div class="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-violet-500 to-sky-500 p-6">
    <div class="absolute -left-6 top-4 size-24 rounded-full bg-amber-300/80 blur-2xl" />
    <div class="absolute -right-4 bottom-2 size-28 rounded-full bg-teal-300/80 blur-2xl" />

    <MGlassCard class="rounded-3xl">
      <div class="space-y-4 text-white">
        <p class="text-xs font-medium uppercase tracking-widest text-white/70">
          Focus session
        </p>
        <h3 class="text-2xl font-semibold leading-tight">
          Deep work, uninterrupted
        </h3>
        <p class="text-sm text-white/80">
          Move the pointer across the panel — the highlight, the vertical sweep and
          the chromatic rim all follow it, then settle back on leave.
        </p>
        <UButton
          label="Start session"
          icon="i-lucide-play"
        />
      </div>
    </MGlassCard>
  </div>
</template>
