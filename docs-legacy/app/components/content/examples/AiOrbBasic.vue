<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <div class="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-default p-8">
      <MAiOrb
        :colors="['#f25aed', '#ffffff']"
        :glow="glow"
        :size="140"
        :turbulence="turbulence"
      />
      <MAiOrb
        :colors="['#4cc9f0', '#4361ee', '#3f37c9']"
        :flow="flow"
        :glow="glow"
        :iridescence="0.6"
        :size="140"
        :turbulence="turbulence"
      />
      <MAiOrb
        :colors="['#ff9f1c', '#ffbf69']"
        :glow="glow"
        :paused="paused"
        :size="140"
        :wobble="0.6"
      />
    </div>

    <div class="flex flex-wrap items-center gap-5">
      <USwitch
        v-model="paused"
        class="shrink-0"
        label="paused"
      />
      <label class="flex flex-1 items-center gap-3 text-xs text-muted">
        flow
        <USlider
          v-model="flow"
          class="flex-1"
          :max="1.6"
          :min="0"
          :step="0.05"
        />
      </label>
      <label class="flex flex-1 items-center gap-3 text-xs text-muted">
        turbulence
        <USlider
          v-model="turbulence"
          class="flex-1"
          :max="1.2"
          :min="0"
          :step="0.05"
        />
      </label>
      <label class="flex flex-1 items-center gap-3 text-xs text-muted">
        glow
        <USlider
          v-model="glow"
          class="flex-1"
          :max="1"
          :min="0"
          :step="0.05"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const paused = ref(false)
const flow = ref(0.6)
const turbulence = ref(0.4)
const glow = ref(0)
</script>
