<script setup lang="ts">
import { ref } from 'vue'
import type { AiMessageAction, AiMessagePart, AiMessageRole } from '../../../src/runtime/types/ai'

const LOG = ref<string[]>([])

const log = (entry: string) => {
  LOG.value = [entry, ...LOG.value].slice(0, 6)
}

const voteActions = (role: AiMessageRole): AiMessageAction[] =>
  role === 'user'
    ? []
    : [
        {
          active: false,
          icon: 'i-lucide-thumbs-up',
          key: 'up',
          label: 'Helpful',
          onClick: () => log('voted ▲ up'),
        },
        {
          active: false,
          icon: 'i-lucide-thumbs-down',
          key: 'down',
          label: 'Not helpful',
          onClick: () => log('voted ▼ down'),
        },
        {
          icon: 'i-lucide-refresh-cw',
          key: 'retry',
          label: 'Retry',
          onClick: () => log(`retry requested at ${new Date().toLocaleTimeString()}`),
        },
      ]

const text = (value: string): AiMessagePart[] => [{ type: 'text', text: value }]

const question = 'Which framework should I pick for a component library?'
const answer = 'Vue. The compiler removes the runtime abstraction that React keeps, and the SFCs give you scoped styles without a CSS-in-JS dependency. The cost is that you give up React Native.'
const followUp = 'What about the ecosystem?'
const followUpAnswer = 'Thinner on native, and on the web it is behind React for a handful of libraries — but most of those have Vue equivalents already.'
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiMessage"
      description="A chat turn with an edge-anchored action row. The message is data, not markup: an id, a role, and a list of parts, which is the shape the AI SDK streams."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Hover or tab to a row
        </p>
        <p class="text-muted">
          The actions are always mounted. Mounting them on hover changed the row height, which made every
          message below jump as the pointer travelled down the thread.
        </p>
      </template>

      <div class="space-y-4">
        <MAiMessage
          id="m-1"
          role="user"
          :parts="text(question)"
          :actions="voteActions('user')"
        />

        <MAiMessage
          id="m-2"
          role="assistant"
          :parts="text(answer)"
          :actions="voteActions('assistant')"
        />

        <MAiMessage
          id="m-3"
          role="user"
          :parts="text(followUp)"
        />

        <MAiMessage
          id="m-4"
          role="assistant"
          :parts="text(followUpAnswer)"
          :actions="voteActions('assistant')"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Action sets
        </p>
        <p class="text-muted">
          Copy is on by default and can be turned off with <code>:copyable="false"</code>. Everything else is
          a caller-supplied action, so the row is only as opinionated as you make it.
        </p>
      </template>

      <div class="space-y-4">
        <div class="text-sm text-muted">
          <p>No actions at all — the default copy button only.</p>
          <MAiMessage
            id="m-5"
            role="assistant"
            :parts="text('This turn passes no actions, so its row is the copy button and nothing else.')"
          />
        </div>

        <div class="text-sm text-muted">
          <p>Copy turned off, two custom actions.</p>
          <MAiMessage
            id="m-6"
            role="assistant"
            :parts="text('Copy is off here, so the row is exactly the two actions the caller asked for.')"
            :copyable="false"
            :actions="[
              { icon: 'i-lucide-bookmark', key: 'save', label: 'Save', onClick: () => log('saved') },
              { active: true, icon: 'i-lucide-pin', key: 'pin', label: 'Pinned', onClick: () => log('unpinned') },
            ]"
          />
        </div>

        <div class="text-sm text-muted">
          <p>A user turn, copy only — voting on your own message makes no sense.</p>
          <MAiMessage
            id="m-7"
            role="user"
            :parts="text('Retry on a user turn is up to the caller, not the component.')"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Unbubbled and slotted
        </p>
        <p class="text-muted">
          <code>:bubble="false"</code> is opt-out: an assistant turn that already carries its own surfaces
          should not be wrapped again. The avatar is the <code>leading</code> slot, and the body is
          <code>body</code> — either replaces the parts, so they cannot be used together.
        </p>
      </template>

      <div class="space-y-4">
        <MAiMessage
          id="m-8"
          :bubble="false"
          role="assistant"
          :parts="[]"
        >
          <template #leading>
            <div class="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
              AI
            </div>
          </template>

          <template #body>
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
          </template>
        </MAiMessage>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Actions
        </p>
        <p class="text-muted">
          Each action is data, so the log below is the same <code>onClick</code> the buttons were built from.
        </p>
      </template>

      <div class="space-y-2 font-mono text-sm">
        <p
          v-for="(entry, index) in LOG"
          :key="index"
          class="text-muted"
        >
          {{ entry }}
        </p>
        <p
          v-if="LOG.length === 0"
          class="text-muted"
        >
          nothing yet
        </p>
      </div>
    </UCard>
  </div>
</template>
