<template>
  <div class="space-y-12">
    <UPageHeader
      title="SocialHoverCard"
      description="Floating profile preview anchored to a text trigger, with placement flipping, count-up stats and a follow toggle."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Inline in a paragraph
        </p>
      </template>
      <p class="max-w-2xl text-muted leading-relaxed">
        Built by
        <MSocialHoverCard :profile="profiles[0]" />
        and
        <MSocialHoverCard :profile="profiles[1]" />
        with a little help from
        <MSocialHoverCard
          :profile="profiles[2]"
          :open-delay="120"
        />.
        Hover or focus a handle to preview the profile.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Placement
        </p>
      </template>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div class="space-y-2">
          <p class="font-medium text-sm text-muted">
            auto
          </p>
          <MSocialHoverCard :profile="profiles[0]" />
        </div>
        <div class="space-y-2">
          <p class="font-medium text-sm text-muted">
            top
          </p>
          <MSocialHoverCard
            :profile="profiles[0]"
            placement="top"
          />
        </div>
        <div class="space-y-2">
          <p class="font-medium text-sm text-muted">
            bottom
          </p>
          <MSocialHoverCard
            :profile="profiles[0]"
            placement="bottom"
          />
        </div>
      </div>
      <p class="mt-4 text-muted text-sm">
        <code>auto</code> flips to <code>top</code> when there is less than 260px of room below the trigger.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom trigger, follow state and loading
        </p>
      </template>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div class="space-y-2">
          <p class="font-medium text-sm text-muted">
            Slot trigger
          </p>
          <MSocialHoverCard :profile="profiles[3]">
            <template #trigger>
              <span class="rounded-full bg-primary/10 px-2 py-1 text-primary">
                {{ profiles[3].name }}
              </span>
            </template>
          </MSocialHoverCard>
        </div>

        <div class="space-y-2">
          <p class="font-medium text-sm text-muted">
            Controlled follow
          </p>
          <MSocialHoverCard
            :profile="profiles[1]"
            :following="following"
            @follow:change="following = $event"
          />
          <p class="text-muted text-sm">
            following: {{ following }}
          </p>
        </div>

        <div class="space-y-2">
          <p class="font-medium text-sm text-muted">
            Loading skeleton
          </p>
          <MSocialHoverCard
            :profile="profiles[2]"
            loading
            :open-delay="0"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const following = ref(false)

const profiles = [
  {
    id: 'sarah-chen',
    handle: 'sarahchen',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    banner: 'https://picsum.photos/seed/sarah/640/160',
    bio: 'Design systems, motion design, and long walks between the two.',
    url: 'https://example.com/sarahchen',
    verified: true,
    stats: [
      { label: 'Followers', value: 12400 },
      { label: 'Following', value: 892 },
      { label: 'Posts', value: 3140 },
    ],
  },
  {
    id: 'alex-rivera',
    handle: 'alexr',
    name: 'Alex Rivera',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
    bio: 'Shipping small tools for small teams.',
    stats: [
      { label: 'Followers', value: 3200 },
      { label: 'Following', value: 1100 },
    ],
  },
  {
    id: 'jordan-lee',
    handle: 'jordanl',
    name: 'Jordan Lee',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    bio: 'Motion engineer. Springs over bezier curves.',
    stats: [
      { label: 'Followers', value: 45700 },
      { label: 'Following', value: 234 },
    ],
  },
  {
    id: 'sam-okafor',
    handle: 'samokafor',
    name: 'Sam Okafor',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026111d',
    banner: 'https://picsum.photos/seed/sam/640/160',
    bio: 'Type nerd. Kerning apologist.',
    verified: true,
    stats: [
      { label: 'Followers', value: 8600 },
      { label: 'Following', value: 402 },
    ],
  },
]
</script>
