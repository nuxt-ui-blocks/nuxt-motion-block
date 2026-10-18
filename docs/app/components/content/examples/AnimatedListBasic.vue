<template>
  <MAnimatedList
    v-model:items="items"
    :max-visible="4"
    animation="slide"
    direction="down"
    class="w-full max-w-md"
  >
    <template #default="{ item }">
      <div class="flex items-center gap-2 rounded-xl border border-default bg-default px-3 py-2">
        <UBadge
          :label="item.label"
          color="primary"
          variant="subtle"
        />
        <span class="truncate text-sm text-default">{{ item.text }}</span>
      </div>
    </template>
  </MAnimatedList>
</template>

<script setup lang="ts">
const items = ref([
  { id: 1, label: 'Deploy', text: 'Production build shipped' },
  { id: 2, label: 'Signup', text: 'New account created' },
  { id: 3, label: 'Payment', text: 'Invoice #1042 paid' },
  { id: 4, label: 'Alert', text: 'CPU usage above 80%' },
])
</script>
