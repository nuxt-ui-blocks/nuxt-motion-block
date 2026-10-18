<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <div :class="ui.header({ class: uiProps.ui?.header })">
      <p :class="ui.label({ class: uiProps.ui?.label })">
        {{ props.label }}
      </p>
      <p :class="ui.count({ class: uiProps.ui?.count })">
        {{ doneCount }}/{{ allTasks.length }}
      </p>
    </div>

    <ul :class="ui.list({ class: uiProps.ui?.list })">
      <template
        v-for="row in rows"
        :key="row.task.id"
      >
        <!-- @vue-ignore -->
        <Motion
          as="li"
          :class="ui.row({ class: uiProps.ui?.row })"
          :style="{ paddingLeft: row.depth * INDENT_PX }"
          :animate="{ opacity: row.isDone ? DONE_OPACITY : 1, y: row.isDone && !shouldReduceMotion ? DONE_SETTLE_PX : 0 }"
          :transition="shouldReduceMotion ? NO_MOTION : SPRING_DEFAULT"
        >
          <span :class="ui.rowInner({ class: uiProps.ui?.rowInner })">
            <TaskBox
              :should-reduce-motion="shouldReduceMotion"
              :status="row.task.status"
              :box-class="ui.box({ class: uiProps.ui?.box })"
              :svg-class="ui.boxSvg({ class: uiProps.ui?.boxSvg })"
              :draw-class="ui.boxDraw({ class: uiProps.ui?.boxDraw })"
            />

            <span :class="ui.text({ class: uiProps.ui?.text })">
              {{ row.task.label }}
            </span>

            <span
              v-if="row.task.note"
              :class="ui.note({ class: uiProps.ui?.note })"
            >
              {{ row.task.note }}
            </span>

            <!-- @vue-ignore -->
            <Motion
              v-if="row.task.status === 'running' && !shouldReduceMotion"
              as="span"
              :animate="UNDERLINE_ANIMATE"
              :class="ui.underline({ class: uiProps.ui?.underline })"
              :style="UNDERLINE_STYLE"
              :transition="UNDERLINE_TRANSITION"
            />
          </span>
        </Motion>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { EASE_IN_OUT, SPRING_DEFAULT } from '../utils/motion-tokens'
import aiTaskList from '../theme/ai-task-list'

export type AiTaskStatus = 'pending' | 'running' | 'done' | 'failed'

export interface AiTask {
  /** Nested sub-steps, one level. */
  children?: AiTask[]
  id: string
  label: string
  /** Short right-aligned note, e.g. "12/12" or "3 files". */
  note?: string
  status: AiTaskStatus
}

