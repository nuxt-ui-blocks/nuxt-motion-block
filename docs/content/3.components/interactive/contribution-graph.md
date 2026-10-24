---
title: Contribution Graph
description: A calendar heatmap of a year of activity, with five intensity levels, month headers and keyboard-reachable day tooltips.
---

A year of activity laid out as a calendar: one column per week, one row per
weekday, and a cell for every day. `data` only needs the days that have activity —
the rest of the grid is filled in as empty days, so you never have to generate a
full year yourself.

Intensity comes from each entry's `level`, a `0`–`4` bucket. Those buckets are
mixed from the primary colour rather than hard-coded greens, so the heatmap
follows the app's theme in both light and dark mode. Empty days are still drawn,
as muted cells, because a calendar with holes in it reads as broken rather than
empty.

The grid is a real `<table>`. Months are column headers grouped by week, weekdays
are row headers, and every day with activity is focusable and carries its date and
count as text. Hovering or focusing a day opens a small tooltip with the full date
and the number of contributions; the animation is a short spring-driven scale,
honouring `prefers-reduced-motion`.

## Usage

Pass `data` with local `YYYY-MM-DD` keys and the `year` to display. Entries outside
that year are ignored, and days without an entry render at level `0`. `count` is
used for the label, `level` for the colour.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="contribution-graph-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-4">
    <MContributionGraph
      :data="contributions"
      :year="year"
      class="max-w-full"
    />
  </div>
</template>

<script setup lang="ts">
type Contribution = {
  count: number
  date: string
  level: number
}

const year = new Date().getFullYear()

function pad(value: number) {
  return `${value}`.padStart(2, '0')
}

function toKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const contributions: Contribution[] = []
const cursor = new Date(year, 0, 1)
let index = 0

while (cursor.getFullYear() === year) {
  const wave = Math.sin(index / 9) + Math.sin(index / 23)
  const count = wave > 0.4 ? Math.round((wave - 0.4) * 18) : 0

  contributions.push({
    count,
    date: toKey(cursor),
    level: count === 0 ? 0 : Math.min(4, Math.ceil(count / 4)),
  })

  cursor.setDate(cursor.getDate() + 1)
  index += 1
}
</script>
```
::

## Customize

`showTooltips` turns the hover and focus bubble off without changing the grid, and
`showLegend` removes the Less → More scale underneath. The tooltip is the only
animated part, so the graph is fully static when both are off.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="contribution-graph-custom" />
  :::
#code
  <PlaygroundCode name="ContributionGraph" />
::

## Props

::component-props
  ::component-prop{name="data" type="ContributionData[]" default="[]"}
  Days with activity. Each entry is `{ count, date, level }`, where `date` is a
  local `YYYY-MM-DD` key and `level` is the intensity bucket. Days missing from the
  array are rendered empty; entries outside `year` are ignored.
  ::
  ::component-prop{name="year" type="number" default="current year"}
  Calendar year to lay out. The grid always starts on the Sunday on or before
  January 1st, so the first and last columns can include a few days from the
  neighbouring year.
  ::
  ::component-prop{name="showTooltips" type="boolean" default="true"}
  Show the date-and-count bubble on hover and on keyboard focus. It is
  `pointer-events-none` and `aria-hidden`, so it never intercepts the pointer or
  duplicates the screen-reader text.
  ::
  ::component-prop{name="showLegend" type="boolean" default="true"}
  Render the five-swatch Less → More legend under the grid.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the root wrapper, which is `relative w-fit max-w-full`.
  ::
::

## Accessibility

The graph is a `<table>` with a visually hidden caption naming the year. Months
are `<th scope="col">` and weekdays are `<th scope="row">`, so the grid can be
navigated cell by cell with the table commands a screen reader already knows.

Every day with activity is focusable and contains a visually hidden label such as
`Monday, January 5, 2026: 3 contributions`. Days with no activity are skipped in
the tab order, so a full year does not become 365 stops. The colour blocks
themselves are `aria-hidden`; all information is in the text.

The tooltip repeats the same date and count visually, but it is decorative: it is
`aria-hidden` and never receives focus. `prefers-reduced-motion` removes the scale
and slide, leaving the bubble to appear without movement.

## Performance

- The year is resolved once into `53 × 7` day objects in a computed value. Changing
  `data` or `year` rebuilds that array; hovering does not.
- Each day is a `<td>` plus one inner block. The five level classes are static
  strings, so a tooltip opening only mutates the tooltip, never the grid.
- Tooltip position is written from the pointer or focus event directly to a
  `fixed` element — no measuring pass, no scroll listener and no layout read in a
  render.
- `AnimatePresence` mounts one tooltip at a time, and the enter/exit transition is
  limited to `opacity`, `scale` and `y`, all compositor-friendly properties.
