<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <div class="rounded-2xl bg-violet-50 p-4 dark:bg-violet-950/30">
      <MFlowingStroke
        :width="440"
        :height="140"
        :dash="30"
        :gap="18"
        :ribbon="16"
        :speed="1.4"
      />
      <p class="text-center text-xs text-muted">
        Hover the ribbon — the dashes travel along the path
      </p>
    </div>

    <div class="rounded-2xl border border-default p-4">
      <MFlowingStroke
        :width="440"
        :height="160"
        :dash="6"
        :gap="10"
        :ribbon="10"
        :speed="3"
      />
      <p class="text-center text-xs text-muted">
        A tight dash at three times the base speed
      </p>
    </div>
  </div>
</template>
