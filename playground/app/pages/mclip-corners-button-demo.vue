<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">
      ClipCornersButton Demo
    </h1>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Basic Clip Corners
          </h2>
        </template>
        <p class="text-sm text-muted mb-4">
          Hover to see corner triangles spring inward toward the button center. Uses UButton under the hood.
        </p>
        <div class="flex flex-wrap gap-4">
          <MClipCornersButton
            label="Primary"
            color="primary"
          />
          <MClipCornersButton
            label="Secondary"
            color="secondary"
          />
          <MClipCornersButton
            label="Success"
            color="success"
          />
          <MClipCornersButton
            label="Error"
            color="error"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            UButton Variants
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MClipCornersButton
            label="Solid"
            color="primary"
            variant="solid"
          />
          <MClipCornersButton
            label="Outline"
            color="primary"
            variant="outline"
          />
          <MClipCornersButton
            label="Soft"
            color="primary"
            variant="soft"
          />
          <MClipCornersButton
            label="Subtle"
            color="primary"
            variant="subtle"
          />
          <MClipCornersButton
            label="Ghost"
            color="primary"
            variant="ghost"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Triangle Colors
          </h2>
        </template>
        <p class="text-sm text-muted mb-4">
          Customize triangle color via the <code>triangle-color</code> prop.
        </p>
        <div class="flex flex-wrap gap-4">
          <MClipCornersButton
            label="Default (bg color)"
            color="primary"
          />
          <MClipCornersButton
            label="Red Triangles"
            color="primary"
            triangle-color="#ef4444"
          />
          <MClipCornersButton
            label="Blue Triangles"
            color="primary"
            triangle-color="#3b82f6"
          />
          <MClipCornersButton
            label="Gold Triangles"
            color="primary"
            triangle-color="#eab308"
          />
          <MClipCornersButton
            label="White Triangles"
            color="primary"
            triangle-color="#ffffff"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Sizes
          </h2>
        </template>
        <div class="flex items-center gap-4">
          <MClipCornersButton
            label="Extra Small"
            color="primary"
            size="xs"
          />
          <MClipCornersButton
            label="Small"
            color="primary"
            size="sm"
          />
          <MClipCornersButton
            label="Default"
            color="primary"
          />
          <MClipCornersButton
            label="Large"
            color="primary"
            size="lg"
          />
          <MClipCornersButton
            label="Extra Large"
            color="primary"
            size="xl"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            With Icons
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MClipCornersButton
            label="Download"
            color="primary"
            icon="i-heroicons-arrow-down-tray"
          />
          <MClipCornersButton
            label="Delete"
            color="error"
            icon="i-heroicons-trash"
          />
          <MClipCornersButton
            label="Settings"
            color="secondary"
            trailing-icon="i-heroicons-cog-6-tooth"
          />
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">
            Slot Content
          </h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <MClipCornersButton color="primary">
            <span class="font-semibold">Custom</span> Content
          </MClipCornersButton>
          <MClipCornersButton color="success">
            <span class="flex items-center gap-1">
              <span class="i-heroicons-check" />
              Approved
            </span>
          </MClipCornersButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
