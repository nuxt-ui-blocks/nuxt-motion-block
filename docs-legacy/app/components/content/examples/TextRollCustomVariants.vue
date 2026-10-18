<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 rounded-2xl">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-4">
          <UIcon
            name="i-lucide-rotate-cw"
            class="w-5 h-5 text-blue-400"
          />
          <span class="text-blue-400 font-medium">Text Rolling</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          <MTextRoll
            :children="rollSettings.title"
            :duration="rollSettings.duration"
            :get-enter-delay="getEnterDelay"
            :get-exit-delay="getExitDelay"
            :transition="rollSettings.transition"
            :variants="rollSettings.variants"
            :class="rollSettings.titleClass"
          />
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          <MTextRoll
            :children="rollSettings.subtitle"
            :duration="rollSettings.duration * 1.2"
            :get-enter-delay="(i) => i * rollSettings.stagger * 0.8"
            :get-exit-delay="(i) => i * rollSettings.stagger * 0.8 + 0.3"
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
              class="w-6 h-6 mr-2 text-blue-400"
            />
            Roll Controls
          </h2>

          <div class="space-y-6">
            <!-- Text Inputs -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Title Text</label>
              <UInput
                v-model="rollSettings.title"
                placeholder="Enter title text"
                size="lg"
              />
            </div>

            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Subtitle Text</label>
              <UInput
                v-model="rollSettings.subtitle"
                placeholder="Enter subtitle text"
                size="lg"
              />
            </div>

            <!-- Animation Controls -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Duration: {{ rollSettings.duration }}s
                </label>
                <input
                  v-model="rollSettings.duration"
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>

              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">
                  Stagger: {{ rollSettings.stagger }}
                </label>
                <input
                  v-model="rollSettings.stagger"
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>
            </div>

            <!-- Delay Functions -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Delay Pattern</label>
              <div class="grid grid-cols-2 gap-2">
                <UButton
                  v-for="pattern in delayPatterns"
                  :key="pattern.value"
                  :color="currentDelayPattern === pattern.value ? 'primary' : 'gray'"
                  variant="solid"
                  size="sm"
                  @click="setDelayPattern(pattern.value)"
                >
                  {{ pattern.label }}
                </UButton>
              </div>
            </div>

            <!-- Animation Type -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Animation Type</label>
              <div class="grid grid-cols-2 gap-2">
                <UButton
                  v-for="anim in animationTypes"
                  :key="anim.value"
                  :color="currentAnimation === anim.value ? 'primary' : 'gray'"
                  variant="solid"
                  size="sm"
                  @click="setAnimationType(anim.value)"
                >
                  {{ anim.label }}
                </UButton>
              </div>
            </div>

            <!-- Transition Easing -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 mb-2">Easing</label>
              <div class="grid grid-cols-2 gap-2">
                <UButton
                  v-for="ease in easingTypes"
                  :key="ease.value"
                  :color="rollSettings.transition.ease === ease.value ? 'primary' : 'gray'"
                  variant="solid"
                  size="sm"
                  @click="rollSettings.transition.ease = ease.value"
                >
                  {{ ease.label }}
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
              class="w-6 h-6 mr-2 text-blue-400"
            />
            Live Preview
          </h2>

          <div class="space-y-8">
            <!-- Title Preview -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Title Preview
              </h3>
              <div class="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <MTextRoll
                  :children="rollSettings.title"
                  :duration="rollSettings.duration"
                  :get-enter-delay="getEnterDelay"
                  :get-exit-delay="getExitDelay"
                  :transition="rollSettings.transition"
                  :variants="rollSettings.variants"
                  :class="rollSettings.titleClass"
                />
              </div>
            </div>

            <!-- Subtitle Preview -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Subtitle Preview
              </h3>
              <div class="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <MTextRoll
                  :children="rollSettings.subtitle"
                  :duration="rollSettings.duration * 1.2"
                  :get-enter-delay="(i) => i * rollSettings.stagger * 0.8"
                  :get-exit-delay="(i) => i * rollSettings.stagger * 0.8 + 0.3"
                  :transition="rollSettings.transition"
                  :variants="subtitleVariants"
                  class="text-xl"
                />
              </div>
            </div>

            <!-- Example Usage -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Example Usage
              </h3>
              <div class="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <div class="space-y-6">
                  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Feature Highlight</span>
                    <MTextRoll
                      children="New!"
                      :duration="0.5"
                      :get-enter-delay="(i) => i * 0.05"
                      :get-exit-delay="(i) => i * 0.05 + 0.1"
                      :variants="{ enter: { initial: { rotateX: 0 }, animate: { rotateX: 360 } }, exit: { initial: { rotateX: 360 }, animate: { rotateX: 0 } } }"
                      class="text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                    />
                  </div>

                  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Performance</span>
                    <MTextRoll
                      children="99.9% Uptime"
                      :duration="0.7"
                      :get-enter-delay="(i) => i * 0.07"
                      :variants="{ enter: { initial: { rotateY: 0 }, animate: { rotateY: 180 } }, exit: { initial: { rotateY: 180 }, animate: { rotateY: 0 } } }"
                      class="text-lg font-bold text-green-600 dark:text-green-400"
                    />
                  </div>

                  <div class="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <MTextRoll
                      children="Get Started Today"
                      :duration="0.8"
                      :get-enter-delay="(i) => i * 0.08"
                      :variants="{ enter: { initial: { rotateZ: 0, scale: 0.8 }, animate: { rotateZ: 360, scale: 1 } }, exit: { initial: { rotateZ: 360, scale: 1 }, animate: { rotateZ: 0, scale: 0.8 } } }"
                      class="text-2xl font-bold text-blue-600 dark:text-blue-400"
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
          <MTextRoll
            children="Why Choose Our Roll Effects?"
            :duration="0.8"
            :get-enter-delay="(i) => i * 0.08"
            :variants="{ enter: { initial: { rotateX: 0 }, animate: { rotateX: 180 } }, exit: { initial: { rotateX: 180 }, animate: { rotateX: 0 } } }"
            class="inline-block"
          />
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-zap"
                  class="w-8 h-8 text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextRoll
                children="Lightning Fast"
                :duration="0.5"
                :get-enter-delay="(i) => i * 0.05"
                :variants="{ enter: { initial: { rotateX: 0 }, animate: { rotateX: 90 } }, exit: { initial: { rotateX: 90 }, animate: { rotateX: 0 } } }"
                class="inline-block text-blue-600 dark:text-blue-400"
              />
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Optimized for performance with minimal load times
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-sparkles"
                  class="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextRoll
                children="Beautiful Effects"
                :duration="0.6"
                :get-enter-delay="(i) => i * 0.06"
                :variants="{ enter: { initial: { rotateY: 0 }, animate: { rotateY: 180 } }, exit: { initial: { rotateY: 180 }, animate: { rotateY: 0 } } }"
                class="inline-block text-indigo-600 dark:text-indigo-400"
              />
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Stunning animations that captivate your audience
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-xl transition-shadow">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <UIcon
                  name="i-lucide-code"
                  class="w-8 h-8 text-purple-600 dark:text-purple-400"
                />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              <MTextRoll
                children="Easy Integration"
                :duration="0.55"
                :get-enter-delay="(i) => i * 0.055"
                :variants="{ enter: { initial: { rotateZ: 0, scale: 0.8 }, animate: { rotateZ: 180, scale: 1 } }, exit: { initial: { rotateZ: 180, scale: 1 }, animate: { rotateZ: 0, scale: 0.8 } } }"
                class="inline-block text-purple-600 dark:text-purple-400"
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
            <MTextRoll
              children="Get Started Now"
              :duration="0.7"
              :get-enter-delay="(i) => i * 0.07"
              :variants="{ enter: { initial: { rotateX: 0, scale: 0.9 }, animate: { rotateX: 180, scale: 1 } }, exit: { initial: { rotateX: 180, scale: 1 }, animate: { rotateX: 0, scale: 0.9 } } }"
              class="font-bold"
            />
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const rollSettings = ref({
  title: 'Transform Your Digital Experience',
  subtitle: 'Create stunning interfaces with our collection of animated components that enhance user engagement and drive results.',
  duration: 0.5,
  stagger: 0.1,
  transition: { ease: 'easeIn' },
  variants: {
    enter: { initial: { rotateX: 0 }, animate: { rotateX: 180 } },
    exit: { initial: { rotateX: 180 }, animate: { rotateX: 0 } },
  },
  titleClass: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600',
})

