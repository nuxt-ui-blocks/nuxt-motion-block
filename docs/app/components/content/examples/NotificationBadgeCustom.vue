<template>
  <ComponentPlayground
    name="NotificationBadge"
    :defaults="{ count: 3, tooltip: '3 unread messages' }"
    :controls="{
      count: { min: 0, max: 120 },
      max: { min: 0, max: 99 },
      tooltip: { placeholder: 'Tooltip text' },
      color: {
        kind: 'select',
        options: [
          { label: 'error', value: 'error' },
          { label: 'primary', value: 'primary' },
          { label: 'secondary', value: 'secondary' },
          { label: 'success', value: 'success' },
          { label: 'info', value: 'info' },
          { label: 'warning', value: 'warning' },
          { label: 'neutral', value: 'neutral' },
        ],
      },
      badgeSize: {
        kind: 'select',
        options: [
          { label: 'xs', value: 'xs' },
          { label: 'sm', value: 'sm' },
          { label: 'md', value: 'md' },
          { label: 'lg', value: 'lg' },
          { label: 'xl', value: 'xl' },
        ],
      },
    }"
  >
    <UButton
      icon="i-lucide-bell"
      color="neutral"
      variant="outline"
      aria-label="Notifications"
    />
  </ComponentPlayground>
</template>
