<template>
  <div class="relative group">
    <motion.div
      v-if="showLineNumbers"
      initial="initial"
      animate="animate"
      :variants="containerVariants"
      class="relative overflow-hidden rounded-lg border border-default bg-[#0d1117] text-sm"
    >
      <div class="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span class="text-xs text-gray-400 font-mono">{{ language }}</span>
        <button
          class="text-gray-400 hover:text-white transition-colors"
          @click="handleCopy"
        >
          <AnimatePresence mode="wait">
            <motion.span
              v-if="!copied"
              key="copy"
              :initial="{ opacity: 0, y: 5 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -5 }"
              class="text-xs"
            >
              Copy
            </motion.span>
            <motion.span
              v-else
              key="copied"
              :initial="{ opacity: 0, y: 5 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -5 }"
              class="text-xs text-green-400"
            >
              Copied!
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      <div class="relative">
        <div
          v-if="showLineNumbers && highlightedLines.length"
          class="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-end pr-3 pt-4 text-gray-600 text-xs font-mono select-none border-r border-white/5"
        >
          <span
            v-for="(_, i) in highlightedLines"
            :key="i"
            class="leading-6"
          >{{ i + 1 }}</span>
        </div>
        <!-- eslint-disable vue/no-v-html -->
        <div
          :class="['code-body', showLineNumbers ? 'pl-16' : '']"
          v-html="highlightedCode"
        />
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </motion.div>

    <motion.div
      v-else
      initial="initial"
      animate="animate"
      :variants="containerVariants"
      class="relative overflow-hidden rounded-lg border border-default bg-[#0d1117] text-sm"
    >
      <div class="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span class="text-xs text-gray-400 font-mono">{{ language }}</span>
        <button
          class="text-gray-400 hover:text-white transition-colors"
          @click="handleCopy"
        >
          <AnimatePresence mode="wait">
            <motion.span
              v-if="!copied"
              key="copy"
              :initial="{ opacity: 0, y: 5 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -5 }"
              class="text-xs"
            >
              Copy
            </motion.span>
            <motion.span
              v-else
              key="copied"
              :initial="{ opacity: 0, y: 5 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -5 }"
              class="text-xs text-green-400"
            >
              Copied!
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="code-body"
        v-html="highlightedCode"
      />
      <!-- eslint-enable vue/no-v-html -->
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { createHighlighter } from 'shiki'
import { useClipboard } from '@vueuse/core'

interface Props {
  code: string
  language?: string
  theme?: string
  showLineNumbers?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue',
  theme: 'github-dark',
  showLineNumbers: false,
})

const { copy } = useClipboard()
const copied = ref(false)
const highlightedCode = ref('')

const highlightedLines = computed(() => {
  if (!highlightedCode.value) return []
  return highlightedCode.value.split('\n')
})

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.03,
    },
  },
}

const handleCopy = async () => {
  await copy(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

onMounted(async () => {
  try {
    const highlighter = await createHighlighter({
      themes: [props.theme],
      langs: [props.language],
    })
    highlightedCode.value = highlighter.codeToHtml(props.code, {
      lang: props.language,
      theme: props.theme,
    })
  }
  catch {
    highlightedCode.value = `<pre class="shiki"><code>${escapeHtml(props.code)}</code></pre>`
  }
})

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
</script>

<style scoped>
.code-body {
  padding: 1rem;
  overflow-x: auto;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.code-body :deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent;
}
</style>
