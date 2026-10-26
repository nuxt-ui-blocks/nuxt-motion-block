<script setup lang="ts">
import { computed, ref } from 'vue'
import { AnimatePresence, Motion, useReducedMotion } from 'motion-v'

export interface ContributionData {
  /** Number of contributions on that day. */
  count: number
  /** Local calendar date as `YYYY-MM-DD`. */
  date: string
  /** Intensity bucket: `0` is none, `4` is the busiest day. */
  level: number
}

export interface ContributionGraphProps {
  /** Extra classes for the root. */
  class?: string
  /** Days to paint. Dates outside the displayed year are ignored; missing dates render empty. */
  data?: ContributionData[]
  /** Render the Less → More legend under the grid. */
  showLegend?: boolean
  /** Show a tooltip on hover and on keyboard focus. */
  showTooltips?: boolean
  /** Calendar year to lay out. */
  year?: number
}

const WEEKS_IN_YEAR = 53
const DAYS_IN_WEEK = 7
const JANUARY = 0
const DAY_ONE = 1
const MAX_LEVEL = 4

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * Level `0` is a filled, muted cell rather than a hole: the grid reads as a
 * calendar in both themes, and the empty days still have a target for the
 * tooltip. Higher levels mix the primary colour with the page background, so
 * the scale follows the app's theme instead of a fixed green.
 */
const LEVEL_CLASSES = [
  'bg-muted',
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/70',
  'bg-primary',
]

const props = withDefaults(defineProps<ContributionGraphProps>(), {
  class: undefined,
  data: () => [],
  showLegend: true,
  showTooltips: true,
  year: () => new Date().getFullYear(),
})

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const activeDay = ref<ContributionData | null>(null)
const tooltipPosition = ref({ x: 0, y: 0 })

function pad(value: number) {
  return `${value}`.padStart(2, '0')
}

/**
 * Keys are built from the local calendar fields, not `toISOString()`: the ISO
 * string is UTC, so west of Greenwich a cell for January 1st would look up
 * December 31st and a whole column would shift by one day.
 */
function toDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function parseDateKey(key: string) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1)
}

function formatDate(key: string) {
  return parseDateKey(key).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  })
}

function contributionText(count: number) {
  if (count === 0) {
    return 'No contributions'
  }

  return count === 1 ? '1 contribution' : `${count} contributions`
}

function tooltipLabel(day: ContributionData) {
  return `${formatDate(day.date)}: ${contributionText(day.count)}`
}

function levelClass(level: number) {
  return LEVEL_CLASSES[Math.min(MAX_LEVEL, Math.max(0, Math.round(level)))]
}

const yearData = computed<ContributionData[]>(() => {
  const start = new Date(props.year, JANUARY, DAY_ONE)
  const firstSunday = new Date(start)
  firstSunday.setDate(start.getDate() - start.getDay())

  const byDate = new Map(props.data.map(day => [day.date, day]))
  const days: ContributionData[] = []

  for (let index = 0; index < WEEKS_IN_YEAR * DAYS_IN_WEEK; index++) {
    const date = new Date(firstSunday)
    date.setDate(firstSunday.getDate() + index)
    const key = toDateKey(date)
    const entry = date.getFullYear() === props.year ? byDate.get(key) : undefined

    days.push({
      count: entry?.count ?? 0,
      date: key,
      level: entry ? Math.min(MAX_LEVEL, Math.max(0, Math.round(entry.level))) : 0,
    })
  }

  return days
})

interface MonthHeader {
  label: string
  colspan: number
  startWeek: number
}

/**
 * Months are grouped by the calendar month the week's Sunday falls in. A year
 * that starts mid-week therefore shows the two or three December days as a
 * short `Dec` header, exactly as the dates are laid out.
 */
const monthHeaders = computed<MonthHeader[]>(() => {
  const start = new Date(props.year, JANUARY, DAY_ONE)
  const firstSunday = new Date(start)
  firstSunday.setDate(start.getDate() - start.getDay())

  const headers: MonthHeader[] = []
  let currentMonth = -1
  let currentYear = -1
  let startWeek = 0
  let weekCount = 0

  for (let week = 0; week < WEEKS_IN_YEAR; week++) {
    const date = new Date(firstSunday)
    date.setDate(firstSunday.getDate() + week * DAYS_IN_WEEK)

    if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) {
      if (weekCount > 0) {
        headers.push({ label: MONTHS[currentMonth] ?? '', colspan: weekCount, startWeek })
      }

      currentMonth = date.getMonth()
      currentYear = date.getFullYear()
      startWeek = week
      weekCount = 1
    }
    else {
      weekCount++
    }
  }

  if (weekCount > 0) {
    headers.push({ label: MONTHS[currentMonth] ?? '', colspan: weekCount, startWeek })
  }

  return headers
})

