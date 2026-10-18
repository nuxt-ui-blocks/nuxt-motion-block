<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
    <MBorderBeam
      class="rounded-2xl bg-elevated/40 p-5"
      :size="80"
      :duration="5"
      color-from="#fca5a5"
      color-to="#ef4444"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm font-semibold text-highlighted">
          Sunset
        </p>
        <div class="flex items-center gap-1.5">
          <span class="size-3 rounded-full bg-[#fca5a5]" />
          <span class="size-3 rounded-full bg-[#ef4444]" />
        </div>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="rounded-2xl bg-elevated/40 p-5"
      :size="80"
      :duration="5.5"
      color-from="#6ee7b7"
      color-to="#10b981"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm font-semibold text-highlighted">
          Emerald
        </p>
        <div class="flex items-center gap-1.5">
          <span class="size-3 rounded-full bg-[#6ee7b7]" />
          <span class="size-3 rounded-full bg-[#10b981]" />
        </div>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="rounded-2xl bg-elevated/40 p-5"
      :size="80"
      :duration="4.8"
      color-from="#67e8f9"
      color-to="#0ea5e9"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm font-semibold text-highlighted">
          Lagoon
        </p>
        <div class="flex items-center gap-1.5">
          <span class="size-3 rounded-full bg-[#67e8f9]" />
          <span class="size-3 rounded-full bg-[#0ea5e9]" />
        </div>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="rounded-2xl bg-elevated/40 p-5"
      :size="80"
      :duration="5.2"
      color-from="#f0abfc"
      color-to="#c026d3"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm font-semibold text-highlighted">
          Orchid
        </p>
        <div class="flex items-center gap-1.5">
          <span class="size-3 rounded-full bg-[#f0abfc]" />
          <span class="size-3 rounded-full bg-[#c026d3]" />
        </div>
      </div>
    </MBorderBeam>
  </div>
</template>
