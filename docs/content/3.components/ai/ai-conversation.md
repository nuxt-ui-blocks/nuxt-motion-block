---
title: AI Conversation
description: A thread that follows the bottom only while you are already there, and offers a way back when you leave.
---

Auto-scroll is the most common way a chat interface becomes unusable. A model
streams an answer, the reader scrolls up to re-read the part that mattered, and
the container drags them back to the bottom on the next token. The intent of that
scroll was explicit - they wanted to read something - and the interface overruled
it.

So this container follows the bottom **only while the reader is already there**.
Scrolling up unpins it. When it is unpinned, a pill appears at the bottom with a
single job: take you back. Nothing moves on its own after that.

It also covers growth that is not a new message: an image finishing loading, a
`details` element opening, a font swapping in. A `ResizeObserver` watches the
children, and `contentKey` is the separate signal for content that grows in place,
like a streamed paragraph.

## Usage

Give the container a height and pass the children. Update `contentKey` whenever
the thread grows - the message count, or the length of the text being streamed -
so the follow knows when to run.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-conversation-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md">
    <MAiConversation
      class="h-80 rounded-xl border border-default bg-default"
      :content-key="messages.length"
    >
      <div class="space-y-3 p-4">
        <div
          v-for="message in messages"
          :key="message.id"
        >
          <p class="text-[10px] font-medium uppercase tracking-wide text-muted">
            {{ message.from }}
          </p>
          <p class="text-sm leading-relaxed text-default">
            {{ message.text }}
          </p>
        </div>
      </div>
    </MAiConversation>

    <div class="mt-2 flex items-center gap-2">
      <UButton
        size="xs"
        @click="add"
      >
        New message
      </UButton>
      <span class="text-xs text-muted">Scroll up, then add one.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
type Turn = { id: number, from: string, text: string }

const seed = [
  ['Agent', 'The audit is done. Every theme token resolves, except two in the sidebar.'],
  ['You', 'Which two?'],
  ['Agent', 'The category icons. They are referenced as `i-lucide-*` names that the icon collection cannot resolve.'],
  ['You', 'Pre-existing?'],
  ['Agent', 'Yes. They are on the components index, not on any page you added.'],
  ['You', 'Then leave them and note it.'],
  ['Agent', 'Noted. The rest of the run is clean: 182 pages, no drifted snippets, no missing examples.'],
  ['You', 'Good. What is left?'],
]

const messages = ref<Turn[]>(
  seed.map(([from, text], index) => ({ id: index, from, text })),
)

let next = seed.length

/**
 * Appending is the only thing that changes `content-key`. If the reader has
 * scrolled up, the component leaves them there and shows the pill.
 */
const add = () => {
  messages.value.push({
    id: next,
    from: next % 2 === 0 ? 'You' : 'Agent',
    text: `Message ${next + 1}. The thread grows, and the container only follows if you are at the bottom.`,
  })
  next += 1
}
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="ai-conversation-custom" />
  :::
#code
  <PlaygroundCode name="AiConversation" />
::

## Props

::component-props
  ::component-prop{name="contentKey" type="string | number"}
  Changes whenever the thread grows - message count, or the length of the text
  being streamed. The follow runs after the DOM has been patched, so it measures
  the thread as it is now rather than one message ago.
  ::
  ::component-prop{name="bottomThreshold" type="number" default="48"}
  How close to the bottom, in pixels, still counts as "at the bottom". Zero
  breaks on fractional scroll heights; a large value keeps yanking the view down
  while someone reads a few lines up.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the outer box. The height belongs here - the component does not
  guess how tall a thread should be.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The thread. Anything scrollable works: `MAiMessage`, plain paragraphs, a list
  of tool calls.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiConversation` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative min-h-0 w-full`. The `min-h-0` is what lets it shrink inside a flex
  column instead of pushing the composer off the page.
  ::
  ::component-slot-row{name="viewport"}
  The scrolling element, `overscroll-contain` so the page behind it does not
  scroll when the thread reaches its end.
  ::
  ::component-slot-row{name="jump"}
  The pill's positioning box, anchored above the bottom edge.
  ::
  ::component-slot-row{name="jumpButton"}
  The `UButton` inside it.
  ::
::

## Accessibility

- The jump pill is a real `UButton` with the same words as its `aria-label`, so
  it is reachable by keyboard and announced as a button.
- The pill only exists while unpinned, so a screen reader is never offered a
  control that would do nothing.
- The viewport stays in the natural tab order, so an unpinned thread can still be
  scrolled with the keyboard without touching the pill.
- Under `prefers-reduced-motion: reduce` the follow and the jump both use
  `behavior: 'auto'`. A smooth scroll of a long thread is exactly the kind of
  motion that triggers discomfort, and it is the whole content of the gesture.
- Nothing announces automatically: growing the thread does not steal focus, and
  the pill appears silently.

## Performance

- The follow is one `scrollTo` per `contentKey` change, not per frame. A stream
  that emits a token per frame still only scrolls once per token, and only while
  pinned.
- The `ResizeObserver` watches children rather than the whole subtree, and the
  mutation observer exists only to re-point it when the list changes.
- `measure()` reads three layout properties and writes one boolean. The scroll
  handler is the only hot path, and it never touches the DOM.
- The pill mounts only while unpinned, so a pinned thread carries no extra node
  and no animation work at all.
