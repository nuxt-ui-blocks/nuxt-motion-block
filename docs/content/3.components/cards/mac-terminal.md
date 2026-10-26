---
title: Mac Terminal
description: A macOS-style terminal window that types a scripted shell session, with traffic-light controls and a blinking caret.
---

A terminal window with a chrome bar, three traffic lights, a monospace log and a
caret that blinks while a command is being typed. The session is a script, not a
live shell: you hand it the lines and it performs them in order.

Each line has a type. A `command` types out character by character after the
prompt; `output`, `error`, `success` and `comment` lines print whole, separated by
their own delay. Output lines wait `200ms` by default, which is what makes the
session read as a response rather than a paste.

Playback waits until the terminal is at least a third in view and pauses while
the browser tab is hidden, so a session placed mid-page does not finish before
anyone scrolls to it. Looping holds the finished log for a moment and starts
over. Under `prefers-reduced-motion` the whole session is printed at once and the
caret never blinks.

## Usage

Pass `lines` and let the window play itself. Every line needs a stable `id`, a
`type` and its `text`; `delay` is optional and measured in milliseconds from the
end of the previous line.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="mac-terminal-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center">
    <MMacTerminal
      class="w-full max-w-xl"
      title="nuxt-motion-block — zsh"
      :max-height="320"
      :lines="session"
    />
  </div>
</template>

<script setup lang="ts">
type Line = {
  id: string
  text: string
  type: 'command' | 'output' | 'error' | 'success' | 'comment'
  delay?: number
}

const session: Line[] = [
  { id: 'install', type: 'command', text: 'pnpm add nuxt-motion-block' },
  { id: 'install-done', type: 'success', text: '✓ Packages installed in 4.2s' },
  { id: 'dev', type: 'command', text: 'pnpm dev', delay: 350 },
  { id: 'dev-ready', type: 'output', text: 'Nuxt 4.5.2  ready in 640 ms' },
  { id: 'dev-local', type: 'comment', text: 'Local:    http://localhost:3000/' },
  { id: 'test', type: 'command', text: 'pnpm test', delay: 350 },
  { id: 'test-done', type: 'success', text: '✓ 42 tests passed in 1.8s' },
  { id: 'lint', type: 'command', text: 'pnpm lint', delay: 350 },
  { id: 'lint-warn', type: 'error', text: 'warning  Unexpected console statement  no-console' },
  { id: 'lint-done', type: 'comment', text: '1 problem (0 errors, 1 warning)' },
]
</script>
```
::

Set `auto-play` to `false` when the reader should start the session themselves —
the window then becomes a button, and `Enter` or `Space` starts it. Bind
`v-model:started` to drive that from outside instead.

## Customize

`theme` switches the palette, `prompt` changes the shell prompt, and `max-height`
caps the log before it scrolls. `typing-speed` is in characters per second, so a
lower number reads as a slower, more deliberate session.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="mac-terminal-custom" />
  :::
#code
  <PlaygroundCode name="MacTerminal" />
::

## Props

::component-props
  ::component-prop{name="lines" type="TerminalLine[]" required}
  The session in order. Each entry has `id`, `type`, `text` and an optional `delay`
  in milliseconds. `type` is one of `command`, `output`, `error`, `success` or
  `comment`; only `command` lines type.
  ::
  ::component-prop{name="autoPlay" type="boolean" default="true"}
  Start the session as soon as the terminal scrolls into view. When `false` and
  `started` is unbound, the window is focusable and starts on click, `Enter` or
  `Space`.
  ::
  ::component-prop{name="started" type="boolean"}
  Controlled play state. Omit it to let the component own the state; pass it and
  the component never writes internally, only emitting `update:started`.
  ::
  ::component-prop{name="loop" type="boolean" default="false"}
  Restart from the first line after the last one finishes. The finished log stays
  on screen for 1.5 seconds before the reset.
  ::
  ::component-prop{name="typingSpeed" type="number" default="24"}
  Typing rate in characters per second. Values at or below zero fall back to `24`.
  The engine ticks every 40ms, so very high values are capped by that cadence.
  ::
  ::component-prop{name="maxHeight" type="number | string" default="360"}
  Maximum height of the scrolling log. A number is treated as pixels; a string is
  passed through as any CSS length.
  ::
  ::component-prop{name="prompt" type="string" default="'~ %'"}
  Prompt printed before every command, both while it types and once it lands in the
  log.
  ::
  ::component-prop{name="title" type="string" default="'Terminal'"}
  Window title in the centre of the chrome bar. Also used to build the root
  `aria-label` as `"{title} terminal"`.
  ::
  ::component-prop{name="theme" type="'dark' | 'light' | 'auto'" default="'dark'"}
  Palette for the chrome and log. `auto` follows `prefers-color-scheme` and updates
  when the system preference changes.
  ::
  ::component-prop{name="showTrafficLights" type="boolean" default="true"}
  Render the three traffic lights. They stay purely decorative unless the matching
  `close` or `minimize` listener is attached.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the window root, which is already `overflow-hidden rounded-xl border`.
  ::
::

## Events

::component-events
  ::component-event{name="complete" type="() => void"}
  Emitted once when the last line has finished, and again on each loop cycle after
  the session restarts. Under reduced motion it fires after the whole log is
  printed.
  ::
  ::component-event{name="update:started" type="(started: boolean) => void"}
  Emitted when the session is started or reset. Bind it with `v-model:started` to
  keep the controlled prop in sync.
  ::
  ::component-event{name="close" type="() => void"}
  Attaching a listener turns the red traffic light into a real button labelled
  "Close terminal"; without one the light is decorative.
  ::
  ::component-event{name="minimize" type="() => void"}
  Attaching a listener turns the yellow traffic light into a real button labelled
  "Minimize terminal".
  ::
::

## Accessibility

While the session types, the visible log is `aria-hidden="true"` and a visually
hidden `<pre aria-live="off">` holds the complete transcript. A screen reader
therefore gets the whole session immediately instead of a character at a time,
and no live region announces every keystroke. Under reduced motion the visible log
already contains every line, so the duplicate transcript is not rendered.

The root is a labelled `group` while it plays. When `auto-play` is `false` and the
session has not started, it becomes a `button` with `tabindex="0"` and handles
`Enter` and `Space`. The traffic lights only enter the tab order when they have a
listener, at which point each gets a descriptive `aria-label` and a visible focus
ring. All decorative lights are `aria-hidden`.

Colour is not the only signal: error, success and comment lines are separate
blocks of text rather than colour-tinted versions of the same copy, so the
transcript still reads correctly without colour perception.

## Performance

- One `setInterval` at 40ms drives both the line delays and the typing progress.
  It is cleared when the terminal leaves the viewport, the tab is hidden, the
  session finishes or the component unmounts; a looping session gets a fresh
  interval after the pause.
- Typing advances by slicing the current line's text. Completed lines are stored in
  an array; the in-flight line is the only value that changes per tick, so Vue
  patches one text node plus the caret.
- Auto-scroll runs once per state change, after `nextTick`, by setting
  `scrollTop` on the log element — no scroll polling and no layout reads in the
  tick.
- The traffic lights, caret and chrome bar are plain DOM and CSS. The only
  animation is the caret blink, a `steps(1)` keyframe that is disabled by a media
  query under reduced motion.
