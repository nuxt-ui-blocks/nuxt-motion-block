<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTextGlitch
      text="NEON"
      :colors="['#22d3ee', '#a855f7', '#f472b6']"
      intensity="high"
      :show-scan-lines="false"
      class="text-5xl font-black"
    />
    <p class="text-sm text-muted">
      Custom layer colours with the scan lines switched off.
    </p>
  </div>
</template>
