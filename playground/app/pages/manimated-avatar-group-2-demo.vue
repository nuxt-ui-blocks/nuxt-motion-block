<script setup lang="ts">
import { ref } from 'vue'

const team = [
  { src: 'https://github.com/benjamincanac.png', alt: 'Benjamin' },
  { src: 'https://github.com/HugoRCD.png', alt: 'Hugo' },
  { src: 'https://github.com/atinux.png', alt: 'Sébastien' },
  { src: 'https://github.com/odelfraye.png', alt: 'Odel' },
  { src: 'https://github.com/Canalys.png', alt: 'Canalys' },
  { src: 'https://github.com/Tahul.png', alt: 'Tahul' },
]

const squad = [
  { src: 'https://github.com/atinux.png', alt: 'Sébastien' },
  { src: 'https://github.com/odelfraye.png', alt: 'Odel' },
  { src: 'https://github.com/Canalys.png', alt: 'Canalys' },
]

const trio = [
  { src: 'https://github.com/benjamincanac.png', alt: 'Benjamin' },
  { src: 'https://github.com/HugoRCD.png', alt: 'Hugo' },
  { src: 'https://github.com/atinux.png', alt: 'Sébastien' },
]

const initialsOnly = [
  { alt: 'Benjamin Canac' },
  { alt: 'Hugo Courson' },
  { alt: 'Sébastien Chopin' },
  { alt: 'Odel Fraye' },
  { alt: 'Tahul B' },
]

const members = ref(squad)

const available = [
  { src: 'https://github.com/atinux.png', alt: 'Sébastien' },
  { src: 'https://github.com/odelfraye.png', alt: 'Odel' },
  { src: 'https://github.com/Canalys.png', alt: 'Canalys' },
  { src: 'https://github.com/Tahul.png', alt: 'Tahul' },
]
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AnimatedAvatarGroup"
      description="Avatar group that fans the whole stack apart on hover, scaling every avatar to 1.05 with a 30ms cascade. Built on UAvatarGroup, so the overlap tiers, reversed stacking and the +N badge all come from Nuxt UI."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Default
        </p>
        <p class="text-muted">
          Hover the group: the overlap opens to a 4px gap and each avatar scales to 1.05, 30ms after the previous one.
        </p>
      </template>
      <div class="flex justify-center py-6">
        <MAnimatedAvatarGroup
          :avatars="trio"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Overflow badge
        </p>
        <p class="text-muted">
          <code>maxVisible</code> defaults to 4, so the two extra teammates collapse into a +2 badge. The badge expands on hover but never scales.
        </p>
      </template>
      <div class="flex justify-center py-6">
        <MAnimatedAvatarGroup
          :avatars="team"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Max limit
        </p>
        <p class="text-muted">
          <code>max</code> is the alias and takes priority over <code>maxVisible</code>.
        </p>
      </template>
      <div class="flex justify-center py-6">
        <MAnimatedAvatarGroup
          :avatars="squad"
          :max="2"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sizes
        </p>
        <p class="text-muted">
          The idle overlap is the Nuxt UI one, which scales with the size token.
        </p>
      </template>
      <div class="flex items-center justify-center gap-10 py-6">
        <MAnimatedAvatarGroup
          :avatars="trio"
          size="xs"
        />
        <MAnimatedAvatarGroup
          :avatars="trio"
          size="md"
        />
        <MAnimatedAvatarGroup
          :avatars="trio"
          size="2xl"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom overlap
        </p>
        <p class="text-muted">
          <code>overlap</code> is a ratio of the avatar size. At 0.6 the avatars are almost fully stacked.
        </p>
      </template>
      <div class="flex items-center justify-center gap-10 py-6">
        <MAnimatedAvatarGroup
          :avatars="trio"
          :overlap="0.6"
        />
        <MAnimatedAvatarGroup
          :avatars="trio"
          :overlap="0"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Expand on hover off
        </p>
        <p class="text-muted">
          With <code>expandOnHover="false"</code> the stack stays locked and nothing moves.
        </p>
      </template>
      <div class="flex justify-center py-6">
        <MAnimatedAvatarGroup
          :avatars="trio"
          :expand-on-hover="false"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Initials fallback
        </p>
        <p class="text-muted">
          Without a <code>src</code> the <code>UAvatar</code> fallback renders the alt initials, and the overflow badge still works.
        </p>
      </template>
      <div class="flex justify-center py-6">
        <MAnimatedAvatarGroup
          :avatars="initialsOnly"
          size="lg"
        />
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom content
        </p>
        <p class="text-muted">
          The default slot replaces the avatar content, so drop <code>src</code> to render your own markup instead of the image. It is only forwarded when you provide it, which is what keeps the initials fallback intact everywhere else.
        </p>
      </template>
      <div class="flex justify-center py-6">
        <MAnimatedAvatarGroup :avatars="initialsOnly">
          <template #default="{ avatar, index }">
            <div
              class="flex h-full w-full items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content"
            >
              {{ (avatar.alt ?? '?').charAt(0) }}{{ index + 1 }}
            </div>
          </template>
        </MAnimatedAvatarGroup>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Dynamic members
        </p>
        <p class="text-muted">
          Add and remove teammates and the badge keeps counting.
        </p>
      </template>
      <div class="space-y-4">
        <div class="flex justify-center py-4">
          <MAnimatedAvatarGroup :avatars="members" />
        </div>
        <div class="flex justify-center gap-2">
          <UButton
            label="Add member"
            size="xs"
            color="primary"
            @click="members = [...members, available[members.length % available.length]!]"
          />
          <UButton
            label="Remove last"
            size="xs"
            color="warning"
            variant="outline"
            @click="members = members.slice(0, -1)"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
