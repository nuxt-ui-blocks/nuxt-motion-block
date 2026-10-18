---
title: Image Comparison
description: Interactive image comparison component with slider controls for before/after visualization.
navigation:
  icon: i-lucide-image
---

# Image Comparison

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
      <div class="text-xs font-medium text-gray-900 bg-white px-2 py-1 rounded absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        Drag to compare
      </div>
    </MImageComparisonSlider>
  </MImageComparison>
</template>
```
::

## Props

### MImageComparison Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="enableHover" type="boolean" default="false"}
  Enable hover-based interaction instead of drag.
  ::
  
  ::field{name="springOptions" type="SpringOptions" default="{ bounce: 0, duration: 0.1 }"}
  Spring animation options for slider movement.
  ::
  
  ::field{name="initialPosition" type="number" default="50"}
  Initial slider position as a percentage (0-100).
  ::
  
  ::field{name="mode" type="string" default="'slide'"}
  Comparison mode: 'slide', 'fade', 'curtain', or 'circle'.
  ::
  
  ::field{name="orientation" type="string" default="'horizontal'"}
  Slider orientation: 'horizontal' or 'vertical'.
  ::
  
  ::field{name="enableZoom" type="boolean" default="false"}
  Enable zoom functionality.
  ::
  
  ::field{name="showControls" type="boolean" default="true"}
  Show reset controls.
  ::
  
  ::field{name="showPosition" type="boolean" default="false"}
  Show position indicator.
  ::
  
  ::field{name="autoPlay" type="boolean" default="false"}
  Enable automatic sliding.
  ::
  
  ::field{name="autoPlayDuration" type="number" default="3000"}
  Duration between automatic slides in milliseconds.
  ::
  
  ::field{name="snapToSteps" type="boolean" default="false"}
  Snap slider to predefined steps.
  ::
  
  ::field{name="steps" type="number[]" default="[0, 25, 50, 75, 100]"}
  Steps to snap to when snapToSteps is enabled.
  ::
  
  ::field{name="ariaLabel" type="string" default="'Image comparison slider'"}
  ARIA label for accessibility.
  ::
  
  ::field{name="leftImageLabel" type="string" default="'Before image'"}
  ARIA label for the left image.
  ::
  
  ::field{name="rightImageLabel" type="string" default="'After image'"}
  ARIA label for the right image.
  ::
::

### MImageComparisonImage Props

::field-group
  ::field{name="src" type="string" required}
  Source URL of the image.
  ::
  
  ::field{name="alt" type="string" required}
  Alternative text for the image.
  ::
  
  ::field{name="position" type="string" required}
  Position of the image: 'left' or 'right'.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the image.
  ::
::

### MImageComparisonSlider Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the slider.
  ::
::

## Events

::field-group
  ::field{name="positionChange" type="function"}
  Emitted when the slider position changes. Returns the new position as a percentage.
  ::
  
  ::field{name="dragStart" type="function"}
  Emitted when dragging starts.
  ::
  
  ::field{name="dragEnd" type="function"}
  Emitted when dragging ends.
  ::
::

## Examples

### Basic Image Comparison

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
  <MImageComparison class="h-64 w-96 rounded-lg overflow-hidden">
    <MImageComparisonImage 
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Mountain before" 
      position="left" 
    />
    <MImageComparisonImage 
      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Mountain after" 
      position="right" 
    />
    <MImageComparisonSlider />
  </MImageComparison>
</template>
```
::

### Vertical Orientation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="image-comparison-vertical" />
  :::
#code
```vue
<template>
  <MImageComparison 
    class="h-96 w-64 rounded-lg overflow-hidden" 
    orientation="vertical"
  >
    <MImageComparisonImage 
      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Ocean before" 
      position="left" 
    />
    <MImageComparisonImage 
      src="https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Ocean after" 
      position="right" 
    />
    <MImageComparisonSlider />
  </MImageComparison>
</template>
```
::

### With Custom Position

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="image-comparison-custom-position" />
  :::
#code
```vue
<template>
  <MImageComparison 
    :initial-position="25" 
    class="h-64 w-96 rounded-lg overflow-hidden"
  >
    <MImageComparisonImage 
      src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="City before" 
      position="left" 
    />
    <MImageComparisonImage 
      src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="City after" 
      position="right" 
    />
    <MImageComparisonSlider />
  </MImageComparison>
</template>
```
::

### With Position Indicator

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="image-comparison-position-indicator" />
  :::
#code
```vue
<template>
  <MImageComparison 
    show-position
    class="h-64 w-96 rounded-lg overflow-hidden"
  >
    <MImageComparisonImage 
      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Before" 
      position="left" 
    />
    <MImageComparisonImage 
      src="https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="After" 
      position="right" 
    />
    <MImageComparisonSlider />
  </MImageComparison>
</template>
```
::

### With Controls

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="image-comparison-controls" />
  :::
#code
```vue
<template>
  <MImageComparison 
    show-controls
    class="h-64 w-96 rounded-lg overflow-hidden"
  >
    <MImageComparisonImage 
      src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Before" 
      position="left" 
    />
    <MImageComparisonImage 
      src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="After" 
      position="right" 
    />
    <MImageComparisonSlider />
  </MImageComparison>
</template>
```
::
