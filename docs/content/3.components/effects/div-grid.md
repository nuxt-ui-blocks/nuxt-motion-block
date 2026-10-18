---
title: Div Grid
description: Grid of div elements with customizable size, colors, and interactive behavior.
---

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
  <div class="p-4 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
      Div Grid
    </h3>
    <MDivGrid
      :rows="5"
      :cols="10"
      :cell-size="40"
      border-color="border"
      fill-color="primary"
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
  <div class="flex w-full flex-col items-center gap-4 py-2">
    <MDivGrid
      :key="clicks"
      :rows="8"
      :cols="12"
      :cell-size="20"
      :clicked-cell="clicked"
      border-color="border"
      fill-color="primary"
      class="overflow-hidden rounded-lg border border-default"
      @cell-click="onCellClick"
    />

    <p class="text-sm text-muted">
      <template v-if="clicked">
        Ripple from row <span class="font-medium text-highlighted">{{ clicked.row }}</span>, column <span class="font-medium text-highlighted">{{ clicked.col }}</span>
      </template>
      <template v-else>
        Click any cell to trigger the ripple.
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const clicked = ref<{ row: number, col: number } | null>(null)
const clicks = ref(0)

const onCellClick = (row: number, col: number) => {
  clicked.value = { row, col }
  clicks.value++
}
</script>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="div-grid-custom" />
  :::
#code
  <PlaygroundCode name="DivGrid" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the grid container.
  ::
  
  ::component-prop{name="rows" type="number" default="7"}
  Number of rows in the grid.
  ::
  
  ::component-prop{name="cols" type="number" default="30"}
  Number of columns in the grid.
  ::
  
  ::component-prop{name="cellSize" type="number" default="56"}
  Size of each cell in pixels.
  ::
  
  ::component-prop{name="borderColor" type="string" default="'#3f3f46'"}
  Border color of the cells.
  ::
  
  ::component-prop{name="fillColor" type="string" default="'rgba(14,165,233,0.3)'"}
  Fill color of the cells.
  ::
  
  ::component-prop{name="clickedCell" type="object" default="null"}
  Object representing the clicked cell with row and col properties.
  ::
  
  ::component-prop{name="interactive" type="boolean" default="true"}
  Whether the grid is interactive.
  ::
::

## Events

::component-events
  ::component-event{name="cellClick" type="function"}
  Emitted when a cell is clicked. Returns the row and column indices.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.divGrid` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `div-grid relative z-[3]`
  ::
  ::component-slot-row{name="cell"}
  `cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]`
  ::
::

