---
title: AI Orb Face
description: A character that wears an orb: expression, gaze, breathing, and a fault wobble.
navigation:
  icon: i-lucide-smile
---

# AI Orb Face

A character ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â an orb with a face, and a face that is almost entirely eyes.

State lives here and the material lives in [AI Orb](/docs/components/ai-orb).
That split is the whole reason for the extra component. A state is a
*behaviour*, and a behaviour wants the whole silhouette, not one material of it.
Driving an orb straight from `state` would couple six lighting and flow constants
to a prop that also moves the eyes, and the two would have to be retuned
together forever.

Three things carry the read, and all three are here:

- **Expression.** Nine named faces built from four numbers per eye, so a squint,
  a tilt, a lift and a width change are the entire vocabulary. There is no mouth
  on purpose ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a drawn mouth ends up carrying most of the expression, at which
  point the eyes stop mattering.
- **Gaze.** The eyes follow the pointer on a spring, which is the one bit of
  apparent attention a shape can fake convincingly. While `thinking` they break
  away instead, which is what makes that state legible without adding a single
  graphic to it.
- **Three state moves.** A wobble on fault, a hop on success, breathing while
  listening. The fault wobble plays once, but the spiral eyes stay for as long as
  the state lasts ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â recovering to a neutral face would leave a broken assistant
  looking fine.

## Usage

Set `state` and leave the rest alone: expression, gaze and the state move are all
derived from it. Override the face only when you want to author one yourself
rather than pick from the nine.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-orb-face-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <div class="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-default p-8">
      <MAiOrbFace
        :state="state"
        aria-label="Assistant"
      />
      <MAiOrbFace
        :state="'streaming'"
        :colors="{ body: 'oklch(72% 0.16 220)', bodyEdge: 'oklch(97% 0.02 220)' }"
        size="96"
      />
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="value in states"
        :key="value"
        :color="state === value ? 'primary' : 'neutral'"
        :label="value"
        size="sm"
        :variant="state === value ? 'solid' : 'outline'"
        @click="state = value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type DemoState = 'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'

