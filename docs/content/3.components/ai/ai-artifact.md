---
title: AI Artifact
description: A generated artifact whose preview and source swap along a shared axis instead of cross-fading.
---

An artifact is a small window into something the model made: a component, a
config, a chart, a file. It has two faces - the rendered result and the raw
source - and the reader moves between them constantly while deciding whether to
trust it.

The panes slide along a horizontal axis. A cross-fade would read as a different
artifact appearing in the same frame; a slide keeps the identity intact, because
the thing moving is clearly the same thing. The direction follows the order of
the tabs, so going back and forth does not flip the motion and confuse the eye.

When there is only one pane there is no tablist at all: a single tab announces a
choice that does not exist. The header keeps the title and the copy action, and
the copy action takes the space the tabs would have used.

## Usage

Pass `title`, and fill either slot or both. `copyText` is what lands on the
clipboard - it is deliberately separate from the `code` slot, because the
rendered code has syntax spans and the clipboard should not.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-artifact-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md">
    <MAiArtifact
      title="PricingCard.tsx"
      :copy-text="snippet"
    >
      <template #preview>
        <div class="rounded-lg border border-default bg-muted/40 p-4">
          <p class="text-sm font-medium text-highlighted">
            Pro
          </p>
          <p class="mt-1 text-2xl font-semibold text-highlighted">
            $24<span class="text-sm font-normal text-muted">/mo</span>
          </p>
          <p class="mt-2 text-xs leading-relaxed text-muted">
            Unlimited blocks, every theme, and priority support.
          </p>
        </div>
      </template>

      <template #code>
        {{ snippet }}
      </template>
    </MAiArtifact>
  </div>
</template>

<script setup lang="ts">
const snippet = `<PricingCard
  name="Pro"
  price={24}
  features={['Unlimited blocks']}
/>`
</script>
```
::

## Customize

Start on the source pane and the component still knows which way the preview
sits, so the first swap slides backwards. Both panes are ordinary slots, so the
rendered side can be anything from a chart to a diff.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-artifact-custom" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md">
    <MAiArtifact
      default-pane="code"
      title="theme.json"
      :copy-text="json"
    >
      <template #preview>
        <ul class="space-y-2 p-1">
          <li
            v-for="token in tokens"
            :key="token.name"
            class="flex items-center gap-2 text-xs"
          >
            <span
              class="size-4 rounded-full border border-default"
              :style="{ background: token.value }"
            />
            <span class="text-highlighted">{{ token.name }}</span>
            <span class="ml-auto font-mono text-muted">{{ token.value }}</span>
          </li>
        </ul>
      </template>

      <template #code>
        {{ json }}
      </template>
    </MAiArtifact>
  </div>
</template>

<script setup lang="ts">
const tokens = [
  { name: 'primary', value: 'oklch(0.62 0.19 259)' },
  { name: 'success', value: 'oklch(0.72 0.17 152)' },
  { name: 'warning', value: 'oklch(0.8 0.16 84)' },
  { name: 'error', value: 'oklch(0.64 0.21 25)' },
]

const json = JSON.stringify(
  Object.fromEntries(tokens.map(token => [token.name, token.value])),
  null,
  2,
)
</script>
```
::

## Props

::component-props
  ::component-prop{name="title" type="string"}
  Required. The filename or the artifact's name, truncated with an ellipsis when
  it does not fit. This is how the next message will refer to the thing.
  ::
  ::component-prop{name="defaultPane" type="'preview' | 'code'" default="'preview'"}
  Which pane to start on. Ignored once `pane` is bound.
  ::
  ::component-prop{name="pane" type="'preview' | 'code'"}
  Controlled pane, for driving the view from outside, e.g. `v-model:pane`. Leave
  it undefined and the component owns the state.
  ::
  ::component-prop{name="copyText" type="string"}
  Plain text handed to the clipboard. Omit it to hide the copy action entirely -
  an artifact whose source is not text should not offer one.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the frame, not the header.
  ::
::

## Events

::component-events
  ::component-event{name="update:pane" payload="[pane: AiArtifactPane]"}
  The pane changed, by press or by arrow key. Emitted whether or not `pane` is
  bound.
  ::
  ::component-event{name="copy" payload="[text: string]"}
  The copy action succeeded. Fired after the clipboard write resolves, so it is
  safe to use as an analytics signal.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="preview"}
  The rendered form.
  ::
  ::component-slot-row{name="code"}
  The source, rendered inside a `pre` with `font-mono`. Plain text - if you need
  syntax highlighting, pass the highlighted markup and the component will keep
  its spacing.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiArtifact` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  The frame: one border, one radius, `overflow-hidden` so the panes are clipped
  on the axis.
  ::
  ::component-slot-row{name="header"}
  Title, tabs and copy action on one line.
  ::
  ::component-slot-row{name="title"}
  ::
  ::component-slot-row{name="tabs"}
  The tablist track, `bg-muted` with a half-pixel of padding.
  ::
  ::component-slot-row{name="tab"}
  One tab. The `active` variant raises its text contrast.
  ::
  ::component-slot-row{name="indicator"}
  The shared element that slides between tabs, keyed per instance so two
  artifacts on a page do not borrow each other's pill.
  ::
  ::component-slot-row{name="tabLabel"}
  `relative`, so the label sits above the indicator rather than under it.
  ::
  ::component-slot-row{name="copy"}
  The `UButton`. The `copied` variant swaps it to the success hue, and `lonely`
  gives it the right-hand space when there are no tabs.
  ::
  ::component-slot-row{name="body"}
  The clipping region for the swap.
  ::
  ::component-slot-row{name="pane"}
  One animating pane, and the `tabpanel` element when tabs exist.
  ::
  ::component-slot-row{name="preview"}
  ::
  ::component-slot-row{name="code"}
  The `pre` itself - padding, monospace and horizontal scroll.
  ::
::

## Accessibility

- The tabs are a proper `tablist` / `tab` / `tabpanel` triple, wired together
  with `aria-controls` and `aria-labelledby` in both directions.
- Arrow keys move between tabs, Home and End jump to the ends, and the selected
  tab is the only one in the tab order. That is the WAI-ARIA tabs pattern, not a
  pair of buttons that look like tabs.
- The copy action is a real button with an `aria-label` that flips to "Copied to
  clipboard", and a `role="status"` region announces the same words. The icon
  swap alone would be invisible to a screen reader.
- Panes are labelled by their tab, so entering the panel announces which view it
  is.
- Under `prefers-reduced-motion: reduce` the panes and the indicator change
  instantly. The horizontal travel is the one motion in the component, and it is
  exactly the kind that causes discomfort.

## Performance

- Only one pane is mounted; `AnimatePresence` in `wait` mode finishes the exit
  before the next entry starts, so the two are never composited together.
- The direction is latched in a watcher rather than derived during render, so the
  entering and exiting panes cannot disagree about which way they are moving.
- The indicator is a single shared element with a `layoutId`, so moving it is one
  transform rather than a background transition on every tab.
- The copied flag resets on a single timer that is cleared on unmount; nothing
  polls, and a second copy restarts the same timer instead of stacking another.
