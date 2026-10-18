---
title: Brightness slider
description: A notched exposure-control rail with spring tracking, keyboard support and a progress ring.
navigation:
  icon: i-lucide-aperture
---

# Brightness slider

A notched rail you drag, click, or step with the keyboard. Only the notch under
the centre line is painted in the accent colour; its neighbours fade and clip
away, so the eye lands on the current value without a separate label.

Useful anywhere a value has discrete, evenly-spaced steps and a physical
feel matters — exposure and aperture on a camera panel, a focus dial, a
scrub-through control.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="exposure-slider-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-3">
    <MExposureSlider
      class="w-full"
      label="Exposure"
      @change="value = $event"
    />
    <p class="text-sm text-muted">
      {{ value > 0 ? `+${value}` : value }} EV
    </p>
  </div>
</template>

<script setup lang="ts">
// The slider is uncontrolled: it owns the selection and only reports changes.
// Keep your own copy of the value if you need to display it.
const value = ref(0)
</script>
```
::

## Range and centring

`min`, `max` and `step` define the notches, and `defaultValue` decides where
travel is centred rather than where the value starts.

The centre is always the *nearest reachable notch* to `defaultValue`, not the
notch that literally equals it. With `min={-5} step={3} defaultValue={0}` the
reachable values are `-5, -2, 1, 4, 7, 10`, so `0` snaps to `1`. This is what
lets a range like `-5..10` still feel like a dial centred on a real setting, and
it matches the upstream rounding exactly.

Asymmetric ranges are fully supported: travel to each side is computed from the
number of notches actually available in that direction, so `End` always reaches
`max` and `Home` always reaches `min` without overshooting.

## Props

::field-group
  ::field{name="min" type="number" default="-20"}
  Lowest reachable value. Also determines the first notch.
  ::

  ::field{name="max" type="number" default="20"}
  Highest reachable value. Also determines the last notch.
  ::

  ::field{name="step" type="number" default="1"}
  Distance between neighbouring notches. The number of notches is
  `floor((max - min) / step) + 1`, so a value that is not an exact multiple of
  the step simply never appears.
  ::

  ::field{name="defaultValue" type="number" default="0"}
  The value the track is centred on. It is snapped to the nearest notch on
  mount; see [Range and centring](#range-and-centring).
  ::

  ::field{name="label" type="string" default="'Exposure'"}
  Accessible name for the slider. It is applied as `aria-label`, and a passed-in
  `aria-label` takes precedence.
  ::

  ::field{name="accentColor" type="string" default="'var(--color-brand, oklch(0.65 0.25 12))'"}
  Colour of the centred notch and the leading arc of the progress ring. Any
  CSS colour works, and the value is published as the `--es-accent` custom
  property so the notches inherit it.
  ::

  ::field{name="showIndicator" type="boolean" default="true"}
  Whether to draw the progress ring above the track. Turn it off for one-sided
  controls where a ring has nothing meaningful to fill.
  ::

  ::field{name="disabled" type="boolean" default="false"}
  Marks the slider `aria-disabled` and stops both the pointer and the keyboard
  from changing the value. The control stays focusable and discoverable, it just
  refuses input.
  ::

  ::field{name="class" type="string"}
  Classes for the root element, which is also the element that carries the
  `role="slider"` semantics.
  ::
::

## Events

::field-group
  ::field{name="change" type="(value: number) => void"}
  Emitted when the selected value changes, with the value already clamped to
  `[min, max]`.

  Fires exactly once per interaction, on commit — not continuously while
  dragging — and never when the value is unchanged, so a consumer does not
  receive a stream of duplicate values when a key is held at a bound.
  ::
::

## Keyboard

The track is focusable and responds to the full set of slider keys:

| Key | Action |
| --- | --- |
| <kbd>←</kbd> <kbd>↓</kbd> | One notch down |
| <kbd>→</kbd> <kbd>↑</kbd> | One notch up |
| <kbd>PageUp</kbd> | Ten notches up |
| <kbd>PageDown</kbd> | Ten notches down |
| <kbd>Home</kbd> | Lowest notch |
| <kbd>End</kbd> | Highest notch |

Both a drag and a key press go through one commit path, which is why the
`change` event behaves identically no matter how the value was reached.

## Interaction model

The two pointer gestures are deliberately different:

- **Click** jumps straight to the notch you clicked, absolute to the rail.
- **Drag** is relative. It grabs wherever you pressed and follows the pointer,
  so pulling the rail right slides the notches right and lowers the value
  under the centre line.

The track follows the pointer continuously while the *value* only steps at
notch boundaries. That keeps the drag feeling fluid while keeping the reported
value on the grid — a screen reader never receives a moving, fractional value.

A cancelled gesture reverts to the value it started from rather than snapping to
wherever the pointer happened to be, so the visible value never disagrees with
the last value a consumer was told about.

## Accessibility

The track is a `role="slider"` with `tabindex="0"`, carrying `aria-valuemin`,
`aria-valuemax`, `aria-valuenow` and `aria-valuetext`. It is a single focus
stop rather than a tablist, since the notches are decorative and are not
exposed individually.

`aria-disabled` and the behavioural gate are kept in step: when `disabled` is
set, every input path — pointer *and* keyboard — is inert, rather than only
looking disabled to assistive technology.

Under `prefers-reduced-motion` the spring is swapped for a near-instant
transition rather than removed, so the notch still moves to the value you
chose. Reduced motion should remove *movement*, not *feedback*.

## Examples

### Asymmetric range

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="exposure-slider-range" />
  :::
#code
```vue
<template>
  <MExposureSlider
    class="w-full max-w-md"
    label="Aperture"
    :min="-5"
    :max="10"
    :step="3"
    :default-value="0"
    accent-color="#22d3ee"
  />
</template>
```
::

### One-sided control

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="exposure-slider-focus" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-3">
    <MExposureSlider
      class="w-full"
      label="Focus"
      accent-color="#f472b6"
      :show-indicator="false"
    />
    <p class="text-center text-sm text-muted">
      Focus is a one-sided control: the rail fades toward the centre, so there
      is no indicator to get in the way of the type.
    </p>
  </div>
</template>
```
::

### Disabled

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="exposure-slider-disabled" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-3">
    <MExposureSlider
      class="w-full"
      label="ISO"
      accent-color="#a3e635"
      :disabled="locked"
    />
    <UButton
      size="sm"
      variant="subtle"
      @click="locked = !locked"
    >
      {{ locked ? 'Unlock' : 'Lock' }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
// A disabled slider keeps `aria-disabled="true"` and ignores both the pointer
// and the keyboard, so it stays reachable by screen readers without accepting
// input.
const locked = ref(true)
</script>
```
::

## Notes

- The slider is **uncontrolled**. It owns the selection and reports changes
  through `change`; it does not accept a `v-model`. To display the value, keep
  your own copy.
- `defaultValue` only sets the centre on mount. It is not watched, so changing
  it later re-centres nothing. The component exposes no imperative API for
  setting the value from outside.
- Notch geometry is fixed at 13px. The track is therefore `notches * 13px`
  wide, and the rail mask fades either side of centre so the first and last
  notch can still reach the middle.
