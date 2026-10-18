---
title: Text Shimmer Wave
description: Text with a wave-like shimmer animation effect.
---

The TextShimmerWave component creates text with a wave-like shimmer animation effect. It's perfect for creating eye-catching headings and text elements with dynamic 3D transformations.

Each character is its own `motion-v` element inside a shared `perspective` container, and the wave comes from staggering those characters: the delay is `index × duration / spread / length`, so the bump travels from left to right. Every character animates `translateZ`, `translateX`, `translateY`, `scale`, `rotateY`, and its colour together, and `duration` sets how long one character takes to complete the cycle.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-basic" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <MTextShimmerWave text="Basic Wave" />
  </div>
</template>
```
::

## Examples

### Hands-on control

Bumping a `:key` remounts the wave and restarts the animation from the beginning, which is handy when the effect should play on demand instead of looping forever.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-manual" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4 flex flex-col">
    <MTextShimmerWave
      :key="waveKey"
      :text="waveText"
      class="text-xl font-bold"
    />
    <button
      class="px-4 py-2 bg-primary/70 text-white rounded hover:bg-primary transition-colors"
      @click="triggerWave"
    >
      Replay Wave Animation
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const waveText = ref('Click Me')
const waveKey = ref(0)

const triggerWave = () => {
  waveKey.value++
}
</script>
```
::

### Custom transition and spread

The `transition` prop is merged onto every character's animation, so an easing such as `backOut` gives the wave a bouncier feel. `spread` controls how far apart the characters are staggered.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-transition" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-3 p-8">
    <MTextShimmerWave
      text="SPRINGY"
      :spread="3"
      :transition="{ ease: 'backOut' }"
      class="text-3xl font-bold"
    />
    <p class="text-sm text-muted">
      A custom easing and a wider spread give the wave a bouncier character.
    </p>
  </div>
