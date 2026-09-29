<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      Checkbox Demo
    </h1>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Basic Checkboxes
          </h2>
        </template>
        <div class="flex flex-col gap-3">
          <MCheckbox
            v-model="checked1"
            label="Accept terms"
          />
          <MCheckbox
            v-model="checked2"
            label="Subscribe to newsletter"
          />
          <MCheckbox
            v-model="checked3"
            label="Enable notifications"
          />
        </div>
        <p class="text-sm text-muted mt-4">
          State: {{ checked1 }}, {{ checked2 }}, {{ checked3 }}
        </p>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Draw Duration
          </h2>
        </template>
        <div class="flex flex-col gap-3">
          <MCheckbox
            v-model="fast"
            label="Fast (0.15s)"
            :draw-duration="0.15"
          />
          <MCheckbox
            v-model="normal"
            label="Normal (0.3s)"
            :draw-duration="0.3"
          />
          <MCheckbox
            v-model="slow"
            label="Slow (0.8s)"
            :draw-duration="0.8"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            States
          </h2>
        </template>
        <div class="flex flex-col gap-3">
          <MCheckbox
            :model-value="true"
            label="Always checked"
          />
          <MCheckbox
            :model-value="false"
            label="Always unchecked"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const fast = ref(false)
const normal = ref(false)
const slow = ref(false)
</script>
