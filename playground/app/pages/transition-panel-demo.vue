<template>
  <div class="min-h-screen bg-default p-8">
    <UCard class="mb-8">
      <template #header>
        <h1 class="text-2xl font-bold">
          MTransitionPanel Demo
        </h1>
      </template>

      <div class="space-y-8">
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Tab-style Transitions
          </h2>
          <div class="flex gap-2 mb-4">
            <UButton
              v-for="(tab, i) in tabs"
              :key="i"
              :variant="activeTab === i ? 'solid' : 'outline'"
              :label="tab.label"
              @click="activeTab = i"
            />
          </div>

          <div class="h-40 border border-default rounded-lg overflow-hidden">
            <MTransitionPanel
              :active-index="activeTab"
              :variants="panelVariants"
              :transition="{ duration: 0.3 }"
            >
              <div
                :key="activeTab"
                class="p-6"
              >
                <h3 class="text-lg font-bold">
                  {{ tabs[activeTab].title }}
                </h3>
                <p class="text-muted mt-2">
                  {{ tabs[activeTab].content }}
                </p>
              </div>
            </MTransitionPanel>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Slide Transitions
          </h2>
          <div class="flex gap-2 mb-4">
            <UButton
              v-for="i in 3"
              :key="i"
              :variant="slideIndex === i - 1 ? 'solid' : 'outline'"
              :label="`Slide ${i}`"
              @click="slideIndex = i - 1"
            />
          </div>

          <div class="h-40 border border-default rounded-lg overflow-hidden">
            <MTransitionPanel
              :active-index="slideIndex"
              :variants="slideVariants"
              :transition="{ duration: 0.4, ease: 'easeInOut' }"
            >
              <div
                :key="slideIndex"
                class="p-6 flex items-center justify-center h-40"
              >
                <span class="text-4xl font-bold">{{ ['First', 'Second', 'Third'][slideIndex] }} Slide</span>
              </div>
            </MTransitionPanel>
          </div>
        </div>
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Component: MTransitionPanel
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const activeTab = ref(0)
const slideIndex = ref(0)

const tabs = [
  { label: 'Tab 1', title: 'First Tab', content: 'Content for the first tab with a fade transition.' },
  { label: 'Tab 2', title: 'Second Tab', content: 'Content for the second tab with a fade transition.' },
  { label: 'Tab 3', title: 'Third Tab', content: 'Content for the third tab with a fade transition.' },
]

const panelVariants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const slideVariants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
}
</script>
