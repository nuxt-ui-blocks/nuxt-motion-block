<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MAsciiRender
      :source="{ type: 'image', src: src }"
      alt="Snow-covered mountain ridge under a pale sky"
      :columns="columns"
      :font-size="8"
      :invert="invert"
      :color="color"
      class="h-64 w-full"
    />

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="columns"
        :items="columnItems"
      />
      <USelect
        v-model="color"
        :items="['mono', 'source']"
      />
    </div>

    <UCheckbox
      v-model="invert"
      label="Invert the luminance ramp"
    />
  </div>
</template>

<script setup lang="ts">
const src = 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80'
const columns = ref(90)
const color = ref<'mono' | 'source'>('mono')
const invert = ref(false)

const columnItems = [
  { label: '45 columns', value: 45 },
  { label: '90 columns', value: 90 },
  { label: '160 columns', value: 160 },
]
</script>
