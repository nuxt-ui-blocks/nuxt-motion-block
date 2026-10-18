<template>
  <div class="flex w-full max-w-lg flex-col gap-5">
    <MBorderBeam
      class="rounded-2xl p-6"
      :beams="3"
      :duration="7"
      :size="90"
      color-from="#a5b4fc"
      color-to="#f0abfc"
    >
      <div class="flex flex-col gap-1">
        <p class="text-xs uppercase tracking-widest text-muted">
          Three beams, seven seconds
        </p>
        <p class="text-xl font-semibold">
          Phase-offset around the loop
        </p>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="rounded-2xl p-6"
      radius="squircle"
      :size="140"
      :duration="4"
      reverse
      pause-on-hover
      color-from="#fde68a"
      color-to="#fdba74"
    >
      <div class="flex flex-col gap-1">
        <p class="text-xs uppercase tracking-widest text-muted">
          Squircle corners, reversed, pauses on hover
        </p>
        <p class="text-xl font-semibold">
          Corners included
        </p>
      </div>
    </MBorderBeam>
  </div>
</template>
