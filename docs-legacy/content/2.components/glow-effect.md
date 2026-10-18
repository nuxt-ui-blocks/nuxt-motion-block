---
title: Glow Effect
description: Component that adds a dynamic glow effect with customizable colors and animations.
navigation:
  icon: i-lucide-sun-medium
---

# Glow Effect

The GlowEffect component adds a dynamic glow effect with customizable colors and animations. It's perfect for creating eye-catching elements with vibrant, animated glows.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-effect-example" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center p-8">
    <MGlowEffect>
      <div class="p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-xl">
        <h3 class="text-2xl font-bold text-white mb-3">Glow Effect</h3>
        <p class="text-blue-100 mb-4">This element has a beautiful glow effect</p>
        <UButton 
          variant="solid" 
          size="sm"
          class="bg-white text-blue-600 hover:bg-gray-100"
        >
          Get Started
        </UButton>
      </div>
    </MGlowEffect>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="undefined"}
  CSS classes to apply to the glow element.
  ::
  
  ::field{name="style" type="Object" default="undefined"}
  Custom styles to apply to the glow element.
  ::
  
  ::field{name="colors" type="string[]" default="['#FF5733', '#33FF57', '#3357FF', '#F1C40F']"}
  Array of colors for the glow effect.
  ::
  
  ::field{name="mode" type="| 'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static'" default="'rotate'"}
  Animation mode for the glow effect.
  ::
  
  ::field{name="blur" type="| 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none'" default="'medium'"}
  Blur intensity of the glow effect.
  ::
  
  ::field{name="scale" type="number" default="1"}
  Scale factor for the glow effect.
  ::
  
  ::field{name="duration" type="number" default="5"}
  Animation duration in seconds.
  ::
::

## Examples

### Notification Elements

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-effect-notification" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <!-- Notification Badge -->
    <MGlowEffect 
      mode="pulse" 
      :colors="['#EF4444']" 
      blur="strong" 
      :scale="1.1"
      :duration="2"
    >
      <div class="relative">
        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
        <div class="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      </div>
    </MGlowEffect>
    <p class="text-gray-600 dark:text-gray-400">Notification Badge</p>
    
    <!-- Notification Card -->
    <MGlowEffect 
      mode="breathe" 
      :colors="['#3B82F6', '#60A5FA']" 
      blur="medium" 
      :scale="1.05"
      :duration="3"
    >
      <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-64">
        <div class="flex items-start space-x-3">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white">New Message</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">You have a new message from Alex</p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">2 min ago</p>
          </div>
        </div>
      </div>
    </MGlowEffect>
  </div>
</template>
```
::

### Interactive Button

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-effect-interactive-button" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <!-- Interactive Button -->
    <MGlowEffect 
      ref="glowRef"
      mode="rotate" 
      :colors="['#8B5CF6', '#EC4899', '#F59E0B']" 
      blur="strong" 
      :scale="1.2"
      :duration="4"
    >
      <UButton 
        size="lg" 
        class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        @click="handleClick"
      >
        Click Me!
      </UButton>
    </MGlowEffect>
    
    <!-- Status Indicator -->
    <div class="text-center">
      <p class="text-gray-600 dark:text-gray-400 mb-2">Click the button to see the effect</p>
      <p v-if="clickCount > 0" class="text-sm text-purple-600 dark:text-purple-400">
        Button clicked {{ clickCount }} time{{ clickCount !== 1 ? 's' : '' }}!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const clickCount = ref(0)
const glowRef = ref(null)

const handleClick = () => {
  clickCount.value++
  
  // Add a temporary extra glow effect on click
  if (glowRef.value) {
    // This would be implemented if we had access to the glow effect methods
    console.log('Button clicked!')
  }
}
</script>
```
::

### Feature Card Showcase

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-effect-card-showcase" />
  :::
