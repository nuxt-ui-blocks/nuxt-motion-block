<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiToolCall"
      description="A collapsible call row. The status is a ring that never gets replaced — it changes what it draws inside itself, so the shape stays constant and only its meaning moves. Four statuses, no shared AI state, and no invented props."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Status
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Queued breathes, running spins a gap in the ring, done keeps the ring
        and adds a check, failed keeps the ring and adds a cross. The tool call
        owns its own status because a call that succeeded or failed is not in
        the same conversation as the assistant's next word.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="option in statuses"
          :key="option"
          :label="option"
          :variant="status === option ? 'solid' : 'outline'"
          :data-testid="`status-${option}`"
          @click="status = option"
        />
      </div>

      <div class="space-y-3">
        <MAiToolCall
          name="web.run"
          :status="status"
          summary="Fetching three sources"
          :default-open="open"
          class="max-w-2xl"
        />

        <MAiToolCall
          name="fs.read"
          :status="status"
          class="max-w-2xl"
        />
      </div>

      <p class="mt-6 text-sm text-muted">
        The second call has no summary and no detail, so its header is
        disabled: there is nothing to expand, and a disclosure triangle that
        opens nothing is a lie.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Rows
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        A call in a list, which is what the row is actually for. The ring is
        sized to the text, not to the row, so a two-line name and a one-line
        name line up on the same axis.
      </p>

      <div class="max-w-2xl space-y-2">
        <MAiToolCall
          v-for="call in calls"
          :key="call.name"
          :name="call.name"
          :status="call.status"
          :summary="call.summary"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Opening state
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">defaultOpen</code> seeds the disclosure; the
        row owns its own open state after that. It is not a controlled prop,
        because a tool call is not a form field and forcing its expansion into
        a parent would mean the parent had to track every row it renders.
      </p>

      <UButton
        :label="open ? 'collapsed by default' : 'expanded by default'"
        :variant="open ? 'solid' : 'outline'"
        data-testid="default-open-toggle"
        @click="open = !open"
      />

      <div class="mt-6 max-w-2xl">
        <MAiToolCall
          name="vector.search"
          status="success"
          summary="4 documents, 0.31s"
          :default-open="open"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Arguments and result
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        A call with nothing to expand gets a disabled header, so the two slots
        below are also what makes a row expandable. <code>args</code> renders
        what went in and <code>result</code> what came back; a failing call still
        shows both, because the arguments are usually the interesting half of a
        failure.
      </p>

      <div class="max-w-2xl space-y-2">
        <MAiToolCall
          name="web.run"
          status="success"
          summary="3 results, 1.2s"
          :default-open="open"
        >
          <template #args>
            <pre class="overflow-x-auto font-mono text-xs">{
  "query": "vue rfc teleport",
  "limit": 3
}</pre>
          </template>

          <template #result>
            <pre class="overflow-x-auto font-mono text-xs">[
  { "title": "RFC 0000", "score": 0.91 },
  { "title": "Teleport docs", "score": 0.88 },
  { "title": "Nuxt UI", "score": 0.72 }
]</pre>
          </template>
        </MAiToolCall>

        <MAiToolCall
          name="img.resize"
          status="error"
          summary="Target exceeds 4096px"
          :default-open="open"
        >
          <template #args>
            <pre class="overflow-x-auto font-mono text-xs">{
  "source": "hero.png",
  "width": 6000,
  "height": 6000
}</pre>
          </template>

          <template #result>
            <pre class="overflow-x-auto font-mono text-xs text-error">{
  "code": "DIMENSION_TOO_LARGE",
  "limit": 4096,
  "received": 6000
}</pre>
          </template>
        </MAiToolCall>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { AIToolCallStatus } from '../../../src/runtime/components/AiToolCall.vue'

const statuses: AIToolCallStatus[] = ['pending', 'running', 'success', 'error']
const status = ref<AIToolCallStatus>('running')
const open = ref(true)

const calls: { name: string, status: AIToolCallStatus, summary?: string }[] = [
  { name: 'web.run', status: 'success', summary: 'Fetching three sources' },
  { name: 'fs.read', status: 'running' },
  { name: 'sql.query', status: 'pending', summary: 'Waiting for a connection' },
  { name: 'img.resize', status: 'error', summary: 'Target exceeds 4096px' },
  { name: 'math.eval', status: 'success', summary: '= 0.7071067811865476' },
]
</script>
