<script setup lang="ts">
const basic = ref(1800)
const maxLimit = ref(29295)
const preFilled = ref(6300)
const meeting = ref(3600)
const breakTime = ref(900)
const hoursOnly = ref(3600)
const minSec = ref(125)
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      DurationPicker Demo
    </h1>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Basic Duration Picker
          </h2>
        </template>
        <MDurationPicker v-model="basic" />
        <p class="text-sm text-muted mt-4">
          Value: {{ basic }}s ({{ Math.floor(basic / 3600) }}h {{ Math.floor((basic % 3600) / 60) }}m {{ basic % 60 }}s)
        </p>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Max Limit (99:59:59)
          </h2>
        </template>
        <MDurationPicker
          v-model="maxLimit"
          :max="359999"
        />
        <p class="text-sm text-muted mt-4">
          Value: {{ maxLimit }}s
        </p>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Pre-filled (1h 45m 0s)
          </h2>
        </template>
        <MDurationPicker v-model="preFilled" />
        <p class="text-sm text-muted mt-4">
          Value: {{ preFilled }}s
        </p>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Hours + Minutes Only
          </h2>
        </template>
        <MDurationPicker
          v-model="hoursOnly"
          :units="['hours', 'minutes']"
        />
        <p class="text-sm text-muted mt-4">
          Value: {{ hoursOnly }}s
        </p>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Minutes + Seconds Only
          </h2>
        </template>
        <MDurationPicker
          v-model="minSec"
          :units="['minutes', 'seconds']"
        />
        <p class="text-sm text-muted mt-4">
          Value: {{ minSec }}s
        </p>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            In a Form Context
          </h2>
        </template>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Meeting Duration</label>
            <MDurationPicker
              v-model="meeting"
              label="Duration"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Break Time (max 2h)</label>
            <MDurationPicker
              v-model="breakTime"
              :max="7200"
            />
          </div>
          <UButton label="Save Schedule" />
        </div>
      </UCard>
    </div>
  </div>
</template>
