<template>
  <div class="grid w-full gap-4 p-6 sm:grid-cols-2">
    <div class="rounded-xl border border-default bg-elevated/40 p-6">
      <p class="text-xs font-medium tracking-wide text-muted uppercase">
        Hover to replay
      </p>
      <p class="mt-3 text-2xl font-semibold text-highlighted">
        <MRollingText
          :ramp-length="6"
          text="Hover me"
          trigger="hover"
        />
      </p>
    </div>

    <div class="rounded-xl border border-default bg-elevated/40 p-6">
      <p class="text-xs font-medium tracking-wide text-muted uppercase">
        Rolls down
      </p>
      <p class="mt-3 text-2xl font-semibold text-highlighted">
        <MRollingText
          :duration="700"
          direction="down"
          text="Downwards"
        />
      </p>
    </div>

    <div class="rounded-xl border border-default bg-elevated/40 p-6">
      <p class="text-xs font-medium tracking-wide text-muted uppercase">
        Custom glyph ramp
      </p>
      <p class="mt-3 text-2xl font-semibold text-highlighted">
        <MRollingText
          :ramp-length="8"
          glyphs="0123456789"
          text="012345"
        />
      </p>
    </div>

    <div class="rounded-xl border border-default bg-elevated/40 p-6">
      <p class="text-xs font-medium tracking-wide text-muted uppercase">
        Manual trigger
      </p>
      <p class="mt-3 text-2xl font-semibold text-highlighted">
        <MRollingText
          :playing="playing"
          text="On demand"
          trigger="manual"
        />
      </p>
      <UButton
        class="mt-4"
        color="neutral"
        size="sm"
        variant="subtle"
        @click="replay"
      >
        Replay
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const playing = ref(false)

async function replay() {
  playing.value = false
  await nextTick()
  playing.value = true
}
</script>
