<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-highlighted mb-2">
      Motion dialog
    </h1>
    <p class="text-muted mb-6">
      UModal extended with motion-v scale/opacity morphing animations.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Basic -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Basic Dialog
          </h2>
        </template>
        <MAnimatedDialog>
          <UButton
            label="Open Dialog"
            color="primary"
          />
          <template #body>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">
                Basic Dialog
              </h3>
              <p class="text-muted mb-4">
                Opens with motion-v animations.
              </p>
              <UButton
                label="Action"
                color="primary"
                variant="outline"
                size="sm"
              />
            </div>
          </template>
        </MAnimatedDialog>
      </UCard>

      <!-- Custom Scale -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Custom Scale
          </h2>
        </template>
        <MAnimatedDialog :scale="0.8">
          <UButton
            label="Strong Morph"
            color="secondary"
          />
          <template #body>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">
                Strong Morphing
              </h3>
              <p class="text-muted">
                Stronger motion-v morphing effect.
              </p>
            </div>
          </template>
        </MAnimatedDialog>
      </UCard>

      <!-- Custom Variants -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Custom Variants
          </h2>
        </template>
        <MAnimatedDialog
          :variants="customVariants"
          :transition-options="customTransition"
        >
          <UButton
            label="Tailored motion"
            color="warning"
          />
          <template #body>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">
                Tailored motion
              </h3>
              <p class="text-muted">
                Custom variants and transition props.
              </p>
            </div>
          </template>
        </MAnimatedDialog>
      </UCard>

      <!-- Rotate -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Rotate Animation
          </h2>
        </template>
        <MAnimatedDialog
          :variants="rotateVariants"
          :transition-options="{ type: 'spring', stiffness: 200, damping: 15 }"
        >
          <UButton
            label="Rotate Dialog"
            color="info"
          />
          <template #body>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">
                Rotate Animation
              </h3>
              <p class="text-muted">
                Rotates while animating.
              </p>
            </div>
          </template>
        </MAnimatedDialog>
      </UCard>

      <!-- Header + Footer -->
      <UCard class="md:col-span-2">
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Header and Footer
          </h2>
        </template>
        <MAnimatedDialog
          title="Dialog with Header and Footer"
          description="Custom header and footer slots"
        >
          <UButton
            label="Open Complex Dialog"
            color="primary"
          />
          <template #body>
            <div class="p-4">
              <p class="text-muted">
                Main content of the dialog. Can contain any Vue components or HTML.
              </p>
              <div class="mt-4 p-4 bg-muted rounded-lg">
                <p>You can include forms, images, or any other content here.</p>
              </div>
            </div>
          </template>
          <template #footer="{ close }">
            <div class="flex gap-2">
              <UButton
                label="Cancel"
                color="neutral"
                variant="outline"
                @click="close"
              />
              <UButton
                label="Confirm"
                color="primary"
                @click="close"
              />
            </div>
          </template>
        </MAnimatedDialog>
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
