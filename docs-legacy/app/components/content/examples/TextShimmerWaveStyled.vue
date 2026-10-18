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
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
        <div class="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
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
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Title Text</label>
              <UInput
                v-model="waveSettings.title"
                placeholder="Enter title text"
                size="lg"
              />
            </div>

            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Subtitle Text</label>
              <UInput
                v-model="waveSettings.subtitle"
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
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Duration: {{ waveSettings.duration }}s
                </label>
                <input
                  v-model="waveSettings.duration"
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Z Distance: {{ waveSettings.zDistance }}
                </label>
                <input
                  v-model="waveSettings.zDistance"
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  X Distance: {{ waveSettings.xDistance }}
                </label>
                <input
                  v-model="waveSettings.xDistance"
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Y Distance: {{ waveSettings.yDistance }}
                </label>
                <input
                  v-model="waveSettings.yDistance"
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>
            </div>

            <!-- Advanced Controls -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Scale: {{ waveSettings.scaleDistance }}
                </label>
                <input
                  v-model="waveSettings.scaleDistance"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Rotate Y: {{ waveSettings.rotateYDistance }}
                </label>
                <input
                  v-model="waveSettings.rotateYDistance"
                  type="range"
                  min="0"
                  max="45"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
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
              class="w-6 h-6 mr-2 text-teal-400"
            />
            Live Preview
          </h2>

          <div class="space-y-8">
            <!-- Title Preview -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
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
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
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
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Example Usage
              </h3>
              <div class="p-6 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Feature Highlight</span>
                    <MTextShimmerWave
                      text="New!"
                      :duration="1"
                      :z-distance="10"
                      class="text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                    />
                  </div>

                  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Performance</span>
                    <MTextShimmerWave
                      text="99.9% Uptime"
                      :duration="1.5"
                      :z-distance="15"
                      class="text-lg font-bold text-green-600 dark:text-green-400"
                    />
                  </div>

                  <div class="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
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
      <div class="bg-white dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <h2 class="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
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
                text="Lightning Fast"
                :duration="1"
                :z-distance="10"
                class="inline-block text-teal-600 dark:text-teal-400"
              />
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Optimized for performance with minimal load times
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
            <p class="text-gray-600 dark:text-gray-400 text-sm">
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
                text="Easy Integration"
                :duration="1.1"
                :z-distance="11"
                class="inline-block text-green-600 dark:text-green-400"
              />
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
