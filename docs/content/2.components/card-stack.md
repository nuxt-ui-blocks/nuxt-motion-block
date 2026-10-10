---
title: Card Stack
description: Animated stack of cards that automatically rotate with smooth transitions.
navigation:
  icon: i-lucide-layers
---

# Card Stack

The CardStack component creates an animated stack of cards that automatically rotate with smooth transitions. It's perfect for showcasing a series of items with a visually appealing card stack effect.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full h-64"}
    <component-example name="card-stack-example" />
  :::
#code
```vue
<template>
  <MCardStack :items="[
    { id: 1, title: 'First Card', content: 'This is the first card in the stack.', name: 'Alice Johnson', designation: 'Software Engineer' },
    { id: 2, title: 'Second Card', content: 'This is the second card in the stack.', name: 'Bob Smith', designation: 'Product Manager' },
    { id: 3, title: 'Third Card', content: 'This is the third card in the stack.', name: 'Charlie Brown', designation: 'UX Designer' }
  ]" />
</template>
```
::

## Props

::field-group
  ::field{name="items" type="Card[]" required}
  Array of card objects to display in the stack.
  ::
  
  ::field{name="offset" type="number" default="10"}
  Vertical offset between cards in pixels.
  ::
  
  ::field{name="scaleFactor" type="number" default="0.06"}
  Scale factor for each subsequent card.
  ::
  
  ::field{name="autoRotate" type="boolean" default="true"}
  Whether to automatically rotate cards.
  ::
  
  ::field{name="rotateInterval" type="number" default="5000"}
  Interval between automatic rotations in milliseconds.
  ::
  
  ::field{name="class" type="string" default="'h-60 w-60 md:h-60 md:w-96'"}
  CSS classes to apply to the container.
  ::
::

## Card Object Structure

