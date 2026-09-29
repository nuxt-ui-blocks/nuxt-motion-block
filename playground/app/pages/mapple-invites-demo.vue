<template>
  <div class="space-y-12">
    <UPageHeader
      title="AppleInvites"
      description="Apple Invites style glass card carousel. Three cards overlap, the centre card is front-facing, and the stack advances on a timer."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Auto-cycling (uncontrolled)
        </p>
      </template>
      <p class="mb-4 text-sm text-muted">
        No <code>activeIndex</code> bound, so the component owns its own page and advances it every
        {{ autoInterval }}ms. The readout below samples the live DOM, so the slot geometry, the
        stacking order and the scaled content metrics are all measurable on the page.
      </p>

      <div
        ref="probe"
        class="mb-6 h-[420px] w-full"
      >
        <MAppleInvites
          :events="events"
          :interval="autoInterval"
        />
      </div>

      <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="text-xs text-muted uppercase">
              <tr>
                <th
                  v-for="head in ['Slot', 'Card', 'Opacity', 'z-index', 'Transform']"
                  :key="head"
                  class="py-2 pr-4 font-medium"
                >
                  {{ head }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in slots"
                :key="row.slot"
                class="border-default border-t"
              >
                <td class="py-2 pr-4 font-mono text-xs">
                  {{ row.slot }}
                </td>
                <td class="py-2 pr-4">
                  {{ row.title }}
                  <span class="text-muted text-xs">({{ row.size }})</span>
                </td>
                <td class="py-2 pr-4 font-mono text-xs">
                  {{ row.opacity }}
                </td>
                <td class="py-2 pr-4 font-mono text-xs">
                  {{ row.zIndex }}
                </td>
                <td class="py-2 pr-4 font-mono text-xs">
                  {{ row.transform }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <dl class="grid grid-cols-2 content-start gap-x-4 gap-y-2 text-sm">
          <dt class="text-muted">
            Badge font
          </dt>
          <dd class="font-mono text-xs">
            {{ metrics.badgeFont }}
          </dd>
          <dt class="text-muted">
            Badge pad-x
          </dt>
          <dd class="font-mono text-xs">
            {{ metrics.badgePadX }}
          </dd>
          <dt class="text-muted">
            Crown box
          </dt>
          <dd class="font-mono text-xs">
            {{ metrics.crown }}
          </dd>
          <dt class="text-muted">
            Content pad
          </dt>
          <dd class="font-mono text-xs">
            {{ metrics.contentPad }}
          </dd>
          <dt class="text-muted">
            Avatar
          </dt>
          <dd class="font-mono text-xs">
            {{ metrics.avatar }}
          </dd>
          <dt class="text-muted">
            Glass top
          </dt>
          <dd class="font-mono text-xs">
            {{ metrics.glassTop }}
          </dd>
        </dl>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Controls
        </p>
      </template>
      <p class="mb-6 text-sm text-muted">
        Every prop the reference exposes, wired to a control so each behaviour is reachable by
        hand. The three modes isolate the controlled/uncontrolled contract:
        <code>auto</code> lets the component own its page,
        <code>v-model</code> applies every <code>update:activeIndex</code> emit, and
        <code>frozen</code> binds the index but drops the emit, which is the
        <code>activeIndex</code>-without-<code>onChange</code> case from the reference.
      </p>

      <div class="mb-6 grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-sm font-medium text-highlighted">
            Interval ({{ autoInterval }}ms, 0 pauses)
          </p>
          <USlider
            v-model="autoInterval"
            aria-label="Interval in milliseconds"
            :min="0"
            :max="6000"
            :step="250"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium text-highlighted">
            Card width ({{ cardWidth }}px)
          </p>
          <USlider
            v-model="cardWidth"
            aria-label="Card width in pixels"
            :min="120"
            :max="420"
            :step="10"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium text-highlighted">
            Aspect ratio ({{ aspectRatio }})
          </p>
          <USlider
            v-model="aspectRatio"
            aria-label="Aspect ratio"
            :min="0.6"
            :max="2"
            :step="0.02"
            :disabled="heightMode !== 'auto'"
          />
        </div>

        <div class="space-y-2">
          <label
            for="apple-invites-height-mode"
            class="text-sm font-medium text-highlighted"
          >Card height ({{ heightMode }})</label>
          <USlider
            v-if="heightMode === 'fixed'"
            v-model="fixedHeight"
            aria-label="Card height in pixels"
            :min="150"
            :max="700"
            :step="10"
          />
          <select
            id="apple-invites-height-mode"
            v-model="heightMode"
            class="border-default bg-default text-highlighted focus:ring-primary w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
          >
            <option
              v-for="option in heightModes"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
          <label
            for="apple-invites-mode"
            class="text-sm font-medium text-highlighted"
          >Page mode ({{ mode }})</label>
          <select
            id="apple-invites-mode"
            v-model="mode"
            class="border-default bg-default text-highlighted focus:ring-primary w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
          >
            <option
              v-for="option in modes"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium text-highlighted">
            Emitted <code>update:activeIndex</code>
          </p>
          <p class="text-muted font-mono text-xs">
            {{ emitted.length ? emitted.join(' → ') : 'none yet' }}
          </p>
        </div>
      </div>

      <div class="mb-6 flex flex-wrap items-center gap-3">
        <UButton
          label="Previous"
          icon="i-lucide-chevron-left"
          color="neutral"
          variant="outline"
          @click="step(-1)"
        />
        <UButton
          label="Next"
          icon="i-lucide-chevron-right"
          color="neutral"
          variant="outline"
          @click="step(1)"
        />
        <UButton
          label="Reset to first"
          color="neutral"
          variant="ghost"
          @click="activeIndex = 0"
        />
        <UBadge
          color="primary"
          variant="subtle"
        >
          activeIndex: {{ mode === 'auto' ? 'internal' : activeIndex }}
        </UBadge>
        <UBadge
          color="neutral"
          variant="outline"
        >
          centre: {{ controlledCentreTitle ?? '—' }}
        </UBadge>
      </div>

      <div
        ref="controlledProbe"
        class="h-[460px] w-full"
      >
        <MAppleInvites
          :active-index="boundActiveIndex"
          :aspect-ratio="aspectRatio"
          :card-height="boundCardHeight"
          :card-width="cardWidth"
          class="rounded-2xl bg-neutral-100 dark:bg-neutral-900"
          :events="events"
          :interval="autoInterval"
          @update:active-index="onEmitted"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Responsive <code>cardWidth</code> and <code>cardHeight</code>
        </p>
      </template>
      <p class="mb-4 text-sm text-muted">
        Both accept a breakpoint map instead of a number. Resize the window across
        640 / 768 / 1024 / 1280 / 1536 to step both dimensions through every tier. Until the client
        mounts, the <code>base</code> tier renders so the server and client markup match.
      </p>
      <p class="mb-4 text-sm text-muted">
        Viewport {{ viewportWidth }}px → width {{ responsiveSize.cardWidth }},
        height {{ responsiveSize.cardHeight }}.
      </p>
      <div class="h-[520px] w-full">
        <MAppleInvites
          :card-height="responsiveCardHeight"
          :card-width="responsiveCardWidth"
          :events="events.slice(0, 3)"
          :interval="3500"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Background, badge and content variants
        </p>
      </template>
      <div class="grid gap-8 md:grid-cols-3">
        <div>
          <p class="mb-2 text-sm font-semibold text-highlighted">
            <code>backgroundClassName</code>
          </p>
          <p class="mb-3 text-sm text-muted">
            A class-only background wins over <code>image</code>.
          </p>
          <div class="h-[340px] w-full">
            <MAppleInvites
              :card-width="200"
              :events="gradientEvents"
              :interval="3500"
            />
          </div>
        </div>

        <div>
          <p class="mb-2 text-sm font-semibold text-highlighted">
            No image, no badge, no participants
          </p>
          <p class="mb-3 text-sm text-muted">
            No image, no badge text, no participants. Only <code>location</code> is required, so
            the card has nothing but a flat background behind the content block. They pin a dark
            <code>backgroundClassName</code> because the default <code>bg-primary</code> fill would
            leave the reference's <code>text-white</code>/90 location text at 1.53:1. The badge
            still renders and keeps its <code>aria-hidden</code> crown.
          </p>
          <div class="h-[340px] w-full">
            <MAppleInvites
              :card-width="200"
              :events="minimalEvents"
              :interval="3500"
            />
          </div>
        </div>

        <div>
          <p class="mb-2 text-sm font-semibold text-highlighted">
            <code>cardClassName</code>
          </p>
          <p class="mb-3 text-sm text-muted">
            Merged onto each animated card wrapper, next to the shared positioning classes.
          </p>
          <div class="h-[340px] w-full">
            <MAppleInvites
              card-class-name="rounded-2xl ring-4 ring-primary/40"
              :card-width="200"
              :events="events.slice(0, 2)"
              :interval="3500"
            />
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Short lists
        </p>
      </template>
      <p class="mb-4 text-sm text-muted">
        The reference maps the raw <code>[-1, 0, 1]</code> window straight onto
        <code>events</code>, so one and two event lists wrap onto the same card twice — once as the
        left neighbour and once as the right. The port keeps all three slots and suffixes the
        repeated key with its slot, so both copies survive Vue's keyed TransitionGroup while the
        first occurrence keeps its bare id and still slides between slots.
      </p>
      <div class="grid gap-8 md:grid-cols-2">
        <div>
          <p class="mb-3 text-sm font-semibold text-highlighted">
            Two events → 3 slots
          </p>
          <div class="h-[340px] w-full">
            <MAppleInvites
              :card-width="200"
              :events="events.slice(0, 2)"
              :interval="3000"
            />
          </div>
        </div>
        <div>
          <p class="mb-3 text-sm font-semibold text-highlighted">
            One event → 3 slots, no advance
          </p>
          <div class="h-[340px] w-full">
            <MAppleInvites
              :card-width="200"
              :events="events.slice(0, 1)"
              :interval="3000"
            />
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Empty list
        </p>
      </template>
      <p class="mb-4 text-sm text-muted">
        No events means no cards and no timer, instead of the <code>NaN</code> index and the
        <code>Cannot read properties of undefined</code> crash the reference computes.
      </p>
      <div class="h-[240px] w-full rounded-2xl bg-neutral-100 dark:bg-neutral-900">
        <MAppleInvites
          :events="[]"
          :interval="2000"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const CARD_WRAPPER_SELECTOR = '.relative.flex.h-full.w-full.items-center.justify-center'
const CARD_SLOT_NAMES = ['left', 'centre', 'right'] as const

interface SlotRow {
  opacity: string
  size: string
  slot: string
  title: string
  transform: string
  zIndex: string
}

const autoInterval = ref(3000)
const cardWidth = ref(240)
const aspectRatio = ref(1.5625)
const fixedHeight = ref(528)
const heightMode = ref<'auto' | 'fixed' | 'responsive'>('auto')
const mode = ref<'auto' | 'frozen' | 'vmodel'>('auto')
const activeIndex = ref(0)
const emitted = ref<number[]>([])

const heightModes = [
  { label: 'From aspect ratio', value: 'auto' },
  { label: 'Fixed pixel height', value: 'fixed' },
  { label: 'Responsive breakpoint map', value: 'responsive' },
]

const modes = [
  { label: 'Uncontrolled (component owns the page)', value: 'auto' },
  { label: 'Controlled + v-model (emits are applied)', value: 'vmodel' },
  { label: 'Controlled, emits dropped (frozen)', value: 'frozen' },
]

const responsiveCardWidth = {
  '2xl': 480,
  'base': 200,
  'lg': 360,
  'md': 300,
  'sm': 240,
  'xl': 420,
}

const responsiveCardHeight = {
  '2xl': 700,
  'base': 260,
  'lg': 520,
  'md': 420,
  'sm': 320,
  'xl': 620,
}

const boundActiveIndex = computed(() => (mode.value === 'auto' ? undefined : activeIndex.value))

const boundCardHeight = computed(() => {
  if (heightMode.value === 'fixed') {
    return `${fixedHeight.value}px`
  }
  if (heightMode.value === 'responsive') {
    return responsiveCardHeight
  }
  return undefined
})

function onEmitted(index: number): void {
  emitted.value = [...emitted.value.slice(-9), index]
  if (mode.value === 'vmodel') {
    activeIndex.value = index
  }
}

function step(delta: number): void {
  if (mode.value === 'auto') {
    mode.value = 'vmodel'
    activeIndex.value = 0
  }
  activeIndex.value = (activeIndex.value + delta + events.length) % events.length
}

const events = [
  {
    id: 1,
    badge: 'Golden Hour',
    title: 'Sunset Picnic',
    subtitle: 'Bring a blanket',
    location: 'Dolores Park, San Francisco',
    image: 'https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?w=600&h=900&fit=crop',
    participants: [
      { avatar: 'https://i.pravatar.cc/150?u=apple-01' },
      { avatar: 'https://i.pravatar.cc/150?u=apple-02' },
      { avatar: 'https://i.pravatar.cc/150?u=apple-03' },
    ],
  },
  {
    id: 2,
    badge: 'Studio Session',
    title: 'Album Listening',
    subtitle: 'Limited to 30 guests',
    location: 'Warehouse No. 4, Oakland',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=900&fit=crop',
    participants: [
      { avatar: 'https://i.pravatar.cc/150?u=apple-04' },
      { avatar: 'https://i.pravatar.cc/150?u=apple-05' },
    ],
  },
  {
    id: 3,
    badge: 'Open Mic',
    title: 'Poetry & Wine',
    subtitle: 'Doors at 7pm',
    location: 'The Basement, Mission St',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=900&fit=crop',
    participants: [
      { avatar: 'https://i.pravatar.cc/150?u=apple-06' },
      { avatar: 'https://i.pravatar.cc/150?u=apple-07' },
      { avatar: 'https://i.pravatar.cc/150?u=apple-08' },
      { avatar: 'https://i.pravatar.cc/150?u=apple-09' },
    ],
  },
  {
    id: 4,
    badge: 'Road Trip',
    title: 'Coast Highway',
    subtitle: 'Two days, one car',
    location: 'Highway 1, Pacifica',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=900&fit=crop',
    participants: [
      { avatar: 'https://i.pravatar.cc/150?u=apple-10' },
      { avatar: 'https://i.pravatar.cc/150?u=apple-11' },
    ],
  },
  {
    id: 5,
    badge: 'Birthday',
    title: 'Rooftop Dinner',
    subtitle: 'Candles and cake',
    location: 'The Top Floor, SoMa',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=900&fit=crop',
    participants: [
      { avatar: 'https://i.pravatar.cc/150?u=apple-12' },
      { avatar: 'https://i.pravatar.cc/150?u=apple-13' },
      { avatar: 'https://i.pravatar.cc/150?u=apple-14' },
    ],
  },
]

const gradientEvents = [
  {
    id: 11,
    badge: 'Gradient Only',
    title: 'Class-Based Background',
    subtitle: 'No image element is rendered',
    location: 'Somewhere Warm',
    backgroundClassName: 'bg-linear-to-br from-amber-400 via-orange-500 to-rose-500',
  },
  {
    id: 12,
    badge: 'Gradient Only',
    title: 'Second Card',
    subtitle: 'Swaps in on the timer',
    location: 'Somewhere Else',
    backgroundClassName: 'bg-linear-to-br from-sky-400 via-cyan-500 to-indigo-600',
  },
  {
    id: 13,
    badge: 'Gradient Only',
    title: 'Third Card',
    subtitle: 'Class beats image when both are set',
    location: 'Back to Somewhere Warm',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=900&fit=crop',
    backgroundClassName: 'bg-linear-to-br from-emerald-400 via-teal-500 to-sky-700',
  },
]

const minimalEvents = [
  {
    id: 21,
    location: 'Only a location is required',
    // The reference leaves the card on `bg-primary` when there is no image and no
    // `backgroundClassName`, which puts `text-white`/90 on a light green. A dark
    // background keeps the location legible; nothing else about the card changes.
    backgroundClassName: 'bg-neutral-900',
  },
  {
    id: 22,
    location: 'Second location-only card',
    backgroundClassName: 'bg-neutral-900',
  },
]

/* ------------------------------------------------------------------ *
 * Live DOM readout
 * ------------------------------------------------------------------ */

const probe = ref<HTMLElement | null>(null)
const controlledProbe = ref<HTMLElement | null>(null)

const slots = shallowRef<SlotRow[]>([])
const metrics = ref({ avatar: '—', badgeFont: '—', badgePadX: '—', contentPad: '—', crown: '—', glassTop: '—' })
const controlledCentreTitle = ref<string | null>(null)
const viewportWidth = ref(0)

/**
 * Sorts the rendered cards by stacking order instead of DOM order so the
 * readout stays readable while a card animates in or out.
 */
function sortByDepth(a: HTMLElement, b: HTMLElement): number {
  return Number.parseInt(getComputedStyle(b).zIndex, 10) - Number.parseInt(getComputedStyle(a).zIndex, 10)
}

/**
 * The translateX component of a computed `matrix()`, which is where the card
 * sits relative to the wrapper centre.
 */
function translateX(transform: string): number {
  if (transform === 'none') {
    return 0
  }

  const matrix = /matrix\(([^)]+)\)/.exec(transform)
  if (!matrix) {
    return 0
  }

  return Number.parseFloat(matrix[1].split(',')[4] ?? '0')
}

/**
 * Names a slot from its own geometry rather than its position in the table,
 * because the DOM order changes as cards are added, removed and exited.
 */
function slotName(card: HTMLElement, style: CSSStyleDeclaration): string {
  if (style.zIndex === '3') {
    return CARD_SLOT_NAMES[1]
  }

  if (style.zIndex === '1') {
    return 'exiting'
  }

  return translateX(style.transform) < 0 ? CARD_SLOT_NAMES[0] : CARD_SLOT_NAMES[2]
}

const EMPTY_METRICS = { avatar: '—', badgeFont: '—', badgePadX: '—', contentPad: '—', crown: '—', glassTop: '—' }

/**
 * Samples one carousel. Every value comes from a computed style rather than a
 * bounding box, because the cards carry a scale transform and a rect would
 * report the mid-animation size instead of the specified one.
 */
function readCarousel(root: HTMLElement | null): { centre: string | null, metrics: typeof EMPTY_METRICS, slots: SlotRow[] } {
  const wrapper = root?.querySelector<HTMLElement>(CARD_WRAPPER_SELECTOR)
  if (!wrapper) {
    return { centre: null, metrics: { ...EMPTY_METRICS }, slots: [] }
  }

  const cards = Array.from(wrapper.children).filter((child): child is HTMLElement => child instanceof HTMLElement)
  const sorted = [...cards].sort(sortByDepth)

  const rows = sorted.map((card) => {
    const style = getComputedStyle(card)
    const title = card.querySelector('p.font-bold')?.textContent?.trim()
    const location = Array.from(card.querySelectorAll('p')).pop()?.textContent?.trim()

    return {
      opacity: Number(style.opacity).toFixed(2),
      size: `${style.width} × ${style.height}`,
      slot: slotName(card, style),
      title: title || location || '(no text)',
      transform: style.transform,
      zIndex: style.zIndex,
    }
  })

  const centre = sorted.find(card => getComputedStyle(card).zIndex === '3')
  if (!centre) {
    return { centre: null, metrics: { ...EMPTY_METRICS }, slots: rows }
  }

  const widthOf = (selector: string): string => {
    const element = centre.querySelector<HTMLElement>(selector)
    return element ? getComputedStyle(element).width : '—'
  }

  const badge = centre.querySelector<HTMLElement>('span.rounded-full')
  const crown = centre.querySelector<HTMLElement>('.iconify')
  const content = centre.querySelector<HTMLElement>('.absolute.bottom-0')
  const glass = centre.querySelector<HTMLElement>('.absolute.inset-x-0.bottom-0')
  const cardHeight = Number.parseFloat(getComputedStyle(centre).height)
  const glassHeight = glass ? Number.parseFloat(getComputedStyle(glass).height) : 0

  return {
    centre: centre.querySelector('p.font-bold')?.textContent?.trim() ?? null,
    metrics: {
      avatar: widthOf('img.rounded-full'),
      badgeFont: badge ? getComputedStyle(badge).fontSize : '—',
      badgePadX: badge ? getComputedStyle(badge).paddingLeft : '—',
      contentPad: content ? getComputedStyle(content).padding : '—',
      crown: crown ? `${getComputedStyle(crown).width} × ${getComputedStyle(crown).height}` : '—',
      glassTop: glass ? `bottom ${glassHeight}px of a ${cardHeight}px card` : '—',
    },
    slots: rows,
  }
}

function readSlots(): void {
  const auto = readCarousel(probe.value)
  slots.value = auto.slots
  metrics.value = auto.metrics

  // The badge lives in the Controls card, so it has to track the controlled
  // carousel rather than the auto-cycling one above it.
  controlledCentreTitle.value = readCarousel(controlledProbe.value).centre
}

function readViewport(): void {
  viewportWidth.value = window.innerWidth

  const tiers: [string, number][] = [['2xl', 1536], ['xl', 1280], ['lg', 1024], ['md', 768], ['sm', 640]]
  const width = window.innerWidth
  const key = tiers.find(([, min]) => width >= min)?.[0] ?? 'base'
  const heightKey = tiers.find(([, min]) => width >= min)?.[0] ?? 'base'

  responsiveTier.value = key
  responsiveSize.value = {
    cardHeight: `${responsiveCardHeight[heightKey as keyof typeof responsiveCardHeight]}px (${heightKey})`,
    cardWidth: `${responsiveCardWidth[key as keyof typeof responsiveCardWidth]}px (${key})`,
  }
}

const responsiveTier = ref('base')
const responsiveSize = ref({ cardHeight: '—', cardWidth: '—' })

let readoutTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  readSlots()
  readViewport()
  readoutTimer = setInterval(() => {
    readSlots()
    readViewport()
  }, 400)
})

onUnmounted(() => {
  if (readoutTimer !== undefined) {
    clearInterval(readoutTimer)
    readoutTimer = undefined
  }
})
</script>
