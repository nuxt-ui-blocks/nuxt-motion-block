<script setup lang="ts">
import type { Component } from 'vue'
import { computed, ref } from 'vue'
import Magnetic from './previews/Magnetic.vue'
import RetroGrid from './previews/RetroGrid.vue'
import Shimmer from './previews/Shimmer.vue'

type Tone = 'tag' | 'attr' | 'str' | 'plain'

interface Token {
  text: string
  tone?: Tone
}

interface Tab {
  id: string
  label: string
  name: string
  blurb: string
  preview: Component
  code: string
  lines: Token[][]
}

const tabs: Tab[] = [
  {
    id: 'background',
    label: 'Background',
    name: 'MRetroGrid',
    blurb: 'An infinite horizon, in four lines.',
    preview: RetroGrid,
    code: `<MRetroGrid\n  :angle="58"\n  :cell-size="54"\n  color="rgba(16,185,129,0.7)"\n/>`,
    lines: [
      [{ text: '<MRetroGrid', tone: 'tag' }],
      [{ text: '  :angle', tone: 'attr' }, { text: '=' }, { text: '"58"', tone: 'str' }],
      [{ text: '  :cell-size', tone: 'attr' }, { text: '=' }, { text: '"54"', tone: 'str' }],
      [{ text: '  color', tone: 'attr' }, { text: '=' }, { text: '"rgba(16,185,129,0.7)"', tone: 'str' }],
      [{ text: '/>', tone: 'tag' }],
    ],
  },
  {
    id: 'text',
    label: 'Text',
    name: 'MTextShimmer',
    blurb: 'One prop. A headline with a pulse.',
    preview: Shimmer,
    code: `<MTextShimmer\n  text="Shimmering headline"\n  :duration="2.6"\n/>`,
    lines: [
      [{ text: '<MTextShimmer', tone: 'tag' }],
      [{ text: '  text', tone: 'attr' }, { text: '=' }, { text: '"Shimmering headline"', tone: 'str' }],
      [{ text: '  :duration', tone: 'attr' }, { text: '=' }, { text: '"2.6"', tone: 'str' }],
      [{ text: '/>', tone: 'tag' }],
    ],
  },
  {
    id: 'interaction',
    label: 'Interaction',
    name: 'MMagnetic',
    blurb: 'The button leans toward your cursor.',
    preview: Magnetic,
    code: `<MMagnetic :intensity="0.8">\n  <UButton>Hover me</UButton>\n</MMagnetic>`,
    lines: [
      [{ text: '<MMagnetic', tone: 'tag' }, { text: ' :intensity', tone: 'attr' }, { text: '=' }, { text: '"0.8"', tone: 'str' }, { text: '>', tone: 'tag' }],
      [{ text: '  <UButton', tone: 'tag' }, { text: '>Hover me</UButton>', tone: 'tag' }],
      [{ text: '</MMagnetic>', tone: 'tag' }],
    ],
  },
]

const active = ref<string>('background')
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const current = computed<Tab>(() => tabs.find(tab => tab.id === active.value) ?? tabs[0]!)

function toneClass(tone: Tone = 'plain') {
  return {
    tag: 'text-emerald-300',
    attr: 'text-sky-300',
    str: 'text-amber-200',
    plain: 'text-neutral-400',
  }[tone]
}

async function copy() {
  try {
    await navigator.clipboard.writeText(current.value.code)
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
  <div class="relative mx-auto w-full max-w-lg">
    <div
      aria-hidden="true"
      class="absolute -inset-8 rounded-2xl bg-primary/10 blur-3xl"
    />

    <div class="dark relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/40">
      <div class="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
        <span class="size-2.5 rounded-full bg-red-400/70" />
        <span class="size-2.5 rounded-full bg-amber-400/70" />
        <span class="size-2.5 rounded-full bg-emerald-400/70" />
        <span class="ml-2 font-mono text-xs text-neutral-500">Motion.vue</span>
        <span class="ml-auto rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium text-neutral-400">Nuxt</span>
      </div>

      <div class="flex items-center gap-1 border-b border-white/10 px-2 py-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="rounded-lg px-2.5 py-1 text-[11px] font-medium transition duration-200"
          :class="active === tab.id
            ? 'bg-white/10 text-white'
            : 'text-neutral-500 hover:bg-white/5 hover:text-neutral-200'"
          :aria-pressed="active === tab.id"
          @click="active = tab.id"
        >
          {{ tab.label }}
        </button>
        <span class="ml-auto pr-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">
          live
        </span>
      </div>

      <div class="relative h-52 overflow-hidden">
        <ClientOnly>
          <Transition
            name="panel"
            mode="out-in"
          >
            <component
              :is="current.preview"
              :key="current.id"
            />
          </Transition>
          <template #fallback>
            <div class="h-full w-full animate-pulse bg-white/5" />
          </template>
        </ClientOnly>

        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-950 to-transparent"
        />
        <p class="pointer-events-none absolute bottom-3 left-4 text-[11px] font-medium text-neutral-400">
          {{ current.blurb }}
        </p>
      </div>

      <div class="border-t border-white/10 bg-black/40 px-4 py-3">
        <div class="mb-2 flex items-center justify-between gap-3">
          <span class="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
            {{ current.name }}
          </span>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium text-neutral-400 transition hover:bg-white/5 hover:text-white"
            :aria-label="copied ? 'Copied' : 'Copy code'"
            @click="copy"
          >
            <UIcon
              :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
              class="size-3.5"
            />
            {{ copied ? 'Copied' : 'Copy' }}
          </button>
        </div>

        <pre class="overflow-x-auto"><code class="whitespace-pre font-mono text-[11px] leading-relaxed"><span
          v-for="(line, index) in current.lines"
          :key="index"
        ><span
          v-for="(token, tokenIndex) in line"
          :key="tokenIndex"
          :class="toneClass(token.tone)"
        >{{ token.text }}</span><br></span></code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel-enter-active,
.panel-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.panel-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.panel-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .panel-enter-active,
  .panel-leave-active {
    transition: none;
  }
}
</style>
