<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-6">
    <MToolbarExpandable :items="items" />
    <p class="text-sm text-muted">
      Each button opens a panel showing its own `content` string — no
      `item-content` slot needed.
    </p>
  </div>
</template>

<script setup lang="ts">
const items = [
  { id: 'profile', label: 'Profile', icon: 'i-lucide-user', content: 'View and edit your public profile.' },
  { id: 'team', label: 'Team', icon: 'i-lucide-users', content: 'Invite teammates and manage their roles.' },
  { id: 'billing', label: 'Billing', icon: 'i-lucide-credit-card', content: 'Update your payment method.' },
]
</script>
