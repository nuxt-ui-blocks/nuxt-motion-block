---
title: Favicon Search
description: A combobox search field whose results show each site's favicon, with keyboard navigation and matched-text highlighting.
---

A search field and its result panel, arranged as a combobox: the input keeps
focus, the arrow keys move a highlighted row, and `aria-activedescendant` tells a
screen reader which row is current. Each row carries the site's favicon, its title
and an optional description.

Favicons come from the result's own `favicon` field when it has one. Otherwise the
component asks Google's public favicon service for the `url`'s hostname, and if
that image fails to load it draws a globe glyph instead of leaving a broken image.
The request only happens when a row is rendered, and the component itself never
searches or fetches results.

Matching is presentational. The component highlights the typed substring in each
title and description, but it does not filter `results` — that stays with the
consumer, so a server search, a local index and a static list all use the same
field.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="favicon-search-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-6">
    <div class="w-full max-w-md space-y-3">
      <MFaviconSearch
        :results="results"
        label="Search the docs"
        placeholder="Search documentation…"
        @select="selected = $event.title"
      />

      <p class="text-xs text-muted">
        {{ selected ? `Opening ${selected}` : 'Type to filter, then use the arrow keys.' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const results = [
  {
    id: 'vue',
    title: 'Vue.js',
    description: 'The progressive JavaScript framework',
    url: 'https://vuejs.org',
  },
  {
    id: 'nuxt',
    title: 'Nuxt',
    description: 'The full-stack Vue framework',
    url: 'https://nuxt.com',
  },
  {
    id: 'motion',
    title: 'Motion for Vue',
    description: 'A production-ready animation library',
    url: 'https://motion.dev',
  },
  {
    id: 'ui',
    title: 'Nuxt UI',
    description: 'A UI library for Nuxt applications',
    url: 'https://ui.nuxt.com',
  },
]

const selected = ref('')
</script>
```
::

`@select` hands back the whole result, so the consumer can route to `result.url`
without searching the array again. Binding `v-model` is optional; without it the
field keeps its own query, seeded once from `defaultValue`.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="favicon-search-custom" />
  :::
#code
  <PlaygroundCode name="FaviconSearch" />
::

`loading` swaps the rows for skeleton placeholders, which is the state to use while
a remote search is in flight. `showShortcut` both draws the `⌘K` hint and binds the
global hotkey; change `hotkey` to move it. `maxResults` trims before rendering, so
the stagger and the virtual height stay predictable even when the source array is
long.

## Props

::component-props
  ::component-prop{name="results" type="FaviconSearchResult[]" required}
  The rows to render. Each needs a stable `id`, a `title` and a `url`; `favicon`
  and `description` are optional. The component does not filter or fetch them.
  ::
  ::component-prop{name="modelValue" type="string"}
  The current query. While this is `undefined` the component keeps its own copy
  seeded from `defaultValue`; passing a value switches it to controlled mode
  permanently.
  ::
  ::component-prop{name="defaultValue" type="string" default="''"}
  Seeds the uncontrolled query once, during setup. It is not watched.
  ::
  ::component-prop{name="open" type="boolean"}
  Controlled panel state. Leave it out to let focus, typing and Escape drive it,
  and use `update:open` to observe it.
  ::
  ::component-prop{name="defaultOpen" type="boolean" default="false"}
  Opens the panel on the first render when the state is uncontrolled.
  ::
  ::component-prop{name="loading" type="boolean" default="false"}
  Replaces the list with four skeleton rows and marks the listbox `aria-busy`.
  ::
  ::component-prop{name="emptyMessage" type="string" default="'No results found'"}
  Shown when a non-empty query produces no results.
  ::
  ::component-prop{name="groupLabel" type="string" default="'Search results'"}
  Accessible name for the listbox.
  ::
  ::component-prop{name="label" type="string" default="'Search'"}
  Accessible name for the input. It is not drawn, so pair the field with a visible
  heading in the surrounding layout if one is needed.
  ::
  ::component-prop{name="placeholder" type="string" default="'Search…'"}
  Placeholder for the search field.
  ::
  ::component-prop{name="maxResults" type="number"}
  Renders at most this many results. Leave it out to render the whole array.
  ::
  ::component-prop{name="showShortcut" type="boolean" default="false"}
  Draws the shortcut hint while the field is empty and binds `Ctrl`/`Cmd` plus
  `hotkey` on the window to focus the field.
  ::
  ::component-prop{name="hotkey" type="string" default="'k'"}
  The character used with `Ctrl`/`Cmd` when `showShortcut` is on.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root element.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" type="(value: string) => void"}
  Fires on every input, whether or not the component is controlled.
  ::
  ::component-event{name="update:open" type="(open: boolean) => void"}
  Fires when the panel opens or closes, including on focus, Escape, a selection
  and a click outside.
  ::
  ::component-event{name="select" type="(result: FaviconSearchResult) => void"}
  Fires with the chosen result when a row is clicked or activated with Enter.
  ::
::

## Accessibility

- The input is `role="combobox"` with `aria-expanded`, `aria-controls`,
  `aria-autocomplete="list"` and `aria-activedescendant`, so the highlighted row
  is announced while focus stays in the field. Rows are `tabindex="-1"` and are
  not separate tab stops.
- Each row is a `role="option"` button carrying `aria-selected`. Selection is
  also carried by a background plate and a text-weight change, not colour alone.
- `Escape` closes the panel, the arrow keys wrap at both ends, Home and End jump
  to the ends, and Enter selects the highlighted row.
- Favicons are decorative: the `<img>` is `alt=""` and `aria-hidden`, and the
  fallback `UIcon` is hidden too. The title and description already name the site.
- Matched text is wrapped in `<mark>`, but the same characters remain in the text
  run, so the highlight is never the only thing that identifies a match.
- A visually hidden `aria-live="polite"` status announces "Loading results…"
  while `loading` is on, and skeleton rows are `aria-hidden` so they are never
  read as options.
- Under `prefers-reduced-motion` the panel and rows keep their hidden `initial`
  state but use zero-duration transitions; the shared highlight plate is replaced
  by a static background and the skeletons stop pulsing.

## Performance

- No search, debounce or fetch happens inside the component. `results` is already
  the answer; the only derived work is a slice for `maxResults`, a favicon URL map
  and the highlight segments for the rows on screen.
- Favicon requests are `loading="lazy"` and only exist for rendered rows. A failed
  image is remembered by result id, so it falls back once rather than retrying on
  every render.
- The panel is inside `AnimatePresence` and unmounts on close, so a closed search
  leaves no list, no images and no layout in the document.
- Each row is animated with `opacity` and `y` by a few milliseconds of stagger.
  No measured height, no layout animation and no scroll handler is involved.
- The shortcut listener is one `keydown` handler on the window, and the
  click-outside listener comes from VueUse; both are removed on unmount.

::note
Favicons are fetched from `https://www.google.com/s2/favicons?domain=…&sz=64`.
Pass `favicon` on a result to bypass that service entirely, which is also the way
to avoid the third-party request in a privacy-sensitive app.
::