const delayPatterns = [
  { value: 'linear', label: 'Linear' },
  { value: 'reverse', label: 'Reverse' },
  { value: 'center', label: 'Center' },
  { value: 'random', label: 'Random' },
]

const animationTypes = [
  { value: 'rollX', label: 'Roll X' },
  { value: 'rollY', label: 'Roll Y' },
  { value: 'rollZ', label: 'Roll Z' },
  { value: 'combined', label: 'Combined' },
]

const easingTypes = [
  { value: 'easeIn', label: 'Ease In' },
  { value: 'easeOut', label: 'Ease Out' },
  { value: 'easeInOut', label: 'Ease In/Out' },
  { value: 'linear', label: 'Linear' },
]

const presetStyles = [
  {
    name: 'Ocean',
    class: 'text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600',
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

const currentDelayPattern = ref('linear')
const currentAnimation = ref('rollX')
const currentPreset = ref('Ocean')

// Computed delay functions
const getEnterDelay = computed(() => {
  return (i) => {
    switch (currentDelayPattern.value) {
      case 'linear':
        return i * rollSettings.value.stagger
      case 'reverse':
        // This would need the total character count to work properly
        return (10 - i) * rollSettings.value.stagger // Assuming max 10 chars for demo
      case 'center':
        return Math.abs(5 - i) * rollSettings.value.stagger // Assuming max 10 chars for demo
      case 'random':
        return Math.random() * rollSettings.value.stagger * 5
      default:
        return i * rollSettings.value.stagger
    }
  }
})

const getExitDelay = computed(() => {
  return (i) => {
    switch (currentDelayPattern.value) {
      case 'linear':
        return i * rollSettings.value.stagger + 0.2
      case 'reverse':
        return (10 - i) * rollSettings.value.stagger + 0.2
      case 'center':
        return Math.abs(5 - i) * rollSettings.value.stagger + 0.2
      case 'random':
        return Math.random() * rollSettings.value.stagger * 5 + 0.2
      default:
        return i * rollSettings.value.stagger + 0.2
    }
  }
})

// Subtitle variants
const subtitleVariants = computed(() => {
  const baseVariants = rollSettings.value.variants
  return {
    enter: {
      initial: { ...baseVariants.enter.initial, scale: 0.9 },
      animate: { ...baseVariants.enter.animate, scale: 1 },
    },
    exit: {
      initial: { ...baseVariants.exit.initial, scale: 1 },
      animate: { ...baseVariants.exit.animate, scale: 0.9 },
    },
  }
})

// Set delay pattern
const setDelayPattern = (pattern) => {
  currentDelayPattern.value = pattern
}

// Set animation type
const setAnimationType = (type) => {
  currentAnimation.value = type

  switch (type) {
    case 'rollX':
      rollSettings.value.variants = {
        enter: { initial: { rotateX: 0 }, animate: { rotateX: 180 } },
        exit: { initial: { rotateX: 180 }, animate: { rotateX: 0 } },
      }
      break
    case 'rollY':
      rollSettings.value.variants = {
        enter: { initial: { rotateY: 0 }, animate: { rotateY: 180 } },
        exit: { initial: { rotateY: 180 }, animate: { rotateY: 0 } },
      }
      break
    case 'rollZ':
      rollSettings.value.variants = {
        enter: { initial: { rotateZ: 0 }, animate: { rotateZ: 180 } },
        exit: { initial: { rotateZ: 180 }, animate: { rotateZ: 0 } },
      }
      break
    case 'combined':
      rollSettings.value.variants = {
        enter: { initial: { rotateX: 0, rotateY: 0, rotateZ: 0 }, animate: { rotateX: 90, rotateY: 90, rotateZ: 90 } },
        exit: { initial: { rotateX: 90, rotateY: 90, rotateZ: 90 }, animate: { rotateX: 0, rotateY: 0, rotateZ: 0 } },
      }
      break
  }
}

// Apply preset style
const applyPreset = (style) => {
  currentPreset.value = style.name
  rollSettings.value.titleClass = style.class
}
</script>
