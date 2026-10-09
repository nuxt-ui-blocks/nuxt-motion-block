<template>
  <div class="space-y-12">
    <UPageHeader
      title="PixelatedCanvas"
      description="Images rendered as a grid of dots or squares that distort, jitter and tint under the cursor."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The image is fetched in <code class="font-mono">onMounted</code> with
        <code class="font-mono">crossOrigin = "anonymous"</code>, sampled into cells and drawn to a
        canvas. <code class="font-mono">interactive</code> defaults to true, so moving the cursor
        over the canvas swirls the pixels (<code class="font-mono">distortionMode: "swirl"</code>)
        and they relax back when it leaves. Hover it.
      </p>

      <div class="flex justify-center rounded-2xl bg-(--ui-bg-muted) p-4">
        <MPixelatedCanvas
          :src="seedUrl('pixel-basic', 400, 300)"
          :width="400"
          :height="300"
          :cell-size="6"
          class="rounded-lg"
          data-testid="basic"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          cellSize
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cellsize"
        >
          6px
        </dd>
        <dt class="text-muted">
          shape / dotScale
        </dt>
        <dd class="font-mono">
          square / 0.9
        </dd>
        <dt class="text-muted">
          interactive
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-interactive"
        >
          true
        </dd>
        <dt class="text-muted">
          distortionMode
        </dt>
        <dd class="font-mono">
          swirl (strength 3, radius 80)
        </dd>
        <dt class="text-muted">
          followSpeed / fadeSpeed
        </dt>
        <dd class="font-mono">
          0.2 / 0.1
        </dd>
        <dt class="text-muted">
          maxFps / objectFit
        </dt>
        <dd class="font-mono">
          60 / cover
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Shapes and treatment
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">shape</code> switches between <code class="font-mono">circle</code>
        and <code class="font-mono">square</code> cells, <code class="font-mono">dotScale</code>
        shrinks each mark inside its cell, and <code class="font-mono">grayscale</code>,
        <code class="font-mono">tintColor</code> and <code class="font-mono">tintStrength</code>
        grade the sampled colors before drawing.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            circle cells, grayscale
          </p>
          <div class="flex justify-center rounded-2xl bg-(--ui-bg-muted) p-4">
            <MPixelatedCanvas
              :src="seedUrl('pixel-circles', 400, 300)"
              :width="360"
              :height="270"
              :cell-size="7"
              shape="circle"
              grayscale
              class="rounded-lg"
              data-testid="variant-circle"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            sparse squares, amber tint
          </p>
          <div class="flex justify-center rounded-2xl bg-(--ui-bg-muted) p-4">
            <MPixelatedCanvas
              :src="seedUrl('pixel-sparse', 400, 300)"
              :width="360"
              :height="270"
              :cell-size="7"
              :dot-scale="0.55"
              tint-color="#f59e0b"
              :tint-strength="0.5"
              background-color="#0f172a"
              class="rounded-lg"
              data-testid="variant-tint"
            />
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Distortion modes
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Three modes, same canvas settings — <code class="font-mono">repel</code> pushes pixels away
        from the cursor, <code class="font-mono">attract</code> pulls them in,
        <code class="font-mono">swirl</code> rotates around it. All three also run the default
        jitter (strength 4, speed 4) so the image is never fully still while hovered.
      </p>

      <div class="grid gap-6 sm:grid-cols-3">
        <div
          v-for="mode in distortionModes"
          :key="mode"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            {{ mode }}
          </p>
          <div class="flex justify-center rounded-2xl bg-(--ui-bg-muted) p-3">
            <MPixelatedCanvas
              :src="seedUrl(`pixel-${mode}`, 300, 200)"
              :width="240"
              :height="160"
              :cell-size="6"
              :distortion-strength="5"
              :distortion-radius="90"
              :distortion-mode="mode"
              :jitter-strength="2"
              class="rounded-lg"
              :data-testid="`mode-${mode}`"
            />
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Caveats
        </p>
      </template>

      <ul class="grid gap-2 text-sm text-muted sm:grid-cols-2">
        <li>
          <code class="font-mono">src</code> is a runtime network fetch — offline or blocked, the
          canvas keeps only <code class="font-mono">backgroundColor</code>. These demos use
          deterministic <code class="font-mono">picsum.photos/seed/…</code> URLs; the host must
          send CORS headers (<code class="font-mono">crossOrigin = "anonymous"</code>) or sampling
          fails and the canvas taints.
        </li>
        <li>
          The component has no prop watchers: <code class="font-mono">src</code>,
          <code class="font-mono">cellSize</code>, size and distortion settings are read during
          <code class="font-mono">onMounted</code>. Change them and remount — the controls in this
          page are static for that reason.
        </li>
        <li>
          <code class="font-mono">interactive</code> binds
          <code class="font-mono">pointermove</code>/<code class="font-mono">enter</code>/<code class="font-mono">leave</code>
          on the canvas itself, so the effect needs a fine pointer; touch gets a static pixel image
          (plus jitter while considered active).
        </li>
        <li>
          Cost is per-frame pixel sampling capped at <code class="font-mono">maxFps</code> (60 by
          default): larger canvases with small cells multiply both memory (per-cell samples) and
          draw time. Start from <code class="font-mono">cellSize 6–8</code> when experimenting.
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const distortionModes = ['repel', 'attract', 'swirl'] as const

function seedUrl(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}
</script>
