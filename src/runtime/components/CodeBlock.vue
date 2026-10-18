<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <!--
      Diff mode reuses the code surface: the same monospace body and line
      rhythm, but each line carries a kind so a patch reads as a patch. It is
      chrome-less (`bare`) because the host card owns the frame.
    -->
    <div
      v-if="isDiff"
      :class="bare ? undefined : ui.container({ class: uiProps.ui?.container })"
    >
      <pre :class="ui.diffBody({ class: uiProps.ui?.diffBody })">
        <motion.div
          v-for="(line, index) in props.lines"
          :key="index"
          :animate="lineAnimate()"
          :class="ui.diffLine({ kind: line.kind ?? 'context', class: uiProps.ui?.diffLine })"
          :initial="lineInitial(line)"
          :transition="lineTransition(index)"
        >
          <span
            v-if="line.number !== undefined"
            :class="ui.diffLineNumber({ class: uiProps.ui?.diffLineNumber })"
          >{{ line.number }}</span>
          <span
            :class="ui.diffLinePrefix({ kind: line.kind ?? 'context', class: uiProps.ui?.diffLinePrefix })"
          >{{ PREFIX[line.kind ?? 'context'] }}</span>
          <span :class="ui.diffLineContent({ class: uiProps.ui?.diffLineContent })">{{ line.content }}</span>
        </motion.div>
      </pre>
    </div>

    <motion.div
      v-else-if="showLineNumbers"
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
          :class="ui.body({ class: ['code-body--numbered', uiProps.ui?.body] })"
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
import { motion, AnimatePresence, useReducedMotion } from 'motion-v'
import { createHighlighter } from 'shiki'
import { useClipboard } from '@vueuse/core'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { EASE_OUT } from '../utils/motion-tokens'
import codeBlock from '../theme/code-block'

export type CodeBlockDiffKind = 'added' | 'removed' | 'context'

export interface CodeBlockDiffLine {
  content: string
  /** Line kind. Omitted lines are treated as `context`. */
  kind?: CodeBlockDiffKind
  /** Line number in the file. Omit for tabular data rather than code. */
  number?: number
}

interface Props {
  code?: string
  language?: string
  theme?: string
  showLineNumbers?: boolean
  /** `diff` renders `lines` instead of highlighting `code`. */
  variant?: 'code' | 'diff'
  lines?: CodeBlockDiffLine[]
  /** Drop the container frame so the host card can own it. */
  bare?: boolean
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  language: 'vue',
  theme: 'github-dark',
  showLineNumbers: false,
  variant: 'code',
  lines: () => [],
  bare: false,
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

const isDiff = computed(() => props.variant === 'diff')

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

const LINE_STAGGER = 0.02
const WIPE_DURATION = 0.28

const PREFIX: Record<CodeBlockDiffKind, string> = {
  added: '+',
  context: ' ',
  removed: '-',
}

const shouldReduceMotion = useReducedMotion()

const lineInitial = (line: CodeBlockDiffLine) =>
  line.kind === 'added' && !shouldReduceMotion.value
    ? { clipPath: 'inset(0 100% 0 0)' }
    : false

const lineAnimate = () =>
  shouldReduceMotion.value ? undefined : { clipPath: 'inset(0 0% 0 0)' }

const lineTransition = (index: number) =>
  shouldReduceMotion.value
    ? { duration: 0 }
    : { delay: index * LINE_STAGGER, duration: WIPE_DURATION, ease: EASE_OUT }

const handleCopy = async () => {
  await copy(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

onMounted(async () => {
  if (props.variant !== 'code' || !props.code) return
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

.code-body.code-body--numbered {
  padding-left: 4rem;
}
</style>
