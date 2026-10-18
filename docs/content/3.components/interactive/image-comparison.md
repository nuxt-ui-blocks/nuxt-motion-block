---
title: Image compare
description: Interactive image comparison component with slider controls for before/after visualization.
---

The ImageComparison component creates an interactive image comparison slider that allows users to compare two images side by side. It supports multiple comparison modes, keyboard navigation, and touch controls for a seamless user experience.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="image-comparison-example" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <MImageComparison class="h-64 w-96 rounded-lg overflow-hidden">
      <MImageComparisonImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        alt="Before"
        position="left"
      />
      <MImageComparisonImage
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        alt="After"
        position="right"
      />
      <MImageComparisonSlider>
        <div class="text-xs font-medium text-highlighted bg-default px-2 py-1 rounded absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          Drag to compare
        </div>
      </MImageComparisonSlider>
    </MImageComparison>
  </div>
</template>
```
::

## Examples

### Basic Image compare

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="image-comparison-basic" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <div class="w-full max-w-3xl">
      <h3 class="text-2xl font-bold text-center mb-8 text-highlighted">
        Before & After Comparison
      </h3>
      <MImageComparison class="h-96 w-full rounded-xl overflow-hidden shadow-xl">
        <MImageComparisonImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Mountain before editing"
          position="left"
          class="object-cover"
        />
        <MImageComparisonImage
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Mountain after editing"
          position="right"
          class="object-cover"
        />
        <MImageComparisonSlider>
          <template #default>
            <div class="w-10 h-10 rounded-full bg-default flex items-center justify-center shadow-xl">
              <UIcon
                name="i-lucide-move-horizontal"
                class="w-5 h-5 text-default"
              />
            </div>
          </template>
        </MImageComparisonSlider>
      </MImageComparison>
      <div class="flex justify-between mt-6 text-sm text-muted">
        <span>Original</span>
        <span>Enhanced</span>
      </div>
      <div class="mt-6 text-center">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Try It Yourself
        </UButton>
      </div>
    </div>
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
    <component-example name="image-comparison-custom" />
  :::
#code
  <PlaygroundCode name="ImageComparison" />
::
## Props

### MImageComparison Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="enableHover" type="boolean" default="false"}
  Enable hover-based interaction instead of drag.
  ::
  
  ::component-prop{name="springOptions" type="SpringOptions" default="{ bounce: 0, duration: 0.1 }"}
  Spring animation options for slider movement.
  ::
  
  ::component-prop{name="initialPosition" type="number" default="50"}
  Initial slider position as a percentage (0-100).
  ::
  
  ::component-prop{name="mode" type="string" default="'slide'"}
  Comparison mode: 'slide', 'fade', 'curtain', or 'circle'.
  ::
  
  ::component-prop{name="orientation" type="string" default="'horizontal'"}
  Slider orientation: 'horizontal' or 'vertical'.
  ::
  
  ::component-prop{name="enableZoom" type="boolean" default="false"}
  Enable zoom functionality.
  ::
  
  ::component-prop{name="showControls" type="boolean" default="true"}
  Show reset controls.
  ::
  
  ::component-prop{name="showPosition" type="boolean" default="false"}
  Show position indicator.
  ::
  
  ::component-prop{name="autoPlay" type="boolean" default="false"}
  Enable automatic sliding.
  ::
  
  ::component-prop{name="autoPlayDuration" type="number" default="3000"}
  Duration between automatic slides in milliseconds.
  ::
  
  ::component-prop{name="snapToSteps" type="boolean" default="false"}
  Snap slider to predefined steps.
  ::
  
  ::component-prop{name="steps" type="number[]" default="[0, 25, 50, 75, 100]"}
  Steps to snap to when snapToSteps is enabled.
  ::
  
  ::component-prop{name="ariaLabel" type="string" default="'Image comparison slider'"}
  ARIA label for accessibility.
  ::
  
  ::component-prop{name="leftImageLabel" type="string" default="'Before image'"}
  ARIA label for the left image.
  ::
  
  ::component-prop{name="rightImageLabel" type="string" default="'After image'"}
  ARIA label for the right image.
  ::
::

### MImageComparisonImage Props

::component-props
  ::component-prop{name="src" type="string" required}
  Source URL of the image.
  ::
  
  ::component-prop{name="alt" type="string" required}
  Alternative text for the image.
  ::
  
  ::component-prop{name="position" type="string" required}
  Position of the image: 'left' or 'right'.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the image.
  ::
::

### MImageComparisonSlider Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the slider.
  ::
::

## Events

::component-events
  ::component-event{name="positionChange" type="function"}
  Emitted when the slider position changes. Returns the new position as a percentage.
  ::
  
  ::component-event{name="dragStart" type="function"}
  Emitted when dragging starts.
  ::
  
  ::component-event{name="dragEnd" type="function"}
  Emitted when dragging ends.
  ::
::

