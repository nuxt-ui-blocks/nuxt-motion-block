---
title: Word Rotate
description: Component that rotates through different words with smooth transitions.
---

The WordRotate component rotates through different words with smooth transitions. It's perfect for creating dynamic text elements that cycle through different options with engaging animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="word-rotate-basic" />
  :::
#code
```vue
<template>
  <p class="text-xl text-default">
    We
    <MWordRotate
      class="text-primary font-semibold"
      :words="['design', 'build', 'create']"
    />
    amazing experiences.
  </p>
</template>
```
::

## Examples

### Rotating headline

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="word-rotate-complex" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 p-6 text-center">
    <UBadge
      color="primary"
      variant="subtle"
    >
      New
    </UBadge>
    <h2 class="text-3xl font-semibold text-highlighted sm:text-4xl">
      Ship your ideas
      <MWordRotate
        class="text-primary"
        :words="['faster', 'cleaner', 'together']"
        animation-style="slide-up"
        :duration="2000"
      />
    </h2>
    <p class="max-w-md text-sm text-muted">
      One workflow for the whole team, from first sketch to production.
    </p>
  </div>
</template>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="word-rotate-custom" />
  :::
#code
  <PlaygroundCode name="WordRotate" />
::

## Props

::component-props
  ::component-prop{name="words" type="string[]" :required="true"}
  Array of words to rotate through.
  ::
  
  ::component-prop{name="duration" type="number" default="1500"}
  Duration each word is visible in milliseconds.
  ::
  
  ::component-prop{name="animationStyle" type="'fade' | 'slide-up' | 'slide-down' | 'scale' | 'flip'" default="'fade'"}
  Animation style for transitions.
  ::
  
  ::component-prop{name="loop" type="boolean" default="true"}
  Whether to loop through words.
  ::
  
  ::component-prop{name="pauseDuration" type="number" default="300"}
  Pause duration between word transitions.
  ::
  
  ::component-prop{name="startOnView" type="boolean" default="true"}
  Start animation when component enters viewport.
  ::
  
  ::component-prop{name="once" type="boolean" default="false"}
  Animate only once.
  ::
  
  ::component-prop{name="inViewMargin" type="string" default="'0px'"}
  Margin for in-view detection.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the word container.
  ::
  
  ::component-prop{name="containerClass" type="string" default="''"}
  CSS classes to apply to the root container.
  ::
  
  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.wordRotate` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-block overflow-hidden`
  ::
  ::component-slot-row{name="word"}
  `inline-block overflow-hidden`
  ::
::

## Accessibility

The rotating word is a plain `span` with no `aria-live` region, so assistive technology reads whichever word is in the DOM at the moment it queries the node — it does not re-announce each rotation. When the sequence itself carries meaning, expose it statically: add an `aria-label` to the surrounding element or render the full list of words somewhere reachable, rather than relying on the visual cycle.

`class` is applied to the animated word `span` and `containerClass` to the root `span`; neither adds a role or landmark. In the common hero-headline usage the rotation is decorative and the surrounding sentence already conveys the message, which is the safe pattern.

## Performance

- One `setInterval` (word visibility) and one `setTimeout` (pause) drive the cycle; both are cleared on unmount, so nothing leaks between mounts.
- Only the current word is in the DOM — a single keyed `Motion` span is swapped per tick, so the node count stays at one rather than growing with `words`.
- `startOnView` uses an intersection observer through `useElementVisibility`, which stays subscribed until unmount; `once` is enforced by a guard on the start, not by disconnecting the observer.
- There is no scroll or resize listener; the transitions are transform/opacity only and are handed to the browser compositor.