export interface AiTaskListProps {
  class?: string
  /** Heading text. The counts are derived, never passed in. */
  label?: string
  tasks: AiTask[]
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AiTaskListProps>(), {
  class: '',
  label: 'Plan',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiTaskList', props, theme: aiTaskList })

const CHECK_PATH = 'M 3.5 7.5 L 6 10 L 10.5 4.5'
const CROSS_PATH = 'M 5 5 L 9 9 M 9 5 L 5 9'
const BOX_SIZE = 14
const UNDERLINE_SECONDS = 1.4
const INDENT_PX = 20
const DONE_OPACITY = 0.65
/** Completed rows settle down a pixel so whatever is running is the only thing asking for attention. */
const DONE_SETTLE_PX = 1

const SUCCESS_COLOR = 'oklch(72% 0.17 150)'
const DANGER_COLOR = 'oklch(63% 0.21 25)'

const NO_MOTION = { duration: 0 }
const BOX_TRANSITION_SECONDS = 0.2

/**
 * `0% → 200%` on a half-width gradient: one band crosses the row and is then
 * replaced by the next, so it reads as a travelling underline rather than a
 * loop. `repeat: Infinity` is a motion-only affordance — there is no CSS
 * equivalent that restarts without a visible jump.
 */
const UNDERLINE_ANIMATE = { backgroundPositionX: ['0%', '200%'] }
const UNDERLINE_STYLE = {
  backgroundImage: 'linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%)',
  backgroundSize: '50% 100%',
  opacity: 0.5,
}
const UNDERLINE_TRANSITION = {
  duration: UNDERLINE_SECONDS,
  ease: EASE_IN_OUT,
  repeat: Number.POSITIVE_INFINITY,
}

const boxStroke = (status: AiTaskStatus): string => {
  if (status === 'failed') {
    return DANGER_COLOR
  }
  if (status === 'done') {
    return SUCCESS_COLOR
  }
  return 'currentColor'
}

/**
 * The box and the tick are a plain `<svg>` with a CSS transition, not `<Motion>`.
 * motion-v's `as` does not resolve to SVG elements — `<Motion as="rect">`
 * renders a `<div>`, which is exactly how the first pass of `SvgClipMask` ended
 * up with a `<div>` inside its `<clipPath>`. `fill-opacity` and `stroke` are
 * both plain CSS properties on SVG, so the 200 ms cross-fade is identical
 * without depending on that.
 */
const TaskBox = defineComponent({
  name: 'AiTaskBox',
  props: {
    shouldReduceMotion: { type: Boolean, required: true },
    status: { type: String as () => AiTaskStatus, required: true },
    boxClass: { type: String, default: undefined },
    svgClass: { type: String, default: undefined },
    drawClass: { type: String, default: undefined },
  },
  setup(boxProps) {
    return () => {
      const isDone = boxProps.status === 'done'
      const isFailed = boxProps.status === 'failed'
      return h(
        'span',
        { class: boxProps.boxClass },
        [
          h(
            'svg',
            {
              'aria-hidden': 'true',
              'class': boxProps.svgClass,
              'viewBox': `0 0 ${BOX_SIZE} ${BOX_SIZE}`,
            },
            [
              h('rect', {
                'data-ai-task-box': '',
                'fill': isFailed ? DANGER_COLOR : SUCCESS_COLOR,
                'height': 12,
                'rx': 3.5,
                'stroke-width': 1.4,
                'style': {
                  'fill-opacity': isDone ? 0.12 : 0,
                  'stroke': boxStroke(boxProps.status),
                  'transition': boxProps.shouldReduceMotion
                    ? 'none'
                    : `fill-opacity ${BOX_TRANSITION_SECONDS}s, stroke ${BOX_TRANSITION_SECONDS}s`,
                },
                'width': 12,
                'x': 1,
                'y': 1,
              }),
              // Drawn, not faded: a check that draws itself reads as the act of
              // ticking the box rather than a state that was always there.
              isDone
                ? h('path', {
                    class: boxProps.drawClass,
                    d: CHECK_PATH,
                    fill: 'none',
                    pathLength: 1,
                    stroke: SUCCESS_COLOR,
                    strokeDasharray: '1 1',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 1.8,
                  })
                : null,
              isFailed
                ? h('path', {
                    class: boxProps.drawClass,
                    d: CROSS_PATH,
                    fill: 'none',
                    pathLength: 1,
                    stroke: DANGER_COLOR,
                    strokeDasharray: '1 1',
                    strokeLinecap: 'round',
                    strokeWidth: 1.8,
                  })
                : null,
            ],
          ),
        ],
      )
    }
  },
})

const shouldReduceMotion = useReducedMotion()

/**
 * Header counts come from the tasks, so the summary can never disagree with the
 * rows — a "3/7" that has drifted from what is on screen destroys trust in the
 * whole panel.
 */
const allTasks = computed<AiTask[]>(() =>
  props.tasks.flatMap(task => [task, ...(task.children ?? [])]),
)
const doneCount = computed(() => allTasks.value.filter(task => task.status === 'done').length)

const rows = computed(() =>
  props.tasks.flatMap(task => [
    { depth: 0, isDone: task.status === 'done', task },
    ...(task.children ?? []).map(child => ({
      depth: 1,
      isDone: child.status === 'done',
      task: child,
    })),
  ]),
)
</script>

<style>
/**
 * Not scoped, matching upstream: the class is specific enough not to leak, and
 * a scoped block would need `:deep()` to reach the paths inside the render
 * function above.
 *
 * A keyframe on mount, deliberately. Upstream documents that both motion's
 * `pathLength` shorthand and an explicit `strokeDashoffset` animation target
 * failed to resolve on these paths — the dash stayed pinned and the check
 * rendered as a stub. A keyframe is deterministic, and the reduced-motion case
 * is handled here in CSS with no JS branch at all.
 */
.ai-task-draw {
  stroke-dashoffset: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .ai-task-draw {
    animation: ai-task-draw 200ms cubic-bezier(0.23, 1, 0.32, 1) both;
  }
}

@keyframes ai-task-draw {
  from {
    stroke-dashoffset: 1;
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>
