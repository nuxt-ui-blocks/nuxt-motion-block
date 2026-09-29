<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      ButtonCopy Demo
    </h1>

    <div class="space-y-8">
      <!-- Basic -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Basic Copy Button
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MButtonCopy
            text="Hello, World!"
            label="Copy Greeting"
            color="primary"
          />
          <MButtonCopy
            text="https://nuxt-motion-block.dev"
            label="Copy URL"
            color="secondary"
          />
        </div>
      </UCard>

      <!-- Different Durations -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Custom Copied Duration
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MButtonCopy
            text="Short duration"
            label="1 Second"
            :copied-duration="1000"
            color="success"
          />
          <MButtonCopy
            text="Normal duration"
            label="2 Seconds (default)"
            color="primary"
          />
          <MButtonCopy
            text="Long duration"
            label="5 Seconds"
            :copied-duration="5000"
            color="warning"
          />
        </div>
      </UCard>

      <!-- Variants -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Style Variants
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MButtonCopy
            text="Solid"
            label="Solid"
            variant="solid"
          />
          <MButtonCopy
            text="Outline"
            label="Outline"
            variant="outline"
          />
          <MButtonCopy
            text="Soft"
            label="Soft"
            variant="soft"
          />
          <MButtonCopy
            text="Ghost"
            label="Ghost"
            variant="ghost"
          />
        </div>
      </UCard>

      <!-- Sizes -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Sizes
          </h2>
        </template>
        <div class="flex items-center gap-4">
          <MButtonCopy
            text="Extra Small"
            label="XS"
            size="xs"
          />
          <MButtonCopy
            text="Small"
            label="SM"
            size="sm"
          />
          <MButtonCopy
            text="Default"
            label="Default"
          />
          <MButtonCopy
            text="Large"
            label="LG"
            size="lg"
          />
          <MButtonCopy
            text="Extra Large"
            label="XL"
            size="xl"
          />
        </div>
      </UCard>

      <!-- Copy Code Snippet -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Copy Code Snippet
          </h2>
        </template>
        <MButtonCopy
          text="npx nuxi module add nuxt-motion-block"
          label="Copy Install Command"
          color="success"
          icon="i-heroicons-clipboard"
          size="lg"
        />
      </UCard>

      <!-- Custom Default Slot -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Custom Content
          </h2>
        </template>
        <MButtonCopy
          text="npm install nuxt-motion-block"
          color="primary"
          size="lg"
        >
          <Icon
            name="i-heroicons CommandLine"
            class="w-4 h-4 mr-1"
          />
          Copy Install Command
        </MButtonCopy>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
