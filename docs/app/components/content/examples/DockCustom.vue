<template>
  <ComponentPlayground
    name="Dock"
    min-height="360px"
    :hide="['position', 'ariaLabel', 'showLabels', 'animation']"
    :defaults="{
      position: 'inline',
      magnification: 80,
      distance: 140,
      panelHeight: 64,
    }"
    :controls="{
      variant: { kind: 'select', options: variantOptions },
      size: { kind: 'select', options: sizeOptions },
      background: { kind: 'select', options: backgroundOptions },
    }"
  >
    <MDockItem
      v-for="app in apps"
      :key="app.name"
      v-slot="{ width, isHovered, scale }"
      :aria-label="app.name"
      @click="openApp(app)"
    >
      <MDockLabel :is-hovered="isHovered">
        {{ app.name }}
      </MDockLabel>
      <MDockIcon
        :width="width"
        :scale="scale"
        :name="app.icon"
        class="rounded-full"
      />
    </MDockItem>
  </ComponentPlayground>
</template>

<script setup lang="ts">
const apps = [
  { name: 'Home', icon: 'i-lucide-home' },
  { name: 'Products', icon: 'i-lucide-package' },
  { name: 'Messages', icon: 'i-lucide-message-circle' },
  { name: 'Mail', icon: 'i-lucide-mail' },
  { name: 'Photos', icon: 'i-lucide-image' },
  { name: 'Music', icon: 'i-lucide-music' },
  { name: 'Settings', icon: 'i-lucide-settings' },
]

const variantOptions = [
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top', value: 'top' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Floating', value: 'floating' },
  { label: 'Compact', value: 'compact' },
]

const sizeOptions = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
]

const backgroundOptions = [
  { label: 'Glass', value: 'glass' },
  { label: 'Solid', value: 'solid' },
  { label: 'None', value: 'none' },
]

const openApp = (app: { name: string }) => {
  // In a real app this would launch the application.
  console.log('Opening', app.name)
}
</script>
