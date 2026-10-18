<template>
  <div class="space-y-12">
    <UPageHeader
      title="TextShimmer"
      description="An infinite gradient band that sweeps across the text, brightening one slice at a time."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The text carries two background layers: a band gradient sized to
        <code class="font-mono">250%</code> of the element with soft edges at
        <code class="font-mono">50% ± (length × spread)px</code>, and a solid base colour underneath.
        Motion slides <code class="font-mono">backgroundPosition</code> from
        <code class="font-mono">100%</code> to <code class="font-mono">0%</code> on an infinite linear
        loop of <code class="font-mono">duration</code> seconds, so the band sweeps once per duration.
        Text stays selectable and painted with <code class="font-mono">background-clip: text</code>,
        never an image.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextShimmer
          :key="Number(trigger)"
          :duration="duration"
          :spread="spread"
          :text="text"
          class="text-3xl font-bold"
          data-testid="basic"
        />
      </div>

      <div class="mb-6 grid gap-6 sm:grid-cols-2">
        <UFormField
          label="duration"
          :hint="`${duration}s per sweep`"
        >
          <USlider
            v-model="duration"
            :max="8"
            :min="0.5"
            :step="0.5"
          />
        </UFormField>
        <UFormField
          label="spread"
          :hint="`${spread} × length`"
        >
          <USlider
            v-model="spread"
            :max="8"
            :min="0"
            :step="0.5"
          />
        </UFormField>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          duration
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration"
        >
          {{ duration }}s
        </dd>
        <dt class="text-muted">
          spread
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-spread"
        >
          {{ spread }}
        </dd>
        <dt class="text-muted">
          soft edge
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-band"
        >
          {{ text.length * spread }}px
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Text length
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">spread</code> is multiplied by the string length to size the band's
        fade zone, so long copy gets a proportionally wider soft edge at the same value while the
        sweep speed stays fixed at one pass per <code class="font-mono">duration</code>. A fixed
        spread therefore reads tight on a short word and broad on a sentence.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          v-for="sample in samples"
          :key="sample.label"
          :label="sample.label"
          :variant="sample.label === activeSample ? 'solid' : 'outline'"
          :data-testid="`sample-${sample.label}`"
          @click="applySample(sample)"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-14">
        <MTextShimmer
          :key="`${trigger}-${activeSample}`"
          :duration="duration"
          :spread="sampleSpread"
          :text="text"
          class="text-2xl font-bold"
          data-testid="length"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          sample
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-sample"
        >
          {{ activeSample }}
        </dd>
        <dt class="text-muted">
          length
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-length"
        >
          {{ text.length }} chars
        </dd>
        <dt class="text-muted">
          spread
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-length-spread"
        >
          {{ sampleSpread }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Element
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">as</code> picks the tag and <code class="font-mono">class</code> (not
        <code class="font-mono">className</code>) is appended after the component's own gradient class,
        so size and weight are yours to set.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <div
          v-for="option in elements"
          :key="option"
          class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-4 py-10"
        >
          <MTextShimmer
            :key="`${trigger}-element-${option}`"
            :as="option"
            :duration="duration"
            :spread="2"
            :text="`as ${option}`"
            class="font-bold"
            :data-testid="`element-${option}`"
          />
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt
          v-for="option in elements"
          :key="option"
          class="text-muted"
        >
          as="{{ option }}"
        </dt>
        <dd
          v-for="option in elements"
          :key="`tag-${option}`"
          class="font-mono"
          :data-testid="`readout-element-${option}`"
        >
          {{ renderedTags[option] ?? 'pending' }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const trigger = ref(false)
const duration = ref(3)
const spread = ref(2)
const activeSample = ref('Short')
const renderedTags = ref<Record<string, string>>({})

const samples = [
  { label: 'Short', text: 'Shimmer', spread: 2 },
  { label: 'Medium', text: 'A gradient band sweeping the line', spread: 1 },
  { label: 'Long', text: 'Longer copy keeps the band travelling for much longer per sweep', spread: 0.5 },
] as const

const text = ref<string>(samples[0].text)
const sampleSpread = ref<number>(samples[0].spread)

const elements = ['p', 'h1', 'span'] as const

function replay() {
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}

function applySample(sample: (typeof samples)[number]) {
  activeSample.value = sample.label
  text.value = sample.text
  sampleSpread.value = sample.spread
  replay()
}

onMounted(() => {
  for (const option of elements) {
    const element = document.querySelector(`[data-testid="element-${option}"]`)
    renderedTags.value[option] = element?.tagName.toLowerCase() ?? 'missing'
  }
})
</script>
