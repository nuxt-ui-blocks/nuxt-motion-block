---
title: 3D Card
description: Interactive 3D card with perspective effects that respond to mouse movement.
---

The 3D Card component creates an interactive card with 3D perspective effects that respond to mouse movement. It's perfect for creating engaging UI elements that add depth and interactivity to your application.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="three-d-card-example" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <M3DCard :intensity="25">
      <template #header>
        <M3DItem :translate-z="40">
          <h2 class="text-xl font-semibold">
            3D Card
          </h2>
        </M3DItem>
      </template>

      <M3DItem :translate-z="20">
        <p class="text-muted">
          This is a 3D card that responds to mouse movement.
        </p>
        <div class="mt-4">
          <UButton color="primary">
            Interact
          </UButton>
        </div>
      </M3DItem>
    </M3DCard>
  </div>
</template>
```
::

## Examples

### Basic 3D Card

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="three-d-card-basic" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <M3DCard class="w-96">
      <template #header>
        <M3DItem :translate-z="40">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-lg bg-primary/70 flex items-center justify-center mr-4">
              <UIcon
                name="i-lucide-cube"
                class="w-6 h-6 text-white"
              />
            </div>
            <h2 class="text-2xl font-bold">
              3D Card
            </h2>
          </div>
        </M3DItem>
      </template>

      <M3DItem
        :translate-z="20"
        class="space-y-6"
      >
        <p class="text-muted text-lg">
          Experience interactive 3D effects that respond to your cursor movements for an engaging user interface.
        </p>

        <div class="flex items-center p-5 bg-primary/5 dark:bg-primary/30 rounded-lg">
          <UIcon
            name="i-lucide-info"
            class="w-6 h-6 text-primary mr-4"
          />
          <span class="text-primary">Move your cursor over the card to see the 3D effect</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-muted rounded-lg">
            <div class="text-sm text-muted">
              Rotation
            </div>
            <div class="font-bold text-highlighted">
              Interactive
            </div>
          </div>
          <div class="p-4 bg-muted rounded-lg">
            <div class="text-sm text-muted">
              Perspective
            </div>
            <div class="font-bold text-highlighted">
              Realistic
            </div>
          </div>
        </div>
      </M3DItem>

      <template #footer>
        <M3DItem
          :translate-z="30"
          class="flex justify-between pt-4"
        >
          <UButton
            color="neutral"
            variant="ghost"
            size="lg"
          >
            <UIcon
              name="i-lucide-heart"
              class="w-5 h-5 mr-2"
            />
            Like
          </UButton>
          <UButton
            color="primary"
            variant="solid"
            size="lg"
          >
            Get Started
          </UButton>
        </M3DItem>
      </template>
    </M3DCard>
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
    <component-example name="three-d-card-custom" />
  :::
#code
  <PlaygroundCode name="3DCard" />
::
## Props

### M3DCard Props

::component-props
  ::component-prop{name="intensity" type="number" default="25"}
  Controls the intensity of the 3D effect. Higher values result in more subtle movement.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the card container.
  ::
  
  ::component-prop{name="containerClass" type="string" default="''"}
  CSS classes to apply to the outer container.
  ::
  
  ::component-prop{name="ui" type="object" default="{}"}
  UI configuration for the underlying UCard component.
  ::
::

### M3DItem Props

::component-props
  ::component-prop{name="as" type="string" default="'div'"}
  HTML element to render as.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the item.
  ::
  
  ::component-prop{name="translateX" type="number|string" default="0"}
  X-axis translation in pixels.
  ::
  
  ::component-prop{name="translateY" type="number|string" default="0"}
  Y-axis translation in pixels.
  ::
  
  ::component-prop{name="translateZ" type="number|string" default="0"}
  Z-axis translation in pixels.
  ::
  
  ::component-prop{name="rotateX" type="number|string" default="0"}
  X-axis rotation in degrees.
  ::
  
  ::component-prop{name="rotateY" type="number|string" default="0"}
  Y-axis rotation in degrees.
  ::
  
  ::component-prop{name="rotateZ" type="number|string" default="0"}
  Z-axis rotation in degrees.
  ::
::

