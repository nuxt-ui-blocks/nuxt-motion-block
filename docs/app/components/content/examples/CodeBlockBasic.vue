<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <USwitch
      v-model="withNumbers"
      label="Show line numbers"
    />

    <MCodeBlock
      :code="snippet"
      language="ts"
      :show-line-numbers="withNumbers"
    />
  </div>
</template>

<script setup lang="ts">
const withNumbers = ref(true)

const snippet = `const items = ref([
  { id: 1, label: 'Style tokens' },
  { id: 2, label: 'Component audit' },
])

function onChange(next: Item[]) {
  items.value = [...next]
}`
</script>
