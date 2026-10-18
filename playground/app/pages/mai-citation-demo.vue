<script setup lang="ts">
const paragraph = [
  'Diffusers and Schrodinger were both correcting a mistake about',
  'how much kinetic energy a particle actually carries',
  'rather than the energy of the light it exchanges with the medium',
  'along the way',
]

const refs = [
  {
    url: 'https://arxiv.org/abs/2509.26605',
    title: 'Do Large Language Models Dream of Clicking Pigeons?',
    description: 'The full write-up, including the follow-up on activation patching.',
  },
  {
    url: 'https://nuxt.com',
    title: 'Nuxt',
    description: 'The framework this package is built on. No description, to check the tighter card.',
  },
  {
    url: 'https://example.com',
    title: 'Example',
  },
]

const longTitle = 'A title long enough that it has to truncate rather than wrap the card to a second line'
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiCitation"
      description="A superscript marker that grows a card out of itself, anchored to the bottom of the pill."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Citation in a sentence
        </p>
        <p class="text-muted">
          Hover or focus a marker. The card scales up from the marker's own
          baseline, so the growth points back at what you clicked.
        </p>
      </template>

      <p class="max-w-prose text-base leading-relaxed">
        <template
          v-for="(word, index) in paragraph"
          :key="index"
        >
          {{ word }}<MAiCitation
            v-if="index === 2"
            :label="index + 1"
            title="Quantum mechanics of the particle"
            description="Schrodinger's correction, and the reason the stationary state survived."
            :url="refs[0]!.url"
          /><template v-else-if="index === 3" />
        </template>
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Every state
        </p>
        <p class="text-muted">
          With and without a description, with a long title that truncates,
          and with a supplied mark.
        </p>
      </template>

      <div class="space-y-3">
        <p class="text-sm text-muted">
          Description present
          <MAiCitation
            :label="1"
            :title="refs[0]!.title"
            :description="refs[0]!.description"
            :url="refs[0]!.url"
          />
        </p>
        <p class="text-sm text-muted">
          No description — tighter card
          <MAiCitation
            :label="2"
            :title="refs[1]!.title"
            :url="refs[1]!.url"
          />
        </p>
        <p class="text-sm text-muted">
          Bare title and host only
          <MAiCitation
            :label="3"
            :title="refs[2]!.title"
            :url="refs[2]!.url"
          />
        </p>
        <p class="text-sm text-muted">
          Long title truncates
          <MAiCitation
            :label="4"
            :title="longTitle"
            :url="'https://example.com/a-very-long-slug-indeed'"
          />
        </p>
        <p class="text-sm text-muted">
          Supplied mark via slot
          <MAiCitation
            :label="5"
            :title="refs[1]!.title"
            :url="refs[1]!.url"
          >
            <template #favicon>
              <UIcon name="i-lucide-braces" />
            </template>
          </MAiCitation>
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Keyboard
        </p>
        <p class="text-muted">
          Tab to a marker to open it, then press Escape. A hover-only preview
          would be unreachable this way.
        </p>
      </template>

      <p class="text-sm text-muted">
        Try it here
        <MAiCitation
          :label="1"
          :title="refs[0]!.title"
          :description="refs[0]!.description"
          :url="refs[0]!.url"
        />
        and the one after
        <MAiCitation
          :label="2"
          :title="refs[1]!.title"
          :url="refs[1]!.url"
        />.
      </p>
    </UCard>
  </div>
</template>
