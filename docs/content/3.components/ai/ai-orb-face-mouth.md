---
title: AI Orb Face Mouth
description: "A character that wears an orb: mood-driven eyes and mouth, gaze, blinking, talking, and accents."
---

The orb, with a face that has a mouth.

[AI Orb Face](/components/ai/ai-orb-face) reads entirely through two eyes, which
is why it has no mouth: a drawn mouth carries so much of an expression that the
eyes stop mattering. This component is the opposite trade. A **mood** picks one
eye treatment and one mouth at the same time, and the two are tuned against each
other so neither can win.

Moods are the public unit because they are how a character is described in
conversation — happy, confused, asleep — while `state` is how a program is
described. `AI_ORB_FACE_MOUTH_STATE_MOOD` maps one onto the other, so an
assistant still gets a face for free.

Talking sits outside that grid: it replaces only the mouth, so any face can
speak. See [Talking](#talking).

## Usage

Set `mood` and leave the rest alone:

```vue
<template>
  <MAiOrbFaceMouth mood="happy" aria-label="Assistant" />
</template>
```

Or set `state` and let it pick the mood:

```vue
<template>
  <MAiOrbFaceMouth :state="state" :amplitude="amplitude" aria-label="Assistant" />
</template>

<script setup lang="ts">
const state = ref<'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'>('idle')
const amplitude = useSimulatedAmplitude(state)
</script>
```

### Moods

| Mood | Eyes | Mouth | Accent |
| --- | --- | --- | --- |
| `idle` | open ovals | gentle smile | — |
| `happy` | arches (`^ ^`) | open smile | — |
| `excited` | wide ovals | laugh | — |
| `thinking` | narrowed, tilted | flat line | trailing dots |
| `surprised` | wide ovals, raised brows | small `o` | — |
| `sleeping` | shut lids | small `o` | rising `z`s |
| `sad` | lowered, worried brows | frown | — |
| `confused` | one eye squinted | wavy line | `?` |
| `talking` | open ovals | moving mouth | — |

### Talking

`talking` is a modifier, not a face. It swaps only the mouth for a speaking one,
so the eyes keep whatever the mood says:

```vue
<template>
  <MAiOrbFaceMouth mood="thinking" talking />
  <MAiOrbFaceMouth mood="surprised" talking />
</template>
```

The mouth is one wide ellipse scaled up and down in place rather than a set of
open and shut paths, so a single shape covers every syllable and can layer over
any mood without a mouth variant per mood.

`mood="talking"` is the standalone version — idle eyes with the speaking mouth —
for when there is no mood to layer onto. `talking` also defaults to on while
`state` is `streaming`, because a streaming assistant is answering. It never
applies while the character is asleep: `sleeping` wins.

### State mapping

| State | Mood |
| --- | --- |
| `idle` | `idle` |
| `listening` | `excited` |
| `thinking` | `thinking` |
| `streaming` | `happy` |
| `done` | `happy` |
| `error` | `sad` |

`streaming` also turns `talking` on, so the mapped mood supplies the eyes and the
speaking mouth supplies the motion.

## Props

::component-props
  ::component-prop{name="mood" type="'idle' | 'happy' | 'excited' | 'thinking' | 'surprised' | 'sleeping' | 'sad' | 'confused' | 'talking'"}
  Sets the character directly and ignores `state`. Every mood is a complete
  read — eyes, mouth, optional brows and optional accent — so no combination can
  land as an accidental expression.
  ::
  ::component-prop{name="talking" type="boolean"}
  Swap the mouth for a speaking one without changing the rest of the face, so
  `happy`, `thinking` and `confused` can all talk. Defaults to on for the
  `streaming` state, and never applies while the character is asleep.
  ::
  ::component-prop{name="state" type="'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'" default="'idle'"}
  The assistant state. Used only when `mood` is absent, and mapped through
  `AI_ORB_FACE_MOUTH_STATE_MOOD`. It also selects a motion profile and a
  saturation.
  ::
  ::component-prop{name="expression" type="AiOrbFaceMouthMood"}
  Deprecated alias for `mood`.
  ::
  ::component-prop{name="painted" type="boolean" default="false"}
  Paint the sphere as a gradient instead of mounting the WebGL orb. A browser
  keeps only about sixteen live contexts per page, so a grid of faces — a
  gallery, an assistant list — starts losing them and those orbs freeze. The
  painted sphere looks the same at small sizes and costs no GPU.
  ::
  ::component-prop{name="size" type="number | string" default="128"}
  Pixels when a number, any CSS length when a string.
  ::
  ::component-prop{name="ariaLabel" type="string"}
  Names the character for assistive technology. Without it the SVG stays
  decorative (`aria-hidden`, no `role`); with it the SVG becomes `role="img"`
  with an `<title>`.
  ::
  ::component-prop{name="gaze" type="boolean" default="true"}
  Follow the pointer. Turn it off where the face is decorative and the pointer is
  busy — a page of six faces all tracking one cursor is noise, not life.
  ::
  ::component-prop{name="colors" type="Partial<{ body, bodyEdge, feature }>"}
  Overrides any of the three colours. Each value accepts a
  [Nuxt UI color token](/getting-started/theming) (e.g. `primary`) or any CSS
  color. Defaults follow the theme: the body is `var(--ui-primary)`, the edge is
  mixed toward white and the features toward black, so the marbled interior reads
  as a sphere and the face stays legible against it.
  ::
  ::component-prop{name="amplitude" type="number | MotionValue<number>"}
  A 0–1 speech level. Stirs the interior while talking. A `MotionValue` is
  preferred: it updates outside the render cycle, so a 60fps audio signal never
  triggers a re-render. For a microphone signal see `useAudioAmplitude`; for a
  demo, `useSimulatedAmplitude`.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the outer element, which also carries `relative block`.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance
with the [`ui` prop](/getting-started/theming), or app-wide under
`ui.aiOrbFaceMouth` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative block`
  ::
  ::component-slot-row{name="body"}
  `absolute`
  ::
  ::component-slot-row{name="understudy"}
  `absolute rounded-full`
  ::
  ::component-slot-row{name="orb"}
  `size-full`
  ::
  ::component-slot-row{name="face"}
  `absolute inset-0 block size-full overflow-visible`
  ::
  ::component-slot-row{name="mouth"}
  ``
  ::
::

## Accessibility

- Pass `ariaLabel` when the character carries meaning. The SVG then renders as
  `role="img"` with a `<title>`, and the wrapper SVG stops being `aria-hidden`.
  Omit it and the whole component is decorative, which is the right default for a
  purely ornamental orb.
- The accessible name describes *what* the character is, not what mood it is in.
  Mood is visual and fast-changing; announcing it on every transition would be
  noise. If a mood change matters to a reader, surface it as text nearby.
- The SVG uses `viewBox="0 0 100 100"` and `overflow-visible`, so the sprite
  scales with the box and the accents are not clipped. Gaze travel is expressed
  in viewBox units, which means it stays proportional at any size.
- Blinks are random per instance and never announced; they are read as life, not
  as an event.
- Under `prefers-reduced-motion: reduce` the springs, blinks, saccades, mood
  loops, accents and the speaking mouth all resolve to their resting state. The
  face still shows the correct mood, and it is never blank — a static character
  is a character. A talking face under reduced motion holds an open mouth rather
  than a closed one, so it still reads as speaking.
- The moods are never distinguished by colour alone: eye shape, mouth shape and
  the accent all differ, so the read survives a monochrome or low-contrast theme.

## Performance

- The eyes are painted imperatively rather than animated as motion values. On an
  SVG node, motion-v promotes style keys to attributes, and the gaze rides in as
  `x` and `y` — the same keys the eye uses for its own geometry, so a spring on
  the gaze would overwrite the shape it is meant to move. Composing the transform
  by hand keeps both, and the springs still drive every frame because they notify
  on change.
- A mood change is a CSS transition, not a JavaScript tween. The browser runs it
  while the gaze springs are busy, and it costs no frame budget on the main
  thread.
- Every mouth shape is mounted and cross-faded, because an SVG path cannot tween
  its `d` through a CSS transition. Cross-fading nine paths is cheaper than
  interpolating a path string per frame. The speaking mouth is the one shape that
  moves on its own, and its keyframes are only attached while it is the visible
  mouth, so the other faces do not run an invisible animation.
- `amplitude` is normalised once through `useAmplitudeValue`, which reads a getter
  rather than a plain value — a prop read at setup would freeze at mount and a
  later change would be silently ignored. Orb energy is quantised to four steps
  before it crosses into a render.
- A radial-gradient circle sits directly under the shader as a painted
  understudy. On pages running many WebGL surfaces the browser reclaims the
  oldest contexts, and a reclaimed orb would leave a bare canvas — which turns
  the character into a pair of floating eyes. The orb also listens for
  `webglcontextlost` and swaps itself for the same gradient, because a lost
  canvas is not empty: Chrome paints it opaque white. Use `painted` to skip the
  context altogether when a page shows many faces at once.
- The states carry their own saturation, applied as a `saturate()` filter on the
  root. A faulted assistant visibly cools down next to the rest of the interface
  instead of staying cheerful.