</template>
```
::

### Styled showcase

A fuller page built around the component: live range controls for every distance, element-type switching through `as`, gradient text via `class`, and several presets.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-shimmer-wave-styled" />
  :::
#code
```vue
<template>
  <div class="p-8 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-gray-900 dark:to-teal-900 rounded-2xl">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 rounded-full mb-4">
          <UIcon
            name="i-lucide-wave"
            class="w-5 h-5 text-teal-400"
          />
          <span class="text-teal-400 font-medium">Wave Animation</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          <MTextShimmerWave
            :text="waveSettings.title"
            :as="waveSettings.elementType"
            :duration="waveSettings.duration"
            :z-distance="waveSettings.zDistance"
            :x-distance="waveSettings.xDistance"
            :y-distance="waveSettings.yDistance"
            :scale-distance="waveSettings.scaleDistance"
            :rotate-y-distance="waveSettings.rotateYDistance"
            :class="waveSettings.titleClass"
          />
        </h1>
        <p class="text-xl text-muted max-w-2xl mx-auto">
          <MTextShimmerWave
            :text="waveSettings.subtitle"
            :duration="waveSettings.duration * 1.2"
            :z-distance="waveSettings.zDistance * 0.7"
            :x-distance="waveSettings.xDistance * 0.7"
            :y-distance="waveSettings.yDistance * 0.7"
            class="inline-block"
          />
        </p>
      </div>

      <!-- Controls and Preview -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Controls Panel -->
        <div class="bg-default rounded-xl p-6 border border-default shadow-lg">
          <h2 class="text-2xl font-bold mb-6 flex items-center">
            <UIcon
              name="i-lucide-sliders"
              class="w-6 h-6 mr-2 text-teal-400"
            />
            Wave Controls
          </h2>

          <div class="space-y-6">
            <!-- Text Inputs -->
            <div>
              <label class="block text-default mb-2">Title Text</label>
              <UInput
                v-model="waveSettings.title"
                placeholder="Enter title text"
                size="lg"
              />
            </div>

            <div>
              <label class="block text-default mb-2">Subtitle Text</label>
              <UInput
                v-model="waveSettings.subtitle"
                placeholder="Enter subtitle text"
                size="lg"
              />
            </div>

            <!-- Element Type -->
            <div>
              <label class="block text-default mb-2">Element Type</label>
              <div class="grid grid-cols-3 gap-2">
                <UButton
                  v-for="type in elementTypes"
                  :key="type.value"
                  :color="waveSettings.elementType === type.value ? 'primary' : 'gray'"
                  variant="solid"
                  size="sm"
                  @click="waveSettings.elementType = type.value"
                >
                  {{ type.label }}
                </UButton>
              </div>
            </div>

            <!-- Animation Controls -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-default mb-2">
                  Duration: {{ waveSettings.duration }}s
                </label>
                <input
                  v-model="waveSettings.duration"
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  class="w-full h-2 bg-accented rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-default mb-2">
                  Z Distance: {{ waveSettings.zDistance }}
                </label>
                <input
                  v-model="waveSettings.zDistance"
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  class="w-full h-2 bg-accented rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-default mb-2">
                  X Distance: {{ waveSettings.xDistance }}
                </label>
                <input
                  v-model="waveSettings.xDistance"
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  class="w-full h-2 bg-accented rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-default mb-2">
                  Y Distance: {{ waveSettings.yDistance }}
                </label>
                <input
                  v-model="waveSettings.yDistance"
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  class="w-full h-2 bg-accented rounded-lg appearance-none cursor-pointer"
                >
              </div>
            </div>

            <!-- Advanced Controls -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-default mb-2">
                  Scale: {{ waveSettings.scaleDistance }}
                </label>
                <input
                  v-model="waveSettings.scaleDistance"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  class="w-full h-2 bg-accented rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-default mb-2">
                  Rotate Y: {{ waveSettings.rotateYDistance }}
                </label>
                <input
                  v-model="waveSettings.rotateYDistance"
                  type="range"
                  min="0"
                  max="45"
                  step="1"
                  class="w-full h-2 bg-accented rounded-lg appearance-none cursor-pointer"
                >
              </div>
            </div>

            <!-- Preset Styles -->
            <div>
              <label class="block text-default mb-2">Preset Styles</label>
              <div class="grid grid-cols-2 gap-2">
                <UButton
                  v-for="style in presetStyles"
                  :key="style.name"
                  :color="currentPreset === style.name ? 'primary' : 'gray'"
                  variant="solid"
                  size="sm"
                  @click="applyPreset(style)"
                >
                  {{ style.name }}
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="bg-default rounded-xl p-6 border border-default shadow-lg">
          <h2 class="text-2xl font-bold mb-6 flex items-center">
            <UIcon
              name="i-lucide-monitor"
              class="w-6 h-6 mr-2 text-teal-400"
            />
            Live Preview
          </h2>

          <div class="space-y-8">
            <!-- Title Preview -->
            <div>
              <h3 class="text-lg font-semibold text-default mb-3">
                Title Preview
              </h3>
              <div class="p-6 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <MTextShimmerWave
                  :text="waveSettings.title"
                  :as="waveSettings.elementType"
                  :duration="waveSettings.duration"
                  :z-distance="waveSettings.zDistance"
                  :x-distance="waveSettings.xDistance"
                  :y-distance="waveSettings.yDistance"
                  :scale-distance="waveSettings.scaleDistance"
                  :rotate-y-distance="waveSettings.rotateYDistance"
                  :class="waveSettings.titleClass"
                />
              </div>
            </div>

            <!-- Subtitle Preview -->
            <div>
              <h3 class="text-lg font-semibold text-default mb-3">
                Subtitle Preview
              </h3>
              <div class="p-6 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <MTextShimmerWave
                  :text="waveSettings.subtitle"
                  :duration="waveSettings.duration * 1.2"
                  :z-distance="waveSettings.zDistance * 0.7"
                  :x-distance="waveSettings.xDistance * 0.7"
                  :y-distance="waveSettings.yDistance * 0.7"
                  :scale-distance="waveSettings.scaleDistance"
                  :rotate-y-distance="waveSettings.rotateYDistance * 0.7"
                  class="text-xl"
                />
              </div>
            </div>

            <!-- Example Usage -->
            <div>
              <h3 class="text-lg font-semibold text-default mb-3">
                Example Usage
              </h3>
              <div class="p-6 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-default rounded-lg shadow">
                    <span class="text-default">Feature Highlight</span>
                    <MTextShimmerWave
                      text="New!"
                      :duration="1"
                      :z-distance="10"
                      class="text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                    />
                  </div>

                  <div class="flex items-center justify-between p-4 bg-default rounded-lg shadow">
                    <span class="text-default">Performance</span>
                    <MTextShimmerWave
                      text="99.9% Uptime"
                      :duration="1.5"
                      :z-distance="15"
                      class="text-lg font-bold text-green-600 dark:text-green-400"
                    />
                  </div>

                  <div class="text-center p-4 bg-default rounded-lg shadow">
                    <MTextShimmerWave
                      text="Get Started Today"
                      :duration="1.2"
                      :z-distance="12"
                      :x-distance="3"
                      :y-distance="-1"
                      class="text-2xl font-bold text-teal-600 dark:text-teal-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Showcase -->
      <div class="bg-default rounded-xl p-8 border border-default shadow-lg">
        <h2 class="text-3xl font-bold text-center mb-8 text-highlighted">
          <MTextShimmerWave
            text="Why Choose Our Wave Effects?"
            :duration="1.8"
            :z-distance="15"
            class="inline-block"
          />
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-zap"
                  class="w-8 h-8 text-teal-600 dark:text-teal-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextShimmerWave
                text="Blazing quick"
                :duration="1"
                :z-distance="10"
                class="inline-block text-teal-600 dark:text-teal-400"
              />
            </h3>
            <p class="text-muted text-sm">
              Tuned for speed with minimal load times
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-sparkles"
                  class="w-8 h-8 text-cyan-600 dark:text-cyan-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextShimmerWave
                text="Beautiful Effects"
                :duration="1.2"
                :z-distance="12"
                class="inline-block text-cyan-600 dark:text-cyan-400"
              />
            </h3>
            <p class="text-muted text-sm">
              Stunning animations that captivate your audience
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-code"
                  class="w-8 h-8 text-green-600 dark:text-green-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextShimmerWave
                text="Plug-in ready"
                :duration="1.1"
                :z-distance="11"
                class="inline-block text-green-600 dark:text-green-400"
              />
            </h3>
            <p class="text-muted text-sm">
              Quick to add with clean, well-documented code
            </p>
          </UCard>
        </div>

        <div class="mt-10 text-center">
          <UButton
            size="lg"
            color="primary"
            class="px-8 py-3 text-lg"
          >
            <MTextShimmerWave
              text="Get Started Now"
              :duration="1.3"
              :z-distance="13"
              class="font-bold"
            />
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const waveSettings = ref({
  title: 'Transform Your Digital Experience',
  subtitle: 'Create stunning interfaces with our collection of animated components that enhance user engagement and drive results.',
  elementType: 'h1',
  duration: 1,
  zDistance: 10,
  xDistance: 2,
  yDistance: -2,
  scaleDistance: 1.1,
  rotateYDistance: 10,
  titleClass: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600',
})

