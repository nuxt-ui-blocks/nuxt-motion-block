<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-highlighted mb-6">
      DynamicGroup Demo
    </h1>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-highlighted">
            Reorderable List
          </h2>
        </template>
        <div class="space-y-3">
          <MDynamicGroup
            :items="reorderItems"
            direction="column"
            :layout="true"
            key-field="id"
          >
            <template #item="{ item, index, remove }">
              <UCard>
                <div class="flex items-center gap-3">
                  <span class="text-xs font-mono text-muted w-6">{{ index + 1 }}.</span>
                  <span class="flex-1 text-sm text-highlighted">{{ item.label }}</span>
                  <UButton
                    icon="i-lucide-arrow-up"
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    :disabled="index === 0"
                    @click="moveUp(index)"
                  />
                  <UButton
                    icon="i-lucide-arrow-down"
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    :disabled="index === reorderItems.length - 1"
                    @click="moveDown(index)"
                  />
                  <UButton
                    icon="i-lucide-x"
                    color="error"
                    variant="ghost"
                    size="xs"
                    @click="remove()"
                  />
                </div>
              </UCard>
            </template>
          </MDynamicGroup>
          <UButton
            label="Add Item"
            icon="i-lucide-plus"
            color="primary"
            variant="outline"
            size="sm"
            @click="addReorderItem"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-highlighted">
            Add / Remove Items
          </h2>
        </template>
        <div class="space-y-3">
          <div class="flex gap-2 mb-3">
            <UInput
              v-model="newItemText"
              placeholder="New item..."
              class="flex-1"
              @keyup.enter="addItem"
            />
            <UButton
              label="Add"
              color="primary"
              size="sm"
              @click="addItem"
            />
          </div>
          <MDynamicGroup
            :items="addRemoveItems"
            direction="column"
            key-field="id"
          >
            <template #item="{ item, remove }">
              <UCard>
                <div class="flex items-center gap-3">
                  <span class="flex-1 text-sm text-highlighted">{{ item.text }}</span>
                  <UButton
                    icon="i-lucide-trash-2"
                    color="error"
                    variant="ghost"
                    size="xs"
                    @click="remove()"
                  />
                </div>
              </UCard>
            </template>
          </MDynamicGroup>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-highlighted">
            Filter with Animation
          </h2>
        </template>
        <div class="space-y-3">
          <div class="flex gap-2 mb-3">
            <UButton
              v-for="cat in categories"
              :key="cat"
              :label="cat"
              :variant="activeCategory === cat ? 'solid' : 'outline'"
              color="primary"
              size="xs"
              @click="activeCategory = cat"
            />
          </div>
          <MDynamicGroup
            :items="filteredItems"
            direction="grid"
            :columns="3"
            key-field="id"
          >
            <template #item="{ item }">
              <UCard>
                <div class="space-y-1">
                  <span class="text-xs font-bold text-primary uppercase">{{ item.category }}</span>
                  <h3 class="text-sm font-medium text-highlighted">
                    {{ item.name }}
                  </h3>
                </div>
              </UCard>
            </template>
          </MDynamicGroup>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-highlighted">
            Grid Layout
          </h2>
        </template>
        <MDynamicGroup
          :items="gridItems"
          direction="grid"
          :columns="4"
          key-field="id"
        >
          <template #item="{ item }">
            <div
              class="aspect-square rounded-xl flex items-center justify-center text-2xl font-bold text-white"
              :style="{ backgroundColor: item.color }"
            >
              {{ item.letter }}
            </div>
          </template>
        </MDynamicGroup>
        <UButton
          label="Shuffle Grid"
          icon="i-lucide-shuffle"
          color="primary"
          variant="outline"
          size="sm"
          class="mt-4"
          @click="shuffleGrid"
        />
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

let idCounter = 0
function nextId() {
  return ++idCounter
}

// Reorder demo
const reorderItems = ref([
  { id: nextId(), label: 'Design system setup' },
  { id: nextId(), label: 'Component library' },
  { id: nextId(), label: 'Animation patterns' },
  { id: nextId(), label: 'Documentation' },
  { id: nextId(), label: 'Testing suite' },
])

function moveUp(index: number) {
  if (index === 0) return
  const arr = [...reorderItems.value]
  ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
  reorderItems.value = arr
}

function moveDown(index: number) {
  if (index === reorderItems.value.length - 1) return
  const arr = [...reorderItems.value]
  ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
  reorderItems.value = arr
}

let reorderCounter = 100
function addReorderItem() {
  reorderItems.value = [...reorderItems.value, { id: nextId(), label: `New task ${reorderCounter++}` }]
}

// Add/remove demo
const newItemText = ref('')
const addRemoveItems = ref([
  { id: nextId(), text: 'Buy groceries' },
  { id: nextId(), text: 'Write documentation' },
  { id: nextId(), text: 'Review PRs' },
])

function addItem() {
  if (!newItemText.value.trim()) return
  addRemoveItems.value = [...addRemoveItems.value, { id: nextId(), text: newItemText.value.trim() }]
  newItemText.value = ''
}

// Filter demo
const categories = ['All', 'Design', 'Dev', 'Content']
const activeCategory = ref('All')
const filterItems = [
  { id: nextId(), name: 'Color Palette', category: 'Design' },
  { id: nextId(), name: 'Typography Scale', category: 'Design' },
  { id: nextId(), name: 'API Routes', category: 'Dev' },
  { id: nextId(), name: 'State Management', category: 'Dev' },
  { id: nextId(), name: 'Blog Post', category: 'Content' },
  { id: nextId(), name: 'Case Study', category: 'Content' },
  { id: nextId(), name: 'Icon System', category: 'Design' },
  { id: nextId(), name: 'Auth Flow', category: 'Dev' },
]

const filteredItems = computed(() => {
  if (activeCategory.value === 'All') return filterItems
  return filterItems.filter(i => i.category === activeCategory.value)
})

// Grid demo
const colors = ['#f43f5e', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#84cc16']
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const gridItems = ref(
  Array.from({ length: 8 }, (_, i) => ({
    id: nextId(),
    letter: letters[i],
    color: colors[i % colors.length],
  })),
)

function shuffleGrid() {
  const arr = [...gridItems.value]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  gridItems.value = arr
}
</script>
