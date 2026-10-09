---
title: Code Block
description: A Shiki-highlighted code panel with a language label and a copy button.
navigation:
  icon: i-lucide-code
---

# Code Block

A dark code panel with a language label in the header, a copy button that flips
to "Copied!" for two seconds, and syntax highlighting from Shiki. The panel
animates in once on mount; the copy confirmation swaps with a short vertical
slide.

Highlighting is done in the browser. On mount the component creates a Shiki
highlighter for exactly the theme and language it was given, converts the code to
HTML, and injects the result. That means the markup is fully highlighted by the
time it appears rather than flashing plain text and recolouring — at the cost of
the panel being empty on the server render.

Because it goes through Shiki, `language` has to be a language Shiki knows and a
theme it ships. If either is missing, the component falls back to a plain escaped
`<pre>` in the same dark shell rather than throwing, so a wrong language degrades
to readable-but-unhighlighted code.

The `showLineNumbers` gutter is a separate absolutely-positioned column rather
than Shiki's own line rendering, which keeps the gutter out of the injected HTML.
It only appears once highlighting has produced content, so on the server render
and during the highlighter's async load the panel renders without it.

## Usage

Pass `code` as a string and `language` as a Shiki language id. Toggle
`showLineNumbers` when the snippet is long enough that position matters.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="code-block-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <USwitch
      v-model="withNumbers"
      label="Show line numbers"
    />

    <MCodeBlock
      :code="snippet"
      language="ts"
      :show-line-numbers="withNumbers"
    />
  </div>
</template>

<script setup lang="ts">
const withNumbers = ref(true)

const snippet = `const items = ref([
  { id: 1, label: 'Design tokens' },
  { id: 2, label: 'Component audit' },
])

function onChange(next: Item[]) {
  items.value = [...next]
}`
</script>
```
::

## Props

::field-group
  ::field{name="code" type="string"}
  The source to display, and the exact text the copy button puts on the clipboard
  — not the highlighted HTML. Required.
  ::
  ::field{name="language" type="string" default="'vue'"}
  Shiki language id used both to load the grammar and to tokenise the code. An
  unknown id falls back to plain escaped text in the same panel rather than
  failing.
  ::
  ::field{name="theme" type="string" default="'github-dark'"}
  Shiki theme name. Loaded alongside the language and used for the token colours;
  the panel background is hardcoded to `#0d1117` and does not follow the theme.
  ::
  ::field{name="showLineNumbers" type="boolean" default="false"}
  Render the line-number gutter and pad the code body to clear it. The gutter only
  appears after highlighting has resolved, so it is absent from the server render.
  ::
::

## Accessibility

The copy button is a bare `<button>` with no `type` and no accessible label beyond
its own visible text, so its accessible name changes with that text — "Copy", then
"Copied!" — but nothing announces the change to a screen reader, and there is no
`aria-live` region. The language name in the header is a `<span>`, not a label
element.

The highlighted code is injected with `v-html`, so the code itself reaches the
accessibility tree as the Shiki spans it produces — token colours carry no extra
semantics, and the code reads as text. There is no `tabindex` on the scrollable
body, so a keyboard user cannot scroll a long line horizontally; the copy button
is the only focusable element in the panel.

No `prefers-reduced-motion` handling: the panel animates in on mount and the copy
label slides between its two states regardless of motion preference. The two
second timer that flips the label back is not cleared on unmount.

## Performance

- Shiki is loaded and initialised on mount per instance, for one theme and one
  language. A page with many code panels pays for that many initialisations.
- The highlighter runs once; the copy path only calls `useClipboard`'s `copy` and
  toggles a ref.
- The panel fades and slides in on mount with the default transition, and its
  variant declares `staggerChildren` while having no motion children of its own —
  so the stagger has nothing to stagger and the whole panel is one animated element.
- The `showLineNumbers` branch is duplicated in the template: two near-identical
  `motion.div` trees, one with the gutter and one without. Only one renders.
- The fallback path escapes `&`, `<`, `>` and `"` and wraps the result in a `shiki`
  class `<pre>`, so a missing grammar or theme degrades instead of throwing.

::tip
The highlighter is created once in `onMounted`, so changing `code` or `language` on
an existing instance does not re-highlight — the old markup stays until the
component is recreated. Key the component on the snippet instead of updating it.
Note also that `theme` only controls token colours while the panel background is
`#0d1117` hardcoded, so a light Shiki theme lands light-coloured tokens on a dark
panel.
::