<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-2xl">
    <MBorderBeam
      class="flex min-h-28 items-center justify-center rounded-lg bg-elevated/40 p-6"
      :radius="8"
      :size="72"
      :duration="4"
      color-from="#7dd3fc"
      color-to="#0ea5e9"
    >
      <div class="text-center">
        <p class="text-sm font-semibold text-highlighted">
          radius 8
        </p>
        <p class="text-xs text-muted">
          Tight corners
        </p>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="flex min-h-28 items-center justify-center rounded-full bg-elevated/40 p-6"
      :radius="999"
      :size="96"
      :duration="4.5"
      color-from="#c4b5fd"
      color-to="#8b5cf6"
    >
      <div class="text-center">
        <p class="text-sm font-semibold text-highlighted">
          radius 999
        </p>
        <p class="text-xs text-muted">
          Pill ends
        </p>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="flex min-h-28 items-center justify-center p-6"
      radius="squircle"
      :size="96"
      :duration="6"
      color-from="#fda4af"
      color-to="#f43f5e"
    >
      <div class="text-center">
        <p class="text-sm font-semibold text-highlighted">
          squircle
        </p>
        <p class="text-xs text-muted">
          Cubic corners
        </p>
      </div>
    </MBorderBeam>
  </div>
</template>
