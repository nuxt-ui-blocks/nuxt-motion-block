---
title: AI Tool Call
description: A single tool invocation with a status ring that keeps its shape through the whole lifecycle.
navigation:
  icon: i-lucide-terminal
---

# AI Tool Call

One tool invocation, collapsed by default. It builds on Nuxt UI's `ChatTool`, so
the disclosure, the streaming shimmer and the card frame behave like every other
tool call on the page.

Status is a four-value enum ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â `pending`, `running`, `success`, `error` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â rather
than the shared conversation vocabulary. A tool call has a *lifecycle*, not a
mood, and borrowing `AIState` here would imply a connection the data does not
have. The booleans `ChatTool` speaks are derived from it.

The badge is one ring that changes behaviour, not four icons that swap places:
`pending` breathes, `running` spins as a gap in the same ring, `success` keeps the
ring and draws a check inside it, `error` keeps the ring and draws a cross.
Because the ring never unmounts, the eye tracks a single object across the whole
lifecycle instead of watching icons pop in and out.

Pair it with [AI Task List](/docs/components/ai-task-list) when the plan is the
message and these are the detail.

## Usage

Render one card per invocation with a `name` and a `status`, and mutate that
status as the tool progresses. Supply the `args` or `result` slot only when you
have something to show ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the card is not expandable without them.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-tool-call-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-lg space-y-2">
    <MAiToolCall
      v-for="call in calls"
      :key="call.id"
      :name="call.name"
      :status="call.status"
      :summary="call.summary"
    >
      <template #args>
        <pre>{{ call.args }}</pre>
      </template>
      <template #result>
        <pre>{{ call.result }}</pre>
      </template>
    </MAiToolCall>
  </div>
</template>

<script setup lang="ts">
type Status = 'pending' | 'running' | 'success' | 'error'

type Call = {
  args: string
  id: string
  name: string
  result?: string
  status: Status
  summary?: string
}

const calls = ref<Call[]>([
  {
    id: 'c-1',
    args: '{ "query": "theme token audit" }',
    name: 'search_docs',
    result: '4 documents',
    status: 'success',
    summary: '4 results'
  },
  {
    id: 'c-2',
    args: '{ "path": "src/runtime/components" }',
    name: 'read_dir',
    status: 'running',
    summary: 'scanning'
  },
  {
    id: 'c-3',
    args: '{ "ref": "main" }',
    name: 'create_branch',
    status: 'pending'
  }
])

const order: Status[] = ['pending', 'running', 'success']

onMounted(() => {
  window.setInterval(() => {
    calls.value = calls.value.map((call) => {
      if (call.status === 'error' || call.status === 'success') {
        return call
      }
      const index = order.indexOf(call.status)
      const status = order[Math.min(index + 1, order.length - 1)]

      return {
        ...call,
        status,
        summary: status === 'success' ? '0.9s' : call.summary,
        result: status === 'success' ? (call.result ?? 'done') : call.result
      }
    })
  }, 1100)
})
</script>
```
::

## Props

::field-group
  ::field{name="name" type="string"}
  Required. The tool name, rendered in a mono font ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â `search_web`,
  `read_dir`. The font is deliberate: these are identifiers, not prose, and
  setting them in the body face makes them read as English words.
  ::
  ::field{name="status" type="'pending' | 'running' | 'success' | 'error'" default="'pending'"}
  The lifecycle state, and the source of the badge's behaviour.
  ::
  ::field{name="summary" type="string"}
  A short trailing note ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â `"3 files"`, `"1.2s"`. The component does not parse it.
  ::
  ::field{name="defaultOpen" type="boolean" default="false"}
  Start expanded. Leave it `false` for a live transcript: a tool call that opens
  itself steals the reader's attention from the answer it is producing.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the outer wrapper, not the card.
  ::
::

## Slots

::field-group
  ::field{name="args"}
  The arguments, under a small `ARGUMENTS` heading in a monospace, horizontally
  scrollable block.
  ::
  ::field{name="result"}
  The result, under a `RESULT` heading.
  ::
::

Supply neither slot and the card renders without a disclosure ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â there is nothing
to expand, so a chevron leading to an empty panel would be a lie. Supply one or
both and the card becomes expandable. Presence is checked per render rather than
cached, so a slot supplied later still opens the disclosure.

The detail block sets `unmount-on-hide`, so a large tool result is removed from
the DOM when the card closes instead of sitting there invisible.

## Accessibility

- Status is spelled out in an `sr-only` span ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â `Queued`, `Running`, `Done`,
  `Failed` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â in the same place the sighted reader finds the ring. The ring is
  drawn, not announced, and the text carries it instead.
- The SVG badge is `aria-hidden`. It duplicates the status label rather than
  replacing it.
- The ring's colour is never the only signal: pending, running, success and error
  differ in glyph and in behaviour as well as in hue.
- `success` and `error` use green and red ring colours, but the check and cross
  are what distinguish them. Both marks are drawn on stroke, so they stay legible
  against any background the theme provides.
- Under `prefers-reduced-motion: reduce` the ring stops spinning and stops
  breathing, the dash change and the colour change are instant, and the check and
  cross appear fully drawn rather than animating their `pathLength`.
- The trailing cross strokes are staggered by 60ms so they draw as two strokes of
  one mark. That stagger is motion-only and collapses to nothing under reduced
  motion.
- Nuxt UI's `ChatTool` renders the disclosure as a real button with
  `aria-expanded`; that behaviour is inherited rather than reimplemented.

## Performance

- The badge component reads `props.status` inside its render function rather than
  resolving a component per status. Resolving a new component would tear the ring
  down and rebuild it on every tick, which is precisely the popping this design
  exists to avoid.
- `ChatTool` renders its icon through `UIcon`, which resolves a component as well
  as a name, so the ring is handed over directly with no wrapper element.
- The three `ui` overrides undo Nuxt UI's icon choreography rather than adding to
  it: the leading icon is designed to be swapped for a chevron on hover and to be
  absolutely positioned so that swap is free. Here the ring is the permanent
  marker and the chevron already lives on the trailing edge, so the icon keeps
  its own box and its own opacity. Overriding it is cheaper than fighting it.
- The spinning group uses `transformBox: 'view-box'` with an explicit
  `transformOrigin`, because an SVG element's rotation origin is otherwise
  resolved against the page rather than the ring.
- The indefinite rotate and the pending opacity loop need Motion ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â there is no CSS
  equivalent that restarts without a visible jump.
- `isRunning` and `statusLabel` are computeds, so the ring's dash pattern and the
  hidden label are derived from one `status` read.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiToolCall` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `status` | `sr-only` |
| `tool` | `w-full` |
| `detail` | `space-y-2 text-xs` |
| `detailLabel` | `mb-1 text-[10px] uppercase tracking-wide text-muted` |
| `args` | `overflow-x-auto font-mono text-highlighted` |
| `result` | `overflow-x-auto text-highlighted` |
| `label` | `font-mono text-xs font-medium text-highlighted` |
| `leading` | `!size-5` |
| `leadingIcon` | `!static !inset-auto !size-5 !opacity-100` |
