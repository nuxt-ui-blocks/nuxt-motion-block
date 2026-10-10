---
title: AI Sources
description: A collapsed stack of source favicons that fans on hover and expands into a list.
navigation:
  icon: i-lucide-layers
---

# AI Sources

The sources behind an answer, collapsed to a stack of favicons. Hover the stack
and it fans apart as a hint that it is a set rather than a single badge; click and
each chip travels into its own row in the expanded list.

Use it at the foot of an [AI Message](/docs/components/ai-message) or an
[AI Response](/docs/components/ai-response) to close the loop between a claim and
its evidence.

## Usage

Pass `sources` as `{ id, title, url, snippet? }`. Without a `snippet` the row
falls back to the host. Slot the `favicon` only if you have real marks —
otherwise you get the neutral globe, which is the honest default.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-sources-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-lg rounded-2xl border border-default p-6">
    <MAiSources :sources="sources">
      <template #favicon="{ source }">
        <UIcon :name="source.icon" />
      </template>
    </MAiSources>
  </div>
</template>

<script setup lang="ts">
type Source = {
  id: string
  snippet?: string
  title: string
  url: string
  icon: string
}

const sources: Source[] = [
  {
    id: 's-1',
    icon: 'i-lucide-github',
    snippet: 'Component: add / update / delete a source',
    title: 'Add a search source',
    url: 'https://ui.nuxt.com/docs/components/chat'
  },
  {
    id: 's-2',
    icon: 'i-lucide-book-open',
    snippet: 'How retrieval-augmented generation is wired into the answer',
    title: 'Retrieval notes',
    url: 'https://ai-sdk.dev/docs'
  },
  {
    id: 's-3',
    icon: 'i-lucide-file-text',
    snippet: 'Release checklist, internal',
    title: 'Shipping checklist',
    url: 'https://motion-primitives.com'
  },
  {
    id: 's-4',
    icon: 'i-lucide-globe',
    title: 'Token naming convention',
    url: 'https://nuxt.com/docs'
  }
]
</script>
```
::

## Props

::field-group
  ::field{name="sources" type="AiSource[]"}
  Required. Each entry is `{ id, title, url, snippet? }`. `snippet` is a short
  excerpt or description; without it the row falls back to the bare host, parsed
  from `url` with a leading `www.` stripped. An unparseable URL is displayed
  verbatim rather than throwing.
  ::
  ::field{name="label" type="string" default="'Sources'"}
  The text after the stack. Set it to something countable — "4 sources" — if your
  design needs the number spelled out; the stack itself only shows a `+n` chip
  for the overflow.
  ::
  ::field{name="defaultOpen" type="boolean" default="false"}
  Start expanded. Use it when the sources are the point of the surface rather than
  an appendix.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the outer wrapper.
  ::
::

## Slots

::field-group
  ::field{name="favicon" type="{ source: AiSource }"}
  The mark for a source, rendered in both the collapsed stack and the expanded
  row, and receiving the source it belongs to. Anything that fits an `<img>` works
  — a logo service URL, a repo isotype. The wrapper applies `size-full`,
  `object-cover` and `fill-foreground` to slotted children, so an SVG that ships
  `fill="none"` picks up the current text colour.

  With no slot, each chip draws a neutral globe. The component never fabricates a
  one-letter badge from the host: an honest "unknown host" beats a convincing
  wrong answer pretending to be a logo.
  ::
::

## Accessibility

- The trigger is a native `<button type="button">` carrying `aria-expanded`, so
  its state is announced rather than only drawn.
- The collapsed stack shows at most three favicons and a `+n` count, so a long
  source list never becomes an unreadable ribbon.
- The expanded list is a real `<ul>` of `<li>`s, and every row is an anchor with
  `target="_blank"` and `rel="noopener noreferrer"`.
- The expanded body is `inert` while collapsed. That removes it from the tab order
  and the accessibility tree entirely — a better guarantee than a collapsed
  container that still holds focusable links.
- The fan is a hover hint only. It reveals nothing: the expanded list is what
  actually contains the sources, so keyboard users get everything a pointer user
  gets. Hovering the button is not what opens it.
- Titles and snippets truncate with `min-w-0`, so a long source name ellipsises
  instead of pushing the row wide.
- Under `prefers-reduced-motion: reduce` the fan is suppressed, the expand is an
  instant `grid-template-rows` switch with no opacity fade, and the rows appear
  already settled.
- Nothing here is announced on expand — the list appearing is not an event. If a
  reader needs to know how many sources an answer used, put that in the `label`.

## Performance

- The expand is a `grid-template-rows` transition from `0fr` to `1fr` with
  `min-height: 0` on the child, not an animated `height: auto` inside an
  `AnimatePresence`. Animating to `auto` requires measuring the content first,
  which is fragile and needs a second frame; the grid track resolves to the
  natural height with no measurement at all.
- The chip stack and rows share a `layout-id` per source, which is what makes a
  chip travel from the stack into its row. The stack side drops its `layout-id`
  once open, so both sides never claim the same element.
- The layout prefix comes from `useId()`, which is stable across SSR. A random
  suffix would differ between server and client and the shared layout animation
  would never match on hydration.
- The fan is driven by a CSS transition on `margin-left` rather than a Motion
  spring. A Motion `animate` target on a `span` does not reliably reach the
  element here, and a chip that never lands at its offset reads as a broken stack
  rather than a hint.
- Only the first three sources render a chip. Overflow is a single computed
  subtraction, so a fifty-source answer costs the same DOM as a three-source one.
- Row transitions are staggered by index on open and share one frozen transition
  object per index.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiSources` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `w-full` |
| `trigger` | `flex w-full cursor-pointer items-center gap-2 rounded-lg py-1 text-left text-sm text-muted transition-colors hover:text-default` |
| `stack` | `flex items-center` |
| `chip` | `ai-sources-chip relative block` |
| `overflow` | `ml-1 tabular-nums` |
| `chevron` | `flex size-4 items-center justify-center` |
| `body` | `ai-sources-body` |
| `list` | `mt-1 min-h-0 list-none overflow-hidden` |
| `link` | `flex items-start gap-2.5 rounded-lg px-1 py-1.5 no-underline transition-colors hover:bg-muted` |
| `favicon` | `mt-0.5 block shrink-0` |
| `rowText` | `min-w-0` |
| `rowTitle` | `block truncate text-sm font-medium text-default` |
| `rowSnippet` | `block truncate text-xs text-muted` |
| `faviconBase` | `flex items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-muted` |
| `faviconMark` | `flex size-full items-center justify-center *:size-full *:fill-foreground *:object-cover` |
