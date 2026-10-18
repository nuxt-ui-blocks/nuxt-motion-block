<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <motion.div
      v-if="showLineNumbers"
      initial="initial"
      animate="animate"
      :variants="containerVariants"
      :class="ui.container({ class: uiProps.ui?.container })"
    >
      <div :class="ui.header({ class: uiProps.ui?.header })">
        <span :class="ui.language({ class: uiProps.ui?.language })">{{ language }}</span>
        <button
          :class="ui.copyButton({ class: uiProps.ui?.copyButton })"
          @click="handleCopy"
        >
          <AnimatePresence mode="wait">
            <motion.span
              v-if="!copied"
              key="copy"
              :initial="{ opacity: 0, y: 5 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -5 }"
              :class="ui.copy({ class: uiProps.ui?.copy })"
            >
              Copy
            </motion.span>
            <motion.span
              v-else
              key="copied"
              :initial="{ opacity: 0, y: 5 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -5 }"
              :class="ui.copied({ class: uiProps.ui?.copied })"
            >
              Copied!
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      <div class="relative">
        <div
          v-if="showLineNumbers && highlightedLines.length"
          :class="ui.lineNumbers({ class: uiProps.ui?.lineNumbers })"
        >
          <span
            v-for="(_, i) in highlightedLines"
            :key="i"
            :class="ui.lineNumber({ class: uiProps.ui?.lineNumber })"
          >{{ i + 1 }}</span>
        </div>
        <!-- eslint-disable vue/no-v-html -->
        <div
          :class="ui.body({ class: [showLineNumbers ? 'pl-16' : '', uiProps.ui?.body] })"
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
      :class="ui.container({ class: uiProps.ui?.container })"
    >
      <div :class="ui.header({ class: uiProps.ui?.header })">
        <span :class="ui.language({ class: uiProps.ui?.language })">{{ language }}</span>
        <button
          :class="ui.copyButton({ class: uiProps.ui?.copyButton })"
          @click="handleCopy"
        >
          <AnimatePresence mode="wait">
            <motion.span
              v-if="!copied"
              key="copy"
              :initial="{ opacity: 0, y: 5 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -5 }"
              :class="ui.copy({ class: uiProps.ui?.copy })"
            >
              Copy
            </motion.span>
            <motion.span
              v-else
              key="copied"
              :initial="{ opacity: 0, y: 5 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -5 }"
              :class="ui.copied({ class: uiProps.ui?.copied })"
            >
              Copied!
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        :class="ui.body({ class: uiProps.ui?.body })"
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
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import codeBlock from '../theme/code-block'

interface Props {
  code: string
  language?: string
  theme?: string
  showLineNumbers?: boolean
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue',
  theme: 'github-dark',
  showLineNumbers: false,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'codeBlock',
  props,
  theme: codeBlock,
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
