<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      NotificationBadge Demo
    </h1>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Spring Entrance / Exit
          </h2>
          <p class="text-sm text-muted mt-1">
            Badge springs in/out every time count changes
          </p>
        </template>
        <div class="flex gap-8 items-center">
          <MNotificationBadge
            :count="springCount"
            tooltip="Click + to see spring in"
          >
            <UButton
              icon="i-heroicons-bell"
              label="Notifications"
            />
          </MNotificationBadge>
          <UButton
            label="+1"
            color="primary"
            @click="springCount++"
          />
          <UButton
            label="-1"
            color="secondary"
            :disabled="springCount <= 0"
            @click="springCount--"
          />
          <UButton
            label="Reset"
            color="error"
            variant="outline"
            @click="springCount = 0"
          />
          <span class="text-sm text-muted">count: {{ springCount }}</span>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Max Values
          </h2>
          <p class="text-sm text-muted mt-1">
            Badge shows max+ format when count exceeds max
          </p>
        </template>
        <div class="flex gap-8 items-center">
          <MNotificationBadge
            :count="maxCount"
            :max="99"
            tooltip="Max 99"
          >
            <UButton label="Max 99" />
          </MNotificationBadge>
          <UButton
            label="+10"
            color="primary"
            @click="maxCount += 10"
          />
          <UButton
            label="Reset"
            color="error"
            variant="outline"
            @click="maxCount = 0"
          />
          <span class="text-sm text-muted">count: {{ maxCount }}</span>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Colors
          </h2>
          <p class="text-sm text-muted mt-1">
            Different badge colors
          </p>
        </template>
        <div class="flex gap-6 items-center">
          <MNotificationBadge
            :count="5"
            color="primary"
            tooltip="Primary"
          >
            <UButton
              label="Primary"
              color="primary"
              variant="outline"
            />
          </MNotificationBadge>
          <MNotificationBadge
            :count="5"
            color="success"
            tooltip="Success"
          >
            <UButton
              label="Success"
              color="success"
              variant="outline"
            />
          </MNotificationBadge>
          <MNotificationBadge
            :count="5"
            color="warning"
            tooltip="Warning"
          >
            <UButton
              label="Warning"
              color="warning"
              variant="outline"
            />
          </MNotificationBadge>
          <MNotificationBadge
            :count="5"
            color="error"
            tooltip="Error"
          >
            <UButton
              label="Error"
              color="error"
              variant="outline"
            />
          </MNotificationBadge>
          <MNotificationBadge
            :count="5"
            color="info"
            tooltip="Info"
          >
            <UButton
              label="Info"
              color="info"
              variant="outline"
            />
          </MNotificationBadge>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Icon Only
          </h2>
          <p class="text-sm text-muted mt-1">
            Badge on icon-only buttons
          </p>
        </template>
        <div class="flex gap-6 items-center">
          <MNotificationBadge
            :count="iconCount"
            tooltip="Cart"
          >
            <UButton
              icon="i-heroicons-shopping-cart"
              color="primary"
              variant="ghost"
            />
          </MNotificationBadge>
          <MNotificationBadge
            :count="iconCount"
            tooltip="Messages"
          >
            <UButton
              icon="i-heroicons-chat-bubble-left"
              color="success"
              variant="ghost"
            />
          </MNotificationBadge>
          <MNotificationBadge
            :count="iconCount"
            tooltip="Alerts"
          >
            <UButton
              icon="i-heroicons-bell"
              color="warning"
              variant="ghost"
            />
          </MNotificationBadge>
          <UButton
            label="Toggle All"
            color="primary"
            variant="outline"
            @click="iconCount = iconCount > 0 ? 0 : 3"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const springCount = ref(3)
const maxCount = ref(0)
const iconCount = ref(3)
</script>
