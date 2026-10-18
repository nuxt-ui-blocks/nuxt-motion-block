<template>
  <div class="space-y-12">
    <UPageHeader
      title="TweetCard"
      description="Animated tweet card with hover lift effect and social engagement stats."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Single Tweet
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Hover over the card to see the spring lift and shadow elevation.
      </p>
      <div class="max-w-md">
        <MTweetCard
          author="Sarah Chen"
          handle="@sarahchen"
          content="Just shipped the new component library. Spring animations make everything feel so much more alive! 🚀"
          avatar="https://i.pravatar.cc/150?u=sarah"
          time="2h"
          :likes="142"
          :retweets="38"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Tweet Feed
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Multiple cards in a feed layout.
      </p>
      <div class="max-w-md space-y-4">
        <MTweetCard
          v-for="tweet in tweets"
          :key="tweet.handle"
          :author="tweet.author"
          :handle="tweet.handle"
          :content="tweet.content"
          :avatar="tweet.avatar"
          :time="tweet.time"
          :likes="tweet.likes"
          :retweets="tweet.retweets"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Minimal Card
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Without avatar or stats — just text.
      </p>
      <div class="max-w-md">
        <MTweetCard
          author="Dev"
          handle="@dev"
          content="Simple and clean."
          time="5m"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const tweets = [
  {
    author: 'Alex Rivera',
    handle: '@alexrivera',
    content: 'The hover animation on these cards is butter smooth. Love the spring physics!',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    time: '4h',
    likes: 89,
    retweets: 12,
  },
  {
    author: 'Jordan Kim',
    handle: '@jordankim',
    content: 'Built a whole dashboard with these motion components. The DX is incredible.',
    avatar: 'https://i.pravatar.cc/150?u=jordan',
    time: '1d',
    likes: 234,
    retweets: 67,
  },
  {
    author: 'Maya Patel',
    handle: '@mayapatel',
    content: 'Finally, components that actually feel native to the Vue ecosystem.',
    avatar: 'https://i.pravatar.cc/150?u=maya',
    time: '3d',
    likes: 56,
    retweets: 8,
  },
]
</script>
