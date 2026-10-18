---
title: Focus Cards
description: Interactive card grid with hover effects that expand and focus on individual cards.
navigation:
  icon: i-lucide-layout-grid
---

# Focus Cards

The FocusCards component creates an interactive grid of cards that expand and focus when hovered. It's perfect for showcasing portfolios, products, or any collection of items with engaging hover effects.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="focus-cards-basic" />
  :::
#code
```vue
<template>
  <MFocusCards :cards="cards" />
</template>

<script setup>
const cards = [
  {
    id: 1,
    title: 'Focus Card',
    description: 'This is a focus card with hover effects',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'Second Card',
    description: 'Another focus card in the collection',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: 'Third Card',
    description: 'The final card in this set',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
]
</script>
```
::

## Props

::field-group
  ::field{name="cards" type="Card[]" required}
  Array of card objects to display in the grid.
  ::
::

## Card Object Structure

Each card in the [cards](#cards) array should have the following properties:

::field-group
  ::field{name="title" type="string" required}
  Title to display on the card.
  ::
  
  ::field{name="src" type="string" required}
  URL of the image to display as the card background.
  ::
  
  ::field{name="description" type="string"}
  Description to display on the card.
  ::
::

## Examples

### Basic Focus Cards

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="focus-cards-basic" />
  :::
#code
```vue
<template>
  <MFocusCards :cards="cards" />
</template>

<script setup>
const cards = [
  {
    id: 1,
    title: 'Mountain View',
    description: 'Beautiful mountain landscape',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'Ocean Sunset',
    description: 'Stunning ocean view at sunset',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: 'Forest Path',
    description: 'Peaceful walking trail through the woods',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
]
</script>
```
::

### With Custom Content

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="focus-cards-content" />
  :::
#code
```vue
<template>
  <MFocusCards :cards="cards">
    <template #card="{ card }">
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2">{{ card.title }}</h3>
        <p class="text-gray-600 dark:text-gray-400">{{ card.description }}</p>
        <UButton color="primary" variant="solid" size="sm" class="mt-4">Learn More</UButton>
      </div>
    </template>
  </MFocusCards>
</template>

<script setup>
const cards = [
  {
    id: 1,
    title: 'Custom Card 1',
    description: 'This card has custom content',
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'Custom Card 2',
    description: 'Another card with custom styling',
    src: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
]
</script>
```
::

### With Different Sizes

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="focus-cards-sizes" />
  :::
#code
```vue
<template>
  <MFocusCards :cards="cards" class="h-96" />
</template>

<script setup>
const cards = [
  {
    id: 1,
    title: 'Large Card',
    description: 'This card has a larger height',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'Another Large Card',
    description: 'Consistent sizing across all cards',
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
]
</script>
```
::

### With Gradient Overlay

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="focus-cards-gradient" />
  :::
#code
```vue
<template>
  <MFocusCards :cards="cards" overlay-class="bg-gradient-to-t from-black/80 to-transparent" />
</template>

<script setup>
const cards = [
  {
    id: 1,
    title: 'Gradient Overlay',
    description: 'Cards with gradient overlay effect',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'Dark Overlay',
    description: 'Enhanced text visibility with dark overlay',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
]
</script>
```
::

