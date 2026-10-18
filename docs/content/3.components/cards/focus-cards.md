---
title: Focus Cards
description: Interactive card grid with hover effects that expand and focus on individual cards.
---

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
  <MFocusCards
    :cards="cards"
    class="max-w-4xl mx-auto"
  />
</template>

<script setup>
const cards = [
  {
    id: 1,
    title: 'Mountain Adventure',
    description: 'Experience breathtaking mountain landscapes and challenging trails with our expert guides',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Nature',
    author: 'Alex Explorer',
  },
  {
    id: 2,
    title: 'Ocean Sunset',
    description: 'Stunning ocean views with vibrant sunset colors over the horizon and peaceful waters',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Seascape',
    author: 'Sam Photographer',
  },
  {
    id: 3,
    title: 'Forest Path',
    description: 'Peaceful walking trail through ancient woodland with rich biodiversity and wildlife',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Wildlife',
    author: 'Jordan Naturalist',
  },
  {
    id: 4,
    title: 'Desert Dunes',
    description: 'Golden sand dunes stretching to the horizon under starry skies and desert wildlife',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Desert',
    author: 'Taylor Adventurer',
  },
  {
    id: 5,
    title: 'City Lights',
    description: 'Urban skyline illuminated at night with modern architectural marvels and city life',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Urban',
    author: 'Morgan Urbanist',
  },
  {
    id: 6,
    title: 'Northern Lights',
    description: 'Aurora borealis dancing across the night sky in vibrant greens and purples',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Aurora',
    author: 'Casey Aurora',
  },
]
</script>
```
::

## Examples

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
        <h3 class="text-xl font-bold mb-2">
          {{ card.title }}
        </h3>
        <p class="text-muted">
          {{ card.description }}
        </p>
        <UButton
          color="primary"
          variant="solid"
          size="sm"
          class="mt-4"
        >
          Learn More
        </UButton>
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
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Custom Card 2',
    description: 'Another card with custom styling',
    src: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
]
</script>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="focus-cards-custom" />
  :::
#code
  <PlaygroundCode name="FocusCards" />
::
## Props

::component-props
  ::component-prop{name="cards" type="Card[]" required}
  Array of card objects to display in the grid.
  ::
::

## Card Object Structure

Each card in the [cards](#cards) array should have the following properties:

::component-props
  ::component-prop{name="title" type="string" required}
  Title to display on the card.
  ::
  
  ::component-prop{name="src" type="string" required}
  URL of the image to display as the card background.
  ::
  
  ::component-prop{name="description" type="string"}
  Description to display on the card.
  ::
::

