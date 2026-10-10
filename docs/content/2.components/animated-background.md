---
title: Animated Background
description: Animated background that follows interactive elements.
navigation:
  icon: i-lucide-square-stack
---

# Animated Background

The AnimatedBackground component creates animated background effects that follow interactive elements. It's perfect for creating dynamic navigation menus, tab interfaces, or any interactive element group where you want to highlight the active element with a smooth animation.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="animated-background-example" />
  :::
#code
```vue
<template>
  <MAnimatedBackground
    :transition="{ duration: 300 }"
    background-class="bg-blue-500 rounded-lg -z-1"
  >
    <!-- Using NavigationMenu with custom slot to add data-id attributes -->
    <UNavigationMenu 
      :items="navbarItems" 
      class="bg-transparent"
    >
      <template #item="{ item }">
        <ULink
          :to="item.to"
          :data-id="item.id"
          class="px-4 py-2 rounded-md text-muted hover:text-highlighted transition-colors"
        >
          {{ item.label }}
        </ULink>
      </template>
    </UNavigationMenu>
  </MAnimatedBackground>
</template>

<script setup>
const navbarItems = [
  {
    label: 'Home',
    to: '#',
    id: 'home'
  },
  {
    label: 'About',
    to: '#',
    id: 'about'
  },
  {
    label: 'Contact',
    to: '#',
    id: 'contact'
  }
]
</script>
```
::

## Props

::field-group
  ::field{name="defaultValue" type="string | null" default="null"}
  Default active element ID.
  ::
  
  ::field{name="enableHover" type="boolean" default="false"}
  Enable hover interactions.
  ::
  
  ::field{name="backgroundClass" type="string" default="'bg-blue-500 rounded-lg'"}
  CSS classes for the background element.
  ::
  
  ::field{name="containerClass" type="string" default="''"}
  CSS classes for the container.
  ::
  
  ::field{name="transition" type="object" default="{ duration: 300, ease: 'ease-out' }"}
  Transition settings.
  ::
::

## Events

::field-group
  ::field{name="valueChange" type="(value: string | null) => void"}
  Emitted when the active element changes.
  ::
::

## Slots

::field-group
  ::field{name="default" type="{ activeId: string | null, setActiveId: (id: string | null) => void }"}
  Default slot with active ID and setter function.
  ::
::

## Examples

### Basic Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-background-basic" />
  :::
#code
```vue
<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Dashboard Navigation</h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Interactive navigation system with animated background effects that respond to user interactions for enhanced engagement
      </p>
    </div>
    
    <MAnimatedBackground 
      class="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      background-class="bg-blue-500 rounded-lg -z-1"
    >
      <div class="p-2 bg-gray-50 dark:bg-gray-700/50">
        <!-- Using NavigationMenu with custom slot to add data-id attributes -->
        <UNavigationMenu 
          :items="navbarItems" 
          class="flex flex-wrap gap-2 bg-transparent"
        >
          <template #item="{ item }">
            <ULink
              :to="item.to"
              :data-id="item.id"
              class="px-5 py-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-600 flex items-center gap-3 transition-all duration-200 text-muted hover:text-highlighted"
            >
              {{ item.label }}
            </ULink>
          </template>
        </UNavigationMenu>
      </div>
      
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <UCard class="hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Total Revenue</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">$45,231</p>
              </div>
              <div class="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <UIcon name="i-lucide-trending-up" class="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </UCard>
          
          <UCard class="hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Active Users</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">12,458</p>
              </div>
              <div class="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <UIcon name="i-lucide-users" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </UCard>
          
          <UCard class="hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Conversion Rate</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">24.8%</p>
              </div>
              <div class="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <UIcon name="i-lucide-percent" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </UCard>
        </div>
        
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <UButton color="primary" variant="ghost" size="sm">
            View All
          </UButton>
        </div>
        
        <div class="space-y-3">
          <div class="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
              <UIcon name="i-lucide-shopping-cart" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">New order received</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">2 minutes ago</p>
            </div>
            <UButton color="primary" variant="ghost" size="sm">
              View
            </UButton>
          </div>
          
          <div class="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
              <UIcon name="i-lucide-user-plus" class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900 dark:text-white">New user registered</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">15 minutes ago</p>
            </div>
            <UButton color="primary" variant="ghost" size="sm">
              View
            </UButton>
          </div>
        </div>
      </div>
    </MAnimatedBackground>
    
    <div class="mt-6 text-center">
      <p class="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
        <UIcon name="i-lucide-mouse-pointer" class="w-4 h-4" />
        Hover over navigation items to see the animated background effect
      </p>
    </div>
  </div>
</template>

<script setup>
const navbarItems = [
  {
    label: 'Overview',
    to: '#',
    id: 'overview'
  },
  {
    label: 'Analytics',
    to: '#',
    id: 'analytics'
  },
  {
    label: 'Reports',
    to: '#',
    id: 'reports'
  },
  {
    label: 'Users',
    to: '#',
    id: 'users'
  },
  {
    label: 'Settings',
    to: '#',
    id: 'settings'
  }
]
</script>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-background-custom-styling" />
  :::
#code
```vue
<template>
  <MAnimatedBackground
    background-class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg -z-1 p-1"
    :transition="{ duration: 500, ease: 'ease-in-out' }"
  >
    <!-- Using custom tab implementation with data-id attributes -->
    <div class="flex space-x-4 p-2 rounded-full bg-transparent">
      <UButton
        v-for="(item, index) in tabItems"
        :key="index"
        :data-id="item.id"
        :color="activeTab === index ? 'primary' : 'gray'"
        variant="soft"
        size="md"
        class="px-6 py-3 font-medium transition-colors rounded-full"
        :class="activeTab === index ? 'text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'"
        @click="activeTab = index"
      >
        {{ item.label }}
      </UButton>
    </div>
    
    <!-- Tab content -->
    <div class="mt-4 p-4">
      <p>{{ tabItems[activeTab].content }}</p>
    </div>
  </MAnimatedBackground>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const tabItems = [
  {
    label: 'Tab 1',
    content: 'Content for Tab 1',
    id: 'tab1'
  },
  {
    label: 'Tab 2',
    content: 'Content for Tab 2',
    id: 'tab2'
  },
  {
    label: 'Tab 3',
    content: 'Content for Tab 3',
    id: 'tab3'
  }
]
</script>
```
::

### With Hover Activation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-background-hover" />
  :::
#code
```vue
<template>
  <MAnimatedBackground
    enable-hover
    background-class="bg-emerald-500 rounded-lg shadow-lg -z-1"
  >
    <!-- Using NavigationMenu with custom slot to add data-id attributes -->
    <UNavigationMenu 
      :items="navbarItems" 
      class="flex space-x-3 bg-transparent"
    >
      <template #item="{ item }">
        <ULink
          :to="item.to"
          :data-id="item.id"
          class="px-4 py-2 cursor-pointer rounded transition-colors text-muted hover:text-highlighted hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {{ item.label }}
        </ULink>
      </template>
    </UNavigationMenu>
  </MAnimatedBackground>
