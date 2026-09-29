<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-highlighted mb-6">
      DotMorphButton
    </h1>
    <p class="text-muted mb-6">
      UButton with a morphing dot indicator in the leading slot.
    </p>

    <div class="space-y-8">
      <!-- Basic -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Basic
          </h2>
        </template>
        <p class="text-sm text-muted mb-4">
          Hover to see the dot morph from circle to pill shape. Uses UButton under the hood.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <MDotMorphButton label="Dot-Morph" />
        </div>
      </UCard>

      <!-- Variants -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Variants
          </h2>
        </template>
        <div class="flex flex-wrap items-center gap-4">
          <MDotMorphButton
            label="Solid"
            color="primary"
            variant="solid"
          />
          <MDotMorphButton
            label="Outline"
            color="primary"
            variant="outline"
          />
          <MDotMorphButton
            label="Soft"
            color="primary"
            variant="soft"
          />
          <MDotMorphButton
            label="Subtle"
            color="primary"
            variant="subtle"
          />
          <MDotMorphButton
            label="Ghost"
            color="primary"
            variant="ghost"
          />
          <MDotMorphButton
            label="Link"
            color="primary"
            variant="link"
          />
        </div>
      </UCard>

      <!-- Colors -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Colors
          </h2>
        </template>
        <div class="flex flex-wrap items-center gap-4">
          <MDotMorphButton
            label="Primary"
            color="primary"
          />
          <MDotMorphButton
            label="Secondary"
            color="secondary"
          />
          <MDotMorphButton
            label="Success"
            color="success"
          />
          <MDotMorphButton
            label="Warning"
            color="warning"
          />
          <MDotMorphButton
            label="Error"
            color="error"
          />
          <MDotMorphButton
            label="Info"
            color="info"
          />
          <MDotMorphButton
            label="Neutral"
            color="neutral"
          />
        </div>
      </UCard>

      <!-- Dot Colors -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Dot Colors
          </h2>
        </template>
        <div class="flex flex-wrap items-center gap-4">
          <MDotMorphButton
            label="Primary"
            dot-color="primary"
          />
          <MDotMorphButton
            label="Secondary"
            dot-color="secondary"
          />
          <MDotMorphButton
            label="Success"
            dot-color="success"
          />
          <MDotMorphButton
            label="Warning"
            dot-color="warning"
          />
          <MDotMorphButton
            label="Error"
            dot-color="error"
          />
          <MDotMorphButton
            label="Info"
            dot-color="info"
          />
          <MDotMorphButton
            label="Neutral"
            dot-color="neutral"
          />
          <MDotMorphButton
            label="Purple"
            dot-color="purple"
          />
          <MDotMorphButton
            label="Pink"
            dot-color="pink"
          />
        </div>
      </UCard>

      <!-- Sizes -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Sizes
          </h2>
        </template>
        <div class="flex flex-wrap items-center gap-4">
          <MDotMorphButton
            label="Extra Small"
            size="xs"
          />
          <MDotMorphButton
            label="Small"
            size="sm"
          />
          <MDotMorphButton
            label="Default"
            size="md"
          />
          <MDotMorphButton
            label="Large"
            size="lg"
          />
          <MDotMorphButton
            label="Extra Large"
            size="xl"
          />
        </div>
      </UCard>

      <!-- With Icons -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            With Icons
          </h2>
        </template>
        <div class="flex flex-wrap items-center gap-4">
          <MDotMorphButton
            label="Like"
            icon="i-heroicons-heart"
            color="error"
          />
          <MDotMorphButton
            label="Share"
            trailing-icon="i-heroicons-arrow-top-right-on-square"
          />
          <MDotMorphButton
            label="Bookmark"
            icon="i-heroicons-bookmark"
            color="warning"
          />
        </div>
      </UCard>

      <!-- Slot Content -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Slot Content
          </h2>
        </template>
        <div class="flex flex-wrap items-center gap-4">
          <MDotMorphButton color="primary">
            Custom Label
          </MDotMorphButton>
        </div>
      </UCard>

      <!-- Reduced Motion -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Reduced Motion
          </h2>
        </template>
        <p class="text-sm text-muted mb-4">
          Respects prefers-reduced-motion — dot stays static for accessibility.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <MDotMorphButton label="Try Me" />
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
