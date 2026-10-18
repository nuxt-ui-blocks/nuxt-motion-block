<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-highlighted mb-2">
      AnimatedAvatarGroup Demo
    </h1>
    <p class="text-muted mb-6">
      Avatar group with motion-v stagger entrance and hover scale animation.
    </p>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Default Stagger
          </h2>
          <p class="text-sm text-muted mt-1">
            Avatars spring in one by one with default 0.08s delay
          </p>
        </template>
        <div class="flex items-center justify-center py-4">
          <MAnimatedAvatarGroup :avatars="basicAvatars" />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Sizes
          </h2>
          <p class="text-sm text-muted mt-1">
            Different avatar group sizes
          </p>
        </template>
        <div class="space-y-6">
          <div>
            <p class="text-sm text-muted mb-2">
              Extra Small
            </p>
            <div class="flex items-center justify-center py-2">
              <MAnimatedAvatarGroup
                :avatars="basicAvatars"
                size="xs"
              />
            </div>
          </div>
          <div>
            <p class="text-sm text-muted mb-2">
              Medium
            </p>
            <div class="flex items-center justify-center py-2">
              <MAnimatedAvatarGroup
                :avatars="basicAvatars"
                size="md"
              />
            </div>
          </div>
          <div>
            <p class="text-sm text-muted mb-2">
              Large
            </p>
            <div class="flex items-center justify-center py-2">
              <MAnimatedAvatarGroup
                :avatars="basicAvatars"
                size="lg"
              />
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Max Limit
          </h2>
          <p class="text-sm text-muted mt-1">
            Limit the number of visible avatars
          </p>
        </template>
        <div class="flex items-center justify-center py-4">
          <MAnimatedAvatarGroup
            :avatars="allAvatars"
            :max="3"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Slow Stagger
          </h2>
          <p class="text-sm text-muted mt-1">
            Custom stagger delay of 0.2s between avatars
          </p>
        </template>
        <div class="flex items-center justify-center py-4">
          <MAnimatedAvatarGroup
            :avatars="basicAvatars"
            :stagger-delay="0.2"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Fast Stagger
          </h2>
          <p class="text-sm text-muted mt-1">
            Quick stagger delay of 0.04s between avatars
          </p>
        </template>
        <div class="flex items-center justify-center py-4">
          <MAnimatedAvatarGroup
            :avatars="allAvatars"
            :stagger-delay="0.04"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Custom Hover Scale
          </h2>
          <p class="text-sm text-muted mt-1">
            Hover over avatars to see them scale up
          </p>
        </template>
        <div class="flex items-center justify-center py-4">
          <MAnimatedAvatarGroup
            :avatars="basicAvatars"
            :hover-scale="1.2"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Interactive Demo
          </h2>
          <p class="text-sm text-muted mt-1">
            Add and remove avatars dynamically
          </p>
        </template>
        <div class="space-y-4">
          <div class="flex items-center justify-center py-4">
            <MAnimatedAvatarGroup :avatars="interactiveUsers" />
          </div>
          <div class="flex gap-2 justify-center">
            <UButton
              label="Add user"
              size="xs"
              color="primary"
              @click="addUser"
            />
            <UButton
              label="Remove last"
              size="xs"
              color="warning"
              variant="outline"
              @click="removeUser"
            />
            <UButton
              label="Reset"
              size="xs"
              color="error"
              variant="outline"
              @click="resetUsers"
            />
          </div>
          <p class="text-sm text-muted text-center">
            Count: {{ interactiveUsers.length }}
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const basicAvatars = ref([
  { src: 'https://github.com/benjamincanac.png', alt: 'Benjamin' },
  { src: 'https://github.com/HugoRCD.png', alt: 'Hugo' },
  { src: 'https://github.com/atinux.png', alt: 'Sébastien' },
  { src: 'https://github.com/odelfraye.png', alt: 'Odel' },
])

const allAvatars = ref([
  { src: 'https://github.com/benjamincanac.png', alt: 'Benjamin' },
  { src: 'https://github.com/HugoRCD.png', alt: 'Hugo' },
  { src: 'https://github.com/atinux.png', alt: 'Sébastien' },
  { src: 'https://github.com/odelfraye.png', alt: 'Odel' },
  { src: 'https://github.com/Canalys.png', alt: 'Canalys' },
])

const interactiveUsers = ref([
  { src: 'https://github.com/benjamincanac.png', alt: 'Benjamin' },
  { src: 'https://github.com/HugoRCD.png', alt: 'Hugo' },
])

const availableUsers = [
  { src: 'https://github.com/atinux.png', alt: 'Sébastien' },
  { src: 'https://github.com/odelfraye.png', alt: 'Odel' },
  { src: 'https://github.com/Canalys.png', alt: 'Canalys' },
  { src: 'https://github.com/Tahul.png', alt: 'Tahul' },
]

function addUser() {
  const next = availableUsers[interactiveUsers.value.length % availableUsers.length]
  interactiveUsers.value = [...interactiveUsers.value, next]
}

function removeUser() {
  if (interactiveUsers.value.length > 0) {
    interactiveUsers.value = interactiveUsers.value.slice(0, -1)
  }
}

function resetUsers() {
  interactiveUsers.value = [
    { src: 'https://github.com/benjamincanac.png', alt: 'Benjamin' },
    { src: 'https://github.com/HugoRCD.png', alt: 'Hugo' },
  ]
}
</script>
