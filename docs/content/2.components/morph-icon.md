---
title: Morph Icon
description: A 24x24 icon swap that rotates and scales one glyph into another, driven entirely by a boolean.
navigation:
  icon: i-lucide-repeat
---

# Morph Icon

Two icons in a 24×24 box, and a transition between them: the outgoing glyph shrinks to
80% while rotating a quarter turn in one direction, the incoming one arrives rotated the
other way and settles slightly oversized at 120%.

It is the smallest component in the set — three props, no slots, no events, no state. The
important consequence is that **it does not toggle itself**. `toggled` is fully
controlled and there is no click handler anywhere in the component, so you own both the
boolean and the interaction. Its root is a `<span>`, not a button, so it is decorative
until you put it inside something focusable.

Icons are names in the [Nuxt Icon](https://icones.js.org) format, so `i-lucide-menu` and
`i-lucide-x` work out of the box and so does any other collection you have installed.

## Usage

Put it inside a button and bind `toggled` to the same state that button drives — that is
the intended usage, and the example shows three variants of it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morph-icon-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6 py-6">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <UButton
        variant="soft"
        class="gap-2"
        @click="menuOpen = !menuOpen"
      >
        <MMorphIcon :toggled="menuOpen" />
        {{ menuOpen ? 'Close' : 'Menu' }}
      </UButton>

      <UButton
        variant="outline"
        class="gap-2"
        @click="liked = !liked"
      >
        <MMorphIcon
          :toggled="liked"
          icon1="i-lucide-heart"
          icon2="i-lucide-heart-crack"
        />
        {{ liked ? 'Unlike' : 'Like' }}
      </UButton>

      <UButton
        variant="ghost"
        class="gap-2"
        @click="playing = !playing"
      >
        <MMorphIcon
          :toggled="playing"
          icon1="i-lucide-play"
          icon2="i-lucide-pause"
        />
        {{ playing ? 'Pause' : 'Play' }}
      </UButton>
    </div>

    <p class="max-w-xs text-center text-xs text-muted">
      <code>toggled</code> is the only input: the component holds no state of its own, so whatever
      flips it — a click, a route change, a keyboard shortcut — gets the same rotation and scale
      swap between the two icons.
    </p>
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
const liked = ref(false)
const playing = ref(false)
</script>

```
::

## Controlled state

Because there is no emit and no internal state, the smallest useful setup is a parent
that owns the boolean and the handler:

```vue
<template>
  <UButton
    :aria-pressed="open"
    aria-label="Toggle navigation"
    @click="open = !open"
  >
    <MMorphIcon :toggled="open" />
  </UButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>
```

## Props

::field-group
  ::field{name="icon1" type="string" default="'i-lucide-menu'"}
  Icon name shown when `toggled` is false. A Nuxt Icon collection prefix plus an icon
  name.
  ::
  ::field{name="icon2" type="string" default="'i-lucide-x'"}
  Icon name shown when `toggled` is true.
  ::
  ::field{name="toggled" type="boolean" default="false"}
  Controlled state. Nothing happens until you change it — no internal copy, no emit.
  ::
::

The component declares no slots and emits no events. Attributes fall through to the root
`<span>`, so `class`, `style` and DOM listeners such as `@click` land on it — which
works for a mouse user and nothing else.

## Accessibility

This is the one component in the set that ships no semantics at all. The root is a
`<span>` with no role, no `tabindex` and no accessible name; the `UIcon` inside it is not
`aria-hidden`, but with no name it contributes nothing useful either.

So the component is invisible to assistive technology as a control. Everything about it
is your job:

- Put it inside a real `<button>` — the component renders no `type` and no keyboard
  handling of its own.
- Describe the control on the button, not the icon. A two-glyph icon button with no label
  is announced as "button" and nothing more.
- Add `aria-pressed` on the wrapping button if the pair represents an on/off state.
  Because `toggled` is controlled, that binding costs nothing and it is the only thing
  that will convey the state non-visually.
- Because the root is a `span`, an `@click` passed to the component fires for pointer
  input only. Without a wrapper button there is no Enter or Space path at all.

Reduced motion is not consulted. The swap uses a fixed `0.25s` ease-in-out on both the
enter and the exit half, so every visitor gets the full rotation and scale.

## Performance

- One `motion.span` keyed on `String(toggled)`, so a change unmounts one element and
  mounts another. Both are `absolute inset-0` inside a 24×24 box, so the component's
  footprint never changes and mounting costs nothing measurable.
- Everything animated is `opacity`, `scale` and `rotate` — transform-only, no layout, no
  reflow.
- The transition is an inline literal in the template, rebuilt on each render. For a
  single element that is cheaper than memoising it.
- `toggled` is the only reactive input. Because the element is keyed, the `UIcon` inside
  it is remounted on every toggle rather than patched, so the icon's own resolution runs
  again — trivial for a single glyph, worth remembering if you ever swap in a heavy
  icon.

::tip
The resting scale is `1.2`, not `1`. The glyph deliberately sits at 120% of the 24×24
box and overflows its own container slightly, which is what gives the swap its snap. If
your icons look clipped inside a tight button, that is usually the surrounding button's
padding rather than a mistake in the component — give the button room, or scale the box
from the parent.
::
