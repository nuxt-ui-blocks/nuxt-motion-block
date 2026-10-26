<template>
  <div class="flex flex-wrap items-end justify-center gap-10 py-8">
    <MBook
      title="The Shape of Motion"
      color="#e5a00d"
      :width="196"
    >
      <template #illustration>
        <div class="flex h-full items-end justify-end p-3">
          <UIcon
            name="i-lucide-orbit"
            class="size-9 text-black/35"
          />
        </div>
      </template>
      <template #logo>
        <span class="text-[9px] font-semibold tracking-[0.2em] text-muted uppercase">
          Vol. 02 · 2026
        </span>
      </template>
    </MBook>

    <MBook
      title="Interaction Design"
      variant="simple"
      color="#2f4a6d"
      text-color="#eef2f7"
      :width="168"
    >
      <template #logo>
        <span class="text-[9px] font-medium tracking-[0.2em] text-white/60 uppercase">
          Field notes
        </span>
      </template>
    </MBook>
  </div>
</template>
