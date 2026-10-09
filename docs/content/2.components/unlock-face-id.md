---
title: Unlock Face ID
description: A Face ID glyph that runs its own scan, with content that blurs until the read succeeds.
navigation:
  icon: i-lucide-scan-face
---

# Unlock Face ID

A Face ID mark that scans itself: four corner brackets draw on, a band sweeps
across a schematic face, and on success the mark becomes a check and the content
behind it comes into focus.

It works two ways. Uncontrolled by default — activating the glyph starts a timed
scan and resolves to `success`. Pass `status` and the component stops touching
its own state entirely, so a real face-matching call owns the outcome.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="unlock-face-id-basic" />
  :::
#code
```vue
<template>
  <div class="flex items-center justify-center py-8">
    <MUnlockFaceId>
      <div class="flex h-full w-full flex-col items-center justify-center gap-1 p-4">
        <span class="text-xs font-medium text-highlighted">Vault</span>
        <span class="text-[10px] text-muted">Tap to unlock</span>
      </div>
    </MUnlockFaceId>
  </div>
</template>
```
::

The default slot is optional. Without one you get the bare glyph, which is
usually what you want inside a button or a card corner.

## Props

::field-group
  ::field{name="status" type="'idle' | 'scanning' | 'success' | 'error'"}
  Controlled status. Omit for uncontrolled behaviour.
  ::
  ::field{name="size" type="number" default="DEFAULT_SIZE"}
  Rendered size of the glyph, in px. The content slot is sized to match.
  ::
  ::field{name="scanDuration" type="number" default="DEFAULT_SCAN_DURATION"}
  How long an uncontrolled scan takes, in ms.
  ::
  ::field{name="errorMessage" type="string" default="DEFAULT_ERROR_MESSAGE"}
  Message shown when the status is `error`.
  ::
  ::field{name="label" type="string" default="DEFAULT_LABEL"}
  Accessible name for the scan trigger.
  ::
  ::field{name="class" type="string"}
  Merged onto the outer wrapper.
  ::
::

## Events

::field-group
  ::field{name="scan" type="() => void"}
  Fired whenever the trigger is activated.
  ::
  ::field{name="complete" type="() => void"}
  Fired when an uncontrolled scan resolves successfully.
  ::
::

## Controlled

The interesting case is a real verification flow. Listen to `@scan`, run your own
check, and hand the result back:

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="unlock-face-id-simulated" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md rounded-xl border border-default p-5">
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-highlighted">Secure vault</span>
        <span class="text-xs text-muted">{{ label }}</span>
      </div>

      <MUnlockFaceId
        :error-message="message"
        :status="status"
        size="96px"
        @scan="verify"
      >
        <div class="flex h-full w-full flex-col items-center justify-center gap-1">
          <span class="text-sm font-semibold text-highlighted">1,284 items</span>
          <span class="text-[10px] text-muted">Face ID required</span>
        </div>
      </MUnlockFaceId>
    </div>
  </div>
</template>

<script setup lang="ts">
// Controlled, because a real face-matching call decides the outcome. The
// component only *asks*: `@scan` fires on activation, and you hand it back a
// status. Swap `verify` for your own call.
const status = ref<'idle' | 'scanning' | 'success' | 'error'>('idle')
const message = ref('Face not recognized.')

let timer: ReturnType<typeof setTimeout> | undefined

function verify() {
  status.value = 'scanning'
  clearTimeout(timer)
  timer = setTimeout(() => {
    status.value = Math.random() < 0.5 ? 'success' : 'error'
  }, 1600)
}

const label = computed(() => status.value)

