<template>
  <div class="min-h-screen p-8">
    <!-- Global Cursor -->
    <MCursor
      v-if="!attachToParent"
      :spring-config="springConfig"
    >
      <div class="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
        <div class="w-2 h-2 rounded-full" />
      </div>
    </MCursor>

    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div
          class="relative p-8 border-2 border-dashed border-blue-300 rounded-xl h-64"
          @mouseover="activeContainer = 'blue'"
          @mouseout="activeContainer = ''"
        >
          <MCursor
            v-if="attachToParent && activeContainer === 'blue'"
            :attach-to-parent="true"
            :spring-config="springConfig"
          >
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <div class="w-2 h-2 rounded-full" />
            </div>
          </MCursor>
          <h3 class="text-xl font-semibold mb-2">
            Blue Container
          </h3>
          <p>Custom cursor appears only in this area</p>
        </div>

        <div
          class="relative p-8 border-2 border-dashed border-red-300 rounded-xl h-64"
          @mouseover="activeContainer = 'red'"
          @mouseout="activeContainer = ''"
        >
          <MCursor
            v-if="attachToParent && activeContainer === 'red'"
            :attach-to-parent="true"
            :spring-config="springConfig"
          >
            <div class="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <div class="w-2 h-2 rounded-full" />
            </div>
          </MCursor>
          <h3 class="text-xl font-semibold mb-2">
            Red Container
          </h3>
          <p>Custom cursor appears only in this area</p>
        </div>
      </div>

      <div class="p-6 rounded-xl">
        <h2 class="text-2xl font-semibold mb-4">
          Control Panel
        </h2>

        <div class="space-y-4">
          <UFormField
            label="Cursor Mode"
            name="cursorMode"
          >
            <URadioGroup
              v-model="attachToParent"
              :options="[
                { value: false, label: 'Global Cursor' },
                { value: true, label: 'Container-Specific Cursor' },
              ]"
            />
          </UFormField>

          <UFormField
            label="Spring Stiffness"
            name="stiffness"
          >
            <USlider
              v-model="springConfig.stiffness"
              :min="50"
              :max="500"
            />
            <span class="text-sm text-gray-500 ml-2">{{ springConfig.stiffness }}</span>
          </UFormField>

          <UFormField
            label="Spring Damping"
            name="damping"
          >
            <USlider
              v-model="springConfig.damping"
              :min="5"
              :max="50"
            />
            <span class="text-sm text-gray-500 ml-2">{{ springConfig.damping }}</span>
          </UFormField>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const attachToParent = ref(true)
const springConfig = ref({
  stiffness: 200,
  damping: 15,
  mass: 0.1,
})
const activeContainer = ref('')
</script>
