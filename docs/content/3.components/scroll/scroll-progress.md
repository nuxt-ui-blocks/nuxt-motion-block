---
title: Scroll Progress
description: A bar whose horizontal scale follows scroll progress, tracking the window or any scroll container.
---

A one-element progress bar. The component renders a single block and sets its
`scaleX` to the current scroll progress, smoothed by a spring. Because the theme
gives it `origin-left`, the scale grows from the left edge to the right, so the
bar reads as a fill.

The visible bar is entirely up to you: the theme only supplies the geometry
(`inset-x-0 top-0 h-1 origin-left`), so add a background colour and a position
(your own `fixed`/`sticky`, or scoped to a container) through `class`.

## Usage

Give the bar a colour and a position with `class`. Here it is pinned to the top
of the window above a long article.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-progress-basic" />
  :::
#code
```vue
<template>
  <MScrollProgress class="bg-primary fixed top-0 z-50" />
  <div class="space-y-8 p-8 max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-highlighted mb-4">
        Scroll Progress Indicator
      </h2>
      <p class="text-muted text-lg">
        Track your reading progress with this visual indicator that updates as you scroll
      </p>
    </div>

    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold text-highlighted">
          Introduction
        </h3>
      </template>
      <p class="text-muted text-lg leading-relaxed">
        The scroll progress indicator is a subtle yet effective way to show users how much of a page
        they've read and how much remains. This can be particularly useful for long articles,
        documentation, or any content where users need to track their progress.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold text-highlighted">
          Benefits
        </h3>
      </template>
      <ul class="list-disc pl-6 space-y-3 text-muted text-lg">
        <li class="pl-2">
          Improves user experience by providing visual feedback
        </li>
        <li class="pl-2">
          Helps users track their progress through long content
        </li>
        <li class="pl-2">
          Encourages completion of articles or forms
        </li>
        <li class="pl-2">
          Subtle animation that doesn't distract from content
        </li>
        <li class="pl-2">
          Works seamlessly across all device sizes
        </li>
      </ul>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold text-highlighted">
          Implementation
        </h3>
      </template>
      <p class="text-muted mb-6 text-lg">
        The scroll progress indicator is easy to implement and customize:
      </p>
      <div class="bg-muted p-5 rounded-lg">
        <pre class="text-sm text-highlighted overflow-x-auto">&lt;MScrollProgress class="bg-primary fixed top-0 z-50" /&gt;</pre>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold text-highlighted">
          Advanced Features
        </h3>
      </template>
      <div class="space-y-4">
        <p class="text-muted text-lg">
          Customize the appearance and behavior to match your design system:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 bg-primary/5 dark:bg-primary/30 rounded-lg">
            <h4 class="font-bold text-primary mb-2">
              Colors
            </h4>
            <p class="text-sm text-primary">
              Match your brand colors
            </p>
          </div>
          <div class="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-2">
              Height
            </h4>
            <p class="text-sm text-purple-600 dark:text-purple-400">
              Adjust thickness
            </p>
          </div>
          <div class="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <h4 class="font-bold text-green-700 dark:text-green-300 mb-2">
              Position
            </h4>
            <p class="text-sm text-green-600 dark:text-green-400">
              Top or bottom
            </p>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="text-2xl font-bold text-highlighted">
          Conclusion
        </h3>
      </template>
      <p class="text-muted text-lg leading-relaxed">
        Adding a scroll progress indicator to your website or application is a simple way to
        enhance the user experience. It provides valuable feedback and helps users navigate
        through your content more effectively. Try implementing it today to see the difference!
      </p>
    </UCard>

    <div class="text-center py-8">
      <UButton
        color="primary"
        variant="solid"
        size="lg"
      >
        <UIcon
          name="i-lucide-download"
          class="w-5 h-5 mr-2"
        />
        Download Component
      </UButton>
    </div>
  </div>
</template>
```
::

## Examples

### Scoped to a scroll container

