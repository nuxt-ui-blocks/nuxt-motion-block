<template>
  <div class="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 rounded-2xl">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full mb-4">
          <UIcon
            name="i-lucide-type"
            class="w-5 h-5 text-purple-400"
          />
          <span class="text-purple-400 font-medium">Text Morphing</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          <MTextMorph
            :text="morphSettings.title"
            :as="morphSettings.elementType"
            :transition="morphSettings.transition"
            :class="morphSettings.titleClass"
          />
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          <MTextMorph
            :text="morphSettings.subtitle"
            :transition="morphSettings.subtitleTransition"
            class="inline-block"
          />
        </p>
      </div>

      <!-- Controls and Preview -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Controls Panel -->
        <div class="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h2 class="text-2xl font-bold mb-6 flex items-center">
            <UIcon
              name="i-lucide-sliders"
              class="w-6 h-6 mr-2 text-purple-400"
            />
            Morph Controls
          </h2>

          <div class="space-y-6">
            <!-- Text Inputs -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Title Text</label>
              <UInput
                v-model="morphSettings.title"
                placeholder="Enter title text"
                size="lg"
              />
            </div>

            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Subtitle Text</label>
              <UInput
                v-model="morphSettings.subtitle"
                placeholder="Enter subtitle text"
                size="lg"
              />
            </div>

            <!-- Element Type -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Element Type</label>
              <div class="grid grid-cols-3 gap-2">
                <UButton
                  v-for="type in elementTypes"
                  :key="type.value"
                  :color="morphSettings.elementType === type.value ? 'primary' : 'gray'"
                  variant="solid"
                  size="sm"
                  @click="morphSettings.elementType = type.value"
                >
                  {{ type.label }}
                </UButton>
              </div>
            </div>

            <!-- Transition Type -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Transition Type</label>
              <div class="grid grid-cols-2 gap-2">
                <UButton
                  v-for="type in transitionTypes"
                  :key="type.value"
                  :color="morphSettings.transition.type === type.value ? 'primary' : 'gray'"
                  variant="solid"
                  size="sm"
                  @click="setTransitionType(type.value)"
                >
                  {{ type.label }}
                </UButton>
              </div>
            </div>

            <!-- Spring Controls -->
            <div
              v-if="morphSettings.transition.type === 'spring'"
              class="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Stiffness: {{ morphSettings.transition.stiffness }}
                </label>
                <input
                  v-model="morphSettings.transition.stiffness"
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Damping: {{ morphSettings.transition.damping }}
                </label>
                <input
                  v-model="morphSettings.transition.damping"
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>
            </div>

            <!-- Tween Controls -->
            <div
              v-if="morphSettings.transition.type === 'tween'"
              class="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Duration: {{ morphSettings.transition.duration }}s
                </label>
                <input
                  v-model="morphSettings.transition.duration"
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">Easing</label>
                <select
                  v-model="morphSettings.transition.ease"
                  class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="easeIn">
                    Ease In
                  </option>
                  <option value="easeOut">
                    Ease Out
                  </option>
                  <option value="easeInOut">
                    Ease In/Out
                  </option>
                  <option value="linear">
                    Linear
                  </option>
                </select>
              </div>
            </div>

            <!-- Preset Styles -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Preset Styles</label>
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
        <div class="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h2 class="text-2xl font-bold mb-6 flex items-center">
            <UIcon
              name="i-lucide-monitor"
              class="w-6 h-6 mr-2 text-purple-400"
            />
            Live Preview
          </h2>

          <div class="space-y-8">
            <!-- Title Preview -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Title Preview
              </h3>
              <div class="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <MTextMorph
                  :text="morphSettings.title"
                  :as="morphSettings.elementType"
                  :transition="morphSettings.transition"
                  :class="morphSettings.titleClass"
                />
              </div>
            </div>

            <!-- Subtitle Preview -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Subtitle Preview
              </h3>
              <div class="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <MTextMorph
                  :text="morphSettings.subtitle"
                  :transition="morphSettings.subtitleTransition"
                  class="text-xl"
                />
              </div>
            </div>

            <!-- Example Usage -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Example Usage
              </h3>
              <div class="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Feature Highlight</span>
                    <MTextMorph
                      :text="featureText"
                      :transition="{ type: 'spring', stiffness: 300, damping: 15 }"
                      class="text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    />
                  </div>

                  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Performance</span>
                    <MTextMorph
                      :text="performanceText"
                      :transition="{ type: 'tween', duration: 0.5, ease: 'easeInOut' }"
                      class="text-lg font-bold text-green-600 dark:text-green-400"
                    />
                  </div>

                  <div class="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <MTextMorph
                      :text="ctaText"
                      :transition="{ type: 'spring', stiffness: 350, damping: 18 }"
                      class="text-2xl font-bold text-purple-600 dark:text-purple-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Showcase -->
      <div class="bg-white dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <h2 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          <MTextMorph
            :text="showcaseTitle"
            :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
            class="inline-block"
          />
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-zap"
                  class="w-8 h-8 text-purple-600 dark:text-purple-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextMorph
                :text="feature1.title"
                :transition="{ type: 'spring', stiffness: 300, damping: 15 }"
                class="inline-block text-purple-600 dark:text-purple-400"
              />
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{ feature1.description }}
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-sparkles"
                  class="w-8 h-8 text-pink-600 dark:text-pink-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextMorph
                :text="feature2.title"
                :transition="{ type: 'tween', duration: 0.4, ease: 'easeOut' }"
                class="inline-block text-pink-600 dark:text-pink-400"
              />
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{ feature2.description }}
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-code"
                  class="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextMorph
                :text="feature3.title"
                :transition="{ type: 'spring', stiffness: 250, damping: 12 }"
                class="inline-block text-indigo-600 dark:text-indigo-400"
              />
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{ feature3.description }}
            </p>
          </UCard>
        </div>

        <div class="mt-10 text-center">
          <UButton
            size="lg"
            color="primary"
            class="px-8 py-3 text-lg"
            @click="cycleTexts"
          >
            <MTextMorph
              :text="ctaButtonText"
              :transition="{ type: 'spring', stiffness: 350, damping: 18 }"
              class="font-bold"
            />
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const morphSettings = ref({
  title: 'Transform Your Digital Experience',
  subtitle: 'Create stunning interfaces with our collection of animated components that enhance user engagement and drive results.',
  elementType: 'h1',
  transition: { type: 'spring', stiffness: 500, damping: 10 },
  subtitleTransition: { type: 'tween', duration: 0.3, ease: 'easeOut' },
  titleClass: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600',
})

