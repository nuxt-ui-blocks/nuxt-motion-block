---
title: AI Suggestions
description: Prompt chips that radiate in from the middle of the row, so no chip reads as the important one.
---

Chips are two moments in one component: the empty state of a chat, and the
follow-up row under an answer. Both are invitations, not notifications, which is
why the entrance is a short spring and not a pop.

They radiate out from the middle of the row. A left-to-right stagger would imply
reading order and priority - that the first chip matters most - and these are
alternatives of equal weight. The delay is the distance from the centre in chips,
so the row opens outward rather than sweeping across.

When a chip is removed, the row re-flows with a layout animation instead of
leaving a hole. That is the whole trick: the list is `v-for` over your array, and
the component handles the presence and the reflow, so "click a suggestion and it
disappears" needs no transition code at the call site.

## Usage

Pass an array of `{ id, label }` and listen for `select`. Removing the chip is
your decision - mutate the array and the exit runs.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-suggestions-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-lg space-y-3">
    <MAiSuggestions
      :suggestions="suggestions"
      label="Follow-ups"
      @select="pick"
    />
    <p class="text-xs text-muted">
      {{ picked ? `Selected: ${picked}` : 'Pick a chip - it collapses, and the row makes room.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const all = [
  { id: 's-1', label: 'Tighten the intro' },
  { id: 's-2', label: 'Add a benchmark' },
  { id: 's-3', label: 'Compare with the old API' },
  { id: 's-4', label: 'Find the breaking change' },
]

const suggestions = ref([...all])
const picked = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

/**
 * Removing a chip is what shows the exit and the row re-flowing. Putting it
 * back a beat later keeps the example from running out of chips.
 */
const pick = (suggestion: { id: string, label: string }) => {
  picked.value = suggestion.label
  suggestions.value = suggestions.value.filter(item => item.id !== suggestion.id)
  clearTimeout(timer)
  timer = setTimeout(() => {
    suggestions.value = [...all]
  }, 1400)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="ai-suggestions-custom" />
  :::
#code
  <PlaygroundCode name="AiSuggestions" />
::

## Props

::component-props
  ::component-prop{name="suggestions" type="AiSuggestion[]"}
  Required. `{ id, label }` rows. The `id` is the presence key, so it has to
  survive the chip being reordered - an index would animate the wrong chip out.
  ::
  ::component-prop{name="label" type="string"}
  An optional heading, `text-[10px]` and uppercase. It also labels the list for
  screen readers, so a visible heading is never just decoration.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the outer wrapper.
  ::
::

## Events

::component-events
  ::component-event{name="select" payload="[suggestion: AiSuggestion]"}
  A chip was pressed. The component does not remove it for you - the list you
  passed is still the source of truth.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiSuggestions` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `flex w-full flex-col gap-2`
  ::
  ::component-slot-row{name="label"}
  The optional heading.
  ::
  ::component-slot-row{name="list"}
  The wrapping row. `list-none` and `p-0` strip the browser's list box.
  ::
  ::component-slot-row{name="item"}
  One `motion.li` per chip - the element that carries presence and layout.
  ::
  ::component-slot-row{name="chip"}
  The `UButton` inside the item. `h-auto` and `font-normal` keep it reading as a
  suggestion rather than a primary action.
  ::
::

## Accessibility

- The chips are a real `ul` / `li` list, not a flex row of buttons, so a screen
  reader announces "list, four items" before reading the first label.
- When `label` is present it is wired to the list with `aria-labelledby`, so the
  heading is not repeated as a loose paragraph before the list.
- `select` carries the whole suggestion object rather than its index, so a
  handler never has to guess which chip was pressed after a reorder.
- Under `prefers-reduced-motion: reduce` the chips appear at once with no
  stagger, no scale and no layout animation; the row still re-flows, it just does
  not slide there.
- Focus rings come from `UButton`, so they are visible on both themes and are
  never replaced by the pill shape.

## Performance

- The transition array is a computed over the list, so a parent re-render that
  does not change `suggestions` reuses the same transition objects instead of
  restarting every chip's spring.
- `layout` is switched off entirely under reduced motion. A layout animation per
  chip is the most expensive part of the entrance, and there is nothing to see
  when it is disabled.
- Only the delays are per-chip; the spring itself is the frozen shared token, so
  four chips and forty chips cost the same setup.
- `AnimatePresence` unmounts a removed chip after its exit, so a long session of
  clicking does not leave a graveyard of invisible list items in the DOM.
