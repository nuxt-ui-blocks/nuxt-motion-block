<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

type Tab = 'pnpm' | 'npm' | 'yarn' | 'bun' | 'agents'
type Variant = 'nuxt' | 'vue'

interface CommandTab {
  id: 'pnpm' | 'npm' | 'yarn' | 'bun'
  label: string
  kind: 'command'
  run: (pkg: string) => string
}

interface PromptTab {
  id: 'agents'
  label: string
  kind: 'prompt'
}

const props = withDefaults(defineProps<{
  package?: string
  packages?: string
  label?: string
  variant?: Variant
}>(), {
  package: undefined,
  packages: undefined,
  label: undefined,
  variant: 'nuxt',
})

const VARIANTS: Record<Variant, { packages: string, agents: string[] }> = {
  nuxt: {
    packages: 'nuxt-motion-block',
    agents: [
      `Add Nuxt Motion Block to this Nuxt 4 project.`,
      `1. Run \`npx nuxi module add nuxt-motion-block\`.`,
      `2. Register the modules in \`nuxt.config.ts\`: \`modules: ['@nuxt/ui', 'motion-v/nuxt', 'nuxt-motion-block']\`.`,
      `3. Pin \`@nuxt/ui >= 4.11.2\` and \`motion-v >= 2.4.4\`.`,
      `4. Components are auto-imported with an M prefix (\`<MAnimatedBackground>\`, \`<MTextGlitch>\`).`,
      `5. Before using a component, read its page with the \`list-pages\` / \`get-page\` tools from the \`nuxt-motion-block\` MCP server (\`npx nuxt-motion-block-mcp\`), or at \`https://nuxt-motion-block.pages.dev/raw/components/<category>/<name>.md\`. Do not guess its props, events or slots.`,
    ],
  },
  vue: {
    packages: 'nuxt-motion-block @nuxt/ui motion-v',
    agents: [
      `Add Nuxt Motion Block to this Vue app (works for Laravel, AdonisJS and plain Vite too).`,
      `1. Run \`pnpm add nuxt-motion-block @nuxt/ui motion-v tailwindcss\`.`,
      `2. Add \`ui()\` from \`@nuxt/ui/vite\` to \`vite.config.ts\` and register the plugins in your entry: \`app.use(ui).use(motionBlock)\`.`,
      `3. Pin \`@nuxt/ui >= 4.11.2\` and \`motion-v >= 2.4.4\`.`,
      `4. All components are globally registered with an M prefix (\`<MAnimatedBackground>\`, \`<MTextGlitch>\`). For \`ui.<name>\` slot overrides matching Nuxt UI, pass \`ui\` to the plugin: \`app.use(motionBlock, { ui })\`.`,
      `5. Before using a component, read its page with the \`list-pages\` / \`get-page\` tools from the \`nuxt-motion-block\` MCP server (\`npx nuxt-motion-block-mcp\`), or at \`https://nuxt-motion-block.pages.dev/raw/components/<category>/<name>.md\`. Do not guess its props, events or slots.`,
    ],
  },
}

const activeVariant = computed(() => VARIANTS[props.variant])
const packages = computed(() => props.packages ?? props.package ?? activeVariant.value.packages)

const agentsPrompt = computed(() => activeVariant.value.agents.join('\n'))

const tabs: (CommandTab | PromptTab)[] = [
  { id: 'pnpm', label: 'pnpm', kind: 'command', run: pkg => `pnpm add ${pkg}` },
  { id: 'npm', label: 'npm', kind: 'command', run: pkg => `npm install ${pkg}` },
  { id: 'yarn', label: 'yarn', kind: 'command', run: pkg => `yarn add ${pkg}` },
  { id: 'bun', label: 'bun', kind: 'command', run: pkg => `bun add ${pkg}` },
  { id: 'agents', label: 'Agents', kind: 'prompt' },
]

const STORAGE_KEY = 'motion-block:package-manager'

const tab = useState<Tab>('package-manager', () => 'pnpm')

const active = computed(() => tabs.find(t => t.id === tab.value)!)

const command = computed(() =>
  active.value.kind === 'command'
    ? (active.value as CommandTab).run(packages.value)
    : '',
)

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && tabs.some(t => t.id === stored)) {
    tab.value = stored as Tab
  }
})

watch(tab, (value) => {
  if (import.meta.client) {
    window.localStorage.setItem(STORAGE_KEY, value)
  }
})

async function copy() {
  try {
    await navigator.clipboard.writeText(active.value.kind === 'prompt' ? agentsPrompt.value : command.value)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, 1800)
  }
  catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md overflow-hidden rounded-md border border-black/20 bg-[#141412] text-[#f4f1ea] shadow-[0_16px_40px_-16px_rgb(0_0_0/0.45)] dark:border-white/10">
    <div
      class="flex items-center gap-1 border-b border-white/10 px-3 pt-2 pb-0"
      role="tablist"
      :aria-label="label ?? 'Install Nuxt Motion Block'"
    >
      <button
        v-for="item in tabs"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="tab === item.id"
        class="relative px-2 pb-2.5 pt-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-150"
        :class="tab === item.id
          ? 'text-[#f4f1ea]'
          : 'text-[#8a887f] hover:text-[#c9c7bd]'"
        @click="tab = item.id"
      >
        {{ item.label }}
        <span
          v-if="tab === item.id"
          aria-hidden="true"
          class="absolute inset-x-2 bottom-[-1px] h-[2px] bg-[#f06a3c]"
        />
      </button>
    </div>

    <div
      v-if="active.kind === 'command'"
      class="flex items-center gap-3 px-4 py-3"
    >
      <span
        aria-hidden="true"
        class="select-none font-mono text-xs text-[#f06a3c]"
      >$</span>
      <code class="min-w-0 flex-1 truncate font-mono text-xs text-[#e8e6dd]">
        {{ command }}
      </code>
      <button
        type="button"
        class="inline-flex shrink-0 items-center gap-1.5 rounded-sm px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#a9a79e] transition-colors duration-150 hover:bg-white/5 hover:text-[#f4f1ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f06a3c]"
        :aria-label="copied ? 'Copied' : 'Copy install command'"
        @click="copy"
      >
        <UIcon
          :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          class="size-3.5"
        />
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>

    <div
      v-else
      class="px-4 py-3"
    >
      <pre class="max-h-32 overflow-y-auto whitespace-pre-wrap font-mono text-[10px] leading-[1.45] text-[#c9c7bd]">{{ agentsPrompt }}</pre>
      <div class="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
        <NuxtLink
          to="/getting-started/ai-agents"
          class="font-mono text-[9px] uppercase tracking-[0.18em] text-[#a9a79e] transition hover:text-[#f4f1ea]"
        >
          Full guide →
        </NuxtLink>
        <button
          type="button"
          class="inline-flex shrink-0 items-center gap-1.5 rounded-sm px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#a9a79e] transition-colors duration-150 hover:bg-white/5 hover:text-[#f4f1ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f06a3c]"
          :aria-label="copied ? 'Copied' : 'Copy agent prompt'"
          @click="copy"
        >
          <UIcon
            :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            class="size-3.5"
          />
          {{ copied ? 'Copied' : 'Copy' }}
        </button>
      </div>
    </div>
  </div>
</template>
