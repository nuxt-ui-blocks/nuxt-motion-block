<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex items-center justify-between rounded-2xl border p-4">
      <div class="flex items-center gap-3">
        <MNotificationBadge
          :count="count"
          :tooltip="tooltip"
        >
          <UButton
            icon="i-lucide-bell"
            color="neutral"
            variant="outline"
            aria-label="Notifications"
          />
        </MNotificationBadge>
        <span class="text-sm font-medium">
          Inbox
        </span>
      </div>
      <span class="text-xs text-muted tabular-nums">
        {{ badgeLabel }}
      </span>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        label="New message"
        icon="i-lucide-plus"
        size="sm"
        @click="count++"
      />
      <UButton
        label="Overflow"
        icon="i-lucide-chevrons-up"
        size="sm"
        variant="outline"
        color="neutral"
        @click="count = 150"
      />
      <UButton
        label="Mark all read"
        icon="i-lucide-check-check"
        size="sm"
        variant="outline"
        color="neutral"
        @click="count = 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const count = ref(3)

const badgeLabel = computed(() => (count.value > 99 ? '99+' : String(count.value)))

const tooltip = computed(() => {
  if (count.value === 0)
    return 'No unread messages'
  return `${count.value} unread ${count.value === 1 ? 'message' : 'messages'}`
})
</script>
