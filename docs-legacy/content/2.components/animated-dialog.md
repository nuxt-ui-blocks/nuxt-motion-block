---
title: Motion dialog
description: A modal dialog component with smooth animations powered by motion-v.
navigation:
  icon: i-lucide-layout-panel-top
---

# Motion dialog

The AnimatedDialog component is a modal dialog that combines the functionality of Nuxt UI's UModal with smooth animations powered by motion-v. It provides an enhanced user experience with customizable entrance and exit animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="animated-dialog-example" />
  :::
#code
```vue
<template>
  <MAnimatedDialog
    title="Motion dialog"
    description="A modal dialog with smooth animations"
  >
    <UButton label="Open Dialog" color="primary" />
    
    <template #body>
      <div class="space-y-4">
        <p>This is the content of the animated dialog.</p>
        <p>You can add any content here, including forms, images, or other components.</p>
      </div>
    </template>
    
    <template #footer="{ close }">
      <div class="flex gap-2">
        <UButton 
          label="Cancel" 
          color="neutral" 
          variant="outline" 
          @click="close"
        />
        <UButton 
          label="Confirm" 
          color="primary" 
          @click="close"
        />
      </div>
    </template>
  </MAnimatedDialog>
</template>
```
::

## Props

::field-group
  ::field{name="title" type="string" default="undefined"}
  The title of the dialog.
  ::
  
  ::field{name="description" type="string" default="undefined"}
  The description of the dialog.
  ::
  
  ::field{name="content" type="object" default="undefined"}
  The content of the dialog.
  ::
  
  ::field{name="overlay" type="boolean" default="true"}
  Render an overlay behind the dialog.
  ::
  
  ::field{name="scrollable" type="boolean" default="false"}
  When `true`, enables scrollable overlay mode where content scrolls within the overlay.
  ::
  
  ::field{name="transition" type="boolean" default="true"}
  Animate the dialog when opening or closing.
  ::
  
  ::field{name="fullscreen" type="boolean" default="false"}
  When `true`, the dialog will take up the full screen.
  ::
  
  ::field{name="portal" type="string | boolean | HTMLElement" default="true"}
  Render the dialog in a portal.
  ::
  
  ::field{name="close" type="boolean | Partial<ButtonProps>" default="true"}
  Display a close button to dismiss the dialog.
  ::
  
  ::field{name="closeIcon" type="string | object" default="appConfig.ui.icons.close"}
  The icon displayed in the close button.
  ::
  
  ::field{name="dismissible" type="boolean" default="true"}
  When `false`, the dialog will not close when clicking outside or pressing escape.
  ::
  
  ::field{name="ui" type="object" default="undefined"}
  UI customization options.
  ::
  
  ::field{name="open" type="boolean" default="undefined"}
  The controlled open state of the dialog. Can be binded as `v-model:open`.
  ::
  
  ::field{name="defaultOpen" type="boolean" default="false"}
  The open state of the dialog when it is initially rendered.
  ::
  
  ::field{name="modal" type="boolean" default="true"}
  The modality of the dialog.
  ::
  
  ::field{name="scale" type="number" default="0.95"}
  The scale factor for the entrance/exit animation.
  ::
  
  ::field{name="variants" type="object" default="{}"}
  Custom animation variants for the dialog.
  ::
  
  ::field{name="transitionOptions" type="object" default="{}"}
  Custom transition options for the dialog animation.
  ::
::

## Events

::field-group
  ::field{name="update:open" type="(open: boolean) => void"}
  Emitted when the open state of the dialog changes.
  ::
::

## Slots

::field-group
  ::field{name="default" type=""}
  The trigger element for the dialog.
  ::
  
  ::field{name="body" type=""}
  The main content of the dialog.
  ::
  
  ::field{name="header" type="{ close: () => void }"}
  Custom header content. Provides a close function.
  ::
  
  ::field{name="footer" type="{ close: () => void }"}
  Custom footer content. Provides a close function.
  ::
  
  ::field{name="title" type=""}
  Custom title content.
  ::
  
  ::field{name="description" type=""}
  Custom description content.
  ::
  
  ::field{name="close" type="{ ui: object }"}
  Custom close button content.
  ::
::

## Examples

### Basic Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-dialog-basic" />
  :::
#code
```vue
<template>
  <MAnimatedDialog>
    <UButton label="Open Basic Dialog" color="primary" />
    
    <template #body>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">Basic Dialog</h3>
        <p>This is a basic animated dialog with default animations.</p>
      </div>
    </template>
  </MAnimatedDialog>
</template>
```
::

### Custom Scale Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-dialog-scale" />
  :::
#code
```vue
<template>
  <MAnimatedDialog :scale="0.8">
    <UButton label="Strong Morph" color="secondary" />
    
    <template #body>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">Strong Morphing</h3>
        <p>This dialog uses a stronger motion-v morphing effect.</p>
      </div>
    </template>
  </MAnimatedDialog>
</template>
```
::

### Custom Variants and Transition

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-dialog-custom" />
  :::
#code
```vue
<template>
  <MAnimatedDialog 
    :variants="customVariants"
    :transition-options="customTransition"
  >
    <UButton label="Tailored motion" color="warning" />
    
    <template #body>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">Tailored motion</h3>
        <p>This dialog uses custom variants and transition props.</p>
      </div>
    </template>
  </MAnimatedDialog>
</template>

<script setup>
const customVariants = {
  initial: { opacity: 0, scale: 0.5, rotate: -15 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0.5, rotate: 15 }
}

const customTransition = {
  type: 'spring',
  bounce: 0.2,
  duration: 0.5
}
</script>
```
::

### With Header and Footer

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-dialog-complex" />
  :::
#code
```vue
<template>
  <MAnimatedDialog 
    title="Dialog with Header and Footer"
    description="This dialog has custom header and footer slots"
  >
    <UButton label="Open Complex Dialog" color="primary" />
    
    <template #body>
      <div class="p-4">
        <p>This is the main content of the dialog. It can contain any Vue components or HTML elements.</p>
        <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p>You can include forms, images, or any other content here.</p>
        </div>
      </div>
    </template>
    
    <template #footer="{ close }">
      <div class="flex gap-2">
        <UButton 
          label="Cancel" 
          color="neutral" 
          variant="outline" 
          @click="close"
        />
        <UButton 
          label="Confirm" 
          color="primary" 
          @click="close"
        />
      </div>
    </template>
  </MAnimatedDialog>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedDialog` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `content` | `relative overflow-hidden backdrop-blur-sm outline-none focus:outline-none border-default bg-default text-default` |
| `contentInner` | `will-change-transform` |
| `body` | `flex-1 p-4 sm:p-6` |
| `footer` | `flex items-center gap-1.5 p-4 sm:px-6 border-t border-default` |
