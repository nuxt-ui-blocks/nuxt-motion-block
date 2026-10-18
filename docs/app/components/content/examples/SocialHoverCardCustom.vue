<template>
  <ComponentPlayground
    name="SocialHoverCard"
    :defaults="{
      profile: {
        id: 'ada',
        name: 'Ada Lovelace',
        handle: 'ada',
        avatar: 'https://i.pravatar.cc/150?img=47',
        verified: true,
        bio: 'Mathematician. Writes about engines that compute.',
        stats: [
          { label: 'Posts', value: 128 },
          { label: 'Following', value: 42 },
          { label: 'Followers', value: 5120 },
        ],
      },
    }"
  />
</template>
