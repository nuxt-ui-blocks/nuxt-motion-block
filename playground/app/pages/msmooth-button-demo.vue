<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      SmoothButton Demo
    </h1>

    <div class="space-y-8">
      <!-- Basic Variants -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Button Variants
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MSmoothButton
            label="Primary"
            color="primary"
          />
          <MSmoothButton
            label="Secondary"
            color="secondary"
          />
          <MSmoothButton
            label="Success"
            color="success"
          />
          <MSmoothButton
            label="Warning"
            color="warning"
          />
          <MSmoothButton
            label="Error"
            color="error"
          />
          <MSmoothButton
            label="Info"
            color="info"
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
          <MSmoothButton
            label="Extra Small"
            size="xs"
          />
          <MSmoothButton
            label="Small"
            size="sm"
          />
          <MSmoothButton label="Default" />
          <MSmoothButton
            label="Large"
            size="lg"
          />
          <MSmoothButton
            label="Extra Large"
            size="xl"
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
          <MSmoothButton
            label="Solid"
            color="primary"
            variant="solid"
          />
          <MSmoothButton
            label="Outline"
            color="primary"
            variant="outline"
          />
          <MSmoothButton
            label="Subtle"
            color="primary"
            variant="subtle"
          />
          <MSmoothButton
            label="Soft"
            color="primary"
            variant="soft"
          />
          <MSmoothButton
            label="Ghost"
            color="primary"
            variant="ghost"
          />
          <MSmoothButton
            label="Link"
            color="primary"
            variant="link"
          />
        </div>
      </UCard>

      <!-- With Icons -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            With Icons
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MSmoothButton
            label="With Leading Icon"
            icon="i-heroicons-bolt"
          />
          <MSmoothButton
            label="With Trailing Icon"
            trailing-icon="i-heroicons-arrow-right"
          />
          <MSmoothButton
            icon="i-heroicons-heart"
            aria-label="Heart"
          />
        </div>
      </UCard>

      <!-- Custom Content -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Custom Content
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MSmoothButton color="primary">
            <span class="font-semibold">Custom</span> Content
          </MSmoothButton>
          <MSmoothButton
            color="success"
            size="lg"
          >
            <Icon
              name="i-heroicons-check"
              class="w-5 h-5 mr-1"
            />
            Approved
          </MSmoothButton>
        </div>
      </UCard>

      <!-- Loading State -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Loading State
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MSmoothButton
            label="Loading..."
            loading
          />
          <MSmoothButton
            label="Loading"
            loading
            color="secondary"
          />
        </div>
      </UCard>

      <!-- Disabled -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Disabled
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MSmoothButton
            label="Disabled"
            disabled
          />
          <MSmoothButton
            label="Disabled Outline"
            disabled
            variant="outline"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
