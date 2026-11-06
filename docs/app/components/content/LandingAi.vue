<script setup lang="ts">
type OrbState = 'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'

const faceStates: OrbState[] = ['idle', 'thinking', 'streaming']
const avatarSeeds = ['atlas', 'ember', 'kestrel', 'nimbus']

const capabilities = [
  { index: '01', title: 'Streaming responses', detail: 'Tokens arrive as motion, not jumps.' },
  { index: '02', title: 'Reasoning traces', detail: 'Reveal the thinking, not just the answer.' },
  { index: '03', title: 'Tool call cards', detail: 'Structured calls with live status.' },
]

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
  body: '#f06a3c',
  bodyEdge: 'color-mix(in oklab, #f06a3c, white 78%)',
  feature: 'color-mix(in oklab, #f06a3c, black 82%)',
}

const userParts = [{ type: 'text', text: 'Audit the token layer and open a pull request.' }]
const assistantParts = [
  { type: 'reasoning', text: 'Check the blast radius, then pick a safe default.' },
  { type: 'text', text: 'Found 12 hardcoded colors. I can tokenize them without touching your theme.' },
]
</script>

<template>
  <section
    id="agent-layer"
    class="relative isolate overflow-hidden border-y border-line bg-elevated/40"
  >
    <div class="mb-shell relative py-20 sm:py-24 lg:py-28">
      <div class="flex items-center justify-between gap-6">
        <div class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dimmed">
          <span class="text-primary">02</span>
          <span
            aria-hidden="true"
            class="h-px w-8 bg-primary/50"
          />
          The agent layer
        </div>
        <NuxtLink
          to="/components"
          class="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-dimmed transition hover:text-highlighted sm:inline-flex"
        >
          All 292 components →
        </NuxtLink>
      </div>

      <div class="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-4">
          <h2 class="display-tight font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-semibold leading-[1.0] text-highlighted">
            Agents,<br>
            already<br>
            animated.
          </h2>
          <p class="mt-6 max-w-sm text-lg leading-relaxed text-muted text-pretty">
            Chat, reasoning, tool calls and cited sources — wired to Motion for Vue
            and styled with your Nuxt UI tokens.
          </p>

          <ol class="mt-10 divide-y divide-line border-t border-line">
            <li
              v-for="cap in capabilities"
              :key="cap.index"
              class="flex items-baseline gap-5 py-4"
            >
              <span class="font-mono text-[11px] tabular-nums text-primary">{{ cap.index }}</span>
              <div>
                <p class="text-base font-medium leading-snug text-highlighted">
                  {{ cap.title }}
                </p>
                <p class="mt-1 text-sm leading-snug text-muted">
                  {{ cap.detail }}
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div class="lg:col-span-8">
          <div class="dark rounded-lg border border-black/30 bg-[#141412] p-4 text-[#e8e6dd] shadow-[0_32px_64px_-24px_rgb(20_20_18/0.35)] sm:p-6 dark:border-white/10">
            <div class="flex items-center gap-3 border-b border-white/10 pb-4">
              <MAgentAvatar
                seed="reviewer"
                :size="28"
              />
              <div class="min-w-0">
                <p class="truncate text-sm font-medium text-[#f4f1ea]">
                  Reviewer
                </p>
                <p class="truncate text-xs text-[#a9a79e]">
                  motion-block agent
                </p>
              </div>
              <span class="ml-auto inline-flex items-center gap-1.5 rounded-sm border border-[#f06a3c]/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#f4783e]">
                <span class="size-1.5 animate-pulse rounded-full bg-[#f06a3c]" />
                thinking
              </span>
            </div>

            <div class="mt-5 grid gap-4 xl:grid-cols-[1fr_220px]">
              <div class="min-w-0 space-y-4">
                <div class="rounded-md border border-white/10 p-4">
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

                <div class="rounded-md border border-white/10 p-4">
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

              <div class="flex flex-col gap-4">
                <div class="rounded-md border border-white/10 p-4">
                  <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a9a79e]">
                    Expressive faces
                  </p>
                  <div class="mt-3 flex items-center justify-between gap-2">
                    <div
                      v-for="state in faceStates"
                      :key="state"
                      class="flex flex-1 flex-col items-center gap-1.5"
                    >
                      <MAiOrbFaceMouth
                        :state="state"
                        :size="54"
                        :painted="true"
                        :aria-label="`Assistant, ${state}`"
                        :colors="orbFaceColors"
                      />
                      <span class="font-mono text-[9px] uppercase tracking-[0.14em] text-[#a9a79e]">{{ state }}</span>
                    </div>
                  </div>
                </div>

                <div class="rounded-md border border-white/10 p-4">
                  <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a9a79e]">
                    Agent avatars
                  </p>
                  <div class="mt-3 flex flex-wrap items-center gap-3">
                    <MAgentAvatar
                      v-for="seed in avatarSeeds"
                      :key="seed"
                      :seed="seed"
                      :size="44"
                      animated
                    />
                  </div>
                  <p class="mt-3 text-[11px] leading-snug text-[#8a887f]">
                    One seed, one permanent identity.
                  </p>
                </div>

                <div class="rounded-md border border-white/10 p-4">
                  <MAiTaskList
                    label="Tokenize the palette"
                    :tasks="tasks"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
