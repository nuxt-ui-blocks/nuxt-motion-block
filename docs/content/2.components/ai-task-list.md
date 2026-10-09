---
title: AI Task List
description: A plan the model is working through — nested steps, a derived count, and a check that draws itself.
navigation:
  icon: i-lucide-list-checks
---

# AI Task List

A plan the model is working through. Steps can nest one level, the header count is
derived from the tasks rather than passed in, and a completed step's tick draws
itself before the row settles back so the step that is actually running is the
only thing asking for attention.

Use it above an [AI Message](/docs/components/ai-message) to show the shape of
the work before the prose starts, or on its own while a long-running step is in
progress.

## Usage

Pass `tasks` and mutate the array as the plan progresses — status, not keyframes,
is what drives everything. Keep nesting to one level and put counts in `note`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-task-list-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md">
    <MAiTaskList
      label="Audit theme tokens"
      :tasks="tasks"
    />
  </div>
</template>

<script setup lang="ts">
type Status = 'pending' | 'running' | 'done' | 'failed'

type Task = {
  children?: Task[]
  id: string
  label: string
  note?: string
  status: Status
}

const tasks = ref<Task[]>([
  {
    id: 't-1',
    label: 'Read every component source',
    status: 'done'
  },
  {
    id: 't-2',
    label: 'Walk the theme tokens',
    status: 'running',
    children: [
      { id: 't-2a', label: 'colors', note: '18/18', status: 'done' },
      { id: 't-2b', label: 'spacing', note: '12/12', status: 'done' },
      { id: 't-2c', label: 'typography', note: '7/9', status: 'running' },
      { id: 't-2d', label: 'motion tokens', note: '2/6', status: 'pending' }
    ]
  },
  {
    id: 't-3',
    label: 'Diff the rendered output',
    note: '3 screenshots',
    status: 'pending'
  },
  {
    id: 't-4',
    label: 'Post the report to the PR',
    status: 'failed'
  }
])

const order: Status[] = ['pending', 'running', 'done']

onMounted(() => {
  window.setInterval(() => {
    tasks.value = tasks.value.map(task => ({
      ...task,
      status: advance(task.status),
      children: task.children?.map(child => ({
        ...child,
        status: advance(child.status)
      }))
    }))
  }, 900)
})

const advance = (status: Status): Status => {
  if (status === 'failed') {
    return status
  }
  const index = order.indexOf(status)
  return order[Math.min(index + 1, order.length - 1)]
}
</script>
```
::

## Props

::field-group
  ::field{name="tasks" type="AiTask[]"}
  Required. Each task is `{ id, label, status, note?, children? }`, where `status`
  is `'pending' | 'running' | 'done' | 'failed'` and `children` nests **one**
  level. Grandchildren are not flattened into the rows — they are silently left
  out of the display and still counted, which is why one level is the documented
  limit rather than an incidental one.
  ::
  ::field{name="label" type="string" default="'Plan'"}
  The heading text. The counts beside it are always derived; there is no prop for
  them, and there should not be.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the panel, which also carries
  `w-full rounded-xl border border-border bg-elevated p-3`.
  ::
::

`note` is a short right-aligned string — `"12/12"`, `"3 files"` — rendered with
`tabular-nums` so digits do not reflow as the counts climb. The component does not
parse it or infer anything from it.

## Accessibility

- The check and cross are drawn in an SVG that is `aria-hidden`, so the row's
  status is carried by its text and colour rather than by a path nobody can
  announce. If your surface needs the state spelled out, put it in `note`.
- Done and failed use distinct hues — a green and a red — *and* distinct glyphs, a
  tick and a cross. Neither state depends on colour alone.
- The running row keeps full opacity while completed rows settle to 65%, so the
  active step stays the highest-contrast text on the panel.
- The travelling underline is `pointer-events-none` and carries no text, so it
  cannot swallow a click or be read.
- Under `prefers-reduced-motion: reduce` the draw is disabled in CSS with no JS
  branch: the tick and cross are simply already drawn, rows change opacity
  instantly, and the underline does not run at all.
- Indented children are indented visually, not semantically. The list is one flat
  `<ul>` of `<li>`s, so a screen reader announces the steps in order without
  claiming a tree structure the component does not model.
- The style block is intentionally unscoped. The class is specific enough not to
  leak, and a scoped block would need `:deep()` to reach paths built inside a
  render function.

## Performance

- The box and its tick are a plain `<svg>` with a CSS transition, not `<Motion>`.
  motion-v's `as` does not resolve to SVG elements — `<Motion as="rect">` renders
  a `<div>`, which is exactly how a `<div>` once ended up inside a `<clipPath>`.
  `fill-opacity` and `stroke` are plain CSS properties on SVG, so the 200ms
  cross-fade works identically without depending on that.
- The tick is drawn by a CSS keyframe on mount rather than by a `pathLength`
  animation target, because both motion's `pathLength` shorthand and an explicit
  `strokeDashoffset` target failed to resolve on these paths and the check
  rendered as a stub. A keyframe is deterministic, and it gives the reduced-motion
  case for free inside `@media (prefers-reduced-motion: no-preference)`.
- The travelling underline animates `backgroundPositionX` from `0%` to `200%` on
  a half-width gradient, so one band crosses the row and is replaced by the next.
  It reads as travel rather than a loop. The indefinite repeat has no CSS
  equivalent, which is why this one stays in Motion.
- The underline is a paint-only animation on a 1px element: no layout, no reflow,
  and it is only mounted for rows whose status is `running`.
- `allTasks` and `rows` both flatten the task list in computeds, so the header
  count and the rendered rows are derived from one source. A `"3/7"` that has
  drifted from what is on screen destroys trust in the whole panel.
- `useReducedMotion()` is read once into a plain boolean rather than being
  reactive, because the reduced-motion preference does not change mid-session in
  any browser that matters and reading it per row would cost more than it saves.
