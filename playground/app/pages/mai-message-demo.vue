<script setup lang="ts">
import { ref } from 'vue'

const RETRY_LOG = ref<string[]>([])
const VOTE_LOG = ref<string | null>(null)

const logRetry = () => {
  RETRY_LOG.value = [`retry requested at ${new Date().toLocaleTimeString()}`, ...RETRY_LOG.value]
}

const logVote = (vote: 'up' | 'down') => {
  VOTE_LOG.value = `voted ${vote === 'up' ? '▲ up' : '▼ down'}`
  setTimeout(() => {
    VOTE_LOG.value = null
  }, 2000)
}
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiMessage"
      description="A chat turn with an edge-anchored action row. Upstream this component uses no animation library at all — the reveal is a stylesheet."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Hover or tab to a row
        </p>
        <p class="text-muted">
          The actions are always mounted. Mounting them on hover changed the row height, which made every
          message below jump as the pointer travelled down the thread. The timestamp sits first in the row
          so it stays pinned to the edge the bubble is anchored to.
        </p>
      </template>

      <div class="space-y-4">
        <MAiMessage
          from="user"
          copy-text="Which framework should I pick for a component library?"
          timestamp="09:41"
          @retry="logRetry"
          @vote="logVote"
        >
          Which framework should I pick for a component library?
        </MAiMessage>

        <MAiMessage
          from="assistant"
          copy-text="Vue. The compiler removes the runtime abstraction that React keeps, and the SFCs give you
          scoped styles without a CSS-in-JS dependency. The cost is that you give up React Native."
          timestamp="09:41"
          @retry="logRetry"
          @vote="logVote"
        >
          Vue. The compiler removes the runtime abstraction that React keeps, and the SFCs give you scoped
          styles without a CSS-in-JS dependency. The cost is that you give up React Native.
        </MAiMessage>

        <MAiMessage
          from="user"
          copy-text="What about the ecosystem?"
          timestamp="09:42"
        >
          What about the ecosystem?
        </MAiMessage>

        <MAiMessage
          from="assistant"
          copy-text="Thinner on native, and on the web it is behind React for a handful of libraries — but most
          of those have Vue equivalents already."
          timestamp="09:42"
          @retry="logRetry"
          @vote="logVote"
        >
          Thinner on native, and on the web it is behind React for a handful of libraries — but most of those
          have Vue equivalents already.
        </MAiMessage>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Action sets
        </p>
        <p class="text-muted">
          Copy appears only when <code>copy-text</code> is set. Retry appears only when
          <code>on-retry</code> is passed. Vote appears only for assistant turns, and only when
          <code>on-vote</code> is passed — voting on your own message makes no sense.
        </p>
      </template>

      <div class="space-y-4">
        <div class="text-sm text-muted">
          <p>No handlers at all — timestamp only.</p>
          <MAiMessage
            from="assistant"
            timestamp="10:03"
          >
            This row has no copy text and no handlers, so its action row is empty by design.
          </MAiMessage>
        </div>

        <div class="text-sm text-muted">
          <p>Copy only.</p>
          <MAiMessage
            from="assistant"
            copy-text="Copy only"
            timestamp="10:04"
          >
            Copy only.
          </MAiMessage>
        </div>

        <div class="text-sm text-muted">
          <p>User turn with retry — note there is no vote pair.</p>
          <MAiMessage
            from="user"
            copy-text="Retry on a user turn"
            timestamp="10:05"
            @retry="logRetry"
          >
            Retry on a user turn.
          </MAiMessage>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Unbubbled and slotted
        </p>
        <p class="text-muted">
          <code>bubble</code> is opt-out: an assistant turn that already carries its own surfaces should not
          be wrapped again. The avatar is a slot, not a component.
        </p>
      </template>

      <div class="space-y-4">
        <MAiMessage
          :bubble="false"
          from="assistant"
          timestamp="10:10"
        >
          <template #avatar>
            <div class="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
              AI
            </div>
          </template>

          <div class="space-y-2">
            <p class="text-muted text-xs">
              I checked three sources.
            </p>
            <div class="rounded-lg border border-default p-3 text-sm">
              Unbubbled, so a stack of surfaces here reads as a list rather than a box inside a box.
            </div>
            <div class="rounded-lg border border-default p-3 text-sm">
              A second surface, to show they stack cleanly without a bubble around them.
            </div>
          </div>
        </MAiMessage>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Emitted events
        </p>
        <p class="text-muted">
          The buttons above emit <code>retry</code> and <code>vote</code>.
        </p>
      </template>

      <div class="space-y-2 font-mono text-sm">
        <p
          v-if="VOTE_LOG"
          class="text-primary"
        >
          {{ VOTE_LOG }}
        </p>
        <p
          v-for="(entry, index) in RETRY_LOG"
          :key="index"
          class="text-muted"
        >
          {{ entry }}
        </p>
        <p
          v-if="!VOTE_LOG && RETRY_LOG.length === 0"
          class="text-muted"
        >
          nothing yet
        </p>
      </div>
    </UCard>
  </div>
</template>
