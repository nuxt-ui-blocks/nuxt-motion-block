<template>
  <MBentoGrid
    :cols="2"
    class="auto-rows-[9rem]"
  >
    <MBentoCard
      name="Deploys"
      description="Every push, live in seconds."
      icon="i-lucide-rocket"
      :row-span="2"
    >
      <template #background>
        <div class="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-transparent" />
      </template>
    </MBentoCard>

    <MBentoCard
      name="Logs"
      description="Search across every service."
      icon="i-lucide-scroll-text"
    />

    <MBentoCard
      name="Backups"
      description="Nightly, verified, restorable."
      icon="i-lucide-archive"
    />
  </MBentoGrid>
</template>
