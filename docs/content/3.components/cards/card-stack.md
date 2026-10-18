---
title: Stacked Cards
description: Animated stack of cards that automatically rotate with smooth transitions.
---

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
  <div class="flex justify-center h-64">
    <MCardStack
      :items="[
        { id: 1, title: 'First Card', content: 'This is the first card in the stack.', name: 'Alice Johnson', designation: 'Software craft' },
        { id: 2, title: 'Second Card', content: 'This is the second card in the stack.', name: 'Bob Smith', designation: 'Product Manager' },
        { id: 3, title: 'Third Card', content: 'This is the third card in the stack.', name: 'Charlie Brown', designation: 'UX Designer' },
      ]"
    />
  </div>
</template>
```
::

## Examples

### Basic Stacked Cards

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
  <div class="flex justify-center h-96">
    <MCardStack
      :items="[
        {
          id: 1,
          title: 'Project Alpha',
          content: 'A revolutionary new product that changes everything.',
          name: 'Sam Rivera',
          designation: 'Lead Developer',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 2,
          title: 'Project Betaeta',
          content: 'An innovative solution for modern businesses.',
          name: 'Sam Designer',
          designation: 'Senior Designer',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 3,
          title: 'Project Gamma',
          content: 'A cutting-edge platform for the future.',
          name: 'Jordan Manager',
          designation: 'Project Manager',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 4,
          title: 'Project Delta',
          content: 'A breakthrough technology that transforms industries.',
          name: 'Taylor Innovator',
          designation: 'Chief Innovation Officer',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
        },
      ]"
      class="w-full max-w-md"
    >
      <template #card="{ item }">
        <UCard class="bg-default shadow-xl rounded-xl border-0">
          <div class="p-6">
            <div class="flex items-start mb-4">
              <img
                :src="item.avatar"
                :alt="item.name"
                class="w-14 h-14 rounded-full mr-4 border-2 border-primary-500"
              >
              <div>
                <h3 class="font-bold text-lg text-highlighted">
                  {{ item.name }}
                </h3>
                <p class="text-muted text-sm">
                  {{ item.designation }}
                </p>
              </div>
            </div>
            <h4 class="font-bold text-xl mb-2 text-highlighted">
              {{ item.title }}
            </h4>
            <p class="text-muted mb-4">
              {{ item.content }}
            </p>
            <div class="flex justify-between items-center">
              <UButton
                color="primary"
                variant="solid"
                size="sm"
              >
                View Project
              </UButton>
              <div class="flex space-x-2">
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="sm"
                >
                  <UIcon
                    name="i-lucide-heart"
                    class="w-4 h-4"
                  />
                </UButton>
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="sm"
                >
                  <UIcon
                    name="i-lucide-share"
                    class="w-4 h-4"
                  />
                </UButton>
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </MCardStack>
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
    <component-example name="card-stack-custom" />
  :::
#code
  <PlaygroundCode name="CardStack" />
::

## Props

::component-props
  ::component-prop{name="items" type="Card[]" required}
  Array of card objects to display in the stack.
  ::
  
  ::component-prop{name="offset" type="number" default="10"}
  Vertical offset between cards in pixels.
  ::
  
  ::component-prop{name="scaleFactor" type="number" default="0.06"}
  Scale factor for each subsequent card.
  ::
  
  ::component-prop{name="autoRotate" type="boolean" default="true"}
  Whether to automatically rotate cards.
  ::
  
  ::component-prop{name="rotateInterval" type="number" default="5000"}
  Interval between automatic rotations in milliseconds.
  ::
  
  ::component-prop{name="class" type="string" default="'h-60 w-60 md:h-60 md:w-96'"}
  CSS classes to apply to the container.
  ::
::

## Card Object Structure

Each card in the [items](#items) array should have the following properties:

::component-props
  ::component-prop{name="id" type="number" required}
  Unique identifier for the card.
  ::
  
  ::component-prop{name="name" type="string" required}
  Name to display in the card footer.
  ::
  
  ::component-prop{name="designation" type="string" required}
  Designation to display in the card footer.
  ::
  
  ::component-prop{name="content" type="string" required}
  Content to display in the card body.
  ::
  
  ::component-prop{name="title" type="string"}
  Title to display in the card header. If not provided, defaults to "Card [id]".
  ::
::

## Methods

::component-props
  ::component-prop{name="nextCard" type="function"}
  Manually rotate to the next card.
  ::
  
  ::component-prop{name="prevCard" type="function"}
  Manually rotate to the previous card.
  ::
  
  ::component-prop{name="startFlipping" type="function"}
  Start automatic card rotation.
  ::
  
  ::component-prop{name="stopFlipping" type="function"}
  Stop automatic card rotation.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.cardStack` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative`
  ::
  ::component-slot-row{name="card"}
  `absolute w-full h-full`
  ::
  ::component-slot-row{name="header"}
  `flex items-center justify-between`
  ::
  ::component-slot-row{name="title"}
  `text-lg font-semibold text-highlighted`
  ::
  ::component-slot-row{name="content"}
  `flex-1 font-normal text-default`
  ::
  ::component-slot-row{name="footer"}
  `flex items-center gap-2`
  ::
  ::component-slot-row{name="avatar"}
  `rounded-full`
  ::
  ::component-slot-row{name="name"}
  `text-muted font-medium dark:text-inverted`
  ::
  ::component-slot-row{name="designation"}
  `text-muted font-normal dark:text-default text-sm`
  ::
::

