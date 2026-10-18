<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const isStreaming = ref(false)
const autoCollapse = ref(true)
let timer: ReturnType<typeof setTimeout> | null = null

const stop = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  isStreaming.value = false
}

const run = () => {
  stop()
  isStreaming.value = true
  timer = setTimeout(() => {
    isStreaming.value = false
    timer = null
  }, 4200)
}

onBeforeUnmount(stop)
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiReasoning"
      description="A collapsible reasoning trace. The summary line shimmers only while the model is working, so the shimmer means something rather than being decoration."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Watch it think, then watch it get out of the way
        </p>
        <p class="text-muted">
          The disclosure is a <code>grid-template-rows: 0fr → 1fr</code> transition, not an animated
          <code>height</code>. That interpolates without measuring the content on any frame, and
          <code>min-height: 0</code> on the inner child is what lets an <code>fr</code> track shrink below
          its content size.
        </p>
      </template>

      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <UButton
            label="Start thinking"
            :disabled="isStreaming"
            @click="run"
          />
          <UButton
            color="neutral"
            variant="outline"
            label="Stop"
            :disabled="!isStreaming"
            @click="stop"
          />
          <USwitch
            v-model="autoCollapse"
            label="Collapse when done"
          />
        </div>

        <MAiReasoning
          :collapse-when-done="autoCollapse"
          :is-streaming="isStreaming"
        >
          <p>
            The trace reads as an aside rather than part of the answer, which is why the body carries a
            left border that doubles as its margin.
          </p>
          <p class="mt-2">
            Once you open or close it by hand the component stops deciding for you — otherwise your next
            click would be undone half a second later by the auto-collapse timer.
          </p>
        </MAiReasoning>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Three states side by side
        </p>
        <p class="text-muted">
          Open by default, closed by default, and a trace the model already finished — the third reports
          its duration because <code>duration</code> was supplied rather than measured.
        </p>
      </template>

      <div class="space-y-6">
        <div>
          <p class="mb-1 text-muted text-xs uppercase tracking-wide">
            default open
          </p>
          <MAiReasoning :default-open="true">
            Opened from the start, so the timing pass never had to run.
          </MAiReasoning>
        </div>

        <div>
          <p class="mb-1 text-muted text-xs uppercase tracking-wide">
            default closed
          </p>
          <MAiReasoning>
            Closed until you ask for it. The collapsed body is <code>inert</code>, so it stays out of the
            tab order while hidden.
          </MAiReasoning>
        </div>

        <div>
          <p class="mb-1 text-muted text-xs uppercase tracking-wide">
            already finished
          </p>
          <MAiReasoning :duration="3.4">
            Reported as <em>Thought for 3.4s</em> because the duration prop was passed in.
          </MAiReasoning>
        </div>

        <div>
          <p class="mb-1 text-muted text-xs uppercase tracking-wide">
            never collapsed when done
          </p>
          <MAiReasoning
            :collapse-when-done="false"
            :duration="8.7"
          >
            With <code>collapse-when-done</code> off the trace stays put. Useful for a transcript you want
            to keep readable.
          </MAiReasoning>
        </div>
      </div>
    </UCard>
  </div>
</template>
