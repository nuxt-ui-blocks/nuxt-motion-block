<template>
  <div class="space-y-12">
    <UPageHeader
      title="Focus Cards"
      description="A grid where the hovered card sharpens while every sibling blurs back and scales down."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Hover any card: its siblings take <code class="font-mono">blur-sm</code> and
        <code class="font-mono">scale-[0.98]</code> over 300ms while the hovered card fades its
        gradient overlay in and pushes the image to <code class="font-mono">scale-105</code>. The
        overlay is built from <code class="font-mono">title</code> and
        <code class="font-mono">description</code>, so cards that share a title would share a key.
      </p>

      <MFocusCards
        data-testid="cards-basic"
        :cards="described"
        class="max-w-4xl mx-auto"
      />

      <dl class="mt-8 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          cards
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-count"
        >
          {{ described.length }}
        </dd>
        <dt class="text-muted">
          columns
        </dt>
        <dd class="font-mono">
          1 → md:3
        </dd>
        <dt class="text-muted">
          card height
        </dt>
        <dd class="font-mono">
          h-60 md:h-96
        </dd>
        <dt class="text-muted">
          blur / scale
        </dt>
        <dd class="font-mono">
          blur-sm · 0.98
        </dd>
        <dt class="text-muted">
          transition
        </dt>
        <dd class="font-mono">
          300ms ease-out
        </dd>
        <dt class="text-muted">
          key
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-key"
        >
          card.title
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Titles only
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">description</code> is optional. Without it the overlay keeps the
        title and drops the paragraph, which is the compact form of the same hover behaviour. The
        images below are the ones the docs ship with.
      </p>

      <MFocusCards
        data-testid="cards-titles"
        :cards="titlesOnly"
        class="max-w-3xl mx-auto"
      />

      <dl class="mt-8 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          descriptions
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-descriptions"
        >
          omitted
        </dd>
        <dt class="text-muted">
          overlay
        </dt>
        <dd class="font-mono">
          from-black/70 → transparent
        </dd>
        <dt class="text-muted">
          image
        </dt>
        <dd class="font-mono">
          object-cover, absolute inset-0
        </dd>
        <dt class="text-muted">
          card background
        </dt>
        <dd class="font-mono">
          bg-gray-100 dark:bg-neutral-900
        </dd>
        <dt class="text-muted">
          pointer
        </dt>
        <dd class="font-mono">
          cursor-pointer
        </dd>
        <dt class="text-muted">
          reset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reset"
        >
          mouseleave → null
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Composition limits
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each card is a fixed <code class="font-mono">UCard</code> with a fixed overlay, so
        everything you pass has to fit inside the data contract — <code class="font-mono">title</code>,
        <code class="font-mono">src</code> and an optional
        <code class="font-mono">description</code>. Extra fields ride along harmlessly but are
        never rendered.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="flex items-center rounded-2xl border border-dashed border-default p-6">
          <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <dt class="text-muted">
              props
            </dt>
            <dd class="font-mono">
              cards only
            </dd>
            <dt class="text-muted">
              card shape
            </dt>
            <dd class="font-mono">
              title · src · description?
            </dd>
            <dt class="text-muted">
              container class
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-class"
            >
              merges on root grid
            </dd>
            <dt class="text-muted">
              content fields
            </dt>
            <dd class="font-mono">
              extra keys ignored
            </dd>
          </dl>
        </div>

        <div class="rounded-2xl bg-(--ui-bg-muted) p-6 text-xs text-muted">
          <p class="font-semibold text-highlighted">
            Doc caveat
          </p>
          <p class="mt-2">
            <code class="font-mono">focus-cards.md</code> documents a
            <code class="font-mono">#card</code> slot and an
            <code class="font-mono">overlay-class</code> prop. Neither exists in the component —
            the overlay and its classes are fixed, so there is currently no way to swap the card
            markup or restyle the overlay without editing <code class="font-mono">Focus/FocusCard.vue</code>.
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface FocusCardData {
  title: string
  src: string
  description?: string
}

const described: FocusCardData[] = [
  {
    title: 'Mountain Adventure',
    description: 'Breathtaking mountain landscapes and challenging trails with expert guides.',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Ocean Sunset',
    description: 'Stunning ocean views with vibrant sunset colors over peaceful waters.',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Forest Path',
    description: 'A peaceful walking trail through ancient woodland with rich biodiversity.',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
]

const titlesOnly: FocusCardData[] = [
  { title: 'Mountain Adventure', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Ocean Sunset', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { title: 'Forest Path', src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
]
</script>
