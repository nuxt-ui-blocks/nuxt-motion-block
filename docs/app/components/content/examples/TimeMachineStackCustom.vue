<template>
  <div class="flex w-full flex-col items-center gap-4 p-6">
    <MTimeMachineStack
      v-model:index="index"
      :items="items"
      :depth="70"
      :offset-y="28"
      :visible-count="3"
      class="h-[18rem] w-full max-w-sm"
    >
      <template #item="{ item, active }">
        <div
          :class="[
            'flex h-full flex-col justify-end gap-1 p-5 text-inverted',
            item.tone,
          ]"
        >
          <p class="text-xs uppercase tracking-wide opacity-80">
            {{ item.step }}
          </p>
          <p class="text-xl font-semibold">
            {{ item.title }}
          </p>
          <p
            v-if="active"
            class="text-xs opacity-90"
          >
            Front of the stack
          </p>
        </div>
      </template>
    </MTimeMachineStack>

    <div class="flex items-center gap-3 text-sm text-muted">
      <UButton
        :disabled="index === 0"
        size="sm"
        variant="outline"
        @click="index -= 1"
      >
        Previous
      </UButton>
      <span class="tabular-nums">{{ index + 1 }} / {{ items.length }}</span>
      <UButton
        :disabled="index === items.length - 1"
        size="sm"
        variant="outline"
        @click="index += 1"
      >
        Next
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const index = ref(0)

const items = [
  {
    id: 'one',
    step: 'Step one',
    title: 'Collect the pieces',
    tone: 'bg-primary',
  },
  {
    id: 'two',
    step: 'Step two',
    title: 'Order the stack',
    tone: 'bg-inverted',
  },
  {
    id: 'three',
    step: 'Step three',
    title: 'Ship the front',
    tone: 'bg-gradient-to-br from-primary to-error',
  },
  {
    id: 'four',
    step: 'Step four',
    title: 'Keep the history',
    tone: 'bg-gradient-to-br from-warning to-primary',
  },
]
</script>
