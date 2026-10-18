<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl">
    <div class="max-w-4xl mx-auto text-center mb-8">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
        <UIcon
          name="i-lucide-apps"
          class="w-5 h-5 text-blue-600 dark:text-blue-400"
        />
        <span class="text-blue-700 dark:text-blue-300 font-medium">Application Launcher</span>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Interactive Dock
      </h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Experience our macOS-inspired dock with smooth animations and magnification effects that enhance your application launching experience
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 mb-8">
      <div class="flex flex-col items-center mb-8">
        <div class="w-full max-w-2xl h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 relative overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center p-6">
              <UIcon
                name="i-lucide-monitor"
                class="w-12 h-12 text-gray-400 mx-auto mb-4"
              />
              <p class="text-gray-500 dark:text-gray-400">
                Application preview would appear here
              </p>
            </div>
          </div>
        </div>

        <MDock
          :magnification="dockSettings.magnification"
          :distance="dockSettings.distance"
          :panel-height="dockSettings.panelHeight"
          class="dock-custom"
          variant="bottom"
        >
          <MDockItem
            v-for="(app, index) in apps"
            :key="index"
            v-slot="{ width, isHovered, scale }"
            :aria-label="app.name"
            class="dock-item-custom"
            @click="handleAppClick(app)"
          >
            <MDockLabel :is-hovered="isHovered">
              {{ app.name }}
            </MDockLabel>
            <MDockIcon
              :width="width"
              :scale="scale"
              :name="app.icon"
              class="text-black dark:text-gray-50 aspect-square rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              <div
                :class="[
                  'w-full h-full aspect-square rounded-full flex items-center justify-center text-2xl',
                ]"
                :style="{ fontSize: Math.max(16, width * 0.4) + 'px' }"
              />
            </MDockIcon>
          </MDockItem>
        </MDock>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <UCard class="text-center">
          <UIcon
            name="i-lucide-zap"
            class="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3"
          />
          <h3 class="font-semibold mb-1">
            Smooth Animations
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Fluid transitions and hover effects
          </p>
        </UCard>

        <UCard class="text-center">
          <UIcon
            name="i-lucide-settings"
            class="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3"
          />
          <h3 class="font-semibold mb-1">
            Customizable
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Adjust magnification and spacing
          </p>
        </UCard>

        <UCard class="text-center">
          <UIcon
            name="i-lucide-monitor"
            class="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3"
          />
          <h3 class="font-semibold mb-1">
            Cross-Platform
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Works on all modern browsers
          </p>
        </UCard>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Dock Settings
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-2">Magnification: <span class="font-medium">{{ dockSettings.magnification }}%</span></label>
          <input
            v-model="dockSettings.magnification"
            type="range"
            min="50"
            max="150"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          >
        </div>

        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-2">Distance: <span class="font-medium">{{ dockSettings.distance }}px</span></label>
          <input
            v-model="dockSettings.distance"
            type="range"
            min="50"
            max="300"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          >
        </div>

        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-2">Panel Height: <span class="font-medium">{{ dockSettings.panelHeight }}px</span></label>
          <input
            v-model="dockSettings.panelHeight"
            type="range"
            min="40"
            max="100"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          >
        </div>
      </div>

      <div class="flex flex-wrap gap-4 mt-6">
        <UButton
          color="primary"
          variant="solid"
          @click="resetSettings"
        >
          <UIcon
            name="i-lucide-rotate-ccw"
            class="w-4 h-4 mr-2"
          />
          Reset Settings
        </UButton>
        <UButton
          variant="outline"
          @click="addApp"
        >
          <UIcon
            name="i-lucide-plus"
            class="w-4 h-4 mr-2"
          />
          Add Application
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const apps = ref([
  { name: 'Home', icon: 'i-lucide-home' },
  { name: 'Products', icon: 'i-lucide-package' },
  { name: 'Messages', icon: 'i-lucide-message-circle' },
  { name: 'Mail', icon: 'i-lucide-mail' },
  { name: 'Photos', icon: 'i-lucide-image' },
  { name: 'Music', icon: 'i-lucide-music' },
  { name: 'Calendar', icon: 'i-lucide-calendar' },
  { name: 'Notes', icon: 'i-lucide-file' },
  { name: 'Settings', icon: 'i-lucide-settings' },
])

const dockSettings = reactive({
  magnification: 80,
  distance: 150,
  panelHeight: 64,
})

const handleAppClick = (app: typeof apps.value[0]) => {
  // const title = `Opening ${app.name}`
  // const description = `Launching ${app.name} application...`
  // In a real implementation, this would launch the application
  console.log('Opening app:', app.name)
  alert(`Opening ${app.name} application...`)
}

const resetSettings = () => {
  dockSettings.magnification = 80
  dockSettings.distance = 150
  dockSettings.panelHeight = 64
}

const addApp = () => {
  const newApp = {
    name: `App ${apps.value.length + 1}`,
    icon: 'i-lucide-app',
  }
  apps.value.push(newApp)
}
</script>