Pass `containerRef` **as a getter** — `:container-ref="() => panelRef"` — to track
a specific scrollable element instead of the window. A plain binding is unwrapped
by the template and captured as `null` during setup, after which nothing re-reads
it and `useScroll` falls back to the window.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-progress-container" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-lg space-y-3">
    <div
      ref="panelRef"
      class="relative h-64 overflow-y-auto rounded-2xl border border-default"
    >
      <MScrollProgress
        :container-ref="() => panelRef"
        class="sticky top-0 h-1 w-full bg-primary"
      />
      <div class="space-y-4 p-6">
        <p
          v-for="i in 12"
          :key="i"
          class="text-muted"
        >
          Panel content line {{ i }}
        </p>
      </div>
    </div>
    <p class="text-sm text-muted">
      The bar tracks the panel's own scroll, not the page.
    </p>
  </div>
</template>

<script setup lang="ts">
const panelRef = ref<HTMLElement | null>(null)
</script>
```
::

### Custom spring options

`springOptions` tunes how quickly the bar catches up to the scroll position. A
lower `stiffness` and `damping` make the bar trail the scroll with a soft lag.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-progress-spring" />
  :::
#code
```vue
<template>
  <MScrollProgress
    :spring-options="{ stiffness: 100, damping: 30 }"
    class="bg-gradient-to-r from-emerald-500 to-teal-600"
  />
  <div class="space-y-4 p-4">
    <div
      v-for="i in 10"
      :key="i"
      class="h-32 bg-primary rounded"
    />
  </div>
</template>
```
::

## Customize

The bar takes no scalar props beyond its spring, so the playground below seeds a
visible `class` and shows the default `springOptions`.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="scroll-progress-custom" />
  :::
#code
  <PlaygroundCode name="ScrollProgress" />
::

## Props

::component-props
  ::component-prop{name="springOptions" type="SpringOptions" default="{ stiffness: 200, damping: 50, restDelta: 0.001 }"}
  Motion spring options for the progress value. Merged over the defaults, so
  supply only the keys you want to change. A lower `stiffness` and `damping` make
  the bar lag the scroll more.
  ::
  ::component-prop{name="containerRef" type="MaybeComputedElementRef"}
  Scrollable ancestor to track instead of the window. Pass a getter
  (`:container-ref="() => panelRef"`) — see the example above. Left undefined, the
  progress follows document scroll.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the bar. The theme only supplies geometry and `origin-left`, so add
  a background colour and a position (or `sticky`/`fixed`) here.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.scrollProgress` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inset-x-0 top-0 h-1 origin-left`
  ::
::

## Accessibility

The bar is deliberately non-semantic: it is a bare motion element with no role,
no ARIA and no `aria-valuenow`. It is a purely visual affordance and adds nothing
to the accessibility tree, so screen-reader users are neither helped nor
hindered by it.

That also means it carries no information a screen reader can announce. If the
progress value matters to your content — a multi-step form, for instance — expose
it separately with a real progress element or live text rather than relying on
this bar.

The component does not read `prefers-reduced-motion`. The spring is what smooths
the bar; with reduced motion requested you may prefer to pass stiffer
`springOptions` (a large `stiffness`) so the bar tracks the scroll without a
noticeable lag.

## Performance

- One `useScroll` on the window (or your container) and one `useSpring` on the
  resulting value. Nothing else subscribes to scroll.
- The bar animates only `scaleX`, a compositor-friendly transform, so each frame
  repaints nothing and never triggers layout.
- Progress is written to a `scaleX` style, not to `width`, which is what keeps
  the animation off the layout path.
- The spring is the same smoothing Motion uses everywhere, so overscroll and
  rubber-banding settle rather than snapping.

## How it works

The theme supplies `origin-left` on the bar, so a `scaleX` of `0` collapses it to
the left edge and `1` stretches it across the element. Setting `scaleX` directly
on a composed layer means the browser can interpolate the transform without
re-laying out the bar's box, which is why a `h-1` bar can be driven every frame
for free.

If you omit `class` entirely the bar still works, but it renders transparent and
in normal flow — the theme intentionally leaves styling to you.
