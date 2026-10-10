---
title: Text Morph
description: Text that morphs between different strings.
navigation:
  icon: i-lucide-type
---

# Text Morph

The TextMorph component creates text that morphs between different strings with smooth animations. It's perfect for creating dynamic text transitions and content changes.

## Usage

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
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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

## Props

::field-group
  ::field{name="text" type="string" default="''"}
  Text to display and morph.
  ::
  
  ::field{name="as" type="string" default="'p'"}
  HTML element to render as.
  ::
  
  ::field{name="className" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="style" type="object" default="{}"}
  Custom styles to apply to the container.
  ::
  
  ::field{name="variants" type="object" default="{}"}
  Custom animation variants.
  ::
  
  ::field{name="transition" type="object" default="{}"}
  Animation transition options.
  ::
::

## Examples

### Basic Text Morph

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-morph-basic" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4 flex flex-col items-center">
    <MTextMorph :text="currentText" />
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="cycleText"
    >
      Change Text
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const texts = ['Morphing Text', 'Is Super Cool', 'And Easy', 'To Use']
const currentIndex = ref(0)
const currentText = computed(() => texts[currentIndex.value])

const cycleText = () => {
  currentIndex.value = (currentIndex.value + 1) % texts.length
}
</script>
```
::

### As Heading Element

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-morph-heading" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4 flex flex-col items-center">
    <MTextMorph :text="currentText" as="h1" class="text-3xl font-bold" />
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="cycleText"
    >
      Change Text
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const texts = ['Heading Morph', 'Is Powerful', 'And Looks Great']
const currentIndex = ref(0)
const currentText = computed(() => texts[currentIndex.value])

const cycleText = () => {
  currentIndex.value = (currentIndex.value + 1) % texts.length
}
</script>
```
::

### With Custom Transition

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-morph-custom-transition" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4 flex flex-col items-center">
    <MTextMorph :text="currentText" :transition="{ type: 'spring', stiffness: 500, damping: 10 }" />
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="cycleText"
    >
      Change Text
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const texts = ['Bouncy Morph', 'Has Custom', 'Spring Physics']
const currentIndex = ref(0)
const currentText = computed(() => texts[currentIndex.value])

const cycleText = () => {
  currentIndex.value = (currentIndex.value + 1) % texts.length
}
</script>
```
::

### With Custom Variants

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-morph-custom-variants" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4 flex flex-col items-center">
    <MTextMorph :text="currentText" :variants="{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 } }" />
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="cycleText"
    >
      Change Text
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const texts = ['Custom Morph', 'With Variants', 'Is Awesome']
const currentIndex = ref(0)
const currentText = computed(() => texts[currentIndex.value])

const cycleText = () => {
  currentIndex.value = (currentIndex.value + 1) % texts.length
}
</script>
```
::

### Dynamic Text Change

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-morph-dynamic" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4">
    <MTextMorph :text="currentText" />
    <button 
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="cycleText"
    >
      Change Text
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const texts = ['First Text', 'Second Text', 'Third Text', 'Final Text']
const currentIndex = ref(0)
const currentText = computed(() => texts[currentIndex.value])

const cycleText = () => {
  currentIndex.value = (currentIndex.value + 1) % texts.length
}
</script>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textMorph` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `''` |
| `char` | `'inline-block'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.textMorph` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `char` | `inline-block` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.textMorph` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `char` | `inline-block` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textMorph` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `char` | `inline-block` |
