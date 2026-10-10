---
title: Text Loop
description: Text that loops through different values with smooth transitions.
navigation:
  icon: i-lucide-repeat
---

# Text Loop

The TextLoop component creates text that loops through different values with smooth transitions. It's perfect for displaying rotating messages, quotes, or any content that needs to cycle automatically.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-loop-usage" />
  :::
#code
```vue
<template>
  <MTextLoop :items="['First', 'Second', 'Third']" />
</template>
```
::

## Props

::field-group
  ::field{name="items" type="any[]" :required="true"}
  Array of items to loop through.
  ::
  
  ::field{name="className" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="interval" type="number" default="2"}
  Interval between changes in seconds.
  ::
  
  ::field{name="transition" type="object" default="{ type: 'spring', stiffness: 150, damping: 19, mass: 1.2 }"}
  Animation transition options.
  ::
  
  ::field{name="variants" type="object" default="undefined"}
  Custom animation variants.
  ::
  
  ::field{name="onIndexChange" type="function" default="undefined"}
  Callback when index changes.
  ::
  
  ::field{name="trigger" type="boolean" default="true"}
  Enable/disable the looping.
  ::
::

## Examples

### Basic Text Loop

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-loop-basic" />
  :::
#code
```vue
<template>
  <ClientOnly>
    <div class="p-8">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-2">
          <span>Build</span>
          <span class="inline-block">
            <MTextLoop
              :items="['Modern', 'Innovative', 'Beautiful', 'Interactive']"
              class="text-blue-600 dark:text-blue-400"
            />
          </span>
          <span>Web Applications</span>
        </h1>

        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Create stunning interfaces with our collection of animated components that
          <MTextLoop
            :items="['transform', 'enhance', 'revolutionize', 'elevate']"
            class="text-purple-600 dark:text-purple-400 font-semibold"
          />
          the way users interact with your applications.
        </p>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex-1 text-center md:text-left">
              <h3 class="text-lg font-semibold mb-2">
                Real-time Preview
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                See changes instantly as you type with our live preview feature
              </p>
            </div>
            <MTextLoop
              :items="['99.9%', '10x', '50ms', '24/7']"
              class="text-3xl font-bold text-green-600 dark:text-green-400"
            />
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            size="lg"
            color="primary"
          >
            Get Started
          </UButton>
          <UButton
            size="lg"
            variant="outline"
          >
            View Documentation
          </UButton>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
```
::

### Custom Interval

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-loop-custom-interval" />
  :::
#code
```vue
<template>
  <div class="p-4">
    <MTextLoop :items="['Fast', 'Loop', 'Text']" :interval="0.5" />
  </div>
</template>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-loop-custom-styling" />
  :::
#code
```vue
<template>
  <div class="p-4">
    <MTextLoop :items="['Styled', 'Loop', 'Text']" class="text-2xl font-bold text-blue-600" />
  </div>
</template>
```
::

### With Custom Transition

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-loop-custom-transition" />
  :::
#code
```vue
<template>
  <div class="p-4">
    <MTextLoop 
      :items="['Bounce', 'Effect', 'Text']" 
      :transition="{ type: 'spring', stiffness: 300, damping: 10 }"
    />
  </div>
</template>
```
::

### With Custom Variants

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-loop-custom-variants" />
  :::
#code
```vue
<template>
  <div class="p-4">
    <MTextLoop 
      :items="['Fade', 'In', 'Out']"
      :variants="{
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
      }"
    />
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textLoop` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative inline-flex items-center justify-center align-baseline'` |
| `item` | `''` |
| `measure` | `'invisible absolute'` |
| `measureItem` | `''` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.textLoop` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-flex items-center justify-center align-baseline` |
| `item` |  |
| `measure` | `invisible absolute` |
| `measureItem` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.textLoop` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-flex items-center justify-center align-baseline` |
| `item` |  |
| `measure` | `invisible absolute` |
| `measureItem` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textLoop` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-flex items-center justify-center align-baseline` |
| `item` |  |
| `measure` | `invisible absolute` |
| `measureItem` |  |
