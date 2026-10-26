<template>
  <div class="flex w-full flex-col items-center gap-3 p-6">
    <MUserAccountAvatar
      :orders="orders"
      :user="user"
      @order-view="status = `Viewing order ${$event}`"
      @profile-save="status = `Saved ${$event.name} (${$event.email})`"
    />

    <p class="text-sm text-muted">
      {{ status }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const status = ref('Open the avatar to edit the profile or review an order.')

const user = {
  avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces',
  name: 'Jonas Reed',
  email: 'jonas@harbor.studio',
}

const orders = [
  {
    id: 'ORD-2041',
    date: '2026-09-28',
    progress: 100,
    status: 'delivered' as const,
  },
  {
    id: 'ORD-2088',
    date: '2026-10-04',
    progress: 66,
    status: 'shipped' as const,
  },
  {
    id: 'ORD-2103',
    date: '2026-10-09',
    progress: 25,
    status: 'processing' as const,
  },
]
</script>
