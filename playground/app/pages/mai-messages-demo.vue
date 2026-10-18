<script setup lang="ts">
import { ref } from 'vue'
import { getAIChatStatus, type AIState } from '../../../src/runtime/composables/useAiState'
import type { AiMessageAction, AiMessagePart, AiMessageRole, AiUIMessage } from '../../../src/runtime/types/ai'

const states: AIState[] = ['idle', 'listening', 'thinking', 'streaming', 'done', 'error']

const stateMap: { state: AIState, status: string, why: string }[] = [
  { state: 'idle', status: 'ready', why: 'resting, input accepted' },
  { state: 'listening', status: 'ready', why: 'still taking input in' },
  { state: 'thinking', status: 'submitted', why: 'a turn is in flight' },
  { state: 'streaming', status: 'streaming', why: 'tokens are landing' },
  { state: 'done', status: 'ready', why: 'back to a resting surface' },
  { state: 'error', status: 'error', why: 'the turn failed' },
]

const text = (value: string): AiMessagePart[] => [{ type: 'text', text: value }]

const transcript = ref<AiUIMessage[]>([
  {
    id: 'm-1',
    role: 'user',
    parts: text('Why does this wrapper take a six-value state?'),
  },
  {
    id: 'm-2',
    role: 'assistant',
    parts: text('Because chat lists only speak four — ready, submitted, streaming, error — and the interesting states are the two collapses. listening still accepts input, so it stays ready; done has returned to rest, so it does too.'),
  },
  {
    id: 'm-3',
    role: 'user',
    parts: text('So the mapping is one-way?'),
  },
  {
    id: 'm-4',
    role: 'assistant',
    parts: text('Downward only. You set state in this module\'s vocabulary and the computed resolves the chat status once per change — the list never learns that listening and idle were ever distinct.'),
  },
])

const thread: { question: string, answer: string }[] = [
  { question: 'Is the height mine to set?', answer: 'Yes — the wrapper has no fixed height, so a max-height on class is what makes the list scroll at all.' },
  { question: 'What does shouldAutoScroll do?', answer: 'It tracks new content as it lands. It defaults to false so a mount does not yank a reader off their position.' },
  { question: 'And shouldScrollToBottom?', answer: 'Jump to the newest turn when the list mounts. Default true, which is what a fresh conversation wants.' },
  { question: 'When would I raise spacingOffset?', answer: 'When the prompt input sits above the transcript — it buys scroll room at the end so the last turn clears the input.' },
  { question: 'Does compact change anything else?', answer: 'Only the vertical rhythm, passed straight through to the wrapper.' },
  { question: 'Who owns the scroll container?', answer: 'UChatMessages. This component adds no ARIA and no landmarks of its own.' },
]

const longThread = ref<AiUIMessage[]>(
  thread.flatMap(({ question, answer }, index) => [
    { id: `t-${index}-q`, role: 'user' as const, parts: text(question) },
    { id: `t-${index}-a`, role: 'assistant' as const, parts: text(answer) },
  ]),
)

const LOG = ref<string[]>([])

const log = (entry: string) => {
  LOG.value = [entry, ...LOG.value].slice(0, 6)
}

const messageActions = (role: AiMessageRole): AiMessageAction[] =>
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
          onClick: () => log('retry requested'),
        },
      ]

const state = ref<AIState>('idle')
const compact = ref(false)
const autoScroll = ref(false)
const scrollOnMount = ref(true)
const spacingOffset = ref(0)
const replayKey = ref(0)

