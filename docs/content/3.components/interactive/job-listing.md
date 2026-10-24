---
title: Job Listing
description: A list of open roles that opens each posting into a focused detail panel.
---

A compact hiring list. Each row carries a company, the role, a salary range and
a line of location and age metadata. Pressing a row dims and blurs the list,
then opens the full description in a panel at the centre. Escape, a click on the
backdrop or the same row closes it again.

The panel is a real dialog with a name, focus moved into it on open and returned
to the row you came from on close. The rows behind are made inert while it is
open, so tabbing cannot wander into the list underneath.

## Usage

Pass `jobs` and render nothing else. Without a logo slot, each company gets a
small tile with its initials.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="job-listing-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-xl">
    <MJobListing :jobs="jobs" />
  </div>
</template>

<script setup lang="ts">
const jobs = [
  {
    company: 'Northwind',
    title: 'Senior product designer',
    salary: '$140k – $170k',
    location: 'Berlin',
    remote: 'Hybrid' as const,
    postedAt: '2d ago',
    description:
      'Own the end-to-end design of our scheduling product, from the first sketch to the shadcn-free component library the team ships with. You will pair with two engineers and a researcher, run weekly critiques, and keep the design system honest as it grows.',
  },
  {
    company: 'Lumen Labs',
    title: 'Front-end engineer',
    salary: '$120k – $150k',
    location: 'Lisbon',
    remote: 'Yes' as const,
    postedAt: '5d ago',
    description:
      'Build the interface for a real-time analytics tool used by small studios. The stack is Vue, TypeScript and a lot of careful CSS. You will care about keyboard navigation, loading states and the two hundred small decisions that make a dashboard feel fast.',
  },
  {
    company: 'Harbor Studio',
    title: 'Motion designer',
    salary: '$95k – $120k',
    location: 'Copenhagen',
    remote: 'No' as const,
    postedAt: '1w ago',
    description:
      'Shape how our brand moves across product and film. Day to day that means prototyping interactions, writing precise animation specs, and sitting with engineers until the easing curve matches the intent. A reel is worth more than a résumé.',
  },
]
</script>
```

::

`remote` accepts `Yes`, `No` or `Hybrid` and is written out as Remote, On-site
or Hybrid in the metadata line. The value is text, not a colour, so the policy
survives a grayscale screen.

## Customize

Use the `logo` slot for a real mark, an icon or a photograph. The slot is used
in both the row and the detail panel, so the two stay visually connected without
sharing a layout animation.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="job-listing-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-xl flex-col gap-3">
    <MJobListing
      :jobs="jobs"
      @select="status = `Opened ${$event.company}`"
    >
      <template #logo="{ job }">
        <span
          aria-hidden="true"
          :class="[
            'flex size-10 shrink-0 items-center justify-center rounded-lg text-inverted',
            job.tone,
          ]"
        >
          <UIcon
            class="size-5"
            :name="job.icon"
          />
        </span>
      </template>
    </MJobListing>

    <p class="px-2 text-sm text-muted">
      {{ status }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const status = ref('Pick a role to read the full listing.')

const jobs = [
  {
    company: 'Atlas',
    title: 'Design engineer',
    salary: '$130k – $160k',
    location: 'Remote (EU)',
    remote: 'Yes' as const,
    postedAt: '1d ago',
    description:
      'Sit between design and engineering on a small product team. Half your week is prototypes in Vue, the other half is refinement and code review. We expect taste, patience and a strong opinion about focus rings.',
    icon: 'i-lucide-compass',
    tone: 'bg-primary',
  },
  {
    company: 'Field Notes',
    title: 'Editorial lead',
    salary: '$110k – $135k',
    location: 'London',
    remote: 'Hybrid' as const,
    postedAt: '4d ago',
    description:
      'Run a small editorial team covering tools, craft and the people who make software. You will commission, edit and occasionally write, and you will protect the time it takes to make a piece actually good.',
    icon: 'i-lucide-notebook-pen',
    tone: 'bg-gradient-to-br from-warning to-error',
  },
  {
    company: 'Quarry',
    title: 'Platform engineer',
    salary: '$150k – $185k',
    location: 'Toronto',
    remote: 'No' as const,
    postedAt: '2w ago',
    description:
      'Keep the build fast and the deployments boring. The platform is TypeScript, Postgres and a growing set of internal tools. You will measure before optimizing, write the runbook, and delete more code than you add.',
    icon: 'i-lucide-layers',
    tone: 'bg-inverted',
  },
]
</script>
```
::

Give the component a width through `class` when it sits in a wider page; the
panel is capped at `max-w-2xl` and the rows fill whatever they are given.

## Props

::component-props
  ::component-prop{name="jobs" type="JobListingItem[]"}
  Roles to show. Each one needs `company`, `title`, `salary`, `location`,
  `remote`, `postedAt` and `description`.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root.
  ::
::

## Events

::component-props
  ::component-prop{name="select" type="(job: JobListingItem) => void"}
  Fired with the role that was opened, before the panel appears.
  ::
::

## Slots

::component-props
  ::component-prop{name="logo" type="{ job: JobListingItem }"}
  Replaces the initials tile in the row and the panel. Receives the current job.
  ::
::

## Accessibility

- Rows are `<button>` elements, so they are reachable with Tab and open with
  Enter or Space. Each one has `aria-haspopup="dialog"` and reports whether its
  panel is the one currently open with `aria-expanded`.
- The panel is `role="dialog"` with `aria-modal="true"` and is labelled by the
  company name, so a screen reader announces what opened.
- Opening moves focus to the panel; closing with Escape, the backdrop or a
  second press returns focus to the row that opened it.
- The list behind is `inert` while the panel is open, so focus cannot move into
  rows that are visually covered.
- The close gestures are not the only way out: Escape is listened for on the
  window, and the backdrop is a full-size click target rather than a thin
  border.
- Metadata uses words ("Remote", "On-site", "Hybrid") and `·` separators, so
  nothing relies on a coloured badge or an icon alone.
- Logo slots are expected to be decorative; the company name is always present
  as text next to them.
- Under `prefers-reduced-motion` the backdrop fade and panel scale are removed
  in CSS. The dialog still opens, closes and takes focus the same way.

## Performance

- The closed state renders only the rows: no dialog markup, no backdrop and no
  hidden descriptions in the DOM.
- Opening mounts one panel and reuses the same job object, so there is no fetch
  or clone per press.
- The backdrop uses one `backdrop-blur-xl` layer, and the panel animates with a
  single CSS transform rather than measuring layout.
- The Escape listener is attached only while the panel is open and removed on
  close and on unmount.
- Rows are plain buttons with no per-row observers, timers or state.