Each card in the [items](#items) array should have the following properties:

::field-group
  ::field{name="id" type="number" required}
  Unique identifier for the card.
  ::
  
  ::field{name="name" type="string" required}
  Name to display in the card footer.
  ::
  
  ::field{name="designation" type="string" required}
  Designation to display in the card footer.
  ::
  
  ::field{name="content" type="string" required}
  Content to display in the card body.
  ::
  
  ::field{name="title" type="string"}
  Title to display in the card header. If not provided, defaults to "Card [id]".
  ::
::

## Methods

::field-group
  ::field{name="nextCard" type="function"}
  Manually rotate to the next card.
  ::
  
  ::field{name="prevCard" type="function"}
  Manually rotate to the previous card.
  ::
  
  ::field{name="startFlipping" type="function"}
  Start automatic card rotation.
  ::
  
  ::field{name="stopFlipping" type="function"}
  Stop automatic card rotation.
  ::
::

## Examples

### Basic Card Stack

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full h-64"}
    <component-example name="card-stack-basic" />
  :::
#code
```vue
<template>
  <MCardStack :items="[
    { id: 1, title: 'Project Alpha', content: 'A revolutionary new product that changes everything.', name: 'Alex Developer', designation: 'Lead Developer' },
    { id: 2, title: 'Project Beta', content: 'An innovative solution for modern businesses.', name: 'Sam Designer', designation: 'Senior Designer' },
    { id: 3, title: 'Project Gamma', content: 'A cutting-edge platform for the future.', name: 'Jordan Manager', designation: 'Project Manager' }
  ]" />
</template>
```
::

### Custom Offset and Scale

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full h-64"}
    <component-example name="card-stack-custom-offset" />
  :::
#code
```vue
<template>
  <MCardStack 
    :items="[
      { id: 1, title: 'Card One', content: 'This card has custom spacing.', name: 'Designer One', designation: 'UI Designer' },
      { id: 2, title: 'Card Two', content: 'Notice the increased offset.', name: 'Designer Two', designation: 'UX Designer' },
      { id: 3, title: 'Card Three', content: 'And the different scale factor.', name: 'Designer Three', designation: 'Product Designer' }
    ]" 
    :offset="20" 
    :scale-factor="0.1" 
  />
</template>
```
::

### Manual Control

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="card-stack-manual-control" />
  :::
#code
```vue
<template>
  <div class="space-y-6">
    <div class="flex justify-center h-64">
      <MCardStack 
        ref="cardStackRef"
        :items="[
          { id: 1, title: 'Manual Control', content: 'Use the buttons below to control this card stack.', name: 'Control Panel', designation: 'Demo' },
          { id: 2, title: 'Second Card', content: 'This card can be manually rotated.', name: 'Manual Control', designation: 'Demo' },
          { id: 3, title: 'Third Card', content: 'The rotation interval has been disabled.', name: 'Manual Control', designation: 'Demo' }
        ]"
        :auto-rotate="false"
      />
    </div>
    
    <div class="flex justify-center gap-4">
      <UButton @click="prevCard">Previous</UButton>
      <UButton @click="nextCard">Next</UButton>
      <UButton @click="toggleAutoRotate">
        {{ isAutoRotating ? 'Stop' : 'Start' }} Auto Rotate
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cardStackRef = ref()
const isAutoRotating = ref(false)

const nextCard = () => {
  cardStackRef.value.nextCard()
}

const prevCard = () => {
  cardStackRef.value.prevCard()
}

const toggleAutoRotate = () => {
  if (isAutoRotating.value) {
    cardStackRef.value.stopFlipping()
  } else {
    cardStackRef.value.startFlipping()
  }
  isAutoRotating.value = !isAutoRotating.value
}
</script>
```
::

### Custom Rotation Interval

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center h-64"}
    <component-example name="card-stack-custom-interval" />
  :::
#code
```vue
<template>
  <MCardStack 
    :items="[
      { id: 1, title: 'Fast Rotation', content: 'This stack rotates every 2 seconds.', name: 'Timer', designation: 'Demo' },
      { id: 2, title: 'Second Card', content: 'Notice the faster rotation speed.', name: 'Timer', designation: 'Demo' },
      { id: 3, title: 'Third Card', content: 'Great for dynamic content.', name: 'Timer', designation: 'Demo' }
    ]" 
    :rotate-interval="2000"
  />
</template>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center h-64"}
    <component-example name="card-stack-custom-styling" />
  :::
#code
```vue
<template>
  <MCardStack 
    :items="[
      { id: 1, title: 'Custom Style', content: 'This stack has custom dimensions and styling.', name: 'Designer', designation: 'UI/UX' },
      { id: 2, title: 'Second Card', content: 'Notice the different size and colors.', name: 'Designer', designation: 'UI/UX' },
      { id: 3, title: 'Third Card', content: 'Perfect for branded presentations.', name: 'Designer', designation: 'UI/UX' }
    ]" 
    class="h-72 w-80"
  />
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.cardStack` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative'` |
| `card` | `'absolute w-full h-full'` |
| `header` | `'flex items-center justify-between'` |
| `title` | `'text-lg font-semibold text-highlighted'` |
| `content` | `'flex-1 font-normal text-default'` |
| `footer` | `'flex items-center gap-2'` |
| `avatar` | `'rounded-full'` |
| `name` | `'text-muted font-medium dark:text-inverted'` |
| `designation` | `'text-muted font-normal dark:text-default text-sm'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.cardStack` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `card` | `absolute w-full h-full` |
| `header` | `flex items-center justify-between` |
| `title` | `text-lg font-semibold text-highlighted` |
| `content` | `flex-1 font-normal text-default` |
| `footer` | `flex items-center gap-2` |
| `avatar` | `rounded-full` |
| `name` | `text-muted font-medium dark:text-inverted` |
| `designation` | `text-muted font-normal dark:text-default text-sm` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.cardStack` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `card` | `absolute w-full h-full` |
| `header` | `flex items-center justify-between` |
| `title` | `text-lg font-semibold text-highlighted` |
| `content` | `flex-1 font-normal text-default` |
| `footer` | `flex items-center gap-2` |
| `avatar` | `rounded-full` |
| `name` | `text-muted font-medium dark:text-inverted` |
| `designation` | `text-muted font-normal dark:text-default text-sm` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.cardStack` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
| `card` | `absolute w-full h-full` |
| `header` | `flex items-center justify-between` |
| `title` | `text-lg font-semibold text-highlighted` |
| `content` | `flex-1 font-normal text-default` |
| `footer` | `flex items-center gap-2` |
| `avatar` | `rounded-full` |
| `name` | `text-muted font-medium dark:text-inverted` |
| `designation` | `text-muted font-normal dark:text-default text-sm` |
