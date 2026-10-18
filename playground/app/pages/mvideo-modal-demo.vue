<template>
  <div class="space-y-12">
    <UPageHeader
      title="VideoModal"
      description="Modal with video playback, animated content entrance, and auto play/pause on open/close."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic Video Modal
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Click the button to open a video modal with spring entrance animation.
      </p>
      <UButton
        label="Open Video"
        @click="open1 = true"
      />
      <MVideoModal
        v-model:open="open1"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        poster="https://picsum.photos/640/360"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Autoplay
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Video starts playing automatically when the modal opens, pauses when closed.
      </p>
      <UButton
        label="Open & Play"
        color="primary"
        @click="open2 = true"
      />
      <MVideoModal
        v-model:open="open2"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoplay
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom Trigger
        </p>
      </template>
      <p class="text-sm text-muted mb-4">
        Use the default slot for a custom trigger element.
      </p>
      <MVideoModal
        v-model:open="open3"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      >
        <UButton
          variant="outline"
          label="Watch Demo"
          icon="i-lucide-play"
        />
      </MVideoModal>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const open1 = ref(false)
const open2 = ref(false)
const open3 = ref(false)
</script>
