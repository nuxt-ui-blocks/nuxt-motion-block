---
title: AI Response
description: Streamed answer text where words fade in as they arrive and `[n]` markers become citation pills.
navigation:
  icon: i-lucide-text
---

# AI Response

The answer itself: streamed text where each word resolves out of a blur as it
arrives, and every `[n]` marker in the string becomes a citation pill.

The important behaviour is *when* words animate. They animate as they arrive, not
on a fixed timer ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the component remembers how many tokens it had on its last
render and animates only the new ones. A timer-driven typewriter drifts out of
step with the real stream and starts lying about how fast the model is answering.

Whitespace and bare punctuation stay as plain text. Wrapping a comma in its own
inline block would let the line break between a word and the punctuation that
belongs to it. Pair it with [AI Citation](/docs/components/ai-citation) when a
marker needs a preview card rather than just a link.

## Usage

Set `text` to the answer so far and append tokens to it as they arrive ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the
component animates the new words by itself. Pass `citations` to turn `[n]` markers
into pills.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-response-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-lg rounded-2xl border border-default p-6">
    <MAiResponse
      :citations="citations"
      :is-streaming="streaming"
      :text="text"
    />

    <div class="mt-4 flex items-center gap-3">
      <UButton
        :label="streaming ? 'Pause' : 'Resume'"
        size="sm"
        variant="soft"
        @click="streaming = !streaming"
      />
      <UButton
        label="Replay"
        size="sm"
        variant="ghost"
        @click="replay"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type Citation = {
  id: string
  index: number
  title: string
  url?: string
}

const citations: Citation[] = [
  { id: 'c-1', index: 1, title: 'Theme token audit runbook', url: 'https://motion-primitives.com' },
  { id: 'c-2', index: 2, title: 'Release checklist, internal' }
]

const full = 'Behind a flag [1]. The audit walks every theme token, so a cold landing means a long tail of unreviewed diffs [2].'

const text = ref('')
const streaming = ref(true)

const replay = () => {
  text.value = ''
  streaming.value = true

  const words = full.split(' ')
  let index = 0

  const tick = () => {
    index += 1
    text.value = words.slice(0, index).join(' ')
    if (index < words.length) {
      window.setTimeout(tick, 60)
    }
  }

  tick()
}

onMounted(replay)
</script>
```
::

## Props

::field-group
  ::field{name="text" type="string"}
  Required. The response so far; re-render it as it grows. It has no default on
  purpose ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â giving it one would also make it optional, which it is not.
  ::
  ::field{name="citations" type="AIResponseCitation[]" default="[]"}
  Sources referenced by `[n]` markers, each `{ id, index, title, url? }`. The
  `index` is what the pill displays and what the marker in the text matches on; it
  does not have to be sequential.

  `url` is optional on purpose. Most retrieval is over internal documents that
  have no public URL, and a required field there just pushes people into inventing
  `example.com` links that go nowhere. Without a `url` the pill renders as plain
  text rather than a dead link.
  ::
  ::field{name="isStreaming" type="boolean" default="false"}
  Show a caret after the last word. The caret is `aria-hidden`.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the paragraph, which also carries
  `text-pretty text-default text-sm leading-relaxed`.
  ::
::

## Accessibility

- A citation with a `url` renders as a real anchor with `target="_blank"`,
  `rel="noopener noreferrer"` and a `title`, so it is reachable by keyboard,
  middle-clickable, and readable on hover. One without a URL renders as a
  `<span>` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â never a link that goes nowhere.
- The caret is `aria-hidden="true"`. Streaming is visual; announcing it would
  interrupt every reader on every token.
- `text-pretty` is used on the paragraph so the browser balances the last line
  rather than leaving a single word stranded.
- Under `prefers-reduced-motion: reduce` the words render without blur, offset or
  fade, the pills appear at full scale, and the caret stops pulsing and stays
  solid. The text is never partially hidden.
- A `[n]` marker with no matching citation stays as literal text. The component
  does not invent a placeholder pill for a reference it cannot resolve.
- The component sets no ARIA role. Inside an
  [AI Message](/docs/components/ai-message) it inherits the turn's semantics;
  standalone it is a `<p>`, which is correct for a paragraph of prose.

## Performance

- Transition objects are frozen and hoisted at module scope. Motion restarts an
  animation whenever its transition changes identity, and this component re-renders
  on every token ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â handing over a fresh object each time would restart every word
  on screen.
- The `tokens` computed splits and resolves citations once per text change, not
  once per render.
- `paintedCount` is watched with `flush: 'post'`, so the new-token test is against
  a count already committed to the DOM. Watching it earlier would mark the
  arriving word as already-painted and drop its animation.
- Words animate `filter: blur()` and `opacity` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â no layout properties, no width
  measurement, and no reflow per token.
- The pill list is a linear `find` over `citations` per marker. That is fine for
  the handful of sources a single answer carries; a transcript with hundreds of
  citations per turn would want an index map.
- Re-splitting the whole string on every token is O(n) per token. For long
  transcripts this is the component's real ceiling, and the answer is to render
  settled turns statically rather than streaming them again.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiResponse` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `text-pretty text-default text-sm leading-relaxed` |
| `citation` | `mr-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-border bg-muted px-1 align-super font-medium text-[10px] text-muted no-underline` |
| `word` | `inline-block` |
| `caret` | `ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] rounded-full bg-current align-baseline` |
