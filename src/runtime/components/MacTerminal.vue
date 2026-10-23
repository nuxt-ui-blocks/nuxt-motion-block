<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMediaQuery } from '@vueuse/core'

export type TerminalLineType = 'command' | 'output' | 'error' | 'success' | 'comment'

export interface TerminalLine {
  /** Stable key for the line. Used as the `v-for` key. */
  id: string
  /** The literal text to type or print. */
  text: string
  /** Semantic tone: commands type, everything else prints. */
  type: TerminalLineType
  /** Milliseconds to wait before this line starts. Commands default to `0`, output to `200`. */
  delay?: number
}

export type MacTerminalTheme = 'dark' | 'light' | 'auto'

export interface MacTerminalProps {
  /** Start the session as soon as the terminal scrolls into view. */
  autoPlay?: boolean
  /** Extra classes for the window root. */
  class?: string
  /** The scripted session, in order. Commands type character by character. */
  lines: TerminalLine[]
  /** Restart from the first line after the last one finishes. */
  loop?: boolean
  /** Maximum height of the scrolling log, in pixels or any CSS length. */
  maxHeight?: number | string
  /** Prompt printed in front of every command line. */
  prompt?: string
  /** Render the three macOS traffic lights in the chrome bar. */
  showTrafficLights?: boolean
  /** Controlled play state. Omit it to let the terminal own the state. */
  started?: boolean
  /** Colour scheme. `auto` follows `prefers-color-scheme`. */
  theme?: MacTerminalTheme
  /** Window title shown in the centre of the chrome bar. */
  title?: string
  /** Typing rate in characters per second. */
  typingSpeed?: number
}

const DEFAULT_PROMPT = '~ %'
const DEFAULT_TITLE = 'Terminal'
const DEFAULT_TYPING_SPEED = 24
const DEFAULT_MAX_HEIGHT = 360
const TICK_MS = 40
const LOOP_PAUSE_MS = 1500
const OUTPUT_DEFAULT_DELAY_MS = 200
const INTERSECTION_THRESHOLD = 0.35
const TRAFFIC_LIGHT = 'size-3 rounded-full'

type MachinePhase = 'delay' | 'typing'

interface Machine {
  finished: boolean
  lineIndex: number
  phase: MachinePhase
  phaseElapsed: number
}

interface ThemeStyle {
  body: string
  border: string
  caret: string
  chrome: string
  command: string
  comment: string
  error: string
  output: string
  prompt: string
  success: string
  title: string
}

const THEME_STYLES: Record<'dark' | 'light', ThemeStyle> = {
  dark: {
    body: 'bg-zinc-950 text-zinc-100',
    border: 'border-white/10',
    caret: 'bg-emerald-400',
    chrome: 'bg-zinc-900',
    command: 'text-zinc-50',
    comment: 'text-zinc-500',
    error: 'text-red-400',
    output: 'text-zinc-300',
    prompt: 'text-emerald-400',
    success: 'text-emerald-400',
    title: 'text-zinc-400',
  },
  light: {
    body: 'bg-white text-zinc-800',
    border: 'border-zinc-200',
    caret: 'bg-indigo-500',
    chrome: 'bg-zinc-100',
    command: 'text-zinc-900',
    comment: 'text-zinc-400',
    error: 'text-red-600',
    output: 'text-zinc-600',
    prompt: 'text-indigo-600',
    success: 'text-emerald-600',
    title: 'text-zinc-500',
  },
}

const props = withDefaults(defineProps<MacTerminalProps>(), {
  autoPlay: true,
  class: undefined,
  loop: false,
  maxHeight: DEFAULT_MAX_HEIGHT,
  prompt: DEFAULT_PROMPT,
  showTrafficLights: true,
  started: undefined,
  theme: 'dark',
  title: DEFAULT_TITLE,
  typingSpeed: DEFAULT_TYPING_SPEED,
})

const emit = defineEmits<{
  'close': []
  'complete': []
  'minimize': []
  'update:started': [started: boolean]
}>()

const instance = getCurrentInstance()

/**
 * A listener on the parent shows up as `onClose` on the vnode, which is the only
 * reliable way to know whether the light should become a real button. Without a
 * listener it stays a decorative dot instead of a control that does nothing.
 */
const hasCloseHandler = computed(() => typeof instance?.vnode.props?.onClose === 'function')
const hasMinimizeHandler = computed(() => typeof instance?.vnode.props?.onMinimize === 'function')

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
const resolvedTheme = computed<'dark' | 'light'>(() =>
  props.theme === 'auto' ? (prefersDark.value ? 'dark' : 'light') : props.theme,
)
const styles = computed(() => THEME_STYLES[resolvedTheme.value])

const isControlled = computed(() => props.started !== undefined)
const internalStarted = ref(props.autoPlay)
const hasStarted = computed(() => isControlled.value ? Boolean(props.started) : internalStarted.value)

