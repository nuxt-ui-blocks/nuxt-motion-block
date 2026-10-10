---
title: Div Grid
description: Grid of div elements with customizable size, colors, and interactive behavior.
navigation:
  icon: i-lucide-grid-3x3
---

# Div Grid

The DivGrid component creates a grid of div elements with customizable size, colors, and interactive behavior. It's perfect for creating background patterns and interactive grids.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="div-grid-example" />
  :::
#code
```vue
<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Div Grid</h3>
    <MDivGrid
      :rows="5"
      :cols="10"
      :cell-size="40"
      border-color="#4b5563"
      fill-color="rgba(59, 130, 246, 0.3)"
      class="mx-auto"
      @cell-click="handleCellClick"
    />
  </div>
</template>

<script setup lang="ts">
const handleCellClick = (row: number, col: number) => {
  console.log(`Cell clicked: row ${row}, col ${col}`)
}
</script>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the grid container.
  ::
  
  ::field{name="rows" type="number" default="7"}
  Number of rows in the grid.
  ::
  
  ::field{name="cols" type="number" default="30"}
  Number of columns in the grid.
  ::
  
  ::field{name="cellSize" type="number" default="56"}
  Size of each cell in pixels.
  ::
  
  ::field{name="borderColor" type="string" default="'#3f3f46'"}
  Border color of the cells.
  ::
  
  ::field{name="fillColor" type="string" default="'rgba(14,165,233,0.3)'"}
  Fill color of the cells.
  ::
  
  ::field{name="clickedCell" type="object" default="null"}
  Object representing the clicked cell with row and col properties.
  ::
  
  ::field{name="interactive" type="boolean" default="true"}
  Whether the grid is interactive.
  ::
::

## Events

::field-group
  ::field{name="cellClick" type="function"}
  Emitted when a cell is clicked. Returns the row and column indices.
  ::
::

## Examples

### Basic Div Grid

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="div-grid-basic" />
  :::
#code
```vue
<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl">
    <div class="max-w-4xl mx-auto text-center mb-8">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
        <UIcon name="i-lucide-grid" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <span class="text-blue-700 dark:text-blue-300 font-medium">Interactive Patterns</span>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Dynamic Grid System</h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Experience our dynamic grid layout with interactive cells that respond to user interactions with beautiful ripple effects
      </p>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Interactive Grid Demo</h3>
            <div class="flex justify-center">
              <MDivGrid
                :rows="8"
                :cols="12"
                :cell-size="20"
                class="mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
                :clicked-cell="{ row: 4, col: 6 }"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <UCard class="text-center">
              <UIcon name="i-lucide-mouse-pointer-click" class="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <h4 class="font-semibold mb-1">Click Interaction</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Click any cell to trigger ripple effects</p>
            </UCard>
            
            <UCard class="text-center">
              <UIcon name="i-lucide-settings" class="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <h4 class="font-semibold mb-1">Customizable</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Adjust rows, columns, and cell sizes</p>
            </UCard>
          </div>
        </div>
        
        <div class="space-y-6">
          <UCard>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Grid Controls</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">Rows: <span class="font-medium">8</span></label>
                <input 
                  type="range" 
                  min="3" 
                  max="15" 
                  value="8" 
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>
              
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">Columns: <span class="font-medium">12</span></label>
                <input 
                  type="range" 
                  min="5" 
                  max="20" 
                  value="12" 
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>
              
              <div>
                <label class="block text-gray-700 dark:text-gray-300 mb-2">Cell Size: <span class="font-medium">20px</span></label>
                <input 
                  type="range" 
                  min="10" 
                  max="40" 
                  value="20" 
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                >
              </div>
              
              <div class="pt-2">
                <UButton color="primary" variant="solid" block>
                  <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 mr-2" />
                  Reset Grid
                </UButton>
              </div>
            </div>
          </UCard>
          
          <UCard>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Use Cases</h3>
            <div class="space-y-3">
              <div class="flex items-start">
                <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">Game Boards</h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Perfect for puzzle and strategy games</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">Data Visualization</h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Visualize data in grid format</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">Interactive Art</h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Create dynamic digital art experiences</p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
    
    <div class="mt-8 text-center max-w-2xl mx-auto">
      <p class="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
        <UIcon name="i-lucide-mouse-pointer" class="w-4 h-4" />
        Click on any cell in the grid above to see the ripple effect animation
      </p>
    </div>
  </div>
</template>
::

### Custom Colors and Interaction

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="div-grid-custom" />
  :::
#code
```vue
<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Custom Div Grid</h3>
    <MDivGrid
      :rows="8"
      :cols="12"
      :cell-size="25"
      border-color="#7e22ce"
      fill-color="rgba(192, 132, 252, 0.3)"
      :interactive="true"
      class="mx-auto"
      @cell-click="handleCellClick"
    />
  </div>
</template>

<script setup lang="ts">
const handleCellClick = (row: number, col: number) => {
  console.log(`Custom grid cell clicked: row ${row}, col ${col}`)
}
</script>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.divGrid` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `div-grid relative z-[3]` |
| `cell` | `cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]` |
