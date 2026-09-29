<template>
  <div class="space-y-12">
    <UPageHeader
      title="FigmaComment"
      description="Port of smoothui's figma-comment. A comment pin that springs open into a card, animates its avatar, blurs its content in, and closes on outside click."
    />

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          On a canvas
        </p>
      </template>

      <div class="flex flex-col gap-4">
        <p class="text-muted text-sm">
          Click a pin to open it, click the pin again or anywhere outside to
          close. The open card's height comes from measuring the hidden copy, so
          long messages grow the card.
        </p>

        <div class="relative h-96 overflow-hidden rounded-xl border border-default bg-elevated">
          <div
            class="absolute inset-0 opacity-40"
            style="background-image: linear-gradient(var(--ui-border) 1px, transparent 1px), linear-gradient(90deg, var(--ui-border) 1px, transparent 1px); background-size: 24px 24px;"
          />
          <div class="absolute top-8 left-8 h-40 w-56 rounded-lg bg-default shadow-sm" />
          <div class="absolute right-10 bottom-10 h-24 w-40 rounded-lg bg-default shadow-sm" />
          <div class="absolute top-1/2 left-1/2 h-px w-40 -translate-x-1/2 bg-primary/60" />

          <MFigmaComment
            v-for="pin in PINS"
            :key="pin.authorName"
            :style="{ left: `${pin.x}%`, top: `${pin.y}%` }"
            :author-name="pin.authorName"
            :avatar-url="pin.avatarUrl"
            :message="pin.message"
            :timestamp="pin.timestamp"
            :width="width"
            @open-change="onPinChange"
          />
          <span
            v-for="(pin, index) in PINS"
            :key="`hint-${pin.authorName}`"
            class="sr-only"
          >{{ index + 1 }} of {{ PINS.length }} canvas comment pins.</span>
        </div>

        <label class="flex items-center gap-3 text-sm">
          card width
          <input
            v-model.number="width"
            class="accent-primary"
            max="280"
            min="140"
            step="10"
            type="range"
          >
          <code>{{ width }}px</code>
        </label>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          <code>@open-change</code> emissions
        </p>
      </template>

      <p class="mb-3 text-muted text-sm">
        The React reference calls <code>onOpenChange</code> from an effect keyed
        on its internal state, so the first emission arrives on mount with
        <code>false</code>. The log below records every value this component
        emits, which makes the click, the outside-click close and the mount call
        all observable.
      </p>
      <div
        data-demo-log
        class="max-h-40 overflow-y-auto rounded-lg bg-elevated p-3 font-mono text-xs"
      >
        <p
          v-if="log.length === 0"
          class="text-muted"
        >
          no emissions yet
        </p>
        <p
          v-for="entry in log"
          :key="entry.id"
          class="text-muted"
        >
          #{{ entry.id }} → <code>{{ entry.value }}</code>
          <span class="text-dimmed">from {{ entry.source }}</span>
        </p>
      </div>
      <UButton
        class="mt-3"
        size="sm"
        variant="soft"
        @click="log = []"
      >
        Clear log
      </UButton>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Controlled with <code>v-model:open</code>
        </p>
      </template>

      <div class="flex flex-col items-start gap-4">
        <p class="text-muted text-sm">
          <code>defaultOpen</code> renders the card open on mount. The
          <code>open</code> prop makes it controlled: a click or outside click
          then only <em>requests</em> a change through <code>update:open</code>,
          and the card only moves once the parent applies it.
          <code>open-change</code> is the reference's notification and always
          carries the value actually on screen, so it fires again only after the
          parent writes <code>open</code>.
        </p>

        <div class="flex flex-wrap items-start gap-6">
          <div class="flex flex-col items-start gap-2">
            <span class="text-xs text-muted">defaultOpen: true</span>
            <div class="relative h-24 w-72 rounded-xl border border-default bg-elevated">
              <MFigmaComment
                :author-name="'Ana Souza'"
                :message="'Ship it — the empty states read well now.'"
                timestamp="Just now"
                default-open
              />
            </div>
          </div>

          <div class="flex flex-col items-start gap-2">
            <span class="text-xs text-muted">
              controlled: open = {{ controlledOpen }}
            </span>
            <div class="relative h-24 w-72 rounded-xl border border-default bg-elevated">
              <MFigmaComment
                :author-name="'Ravi Patel'"
                :message="'Can we pull the caption up one step?'"
                timestamp="5m ago"
                :open="controlledOpen"
                @open-change="onControlledChange"
                @update:open="controlledOpen = $event"
              />
            </div>
            <UButton
              size="xs"
              variant="soft"
              @click="controlledOpen = !controlledOpen"
            >
              Toggle from the parent
            </UButton>
          </div>

          <div class="flex flex-col items-start gap-2">
            <span class="text-xs text-muted">controlled: open-change log</span>
            <div
              data-demo-controlled-log
              class="h-24 w-56 overflow-y-auto rounded-lg bg-elevated p-2 font-mono text-xs"
            >
              <p
                v-if="controlledLog.length === 0"
                class="text-muted"
              >
                no emissions yet
              </p>
              <p
                v-for="entry in controlledLog"
                :key="entry.id"
                class="text-muted"
              >
                #{{ entry.id }} → <code>{{ entry.value }}</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="font-bold text-2xl text-highlighted">
          Avatar fallback
        </p>
      </template>

      <div class="flex flex-col items-start gap-4">
        <p class="text-muted text-sm">
          The reference takes its defaults from
          <code>somePeople(1, 11)[0]</code>, so a bare
          <code>&lt;FigmaComment /&gt;</code> renders Arjun Mehta's ImageKit
          portrait and his name — the same values the reference shows out of the
          box. Pass an empty <code>avatar-url</code> or a url that fails to load
          and the author initial takes over, which is the path shadcn's
          <code>AvatarFallback</code> takes.
        </p>
        <div class="flex flex-wrap items-end gap-10">
          <div class="relative h-16 w-40 rounded-xl border border-default bg-elevated">
            <MFigmaComment
              avatar-url=""
              author-name="No Avatar"
              message="avatar-url is empty, so the initial shows."
              timestamp="now"
            />
          </div>
          <div class="relative h-16 w-40 rounded-xl border border-default bg-elevated">
            <MFigmaComment
              author-name="Broken Url"
              avatar-url="https://example.invalid/missing.png"
              message="The image 404s, so the initial shows."
              timestamp="now"
            />
          </div>
          <div class="relative h-16 w-40 rounded-xl border border-default bg-elevated">
            <MFigmaComment
              avatar-alt="A very long alternative text for the avatar"
              author-name="With Avatar"
              avatar-url="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              message="A real image is used when it loads."
              timestamp="now"
            />
          </div>
          <div class="relative h-16 w-40 rounded-xl border border-default bg-elevated">
            <MFigmaComment
              message="No props at all — the reference defaults."
              timestamp="Just now"
            />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Pin {
  authorName: string
  avatarUrl: string
  message: string
  timestamp: string
  x: number
  y: number
}

interface LogEntry {
  id: number
  source: string
  value: boolean
}

const PINS: Pin[] = [
  {
    authorName: 'Sarah Chen',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    message: 'Love the palette here. Maybe push the warm tones a little further?',
    timestamp: '2h ago',
    x: 18,
    y: 22,
  },
  {
    authorName: 'Marcus Lee',
    avatarUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
    message: 'The spacing on this row feels off by about 4px. I will nudge the padding.',
    timestamp: '4h ago',
    x: 58,
    y: 58,
  },
  {
    authorName: 'Nina Patel',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    message: 'Ship it!',
    timestamp: '1d ago',
    x: 62,
    y: 16,
  },
]

const width = ref(180)
const controlledOpen = ref(false)
const log = ref<LogEntry[]>([])
const controlledLog = ref<LogEntry[]>([])

let nextId = 0

function onPinChange(value: boolean) {
  nextId += 1
  log.value = [
    { id: nextId, source: 'canvas pin', value },
    ...log.value,
  ]
}

function onControlledChange(value: boolean) {
  nextId += 1
  controlledLog.value = [
    { id: nextId, source: 'controlled', value },
    ...controlledLog.value,
  ]
}
</script>
