<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Status = 'pending' | 'running' | 'done' | 'failed'

interface Task {
  id: string
  label: string
  note?: string
  status: Status
  children?: Task[]
}

const ORDER: Status[] = ['done', 'running', 'pending', 'failed']

const tasks = ref<Task[]>([])
const running = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const build = (): Task[] => [
  {
    id: 'read',
    label: 'Read the failing spec',
    note: '3 files',
    status: 'done',
    children: [
      { id: 'read-1', label: 'Parse the trace output', status: 'done' },
      { id: 'read-2', label: 'Map lines to source ranges', status: 'done' },
    ],
  },
  { id: 'search', label: 'Search the codebase for the cause', note: '214 hits', status: 'done' },
  { id: 'isolate', label: 'Isolate the smallest failing case', status: 'running', children: [
    { id: 'isolate-1', label: 'Strip the renderer', status: 'pending' },
    { id: 'isolate-2', label: 'Bisect the props', status: 'pending' },
  ] },
  { id: 'patch', label: 'Patch it', status: 'pending' },
  { id: 'verify', label: 'Verify the whole suite', note: '0/12', status: 'pending' },
  { id: 'revert', label: 'Revert if the suite disagrees', status: 'failed' },
]

function shuffled<T>(list: T[]): T[] {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const step = () => {
  const pending: Task[] = []
  let advanced = false

  const walk = (list: Task[]) => {
    for (const task of list) {
      if (task.status === 'done') {
        continue
      }
      if (!advanced) {
        // A child has to finish before its parent is allowed to start, which is
        // why the walk marks the parent only once the children are clear.
        const children = task.children ?? []
        const openChild = children.find(child => child.status !== 'done')
        if (openChild) {
          openChild.status = 'done'
        }
        else {
          task.status = children.length > 0 ? 'running' : 'done'
          if (children.length === 0) {
            advanced = true
          }
        }
        continue
      }
      pending.push(task)
    }
  }

  walk(tasks.value)
  if (pending.length === 0) {
    running.value = false
    return
  }
  timer = setTimeout(step, 700)
}

// Seeded on mount rather than left empty: `tasks` drives the first card, and an
// empty ref would render a bare "0/0" header with no rows at all, which reads as
// a broken component rather than an unstarted run.
onMounted(() => {
  tasks.value = build()
})

const run = () => {
  stop()
  tasks.value = shuffled(build())
  running.value = true
  timer = setTimeout(step, 700)
}

const stop = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  running.value = false
}

const jump = (status: Status) => {
  const apply = (list: Task[]) => list.map((task) => {
    const next: Task = { ...task, status, ...(task.children ? { children: apply(task.children) } : {}) }
    return next
  })
  stop()
  tasks.value = apply(build())
}

onBeforeUnmount(stop)

const snapshot = computed(() => [
  ...ORDER.map(status => ({ status, count: tasks.value.filter(t => t.status === status).length })),
])
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiTaskList"
      description="A plan an agent works through. The header count is derived from the tasks, so the summary can never drift from the rows."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Watch a plan advance
        </p>
        <p class="text-muted">
          Steps finish in a shuffled order. A parent only starts once its children are clear, which
          is what the one-level nesting is for.
        </p>
      </template>

      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <UButton
            label="Run the plan"
            :disabled="running"
            @click="run"
          />
          <UButton
            color="neutral"
            variant="outline"
            label="Stop"
            @click="stop"
          />
          <UButton
            v-for="status in ORDER"
            :key="status"
            color="neutral"
            variant="ghost"
            :label="`All ${status}`"
            @click="jump(status)"
          />
        </div>

        <div class="flex flex-wrap gap-3 text-muted text-xs">
          <span
            v-for="entry in snapshot"
            :key="entry.status"
            class="tabular-nums"
          >
            {{ entry.status }}: {{ entry.count }}
          </span>
        </div>

        <MAiTaskList :tasks="tasks" />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          The tick is drawn, not faded
        </p>
        <p class="text-muted">
          The check and the cross use a CSS keyframe on <code>stroke-dashoffset</code> rather than a
          motion value. Upstream tried both a <code>pathLength</code> shorthand and an explicit dash
          offset target and neither resolved — the dash stayed pinned and the glyph rendered as a stub.
        </p>
      </template>

      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <p class="mb-2 text-muted text-xs uppercase tracking-wide">
            mixed
          </p>
          <MAiTaskList
            label="Current run"
            :tasks="build()"
          />
        </div>
        <div>
          <p class="mb-2 text-muted text-xs uppercase tracking-wide">
            all done — the ticks draw on mount
          </p>
          <MAiTaskList
            label="Finished"
            :tasks="build().map(task => ({ ...task, status: 'done', children: task.children?.map(c => ({ ...c, status: 'done' })) }))"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
