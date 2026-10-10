---
title: Transition Panel
description: Swaps slotted content with enter, center and exit variants driven by a numeric index.
navigation:
  icon: i-lucide-panel-top
---

# Transition Panel

A single panel that swaps its content with a proper exit-then-enter sequence.
You give it an `activeIndex` and three variants ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â `enter`, `center` and `exit` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
and it renders the current index as a keyed child inside an `AnimatePresence`.

Because the child is keyed on `activeIndex`, any index change animates the old
content out before the new content arrives. That makes it a better fit than a
plain CSS crossfade when the outgoing content needs to leave the way it came ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
sliding out of frame rather than dissolving in place.

::note
`AnimatePresence` is mounted with `initial="false"`, so the *first* render after
mount skips the enter animation. Only subsequent index changes animate. This is
usually what you want on a page load, but if a panel is mounted later and you
expect an entry animation, it will not play.
::

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="transition-panel-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MTransitionPanel
      :active-index="active"
      :variants="variants"
      :transition="{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }"
      class="overflow-hidden rounded-2xl"
    >
      <div
        :key="active"
        class="flex h-40 flex-col items-center justify-center gap-1 p-6 text-center"
        :class="panels[active].tone"
      >
        <span class="text-xs font-medium uppercase tracking-widest opacity-70">
          {{ panels[active].eyebrow }}
        </span>
        <span class="text-lg font-semibold text-white">
          {{ panels[active].title }}
        </span>
      </div>
    </MTransitionPanel>

    <div class="grid grid-cols-3 gap-2">
      <UButton
        v-for="(panel, index) in panels"
        :key="panel.title"
        :label="String(index + 1)"
        :variant="index === active ? 'solid' : 'outline'"
        class="justify-center"
        @click="active = index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const active = ref(1)

const panels = [
  { eyebrow: 'Queued', title: 'Waiting on CI', tone: 'bg-sky-600' },
  { eyebrow: 'Running', title: 'Building bundle', tone: 'bg-amber-600' },
  { eyebrow: 'Done', title: 'Deployed to prod', tone: 'bg-emerald-600' },
]

// The panel is keyed on `activeIndex` internally, so the slot only has to supply
// the content for the index currently on screen.
const variants = {
  enter: { opacity: 0, y: 24, rotateX: -12 },
  center: { opacity: 1, y: 0, rotateX: 0 },
  exit: { opacity: 0, y: -24, rotateX: 12 },
}
</script>
```
::

The default slot holds the panel content. Only the currently active index is in
the tree, so keep the slot cheap ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a single element rather than a `v-for` over
every step.

## Props

::field-group
  ::field{name="activeIndex" type="number" required}
  Which index to show. Every change runs the exit/enter sequence.
  ::
  ::field{name="variants" type="{ enter?: Record<string, any>, center?: Record<string, any>, exit?: Record<string, any> }" default="{}"}
  Motion variants for the three states. The source falls back to a keyframe
  sequence built from `enter`/`exit` when either is missing, so a partial object
  still animates ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â but you lose the `center` target.
  ::
  ::field{name="transition" type="Record<string, any>" default="{}"}
  Transition used for all three phases. Passed straight to the child `Motion`, so
  any Motion transition option works. It is *not* merged with a default spring.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the root element alongside its own `relative`. The root has no
  `overflow: hidden` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â clip with your own class if exit content travels
  outside.
  ::
  ::field{name="custom" type="any" default="undefined"}
  Passed to `AnimatePresence` as `custom`, which is how *exit* variants read
  their own data as `custom`. Note that the source does not forward it to the
  child `Motion`, so an enter or center variant that reads `custom` receives
  `undefined`.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The panel content for the active index. The slot is scoped to nothing ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â you
  close over the same state that feeds `activeIndex` yourself, as in the example
  where the slot content is itself keyed on `active`.
  ::
::

## Accessibility

The panel has no semantics of its own ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the root is a plain `div`, so it is
invisible to assistive technology beyond its content. For a step indicator or
carousel, put the role and state on your own trigger buttons and give the panel
an `aria-live` region if the change is meaningful to read out:

```vue
<MTransitionPanel
  :active-index="active"
  class="rounded-2xl aria-live=polite"
/>
```

Only one index exists in the DOM at a time, which means focus is lost if the
exiting element contained the focused control. Keep focus on the trigger that
owns the panel rather than inside it.

There is no reduced-motion handling in the source. If the enter and exit
transforms are decorative, disable the transitions yourself.

## Performance

- The panel animates one child, so cost scales with the complexity of the slotted
  content, not with the number of indices.
- The source defaults to `mode="popLayout"` on `AnimatePresence`, which pops the
  exiting element out of flow so the entering one does not wait for a layout
  pass ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â useful when the outgoing content is tall.
- A transition built on `x`, `y`, `scale` or `opacity` stays on the compositor.
  Animating layout properties such as `height` or `top` will thrash.

::tip
When you swap content in the slot, key the slotted element on `activeIndex` too.
The inner `Motion` is keyed on the index, so its subtree remounts on change ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
but only the subtree you give it. Unkeyed slot content that happens to look the
same across indices will visually cross-fade instead of exiting cleanly.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.transitionPanel` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.transitionPanel` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.transitionPanel` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.transitionPanel` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative` |
