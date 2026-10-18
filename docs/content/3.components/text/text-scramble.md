---
title: Text Scramble
description: Text that scrambles through random characters before settling on the final string.
---

The TextScramble component fills a string with random characters from `characterSet`, then reveals the real text left to right as the animation progresses. It reads as a decrypting token or a system message and is a good match for status text, codes and short headlines.

## Usage

Pass the text as `text`. The scramble runs when `trigger` is `true` and re-runs every time `trigger` toggles.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-scramble-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold mb-4 text-highlighted">
        Security Verification
      </h2>
      <MTextScramble
        text="Generating secure token..."
        class="text-xl text-muted mb-6"
        :duration="1.5"
      />

      <div class="bg-default rounded-xl shadow-lg p-6 max-w-md w-full border border-default">
        <div class="flex items-center justify-between mb-6">
          <span class="text-highlighted font-semibold">Verification Status</span>
          <UBadge
            color="success"
            variant="soft"
          >
            <UIcon
              name="i-lucide-shield-check"
              class="w-4 h-4 mr-1"
            />
            Secure
          </UBadge>
        </div>

        <div class="space-y-4">
          <div class="flex justify-between items-center p-3 bg-elevated rounded-lg">
            <div class="flex items-center">
              <UIcon
                name="i-lucide-lock"
                class="w-5 h-5 text-primary mr-3"
              />
              <span class="text-default">Encryption</span>
            </div>
            <MTextScramble
              text="AES-256"
              class="font-mono text-sm font-medium"
              :duration="1"
            />
          </div>

          <div class="flex justify-between items-center p-3 bg-elevated rounded-lg">
            <div class="flex items-center">
              <UIcon
                name="i-lucide-shield"
                class="w-5 h-5 text-purple-500 mr-3"
              />
              <span class="text-default">Protocol</span>
            </div>
            <MTextScramble
              text="TLS 1.3"
              class="font-mono text-sm font-medium"
              :duration="1.2"
            />
          </div>

          <div class="flex justify-between items-center p-3 bg-elevated rounded-lg">
            <div class="flex items-center">
              <UIcon
                name="i-lucide-key"
                class="w-5 h-5 text-green-500 mr-3"
              />
              <span class="text-default">Token</span>
            </div>
            <MTextScramble
              text="X9K2-PQ4R-7M8N"
              class="font-mono text-sm font-medium"
              :duration="1.4"
            />
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-default">
          <UButton
            color="primary"
            variant="solid"
            block
            @click="regenerateToken"
          >
            <UIcon
              name="i-lucide-refresh-cw"
              class="w-4 h-4 mr-2"
            />
            Regenerate Token
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const regenerateToken = () => {
  // In a real implementation, this would trigger token regeneration
  window.location.reload()
}
</script>
```
::

## Examples

### Scramble a heading

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-scramble-heading" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <MTextScramble
      text="Heading Scramble"
      as="h1"
      class="text-3xl font-bold"
    />
  </div>
</template>
```
::

### Custom character set

Restrict `characterSet` to control the glyphs that appear while scrambling —
binary digits give a terminal read, for instance — and tune `speed` and
`duration` to set the pace. Toggling `trigger` back to `true` replays the
scramble, and `scrambleComplete` fires when it settles.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-scramble-characters" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-5">
    <MTextScramble
      text="ACCESS GRANTED"
      as="h2"
      character-set="01"
      :duration="1.4"
      :speed="0.02"
      :trigger="trigger"
      class="font-mono text-2xl font-bold tracking-widest text-green-500"
      @scramble-complete="done = true"
    />

    <div class="flex items-center gap-3">
      <UButton
        label="Re-run"
        icon="i-lucide-refresh-cw"
        variant="outline"
        @click="replay"
      />
      <UBadge
        :color="done ? 'success' : 'neutral'"
        variant="soft"
      >
        {{ done ? 'Decoded' : 'Decoding' }}
      </UBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
const trigger = ref(true)
const done = ref(false)

function replay() {
  done.value = false
  trigger.value = false
  nextTick(() => {
    trigger.value = true
  })
}
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-scramble-custom" />
  :::
#code
  <PlaygroundCode name="TextScramble" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="''"}
  The final text to reveal.
  ::

  ::component-prop{name="duration" type="number" default="0.8"}
  Total length of the scramble in seconds.
  ::

  ::component-prop{name="speed" type="number" default="0.04"}
  Seconds between frames. The number of frames is `duration / speed`.
  ::

  ::component-prop{name="characterSet" type="string" default="'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'"}
  The pool of characters drawn from while scrambling.
  ::

  ::component-prop{name="as" type="string" default="'p'"}
  The HTML tag to render.
  ::

  ::component-prop{name="trigger" type="boolean" default="true"}
  When it changes, the scramble re-runs. It only scrambles when the new value is `true`, so replay by toggling it `false` then `true`.
  ::

  ::component-prop{name="onScrambleComplete" type="() => void" default="undefined"}
  Called when the scramble finishes. Equivalent to listening for the `scrambleComplete` event.
  ::

  ::component-prop{name="className" type="string" default="''"}
  CSS classes applied to the root element.
  ::

  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes applied to the root element.
  ::

  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## Events

::component-events
  ::component-event{name="scrambleComplete" type="() => void"}
  Emitted once when the scramble reaches the final text.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textScramble` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  The tag rendered by `as`, holding the scrambling text.
  ::
::

## Accessibility

The component renders a single text node and updates it on an interval; there is no live region, so assistive technology will not announce every frame. The final state is the readable `text`, and spaces are preserved throughout. Because the intermediate characters are random glyphs in the same DOM node, avoid scrambling content that a screen reader user needs to read while it is animating.

## Performance

- The scramble advances on a `setInterval` of `speed` seconds and rewrites one text node, which is cheap, but short `speed` values create many updates per second.
- The interval is cleared when the scramble ends and on unmount.
- The animation only runs on the client; during SSR the initial `text` is rendered as-is.
