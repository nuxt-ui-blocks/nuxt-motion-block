<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

type Manager = 'pnpm' | 'npm' | 'yarn' | 'bun'

const props = withDefaults(defineProps<{
  package?: string
  label?: string
}>(), {
  package: 'nuxt-motion-block',
  label: undefined,
})

const managers: { id: Manager, label: string, run: (pkg: string) => string }[] = [
  { id: 'pnpm', label: 'pnpm', run: pkg => `pnpm add ${pkg}` },
  { id: 'npm', label: 'npm', run: pkg => `npm install ${pkg}` },
  { id: 'yarn', label: 'yarn', run: pkg => `yarn add ${pkg}` },
  { id: 'bun', label: 'bun', run: pkg => `bun add ${pkg}` },
]

const STORAGE_KEY = 'motion-block:package-manager'

/**
 * Shared across every instance on the page: pick pnpm in the hero and the
 * feature section follows along. SSR always starts on pnpm, then we sync the
 * stored preference on mount to keep hydration deterministic.
 */
const manager = useState<Manager>('package-manager', () => 'pnpm')

const command = computed(
  () => managers.find(m => m.id === manager.value)?.run(props.package) ?? '',
)

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && managers.some(m => m.id === stored)) {
    manager.value = stored as Manager
  }
})

watch(manager, (value) => {
  if (import.meta.client) {
    window.localStorage.setItem(STORAGE_KEY, value)
  }
})

async function copy() {
  try {
    await navigator.clipboard.writeText(command.value)
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
  <div class="w-full max-w-md overflow-hidden rounded-xl border border-default bg-elevated/30">
    <div
      class="flex items-center gap-0.5 border-b border-default px-1.5 py-1"
      role="group"
      :aria-label="label ?? 'Package manager'"
    >
      <button
        v-for="item in managers"
        :key="item.id"
        type="button"
        :aria-pressed="manager === item.id"
        class="rounded-lg px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-150"
        :class="manager === item.id
          ? 'bg-accented text-highlighted'
          : 'text-dimmed hover:text-muted'"
        @click="manager = item.id"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="flex items-center gap-2 pl-3 pr-1.5 py-1.5">
      <code class="min-w-0 flex-1 truncate font-mono text-xs text-muted">
        <span class="select-none text-dimmed">$</span>
        {{ command }}
      </code>
      <UButton
        color="neutral"
        variant="ghost"
        size="xs"
        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
        :aria-label="copied ? 'Copied' : 'Copy install command'"
        @click="copy"
      >
        {{ copied ? 'Copied' : 'Copy' }}
      </UButton>
    </div>
  </div>
</template>
