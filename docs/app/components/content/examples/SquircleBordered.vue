<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <MSquircle
      class="grid size-32 place-items-center border border-default bg-(--ui-bg-muted) text-sm font-semibold"
      :radius="48"
      :smoothing="0.6"
      as="section"
    >
      <span>as="section"</span>
    </MSquircle>
    <MSquircle
      class="grid size-32 place-items-center bg-(--ui-bg-muted) text-sm font-semibold"
      :radius="8"
      :smoothing="0.35"
      as="article"
    >
      <span>as="article"</span>
    </MSquircle>
  </div>
</template>
