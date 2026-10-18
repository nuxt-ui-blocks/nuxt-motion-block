<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <div class="rounded-2xl border border-default p-4">
      <p class="mb-1 text-xs font-medium text-muted">
        direction="forward" — trigger="loop"
      </p>
      <div class="flex justify-center">
        <MFlowingStroke
          :width="420"
          :height="120"
          color="primary"
          direction="forward"
          trigger="loop"
          :ribbon="12"
          :speed="2"
        />
      </div>
    </div>

    <div class="rounded-2xl border border-default p-4">
      <p class="mb-1 text-xs font-medium text-muted">
        direction="reverse" — the dashes travel the other way
      </p>
      <div class="flex justify-center">
        <MFlowingStroke
          :width="420"
          :height="120"
          color="secondary"
          direction="reverse"
          trigger="loop"
          :ribbon="12"
          :speed="2"
        />
      </div>
    </div>

    <div class="rounded-2xl border border-default p-4">
      <p class="mb-1 text-xs font-medium text-muted">
        glow — hover to start, a soft drop-shadow in the flow colour
      </p>
      <div class="flex justify-center">
        <MFlowingStroke
          :width="420"
          :height="120"
          color="primary"
          glow
          :ribbon="16"
          :dash="24"
          :gap="16"
          :speed="2.4"
        />
      </div>
    </div>
  </div>
</template>
