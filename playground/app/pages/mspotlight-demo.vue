<template>
  <div class="space-y-12">
    <UPageHeader
      title="Spotlight"
      description="A blurred circle that chases the cursor across its parent element, fading in on enter and out on leave."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The beam mounts invisible (<code class="font-mono">opacity-0</code>) and only appears while
        the pointer is inside the stage. The component rewrites its immediate parent — forcing
        <code class="font-mono">position: relative</code> and
        <code class="font-mono">overflow: hidden</code> — and listens for mouse events there, so the
        stage below is the tracking area. Move your cursor over it.
      </p>

      <div
        class="relative h-72 overflow-hidden rounded-2xl bg-gray-950"
        data-testid="stage"
      >
        <MSpotlight
          :size="size"
          data-testid="basic"
        />
        <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <p class="text-2xl font-bold text-white">
            Move the cursor here
          </p>
          <p class="text-sm text-gray-400">
            The spotlight trails the pointer with a spring, centered by half its size.
          </p>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          size
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-size"
        >
          {{ size }}px
        </dd>
        <dt class="text-muted">
          default class
        </dt>
        <dd class="font-mono">
          bg-primary-300/20 dark:bg-primary-600/20
        </dd>
        <dt class="text-muted">
          spring
        </dt>
        <dd class="font-mono">
          { bounce: 0 }
        </dd>
        <dt class="text-muted">
          visible when
        </dt>
        <dd class="font-mono">
          parent hovered
        </dd>
        <dt class="text-muted">
          pointer events
        </dt>
        <dd class="font-mono">
          none on the beam
        </dd>
        <dt class="text-muted">
          offset math
        </dt>
        <dd class="font-mono">
          cursor − parent rect − size / 2
        </dd>
      </dl>

      <UFormField
        class="mt-6"
        label="size (px)"
        :max="360"
        :min="80"
        :step="20"
      >
        <USlider
          v-model="size"
          :max="360"
          :min="80"
          :step="20"
          data-testid="slider-size"
        />
      </UFormField>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Size and spring
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">class</code> replaces the default color (it is the default value of
        the prop, not an addition), while the shape utilities stay.
        <code class="font-mono">springOptions</code> is forwarded to both springs — raise
        <code class="font-mono">bounce</code> and the beam overshoots before settling.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            large amber, default spring
          </p>
          <div class="relative h-52 overflow-hidden rounded-2xl bg-gray-950">
            <MSpotlight
              :size="320"
              class="bg-amber-400/40"
              data-testid="variant-amber"
            />
            <div class="relative z-10 flex h-full items-center justify-center">
              <p class="text-lg font-semibold text-white">
                320px amber
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            small white, bouncy spring
          </p>
          <div class="relative h-52 overflow-hidden rounded-2xl bg-gray-950">
            <MSpotlight
              :size="120"
              class="bg-white/30"
              :spring-options="{ bounce: 0.6 }"
              data-testid="variant-bouncy"
            />
            <div class="relative z-10 flex h-full items-center justify-center">
              <p class="text-lg font-semibold text-white">
                120px, bounce 0.6
              </p>
            </div>
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
          Nothing is visible until the parent receives
          <code class="font-mono">mouseenter</code> — screenshots without a pointer over the stage
          show no beam, and touch devices never trigger it.
        </li>
        <li>
          The component mutates its parent: it sets <code class="font-mono">position: relative</code>
          and <code class="font-mono">overflow: hidden</code> inline and attaches three listeners.
          Mount it as the direct child of the element you want to track, not inside a wrapper.
        </li>
        <li>
          Listeners and spring subscriptions are cleaned up via the watcher's
          <code class="font-mono">onCleanup</code> when the root unmounts, but the inline parent
          styles it wrote are never reverted.
        </li>
        <li>
          <code class="font-mono">springOptions</code> is read once when the springs are created;
          changing it after mount has no effect without a remount.
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref(200)
</script>