const rows = computed(() => DAYS.map((name, dayIndex) => ({
  name,
  dayIndex,
  cells: Array.from({ length: WEEKS_IN_YEAR }, (_unused, weekIndex) =>
    yearData.value[weekIndex * DAYS_IN_WEEK + dayIndex] ?? { count: 0, date: '', level: 0 },
  ),
})))

const activeCountText = computed(() => activeDay.value ? contributionText(activeDay.value.count) : '')
const activeDateText = computed(() => activeDay.value ? formatDate(activeDay.value.date) : '')
function showDay(day: ContributionData, event: MouseEvent) {
  if (!props.showTooltips) {
    return
  }

  activeDay.value = day
  tooltipPosition.value = { x: event.clientX, y: event.clientY - 12 }
}

function showDayFromFocus(day: ContributionData, event: FocusEvent) {
  if (!props.showTooltips || day.count === 0) {
    return
  }

  const target = event.currentTarget

  if (!(target instanceof HTMLElement)) {
    return
  }

  const rect = target.getBoundingClientRect()
  activeDay.value = day
  tooltipPosition.value = { x: rect.left + rect.width / 2, y: rect.top - 8 }
}

function hideDay() {
  activeDay.value = null
}
</script>

<template>
  <div :class="[props.class, 'relative w-fit max-w-full']">
    <div class="overflow-x-auto pb-1">
      <table class="border-separate border-spacing-[3px] text-xs">
        <caption class="sr-only">
          Contribution graph for {{ props.year }}
        </caption>

        <thead>
          <tr class="h-3">
            <th
              scope="col"
              class="w-7 min-w-7"
            />
            <th
              v-for="header in monthHeaders"
              :key="`${header.label}-${header.startWeek}`"
              scope="col"
              :colspan="header.colspan"
              class="relative h-3 text-left font-normal"
            >
              <span class="absolute top-0 left-0 text-muted">{{ header.label }}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="row in rows"
            :key="row.name"
          >
            <th
              scope="row"
              class="relative w-7 min-w-7 text-left align-middle font-normal"
            >
              <span
                aria-hidden="true"
                class="text-muted"
              >{{ row.dayIndex % 2 === 0 ? row.name : '' }}</span>
              <span class="sr-only">{{ row.name }}</span>
            </th>

            <td
              v-for="(day, weekIndex) in row.cells"
              :key="`${weekIndex}-${row.dayIndex}`"
              :class="[
                'h-2.5 w-2.5 rounded-[3px] p-0 align-middle',
                day.count > 0
                  ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                  : '',
              ]"
              :tabindex="day.count > 0 ? 0 : undefined"
              :title="props.showTooltips ? tooltipLabel(day) : undefined"
              @blur="hideDay"
              @focus="showDayFromFocus(day, $event)"
              @mouseenter="showDay(day, $event)"
              @mouseleave="hideDay"
            >
              <div
                aria-hidden="true"
                :class="['size-2.5 rounded-[3px] transition-colors', levelClass(day.level)]"
              />
              <span class="sr-only">{{ tooltipLabel(day) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="props.showTooltips"
      aria-hidden="true"
      class="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full"
      :style="{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }"
    >
      <AnimatePresence>
        <Motion
          v-if="activeDay"
          :key="activeDay.date"
          :animate="{ opacity: 1, scale: 1, y: 0 }"
          class="min-w-40 rounded-lg border border-default bg-elevated px-3 py-2 text-xs shadow-lg"
          :exit="isReduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.96, y: 4 }"
          :initial="isReduced ? false : { opacity: 0, scale: 0.96, y: 4 }"
          :transition="isReduced ? { duration: 0 } : { duration: 0.15 }"
        >
          <p class="font-semibold text-highlighted">
            {{ activeCountText }}
          </p>
          <p class="mt-0.5 text-muted">
            {{ activeDateText }}
          </p>
        </Motion>
      </AnimatePresence>
    </div>

    <div
      v-if="props.showLegend"
      class="mt-3 flex items-center justify-end gap-2 text-xs text-muted"
    >
      <span>Less</span>
      <div
        aria-hidden="true"
        class="flex items-center gap-1"
      >
        <span
          v-for="(level, index) in LEVEL_CLASSES"
          :key="index"
          :class="['size-3 rounded-[3px]', level]"
        />
      </div>
      <span>More</span>
    </div>
  </div>
</template>