function replay() {
  replayKey.value++
}
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiMessages"
      description="A transcript of chat turns, with this module's six AI states mapped onto the four chat components actually speak."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Six states
        </p>
        <p class="text-muted">
          You never pick a chat status — you set <code class="font-mono">state</code> in this
          module's vocabulary and the wrapper resolves the status through one computed. The
          avatar rides the <code class="font-mono">leading</code> slot, which receives the turn's
          role.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="option in states"
          :key="option"
          :color="state === option ? 'primary' : 'neutral'"
          :label="option"
          :variant="state === option ? 'solid' : 'outline'"
          size="sm"
          data-testid="state"
          @click="state = option"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="rounded-2xl border border-default">
        <MAiMessages
          :key="`states-${replayKey}`"
          :messages="transcript"
          :state="state"
          class="max-h-72"
          data-testid="states"
        >
          <template #leading="{ role }">
            <MAgentAvatar
              v-if="role !== 'user'"
              :seed="role"
              :size="28"
            />
          </template>
        </MAiMessages>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          state
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-state"
        >
          {{ state }}
        </dd>
        <dt class="text-muted">
          mapped chat status
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-status"
        >
          {{ getAIChatStatus(state) }}
        </dd>
        <dt class="text-muted">
          turns
        </dt>
        <dd class="font-mono">
          {{ transcript.length }}
        </dd>
        <dt class="text-muted">
          status resolution
        </dt>
        <dd class="font-mono">
          computed, once per change
        </dd>
        <dt class="text-muted">
          forwarded slots
        </dt>
        <dd class="font-mono">
          header leading files body content actions default
        </dd>
        <dt class="text-muted">
          wrapper ARIA
        </dt>
        <dd class="font-mono">
          inherited from UChatMessages
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Role defaults and overrides
        </p>
        <p class="text-muted">
          <code class="font-mono">user</code> and <code class="font-mono">assistant</code> are
          spread over this module's defaults — here they swap sides and variants so the merge is
          visible. Omitted keys keep their default.
        </p>
      </template>

      <div class="rounded-2xl border border-default">
        <MAiMessages
          :key="`roles-${replayKey}`"
          :messages="transcript.slice(0, 2)"
          :user="{ side: 'left', variant: 'soft' }"
          :assistant="{ side: 'right', variant: 'solid', color: 'neutral' }"
          class="max-h-72"
          data-testid="roles"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          user default
        </dt>
        <dd class="font-mono">
          { side: 'right', variant: 'solid', color: 'neutral' }
        </dd>
        <dt class="text-muted">
          user override
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-user"
        >
          { side: 'left', variant: 'soft' }
        </dd>
        <dt class="text-muted">
          assistant default
        </dt>
        <dd class="font-mono">
          { side: 'left', variant: 'soft' }
        </dd>
        <dt class="text-muted">
          assistant override
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-assistant"
        >
          { side: 'right', variant: 'solid', color: 'neutral' }
        </dd>
        <dt class="text-muted">
          merge order
        </dt>
        <dd class="font-mono">
          { ...defaults, ...props }
        </dd>
        <dt class="text-muted">
          constants
        </dt>
        <dd class="font-mono">
          as const, so unions survive
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Draw the list yourself
        </p>
        <p class="text-muted">
          A <code class="font-mono">default</code> slot replaces the wrapper's own list rendering.
          Putting <code class="font-mono">MAiMessage</code> inside it is the supported way to get
          the motion-choreographed action row per turn while keeping the wrapper's state, slots
          and scroll behaviour.
        </p>
      </template>

      <div class="rounded-2xl border border-default">
        <MAiMessages
          :key="`custom-${replayKey}`"
          :messages="transcript.slice(0, 2)"
          class="max-h-72"
          data-testid="custom"
        >
          <template #default>
            <div class="space-y-4">
              <MAiMessage
                v-for="message in transcript.slice(0, 2)"
                :id="message.id"
                :key="message.id"
                :parts="message.parts"
                :role="message.role"
                :actions="messageActions(message.role)"
              />
            </div>
          </template>
        </MAiMessages>
      </div>

      <div class="mt-4 space-y-1 rounded-2xl bg-(--ui-bg-muted) p-4 font-mono text-[11px]">
        <p
          v-for="entry in LOG"
          :key="entry"
          class="text-muted"
          data-testid="log-entry"
        >
          {{ entry }}
        </p>
        <p
          v-if="LOG.length === 0"
          class="text-dimmed"
        >
          hover an assistant turn and use its action row
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Scroll behaviour
        </p>
        <p class="text-muted">
          The list has no fixed height of its own — a <code class="font-mono">max-h</code> on the
          wrapper is what makes scrolling happen at all. The three booleans and
          <code class="font-mono">spacingOffset</code> pass straight through to
          <code class="font-mono">UChatMessages</code>.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap items-center gap-2">
        <UButton
          :color="compact ? 'primary' : 'neutral'"
          label="compact"
          :variant="compact ? 'solid' : 'outline'"
          size="sm"
          data-testid="toggle-compact"
          @click="compact = !compact"
        />
        <UButton
          :color="autoScroll ? 'primary' : 'neutral'"
          label="shouldAutoScroll"
          :variant="autoScroll ? 'solid' : 'outline'"
          size="sm"
          data-testid="toggle-autoscroll"
          @click="autoScroll = !autoScroll"
        />
        <UButton
          :color="scrollOnMount ? 'primary' : 'neutral'"
          label="shouldScrollToBottom"
          :variant="scrollOnMount ? 'solid' : 'outline'"
          size="sm"
          data-testid="toggle-scrollmount"
          @click="scrollOnMount = !scrollOnMount"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-scroll"
          @click="replay()"
        />
      </div>

      <div class="rounded-2xl border border-default">
        <MAiMessages
          :key="`scroll-${replayKey}`"
          :messages="longThread"
          :compact="compact"
          :should-auto-scroll="autoScroll"
          :should-scroll-to-bottom="scrollOnMount"
          :spacing-offset="spacingOffset"
          class="max-h-80"
          data-testid="scroll"
        >
          <template #leading="{ role }">
            <MAgentAvatar
              v-if="role !== 'user'"
              :seed="role"
              :size="24"
            />
          </template>
        </MAiMessages>
      </div>

      <UFormField
        class="mt-6"
        label="spacingOffset (px of scroll room at the end)"
        :max="200"
        :min="0"
        :step="8"
      >
        <USlider
          v-model="spacingOffset"
          :max="200"
          :min="0"
          :step="8"
        />
      </UFormField>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          compact
        </dt>
        <dd class="font-mono">
          {{ compact }}
        </dd>
        <dt class="text-muted">
          shouldAutoScroll
        </dt>
        <dd class="font-mono">
          {{ autoScroll }}
        </dd>
        <dt class="text-muted">
          shouldScrollToBottom
        </dt>
        <dd class="font-mono">
          {{ scrollOnMount }}
        </dd>
        <dt class="text-muted">
          spacingOffset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-spacing"
        >
          {{ spacingOffset }}px
        </dd>
        <dt class="text-muted">
          turns loaded
        </dt>
        <dd class="font-mono">
          {{ longThread.length }}
        </dd>
        <dt class="text-muted">
          wrapper height
        </dt>
        <dd class="font-mono">
          max-h-80, set by caller
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          State → status map
        </p>
        <p class="text-muted">
          The whole reason the wrapper exists. The highlighted row is the state selected at the
          top of the page — the mapping runs through
          <code class="font-mono">getAIChatStatus</code> exactly as the component does.
        </p>
      </template>

      <div class="divide-y divide-default">
        <div
          v-for="row in stateMap"
          :key="row.state"
          class="grid grid-cols-3 items-center gap-4 py-2 text-xs"
          :class="row.state === state ? 'bg-(--ui-bg-muted) px-2 font-semibold' : ''"
          :data-testid="`map-${row.state}`"
        >
          <span class="font-mono">{{ row.state }}</span>
          <UIcon
            name="i-lucide-arrow-right"
            class="size-3 text-dimmed"
          />
          <span class="font-mono">{{ row.status }} <span class="text-muted">— {{ row.why }}</span></span>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          current mapping
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mapping"
        >
          {{ state }} → {{ getAIChatStatus(state) }}
        </dd>
        <dt class="text-muted">
          collapses
        </dt>
        <dd class="font-mono">
          listening + done → ready
        </dd>
        <dt class="text-muted">
          announced change
        </dt>
        <dd class="font-mono">
          listening/done announce nothing
        </dd>
        <dt class="text-muted">
          identity
        </dt>
        <dd class="font-mono">
          this wrapper, no ARIA of its own
        </dd>
        <dt class="text-muted">
          hover / actions
        </dt>
        <dd class="font-mono">
          per-turn row lives in MAiMessage
        </dd>
        <dt class="text-muted">
          parts
        </dt>
        <dd class="font-mono">
          { type, state?, text? }
        </dd>
      </dl>
    </UCard>
  </div>
</template>
