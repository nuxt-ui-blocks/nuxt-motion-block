---
title: Time Machine Stack
description: A 3D stack of panels you page through with the wheel, a drag or the arrow keys.
---

A vertical stack of cards receding into the distance. The front panel is flat
and full size, and each panel behind it steps up, back and down in scale, so the
group reads as a physical pile rather than a list. Moving forward sends the
stack one layer deeper; moving back brings the previous panel to the front.

The stack is a single focusable listbox. The wheel, a vertical drag and the
arrow keys all drive the same index, and a polite live region announces
"Item 2 of 4" as the front changes. At either end the wheel is handed back to
the page, so the demo never traps document scroll.

## Usage

Pass `items` with stable `id`s and render each panel through the item slot. The
front panel is the only one marked `aria-selected`, and the stack keeps at most
`visibleCount` panels mounted.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="time-machine-stack-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 p-6">
    <MTimeMachineStack
      :items="items"
      class="h-[20rem] w-full max-w-sm"
    >
      <template #item="{ item, active }">
        <div class="flex h-full flex-col justify-between gap-3 p-4">
          <div class="flex items-center justify-between text-xs text-muted">
            <span>{{ item.year }}</span>
            <span v-if="active">Now showing</span>
          </div>

          <div>
            <p class="text-lg font-semibold text-highlighted">
              {{ item.title }}
            </p>
            <p class="text-sm text-muted">
              {{ item.description }}
            </p>
          </div>
        </div>
      </template>
    </MTimeMachineStack>

    <p class="text-xs text-muted">
      Scroll, drag or use the arrow keys.
    </p>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    id: 'studio',
    year: 2026,
    title: 'The studio',
    description: 'A small team, a short list of clients, one shared room.',
  },
  {
    id: 'archive',
    year: 2024,
    title: 'The archive',
    description: 'Every project we shipped, filed by year and season.',
  },
  {
    id: 'workshop',
    year: 2022,
    title: 'The workshop',
    description: 'Prototypes that never left the building, kept anyway.',
  },
  {
    id: 'origin',
    year: 2019,
    title: 'The origin',
    description: 'Two desks, a borrowed projector and a first invoice.',
  },
]
</script>
```

::

`index` is optional. Leave it out and the stack keeps its own position while
still emitting every move.

## Customize

Bind `v-model:index` to drive the stack from your own controls, and change the
depth, offset or visible panel count for a taller or tighter pile. Three panels
with a larger depth gives the stack more obvious air; four is the default.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="time-machine-stack-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 p-6">
    <MTimeMachineStack
      v-model:index="index"
      :items="items"
      :depth="70"
      :offset-y="28"
      :visible-count="3"
      class="h-[18rem] w-full max-w-sm"
    >
      <template #item="{ item, active }">
        <div
          :class="[
            'flex h-full flex-col justify-end gap-1 p-5 text-inverted',
            item.tone,
          ]"
        >
          <p class="text-xs uppercase tracking-wide opacity-80">
            {{ item.step }}
          </p>
          <p class="text-xl font-semibold">
            {{ item.title }}
          </p>
          <p
            v-if="active"
            class="text-xs opacity-90"
          >
            Front of the stack
          </p>
        </div>
      </template>
    </MTimeMachineStack>

    <div class="flex items-center gap-3 text-sm text-muted">
      <UButton
        :disabled="index === 0"
        size="sm"
        variant="outline"
        @click="index -= 1"
      >
        Previous
      </UButton>
      <span class="tabular-nums">{{ index + 1 }} / {{ items.length }}</span>
      <UButton
        :disabled="index === items.length - 1"
        size="sm"
        variant="outline"
        @click="index += 1"
      >
        Next
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const index = ref(0)

const items = [
  {
    id: 'one',
    step: 'Step one',
    title: 'Collect the pieces',
    tone: 'bg-primary',
  },
  {
    id: 'two',
    step: 'Step two',
    title: 'Order the stack',
    tone: 'bg-inverted',
  },
  {
    id: 'three',
    step: 'Step three',
    title: 'Ship the front',
    tone: 'bg-gradient-to-br from-primary to-error',
  },
  {
    id: 'four',
    step: 'Step four',
    title: 'Keep the history',
    tone: 'bg-gradient-to-br from-warning to-primary',
  },
]
</script>
```
::

Panels are anchored to the bottom of the box and reserve room above for the
receding layers, so give the component a height through `class`
(`h-[18rem]` here). The receding panels keep their content mounted, so a panel
does not refetch or remount as it travels from the back to the front.

## Props

::component-props
  ::component-prop{name="items" type="TimeMachineStackItem[]"}
  Panels from front to back. Each entry needs a stable `id`; anything else is
  passed to the item slot.
  ::
  ::component-prop{name="index" type="number"}
  Controlled index of the front panel. Without it the component tracks its own.
  ::
  ::component-prop{name="depth" type="number" default="50"}
  Distance in pixels each receding panel is pushed back on the z-axis.
  ::
  ::component-prop{name="offsetY" type="number" default="36"}
  Vertical offset in pixels applied per receding panel.
  ::
  ::component-prop{name="scaleStep" type="number" default="0.05"}
  Scale reduction applied per receding panel.
  ::
  ::component-prop{name="visibleCount" type="number" default="4"}
  Panels rendered at once. The rest stay unmounted until they reach the window.
  ::
  ::component-prop{name="perspective" type="number" default="1400"}
  CSS perspective in pixels for the 3D context.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root.
  ::
::

## Events

::component-props
  ::component-prop{name="update:index" type="(index: number) => void"}
  Fired with the new front index whenever the wheel, a drag, a key or the
  controls change it.
  ::
  ::component-prop{name="change" type="(index: number) => void"}
  The same index, for listeners that pair with other `change` events.
  ::
::

## Accessibility

- The stack is a `role="listbox"` with `aria-activedescendant` pointing at the
  front panel, and each panel is a `role="option"` with `aria-selected`. A
  screen reader hears the front item as the current option rather than an
  unlabelled pile of cards.
- `ArrowUp` and `ArrowDown` step one panel and `Home` and `End` jump to the
  edges, so the wheel and drag gestures are never the only way through.
- A polite live region announces "Item 2 of 4" after each move. It is hidden
  visually but not from assistive technology.
- The listbox takes focus with a visible ring, and the wheel only calls
  `preventDefault` while a step is possible. At the first and last panel the
  page scrolls normally.
- Dragging needs 48px of vertical travel before the index changes, so a click
  or a small wobble does not skip a panel.
- Under `prefers-reduced-motion` the perspective and all transforms are removed
  at the stylesheet level, only the front panel stays visible, and every
  transition is disabled. The same index changes still happen.

## Performance

- At most `visibleCount` panels are mounted; the rest of the list never enters
  the DOM, so a long history costs nothing until it is near the front.
- Each panel is positioned with one compositor-friendly `transform` string
  (`translateY`, `translateZ`, `scale`) and transitions in CSS. There is no
  per-frame JavaScript while the stack animates.
- Wheel handling is a single non-passive listener with a 220ms cooldown, added
  on mount and removed on unmount; the cooldown timer is cleared as well.
- Pointer handlers only remember the starting `clientY` and compare it on
  release, so a drag does not read layout or run work per move.
- Changing the index updates five computed values and re-renders keyed panels;
  panel content is reused rather than recreated as it moves.