const states: DemoState[] = ['idle', 'listening', 'thinking', 'streaming', 'done', 'error']
const state = ref<DemoState>('idle')
</script>
```
::

## Props

::field-group
  ::field{name="state" type="'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'" default="'idle'"}
  The character's state. It selects an expression, a motion profile, a
  saturation, and ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â where it applies ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a one-shot move. Defaults per state:
  `idle` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ `neutral`, `listening` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ `alert`, `thinking` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ `doubtful`,
  `streaming` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ `focused`, `done` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ `content`, `error` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ `cross`.
  ::
  ::field{name="size" type="number | string" default="128"}
  Pixels when a number, any CSS length when a string.
  ::
  ::field{name="ariaLabel" type="string"}
  Names the character for assistive technology. Without it the SVG stays
  decorative (`aria-hidden`, no `role`); with it the SVG becomes
  `role="img"` with an `<title>`. This is the prop that turns decoration into a
  labelled image ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and it is not optional when the character's state is the point.
  ::
  ::field{name="gaze" type="boolean" default="true"}
  Follow the pointer. Turn it off where the face is decorative and the pointer is
  busy ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a page of six faces all tracking one cursor is noise, not life.
  ::
  ::field{name="expression" type="AiOrbFaceExpressionName | AiOrbFaceExpression"}
  Set the face directly and ignore `state`. A name is one of `alert`, `content`,
  `cross`, `deadpan`, `doubtful`, `focused`, `neutral`, `surprised`, `wink`. An
  object is `{ left, right }`, each an eye described by `h` (height multiplier,
  `0` is shut), `w` (width multiplier), `rotate` (degrees, positive tilts the
  inner corner down and reads as a scowl) and `dy` (nudge up or down). Describing
  the two eyes independently is what buys a wink.
  ::
  ::field{name="colors" type="Partial<{ body, bodyEdge, feature }>"}
  Overrides any of the three colours. Defaults are `oklch(72% 0.21 322)` for the
  body, `oklch(97% 0.02 322)` for the edge and `oklch(24% 0.03 280)` for the
  features ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â deliberately saturated against near-white rather than a second
  lilac, so the marbled interior reads as a sphere and the flow work is visible.
  ::
  ::field{name="amplitude" type="number | MotionValue<number>"}
  A 0ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ1 speech level. Widens the eyes and stirs the interior while talking. A
  `MotionValue` is preferred: it updates outside the render cycle, so a 60fps
  audio signal never triggers a re-render. For a microphone signal see
  `useAudioAmplitude`; for a demo, `useSimulatedAmplitude`.
  ::
  ::field{name="class" type="string"}
  Merged onto the outer element, which also carries `relative block`.
  ::
::

## Accessibility

- Pass `ariaLabel` when the character carries meaning. The SVG then renders as
  `role="img"` with an `<title>`, and the wrapper SVG stops being `aria-hidden`.
  Omit it and the whole component is decorative, which is the right default for a
  purely ornamental orb.
- The accessible name describes *what* the character is, not what state it is in.
  State is visual and fast-changing; announcing it on every transition would be
  noise. If a state change matters to a reader, surface it as text nearby.
- The SVG uses `viewBox="0 0 100 100"` and `overflow-visible`, so the sprite
  scales with the box and the spiral eyes are not clipped. The gaze travel is
  expressed in viewBox units, which means it stays proportional at any size.
- Blinks are random per instance and never announced; they are read as life, not
  as an event.
- Under `prefers-reduced-motion: reduce` the springs, blinks, saccades, breathing,
  wobble, hop and spirals all resolve to their resting state. The face still shows
  the correct expression, and it is never blank ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a static character is a
  character.
- A blinking spiral does not exceed any contrast ratio between `feature` and
  `body`, so it is not purely a colour cue; the spiral geometry itself is the
  signal.
- No pointer or keyboard interaction is available on this component. Gaze
  tracking is one-directional and needs nothing.

## Performance

- The eyes are painted imperatively rather than animated as motion values. On an
  SVG node, motion-v promotes style keys to attributes, and the gaze rides in as
  `x` and `y` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the same keys the eye uses for its own geometry, so a spring on
  the gaze would overwrite the shape it is meant to move. Composing the transform
  by hand keeps both, and the springs still drive every frame because they notify
  on change.
- Breathing rides the same painter as the one-shot moves rather than an animation
  control, because exactly one thing may own `transform` on the body element: a
  bound `:animate` would rewrite `style.transform` every tick and silently discard
  every hand-written frame.
- `amplitude` is normalised once through `useAmplitudeValue`, which reads a getter
  rather than a plain value ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a prop read at setup would freeze at mount and a
  later change would be silently ignored. A plain number is mirrored on every
  change; a `MotionValue` is passed straight through and never lands in a watcher.
- Orb energy is quantised to four steps before it crosses into a render. The orb
  takes plain props, so without quantising a 60fps signal would trigger 60 renders
  a second instead of a few.
- The `state` watch uses `flush: 'post'` and is guarded on `mounted`, so a state
  set during setup does not fire the wobble or the hop before there is anything to
  animate.
- A radial-gradient circle sits directly under the shader as a painted
  understudy. On pages running many WebGL surfaces the browser reclaims the oldest
  contexts, and a reclaimed orb would leave a bare canvas ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â which turns the
  character into a pair of floating eyes.
- The states carry their own saturation, applied as a `saturate()` filter on the
  root. A faulted assistant visibly cools down next to the rest of the interface
  instead of staying cheerful.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiOrbFace` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative block'` |
| `body` | `'absolute'` |
| `understudy` | `'absolute rounded-full'` |
| `orb` | `'size-full'` |
| `face` | `'absolute inset-0 block size-full overflow-visible'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.aiOrbFace` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative block` |
| `body` | `absolute` |
| `understudy` | `absolute rounded-full` |
| `orb` | `size-full` |
| `face` | `absolute inset-0 block size-full overflow-visible` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.aiOrbFace` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative block` |
| `body` | `absolute` |
| `understudy` | `absolute rounded-full` |
| `orb` | `size-full` |
| `face` | `absolute inset-0 block size-full overflow-visible` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiOrbFace` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative block` |
| `body` | `absolute` |
| `understudy` | `absolute rounded-full` |
| `orb` | `size-full` |
| `face` | `absolute inset-0 block size-full overflow-visible` |