onBeforeUnmount(() => clearTimeout(timer))
</script>
```
::

Because the trigger disables itself while busy, a held-down or double-tap
cannot queue two scans. `scanDuration` is still yours to set in uncontrolled
mode — the timer is re-armed when it changes mid-scan rather than left to fire
against the old value.

## States

All four statuses are driven directly by `status`, with no timers involved:

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="unlock-face-id-controlled" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-6 py-4">
    <div class="relative">
      <MUnlockFaceId
        :error-message="'Not recognized. Try again.'"
        :status="status"
        size="128px"
      />

      <UButton
        :disabled="status === 'scanning'"
        :label="status === 'error' ? 'Try again' : 'Run scan'"
        color="neutral"
        size="sm"
        variant="outline"
        @click="advance"
      />
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2">
      <UButton
        v-for="value in statuses"
        :key="value"
        :label="value"
        :variant="status === value ? 'solid' : 'ghost'"
        :color="status === value ? 'primary' : 'neutral'"
        size="xs"
        @click="status = value"
      />
    </div>

    <p class="text-xs text-muted">
      status = <span class="font-medium">{{ status }}</span> · controlled, so
      the component never resolves its own scan
    </p>
  </div>
</template>

<script setup lang="ts">
const statuses = ['idle', 'scanning', 'success', 'error'] as const

const status = ref<(typeof statuses)[number]>('idle')

function advance() {
  status.value =
    status.value === 'idle' || status.value === 'error'
      ? 'scanning'
      : 'success'
}
</script>
```
::

## Sizes

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="unlock-face-id-sizes" />
  :::
#code
```vue
<template>
  <div class="flex items-center justify-center gap-10 py-8">
    <div
      v-for="size in sizes"
      :key="size"
      class="flex flex-col items-center gap-2"
    >
      <MUnlockFaceId :size="size">
        <div class="flex h-full w-full items-center justify-center text-xs text-muted">
          {{ size }}
        </div>
      </MUnlockFaceId>
      <span class="text-[10px] text-muted">{{ size }}px</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const sizes = [64, 96, 128]
</script>
```
::

`size` is a plain number in px, not a CSS length — the glyph geometry, stroke
widths and dash offsets are all absolute, and the SVG scales through its
`viewBox`.

## Accessibility

The trigger is a real `<button type="button">`, so it is reachable by keyboard
and announced like any other button. On top of that:

- `aria-busy` is set while scanning, so a screen reader can say the control is
  working rather than going quiet.
- `aria-describedby` points at a `role="status" aria-live="polite"` region that
  carries the current message — `Ready to scan.`, `Scanning face…`,
  `Identity confirmed. Unlocked.`, or your `errorMessage`. The region is always
  in the DOM; only its text changes, which is what makes the announcement fire.
- The button carries `aria-label`, so the content slot behind it never becomes
  the accessible name by accident.
- The trigger disables itself while busy and once unlocked.

::tip
The glyph is `aria-hidden` and the *message* carries the meaning. If you change
the status copy, change the live-region text too — a status change with no new
message is silent for assistive tech even though it is obvious on screen.
::

Under `prefers-reduced-motion` the scan band stops sweeping, the stroke draw-on
resolves to fully drawn paths immediately, and the error shake is dropped. The
status changes still happen and the live region still announces them — only the
movement goes away.

## Performance

- Glyph transitions use `pathLength`-normalised `stroke-dasharray`, so the
  draw-on is one CSS property change per stroke rather than a measured path.
- `transformBox: 'view-box'` is set on the SVG, which is what makes a
  `transform-origin` of `50px 50px` mean the centre of the `100×100` viewBox.
  Without it the origin resolves against the element's own bounding box, which
  is offset from the drawn strokes — the shake then pivots around the wrong
  point.
- The two glyphs live in `AnimatePresence mode="wait"`, so the outgoing face
  finishes before the incoming check draws. Without `wait` the two outlines
  overlap mid-transition and cross in the middle of the frame.

## Notes

- Gradient and `clipPath` ids are generated per instance with `useId()`, so
  several glyphs can coexist on one page without the second clipping or tinting
  against the first one's `<defs>`.
- Colour comes from Nuxt UI tokens — `--ui-error` for `error`, `--ui-success`
  for `success`, `currentColor` otherwise — each with a hex fallback so the
  glyph still reads correctly outside a themed tree.
- There is deliberately no full face outline. A closed ring reads as "picture
  of a face"; four detached brackets plus a scan band read as "something is
  being scanned", which is what the interaction actually is.
- The props interface is declared inline on the component. The dev server
  resolves props through the browser-side `compileScript` path, which cannot
  follow a filesystem import.