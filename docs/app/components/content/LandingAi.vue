<script setup lang="ts">
type OrbState = 'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'

const faceStates: OrbState[] = ['idle', 'thinking', 'streaming']
const avatarSeeds = ['atlas', 'ember', 'kestrel', 'nimbus']

const toolCalls = [
  { id: 'c-1', name: 'search_code', status: 'success' as const, summary: '12 files', args: '{ "query": "hardcoded colors" }' },
]

const citations = [
  { id: 'c-1', index: 1, title: 'Nuxt UI theming', url: 'https://ui.nuxt.com' },
  { id: 'c-2', index: 2, title: 'Style tokens', url: 'https://nuxt.com/docs' },
]

const sources = [
  { id: 's-1', index: 1, title: 'Nuxt UI theming', url: 'https://ui.nuxt.com' },
  { id: 's-2', index: 2, title: 'Motion for Vue', url: 'https://motion.dev' },
]

const tasks = [
  { id: 't-1', label: 'Read every component source', status: 'done' as const },
  {
    id: 't-2',
    label: 'Tokenize the palette',
    status: 'running' as const,
    children: [
      { id: 't-2a', label: 'colors', note: '18/18', status: 'done' as const },
      { id: 't-2b', label: 'spacing', note: '12/12', status: 'done' as const },
      { id: 't-2c', label: 'typography', note: '7/9', status: 'running' as const },
    ],
  },
  { id: 't-3', label: 'Open the pull request', status: 'pending' as const },
]

const orbFaceColors = {
  body: 'primary',
  bodyEdge: 'color-mix(in oklab, var(--ui-primary), white 78%)',
  feature: 'color-mix(in oklab, var(--ui-primary), black 82%)',
}

const userParts = [{ type: 'text', text: 'Audit the token layer and open a pull request.' }]
const assistantParts = [
  { type: 'reasoning', text: 'Check the blast radius, then pick a safe default.' },
  { type: 'text', text: 'Found 12 hardcoded colors. I can tokenize them without touching your theme.' },
]

const built = [
  'Streaming responses',
  'Reasoning traces',
  'Tool call cards',
  'Task lists',
  'Cited sources',
  'Prompt input',
  'Agent avatars',
  'Expressive orbs',
]
</script>

<template>
  <div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-semibold tracking-tight text-highlighted text-pretty sm:text-4xl">
        AI interfaces, already animated
      </h2>
      <p class="mt-4 text-lg text-muted text-pretty">
        Chat, reasoning, tool calls, and agents, wired to Motion for Vue and styled with your Nuxt UI tokens.
      </p>
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      <div class="rounded-3xl border border-default/70 bg-elevated/30 p-5 sm:p-6">
        <div class="flex items-center gap-3 border-b border-default/70 pb-4">
          <MAgentAvatar
            seed="reviewer"
            :size="28"
          />
          <div class="min-w-0">
            <p class="truncate text-sm font-medium text-highlighted">
              Reviewer
            </p>
            <p class="truncate text-xs text-muted">
              motion-block agent
            </p>
          </div>
          <span class="ml-auto inline-flex items-center gap-1.5 rounded-full border border-default/70 px-2.5 py-1 text-[11px] font-medium text-muted">
            <span class="size-1.5 animate-pulse rounded-full bg-success" />
            thinking
          </span>
        </div>

        <div class="mt-5 space-y-5">
          <div class="rounded-2xl border border-default/70 p-4">
            <MAiMessage
              id="turn-1"
              :parts="userParts"
              role="user"
            />
          </div>

          <MAiReasoning :is-streaming="true">
            Blast radius first: the audit walks every theme token, so landing it cold means a long tail of visual diffs. Better to read the tokens, swap the hardcoded values, then open the pull request.
          </MAiReasoning>

          <MAiToolCall
            v-for="call in toolCalls"
            :key="call.id"
            :name="call.name"
            :status="call.status"
            :summary="call.summary"
          >
            <template #args>
              <pre class="overflow-x-auto text-xs text-muted">{{ call.args }}</pre>
            </template>
          </MAiToolCall>

          <div class="rounded-2xl border border-default/70 p-4">
            <MAiMessage
              id="turn-2"
              :parts="assistantParts"
              role="assistant"
            />
          </div>

          <MAiResponse
            :citations="citations"
            :is-streaming="false"
            text="Found 12 hardcoded colors [1]. I can tokenize them without touching your theme [2]."
          />

          <MAiSources :sources="sources" />

          <MAiPromptInput
            :model-value="''"
            placeholder="Ask the agent to continue…"
          />
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div class="rounded-3xl border border-default/70 bg-elevated/30 p-5 sm:p-6">
          <p class="text-sm font-medium text-highlighted">
            Expressive faces
          </p>
          <div class="mt-4 flex items-center justify-between gap-3">
            <div
              v-for="state in faceStates"
              :key="state"
              class="flex flex-1 flex-col items-center gap-2"
            >
              <MAiOrbFace
                :state="state"
                :size="72"
                :aria-label="state"
                :colors="orbFaceColors"
              />
              <span class="text-[11px] text-muted">{{ state }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-default/70 bg-elevated/30 p-5 sm:p-6">
          <p class="text-sm font-medium text-highlighted">
            Agent avatars
          </p>
          <p class="mt-1 text-xs text-muted">
            One seed, one permanent identity.
          </p>
          <div class="mt-4 flex flex-wrap items-center gap-4">
            <MAgentAvatar
              v-for="seed in avatarSeeds"
              :key="seed"
              :seed="seed"
              :size="52"
              animated
            />
          </div>
        </div>

        <div class="rounded-3xl border border-default/70 bg-elevated/30 p-5 sm:p-6">
          <MAiTaskList
            label="Tokenize the palette"
            :tasks="tasks"
          />
        </div>
      </div>
    </div>

    <div class="mt-10 flex flex-wrap items-center justify-center gap-2">
      <span
        v-for="item in built"
        :key="item"
        class="rounded-full border border-default/70 bg-elevated/30 px-3 py-1.5 text-xs font-medium text-muted"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>