</template>

<script setup>
const navbarItems = [
  {
    label: 'Navigation 1',
    to: '#',
    id: 'nav1'
  },
  {
    label: 'Navigation 2',
    to: '#',
    id: 'nav2'
  },
  {
    label: 'Navigation 3',
    to: '#',
    id: 'nav3'
  }
]
</script>
```
::

### With Custom Transition

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-background-transition" />
  :::
#code
```vue
<template>
  <MAnimatedBackground
    background-class="-z-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1"
    :transition="{ duration: 500, ease: 'ease-in-out' }"
    enable-hover
  >
    <!-- Using UCard with data-id attributes for hover tracking -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard 
        v-for="(item, index) in ITEMS"
        :key="index"
        :data-id="`card-${index}`"
        class="hover:shadow-md transition-shadow cursor-pointer"
      >
        <div class="flex select-none flex-col gap-2 p-4">
          <h3 class="text-base font-medium text-zinc-800 dark:text-zinc-50">
            {{ item.title }}
          </h3>
          <p class="text-base text-zinc-600 dark:text-zinc-400">
            {{ item.description }}
          </p>
        </div>
      </UCard>
    </div>
    
    <!-- Using custom tab implementation with data-id attributes -->
    <div class="mt-6">
      <div class="mt-4 rounded-lg p-1 bg-zinc-100 dark:bg-zinc-800">
        <div class="flex gap-1">
          <UButton
            v-for="(item, index) in tabItems"
            :key="index"
            :data-id="item.id"
            :color="activeTab === index ? 'white' : 'gray'"
            variant="soft"
            size="sm"
            class="px-4 py-2 font-medium transition-colors rounded-md"
            :class="activeTab === index ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'"
            @click="activeTab = index"
          >
            {{ item.label }}
          </UButton>
        </div>
      </div>
      
      <!-- Tab content -->
      <div class="mt-4 p-4 bg-white dark:bg-zinc-700 rounded-md shadow">
        <p>{{ tabItems[activeTab].content }}</p>
      </div>
    </div>
  </MAnimatedBackground>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)

const ITEMS = [
  {
    id: 1,
    title: 'Dialog',
    description: 'Enhances modal presentations.'
  },
  {
    id: 2,
    title: 'Popover',
    description: 'For small interactive overlays.'
  },
  {
    id: 3,
    title: 'Accordion',
    description: 'Collapsible sections for more content.'
  },
  {
    id: 4,
    title: 'Collapsible',
    description: 'Collapsible sections for more content.'
  },
  {
    id: 5,
    title: 'Drag to Reorder',
    description: 'Reorder items with drag and drop.'
  },
  {
    id: 6,
    title: 'Swipe to Delete',
    description: 'Delete items with swipe gestures.'
  }
]

const tabItems = [
  {
    label: 'Overview',
    content: 'Overview content',
    id: 'overview'
  },
  {
    label: 'Settings',
    content: 'Settings content',
    id: 'settings'
  },
  {
    label: 'Advanced',
    content: 'Advanced content',
    id: 'advanced'
  }
]
</script>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedBackground` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative'` |
| `background` | `'absolute top-0 left-0 pointer-events-none transition-all duration-300 ease-out'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.animatedBackground` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `background` | `absolute top-0 left-0 pointer-events-none transition-all duration-300 ease-out` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.animatedBackground` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `background` | `absolute top-0 left-0 pointer-events-none transition-all duration-300 ease-out` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedBackground` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `background` | `absolute top-0 left-0 pointer-events-none transition-all duration-300 ease-out` |
