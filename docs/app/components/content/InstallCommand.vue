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
  <div class="w-full max-w-md overflow-hidden rounded-md border border-black/20 bg-[#141412] text-[#f4f1ea] shadow-[0_16px_40px_-16px_rgb(0_0_0/0.45)] dark:border-white/10">
    <div
      class="flex items-center gap-1 border-b border-white/10 px-3 pt-2 pb-0"
      role="group"
      :aria-label="label ?? 'Package manager'"
    >
      <button
        v-for="item in managers"
        :key="item.id"
        type="button"
        :aria-pressed="manager === item.id"
        class="relative px-2 pb-2.5 pt-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-150"
        :class="manager === item.id
          ? 'text-[#f4f1ea]'
          : 'text-[#8a887f] hover:text-[#c9c7bd]'"
        @click="manager = item.id"
      >
        {{ item.label }}
        <span
          v-if="manager === item.id"
          aria-hidden="true"
          class="absolute inset-x-2 bottom-[-1px] h-[2px] bg-[#f06a3c]"
        />
      </button>
    </div>

    <div class="flex items-center gap-3 px-4 py-3">
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
  </div>
</template>
