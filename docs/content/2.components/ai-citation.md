---
title: AI Citation
description: An inline citation pill that previews its source on hover or focus.
navigation:
  icon: i-lucide-bookmark
---

# AI Citation

An inline source marker for a generated answer: a superscript pill carrying a
label such as `1` or `a`, and a preview card holding the source's host, title and
an optional excerpt.

The card is not a popover and not a modal. It opens on hover and on focus, and
closes on Escape, which means it is reachable by keyboard and works on touch
without a portal. The pill itself is a real `<a>` that opens the source in a new
tab, so the citation is useful even when the card is closed.

## Usage

Drop it straight into assistant prose ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â anywhere a sentence runs. Pair it with
[AI Response](/docs/components/ai-response), which turns `[n]` markers into pills
automatically when you want a lighter citation.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-citation-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md rounded-2xl border border-default p-6 text-sm leading-relaxed text-highlighted">
    <p>
      Animation primitives usually animate
      <MAiCitation
        label="1"
        title="Spring defaults"
        url="https://motion-primitives.com"
        description="The easing and stiffness values that every component in this kit falls back to when you do not pass your own."
      >
        <template #favicon>
          <UIcon name="i-lucide-sparkles" />
        </template>
      </MAiCitation>
      on first paint and then never touch
      <MAiCitation
        label="2"
        title="Interruptible by default"
        url="https://motion.dev/docs/react-motion"
      />
      again. The same rules hold for
      <MAiCitation
        label="3"
        title="Reduced motion"
        url="https://motion-primitives.com/docs/accessibility"
        description="Every primitive in this kit reads prefers-reduced-motion and falls back to an instant state change."
      />
      .
    </p>

    <p class="mt-4 text-xs text-muted">
      Hover or focus a pill to peek. Press Escape to dismiss.
    </p>
  </div>
</template>

<script setup lang="ts">
</script>
```
::

## Props

::field-group
  ::field{name="label" type="number | string"}
  Required. What the pill reads. Numbers are usual; short strings work when a
  model cites by key rather than by index.
  ::
  ::field{name="title" type="string"}
  Required. The source's headline, rendered in the card.
  ::
  ::field{name="url" type="string"}
  Required. The pill's `href`, and the value `aria-describedby` is keyed on. The
  host shown in the card is parsed from it with `new URL`, with a leading `www.`
  stripped; an unparseable value is displayed verbatim rather than throwing.
  ::
  ::field{name="description" type="string"}
  Optional excerpt. The block is omitted entirely when this is empty or absent.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the wrapping `<span>`, which also carries
  `relative inline-block align-super`.
  ::
::

## Slots

::field-group
  ::field{name="favicon" type="void"}
  Rendered inside a 14px square at the top-left of the card. Anything that fits
  an `<img>` works ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â a logo service URL, a repo isotype. The wrapper applies
  `size-full`, `object-cover` and `fill-foreground` to slotted children, so an
  SVG that ships `fill="none"` picks up the current text colour. With no slot,
  a neutral `i-lucide-globe` stands in; the component never invents a badge from
  the first letter of the host.
  ::
::

## Accessibility

- The pill is a real anchor with `target="_blank"` and
  `rel="noopener noreferrer"`, so the link is reachable, focusable and
  middle-clickable independently of the card.
- The card is wired to the pill with `aria-describedby`, and the attribute is
  present only while the card is mounted ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the reference never dangles.
- The wrapper opens on `focus` and closes on `blur`, so tabbing through prose
  reveals each citation without a pointer. `mouseleave` and `blur` share one
  120ms grace period, which is what lets the pointer cross the 6px gap between
  pill and card without the card dismissing first.
- The Escape handler is registered only while the card is open, so a page full
  of closed citations never intercepts the key.
- Under `prefers-reduced-motion: reduce` the card appears at its resting state
  with `duration: 0`, and its exit is an instant opacity change with no travel.
- The card is a `<span>` inside a `<span>`, positioned absolutely. It is not in a
  portal, so an ancestor with `overflow: hidden` will clip it.

## Performance

- Card open state is one `ref`. Opening mounts a single `Motion` element; the
  `:key` is the card id, so changing `url` remounts rather than morphing a card
  that described a different page.
- Centring uses a `-ml-36` margin, not `translateX(-50%)`, and the fixed width
  is written out in `style` alongside it. Motion animates `scale` and `y` on the
  same element, so a hand-written `transform` would fight the animation for the
  `transform` property. The trade-off is that the card width is fixed at 18rem
  in the stylesheet, so a very long title wraps rather than widening.
- Only one `setTimeout` is ever live. `open` clears a pending close and
  `onBeforeUnmount` clears it again, so navigating away mid-grace cannot leave a
  timer holding a detached component.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiCitation` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block align-super` |
| `pill` | `inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-border bg-muted px-1 text-[10px] font-medium text-muted no-underline transition-colors hover:border-accented hover:text-highlighted` |
| `card` | `absolute bottom-full left-1/2 z-50 -ml-36 mb-1.5 block w-72 rounded-xl border border-border bg-elevated p-3 text-left align-baseline shadow-lg` |
| `header` | `mb-1 flex items-center gap-1.5` |
| `host` | `truncate text-xs text-muted` |
| `icon` | `ml-auto text-muted` |
| `title` | `block text-sm leading-snug font-medium text-highlighted` |
| `description` | `mt-1 block text-xs leading-relaxed text-muted` |
