<template>
  <div class="space-y-12">
    <UPageHeader
      title="Draggable Card"
      description="A card you can throw around the page — it tilts with the pointer and springs back when released."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The wrapper supplies the perspective, the inner motion element owns
        <code class="font-mono">drag</code>, and the card inside reads the pointer offset to tilt
        up to <code class="font-mono">±25°</code>. Drag it somewhere and let go: it springs back
        into place carrying whatever velocity the throw had.
      </p>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <MDraggableCard data-testid="card-basic">
          <template #header>
            <p class="text-lg font-semibold text-highlighted">
              Drag me
            </p>
          </template>

          <div class="space-y-3 text-sm text-muted">
            <p>
              Grab anywhere on the card and move it. The glare layer rides on top, so the surface
              brightens as it rotates away from the light.
            </p>
            <p class="font-mono text-xs">
              constraints = half the viewport on each side
            </p>
          </div>

          <template #footer>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">release to spring back</span>
              <UBadge
                variant="subtle"
                data-testid="card-badge"
              >
                draggable
              </UBadge>
            </div>
          </template>
        </MDraggableCard>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          card width
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-width"
        >
          20rem (w-80)
        </dd>
        <dt class="text-muted">
          min height
        </dt>
        <dd class="font-mono">
          24rem (min-h-96)
        </dd>
        <dt class="text-muted">
          tilt range
        </dt>
        <dd class="font-mono">
          ±25°
        </dd>
        <dt class="text-muted">
          spring
        </dt>
        <dd class="font-mono">
          100 / 20 / 0.5
        </dd>
        <dt class="text-muted">
          scale on hover
        </dt>
        <dd class="font-mono">
          1.02
        </dd>
        <dt class="text-muted">
          glare
        </dt>
        <dd class="font-mono">
          opacity follows mouse X
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Styled and contained
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">class</code> lands on the card root, so a gradient or a border
        travels with the card while it is dragged. <code class="font-mono">containerClass</code>
        lands on the perspective wrapper — that is where centering belongs, because the card itself
        is sized by its own fixed width.
      </p>

      <div class="grid gap-8 md:grid-cols-2">
        <div class="space-y-3">
          <p class="text-xs font-medium text-muted">
            class — gradient surface
          </p>
          <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-8">
            <MDraggableCard
              data-testid="card-gradient"
              class="border-0 bg-gradient-to-br from-primary to-indigo-600 text-white"
            >
              <template #header>
                <p class="text-lg font-semibold">
                  Gradient surface
                </p>
              </template>

              <p class="text-sm text-white/80">
                The card classes move with the drag, so the gradient never lags behind the tilt.
              </p>
            </MDraggableCard>
          </div>
        </div>

        <div class="space-y-3">
          <p class="text-xs font-medium text-muted">
            containerClass — centered in the panel
          </p>
          <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-8">
            <MDraggableCard
              data-testid="card-centered"
              container-class="mx-auto"
            >
              <template #header>
                <p class="text-lg font-semibold text-highlighted">
                  Centered
                </p>
              </template>

              <p class="text-sm text-muted">
                Centering is applied to the wrapper, so the drag origin starts from the middle of
                the panel rather than the left edge.
              </p>
            </MDraggableCard>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Motion budget
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Three springs drive the whole effect and they all settle to the same resting state, which
        is what makes the card feel like one object rather than a stack of independent transforms.
      </p>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          rotateX source
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rotatex"
        >
          mouse Y → 25 … −25
        </dd>
        <dt class="text-muted">
          rotateY source
        </dt>
        <dd class="font-mono">
          mouse X → −25 … 25
        </dd>
        <dt class="text-muted">
          opacity source
        </dt>
        <dd class="font-mono">
          mouse X → 0.8 … 1
        </dd>
        <dt class="text-muted">
          release bounce
        </dt>
        <dd class="font-mono">
          velocity ÷ 1000, capped 0.8
        </dd>
        <dt class="text-muted">
          drag events
        </dt>
        <dd class="font-mono">
          drag:start · drag:end
        </dd>
        <dt class="text-muted">
          cursor
        </dt>
        <dd class="font-mono">
          grabbing while dragging
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts"></script>