function setStarted(next: boolean) {
  if (!isControlled.value) {
    internalStarted.value = next
  }

  emit('update:started', next)
}

const containerRef = ref<HTMLElement | null>(null)
const logRef = ref<HTMLElement | null>(null)
const completedLines = ref<TerminalLine[]>([])
const typingDraft = ref<{ chars: number, line: TerminalLine } | null>(null)
const isInView = ref(false)
const isPageVisible = ref(true)

const isInteractive = computed(() => !(props.autoPlay || hasStarted.value || isReduced.value))
const shouldPlay = computed(() => hasStarted.value && isInView.value && isPageVisible.value)

const resolvedMaxHeight = computed(() =>
  typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight,
)

const transcript = computed(() =>
  props.lines
    .map(line => line.type === 'command' ? `${props.prompt} ${line.text}` : line.text)
    .join('\n'),
)
const showIdleHint = computed(() => isInteractive.value && completedLines.value.length === 0 && !typingDraft.value)

function createMachine(): Machine {
  return { finished: false, lineIndex: 0, phase: 'delay', phaseElapsed: 0 }
}

let machine = createMachine()
let timer: ReturnType<typeof setInterval> | undefined
let loopTimer: ReturnType<typeof setTimeout> | undefined
let completedOnce = false
let viewObserver: IntersectionObserver | undefined

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

function resetSession() {
  if (loopTimer) {
    clearTimeout(loopTimer)
    loopTimer = undefined
  }

  machine = createMachine()
  completedLines.value = []
  typingDraft.value = null
  completedOnce = false

  if (shouldPlay.value) {
    startTimer()
  }
}

function announceComplete() {
  if (completedOnce) {
    return
  }

  completedOnce = true
  emit('complete')
}

function finish() {
  machine.finished = true
  announceComplete()
  stopTimer()

  // A finished loop waits in place for a moment, then starts over. Reduced
  // motion never schedules the wait: it has already printed the whole session.
  if (props.loop && !isReduced.value && !loopTimer) {
    loopTimer = setTimeout(() => {
      loopTimer = undefined

      if (props.loop) {
        resetSession()
      }
    }, LOOP_PAUSE_MS)
  }
}

function renderAll() {
  completedLines.value = [...props.lines]
  typingDraft.value = null
  machine.finished = true
  announceComplete()
}

function tick() {
  if (!shouldPlay.value || isReduced.value || machine.finished) {
    return
  }

  const currentLines = props.lines

  if (machine.lineIndex >= currentLines.length) {
    finish()
    return
  }

  const line = currentLines[machine.lineIndex]

  if (!line) {
    return
  }

  const isCommand = line.type === 'command'
  const delay = line.delay ?? (isCommand ? 0 : OUTPUT_DEFAULT_DELAY_MS)
  machine.phaseElapsed += TICK_MS

  if (machine.phase === 'delay') {
    if (machine.phaseElapsed < delay) {
      return
    }

    if (isCommand) {
      machine.phase = 'typing'
      machine.phaseElapsed = 0
      typingDraft.value = { chars: 0, line }
      return
    }

    completedLines.value = [...completedLines.value, line]
    machine.lineIndex += 1
    machine.phaseElapsed = 0
    return
  }

  const speed = props.typingSpeed > 0 ? props.typingSpeed : DEFAULT_TYPING_SPEED
  const msPerChar = 1000 / speed
  const chars = Math.min(line.text.length, Math.floor(machine.phaseElapsed / msPerChar))
  typingDraft.value = { chars, line }

  if (chars >= line.text.length) {
    completedLines.value = [...completedLines.value, line]
    typingDraft.value = null
    machine.lineIndex += 1
    machine.phase = 'delay'
    machine.phaseElapsed = 0
  }
}

function startTimer() {
  if (timer || isReduced.value) {
    return
  }

  timer = setInterval(tick, TICK_MS)
}

function activate() {
  setStarted(true)
}

function handleKeydown(event: KeyboardEvent) {
  if (isInteractive.value && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    activate()
  }
}

function handleVisibilityChange() {
  isPageVisible.value = document.visibilityState === 'visible'
}

function observeInView() {
  const container = containerRef.value

  if (!container || typeof IntersectionObserver === 'undefined') {
    isInView.value = true
    return
  }

  viewObserver = new IntersectionObserver((entries) => {
    const entry = entries[0]

    if (entry) {
      isInView.value = entry.isIntersecting
    }
  }, { threshold: INTERSECTION_THRESHOLD })

  viewObserver.observe(container)
}

/**
 * The reduced-motion branch is a shortcut, not a slower animation: the whole
 * session is printed at once and the caret never mounts, so there is nothing to
 * blink. The visible log stops being `aria-hidden` at the same time, which is
 * why the duplicate transcript below is skipped.
 */
