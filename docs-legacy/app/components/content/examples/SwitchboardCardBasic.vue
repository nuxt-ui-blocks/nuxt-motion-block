<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MSwitchboardCard
      :flipped="flipped"
      :flip-duration="700"
      class="rounded-2xl"
    >
      <template #front>
        <div class="flex h-40 flex-col items-center justify-center gap-2 text-center">
          <UIcon
            name="i-lucide-mail-open"
            class="size-8 text-primary"
          />
          <p class="font-semibold text-highlighted">
            3 unread messages
          </p>
          <p class="text-sm text-muted">
            Front face
          </p>
        </div>
      </template>

      <template #back>
        <div class="flex h-40 flex-col items-center justify-center gap-2 text-center">
          <UIcon
            name="i-lucide-mail-check"
            class="size-8 text-success"
          />
          <p class="font-semibold text-highlighted">
            All caught up
          </p>
          <p class="text-sm text-muted">
            Back face
          </p>
        </div>
      </template>
    </MSwitchboardCard>

    <USwitch
      v-model="flipped"
      :label="flipped ? 'Showing back' : 'Showing front'"
    />
  </div>
</template>

<script setup lang="ts">
const flipped = ref(false)
</script>