#code
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    <!-- Feature Card 1 -->
    <MGlowEffect 
      mode="colorShift" 
      :colors="['#0EA5E9', '#06B6D4', '#14B8A6']" 
      blur="medium" 
      :scale="1.05"
      :duration="5"
    >
      <div class="h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
          <UIcon name="i-heroicons-lightning-bolt" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Experience blazing fast performance with our optimized solutions.
        </p>
      </div>
    </MGlowEffect>
    
    <!-- Feature Card 2 -->
    <MGlowEffect 
      mode="flowHorizontal" 
      :colors="['#8B5CF6', '#A855F7', '#C084FC']" 
      blur="medium" 
      :scale="1.05"
      :duration="6"
    >
      <div class="h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
          <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Magical UI</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Create stunning interfaces with our collection of animated components.
        </p>
      </div>
    </MGlowEffect>
    
    <!-- Feature Card 3 -->
    <MGlowEffect 
      mode="breathe" 
      :colors="['#10B981', '#34D399', '#6EE7B7']" 
      blur="medium" 
      :scale="1.05"
      :duration="4"
    >
      <div class="h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
          <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-white" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Reliable</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Built with reliability and stability as our top priorities.
        </p>
      </div>
    </MGlowEffect>
  </div>
</template>
```
::

### Premium Pricing Card

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-effect-pricing" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center p-8">
    <MGlowEffect 
      mode="rotate" 
      :colors="['#F59E0B', '#F97316', '#EF4444']" 
      blur="strong" 
      :scale="1.1"
      :duration="8"
    >
      <div class="p-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-2xl w-80">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-white mb-2">Premium Plan</h3>
          <div class="mb-6">
            <span class="text-5xl font-bold text-white">$49</span>
            <span class="text-white/80">/month</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center text-white/90">
              <UIcon name="i-heroicons-check-circle-solid" class="w-5 h-5 mr-2 text-white" />
              Unlimited projects
            </li>
            <li class="flex items-center text-white/90">
              <UIcon name="i-heroicons-check-circle-solid" class="w-5 h-5 mr-2 text-white" />
              Priority support
            </li>
            <li class="flex items-center text-white/90">
              <UIcon name="i-heroicons-check-circle-solid" class="w-5 h-5 mr-2 text-white" />
              Advanced analytics
            </li>
          </ul>
          <UButton 
            size="lg" 
            class="w-full bg-white text-amber-600 hover:bg-gray-100 font-bold py-3 rounded-lg transition duration-300"
          >
            Get Started
          </UButton>
        </div>
      </div>
    </MGlowEffect>
  </div>
</template>
```
::

### All Animation Modes

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-effect-modes" />
  :::
#code
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <!-- Rotate Mode -->
    <MGlowEffect 
      mode="rotate" 
      :colors="['#FF5733', '#33FF57', '#3357FF']" 
      blur="medium" 
      :scale="1.1"
      :duration="4"
    >
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg mb-4"></div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Rotate Mode</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Conic gradient that rotates continuously
        </p>
      </div>
    </MGlowEffect>
    
    <!-- Pulse Mode -->
    <MGlowEffect 
      mode="pulse" 
      :colors="['#EC4899']" 
      blur="strong" 
      :scale="1.1"
      :duration="2"
    >
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-pink-500 rounded-lg mb-4"></div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Pulse Mode</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Pulsing radial gradient with scale animation
        </p>
      </div>
    </MGlowEffect>
    
    <!-- Breathe Mode -->
    <MGlowEffect 
      mode="breathe" 
      :colors="['#10B981']" 
      blur="medium" 
      :scale="1.05"
      :duration="3"
    >
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-emerald-500 rounded-lg mb-4"></div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Breathe Mode</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Subtle breathing effect with gentle scale changes
        </p>
      </div>
    </MGlowEffect>
    
    <!-- Color Shift Mode -->
    <MGlowEffect 
      mode="colorShift" 
      :colors="['#8B5CF6', '#A855F7', '#C084FC']" 
      blur="medium" 
      :scale="1.05"
      :duration="5"
    >
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-purple-500 rounded-lg mb-4"></div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Color Shift</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Smooth transitions between multiple colors
        </p>
      </div>
    </MGlowEffect>
    
    <!-- Flow Horizontal Mode -->
    <MGlowEffect 
      mode="flowHorizontal" 
      :colors="['#0EA5E9', '#06B6D4']" 
      blur="medium" 
      :scale="1.05"
      :duration="4"
    >
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-cyan-500 rounded-lg mb-4"></div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Flow Horizontal</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Horizontal linear gradient flow animation
        </p>
      </div>
    </MGlowEffect>
    
    <!-- Static Mode -->
    <MGlowEffect 
      mode="static" 
      :colors="['#F59E0B', '#F97316']" 
      blur="medium" 
      :scale="1.05"
    >
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg mb-4"></div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Static Mode</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Fixed gradient without animation
        </p>
      </div>
    </MGlowEffect>
  </div>
