<template>
  <div class="space-y-12">
    <UPageHeader
      title="AnimatedBackground"
      description="A highlight slides to the active item. Every child carries a data-id and the component measures the matching element to position an absolutely placed background."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Click activation
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">enable-hover</code> is off, so the highlight only moves on
        clicks. The container carries <code class="font-mono">isolate</code> — without a stacking
        context on it, a <code class="font-mono">z-index: -1</code> background resolves against the
        card and paints behind it instead. <code class="font-mono">default-value</code> seeds the
        slot's <code class="font-mono">activeId</code>, but
        <code class="font-mono">valueChange</code> is only emitted from interactions, so the
        emitted readout starts at <code class="font-mono">null</code>.
      </p>

      <MAnimatedBackground
        default-value="analytics"
        container-class="rounded-xl border border-default bg-default p-2 isolate"
        background-class="rounded-lg bg-primary -z-1"
        data-testid="click-stage"
        @value-change="onValueChange"
      >
        <template #default="{ activeId }">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              type="button"
              :data-id="tab.id"
              :data-testid="`tab-${tab.id}`"
              :class="activeId === tab.id ? 'text-inverted' : 'text-muted hover:text-highlighted'"
              class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {{ tab.label }}
            </button>
          </div>

          <dl class="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
            <dt class="text-muted">
              active id (slot)
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-active"
            >
              {{ activeId ?? 'null' }}
            </dd>
            <dt class="text-muted">
              emitted valueChange
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-emitted"
            >
              {{ emitted ?? 'null' }}
            </dd>
            <dt class="text-muted">
              interaction mode
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-mode"
            >
              click
            </dd>
          </dl>
        </template>
      </MAnimatedBackground>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Hover activation
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        With <code class="font-mono">enable-hover</code> on, the highlight follows
        <code class="font-mono">mouseover</code> and clears itself on
        <code class="font-mono">mouseleave</code>. Both paths call the same
        <code class="font-mono">setActiveId</code>, so leaving the container emits
        <code class="font-mono">valueChange</code> with <code class="font-mono">null</code>.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          :label="`enable-hover: ${enableHover}`"
          icon="i-lucide-mouse-pointer"
          variant="outline"
          data-testid="toggle-hover"
          @click="toggleHover()"
        />
      </div>

      <MAnimatedBackground
        :enable-hover="enableHover"
        container-class="rounded-xl border border-default bg-default p-2 isolate"
        background-class="rounded-lg bg-secondary -z-1"
        data-testid="hover-stage"
        @value-change="onHoverValueChange"
      >
        <template #default="{ activeId }">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              type="button"
              :data-id="tab.id"
              :data-testid="`hover-tab-${tab.id}`"
              :class="activeId === tab.id ? 'text-inverted' : 'text-muted hover:text-highlighted'"
              class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {{ tab.label }}
            </button>
          </div>

          <dl class="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
            <dt class="text-muted">
              active id (slot)
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-hover-active"
            >
              {{ activeId ?? 'null' }}
            </dd>
            <dt class="text-muted">
              emitted valueChange
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-hover-emitted"
            >
              {{ emittedHover ?? 'null' }}
            </dd>
            <dt class="text-muted">
              interaction mode
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-hover-mode"
            >
              {{ enableHover ? 'hover' : 'click (hover off)' }}
            </dd>
          </dl>
        </template>
      </MAnimatedBackground>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Transition duration
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">transition</code> is read when the target is measured, so the
        slider below applies to the next move rather than the one in flight. The slot also
        exposes <code class="font-mono">setActiveId</code> — the Reset button calls it with
        <code class="font-mono">null</code>, which hides the background and emits.
      </p>

      <UFormField
        class="mb-6"
        label="transition.duration (ms)"
        data-testid="field-duration"
      >
        <USlider
          v-model="duration"
          :max="1000"
          :min="0"
          :step="50"
          data-testid="slider-duration"
        />
      </UFormField>

      <MAnimatedBackground
        default-value="reports"
        container-class="rounded-xl border border-default bg-default p-2 isolate"
        background-class="rounded-lg border border-info bg-info/20 -z-1"
        :transition="{ duration, ease: 'ease-in-out' }"
        data-testid="transition-stage"
      >
        <template #default="{ activeId, setActiveId }">
          <div class="flex flex-wrap items-center gap-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              type="button"
              :data-id="tab.id"
              :data-testid="`transition-tab-${tab.id}`"
              :class="activeId === tab.id ? 'text-info' : 'text-muted hover:text-highlighted'"
              class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {{ tab.label }}
            </button>
            <UButton
              label="Reset"
              icon="i-lucide-rotate-ccw"
              size="sm"
              variant="ghost"
              data-testid="reset"
              @click="setActiveId(null)"
            />
          </div>

          <dl class="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
            <dt class="text-muted">
              active id (slot)
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-transition-active"
            >
              {{ activeId ?? 'null' }}
            </dd>
            <dt class="text-muted">
              transition.duration
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-duration"
            >
              {{ duration }}ms
            </dd>
            <dt class="text-muted">
              transition.ease
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-ease"
            >
              ease-in-out
            </dd>
          </dl>
        </template>
      </MAnimatedBackground>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Environment
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          background placement
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-placement"
        >
          absolute top-0 left-0
        </dd>
        <dt class="text-muted">
          background z-index
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-z"
        >
          -1 inside an isolated container
        </dd>
        <dt class="text-muted">
          pointer-events on background
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-pointer"
        >
          none
        </dd>
        <dt class="text-muted">
          data-id lookup depth
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-depth"
        >
          up to 10 ancestors
        </dd>
        <dt class="text-muted">
          emit on mount with default-value
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mount-emit"
        >
          no
        </dd>
        <dt class="text-muted">
          measurement timing
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-timing"
        >
          nextTick + getBoundingClientRect
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports', label: 'Reports' },
  { id: 'users', label: 'Users' },
]

const emitted = ref<string | null>(null)
const emittedHover = ref<string | null>(null)
const enableHover = ref(false)
const duration = ref(300)

function onValueChange(value: string | null) {
  emitted.value = value
}

function onHoverValueChange(value: string | null) {
  emittedHover.value = value
}

function toggleHover() {
  enableHover.value = !enableHover.value
}
</script>
