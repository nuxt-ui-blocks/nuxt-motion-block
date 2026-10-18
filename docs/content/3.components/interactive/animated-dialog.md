---
title: Motion dialog
description: A modal dialog component with smooth animations powered by motion-v.
---

The AnimatedDialog component is a modal dialog that combines the functionality of Nuxt UI's UModal with smooth animations powered by motion-v. It provides an enhanced user experience with customizable entrance and exit animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="animated-dialog-basic" />
  :::
#code
```vue
<template>
  <div class="flex justify-center w-full h-full">
    <MAnimatedDialog>
      <UButton
        label="Open Dialog"
        color="primary"
      />

      <template #body>
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">
            Motion dialog
          </h3>
          <p class="text-muted mb-4">
            This dialog opens with smooth motion-v animations.
          </p>
          <UButton
            label="Action"
            color="primary"
            variant="outline"
            size="sm"
          />
        </div>
      </template>
    </MAnimatedDialog>
  </div>
</template>
```
::

## Examples

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
    <UButton
      label="Open Complex Dialog"
      color="primary"
    />

    <template #body>
      <div class="p-4">
        <p>This is the main content of the dialog. It can contain any Vue components or HTML elements.</p>
        <div class="mt-4 p-4 bg-muted rounded">
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

### Animation

`scale` sets the size the dialog shrinks to on entry and exit, `variants` overrides the
`initial` / `animate` / `exit` targets, and `transitionOptions` overrides the tween.
Combine them for any entrance — here three presets swap between a scale, a slide and a
springy pop.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="animated-dialog-animation" />
  :::
#code
```vue
<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="option in presets"
        :key="option.id"
        :label="option.label"
        size="sm"
        :color="preset === option.id ? 'primary' : 'neutral'"
        :variant="preset === option.id ? 'solid' : 'subtle'"
        @click="preset = option.id"
      />
    </div>

    <MAnimatedDialog
      :scale="active.scale"
      :variants="active.variants"
      :transition-options="active.transitionOptions"
      title="Animated dialog"
      :description="`Preset: ${active.label}`"
    >
      <UButton
        label="Open dialog"
        color="primary"
      />

      <template #body>
        <div class="p-4">
          <p class="text-muted">
            The dialog opens with the “{{ active.label }}” animation. Pick another
            preset above, then open it again.
          </p>
        </div>
      </template>
    </MAnimatedDialog>
  </div>
</template>

<script setup lang="ts">
const presets = [
  {
    id: 'scale',
    label: 'Scale',
    scale: 0.96,
    variants: undefined,
    transitionOptions: undefined,
  },
  {
    id: 'slide',
    label: 'Slide in',
    scale: 1,
    variants: {
      initial: { opacity: 0, x: 80 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 80 },
    },
    transitionOptions: { type: 'spring' as const, stiffness: 260, damping: 26 },
  },
  {
    id: 'pop',
    label: 'Pop',
    scale: 0.5,
    variants: undefined,
    transitionOptions: { type: 'spring' as const, stiffness: 320, damping: 18 },
  },
]

const preset = ref('scale')
const active = computed(() => presets.find(option => option.id === preset.value) ?? presets[0]!)
</script>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="animated-dialog-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedDialog" />
::

## Props

::component-props
  ::component-prop{name="title" type="string" default="undefined"}
  The title of the dialog.
  ::
  
  ::component-prop{name="description" type="string" default="undefined"}
  The description of the dialog.
  ::
  
  ::component-prop{name="content" type="object" default="undefined"}
  The content of the dialog.
  ::
  
  ::component-prop{name="overlay" type="boolean" default="true"}
  Render an overlay behind the dialog.
  ::
  
  ::component-prop{name="scrollable" type="boolean" default="false"}
  When `true`, enables scrollable overlay mode where content scrolls within the overlay.
  ::
  
  ::component-prop{name="transition" type="boolean" default="true"}
  Animate the dialog when opening or closing.
  ::
  
  ::component-prop{name="fullscreen" type="boolean" default="false"}
  When `true`, the dialog will take up the full screen.
  ::
  
  ::component-prop{name="portal" type="string | boolean | HTMLElement" default="true"}
  Render the dialog in a portal.
  ::
  
  ::component-prop{name="close" type="boolean | Partial<ButtonProps>" default="true"}
  Display a close button to dismiss the dialog.
  ::
  
  ::component-prop{name="closeIcon" type="string | object" default="appConfig.ui.icons.close"}
  The icon displayed in the close button.
  ::
  
  ::component-prop{name="dismissible" type="boolean" default="true"}
  When `false`, the dialog will not close when clicking outside or pressing escape.
  ::
  
  ::component-prop{name="ui" type="object" default="undefined"}
  UI customization options.
  ::
  
  ::component-prop{name="open" type="boolean" default="undefined"}
  The controlled open state of the dialog. Can be binded as `v-model:open`.
  ::
  
  ::component-prop{name="defaultOpen" type="boolean" default="false"}
  The open state of the dialog when it is initially rendered.
  ::
  
  ::component-prop{name="modal" type="boolean" default="true"}
  The modality of the dialog.
  ::
  
  ::component-prop{name="scale" type="number" default="0.96"}
  The scale factor for the entrance/exit animation.
  ::
  
  ::component-prop{name="variants" type="object" default="{}"}
  Custom animation variants for the dialog.
  ::
  
  ::component-prop{name="transitionOptions" type="object" default="{}"}
  Custom transition options for the dialog animation.
  ::
::

## Events

::component-events
  ::component-event{name="update:open" type="(open: boolean) => void"}
  Emitted when the open state of the dialog changes.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default" type=""}
  The trigger element for the dialog.
  ::
  
  ::component-slot-row{name="body" type=""}
  The main content of the dialog.
  ::
  
  ::component-slot-row{name="header" type="{ close: () => void }"}
  Custom header content. Provides a close function.
  ::
  
  ::component-slot-row{name="footer" type="{ close: () => void }"}
  Custom footer content. Provides a close function.
  ::
  
  ::component-slot-row{name="title" type=""}
  Custom title content.
  ::
  
  ::component-slot-row{name="description" type=""}
  Custom description content.
  ::
  
  ::component-slot-row{name="close" type="{ ui: object }"}
  Custom close button content.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedDialog` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="content"}
  `relative overflow-hidden backdrop-blur-sm outline-none focus:outline-none border-default bg-default text-default`
  ::
  ::component-slot-row{name="contentInner"}
  `will-change-transform`
  ::
  ::component-slot-row{name="body"}
  `flex-1 p-4 sm:p-6`
  ::
  ::component-slot-row{name="footer"}
  `flex items-center gap-1.5 p-4 sm:px-6 border-t border-default`
  ::
::

