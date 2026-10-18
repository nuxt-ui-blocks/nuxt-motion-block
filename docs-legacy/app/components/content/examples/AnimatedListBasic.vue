<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MAnimatedList
      ref="list"
      v-model:items="items"
      :max-visible="4"
      animation="slide"
      direction="down"
      class="w-full"
    >
      <template #default="{ item, index, remove }">
        <div class="flex items-center justify-between gap-3 rounded-xl border border-default bg-default px-3 py-2">
          <div class="flex min-w-0 items-center gap-2">
            <UBadge
              :label="item.label"
              color="primary"
              variant="subtle"
            />
            <span class="truncate text-sm text-default">{{ item.text }}</span>
          </div>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="xs"
            :aria-label="`Dismiss ${item.text}`"
            @click.stop="remove(index)"
          />
        </div>
      </template>
    </MAnimatedList>

    <div class="flex items-center gap-3">
      <UButton
        label="Add alert"
        icon="i-lucide-bell"
        variant="outline"
        class="justify-center"
        @click="add"
      />
      <UButton
        label="Clear"
        icon="i-lucide-trash-2"
        color="neutral"
        variant="ghost"
        class="justify-center"
        @click="clear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Alert {
  id: number
  label: string
  text: string
}

let counter = 4

const list = ref<{ clear: () => void } | null>(null)
const items = ref<Alert[]>([
  { id: 1, label: 'Deploy', text: 'api-gateway rolled out to eu-west' },
  { id: 2, label: 'Warn', text: 'p95 latency above 400ms' },
  { id: 3, label: 'Info', text: 'cache warmed for 12k keys' },
  { id: 4, label: 'Deploy', text: 'web-frontend bundle dropped 84kb' },
])

function add() {
  counter += 1
  items.value = [
    ...items.value,
    { id: counter, label: 'Info', text: `event ${counter} received on worker 3` },
  ]
}

function clear() {
  list.value?.clear()
}
</script>
