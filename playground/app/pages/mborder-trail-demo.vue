<template>
  <div class="space-y-12">
    <UPageHeader
      title="BorderTrail"
      description="A glowing head riding an offset-path rectangle around a container's border, masked down to the ring itself."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
        <p class="text-muted">
          The root is an <code class="font-mono">absolute inset-0</code> wrapper with the border
          ring mask; the moving head is a square whose
          <code class="font-mono">offset-path</code> is a rounded rectangle matching the corner
          radius. The parent must be <code class="font-mono">relative overflow-hidden</code> —
          the wrapper has no size of its own and the ring follows
          <code class="font-mono">rounded-[inherit]</code>.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="mx-auto max-w-md space-y-4 rounded-2xl border border-default bg-(--ui-bg-muted) p-6">
        <div class="relative overflow-hidden rounded-2xl border border-default bg-(--ui-bg) p-6">
          <MBorderTrail
            :key="`basic-${replayKey}`"
            class="bg-gradient-to-r from-green-500 to-teal-500"
            :size="40"
            :transition="{ duration: 3, ease: 'easeInOut' }"
            data-testid="basic"
          />
          <div class="flex items-center gap-4">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-success/10">
              <UIcon
                name="i-lucide-bell"
                class="size-6 text-success"
              />
            </div>
            <div>
              <p class="font-bold text-highlighted">
                Notification Center
              </p>
              <p class="text-sm text-muted">
                The head laps the border every 3 seconds
              </p>
            </div>
          </div>
        </div>

        <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
          <dt class="text-muted">
            size
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-size"
          >
            40px
          </dd>
          <dt class="text-muted">
            duration
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-duration"
          >
            3s
          </dd>
          <dt class="text-muted">
            repeat
          </dt>
          <dd class="font-mono">
            Infinity (default)
          </dd>
          <dt class="text-muted">
            ease
          </dt>
          <dd class="font-mono">
            easeInOut
          </dd>
          <dt class="text-muted">
            path
          </dt>
          <dd class="font-mono">
            rect(0 auto auto 0 round 40px)
          </dd>
          <dt class="text-muted">
            head class
          </dt>
          <dd class="font-mono">
            absolute aspect-square + class
          </dd>
        </dl>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Prop tour
        </p>
        <p class="text-muted">
          <code class="font-mono">class</code> is the head's color — a background utility, not a
          ring — and <code class="font-mono">size</code> sets both the head's width and the corner
          radius of its path, so the head always sits flush on the border. Your
          <code class="font-mono">transition</code> spreads over the default
          <code class="font-mono">repeat: Infinity, duration: 5, ease: linear</code>.
        </p>
      </template>

      <div class="mx-auto max-w-xl space-y-6">
        <div
          class="relative overflow-hidden rounded-3xl border border-default p-8"
          data-testid="tour"
        >
          <MBorderTrail
            :key="`tour-${replayKey}`"
            :class="toneClass"
            :size="size"
            :transition="tourTransition"
          />
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="font-bold text-highlighted">
                Interactive card
              </p>
              <p class="text-sm text-muted">
                size {{ size }}px · {{ duration }}s {{ ease }}
              </p>
            </div>
            <UIcon
              name="i-lucide-sparkles"
              class="size-6 text-dimmed"
            />
          </div>
        </div>

        <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
          <dt class="text-muted">
            head width
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-head-width"
          >
            {{ size }}px (aspect-square)
          </dd>
          <dt class="text-muted">
            path radius
          </dt>
          <dd class="font-mono">
            round {{ size }}px
          </dd>
          <dt class="text-muted">
            lap distance
          </dt>
          <dd
            class="font-mono"
            data-testid="readout-lap"
          >
            {{ lapEstimate }}
          </dd>
          <dt class="text-muted">
            transition
          </dt>
          <dd class="font-mono">
            {{ duration }}s · {{ ease }}
          </dd>
          <dt class="text-muted">
            repeat
          </dt>
          <dd class="font-mono">
            Infinity (kept from default)
          </dd>
          <dt class="text-muted">
            animate keys
          </dt>
          <dd class="font-mono">
            offsetDistance 0% → 100%
          </dd>
        </dl>

        <div class="grid gap-6 md:grid-cols-3">
          <UFormField
            label="size (px)"
            :max="80"
            :min="12"
            :step="4"
          >
            <USlider
              v-model="size"
              :max="80"
              :min="12"
              :step="4"
            />
          </UFormField>

          <UFormField
            label="duration (s)"
            :max="8"
            :min="1"
            :step="0.5"
          >
            <USlider
              v-model="duration"
              :max="8"
              :min="1"
              :step="0.5"
            />
          </UFormField>

          <UFormField label="ease">
            <div class="flex gap-2">
              <UButton
                v-for="option in eases"
                :key="option"
                :color="ease === option ? 'primary' : 'neutral'"
                :label="option"
                :variant="ease === option ? 'solid' : 'outline'"
                size="sm"
                data-testid="ease"
                @click="ease = option"
              />
            </div>
          </UFormField>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Hover reveal
        </p>
        <p class="text-muted">
          Mounting the trail only while the pointer is down on the control makes it an affordance
          rather than ambient motion — the wrapper still has to be
          <code class="font-mono">relative overflow-hidden</code> while the trail is alive inside.
        </p>
      </template>

      <div class="flex flex-wrap items-center gap-4">
        <div
          class="relative overflow-hidden rounded-xl"
          data-testid="hover-wrap"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
        >
          <MBorderTrail
            v-if="hovered"
            class="bg-gradient-to-r from-primary to-info"
            :size="30"
            :transition="{ duration: 2, ease: 'linear' }"
          />
          <UButton
            label="Hover me"
            icon="i-lucide-mouse-pointer-2"
            data-testid="hover-trail"
          />
        </div>

        <p class="text-xs text-muted">
          Trail mounts on <code class="font-mono">mouseenter</code>, unmounts on leave — hover the
          button to see it. Touch devices never fire either event, so the reveal stays desktop-only.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Completion callback
        </p>
        <p class="text-muted">
          <code class="font-mono">onAnimationComplete</code> forwards to a listener for the
          motion component's <code class="font-mono">animationcomplete</code> event — but
          motion-v only emits <code class="font-mono">motionstart</code> /
          <code class="font-mono">motioncomplete</code>, so with the shipped component the
          callback never fires, finite repeat or not. Run the trail below: it completes in
          about 4 seconds and the log stays empty.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap items-center gap-4">
        <div class="relative overflow-hidden rounded-xl border border-default p-5">
          <MBorderTrail
            :key="`finite-${replayKey}`"
            class="bg-gradient-to-r from-warning to-error"
            :size="36"
            :transition="{ duration: 2, repeat: 1, ease: 'easeInOut' }"
            :on-animation-complete="onTrailComplete"
            data-testid="finite"
          />
          <p class="text-sm text-muted">
            2s × 2 repeats, then it stops
          </p>
        </div>

        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-finite"
          @click="replay()"
        />
      </div>

      <dl class="mb-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          prop
        </dt>
        <dd class="font-mono">
          onAnimationComplete
        </dd>
        <dt class="text-muted">
          event it binds
        </dt>
        <dd class="font-mono">
          animationcomplete
        </dd>
        <dt class="text-muted">
          motion-v emits
        </dt>
        <dd class="font-mono">
          motioncomplete
        </dd>
        <dt class="text-muted">
          match
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-event-match"
        >
          none — callback dead
        </dd>
        <dt class="text-muted">
          log entries after a run
        </dt>
        <dd class="font-mono">
          0
        </dd>
        <dt class="text-muted">
          workaround
        </dt>
        <dd class="font-mono">
          bind @motioncomplete inside the component
        </dd>
      </dl>

      <div class="space-y-1 rounded-2xl bg-(--ui-bg-muted) p-4 font-mono text-[11px]">
        <p
          v-for="entry in log"
          :key="entry.id"
          data-testid="log-entry"
        >
          [{{ entry.id }}] {{ entry.text }}
        </p>
        <p
          v-if="log.length === 0"
          class="text-dimmed"
        >
          waiting for animationcomplete… (expected — it never fires)
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Accessibility
        </p>
        <p class="text-muted">
          The trail is decoration layered over content you already own — it never participates in
          the accessibility tree and never takes a pointer event.
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          wrapper
        </dt>
        <dd class="font-mono">
          pointer-events-none
        </dd>
        <dt class="text-muted">
          aria
        </dt>
        <dd class="font-mono">
          none — no role, label or live region
        </dd>
        <dt class="text-muted">
          keyboard
        </dt>
        <dd class="font-mono">
          not focusable, not required
        </dd>
        <dt class="text-muted">
          reduced motion
        </dt>
        <dd class="font-mono">
          not handled — loops regardless
        </dd>
        <dt class="text-muted">
          paint cost
        </dt>
        <dd class="font-mono">
          offset-distance on one element
        </dd>
        <dt class="text-muted">
          touch
        </dt>
        <dd class="font-mono">
          continuous trails run; hover reveals do not
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const eases = ['linear', 'easeInOut', 'easeOut'] as const

const size = ref(40)
const duration = ref(3)
const ease = ref<string>('easeInOut')
const hovered = ref(false)
const replayKey = ref(0)

const toneClass = 'bg-gradient-to-r from-primary to-info'

const tourTransition = computed(() => ({
  duration: duration.value,
  ease: ease.value,
}))

/** The head runs the rounded rectangle at roughly 2×(width+height) per lap. */
const lapEstimate = computed(() => {
  const parentWidth = 576
  const parentHeight = 128
  return `~${Math.round(2 * (parentWidth + parentHeight))}px`
})

let logId = 0
const log = ref<{ id: number, text: string }[]>([])

function onTrailComplete() {
  logId++
  log.value.push({
    id: logId,
    text: `animationcomplete — size ${size.value}px, ${duration.value}s ${ease.value}`,
  })
  if (log.value.length > 6) {
    log.value.shift()
  }
}

function replay() {
  replayKey.value++
  log.value = []
}
</script>
