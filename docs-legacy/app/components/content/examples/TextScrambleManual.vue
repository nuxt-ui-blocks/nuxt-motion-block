<template>
  <div class="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900 rounded-2xl">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full mb-4">
          <UIcon
            name="i-lucide-zap"
            class="w-5 h-5 text-indigo-400"
          />
          <span class="text-indigo-400 font-medium">Text Scrambling</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          <MTextScramble
            :text="scrambleSettings.title"
            :as="scrambleSettings.elementType"
            :duration="scrambleSettings.duration"
            :speed="scrambleSettings.speed"
            :character-set="scrambleSettings.characterSet"
            :trigger="titleTrigger"
            :class="scrambleSettings.titleClass"
          />
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          <MTextScramble
            :text="scrambleSettings.subtitle"
            :duration="scrambleSettings.duration * 1.2"
            :speed="scrambleSettings.speed * 1.2"
            :trigger="subtitleTrigger"
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
              class="w-6 h-6 mr-2 text-indigo-400"
            />
            Scramble Controls
          </h2>

          <div class="space-y-6">
            <!-- Text Inputs -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Title Text</label>
              <UInput
                v-model="scrambleSettings.title"
                placeholder="Enter title text"
                size="lg"
              />
            </div>

            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Subtitle Text</label>
              <UInput
                v-model="scrambleSettings.subtitle"
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
                  :color="scrambleSettings.elementType === type.value ? 'primary' : 'gray'"
                  variant="solid"
                  size="sm"
                  @click="scrambleSettings.elementType = type.value"
                >
                  {{ type.label }}
                </UButton>
              </div>
            </div>

            <!-- Animation Controls -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Duration: {{ scrambleSettings.duration }}s
                </label>
                <input
                  v-model="scrambleSettings.duration"
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Speed: {{ scrambleSettings.speed }}
                </label>
                <input
                  v-model="scrambleSettings.speed"
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>
            </div>

            <!-- Character Set -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Character Set</label>
              <div class="grid grid-cols-2 gap-2">
                <UButton
                  v-for="charset in characterSets"
                  :key="charset.value"
                  :color="scrambleSettings.characterSet === charset.value ? 'primary' : 'gray'"
                  variant="solid"
                  size="sm"
                  @click="scrambleSettings.characterSet = charset.value"
                >
                  {{ charset.label }}
                </UButton>
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
              class="w-6 h-6 mr-2 text-indigo-400"
            />
            Live Preview
          </h2>

          <div class="space-y-8">
            <!-- Title Preview -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Title Preview
              </h3>
              <div class="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <MTextScramble
                  :text="scrambleSettings.title"
                  :as="scrambleSettings.elementType"
                  :duration="scrambleSettings.duration"
                  :speed="scrambleSettings.speed"
                  :character-set="scrambleSettings.characterSet"
                  :trigger="titleTrigger"
                  :class="scrambleSettings.titleClass"
                />
                <div class="mt-4">
                  <UButton
                    color="primary"
                    size="sm"
                    @click="triggerTitleScramble"
                  >
                    Scramble Title
                  </UButton>
                </div>
              </div>
            </div>

            <!-- Subtitle Preview -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Subtitle Preview
              </h3>
              <div class="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <MTextScramble
                  :text="scrambleSettings.subtitle"
                  :duration="scrambleSettings.duration * 1.2"
                  :speed="scrambleSettings.speed * 1.2"
                  :character-set="scrambleSettings.characterSet"
                  :trigger="subtitleTrigger"
                  class="text-xl"
                />
                <div class="mt-4">
                  <UButton
                    color="primary"
                    size="sm"
                    @click="triggerSubtitleScramble"
                  >
                    Scramble Subtitle
                  </UButton>
                </div>
              </div>
            </div>

            <!-- Example Usage -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Example Usage
              </h3>
              <div class="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Feature Highlight</span>
                    <MTextScramble
                      text="New!"
                      :duration="0.5"
                      :speed="0.03"
                      :character-set="characterSets[0].value"
                      :trigger="featureTrigger"
                      class="text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    />
                    <UButton
                      color="gray"
                      size="xs"
                      @click="triggerFeatureScramble"
                    >
                      Scramble
                    </UButton>
                  </div>

                  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Performance</span>
                    <MTextScramble
                      text="99.9% Uptime"
                      :duration="0.7"
                      :speed="0.04"
                      :character-set="characterSets[1].value"
                      :trigger="performanceTrigger"
                      class="text-lg font-bold text-green-600 dark:text-green-400"
                    />
                    <UButton
                      color="gray"
                      size="xs"
                      @click="triggerPerformanceScramble"
                    >
                      Scramble
                    </UButton>
                  </div>

                  <div class="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <MTextScramble
                      text="Get Started Today"
                      :duration="0.8"
                      :speed="0.035"
                      :character-set="characterSets[0].value"
                      :trigger="ctaTrigger"
                      class="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
                    />
                    <div class="mt-4">
                      <UButton
                        color="primary"
                        size="sm"
                        @click="triggerCtaScramble"
                      >
                        Scramble CTA
                      </UButton>
                    </div>
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
          <MTextScramble
            text="Why Choose Our Scramble Effects?"
            :duration="0.8"
            :speed="0.04"
            :trigger="showcaseTrigger"
            class="inline-block"
          />
          <div class="mt-4">
            <UButton
              color="primary"
              size="sm"
              @click="triggerShowcaseScramble"
            >
              Scramble Title
            </UButton>
          </div>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-zap"
                  class="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextScramble
                text="Lightning Fast"
                :duration="0.5"
                :speed="0.03"
                :trigger="feature1Trigger"
                class="inline-block text-indigo-600 dark:text-indigo-400"
              />
              <div class="mt-2">
                <UButton
                  color="gray"
                  size="xs"
                  @click="triggerFeature1Scramble"
                >
                  Scramble
                </UButton>
              </div>
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Optimized for performance with minimal load times
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-sparkles"
                  class="w-8 h-8 text-purple-600 dark:text-purple-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextScramble
                text="Beautiful Effects"
                :duration="0.6"
                :speed="0.035"
                :trigger="feature2Trigger"
                class="inline-block text-purple-600 dark:text-purple-400"
              />
              <div class="mt-2">
                <UButton
                  color="gray"
                  size="xs"
                  @click="triggerFeature2Scramble"
                >
                  Scramble
                </UButton>
              </div>
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Stunning animations that captivate your audience
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-code"
                  class="w-8 h-8 text-pink-600 dark:text-pink-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextScramble
                text="Easy Integration"
                :duration="0.55"
                :speed="0.032"
                :trigger="feature3Trigger"
                class="inline-block text-pink-600 dark:text-pink-400"
              />
              <div class="mt-2">
                <UButton
                  color="gray"
                  size="xs"
                  @click="triggerFeature3Scramble"
                >
                  Scramble
                </UButton>
              </div>
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Simple to implement with clean, well-documented code
            </p>
          </UCard>
        </div>

        <div class="mt-10 text-center">
          <UButton
            size="lg"
            color="primary"
            class="px-8 py-3 text-lg"
          >
            <MTextScramble
              text="Get Started Now"
              :duration="0.7"
              :speed="0.038"
              :trigger="ctaButtonTrigger"
              class="font-bold"
            />
            <div class="mt-2">
              <UButton
                color="white"
                size="sm"
                @click="triggerCtaButtonScramble"
              >
                Scramble Text
              </UButton>
            </div>
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scrambleSettings = ref({
  title: 'Transform Your Digital Experience',
  subtitle: 'Create stunning interfaces with our collection of animated components that enhance user engagement and drive results.',
  elementType: 'h1',
  duration: 0.8,
  speed: 0.04,
  characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  titleClass: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600',
})

