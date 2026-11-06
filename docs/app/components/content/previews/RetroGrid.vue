<template>
  <div class="relative h-full w-full overflow-hidden">
    <MRetroGrid
      :angle="58"
      :cell-size="54"
      color="rgba(240,106,60,0.75)"
    />
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_45%,rgba(10,10,10,0.45)_100%)]"
    />
  </div>
</template>
