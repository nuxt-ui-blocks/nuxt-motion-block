---
title: Ransom Note
description: A string cut into letter scraps on mismatched paper, cut from mismatched typefaces.
---

Every character becomes a scrap of paper: its own background colour from an aged
palette, its own typeface from a deliberately mismatched stack, its own resting
rotation and skew, and its own scale. The letters disagree with each other, which
is the entire reason a ransom note is legible as one — a single font family would
look like a font bug.

Whitespace characters get **no** paper. Otherwise every space becomes a visible
scrap and the words stop being words.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ransom-note-basic" />
  :::
#code
```vue
<template>
  <MRansomNote text="RANSOM" />
</template>
```
::

## Examples

### Same word, two seeds

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ransom-note-seed" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-6">
    <MRansomNote
      :seed="1"
      text="SEED ONE"
    />
    <MRansomNote
      :seed="7"
      text="SEED SEVEN"
    />
    <p class="max-w-sm text-center text-sm text-muted">
      Same word, two seeds. Every scrap's rotation, skew, font and paper colour is
      drawn from one seeded generator in a fixed order, so a given seed always
      produces the same collage — on the server and on the client.
    </p>
  </div>
</template>
```
::

### Torn from a magazine

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ransom-note-magazine" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-6">
    <MRansomNote
      text="MEET ME AT NOON"
      animate="jitter"
      :intensity="0.9"
      :palette="palette"
      :fonts="fonts"
    />
    <p class="max-w-sm text-center text-sm text-muted">
      A custom paper stack and typeface pile, held in jitter mode. The scraps
      never settle — each one trembles on its own cycle, which is why the
      collage reads as paper that was never glued down.
    </p>
  </div>
</template>

<script setup>
const palette = ['#fffdf7', '#fdf1d0', '#f6e7c1', '#efe0be', '#e8d5ae']
const fonts = [
  'Georgia, serif',
  'Impact, sans-serif',
  '"Courier New", monospace',
  '"Comic Sans MS", cursive',
]
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="ransom-note-custom" />
  :::
#code
  <PlaygroundCode name="RansomNote" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  The copy to cut up. Split per character; whitespace is preserved but gets no
  paper.
  ::

  ::component-prop{name="animate" type="'assemble' | 'jitter' | 'none'" default="'assemble'"}
  How the scraps behave. See [Animate modes](#animate-modes).
  ::

  ::component-prop{name="intensity" type="number" default="0.6"}
  How messy the collage is, `0` to `1`. Clamped. Scales variance across rotation,
  skew, entrance scatter and tremble.
  ::

  ::component-prop{name="rotation" type="number" default="8"}
  Resting rotation range of each scrap in degrees, scaled by `intensity`.
  `0` gives an upright collage.
  ::

  ::component-prop{name="stagger" type="number" default="0.03"}
  Delay between scraps **in seconds**. See
  [`stagger` is in seconds here](#stagger-is-in-seconds-here).
  ::

  ::component-prop{name="seed" type="number" default="1"}
  PRNG seed. Change it for a different collage; keep it fixed for stable SSR.
  ::

  ::component-prop{name="palette" type="string[]"}
  Paper colours to cut scraps from. Falls back to the built-in list when empty.
  ::

  ::component-prop{name="fonts" type="string[]"}
  Font stacks to cut scraps from. Falls back to the built-in list when empty.
  ::

  ::component-prop{name="class" type="string"}
  Classes for the wrapper.
  ::
::

## Accessibility

Every scrap is `aria-hidden="true"` and the readable copy lives in a single
`sr-only` span.

An `aria-label` on the wrapper would be the obvious alternative, but a plain `div`
with no role carries no accessible name, so it would be dropped in favour of its
contents — which are all hidden. The hidden copy is the only approach that works
on a role-less element.

Under `prefers-reduced-motion` the animation is **narrowed, never changed**. The
`initial` state is always the server-renderable one, exactly as the server would
paint it; reduced motion substitutes a `duration: 0` transition onto that same
state instead of returning different markup. This matters more here than in the
other components: returning a different `initial` would mean the server's markup
disagreed with the client's tree.

`jitter` is the mode to avoid under reduced motion for content reasons rather than
motion ones — it never stops, so it is permanent animation on the page. `assemble`
collapses to an instant appearance and `none` was static to begin with.

Transform channels are carried in the animated state rather than in `style`,
because motion-v owns the whole `transform` string — a transform channel left in
`style` would be dropped the first time the rotation animates.

## Performance

- The collage is one `computed` pass over `Array.from(props.text)`, drawing every
  scrap from a single seeded generator. It re-runs only when props change, and the
  same props always produce the same values, so an unrelated parent re-render never
  reshuffles the page.
- Node count equals character count: one `Motion` span per character plus one
  `sr-only` copy of the string. Keep the copy to a word or short phrase.
- Every animated channel is `opacity`, `x`, `y`, `rotate` or `skewX` — compositor
  properties, none of them touching layout. The paper styling (background, radius,
  shadow, ring) sits in `style` and is painted once.
- `assemble` springs once and goes idle; `none` animates nothing. `jitter` is the
  expensive mode: each scrap runs its own mirrored `repeat: Infinity` on a
  `0.6`–`1.2s` cycle, so every letter on the page is permanently animating.
- There are no observers, listeners or timers — `useReducedMotion` is the only
  external subscription.

## `stagger` is in seconds here

**This is the one component in the library where `stagger` is in seconds, not
milliseconds.** The default is `0.03`, which is `30ms`.

The prop is kept in seconds so it matches the upstream catalogue exactly, which
means `:stagger="30"` here means *thirty seconds* and not thirty milliseconds. It
is also applied as a `delay` on each scrap, so it is absolute rather than
cumulative — scrap *i* waits `i × stagger`, not a running total.

Every other component in this library takes milliseconds:
[Soft Blur In](/components/text/soft-blur-in), [Blur Out Up](/components/text/blur-out-up),
[Spring Scale In](/components/text/spring-scale-in) and
[Mask Reveal Up](/components/text/mask-reveal-up) all default to values in the tens.

## Animate modes

### `assemble`

The default. Every scrap flies in from a random offset — up to
`24 + 60 × intensity` pixels on each axis — at a random extra rotation of up to
`30 × intensity` degrees, and springs to rest. It reads as a ransom note landing
rather than as an already-settled collage.

The spring is `{ type: 'spring', duration: 0.25, bounce: 0.1 }`, the same one
[Perspective Text 3D](/components/text/perspective-text-3d) uses for its drivers.

### `jitter`

No entrance. The collage is already there and will not hold still: each scrap
trembles between `rotation - jitterRotation` and `rotation + jitterRotation`,
mirrored, forever. The tremble is `1.5°` at `intensity: 0` rising to `4°` at
`intensity: 1`, on its own cycle of `0.6` to `1.2s`.

Different cycles per scrap is what stops the effect reading as a wobble. If every
letter shook in sync, the whole word would appear to vibrate as one rigid object
rather than as separate pieces of paper.

This is a permanent animation, so it is the mode most worth thinking about twice —
see [Accessibility](#accessibility).

### `none`

No movement at all, just the collage. The transition is `duration: 0` rather than
absent, because motion-v treats "nothing to animate" as "write nothing" and the
starting state would be stranded.

## Intensity

`intensity` is a single `0`–`1` dial — it is clamped, and out-of-range values are
pulled back rather than throwing. At `0` you get a tidy, upright collage that
still has mismatched paper and type but no rotation, no skew and no entrance
scatter. At `1` the scraps are thrown across the block.

Because it scales *variance* rather than replacing defaults, raising it widens
every random range rather than shifting a baseline:

| quantity | at `intensity: 0` | at `intensity: 1` |
| --- | --- | --- |
| entrance offset | `0px` | up to `±84px` |
| entrance rotation | `0°` | up to `±30°` |
| resting rotation | `0°` | up to `±8°` |
| skew | `0°` | up to `±6°` |
| jitter tremble | `±1.5°` | `±4°` |

`rotation` is a separate prop and is *also* scaled by intensity, so `rotation: 0`
is the more direct way to flatten the resting collage.

## The seed is load-bearing

Every scrap's colour, font, rotation, skew, scale, entrance offset and tremble
cycle is drawn from **one** [mulberry32](https://en.wikipedia.org/wiki/Xorshift)
generator, consumed in a fixed order. The component is therefore a pure function
of its props, which is the only reason it can hydrate at all: `Math.random()` would
hand the server one collage and the client another.

The default seed is `1`. Change it to get a different arrangement:

```vue
<MRansomNote :seed="7" text="SEED SEVEN" />
```

`seed` is a prop rather than an internal counter, so the same seed always produces
the same collage — on the server, on the client, and across reloads.

## Custom paper and type

`palette` and `fonts` both fall back to the built-in lists when passed an empty
array.

```ts
const palette = ['#fffdf7', '#fdf1d0', '#f6e7c1', '#efe0be']
const fonts = ['Georgia, serif', 'Impact, sans-serif', '"Courier New", monospace']
```

Six stock paper tones are warm and low-saturation and never white, because pure
white reads as a background rather than as paper. Six stock typefaces span serif,
monospace, condensed sans, script, humanist sans and old-style serif.

Passing an empty array is how you ask for the default. There is no way to say "one
paper colour for every scrap" through `palette`, because a single-element array
already does that — and it works, since the pick is `random() * 1`, always `0`.

## Notes

- Characters are iterated with `Array.from`, not by string index, so surrogate
  pairs are not torn apart.
- The scraps sit in a `flex flex-wrap` row with `items-baseline`, so a long string
  wraps across lines while each letter keeps its own baseline alignment.
- `select-none` on each scrap keeps a double-click from selecting a single letter
  instead of the word.
- Paper gets `rounded-sm`, a light `shadow-sm` and a `ring-black/10` — enough to
  separate overlapping scraps without turning each letter into a raised card.
- Ink is a fixed near-black with a brown cast (`#1f1b16`) for every scrap.
  Overriding it means overriding `style` on the scraps, which the component owns.
- Scrap scale is a baseline of `0.85em` plus up to `0.5 × intensity`, so the
  collage never grows wider than the copy it replaces.
- The component plays once. There is no `triggerOnView` prop — a ransom note
  assembling as it scrolls into view is a different effect, and one you can build
  by wrapping it in your own `useInView`.
