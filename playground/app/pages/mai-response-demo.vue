<script setup lang="ts">
const FULL_TEXT
  = 'Typography is what language looks like [1]. Typography is what language looks like [2]. A '
    + 'typeface that carries a weight axis can move continuously, so the same word can be '
    + 'half-drawn and half-struck at once [3]. That is what makes a kinetic headline read as one '
    + 'gesture rather than as a sequence of swaps.'

const WORD_MS = 55

const text = ref('')
const isStreaming = ref(true)
const words = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const allWords = computed(() => FULL_TEXT.split(' '))
const shownWords = computed(() => Math.min(words.value, allWords.value.length))

const start = () => {
  if (timer) {
    clearInterval(timer)
  }
  words.value = 0
  text.value = ''
  isStreaming.value = true
  timer = setInterval(() => {
    words.value += 1
    text.value = allWords.value.slice(0, words.value).join(' ')
    if (words.value >= allWords.value.length) {
      stop()
    }
  }, WORD_MS)
}

const stop = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  isStreaming.value = false
}

const reset = () => {
  stop()
  words.value = 0
  text.value = ''
  isStreaming.value = false
}

const finish = () => {
  stop()
  words.value = allWords.value.length
  text.value = FULL_TEXT
}

onBeforeUnmount(stop)

const citations = [
  {
    id: 'c1',
    index: 1,
    title: 'Bringhurst, The Elements of Typographic Style',
    url: 'https://alistapart.com/article/typography-101/',
  },
  {
    id: 'c2',
    index: 2,
    title: 'Bringhurst, The Elements of Typographic Style, 2nd ed.',
    url: 'https://alistapart.com/article/typography-101/',
  },
  {
    id: 'c3',
    index: 3,
    title: 'Variable fonts on the web â€” internal doc, no public URL',
  },
]
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiResponse"
      description="Streaming assistant text. Words animate in as they arrive rather than on a timer, so the entrance tracks the real stream instead of drifting out of step with it."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Live stream
        </p>
        <p class="text-muted">
          Each word fades and un-blurs on arrival. There is deliberately no stagger delay: a
          delay derived from the token index goes negative as the text grows, and the entrance
          never resolves.
        </p>
      </template>

      <div class="space-y-4">
        <MAiResponse
          :citations="citations"
          :is-streaming="isStreaming"
          :text="text"
        />

        <div class="flex flex-wrap items-center gap-2">
          <UButton
            color="primary"
            icon="i-lucide-play"
            label="Stream"
            variant="solid"
            @click="start"
          />
          <UButton
            color="neutral"
            icon="i-lucide-square"
            label="Stop"
            variant="outline"
            @click="stop"
          />
          <UButton
            color="neutral"
            icon="i-lucide-rotate-ccw"
            label="Reset"
            variant="outline"
            @click="reset"
          />
          <UButton
            color="neutral"
            icon="i-lucide-fast-forward"
            label="Skip to end"
            variant="outline"
            @click="finish"
          />
        </div>

        <p class="text-muted text-xs">
          {{ shownWords }} / {{ allWords.length }} words
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Punctuation and citation pills
        </p>
        <p class="text-muted">
          Commas and full stops are never wrapped in their own inline-block, so a line can never
          break between a word and its punctuation. The third citation has no url, so it renders
          as plain text rather than a link that goes nowhere.
        </p>
      </template>

      <div class="space-y-4">
        <MAiResponse
          :citations="citations"
          text="Type is never just type, and it is never just decoration either [1]. A weight axis turns a set of discrete cuts into one continuous surface [3]."
        />
        <MAiResponse
          :citations="citations"
          class="text-muted text-xs"
          text="No markers here â€” this is the plain case."
        />
      </div>
    </UCard>
  </div>
</template>
