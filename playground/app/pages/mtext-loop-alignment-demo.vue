<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextLoop Alignment"
      description="Four baseline checks for dropping an inline loop into a text flow: body copy, small type, a heading, and two loops sharing one line."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Inline in a sentence
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root is <code class="font-mono">relative inline-flex</code> with an inline
        <code class="font-mono">verticalAlign: 'baseline'</code> override, so it sits on the text baseline
        like any other word rather than on the line box's bottom edge. The readout compares the loop's box
        with the paragraph's box while the words swap. Every loop on this page sits inside
        <code class="font-mono">&lt;ClientOnly&gt;</code> — the component's presence wrapper emits a
        different node set than its server output, so hydrating it directly logs a mismatch. The
        measurement runs on the client anyway, so nothing is lost.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay (resyncs every loop)"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replayKey++"
        />
      </div>

      <div class="rounded-2xl bg-(--ui-bg-muted) px-6 py-8">
        <p
          class="text-lg"
          data-testid="line-basic"
        >
          This is a sentence with a
          <ClientOnly>
            <MTextLoop
              :key="`basic-${replayKey}`"
              :items="['small', 'medium', 'large']"
              :interval="2"
              class="font-semibold text-primary"
              data-testid="loop-basic"
            />
          </ClientOnly>
          word in the middle of the text flow.
        </p>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          top Δ
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-basic-top"
        >
          {{ readouts.basic.top }}
        </dd>
        <dt class="text-muted">
          bottom Δ
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-basic-bottom"
        >
          {{ readouts.basic.bottom }}
        </dd>
        <dt class="text-muted">
          vertical-align
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-basic-align"
        >
          {{ readouts.basic.align }}
        </dd>
        <dt class="text-muted">
          display
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-basic-display"
        >
          {{ readouts.basic.display }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Small text
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        At <code class="font-mono">text-sm</code> the measure column is shorter, and the same baseline
        override has to keep the loop from drifting a pixel upward — the failure mode is a loop that
        floats a fraction of an em above the words around it.
      </p>

      <div class="rounded-2xl bg-(--ui-bg-muted) px-6 py-8">
        <p
          class="text-sm"
          data-testid="line-small"
        >
          Small text with
          <ClientOnly>
            <MTextLoop
              :key="`small-${replayKey}`"
              :items="['dynamic', 'changing', 'rotating']"
              :interval="2"
              class="font-medium text-secondary"
              data-testid="loop-small"
            />
          </ClientOnly>
          content.
        </p>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          top Δ
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-small-top"
        >
          {{ readouts.small.top }}
        </dd>
        <dt class="text-muted">
          bottom Δ
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-small-bottom"
        >
          {{ readouts.small.bottom }}
        </dd>
        <dt class="text-muted">
          vertical-align
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-small-align"
        >
          {{ readouts.small.align }}
        </dd>
        <dt class="text-muted">
          display
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-small-display"
        >
          {{ readouts.small.display }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Heading
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The heading's larger line height exposes whether the loop anchors to the first baseline or to the
        line box. Both boxes are sampled at the same frame so a mid-transition swap cannot fake a pass.
      </p>

      <div class="rounded-2xl bg-(--ui-bg-muted) px-6 py-8">
        <h2
          class="text-2xl font-bold"
          data-testid="line-heading"
        >
          Heading with
          <ClientOnly>
            <MTextLoop
              :key="`heading-${replayKey}`"
              :items="['awesome', 'amazing', 'incredible']"
              :interval="2"
              class="text-primary"
              data-testid="loop-heading"
            />
          </ClientOnly>
          text
        </h2>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          top Δ
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-heading-top"
        >
          {{ readouts.heading.top }}
        </dd>
        <dt class="text-muted">
          bottom Δ
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-heading-bottom"
        >
          {{ readouts.heading.bottom }}
        </dd>
        <dt class="text-muted">
          vertical-align
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-heading-align"
        >
          {{ readouts.heading.align }}
        </dd>
        <dt class="text-muted">
          display
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-heading-display"
        >
          {{ readouts.heading.display }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Two loops, one line
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each loop keeps its own interval and its own measure column, so they drift out of step within a
        second — which is exactly when two differently sized words sharing a baseline will collide. Both
        boxes are reported together.
      </p>

      <div class="rounded-2xl bg-(--ui-bg-muted) px-6 py-8">
        <p
          class="text-base"
          data-testid="line-pair"
        >
          Multiple
          <ClientOnly>
            <MTextLoop
              :key="`pair-a-${replayKey}`"
              :items="['loops', 'cycles', 'rotations']"
              :interval="2"
              class="font-semibold text-error"
              data-testid="loop-pair-a"
            />
          </ClientOnly>
          in the same
          <ClientOnly>
            <MTextLoop
              :key="`pair-b-${replayKey}`"
              :items="['sentence', 'line', 'paragraph']"
              :interval="3"
              class="font-semibold text-warning"
              data-testid="loop-pair-b"
            />
          </ClientOnly>
          should align properly.
        </p>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
        <dt class="text-muted">
          loop A top Δ
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-pair-a-top"
        >
          {{ readouts.pairA.top }}
        </dd>
        <dt class="text-muted">
          loop B top Δ
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-pair-b-top"
        >
          {{ readouts.pairB.top }}
        </dd>
        <dt class="text-muted">
          loop A align
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-pair-a-align"
        >
          {{ readouts.pairA.align }}
        </dd>
        <dt class="text-muted">
          loop B align
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-pair-b-align"
        >
          {{ readouts.pairB.align }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

interface AlignmentReadout {
  top: string
  bottom: string
  align: string
  display: string
}

const pending: AlignmentReadout = {
  top: 'pending',
  bottom: 'pending',
  align: 'pending',
  display: 'pending',
}

const readouts = reactive<Record<'basic' | 'small' | 'heading' | 'pairA' | 'pairB', AlignmentReadout>>({
  basic: { ...pending },
  small: { ...pending },
  heading: { ...pending },
  pairA: { ...pending },
  pairB: { ...pending },
})

const replayKey = ref(0)

let frame = 0

/** Samples a loop against the line that contains it, in the same frame for both boxes. */
function measure(target: AlignmentReadout, loopSelector: string, lineSelector: string) {
  const loop = document.querySelector<HTMLElement>(loopSelector)
  const line = document.querySelector<HTMLElement>(lineSelector)
  if (!loop || !line) {
    return
  }

  const loopRect = loop.getBoundingClientRect()
  const lineRect = line.getBoundingClientRect()
  const styles = getComputedStyle(loop)

  target.top = `${(loopRect.top - lineRect.top).toFixed(2)}px`
  target.bottom = `${(loopRect.bottom - lineRect.bottom).toFixed(2)}px`
  target.align = styles.verticalAlign
  target.display = styles.display
}

function sample() {
  measure(readouts.basic, '[data-testid="loop-basic"]', '[data-testid="line-basic"]')
  measure(readouts.small, '[data-testid="loop-small"]', '[data-testid="line-small"]')
  measure(readouts.heading, '[data-testid="loop-heading"]', '[data-testid="line-heading"]')
  measure(readouts.pairA, '[data-testid="loop-pair-a"]', '[data-testid="line-pair"]')
  measure(readouts.pairB, '[data-testid="loop-pair-b"]', '[data-testid="line-pair"]')
}

onMounted(() => {
  const tick = () => {
    sample()
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (frame) {
    cancelAnimationFrame(frame)
  }
})
</script>
