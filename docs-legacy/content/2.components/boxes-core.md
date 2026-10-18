---
title: Boxes Core
description: Animated grid of boxes with hover effects and customizable colors.
navigation:
  icon: i-lucide-grid-2x2
---

# Boxes Core

The BoxesCore component creates an animated grid of boxes with hover effects and customizable colors. It's perfect for creating dynamic background patterns and visual effects.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="boxes-core-example" />
  :::
#code
```vue
<template>
  <div class="relative h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <MBoxesCore
      class="h-full w-full opacity-30"
      :rows="50"
      :cols="30"
      :skew="true"
      :colors="['#93c5fd', '#f9a8d4', '#86efac', '#fde047', '#fca5a5', '#d8b4fe']"
      :show-plus-signs="true"
      border-color="border-blue-200 dark:border-blue-800"
    />
    <div
      class="flex flex-col items-center justify-center text-center p-6"
    >
      <div class="p-6 max-w-md relative z-10">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Interactive Dashboard
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Hover over the grid to see interactive animations. This background effect enhances data visualization interfaces.
        </p>
        <UButton
          color="primary"
          size="lg"
        >
          Get Started
        </UButton>
      </div>
    </div>
  </div>
</template>

```
::

## Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="rows" type="number" default="150"}
  Number of rows in the grid.
  ::
  
  ::field{name="cols" type="number" default="100"}
  Number of columns in the grid.
  ::
  
  ::field{name="colors" type="string[]" default="['#93c5fd', '#f9a8d4', '#86efac', '#fde047', '#fca5a5', '#d8b4fe', '#93c5fd', '#a5b4fc', '#c4b5fd']"}
  Array of colors to use for hover effects.
  ::
  
  ::field{name="skew" type="boolean" default="true"}
  Whether to apply skew transformation to the grid.
  ::
  
  ::field{name="showPlusSigns" type="boolean" default="true"}
  Whether to show plus signs at grid intersections.
  ::
  
  ::field{name="borderColor" type="string" default="border-muted"}
  Border color classes for the grid lines.
  ::
::

## Examples

### Basic Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="boxes-core-basic" />
  :::
#code
```vue
<template>
  <div class="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
    <MBoxesCore
      class="h-[500px] w-full opacity-20"
      :rows="50"
      :cols="40"
      :colors="['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']"
      :skew="true"
      :show-plus-signs="true"
      border-color="border-gray-200 dark:border-gray-700"
    />
    <div class="absolute inset-0 flex items-center justify-center p-4">
      <div class="text-center p-10 relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
          <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span class="text-blue-700 dark:text-blue-300 font-medium">Next-Gen UI</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Transform Your Digital Experience
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Create stunning interfaces with our collection of animated components that enhance user engagement and drive results.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <UButton size="lg" color="primary" class="px-8 py-3">
            <UIcon name="i-lucide-rocket" class="w-5 h-5 mr-2" />
            Get Started
          </UButton>
          <UButton size="lg" variant="outline" class="px-8 py-3">
            <UIcon name="i-lucide-play" class="w-5 h-5 mr-2" />
            Watch Demo
          </UButton>
        </div>
        <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-green-500 mr-2" />
            <span>No credit card required</span>
          </div>
          <div class="flex items-center">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-green-500 mr-2" />
            <span>14-day free trial</span>
          </div>
          <div class="flex items-center">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-green-500 mr-2" />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

```
::

### Hero Section Background

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="boxes-core-hero" />
  :::
#code
```vue
<template>
  <div class="relative h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
    <MBoxesCore
      class="h-full w-full opacity-20"
      :rows="30"
      :cols="25"
      :colors="['#93c5fd', '#60a5fa', '#a5b4fc']"
      :skew="true"
      :show-plus-signs="false"
      border-color="border-default"
    />
    <div
      class="flex flex-col items-center justify-center text-center p-8"
    >
      <div class="p-8 max-w-2xl relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Modern Web Experiences
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Create stunning interfaces with our collection of animated components
        </p>
        <div class="flex gap-4 justify-center">
          <UButton
            size="lg"
            color="primary"
          >
            Start Building
          </UButton>
          <UButton
            size="lg"
            color="neutral"
          >
            View Demo
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

```
::

### Login Page Background

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="boxes-core-login" />
  :::
#code
```vue
<template>
  <div class="relative h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <MBoxesCore
      class="h-full w-full opacity-15"
      :rows="35"
      :cols="25"
      :colors="['#60a5fa', '#3b82f6', '#2563eb']"
      :skew="true"
      :show-plus-signs="true"
      border-color="border-blue-200 dark:border-blue-800"
    />
    <div
      class="flex items-center justify-center p-8"
    >
      <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative z-10">
        <div class="text-center mb-8">
          <div class="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your account
          </p>
        </div>

        <form class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="you@example.com"
            >
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <a
                href="#"
                class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >Forgot?</a>
            </div>
            <input
              type="password"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
            >
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
            >
            <label class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Don't have an account?
            <a
              href="#"
              class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >Sign up</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

```
::

### Data Visualization Overlay

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="boxes-core-analytics" />
  :::
#code
```vue
<template>
  <div class="relative h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <MBoxesCore
      class="h-full w-full opacity-30"
      :rows="40"
      :cols="30"
      :colors="['#86efac', '#22c55e', '#16a34a']"
      :skew="true"
      :show-plus-signs="false"
      border-color="border-emerald-200 dark:border-emerald-800"
    />
    <div class="flex flex-col items-center justify-center p-8">
      <div class="p-8 text-center max-w-2xl relative z-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-emerald-600 dark:text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Analytics Dashboard
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Real-time insights with interactive data visualizations. Hover over the background to see dynamic animations.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              24.8%
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              Conversion Rate
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              1.2K
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              Monthly actives
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
              89.3%
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              Retention
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.boxesCore` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4` |
| `row` | `relative h-8 w-16 border-l` |
| `cell` | `relative h-8 w-16 border-t border-r` |
| `plusSign` | `pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px]` |
