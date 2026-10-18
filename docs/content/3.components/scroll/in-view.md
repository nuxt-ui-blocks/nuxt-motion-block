---
title: In View
description: Animates its content when it scrolls into the viewport, and optionally replays on every entry.
---

The InView component animates its content when it scrolls into the viewport. It
watches the element with VueUse's `useElementVisibility` (backed by the
IntersectionObserver API) and swaps between your `hidden` and `visible` variants,
so you can drive any entrance animation — fade, slide, scale — from scroll
position.

## Usage

Wrap the content you want to animate and let the defaults do the rest: it fades
from `opacity: 0` to `opacity: 1` over `0.6s` the first time it enters the
viewport.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="in-view-basic" />
  :::
#code
```vue
<template>
  <div class="space-y-8 p-6 max-w-3xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-highlighted mb-4">
        Scroll to Reveal
      </h2>
      <p class="text-muted text-lg">
        Content that fades in beautifully when it comes into view
      </p>
    </div>

    <MInView>
      <div class="p-8 bg-default rounded-xl shadow-xl border border-default hover:shadow-2xl transition-shadow">
        <div class="flex items-start">
          <div class="w-14 h-14 rounded-lg bg-primary/10 dark:bg-primary/70 flex items-center justify-center mr-5 flex-shrink-0">
            <UIcon
              name="i-lucide-eye"
              class="w-7 h-7 text-primary"
            />
          </div>
          <div>
            <h3 class="text-2xl font-semibold text-highlighted mb-3">
              InView Animation
            </h3>
            <p class="text-muted text-lg leading-relaxed">
              This content smoothly fades in when it enters your viewport, creating a polished
              scrolling experience that draws attention to important elements.
            </p>
          </div>
        </div>
      </div>
    </MInView>

    <MInView>
      <div class="p-8 bg-default rounded-xl shadow-xl border border-default hover:shadow-2xl transition-shadow mt-8">
        <div class="flex items-start">
          <div class="w-14 h-14 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-5 flex-shrink-0">
            <UIcon
              name="i-lucide-sparkles"
              class="w-7 h-7 text-purple-600 dark:text-purple-400"
            />
          </div>
          <div>
            <h3 class="text-2xl font-semibold text-highlighted mb-3">
              Enhanced Visibility
            </h3>
            <p class="text-muted text-lg leading-relaxed">
              Perfect for showcasing features, testimonials, or important information
              that you want to highlight as users scroll through your content.
            </p>
          </div>
        </div>
      </div>
    </MInView>

    <MInView>
      <div class="p-8 bg-default rounded-xl shadow-xl border border-default hover:shadow-2xl transition-shadow mt-8">
        <div class="flex items-start">
          <div class="w-14 h-14 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mr-5 flex-shrink-0">
            <UIcon
              name="i-lucide-zap"
              class="w-7 h-7 text-green-600 dark:text-green-400"
            />
          </div>
          <div>
            <h3 class="text-2xl font-semibold text-highlighted mb-3">
              Performance Focused
            </h3>
            <p class="text-muted text-lg leading-relaxed">
              Optimized for smooth performance with minimal impact on your page load times,
              ensuring a seamless user experience across all devices.
            </p>
          </div>
        </div>
      </div>
    </MInView>
  </div>
</template>
```
::

## Examples

### Custom variants and transition

Supply your own `variants` and `transition` to change what the entrance looks
like. When `threshold` is not `0.3` you control the trigger point, and the
element animates the first time it is `30%` visible.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="in-view-with-custom-animation" />
  :::
#code
```vue
<template>
  <div class="min-h-screen space-y-8 p-4">
    <div class="h-64" />

    <MInView
      :view-options="{ threshold: 0.3 }"
      :variants="{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }"
      :transition="{
        duration: 0.5,
        ease: 'easeOut',
      }"
    >
      <div class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
        <h3 class="mb-2 text-lg font-medium">
          Tailored motion
        </h3>
        <p>This element uses custom variants for its animation.</p>
      </div>
    </MInView>
  </div>
</template>
```
::

### Render as a different element

The `as` prop swaps the root element while keeping the in-view animation, so you
can hand the component a `section`, a `blockquote` or any other HTML tag without
wrapping it in an extra container.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="in-view-as" />
  :::
#code
```vue
<template>
  <div class="mx-auto max-w-2xl space-y-6 p-6">
    <MInView
      as="section"
      class="rounded-2xl border border-default p-6"
    >
      <h2 class="text-2xl font-semibold text-highlighted">
        Rendered as a section
      </h2>
      <p class="mt-2 text-muted">
        The <code>as</code> prop swaps the root element while keeping the in-view animation.
      </p>
    </MInView>

    <MInView
      as="blockquote"
      class="border-l-4 border-primary pl-4 italic text-muted"
    >
      Semantic markup, animated on entry.
    </MInView>
  </div>
</template>
```
::

### Replay on every entry