const elementTypes = [
  { value: 'h1', label: 'H1' },
  { value: 'h2', label: 'H2' },
  { value: 'h3', label: 'H3' },
  { value: 'p', label: 'P' },
  { value: 'span', label: 'Span' },
  { value: 'div', label: 'Div' },
]

const transitionTypes = [
  { value: 'spring', label: 'Spring' },
  { value: 'tween', label: 'Tween' },
]

const presetStyles = [
  {
    name: 'Purple',
    class: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600',
  },
  {
    name: 'Ocean',
    class: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600',
  },
  {
    name: 'Sunset',
    class: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500',
  },
  {
    name: 'Forest',
    class: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600',
  },
]

const currentPreset = ref('Purple')

// Dynamic text examples
const featureTexts = ['New!', 'Hot!', 'Trending!', 'Popular!']
const performanceTexts = ['99.9% Uptime', 'Speedy loads', 'Reliable', 'Stable']
const ctaTexts = ['Get Started Today', 'Join Now', 'Sign Up', 'Try It Free']
const showcaseTitles = ['Why Choose Our Effects?', 'Amazing Features', 'Capable tools', 'Innovative Solutions']
const ctaButtonTexts = ['Get Started Now', 'Learn More', 'Explore Features', 'See Demo']

const featureTextIndex = ref(0)
const performanceTextIndex = ref(0)
const ctaTextIndex = ref(0)
const showcaseTitleIndex = ref(0)
const ctaButtonIndex = ref(0)

const featureText = computed(() => featureTexts[featureTextIndex.value])
const performanceText = computed(() => performanceTexts[performanceTextIndex.value])
const ctaText = computed(() => ctaTexts[ctaTextIndex.value])
const showcaseTitle = computed(() => showcaseTitles[showcaseTitleIndex.value])
const ctaButtonText = computed(() => ctaButtonTexts[ctaButtonIndex.value])

// Feature data
const features = [
  {
    title: ['Blazing quick', 'Ultra Fast', 'Super Fast', 'Hyper Fast'],
    description: 'Tuned for speed with minimal load times',
  },
  {
    title: ['Beautiful Effects', 'Stunning FX', 'Gorgeous Animations', 'Awesome Effects'],
    description: 'Stunning animations that captivate your audience',
  },
  {
    title: ['Plug-in ready', 'Simple Setup', 'Quick Install', 'Frictionless fit'],
    description: 'Quick to add with clean, well-documented code',
  },
]

const feature1Index = ref(0)
const feature2Index = ref(0)
const feature3Index = ref(0)

const feature1 = computed(() => ({
  title: features[0].title[feature1Index.value],
  description: features[0].description,
}))

const feature2 = computed(() => ({
  title: features[1].title[feature2Index.value],
  description: features[1].description,
}))

const feature3 = computed(() => ({
  title: features[2].title[feature3Index.value],
  description: features[2].description,
}))

// Set transition type
const setTransitionType = (type) => {
  if (type === 'spring') {
    morphSettings.value.transition = { type: 'spring', stiffness: 500, damping: 10 }
  }
  else {
    morphSettings.value.transition = { type: 'tween', duration: 0.5, ease: 'easeOut' }
  }
}

// Apply preset style
const applyPreset = (style) => {
  currentPreset.value = style.name
  morphSettings.value.titleClass = style.class
}

// Cycle through dynamic texts
const cycleTexts = () => {
  featureTextIndex.value = (featureTextIndex.value + 1) % featureTexts.length
  performanceTextIndex.value = (performanceTextIndex.value + 1) % performanceTexts.length
  ctaTextIndex.value = (ctaTextIndex.value + 1) % ctaTexts.length
  showcaseTitleIndex.value = (showcaseTitleIndex.value + 1) % showcaseTitles.length
  ctaButtonIndex.value = (ctaButtonIndex.value + 1) % ctaButtonTexts.length
  feature1Index.value = (feature1Index.value + 1) % features[0].title.length
  feature2Index.value = (feature2Index.value + 1) % features[1].title.length
  feature3Index.value = (feature3Index.value + 1) % features[2].title.length
}

// Auto-cycle texts periodically
let cycleTimer

onMounted(() => {
  cycleTimer = setInterval(() => {
    cycleTexts()
  }, 3000)
})

onBeforeUnmount(() => {
  clearInterval(cycleTimer)
})
</script>
