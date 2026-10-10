---
title: Morphing Popover
description: A popover component with morphing animations powered by motion-v, built as a wrapper around Nuxt UI's Popover component.
navigation:
  icon: i-lucide-maximize-2
---

# Morphing Popover

A popover component with morphing animations powered by motion-v, built as a wrapper around Nuxt UI's Popover component.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-popover-example" />
  :::
#code
```vue
<template>
  <MMorphingPopover>
    <UButton label="Open Popover" color="primary" />
    <template #content>
      <div class="p-4 w-64">
        <h3 class="text-lg font-semibold mb-2">Morphing Popover</h3>
        <p class="text-gray-600 dark:text-gray-300">
          This popover has smooth morphing animations.
        </p>
      </div>
    </template>
  </MMorphingPopover>
</template>
```
::

## Props

::field-group
  ::field{name="scale" type="number" default="0.95"}
  Scale factor for trigger morphing animation.
  ::
  
  ::field{name="variants" type="object" default="{}"}
  Custom animation variants for initial, animate, and exit states.
  ::
  
  ::field{name="transition" type="object" default="{}"}
  Custom transition configuration for animations.
  ::
  
  ::field{name="mode" type="'click' | 'hover'" default="'click'"}
  Interaction mode for the popover.
  ::
  
  ::field{name="content" type="object" default="{}"}
  Content positioning options.
  ::
  
  ::field{name="arrow" type="boolean | object" default="false"}
  Show arrow indicator.
  ::
  
  ::field{name="portal" type="string | boolean | HTMLElement" default="true"}
  Render popover in a portal.
  ::
  
  ::field{name="dismissible" type="boolean" default="true"}
  Whether the popover can be dismissed.
  ::
  
  ::field{name="defaultOpen" type="boolean" default="false"}
  Whether the popover is open by default.
  ::
  
  ::field{name="open" type="boolean" default="undefined"}
  Controlled open state.
  ::
  
  ::field{name="modal" type="boolean" default="false"}
  Whether the popover is modal.
  ::
  
  ::field{name="openDelay" type="number" default="0"}
  Delay before opening in hover mode (ms).
  ::
  
  ::field{name="closeDelay" type="number" default="0"}
  Delay before closing in hover mode (ms).
  ::
  
  ::field{name="ui" type="object" default="{}"}
  UI customization options.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The trigger element.
  ::
  
  ::field{name="content"}
  The popover content.
  ::
  
  ::field{name="anchor"}
  Custom anchor element (only works with `mode="click"`).
  ::
::

## Events

::field-group
  ::field{name="update:open"}
  Emitted when the popover open state changes.
  ::
::

## Examples

### Basic Popover

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-popover-basic" />
  :::
#code
```vue
<template>
  <MMorphingPopover>
    <UButton color="primary" size="lg">
      <UIcon name="i-lucide-help-circle" class="w-5 h-5 mr-2" />
      Help Center
    </UButton>
    <template #content>
      <div class="p-8 w-96">
        <div class="flex items-start mb-6">
          <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4 flex-shrink-0">
            <UIcon name="i-lucide-help-circle" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 class="font-bold text-xl mb-2 text-gray-900 dark:text-white">Need Help?</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Get assistance with our platform features
            </p>
          </div>
        </div>
        
        <div class="space-y-4 mb-8">
          <div class="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
            <UIcon name="i-lucide-book-open" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-4" />
            <div>
              <div class="font-medium text-gray-900 dark:text-white">Documentation</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Comprehensive guides and tutorials</div>
            </div>
          </div>
          <div class="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
            <UIcon name="i-lucide-message-circle" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-4" />
            <div>
              <div class="font-medium text-gray-900 dark:text-white">Contact Support</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">24/7 support team ready to help</div>
            </div>
          </div>
          <div class="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
            <UIcon name="i-lucide-youtube" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-4" />
            <div>
              <div class="font-medium text-gray-900 dark:text-white">Video Tutorials</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Step-by-step video guides</div>
            </div>
          </div>
        </div>
        
        <UButton color="primary" variant="solid" block size="lg">
          Visit Help Center
        </UButton>
      </div>
    </template>
  </MMorphingPopover>
</template>
```
::

### Hover Mode Popover

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-popover-hover" />
  :::
#code
```vue
<template>
  <MMorphingPopover mode="hover" :open-delay="300" :close-delay="200">
    <UButton color="secondary">Hover Popover</UButton>
    <template #content>
      <div class="p-4 w-64">
        <h3 class="font-bold text-lg mb-2">Hover Popover</h3>
        <p class="text-gray-600 dark:text-gray-400">
          This popover opens on hover with custom delays.
        </p>
      </div>
    </template>
  </MMorphingPopover>
</template>
```
::

### Custom Variants and Transition

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-popover-custom" />
  :::
#code
```vue
<template>
  <MMorphingPopover 
    :variants="customVariants" 
    :transition="customTransition"
  >
    <UButton color="tertiary">Custom Animation</UButton>
    <template #content>
      <div class="p-4 w-64">
        <h3 class="font-bold text-lg mb-2">Custom Animation</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          This popover has custom morphing animations.
        </p>
      </div>
    </template>
  </MMorphingPopover>
</template>

<script setup>
const customVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    rotate: -15
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    rotate: 15
  }
}

const customTransition = {
  type: 'spring',
  bounce: 0.2,
  duration: 0.5
}
</script>
```
::

### Custom Scale Factor

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-popover-scale" />
  :::
#code
```vue
<template>
  <MMorphingPopover :scale="0.9">
    <UButton color="secondary">Strong Morph</UButton>
    <template #content>
      <div class="p-4 w-64">
        <h3 class="font-bold text-lg mb-2">Strong Morphing</h3>
        <p class="text-gray-600 dark:text-gray-400">
          This popover uses a stronger morphing effect with scale 0.9.
        </p>
      </div>
    </template>
  </MMorphingPopover>
</template>
```
::

### With Arrow Indicator

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-popover-arrow" />
  :::
#code
```vue
<template>
  <MMorphingPopover :arrow="true">
    <UButton color="warning">With Arrow</UButton>
    <template #content>
      <div class="p-4 w-64">
        <h3 class="font-bold text-lg mb-2">Arrow Indicator</h3>
        <p class="text-gray-600 dark:text-gray-400">
          This popover shows an arrow indicator pointing to the trigger.
        </p>
      </div>
    </template>
  </MMorphingPopover>
</template>
```
::

### Styled Popover

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-popover-styled" />
  :::
#code
```vue
<template>
  <MMorphingPopover>
    <UButton color="primary" variant="outline">Styled Popover</UButton>
    <template #content>
      <div class="p-6 w-80 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
        <h3 class="font-bold text-lg mb-2">Styled Popover</h3>
        <p class="mb-4 opacity-90">
          This popover has custom gradient styling.
        </p>
        <div class="flex space-x-2">
          <UButton color="primary" variant="solid" size="sm">Action</UButton>
          <UButton color="primary" variant="outline" size="sm">Cancel</UButton>
        </div>
      </div>
    </template>
  </MMorphingPopover>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.morphingPopover` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `''` |
| `trigger` | `'inline-block will-change-transform'` |
| `content` | `''` |
| `contentInner` | `'will-change-transform'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.morphingPopover` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `trigger` | `inline-block will-change-transform` |
| `content` |  |
| `contentInner` | `will-change-transform` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.morphingPopover` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `trigger` | `inline-block will-change-transform` |
| `content` |  |
| `contentInner` | `will-change-transform` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.morphingPopover` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `trigger` | `inline-block will-change-transform` |
| `content` |  |
| `contentInner` | `will-change-transform` |
