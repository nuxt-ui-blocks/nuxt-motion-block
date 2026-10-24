---
title: Vector Editor Toolbar
description: A drawing-tool toolbar with variants behind each tool, a travelling active pill, keyboard shortcuts and a draggable floating mode.
---

A toolbar for a canvas or vector editor. Every tool is a mode button; tools
that own variants open a small flyout instead of replacing the tool itself. The
active pill travels between tools with a shared layout animation, so switching
modes reads as one indicator moving rather than two backgrounds swapping.

Variants can be opened with a second click on the active tool, the corner
triangle, or a long press. The tool's icon and label update to the chosen
variant, and the flyout marks it with a check as well as a surface change.
Keyboard users get the same reach: arrow keys move through the toolbar, the
open key expands a tool, and the flyout handles its own arrow keys, `Enter`,
`Space` and `Escape`.

## Usage

Pass `tools` and, optionally, a `defaultTool`. Each tool needs a stable `id`, a
`label` and a UIcon `icon`. Add `items` to a tool when it has variants, and a
`shortcut` when it should respond to a single key. The basic example starts on
the first tool and leaves the selection uncontrolled.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="vector-editor-toolbar-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-5">
    <MVectorEditorToolbar
      :tools="tools"
      aria-label="Illustration tools"
    />

    <div
      class="relative grid h-44 w-full max-w-md place-items-center overflow-hidden rounded-xl border border-dashed border-default bg-elevated/40"
    >
      <div class="absolute inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(127,127,127,0.28)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div class="relative flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-primary">
        <UIcon
          name="i-lucide-pen-tool"
          class="size-4"
        />
        <span class="text-xs font-medium">Draw something</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tools = [
  {
    id: 'select',
    label: 'Select',
    icon: 'i-lucide-mouse-pointer',
    shortcut: 'V',
  },
  {
    id: 'shape',
    label: 'Shape',
    icon: 'i-lucide-square',
    items: [
      { id: 'rectangle', label: 'Rectangle', icon: 'i-lucide-square', shortcut: 'R' },
      { id: 'ellipse', label: 'Ellipse', icon: 'i-lucide-circle', shortcut: 'O' },
      { id: 'polygon', label: 'Polygon', icon: 'i-lucide-triangle', shortcut: 'Y' },
      { id: 'line', label: 'Line', icon: 'i-lucide-minus', shortcut: 'L' },
    ],
  },
  {
    id: 'pen',
    label: 'Pen',
    icon: 'i-lucide-pencil',
    items: [
      { id: 'pen', label: 'Pen', icon: 'i-lucide-pen-tool', shortcut: 'P' },
      { id: 'brush', label: 'Brush', icon: 'i-lucide-paintbrush', shortcut: 'B' },
      { id: 'eraser', label: 'Eraser', icon: 'i-lucide-eraser', shortcut: 'E' },
    ],
  },
  {
    id: 'text',
    label: 'Text',
    icon: 'i-lucide-type',
    shortcut: 'T',
  },
  {
    id: 'hand',
    label: 'Hand',
    icon: 'i-lucide-hand',
    shortcut: 'H',
  },
  {
    id: 'zoom',
    label: 'Zoom',
    icon: 'i-lucide-search',
    shortcut: 'Z',
  },
]
</script>
```
::

A tool without `items` selects immediately. A tool with `items` selects on the
first click, and opens its flyout when clicked again while already active. The
corner triangle and a 450ms pointer press open the same flyout directly. When a
variant is chosen, the parent tool stays active and its icon and label adopt the
variant.

## Customize

Bind `activeTool` to take ownership of the selection, or leave it undefined and
let the toolbar keep its own. `defaultTool` is only read for the uncontrolled
case; it is ignored once `activeTool` is bound. Listen for `update:activeTool`
for a controlled value, or `change` for a single callback that does not need a
binding.

Use `orientation="vertical"` for a side rail, `floating` to pin the toolbar near
the top of the nearest positioned ancestor, and the `properties` slot for
controls that belong to the active tool. Floating mode makes the panel
draggable within that ancestor. Set `:shortcuts-enabled="false"` when several
toolbars share a page or when the surrounding app already owns those keys.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="vector-editor-toolbar-custom" />
  :::
#code
```vue
<template>
  <div
    class="relative h-[460px] w-full overflow-hidden rounded-2xl border border-default bg-elevated/30"
  >
    <div class="absolute inset-0 opacity-70 [background-image:radial-gradient(circle,rgba(127,127,127,0.25)_1px,transparent_1px)] [background-size:20px_20px]" />

    <div class="absolute top-24 left-8 h-28 w-40 rounded-2xl border border-primary/30 bg-primary/10" />
    <div class="absolute top-36 right-10 size-24 rounded-full border-2 border-dashed border-primary/40" />
    <div class="absolute bottom-16 left-1/3 h-20 w-52 rounded-xl border border-default bg-default/70 shadow-sm" />

    <div class="absolute bottom-24 left-12 flex items-center gap-2 text-[11px] font-medium text-muted">
      <UIcon
        name="i-lucide-layers"
        class="size-3.5"
      />
      Frame 01
    </div>

    <MVectorEditorToolbar
      v-model:active-tool="active"
      :tools="tools"
      :shortcuts-enabled="false"
      floating
      orientation="vertical"
      aria-label="Canvas tools"
    >
      <template #properties>
        <div class="w-52 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-highlighted">Selection</span>
            <span class="text-[10px] tracking-wide text-dimmed uppercase">Frame</span>
          </div>
          <div class="grid grid-cols-2 gap-1.5 text-[11px]">
            <div
              v-for="field in fields"
              :key="field.label"
              class="flex items-center justify-between rounded-md bg-muted px-2 py-1"
            >
              <span class="text-muted">{{ field.label }}</span>
              <span class="font-medium text-highlighted">{{ field.value }}</span>
            </div>
          </div>
        </div>
      </template>
    </MVectorEditorToolbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('select')

