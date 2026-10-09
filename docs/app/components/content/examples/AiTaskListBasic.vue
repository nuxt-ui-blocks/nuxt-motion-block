<template>
  <div class="w-full max-w-md">
    <MAiTaskList
      label="Audit theme tokens"
      :tasks="tasks"
    />
  </div>
</template>

<script setup lang="ts">
type Status = 'pending' | 'running' | 'done' | 'failed'

type Task = {
  children?: Task[]
  id: string
  label: string
  note?: string
  status: Status
}

const tasks = ref<Task[]>([
  {
    id: 't-1',
    label: 'Read every component source',
    status: 'done',
  },
  {
    id: 't-2',
    label: 'Walk the theme tokens',
    status: 'running',
    children: [
      { id: 't-2a', label: 'colors', note: '18/18', status: 'done' },
      { id: 't-2b', label: 'spacing', note: '12/12', status: 'done' },
      { id: 't-2c', label: 'typography', note: '7/9', status: 'running' },
      { id: 't-2d', label: 'motion tokens', note: '2/6', status: 'pending' },
    ],
  },
  {
    id: 't-3',
    label: 'Diff the rendered output',
    note: '3 screenshots',
    status: 'pending',
  },
  {
    id: 't-4',
    label: 'Post the report to the PR',
    status: 'failed',
  },
])

const order: Status[] = ['pending', 'running', 'done']

onMounted(() => {
  window.setInterval(() => {
    tasks.value = tasks.value.map(task => ({
      ...task,
      status: advance(task.status),
      children: task.children?.map(child => ({
        ...child,
        status: advance(child.status),
      })),
    }))
  }, 900)
})

const advance = (status: Status): Status => {
  if (status === 'failed') {
    return status
  }
  const index = order.indexOf(status)
  return order[Math.min(index + 1, order.length - 1)]
}
</script>
