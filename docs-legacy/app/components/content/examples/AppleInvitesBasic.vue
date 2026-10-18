<template>
  <div class="h-64 w-full max-w-sm">
    <MAppleInvites
      :events="events"
      :interval="2500"
    />
  </div>
</template>

<script setup lang="ts">
const events = [
  {
    id: 1,
    title: 'Product Launch',
    subtitle: 'Announcing our latest release',
    location: 'Online',
    badge: 'Invite',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'Design Meetup',
    subtitle: 'Share ideas with the community',
    location: 'San Francisco, CA',
    badge: 'Group',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
    participants: [
      { avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    ],
  },
  {
    id: 3,
    title: 'Team Dinner',
    subtitle: 'Celebrating a great quarter',
    location: 'New York, NY',
    badge: 'Social',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
    participants: [
      { avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    ],
  },
]
</script>