const fields = [
  { label: 'X', value: '120' },
  { label: 'Y', value: '80' },
  { label: 'W', value: '240' },
  { label: 'H', value: '160' },
]

const tools = [
  {
    id: 'select',
    label: 'Select',
    icon: 'i-lucide-mouse-pointer',
  },
  {
    id: 'shape',
    label: 'Shape',
    icon: 'i-lucide-square',
    items: [
      { id: 'rectangle', label: 'Rectangle', icon: 'i-lucide-square' },
      { id: 'ellipse', label: 'Ellipse', icon: 'i-lucide-circle' },
      { id: 'polygon', label: 'Polygon', icon: 'i-lucide-triangle' },
    ],
  },
  {
    id: 'pen',
    label: 'Pen',
    icon: 'i-lucide-pencil',
    items: [
      { id: 'pen', label: 'Pen', icon: 'i-lucide-pen-tool' },
      { id: 'brush', label: 'Brush', icon: 'i-lucide-paintbrush' },
      { id: 'eraser', label: 'Eraser', icon: 'i-lucide-eraser' },
    ],
  },
  {
    id: 'text',
    label: 'Text',
    icon: 'i-lucide-type',
  },
  {
    id: 'hand',
    label: 'Hand',
    icon: 'i-lucide-hand',
  },
]
</script>
```
::

The floating example uses `v-model:active-tool`, disables global shortcuts and
places a properties panel below the rail. The panel is rendered only when the
slot is present, so an inline toolbar without it stays a single row.

## Props

::component-props
  ::component-prop{name="tools" type="VectorTool[]" required}
  Tools in display order. Each entry needs `id`, `label` and `icon`; add `items`
  for variants and `shortcut` for a single-key binding. `icon` is a UIcon name,
  such as `i-lucide-square`.
  ::
  ::component-prop{name="activeTool" type="string"}
  Controlled active tool or variant id. Leave undefined to let the toolbar own
  the selection.
  ::
  ::component-prop{name="defaultTool" type="string" default="first tool"}
  Tool selected when `activeTool` is not bound. Ignored once `activeTool` is
  provided.
  ::
  ::component-prop{name="orientation" type="'horizontal' | 'vertical'" default="'horizontal'"}
  Toolbar axis. Flyouts open below a horizontal bar and to the right of a
  vertical one.
  ::
  ::component-prop{name="floating" type="boolean" default="false"}
  Positions the toolbar near the top of the nearest positioned ancestor and
  makes it draggable within that box.
  ::
  ::component-prop{name="shortcutsEnabled" type="boolean" default="true"}
  Enables single-key shortcuts on the document. Shortcuts are ignored while an
  input, textarea, select or editable element has focus, and when a modifier
  key is held.
  ::
  ::component-prop{name="ariaLabel" type="string" default="'Vector editor tools'"}
  Accessible name for the toolbar.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the outer wrapper. In floating mode the wrapper is the drag
  boundary, so give the positioned parent enough room for the panel to move.
  ::
::

## Events

::component-props
  ::component-prop{name="update:activeTool" type="(toolId: string) => void"}
  Fired when a tool or variant is selected. Bind it with
  `v-model:active-tool` to control the selection.
  ::
  ::component-prop{name="change" type="(toolId: string) => void"}
  Fired with the same id as `update:activeTool`, for callers that prefer a
  single change handler over a model binding.
  ::
::

## Slots

::component-props
  ::component-prop{name="properties" type="slot"}
  Contextual controls for the active tool, rendered in a panel below the
  toolbar. The slot receives no props; read the selected id from your own
  `activeTool` binding.
  ::
::

## Accessibility

- The panel is a `role="toolbar"` with `aria-orientation` and a configurable
  name. Every tool is a button with `aria-pressed`, so the active mode is
  exposed without relying on colour.
- Tools that own variants expose `aria-expanded` and
  `aria-haspopup="menu"`, plus `aria-controls` while their flyout is open. The
  flyout is a labelled menu of `menuitemradio` options, and the selected item
  carries `aria-checked` plus a check icon.
- The toolbar uses roving `tabindex`: one tool is in the page tab order and the
  arrow keys move focus within the bar. `Home` and `End` jump to the first and
  last tool. The open key is `ArrowDown` on a horizontal bar and `ArrowRight`
  on a vertical one.
- Inside a flyout, `ArrowUp` and `ArrowDown` cycle the variants, `Enter` or
  `Space` chooses one, and `Escape` closes the flyout and returns focus to the
  tool. Opening a flyout moves focus to its first variant.
- Long press is a pointer shortcut, never the only way in. The corner button and
  keyboard both open the same flyout.
- Single-key shortcuts are global only while `shortcutsEnabled` is true; they
  do not fire in editable fields and are ignored with `Ctrl`, `Meta` or `Alt`
  held, so they cannot hijack browser or operating-system commands.

## Performance

- The active pill is one shared-layout element. Switching tools animates its
  position instead of mounting a new indicator per button.
- Flyouts and the properties panel use CSS enter and leave transitions. No
  per-item animation work runs while they are closed, and no flyout is mounted
  until it is opened.
- Reduced motion swaps the layout spring for `SPRING_REDUCED` and removes the
  flyout transitions through a `prefers-reduced-motion` media query.
- A document pointer listener exists only while a flyout is open. The shortcut
  listener returns immediately when shortcuts are disabled or the event comes
  from an editable target.
- Dragging is enabled only in floating mode. The inline toolbar has no drag
  listeners, observers or scroll handlers.
