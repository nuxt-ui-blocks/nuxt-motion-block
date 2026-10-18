<template>
  <div class="w-full max-w-lg rounded-2xl border border-default p-6">
    <div class="mb-4 text-sm leading-relaxed">
      Built by
      <MSocialHoverCard
        :profile="mara"
        placement="bottom"
        @follow:change="following = $event"
      />
      and shipped alongside
      <MSocialHoverCard :profile="ilya" />
      .
    </div>

    <UBadge
      :label="following ? 'Following Mara' : 'Not following'"
      :color="following ? 'success' : 'neutral'"
      variant="subtle"
    />
  </div>
</template>

<script setup lang="ts">
const following = ref(false)

const mara = {
  id: 'mara-fjeld',
  name: 'Mara Fjeld',
  handle: 'marafjeld',
  avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
  banner: 'https://picsum.photos/seed/mara-banner/640/160',
  bio: 'Rendering engineer. Spends her weekends writing about colour science and specular surfaces.',
  url: 'https://example.com/mara',
  verified: true,
  stats: [
    { label: 'Projects', value: 128 },
    { label: 'Followers', value: 18400 },
    { label: 'Following', value: 312 },
  ],
}

const ilya = {
  id: 'ilya-brandt',
  name: 'Ilya Brandt',
  handle: 'ilyabrandt',
  avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  bio: 'Interaction designer, motion first.',
  verified: false,
  stats: [
    { label: 'Followers', value: 2410 },
  ],
}
</script>
