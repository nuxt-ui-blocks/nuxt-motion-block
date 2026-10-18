<script setup lang="ts">
import { ref } from 'vue'

type LineKind = 'added' | 'context' | 'removed'

interface DiffLine {
  content: string
  kind: LineKind
  number?: number
}

const PATCH = [
  { content: 'export function resolveConfig(input: Config) {', kind: 'context' as const, number: 12 },
  { content: '  const port = input.port ?? DEFAULT_PORT', kind: 'context' as const, number: 13 },
  { content: '  return { port, host: input.host }', kind: 'removed' as const, number: 14 },
  {
    content: '  const host = input.host ?? DEFAULT_HOST',
    kind: 'added' as const,
    number: 15,
  },
  {
    content: '  const timeout = clamp(input.timeout ?? DEFAULT_TIMEOUT)',
    kind: 'added' as const,
    number: 16,
  },
  { content: '}', kind: 'context' as const, number: 17 },
]

const BOOLEAN_PATCH = [
  { content: 'const features = {', kind: 'context' as const, number: 4 },
  { content: '  streaming: false,', kind: 'removed' as const, number: 5 },
  { content: '  streaming: true,', kind: 'added' as const, number: 5 },
  { content: '  citations: true,', kind: 'context' as const, number: 6 },
  { content: '}', kind: 'context' as const, number: 7 },
]

const lines = ref<DiffLine[]>(PATCH.map(line => ({ ...line })))
const booleanLines = ref<DiffLine[]>(BOOLEAN_PATCH.map(line => ({ ...line })))

const events = ref<string[]>([])
const log = (message: string) => {
  events.value = [message, ...events.value].slice(0, 6)
}

const copyLines = (source: DiffLine[]) =>
  source.map(line => ({ ...line }))

const reset = () => {
  lines.value = copyLines(PATCH)
  log('reset — awaiting a decision again')
}

const resetBoolean = () => {
  booleanLines.value = copyLines(BOOLEAN_PATCH)
  log('boolean patch reset')
}

const seedAccepted = () => {
  lines.value = copyLines(PATCH)
  log('decision="accepted" seeded from props — for a stored transcript')
}
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiDiff"
      description="A proposed edit awaiting a human yes or no"
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Accept, reject, or replay
        </p>
        <p class="text-muted">
          Only the added lines wipe in from the left. Context lines were
          already there, so animating them would misrepresent the change.
          Rejecting collapses the body — a rejected edit should stop occupying
          the page.
        </p>
      </template>

      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <UButton
            color="neutral"
            variant="outline"
            size="sm"
            @click="reset"
          >
            Reset
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="sm"
            @click="seedAccepted"
          >
            Seed accepted
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="sm"
            @click="resetBoolean"
          >
            Reset boolean patch
          </UButton>
        </div>

        <MAiDiff
          :lines="lines"
          :on-accept="() => log('accepted')"
          :on-reject="() => log('rejected')"
          title="src/runtime/config.ts"
        />

        <MAiDiff
          :decision="'rejected'"
          :lines="booleanLines"
          title="seeded as rejected — a stored transcript"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Events
        </p>
        <p class="text-muted">
          The component takes plain <code>onAccept</code> /
          <code>onReject</code> callbacks, so a host wires it either way round.
        </p>
      </template>

      <ul class="space-y-1 text-sm text-muted">
        <li
          v-for="(event, index) in events"
          :key="index"
          class="tabular-nums"
        >
          {{ event }}
        </li>
        <li
          v-if="events.length === 0"
          class="text-muted"
        >
          Nothing yet — accept or reject a diff.
        </li>
      </ul>
    </UCard>
  </div>
</template>
