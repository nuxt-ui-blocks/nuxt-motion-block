---
title: Boxes Core
description: Animated grid of boxes with hover effects and customizable colors.
---

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
  <div class="relative h-full rounded-xl overflow-hidden border border-default bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <MBoxesCore
      class="h-full w-full opacity-30"
      :rows="50"
      :cols="30"
      :skew="true"
      :colors="['#93c5fd', '#f9a8d4', '#86efac', '#fde047', '#fca5a5', '#d8b4fe']"
      :show-plus-signs="true"
      border-color="border-primary/20 dark:border-primary/80"
    />
    <div
      class="flex flex-col items-center justify-center text-center p-6"
    >
      <div class="p-6 max-w-md relative z-10">
        <h2 class="text-3xl font-bold text-highlighted mb-4">
          Interactive Dashboard
        </h2>
        <p class="text-muted mb-6">
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

## Examples

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

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="boxes-core-custom" />
  :::
#code
  <PlaygroundCode name="BoxesCore" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="rows" type="number" default="150"}
  Number of rows in the grid.
  ::
  
  ::component-prop{name="cols" type="number" default="100"}
  Number of columns in the grid.
  ::
  
  ::component-prop{name="colors" type="string[]" default="['#93c5fd', '#f9a8d4', '#86efac', '#fde047', '#fca5a5', '#d8b4fe', '#93c5fd', '#a5b4fc', '#c4b5fd']"}
  Array of colors to use for hover effects.
  ::
  
  ::component-prop{name="skew" type="boolean" default="true"}
  Whether to apply skew transformation to the grid.
  ::
  
  ::component-prop{name="showPlusSigns" type="boolean" default="true"}
  Whether to show plus signs at grid intersections.
  ::
  
  ::component-prop{name="borderColor" type="string" default="border-muted"}
  Border color classes for the grid lines.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.boxesCore` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4`
  ::
  ::component-slot-row{name="row"}
  `relative h-8 w-16 border-l`
  ::
  ::component-slot-row{name="cell"}
  `relative h-8 w-16 border-t border-r`
  ::
  ::component-slot-row{name="plusSign"}
  `pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px]`
  ::
::

