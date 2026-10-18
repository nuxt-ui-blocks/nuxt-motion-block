---
title: Text Morph
description: Text that morphs between different strings.
---

The TextMorph component animates from one string to another: each character is its own `span`, and whenever `text` changes the old characters animate out while the new ones animate in, giving a smooth morph in place. It is the component to reach for when the same string changes in place — a rotating word in a headline, a live label, or a value that updates.

## Usage

Pass the text as `text` and swap it whenever the value changes. Each character is its own `span`, so the element renders as `as` (a `span` by default) with `class` merged onto it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-morph-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <div class="text-center max-w-3xl">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Building
        <MTextMorph
          :text="currentCategory"
          as="span"
          class="text-primary inline-block"
        />
        Experiences
      </h1>

      <p class="text-xl text-muted mb-8">
        Create stunning interfaces with our collection of animated components that
        <MTextMorph
          :text="currentFeature"
          as="span"
          class="text-purple-600 dark:text-purple-400 font-semibold"
        />
        the way users interact with your applications.
      </p>

      <div class="bg-default rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-lg font-semibold mb-2">
              Real-time Preview
            </h3>
            <p class="text-muted text-sm">
              See changes instantly as you type with our live preview feature
            </p>
          </div>
          <MTextMorph
            :text="currentStat"
            as="div"
            class="text-3xl font-bold text-green-600 dark:text-green-400"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-4 mt-8">
      <UButton
        size="lg"
        color="primary"
      >
        Get Started
      </UButton>
      <UButton
        size="lg"
        variant="outline"
      >
        View Documentation
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Categories that rotate
const categories = ['Modern', 'Innovative', 'Beautiful', 'Interactive']
const categoryIndex = ref(0)

// Features that rotate
const features = ['transform', 'enhance', 'revolutionize', 'elevate']
const featureIndex = ref(0)

// Stats that rotate
const stats = ['99.9%', '10x', '50ms', '24/7']
const statIndex = ref(0)

// Current values
const currentCategory = computed(() => categories[categoryIndex.value])
const currentFeature = computed(() => features[featureIndex.value])
const currentStat = computed(() => stats[statIndex.value])

// Rotate through values periodically
let categoryTimer, featureTimer, statTimer

onMounted(() => {
  categoryTimer = setInterval(() => {
    categoryIndex.value = (categoryIndex.value + 1) % categories.length
  }, 2000)

  featureTimer = setInterval(() => {
    featureIndex.value = (featureIndex.value + 1) % features.length
  }, 2500)

  statTimer = setInterval(() => {
    statIndex.value = (statIndex.value + 1) % stats.length
  }, 3000)
})

onBeforeUnmount(() => {
  clearInterval(categoryTimer)
  clearInterval(featureTimer)
  clearInterval(statTimer)
})
</script>
```
::

## Examples

### Cycle text on click

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-morph-usage" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4 flex flex-col items-center">
    <MTextMorph :text="currentText" />
    <button
      class="px-4 py-2 bg-primary/70 text-white rounded hover:bg-primary transition-colors"
      @click="cycleText"
    >
      Change Text
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const texts = ['Hello', 'World', 'Vue', 'Nuxt']
const currentIndex = ref(0)
const currentText = computed(() => texts[currentIndex.value])

const cycleText = () => {
  currentIndex.value = (currentIndex.value + 1) % texts.length
}
</script>
```
::

### Custom variants and transition

`variants` replaces the default enter/animate/exit states for each character and
`transition` is merged over the default spring, so you can tune the motion to a
label, badge or value that updates in place. `className` and `style` are applied
to the root alongside `class`.

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-morph-variants" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MTextMorph
      :text="status"
      as="span"
      class="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
      class-name="tracking-widest"
      :style="{ letterSpacing: '0.12em' }"
      :variants="{
        initial: { opacity: 0, y: 8, filter: 'blur(6px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -8, filter: 'blur(6px)' },
      }"
      :transition="{ type: 'spring', stiffness: 420, damping: 30 }"
    />

    <UButton
      label="Next status"
      variant="outline"
      @click="index = (index + 1) % statuses.length"
    />
  </div>
</template>

<script setup lang="ts">
const statuses = ['Syncing', 'Building', 'Deploying', 'Live']
const index = ref(0)
const status = computed(() => statuses[index.value])
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-morph-custom" />
  :::
#code
  <PlaygroundCode name="TextMorph" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="''"}
  The text to display. Changing it morphs the current text into the new one.
  ::

  ::component-prop{name="as" type="string" default="'span'"}
  Element to render as.
  ::

  ::component-prop{name="className" type="string" default="''"}
  CSS classes applied to the root element.
  ::

  ::component-prop{name="style" type="object" default="() => ({})"}
  Inline styles applied to the root element.
  ::

  ::component-prop{name="variants" type="object" default="() => ({})"}
  Custom motion variants for the character enter, animate and exit states.
  ::

  ::component-prop{name="transition" type="object" default="() => ({})"}
  Transition merged over the default character animation.
  ::

  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes applied to the root element, merged with `className`.
  ::

  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textMorph` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="char"}
  `inline-block`
  ::
::

## Accessibility

The root element carries an `aria-label` set to `text` and every character `span` is `aria-hidden="true"`, so assistive technology reads the current string as a whole rather than one announcement per character.

## Performance

- On every `text` change the previous characters leave and the new ones enter, so both strings are in the DOM for the length of the transition. A short string is cheap; morphing between two long strings animates twice the characters.
- The character list is computed once per `text` change, not per frame, and the morph runs on transforms, opacity and a `blur` filter.