const elementTypes = [
  { value: 'h1', label: 'H1' },
  { value: 'h2', label: 'H2' },
  { value: 'h3', label: 'H3' },
  { value: 'p', label: 'P' },
  { value: 'span', label: 'Span' },
  { value: 'div', label: 'Div' },
]

const presetStyles = [
  {
    name: 'Ocean',
    class: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600',
  },
  {
    name: 'Sunset',
    class: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500',
  },
  {
    name: 'Forest',
    class: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600',
  },
  {
    name: 'Purple',
    class: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600',
  },
]

const currentPreset = ref('Ocean')

const applyPreset = (style) => {
  currentPreset.value = style.name
  waveSettings.value.titleClass = style.class
}
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-shimmer-wave-custom" />
  :::
#code
  <PlaygroundCode name="TextShimmerWave" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="''"}
  Text to shimmer with wave effect.
  ::

  ::component-prop{name="as" type="string" default="'span'"}
  HTML element to render as.
  ::

  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes to apply to the container.
  ::

  ::component-prop{name="duration" type="number" default="1"}
  Animation duration in seconds for one character's cycle.
  ::

  ::component-prop{name="zDistance" type="number" default="10"}
  Z-axis movement distance.
  ::

  ::component-prop{name="xDistance" type="number" default="2"}
  X-axis movement distance.
  ::

  ::component-prop{name="yDistance" type="number" default="-2"}
  Y-axis movement distance.
  ::

  ::component-prop{name="spread" type="number" default="1"}
  Spread of the wave effect. Divides the per-character stagger, so larger spreads pull the characters closer together in time.
  ::

  ::component-prop{name="scaleDistance" type="number" default="1.1"}
  Scale transformation distance.
  ::

  ::component-prop{name="rotateYDistance" type="number" default="10"}
  Y-axis rotation distance, in degrees.
  ::

  ::component-prop{name="transition" type="object" default="{}"}
  Custom transition options, merged over the generated per-character transition.
  ::

  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textShimmerWave` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-block [perspective:500px] [--base-color:#a1a1aa] [--base-gradient-color:#000] dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]`
  ::
  ::component-slot-row{name="char"}
  `inline-block whitespace-pre [transform-style:preserve-3d]`
  ::
::

## Accessibility

The text is split into one element per character for animation, so the DOM reads as a run of single-letter spans rather than words. Screen readers still read the string in order, but character-by-character grouping can affect pronunciation and selection — for long or important copy, prefer [TextShimmer](/components/text-shimmer), which keeps the text in a single node.

The root carries no `aria-label`, and there is no `prefers-reduced-motion` handling: the loop runs regardless. For reduced-motion contexts, fall back to static text.

## Performance

- Each character is its own animated element, so cost scales with the length of the string — keep wave text short, especially on pages with several instances.
- The animations run on `transform` (`translateZ`/`translateX`/`translateY`/`scale`/`rotateY`) and `color`, and the parent reserves 3D space with `perspective: 500px` and `transform-style: preserve-3d`, so the wave is composited rather than laid out each frame.
- The per-character delay and `repeatDelay` are derived once from `length`, `duration`, and `spread`; changing any of them re-renders the transition objects but creates no new elements.
