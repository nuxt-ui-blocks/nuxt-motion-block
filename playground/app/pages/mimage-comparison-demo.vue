<template>
  <div class="space-y-12">
    <UPageHeader
      title="Image Comparison"
      description="A draggable divider that clips one image against another, with hover, zoom and keyboard input."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The right-hand image sits underneath and the left-hand one is clipped with
        <code class="font-mono">clip-path: inset(0 0 0 N%)</code>, so dragging never moves an
        element — it only changes a percentage. The slider handle is a separate layer that follows
        the same motion value. The images are the two the docs ship with.
      </p>

      <MImageComparison
        data-testid="comparison-basic"
        class="h-96 w-full rounded-xl overflow-hidden shadow-xl"
        show-position
        show-controls
        :initial-position="50"
        @position-change="position = Math.round($event)"
        @drag-start="dragging = true"
        @drag-end="dragging = false"
      >
        <MImageComparisonImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Mountain before editing"
          position="left"
          class="object-cover"
        />
        <MImageComparisonImage
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Mountain after editing"
          position="right"
          class="object-cover"
        />
        <MImageComparisonSlider data-testid="slider-handle">
          <template #default>
            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl">
              <UIcon
                name="i-lucide-move-horizontal"
                class="w-5 h-5 text-gray-700"
              />
            </div>
          </template>
        </MImageComparisonSlider>
      </MImageComparison>

      <div class="mt-4 flex items-center justify-between text-sm text-muted">
        <span>Original</span>
        <span>Enhanced</span>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          position
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-position"
        >
          {{ position }}%
        </dd>
        <dt class="text-muted">
          dragging
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-dragging"
        >
          {{ dragging ? 'true' : 'false' }}
        </dd>
        <dt class="text-muted">
          initialPosition
        </dt>
        <dd class="font-mono">
          50
        </dd>
        <dt class="text-muted">
          clip
        </dt>
        <dd class="font-mono">
          inset(0 0 0 N%)
        </dd>
        <dt class="text-muted">
          events
        </dt>
        <dd class="font-mono">
          positionChange · dragStart · dragEnd
        </dd>
        <dt class="text-muted">
          overlay
        </dt>
        <dd class="font-mono">
          controls + position badge
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Hover, zoom and autoplay
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">enable-hover</code> moves the divider with the pointer instead of
        waiting for a press, <code class="font-mono">enable-zoom</code> lets the wheel scale the
        whole stage between 0.5× and 3×, and <code class="font-mono">auto-play</code> steps the
        position by 10% every three seconds on a client-only interval that any interaction stops.
        All three are read once when the component mounts, so toggling them re-keys the stage.
      </p>

      <MImageComparison
        :key="`modes-${enableHover}-${enableZoom}-${autoPlay}`"
        data-testid="comparison-modes"
        class="h-80 w-full rounded-xl overflow-hidden shadow-xl"
        show-position
        show-controls
        :enable-hover="enableHover"
        :enable-zoom="enableZoom"
        :auto-play="autoPlay"
        :snap-to-steps="snapToSteps"
        :steps="[0, 25, 50, 75, 100]"
        @position-change="modePosition = Math.round($event)"
      >
        <MImageComparisonImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Mountain before editing"
          position="left"
          class="object-cover"
        />
        <MImageComparisonImage
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Mountain after editing"
          position="right"
          class="object-cover"
        />
        <MImageComparisonSlider>
          <template #default>
            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl">
              <UIcon
                name="i-lucide-move-horizontal"
                class="w-5 h-5 text-gray-700"
              />
            </div>
          </template>
        </MImageComparisonSlider>
      </MImageComparison>

      <div class="mt-6 flex flex-wrap gap-2">
        <UButton
          :label="`hover: ${enableHover ? 'on' : 'off'}`"
          variant="outline"
          size="sm"
          data-testid="toggle-hover"
          @click="enableHover = !enableHover"
        />
        <UButton
          :label="`zoom: ${enableZoom ? 'on' : 'off'}`"
          variant="outline"
          size="sm"
          data-testid="toggle-zoom"
          @click="enableZoom = !enableZoom"
        />
        <UButton
          :label="`autoplay: ${autoPlay ? 'on' : 'off'}`"
          variant="outline"
          size="sm"
          data-testid="toggle-autoplay"
          @click="autoPlay = !autoPlay"
        />
        <UButton
          :label="`snapToSteps: ${snapToSteps ? 'on' : 'off'}`"
          variant="outline"
          size="sm"
          data-testid="toggle-snap"
          @click="snapToSteps = !snapToSteps"
        />
        <UButton
          label="Reset"
          icon="i-lucide-refresh-cw"
          variant="soft"
          size="sm"
          data-testid="reset"
          @click="modePosition = 50"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          position
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mode-position"
        >
          {{ modePosition }}%
        </dd>
        <dt class="text-muted">
          hover follow
        </dt>
        <dd class="font-mono">
          {{ enableHover ? 'enabled' : 'drag only' }}
        </dd>
        <dt class="text-muted">
          wheel
        </dt>
        <dd class="font-mono">
          {{ enableZoom ? 'zoom 0.5× – 3×' : 'ignored' }}
        </dd>
        <dt class="text-muted">
          autoplay
        </dt>
        <dd class="font-mono">
          {{ autoPlay ? '+10% / 3000ms' : 'off' }}
        </dd>
        <dt class="text-muted">
          snap steps
        </dt>
        <dd class="font-mono">
          {{ snapToSteps ? '0 25 50 75 100' : 'continuous' }}
        </dd>
        <dt class="text-muted">
          spring
        </dt>
        <dd class="font-mono">
          duration 0.1 · bounce 0
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Keyboard
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The stage itself is the focusable element (<code class="font-mono">tabindex="0"</code> with
        <code class="font-mono">role="img"</code> and a live <code class="font-mono">aria-valuenow</code>),
        so Tab onto the comparison and drive it: arrows move in 5% steps, Home and End jump to the
        ends, Enter or Space resets. The badge in the corner mirrors the value for sighted users.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="flex items-center rounded-2xl border border-dashed border-default p-6">
          <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <dt class="text-muted">
              arrows
            </dt>
            <dd class="font-mono">
              ±5%
            </dd>
            <dt class="text-muted">
              Home / End
            </dt>
            <dd class="font-mono">
              0% / 100%
            </dd>
            <dt class="text-muted">
              Enter · Space
            </dt>
            <dd class="font-mono">
              reset to initial
            </dd>
            <dt class="text-muted">
              ARIA
            </dt>
            <dd class="font-mono">
              aria-valuenow on stage
            </dd>
            <dt class="text-muted">
              touch
            </dt>
            <dd class="font-mono">
              touchmove + touch-action: none
            </dd>
            <dt class="text-muted">
              body styles
            </dt>
            <dd class="font-mono">
              cursor / selection while dragging
            </dd>
          </dl>
        </div>

        <div class="rounded-2xl bg-(--ui-bg-muted) p-6 text-xs text-muted">
          <p class="font-semibold text-highlighted">
            Doc caveats
          </p>
          <p class="mt-2">
            <code class="font-mono">mode</code> accepts
            <code class="font-mono">slide · fade · curtain · circle</code> and is published on the
            provide/inject context, but the image component only ever renders the slide clip — the
            other three modes produce no visual difference yet.
          </p>
          <p class="mt-2">
            <code class="font-mono">orientation="vertical"</code> changes the pointer maths and the
            cursor, but the divider still positions itself from
            <code class="font-mono">left</code>, so the handle does not rotate to match.
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const position = ref(50)
const dragging = ref(false)

const enableHover = ref(false)
const enableZoom = ref(false)
const autoPlay = ref(false)
const snapToSteps = ref(false)
const modePosition = ref(50)
</script>
