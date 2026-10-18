<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-2xl">
    <MBorderBeam
      class="flex min-h-40 flex-col items-center justify-center gap-1 rounded-2xl bg-elevated/40 p-6"
      :beams="1"
      :size="88"
      :duration="5"
      color-from="#5eead4"
      color-to="#14b8a6"
    >
      <p class="text-3xl font-semibold text-highlighted">
        1
      </p>
      <p class="text-xs uppercase tracking-wide text-muted">
        beam
      </p>
    </MBorderBeam>

    <MBorderBeam
      class="flex min-h-40 flex-col items-center justify-center gap-1 rounded-2xl bg-elevated/40 p-6"
      :beams="2"
      :size="88"
      :duration="5"
      color-from="#93c5fd"
      color-to="#3b82f6"
    >
      <p class="text-3xl font-semibold text-highlighted">
        2
      </p>
      <p class="text-xs uppercase tracking-wide text-muted">
        beams
      </p>
    </MBorderBeam>

    <MBorderBeam
      class="flex min-h-40 flex-col items-center justify-center gap-1 rounded-2xl bg-elevated/40 p-6"
      :beams="3"
      :size="88"
      :duration="5"
      color-from="#d8b4fe"
      color-to="#a855f7"
    >
      <p class="text-3xl font-semibold text-highlighted">
        3
      </p>
      <p class="text-xs uppercase tracking-wide text-muted">
        beams
      </p>
    </MBorderBeam>
  </div>
</template>
