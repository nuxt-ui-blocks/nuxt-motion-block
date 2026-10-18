---
title: Animated Background
description: Animated background that follows interactive elements.
---

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
  <div class="flex items-center justify-center">
    <MAnimatedBackground
      default-value="overview"
      :transition="{ duration: 300 }"
      background-class="bg-accented rounded-lg"
      class="inline-flex items-center gap-1 rounded-xl border border-default bg-elevated p-1"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :data-id="tab.id"
        type="button"
        class="relative z-1 rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-highlighted"
      >
        {{ tab.label }}
      </button>
    </MAnimatedBackground>
  </div>
</template>

<script setup>
const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'settings', label: 'Settings' },
]
</script>
```
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
  <div class="w-full max-w-md">
    <MAnimatedBackground
      :default-value="tabs[0].id"
      :transition="{ duration: 250, ease: 'ease-out' }"
      background-class="bg-primary rounded-lg"
      class="flex items-center gap-1 rounded-xl border border-default bg-elevated p-1"
      @value-change="active = $event"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :data-id="tab.id"
        type="button"
        class="relative z-1 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        :class="active === tab.id ? 'text-inverted' : 'text-muted hover:text-highlighted'"
      >
        <UIcon
          :name="tab.icon"
          class="size-4"
        />
        {{ tab.label }}
      </button>
    </MAnimatedBackground>

    <div class="mt-4 rounded-xl border border-default bg-elevated p-6">
      <div class="flex items-center gap-3">
        <div class="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <UIcon
            :name="current.icon"
            class="size-5"
          />
        </div>
        <div>
          <p class="font-medium text-highlighted">
            {{ current.label }}
          </p>
          <p class="text-sm text-muted">
            {{ current.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tabs = [
  { id: 'overview', label: 'Overview', icon: 'i-lucide-layout-dashboard', description: 'A snapshot of your workspace.' },
  { id: 'analytics', label: 'Analytics', icon: 'i-lucide-chart-line', description: 'Traffic, conversions, and trends.' },
  { id: 'reports', label: 'Reports', icon: 'i-lucide-file-text', description: 'Download or schedule exports.' },
  { id: 'settings', label: 'Settings', icon: 'i-lucide-settings', description: 'Manage your preferences.' },
]

const active = ref(tabs[0].id)
const current = computed(() => tabs.find(tab => tab.id === active.value) ?? tabs[0])
</script>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="animated-background-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedBackground" />
::

## Props

::component-props
  ::component-prop{name="defaultValue" type="string | null" default="null"}
  Default active element ID.
  ::
  
  ::component-prop{name="enableHover" type="boolean" default="false"}
  Enable hover interactions.
  ::
  
  ::component-prop{name="backgroundClass" type="string" default="'bg-primary/70 rounded-lg'"}
  CSS classes for the background element.
  ::
  
  ::component-prop{name="containerClass" type="string" default="''"}
  CSS classes for the container.
  ::
  
  ::component-prop{name="transition" type="object" default="{ duration: 300, ease: 'ease-out' }"}
  Transition settings.
  ::
::

## Events

::component-events
  ::component-event{name="valueChange" type="(value: string | null) => void"}
  Emitted when the active element changes.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default" type="{ activeId: string | null, setActiveId: (id: string | null) => void }"}
  Default slot with active ID and setter function.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedBackground` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative`
  ::
  ::component-slot-row{name="background"}
  `absolute top-0 left-0 pointer-events-none transition-all duration-300 ease-out`
  ::
::