const elementTypes = [
  { value: 'h1', label: 'H1' },
  { value: 'h2', label: 'H2' },
  { value: 'h3', label: 'H3' },
  { value: 'p', label: 'P' },
  { value: 'span', label: 'Span' },
  { value: 'div', label: 'Div' },
]

const characterSets = [
  { value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', label: 'Alphanumeric' },
  { value: '!@#$%^&*()_+-=[]{}|;:,.<>?', label: 'Symbols' },
  { value: '0123456789', label: 'Numbers' },
  { value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', label: 'Uppercase' },
]

const presetStyles = [
  {
    name: 'Indigo',
    class: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600',
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

const currentPreset = ref('Indigo')

// Triggers for all scramble elements
const titleTrigger = ref(true)
const subtitleTrigger = ref(true)
const featureTrigger = ref(true)
const performanceTrigger = ref(true)
const ctaTrigger = ref(true)
const showcaseTrigger = ref(true)
const feature1Trigger = ref(true)
const feature2Trigger = ref(true)
const feature3Trigger = ref(true)
const ctaButtonTrigger = ref(true)

// Trigger functions for each element
const triggerTitleScramble = () => {
  titleTrigger.value = false
  setTimeout(() => titleTrigger.value = true, 10)
}

const triggerSubtitleScramble = () => {
  subtitleTrigger.value = false
  setTimeout(() => subtitleTrigger.value = true, 10)
}

const triggerFeatureScramble = () => {
  featureTrigger.value = false
  setTimeout(() => featureTrigger.value = true, 10)
}

const triggerPerformanceScramble = () => {
  performanceTrigger.value = false
  setTimeout(() => performanceTrigger.value = true, 10)
}

const triggerCtaScramble = () => {
  ctaTrigger.value = false
  setTimeout(() => ctaTrigger.value = true, 10)
}

const triggerShowcaseScramble = () => {
  showcaseTrigger.value = false
  setTimeout(() => showcaseTrigger.value = true, 10)
}

const triggerFeature1Scramble = () => {
  feature1Trigger.value = false
  setTimeout(() => feature1Trigger.value = true, 10)
}

const triggerFeature2Scramble = () => {
  feature2Trigger.value = false
  setTimeout(() => feature2Trigger.value = true, 10)
}

const triggerFeature3Scramble = () => {
  feature3Trigger.value = false
  setTimeout(() => feature3Trigger.value = true, 10)
}

const triggerCtaButtonScramble = () => {
  ctaButtonTrigger.value = false
  setTimeout(() => ctaButtonTrigger.value = true, 10)
}

// Apply preset style
const applyPreset = (style) => {
  currentPreset.value = style.name
  scrambleSettings.value.titleClass = style.class
}
</script>