watch(isReduced, (value) => {
  if (value) {
    stopTimer()
    renderAll()
  }
}, { immediate: true })

watch(() => props.lines, () => {
  resetSession()

  if (isReduced.value) {
    renderAll()
  }
}, { deep: true })

watch(hasStarted, (value) => {
  if (!value) {
    resetSession()
  }
})

watch(shouldPlay, (value) => {
  if (value) {
    startTimer()
  }
  else {
    stopTimer()
  }
})

watch([completedLines, typingDraft], async () => {
  await nextTick()

  const log = logRef.value

  if (log) {
    log.scrollTop = log.scrollHeight
  }
}, { deep: true })

onMounted(() => {
  handleVisibilityChange()
  document.addEventListener('visibilitychange', handleVisibilityChange)
  observeInView()

  if (isReduced.value) {
    renderAll()
  }

  if (shouldPlay.value) {
    startTimer()
  }
})

onBeforeUnmount(() => {
  stopTimer()

  if (loopTimer) {
    clearTimeout(loopTimer)
  }

  viewObserver?.disconnect()

  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :aria-label="`${props.title} terminal`"
    :class="[
      props.class,
      'overflow-hidden rounded-xl border shadow-lg',
      styles.border,
      isInteractive
        ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
        : '',
    ]"
    :role="isInteractive ? 'button' : 'group'"
    :tabindex="isInteractive ? 0 : undefined"
    @click="isInteractive ? activate() : undefined"
    @keydown="isInteractive ? handleKeydown($event) : undefined"
  >
    <div :class="['flex items-center gap-3 border-b px-4 py-2.5', styles.chrome, styles.border]">
      <div
        v-if="props.showTrafficLights"
        class="flex items-center gap-2"
      >
        <button
          v-if="hasCloseHandler"
          type="button"
          aria-label="Close terminal"
          :class="[TRAFFIC_LIGHT, 'bg-[#ff5f57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary']"
          @click.stop="emit('close')"
        />
        <span
          v-else
          aria-hidden="true"
          :class="[TRAFFIC_LIGHT, 'bg-[#ff5f57]']"
        />

        <button
          v-if="hasMinimizeHandler"
          type="button"
          aria-label="Minimize terminal"
          :class="[TRAFFIC_LIGHT, 'bg-[#febc2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary']"
          @click.stop="emit('minimize')"
        />
        <span
          v-else
          aria-hidden="true"
          :class="[TRAFFIC_LIGHT, 'bg-[#febc2e]']"
        />

        <span
          aria-hidden="true"
          :class="[TRAFFIC_LIGHT, 'bg-[#28c840]']"
        />
      </div>

      <p :class="['flex-1 truncate text-center text-xs font-medium', styles.title]">
        {{ props.title }}
      </p>

      <span
        v-if="props.showTrafficLights"
        aria-hidden="true"
        class="w-14"
      />
    </div>

    <div
      ref="logRef"
      :class="['overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed sm:text-sm', styles.body]"
      :style="{ maxHeight: resolvedMaxHeight }"
    >
      <!--
        The visible log is a copy of the session, not the session itself.
        While it types it is hidden from assistive technology so a screen reader
        never gets a word at a time; the complete transcript below stands in.
      -->
      <div
        :aria-hidden="isReduced ? undefined : 'true'"
        class="font-mono whitespace-pre-wrap break-words"
      >
        <div
          v-for="line in completedLines"
          :key="line.id"
          class="flex flex-wrap gap-2"
        >
          <template v-if="line.type === 'command'">
            <span :class="styles.prompt">{{ props.prompt }}</span>
            <span :class="styles.command">{{ line.text }}</span>
          </template>
          <span
            v-else
            :class="line.type === 'error'
              ? styles.error
              : line.type === 'success'
                ? styles.success
                : line.type === 'comment'
                  ? styles.comment
                  : styles.output"
          >
            {{ line.text }}
          </span>
        </div>

        <div
          v-if="typingDraft"
          class="flex flex-wrap gap-2"
        >
          <span :class="styles.prompt">{{ props.prompt }}</span>
          <span :class="styles.command">
            {{ typingDraft.line.text.slice(0, typingDraft.chars) }}<span
              aria-hidden="true"
              :class="['mac-terminal-caret ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] align-middle', styles.caret]"
            />
          </span>
        </div>

        <div
          v-if="showIdleHint"
          :class="styles.comment"
        >
          Click or press Enter to run this session
        </div>
      </div>

      <div
        v-if="!isReduced"
        aria-live="off"
        class="sr-only"
      >
        <pre class="font-mono whitespace-pre-wrap">{{ transcript }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mac-terminal-caret {
  animation: mac-terminal-caret-blink 1s steps(1) infinite;
}

@keyframes mac-terminal-caret-blink {
  0%,
  49% {
    opacity: 1;
  }

  50%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mac-terminal-caret {
    animation: none;
  }
}
</style>
