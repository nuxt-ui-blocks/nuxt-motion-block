---
title: File Tree
description: A keyboard-friendly file browser whose folders unfold with an animated height and a rotating chevron.
---

A file browser rendered as a real ARIA tree. Opening a folder animates its
wrapper from the measured `scrollHeight` to `0` and back, while the chevron
rotates 90° on a small spring. The subtree stays mounted while collapsed so the
height has something to measure; `inert` and `aria-hidden` keep those rows out
of the tab order and the accessibility tree in the meantime.

Rows come from flattening the visible nodes every time the expansion changes,
and that flat list is what keyboard navigation walks: ArrowDown and ArrowUp move
between visible rows, ArrowRight opens a folder or steps into it, ArrowLeft
closes it or climbs to the parent, Home and End jump to the edges, and typing a
letter cycles through names that start with it.

## Usage

Pass recursive `items`. Each node needs a unique `id`, a `name` and a `type`;
folders take `children`. Seed the open folders with `default-expanded` and turn
on `show-lines` for guide rails between levels. Rows are selected on click, and
a folder click also toggles it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="file-tree-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center py-6">
    <MFileTree
      :items="items"
      :default-expanded="['src', 'src/components']"
      show-lines
      class="w-full max-w-sm rounded-lg border border-default bg-default p-3"
    />
  </div>
</template>

<script setup lang="ts">
interface TreeItem {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: TreeItem[]
  badge?: string
}

const items: TreeItem[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: 'src/components',
        name: 'components',
        type: 'folder',
        children: [
          { id: 'src/components/button', name: 'Button.vue', type: 'file' },
          { id: 'src/components/card', name: 'Card.vue', type: 'file' },
          {
            id: 'src/components/file-tree',
            name: 'FileTree.vue',
            type: 'file',
            badge: 'modified',
          },
        ],
      },
      { id: 'src/app', name: 'App.vue', type: 'file' },
      { id: 'src/main', name: 'main.ts', type: 'file' },
    ],
  },
  {
    id: 'docs',
    name: 'docs',
    type: 'folder',
    children: [
      { id: 'docs/readme', name: 'README.md', type: 'file' },
    ],
  },
  { id: 'package', name: 'package.json', type: 'file' },
]
</script>
```
::

## Customize

`expanded` and `selected` are both optional. Bind them and the parent owns the
state; leave them off and the tree keeps its own copy. `update:expanded` and
`update:selected` fire in either case, so the panel below can mirror clicks and
keyboard toggles without reaching into the tree. `indent` is the number of pixels
added per level, and `show-lines` draws a one-pixel guide down each open group.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="file-tree-custom" />
  :::
#code
  <PlaygroundCode name="FileTree" />
::

## Props

::component-props
  ::component-prop{name="items" type="FileTreeItem[]" required}
  Recursive tree data. A node is `{ id, name, type, children?, icon?, badge? }`,
  where `type` is `'file'` or `'folder'`. `id` must be unique across the whole
  tree: it keys expansion, selection and row focus.
  ::
  ::component-prop{name="expanded" type="string[]"}
  Controlled list of open folder ids. Leave it out to let the component keep its
  own list, seeded from `defaultExpanded`.
  ::
  ::component-prop{name="defaultExpanded" type="string[]" default="[]"}
  Folder ids open on first render when `expanded` is not bound. Later changes to
  this prop are ignored, like any other default.
  ::
  ::component-prop{name="selected" type="string"}
  Controlled id of the selected row. Leave it out to let clicks and keys set the
  selection internally.
  ::
  ::component-prop{name="indent" type="number" default="16"}
  Horizontal indent per level, in pixels. It also spaces the guide line inside
  each open group.
  ::
  ::component-prop{name="showLines" type="boolean" default="false"}
  Draw a vertical guide down the left edge of every open subtree.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root element.
  ::
  ::component-prop{name="ui" type="Record<string, any>"}
  Per-slot classes merged over the theme defaults. See [UI](#ui) for the slot
  list.
  ::
::

## Events

::component-events
  ::component-event{name="update:expanded" type="(expanded: string[]) => void"}
  The next list of open folder ids, emitted on click, Enter, Space, ArrowRight
  and ArrowLeft. Emitted only when the list actually changes.
  ::
  ::component-event{name="update:selected" type="(id: string) => void"}
  The id of the row that was clicked, or activated with Enter or Space. Clicking
  a folder emits this as well as `update:expanded`, because selecting and
  toggling are separate gestures.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.fileTree` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  The `role="tree"` wrapper.
  ::
  ::component-slot-row{name="row"}
  One `role="treeitem"` row. Receives `selected` as a variant.
  ::
  ::component-slot-row{name="chevronBox"}
  The fixed-size box that reserves room for the chevron.
  ::
  ::component-slot-row{name="chevron"}
  The rotating chevron itself.
  ::
  ::component-slot-row{name="icon"}
  The folder or file glyph.
  ::
  ::component-slot-row{name="label"}
  The node name. Receives `selected` as a variant.
  ::
  ::component-slot-row{name="badge"}
  Optional trailing text, such as a size or a status.
  ::
  ::component-slot-row{name="group"}
  The `role="group"` container inside a subtree. Receives `lines` as a variant.
  ::
::

## Accessibility

- The root is `role="tree"`, every row is `role="treeitem"` with `aria-level`,
  and every open subtree is a `role="group"`. Folders expose `aria-expanded`;
  files omit it. Selection is mirrored with `aria-selected`.
- Focus is roving: exactly one row has `tabindex="0"` — the focused row, or the
  selected row, or the first visible row — and the rest sit at `-1`. Tab enters
  and leaves the tree once instead of stepping through every file.
- Arrow keys move between *visible* rows, so a collapsed folder's children are
  never focused. ArrowRight opens a closed folder or moves to its first child;
  ArrowLeft closes an open folder or moves to its parent. Home and End jump to
  the first and last visible rows.
- Enter and Space select the focused row. Typing a letter jumps to the next
  visible name starting with it, wrapping around the list.
- A collapsed subtree stays in the DOM for its height animation but is marked
  `inert` and `aria-hidden`, so its rows cannot be tabbed to or announced.
- Rows carry a `focus-visible` ring in the theme, so keyboard focus is visible
  without adding a second hover style.
- Under `prefers-reduced-motion` the chevron and the subtree transition collapse
  to `{ duration: 0 }`. The open state still commits immediately; only the
  rotation and the unfold are removed.

## Performance

- The visible rows are flattened in one `computed` keyed on `items` and the
  expanded set. A second map from id to index makes every key press an O(1)
  lookup instead of a scan.
- Heights are measured only when a folder's open state changes. Once an open
  subtree finishes animating it rests at `height: auto`, so later content
  changes do not trigger another measurement pass.
- Only the chevron and the subtree wrapper are motion components. Row markup
  stays static, and the animation writes `height` and `transform` without
  re-rendering the tree.
- There is no `ResizeObserver`, no scroll listener and no `requestAnimationFrame`
  loop. Indentation and guide offsets are plain inline styles computed from the
  node's level.
- Collapsed subtrees remain mounted by necessity, which trades a little DOM for
  a height that can be measured and animated. Their rows are `inert`, so the
  hidden cost does not extend to the tab order or the accessibility tree.
