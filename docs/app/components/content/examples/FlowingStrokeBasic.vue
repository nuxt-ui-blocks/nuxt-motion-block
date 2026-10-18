<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <div class="rounded-2xl border border-default p-4">
      <div class="flex justify-center">
        <MFlowingStroke
          :width="440"
          :height="140"
          color="primary"
          :dash="30"
          :gap="18"
          :ribbon="16"
          :speed="1.4"
        />
      </div>
      <p class="mt-2 text-center text-xs text-muted">
        One <code class="font-mono">color</code> — the tube behind the dashes is a soft 30% tint of it
      </p>
    </div>

    <div class="rounded-2xl border border-default p-4">
      <div class="flex justify-center">
        <MFlowingStroke
          :width="440"
          :height="140"
          color="#f0abfc"
          track-color="#3b0764"
          :dash="26"
          :gap="20"
          :ribbon="18"
          :speed="1.8"
        />
      </div>
      <p class="mt-2 text-center text-xs text-muted">
        <code class="font-mono">color</code> and <code class="font-mono">track-color</code> set independently
      </p>
    </div>

    <div class="rounded-2xl border border-default p-4">
      <div class="flex justify-center">
        <MFlowingStroke
          :width="440"
          :height="140"
          color="success"
          :dash="6"
          :gap="10"
          :ribbon="10"
          :speed="3"
        />
      </div>
      <p class="mt-2 text-center text-xs text-muted">
        A tight dash at three times the base speed
      </p>
    </div>
  </div>
</template>
