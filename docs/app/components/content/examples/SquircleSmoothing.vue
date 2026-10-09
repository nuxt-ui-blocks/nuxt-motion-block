<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <MSquircle
      class="grid size-28 place-items-center bg-(--ui-bg-muted) text-sm font-semibold"
      :radius="40"
      :smoothing="0"
    >
      <span>smoothing 0</span>
    </MSquircle>
    <MSquircle
      class="grid size-28 place-items-center bg-(--ui-bg-muted) text-sm font-semibold"
      :radius="40"
      :smoothing="0.6"
    >
      <span>default</span>
    </MSquircle>
    <MSquircle
      class="grid size-28 place-items-center bg-(--ui-bg-muted) text-sm font-semibold"
      :radius="40"
      :smoothing="1"
    >
      <span>smoothing 1</span>
    </MSquircle>
  </div>
</template>
