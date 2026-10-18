---
title: Shape-shift popover
description: A popover component with morphing animations powered by motion-v, built as a wrapper around Nuxt UI's Popover component.
---

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
  <div class="flex justify-center">
    <MMorphingPopover>
      <UButton color="primary">
        Open Popover
      </UButton>

      <template #content>
        <div class="p-4 w-64">
          <h3 class="font-bold text-lg mb-2">
            Shape-shift popover
          </h3>
          <p class="text-muted mb-4">
            This is a popover with morphing animations.
          </p>
          <UButton
            color="primary"
            variant="solid"
            size="sm"
          >
            Action
          </UButton>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
```
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
  <div class="flex justify-center items-center">
    <MMorphingPopover>
      <UButton
        color="primary"
        size="lg"
      >
        <UIcon
          name="i-lucide-help-circle"
          class="w-5 h-5 mr-2"
        />
        Help Center
      </UButton>

      <template #content>
        <div class="p-8 w-96">
          <div class="flex items-start mb-6">
            <div class="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/70 flex items-center justify-center mr-4 flex-shrink-0">
              <UIcon
                name="i-lucide-help-circle"
                class="w-6 h-6 text-primary"
              />
            </div>
            <div>
              <h3 class="font-bold text-xl mb-2 text-highlighted">
                Need Help?
              </h3>
              <p class="text-muted text-sm">
                Get assistance with our platform features
              </p>
            </div>
          </div>

          <div class="space-y-4 mb-8">
            <div class="flex items-center p-4 rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <UIcon
                name="i-lucide-book-open"
                class="w-6 h-6 text-muted mr-4"
              />
              <div>
                <div class="font-medium text-highlighted">
                  Documentation
                </div>
                <div class="text-sm text-muted">
                  Comprehensive guides and tutorials
                </div>
              </div>
            </div>
            <div class="flex items-center p-4 rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <UIcon
                name="i-lucide-message-circle"
                class="w-6 h-6 text-muted mr-4"
              />
              <div>
                <div class="font-medium text-highlighted">
                  Contact Support
                </div>
                <div class="text-sm text-muted">
                  24/7 support team ready to help
                </div>
              </div>
            </div>
            <div class="flex items-center p-4 rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <UIcon
                name="i-lucide-youtube"
                class="w-6 h-6 text-muted mr-4"
              />
              <div>
                <div class="font-medium text-highlighted">
                  Video Tutorials
                </div>
                <div class="text-sm text-muted">
                  Step-by-step video guides
                </div>
              </div>
            </div>
          </div>

          <UButton
            color="primary"
            variant="solid"
            block
            size="lg"
          >
            Visit Help Center
          </UButton>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="morphing-popover-custom" />
  :::
#code
  <PlaygroundCode name="MorphingPopover" />
::

## Props

::component-props
  ::component-prop{name="scale" type="number" default="0.95"}
  Scale factor for trigger morphing animation.
  ::
  
  ::component-prop{name="variants" type="object" default="{}"}
  Custom animation variants for initial, animate, and exit states.
  ::
  
  ::component-prop{name="transition" type="object" default="{}"}
  Custom transition configuration for animations.
  ::
  
  ::component-prop{name="mode" type="'click' | 'hover'" default="'click'"}
  Interaction mode for the popover.
  ::
  
  ::component-prop{name="content" type="object" default="{}"}
  Content positioning options.
  ::
  
  ::component-prop{name="arrow" type="boolean | object" default="false"}
  Show arrow indicator.
  ::
  
  ::component-prop{name="portal" type="string | boolean | HTMLElement" default="true"}
  Render popover in a portal.
  ::
  
  ::component-prop{name="dismissible" type="boolean" default="true"}
  Whether the popover can be dismissed.
  ::
  
  ::component-prop{name="defaultOpen" type="boolean" default="false"}
  Whether the popover is open by default.
  ::
  
  ::component-prop{name="open" type="boolean" default="undefined"}
  Controlled open state.
  ::
  
  ::component-prop{name="modal" type="boolean" default="false"}
  Whether the popover is modal.
  ::
  
  ::component-prop{name="openDelay" type="number" default="0"}
  Delay before opening in hover mode (ms).
  ::
  
  ::component-prop{name="closeDelay" type="number" default="0"}
  Delay before closing in hover mode (ms).
  ::
  
  ::component-prop{name="ui" type="object" default="{}"}
  UI customization options.
  ::
::

## Events

::component-events
  ::component-event{name="update:open"}
  Emitted when the popover open state changes.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The trigger element.
  ::
  
  ::component-slot-row{name="content"}
  The popover content.
  ::
  
  ::component-slot-row{name="anchor"}
  Custom anchor element (only works with `mode="click"`).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.morphingPopover` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="trigger"}
  `inline-block will-change-transform`
  ::
  ::component-slot-row{name="content"}
  ::
  ::component-slot-row{name="contentInner"}
  `will-change-transform`
  ::
::