With `once` disabled the component follows visibility directly: it animates in
when it enters the viewport and returns to the hidden state when it leaves, so
scrolling away and back replays the animation.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="in-view-replay" />
  :::
#code
```vue
<template>
  <div class="mx-auto max-w-2xl space-y-8 p-6">
    <div class="h-40" />

    <MInView
      :once="false"
      :variants="{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }"
      class="rounded-2xl bg-primary/10 p-6 text-center"
    >
      <p class="text-lg font-medium text-highlighted">
        I animate every time I enter the viewport
      </p>
      <p class="mt-1 text-sm text-muted">
        <code>:once="false"</code> — scroll away and back to replay.
      </p>
    </MInView>

    <div class="h-40" />
  </div>
</template>
```
::

### React to animation events

Use the `animation-start` and `animation-complete` events to run your own logic
when the entrance begins and when it settles. Combine them with `viewOptions` to
fine-tune exactly where the trigger fires.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="in-view-events" />
  :::
#code
```vue
<template>
  <div class="mx-auto max-w-2xl space-y-4 p-6">
    <MInView
      :view-options="{ threshold: 0.4, margin: '0px 0px -80px 0px' }"
      @animation-start="onStart"
      @animation-complete="onComplete"
    >
      <div class="rounded-2xl border border-default p-6 text-center">
        <p class="text-sm text-muted">
          Status: <span class="font-medium text-highlighted">{{ status }}</span>
        </p>
      </div>
    </MInView>

    <div class="h-40" />
  </div>
</template>

<script setup lang="ts">
const status = ref('waiting')
const onStart = () => {
  status.value = 'animating'
}
const onComplete = () => {
  status.value = 'settled'
}
</script>
```
::

## Customize

Tune `as`, `once`, the variants, the transition and the observer options live in
the playground below.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="in-view-custom" />
  :::
#code
  <PlaygroundCode name="InView" />
::

## Props

::component-props
  ::component-prop{name="variants" type="{ hidden: VariantType, visible: VariantType }" default="{ hidden: { opacity: 0 }, visible: { opacity: 1 } }"}
  The two motion states the component animates between. Either key is merged over
  the default, so you only supply the properties you want to change.
  ::
  ::component-prop{name="transition" type="Transition" default="{ duration: 0.6, ease: 'easeOut' }"}
  Motion transition forwarded to the root element, controlling duration and easing.
  ::
  ::component-prop{name="viewOptions" type="{ margin?: string, threshold?: number | number[] }" default="{ margin: '0px', threshold: 0.1 }"}
  Options for the `useElementVisibility` observer. `margin` is the root margin and
  `threshold` the visibility ratio (or ratios) that triggers the animation.
  ::
  ::component-prop{name="as" type="keyof HTMLElementTagNameMap" default="'div'"}
  The HTML tag rendered for the root element. Constrained to real tags so motion-v
  can infer the element type correctly.
  ::
  ::component-prop{name="once" type="boolean" default="true"}
  When `true` the element animates a single time and then stays visible. When
  `false` it follows visibility, re-animating each time it re-enters the viewport.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the root element after the theme's classes.
  ::
::

## Events

::component-events
  ::component-event{name="animationStart" type="() => void"}
  Emitted when the entrance animation starts. The `onAnimationStart` prop is called
  alongside it as an alternative to the listener.
  ::
  ::component-event{name="animationComplete" type="() => void"}
  Emitted when the entrance animation settles. The `onAnimationComplete` prop is
  called alongside it as an alternative to the listener.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The content to animate. Rendered inside the motion root element.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.inView` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
::

## Accessibility

The component renders whatever element `as` resolves to and animates only opacity
or transform, so it adds nothing to the accessibility tree beyond your content.
There are no ARIA attributes, roles or live regions, and the hidden state is a
motion style rather than `display: none` — assistive technology can still read the
content before it has animated in.

Because the entrance is purely decorative, the events are a convenience hook for
your own code, not an accessibility feature. If an animation conveys meaning,
expose that meaning in text.

This component does not read `prefers-reduced-motion`. Motion honours the user's
preference for the transition itself, but if you want to skip the entrance
entirely you should branch on `useReducedMotion` in your own content.

## Performance

- Visibility is tracked by a single `useElementVisibility` observer on the root
  element, so there is one IntersectionObserver per instance and no scroll
  listener.
- Only the properties in your `variants` are animated; the defaults touch
  `opacity` only, which the browser can composite without layout.
- `once` is implemented with a `hasAnimated` ref and a watcher on visibility, so
  latching costs one boolean rather than a second observer.
- `finalVariants` is a `computed`, so changing `variants` after mount re-derives
  the states without recreating the component.

::tip
`viewOptions.margin` accepts any valid IntersectionObserver root margin, such as
`'0px 0px -100px 0px'` to trigger slightly before the element is fully on screen.
The value is read once when the observer is created, so set it up front rather
than mutating it after mount.
::
