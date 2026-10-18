<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-highlighted mb-2">
      Shape-shift popover
    </h1>
    <p class="text-muted mb-6">
      UPopover extended with motion-v scale/opacity morphing animations.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Click Mode -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Click Mode
          </h2>
        </template>
        <MMorphingPopover
          mode="click"
          :scale="0.95"
        >
          <UButton
            label="Open Click Popover"
            color="primary"
          />
          <template #content>
            <div class="p-4 w-64">
              <h3 class="text-lg font-semibold mb-2">
                Click Popover
              </h3>
              <p class="text-muted mb-4">
                Opens on click with motion-v animations.
              </p>
              <UButton
                label="Action"
                color="primary"
                variant="outline"
                size="sm"
              />
            </div>
          </template>
        </MMorphingPopover>
      </UCard>

      <!-- Hover Mode -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Hover Mode
          </h2>
        </template>
        <MMorphingPopover
          mode="hover"
          :open-delay="300"
          :close-delay="200"
          :scale="0.95"
        >
          <UButton
            label="Hover Over Me"
            color="success"
          />
          <template #content>
            <div class="p-4 w-64">
              <h3 class="text-lg font-semibold mb-2">
                Hover Popover
              </h3>
              <p class="text-muted">
                Opens on hover with motion-v animations.
              </p>
            </div>
          </template>
        </MMorphingPopover>
      </UCard>

      <!-- Custom Scale -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Custom Scale
          </h2>
        </template>
        <MMorphingPopover
          mode="click"
          :scale="0.9"
        >
          <UButton
            label="Strong Morph"
            color="secondary"
          />
          <template #content>
            <div class="p-4 w-64">
              <h3 class="text-lg font-semibold mb-2">
                Strong Morphing
              </h3>
              <p class="text-muted">
                Stronger motion-v morphing effect.
              </p>
            </div>
          </template>
        </MMorphingPopover>
      </UCard>

      <!-- Custom Variants -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Custom Variants
          </h2>
        </template>
        <MMorphingPopover
          mode="click"
          :variants="customVariants"
          :transition="customTransition"
        >
          <UButton
            label="Tailored motion"
            color="warning"
          />
          <template #content>
            <div class="p-4 w-64">
              <h3 class="text-lg font-semibold mb-2">
                Tailored motion
              </h3>
              <p class="text-muted">
                Custom variants and transition props.
              </p>
            </div>
          </template>
        </MMorphingPopover>
      </UCard>

      <!-- Rotate -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Rotate Animation
          </h2>
        </template>
        <MMorphingPopover
          mode="click"
          :variants="rotateVariants"
          :transition="{ type: 'spring', stiffness: 200, damping: 15 }"
        >
          <UButton
            label="Rotate Popover"
            color="info"
          />
          <template #content>
            <div class="p-4 w-64">
              <h3 class="text-lg font-semibold mb-2">
                Rotate Animation
              </h3>
              <p class="text-muted">
                Rotates while morphing in.
              </p>
            </div>
          </template>
        </MMorphingPopover>
      </UCard>

      <!-- Control -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Nuxt UI Popover (Control)
          </h2>
        </template>
        <UPopover mode="click">
          <UButton
            label="Open Control"
            color="neutral"
            variant="subtle"
          />
          <template #content>
            <div class="p-4">
              Control Popover Content
            </div>
          </template>
        </UPopover>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const customVariants = {
  initial: { opacity: 0, scale: 0.5, rotate: -15 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0.5, rotate: 15 },
}

const customTransition = {
  type: 'spring' as const,
  bounce: 0.2,
  duration: 0.5,
}

const rotateVariants = {
  initial: { opacity: 0, scale: 0.8, rotate: -90 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0.8, rotate: 90 },
}
</script>
