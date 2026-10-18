---
title: Glare Card
description: Interactive card with dynamic glare effects that respond to mouse movement.
---

The Glare Card component creates an interactive card with dynamic glare effects that respond to mouse movement. As you move your cursor over the card, a realistic light reflection effect follows your movement, creating an engaging 3D-like experience.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glare-card-example" />
  :::
#code
```vue
<template>
  <MGlareCard>
    <div class="flex flex-col items-center justify-center h-full space-y-4">
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
        <UIcon
          name="i-heroicons-sparkles"
          class="w-8 h-8 text-white"
        />
      </div>
      <h3 class="text-2xl font-bold text-white">
        Glare Effect
      </h3>
      <p class="text-dimmed text-center">
        Move your cursor over the card to see the dynamic glare effect in action.
      </p>
      <UButton
        color="primary"
        @click="handleClick"
      >
        Try It
      </UButton>
    </div>
  </MGlareCard>
</template>

<script setup>
const handleClick = () => {
  alert('Glare effect is working!')
}
</script>
```
::

## Examples

### Social Media Post Card

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glare-card-advanced" />
  :::
#code
```vue
<template>
  <MGlareCard
    class="w-96 h-80 bg-accented"
    glare-color="rgba(59,130,246,0.8)"
    glare-color-inner="rgba(59,130,246,0.65)"
    glare-color-outer="rgba(59,130,246,0)"
  >
    <template #header>
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center space-x-3">
          <UAvatar
            src="https://picsum.photos/200/200?random=1"
            size="md"
            alt="Author"
          />
          <div>
            <p class="font-semibold text-white">
              Sarah Williams
            </p>
            <p class="text-xs text-dimmed">
              Posted 2 hours ago
            </p>
          </div>
        </div>
        <UButton
          icon="i-heroicons-ellipsis-horizontal"
          color="neutral"
          variant="ghost"
          size="xs"
        />
      </div>
    </template>

    <div class="p-4">
      <h3 class="text-xl font-bold text-white mb-2">
        Exploring New Design Trends
      </h3>
      <p class="text-dimmed mb-4">
        Just discovered some amazing design trends for 2023. The use of glass morphism and 3D elements
        is really pushing the boundaries of what's possible in modern UI design.
      </p>

      <div class="bg-accented rounded-xl p-4 mb-4">
        <div class="flex items-center space-x-2 mb-2">
          <UIcon
            name="i-heroicons-light-bulb"
            class="w-5 h-5 text-yellow-400"
          />
          <span class="text-sm font-medium text-white">Design Insight</span>
        </div>
        <p class="text-sm text-dimmed">
          "The key to great design is understanding how light and shadow interact with surfaces."
        </p>
      </div>

      <div class="flex justify-between text-sm text-dimmed">
        <span>✨ 24 reactions</span>
        <span>💬 8 comments</span>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between p-4 border-t border-accented">
        <UButton
          icon="i-heroicons-heart"
          color="neutral"
          variant="ghost"
          size="sm"
          class="flex-1 mr-1"
        >
          Like
        </UButton>
        <UButton
          icon="i-heroicons-chat-bubble-left-right"
          color="neutral"
          variant="ghost"
          size="sm"
          class="flex-1 mx-1"
        >
          Comment
        </UButton>
        <UButton
          icon="i-heroicons-arrow-up-tray"
          color="neutral"
          variant="ghost"
          size="sm"
          class="flex-1 ml-1"
        >
          Share
        </UButton>
      </div>
    </template>
  </MGlareCard>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="glare-card-custom" />
  :::
#code
  <PlaygroundCode name="GlareCard" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the card.
  ::
  
  ::component-prop{name="ui" type="object" default="{}"}
  UI configuration for the underlying UCard component.
  ::
  
  ::component-prop{name="glareColor" type="string" default="'rgba(255,255,255,0.8)'"}
  Primary glare color at the center of the effect.
  ::
  
  ::component-prop{name="glareColorInner" type="string" default="'rgba(255,255,255,0.65)'"}
  Inner glare color between the center and outer edge.
  ::
  
  ::component-prop{name="glareColorOuter" type="string" default="'rgba(255,255,255,0)'"}
  Outer glare color at the edge of the effect.
  ::
  
  ::component-prop{name="rainbowColors" type="string[]" default="['rgb(255,119,115)', 'rgba(255,237,95,1)', 'rgba(168,255,95,1)', 'rgba(131,255,247,1)', 'rgba(120,148,255,1)', 'rgb(216,117,255)', 'rgb(255,119,115)']"}
  Colors for the rainbow pattern effect.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glareCard` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative isolate [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform`
  ::
  ::component-slot-row{name="card"}
  `h-full will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden relative`
  ::
  ::component-slot-row{name="background"}
  `absolute inset-0 mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity pointer-events-none z-0 [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)] after:content-[""] after:absolute after:inset-0 after:mix-blend-exclusion after:[background-size:var(--foil-size),_200%_400%,_800%,_200%] after:[background-position:center,_0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)] after:[background-blend-mode:soft-light,_hue,_hard-light]`
  ::
  ::component-slot-row{name="glare"}
  `absolute inset-0 mix-blend-soft-light opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background pointer-events-none z-10`
  ::
  ::component-slot-row{name="header"}
  `relative z-10`
  ::
  ::component-slot-row{name="content"}
  `relative z-10`
  ::
  ::component-slot-row{name="footer"}
  `relative z-10`
  ::
  ::component-slot-row{name="placeholder"}
  `text-white space-y-4`
  ::
  ::component-slot-row{name="placeholderIcon"}
  `w-12 h-12 mx-auto text-primary`
  ::
  ::component-slot-row{name="placeholderTitle"}
  `text-2xl font-bold`
  ::
  ::component-slot-row{name="placeholderText"}
  `text-dimmed`
  ::
::

