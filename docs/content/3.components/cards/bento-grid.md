---
title: Bento Grid
description: A responsive grid of cards that reveal more on hover.
---

The Bento Grid is a two-part layout primitive. `MBentoGrid` owns the columns and the row height; `MBentoCard` owns the card itself, with a background slot, an icon, a title, a description and a call to action that slides in on hover.

Cards can span multiple columns and rows, which is what gives a bento layout its asymmetry.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="bento-grid-example" />
  :::
#code
```vue
<template>
  <MBentoGrid
    :cols="3"
    class="auto-rows-[13rem]"
  >
    <MBentoCard
      name="Analytics"
      description="Every session, charted the moment it happens."
      icon="i-lucide-chart-line"
      :col-span="2"
    >
      <template #background>
        <div class="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
      </template>
      <template #cta>
        <UButton
          variant="link"
          trailing-icon="i-lucide-arrow-right"
          size="sm"
        >
          Open dashboard
        </UButton>
      </template>
    </MBentoCard>

    <MBentoCard
      name="Alerts"
      description="Ping the team the second a metric slips."
      icon="i-lucide-bell"
    />

    <MBentoCard
      name="Retention"
      description="Cohorts that stay, month after month."
      icon="i-lucide-repeat"
      :col-span="2"
    >
      <template #background>
        <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
      </template>
    </MBentoCard>

    <MBentoCard
      name="Exports"
      description="Every table, one click away."
      icon="i-lucide-download"
    />
  </MBentoGrid>
</template>
```
::

## Examples

### Column and row spans

`cols` sets the column count; each card then claims as much of that grid as its
`colSpan` and `rowSpan` ask for. A single tall card next to two short ones is
enough to break the uniform-grid look.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="bento-grid-custom" />
  :::
#code
```vue
<template>
  <MBentoGrid
    :cols="2"
    class="auto-rows-[9rem]"
  >
    <MBentoCard
      name="Deploys"
      description="Every push, live in seconds."
      icon="i-lucide-rocket"
      :row-span="2"
    >
      <template #background>
        <div class="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-transparent" />
      </template>
    </MBentoCard>

    <MBentoCard
      name="Logs"
      description="Search across every service."
      icon="i-lucide-scroll-text"
    />

    <MBentoCard
      name="Backups"
      description="Nightly, verified, restorable."
      icon="i-lucide-archive"
    />
  </MBentoGrid>
</template>
```
::

## Props

### Bento Grid

::component-props
  ::component-prop{name="cols" type="1 | 2 | 3 | 4 | 5 | 6" default="3"}
  Column count from `md` upwards. `1` keeps a single column at every width.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the grid. Use it to change the row height, for example `auto-rows-[13rem]`.
  ::
::

### Bento Card

::component-props
  ::component-prop{name="name" type="string"}
  Title text. The `name` slot wins if both are given.
  ::

  ::component-prop{name="description" type="string"}
  Short line under the title. The `description` slot wins if both are given.
  ::

  ::component-prop{name="icon" type="string"}
  Icon name, rendered with `UIcon` unless the `icon` slot is used.
  ::

  ::component-prop{name="colSpan" type="1 | 2 | 3 | 4 | 5 | 6" default="1"}
  Columns the card spans from `md` upwards.
  ::

  ::component-prop{name="rowSpan" type="1 | 2 | 3" default="1"}
  Rows the card spans from `md` upwards.
  ::

  ::component-prop{name="interactive" type="boolean" default="true"}
  Lift the content and reveal the `cta` slot on hover. Turn it off for a card that only displays information.
  ::

  ::component-prop{name="as" type="string" default="'article'"}
  Element to render the card as. Use `'a'` to make the whole card a link.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the card.
  ::
::

## Slots

::component-props
  ::component-prop{name="background"}
  Rendered behind the card content. Use it for gradients, images or a component that fills the card.
  ::

  ::component-prop{name="icon"}
  Replaces the `icon` prop with your own element.
  ::

  ::component-prop{name="name"}
  Replaces the `name` prop.
  ::

  ::component-prop{name="description"}
  Replaces the `description` prop.
  ::

  ::component-prop{name="cta"}
  Slides up from the bottom edge on hover. It only accepts pointer events while the card is hovered.
  ::
::

## UI

Both parts of the layout have their own theme. Override either per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.bentoGrid` and `ui.bentoCard` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `grid w-full auto-rows-[18rem] grid-cols-1 gap-4` on the grid, `group relative flex flex-col justify-end overflow-hidden rounded-xl border border-default bg-default` on the card
  ::
  ::component-slot-row{name="background"}
  `absolute inset-0 overflow-hidden`
  ::
  ::component-slot-row{name="content"}
  `pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-transform duration-300 ease-out`
  ::
  ::component-slot-row{name="icon"}
  `size-8 text-highlighted`
  ::
  ::component-slot-row{name="name"}
  `text-xl font-semibold text-highlighted`
  ::
  ::component-slot-row{name="description"}
  `max-w-lg text-sm text-muted`
  ::
  ::component-slot-row{name="cta"}
  `pointer-events-none absolute bottom-0 z-20 flex w-full transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 ease-out`
  ::
  ::component-slot-row{name="overlay"}
  `pointer-events-none absolute inset-0 transform-gpu transition-colors duration-300`
  ::
::