</template>
```
::

### Hero Section with Glow Effect

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-effect-hero" />
  :::
#code
```vue
<template>
  <div class="relative w-full h-96 rounded-xl overflow-hidden flex items-center justify-center">
    <!-- Background with subtle pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
    
    <!-- Glow effect for the main CTA -->
    <MGlowEffect 
      mode="rotate" 
      :colors="['#8B5CF6', '#EC4899', '#F59E0B']" 
      blur="strong" 
      :scale="1.3"
      :duration="6"
    >
      <div class="relative z-10 text-center p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Transform Your UI
        </h1>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Create stunning interfaces with our collection of animated components and effects
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton 
            size="lg" 
            class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Get Started
          </UButton>
          <UButton 
            size="lg" 
            color="white" 
            variant="outline"
            class="px-8 py-3 font-bold rounded-lg"
          >
            View Demo
          </UButton>
        </div>
      </div>
    </MGlowEffect>
  </div>
</template>
```
::

### Content Highlighting

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-effect-highlight" />
  :::
#code
```vue
<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Documentation</h1>
    
    <div class="prose prose-lg dark:prose-invert">
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        This is a standard paragraph with some text content. Most of the content on this page 
        doesn't need special attention, but some parts are particularly important.
      </p>
      
      <MGlowEffect 
        mode="breathe" 
        :colors="['#F59E0B']" 
        blur="medium" 
        :scale="1.02"
        :duration="3"
      >
        <div class="p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-lg mb-6">
          <h3 class="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">Important Note</h3>
          <p class="text-amber-700 dark:text-amber-300">
            This highlighted section draws attention to critical information that users should not miss. 
            The subtle glow effect helps it stand out from the rest of the content.
          </p>
        </div>
      </MGlowEffect>
      
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        You can continue with your regular content after the highlighted section. The glow effect 
        is only applied to the specific element that needs emphasis.
      </p>
      
      <MGlowEffect 
        mode="pulse" 
        :colors="['#10B981']" 
        blur="strong" 
        :scale="1.05"
        :duration="2"
      >
        <div class="inline-block">
          <UBadge 
            variant="subtle" 
            color="green" 
            size="lg"
            class="text-green-700 dark:text-green-300"
          >
            <UIcon name="i-heroicons-check-circle" class="w-4 h-4 mr-1" />
            New Feature Available
          </UBadge>
        </div>
      </MGlowEffect>
      
      <p class="text-gray-600 dark:text-gray-400 mt-6">
        Badge elements can also benefit from glow effects to draw attention to new features or important tags.
      </p>
    </div>
  </div>
</template>
```
::

## Animation Modes

The GlowEffect component supports several animation modes:

- **rotate**: Creates a rotating conic gradient effect
- **pulse**: Pulsing radial gradient with scale and opacity changes
- **breathe**: Subtle breathing effect with slight scale changes
- **colorShift**: Smooth transitions between colors in a conic gradient
- **flowHorizontal**: Horizontal linear gradient flow
- **static**: Fixed gradient without animation

## Blur Intensities

Choose from predefined blur intensities or specify a custom pixel value:

- **softest**: `blur-xs`
- **soft**: `blur-sm`
- **medium**: `blur-md`
- **strong**: `blur-lg`
- **stronger**: `blur-xl`
- **strongest**: `blur-2xl`
- **none**: `blur-none`
- **Custom**: Any numeric value (e.g., `:blur="10"` for 10px blur)

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glowEffect` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `pointer-events-none absolute inset-0 h-full w-full transform-gpu` |
