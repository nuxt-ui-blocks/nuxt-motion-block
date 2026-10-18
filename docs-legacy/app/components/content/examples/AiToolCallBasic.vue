<template>
  <div class="w-full max-w-lg space-y-2">
    <MAiToolCall
      v-for="call in calls"
      :key="call.id"
      :name="call.name"
      :status="call.status"
      :summary="call.summary"
    >
      <template #args>
        <pre>{{ call.args }}</pre>
      </template>
      <template #result>
        <pre>{{ call.result }}</pre>
      </template>
    </MAiToolCall>
  </div>
</template>

<script setup lang="ts">
type Status = 'pending' | 'running' | 'success' | 'error'

type Call = {
  args: string
  id: string
  name: string
  result?: string
  status: Status
  summary?: string
}

const calls = ref<Call[]>([
  {
    id: 'c-1',
    args: '{ "query": "theme token audit" }',
    name: 'search_docs',
    result: '4 documents',
    status: 'success',
    summary: '4 results',
  },
  {
    id: 'c-2',
    args: '{ "path": "src/runtime/components" }',
    name: 'read_dir',
    status: 'running',
    summary: 'scanning',
  },
  {
    id: 'c-3',
    args: '{ "ref": "main" }',
    name: 'create_branch',
    status: 'pending',
  },
])

const order: Status[] = ['pending', 'running', 'success']

onMounted(() => {
  window.setInterval(() => {
    calls.value = calls.value.map((call) => {
      if (call.status === 'error' || call.status === 'success') {
        return call
      }
      const index = order.indexOf(call.status)
      const status = order[Math.min(index + 1, order.length - 1)]

      return {
        ...call,
        status,
        summary: status === 'success' ? '0.9s' : call.summary,
        result: status === 'success' ? (call.result ?? 'done') : call.result,
      }
    })
  }, 1100)
})
</script>
