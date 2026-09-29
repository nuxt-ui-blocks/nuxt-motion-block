<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-highlighted mb-2">
      Morphing Dialog
    </h1>
    <p class="text-muted mb-6">
      Compound component with layout morph animations between trigger and content.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Basic -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Basic Morphing Dialog
          </h2>
        </template>
        <MMorphingDialog>
          <MMorphingDialogTrigger>
            <UButton
              label="Open Dialog"
              color="primary"
            />
          </MMorphingDialogTrigger>
          <template #content="{ close }">
            <div class="w-[400px] rounded-2xl bg-default p-6 shadow-2xl">
              <h2 class="text-xl font-bold mb-2">
                Morphing Dialog
              </h2>
              <p class="text-muted mb-4">
                Morphs from the trigger button using layout animations. Click outside or press Escape to close.
              </p>
              <UButton
                label="Close"
                color="neutral"
                variant="outline"
                @click="close"
              />
            </div>
          </template>
        </MMorphingDialog>
      </UCard>

      <!-- Card Morphing -->
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold text-highlighted">
            Card Morphing Dialog
          </h2>
        </template>
        <MMorphingDialog>
          <MMorphingDialogTrigger>
            <div class="rounded-xl border border-default p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 class="font-bold text-highlighted">
                Card Title
              </h3>
              <p class="text-sm text-muted">
                Click to expand
              </p>
            </div>
          </MMorphingDialogTrigger>
          <template #content="{ close }">
            <div class="w-[500px] rounded-2xl bg-default shadow-2xl overflow-hidden">
              <img
                src="https://picsum.photos/500/200"
                alt="Cover"
                class="w-full h-48 object-cover"
              >
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-2 text-highlighted">
                  Card Title
                </h2>
                <p class="text-muted mb-4">
                  Subtitle text
                </p>
                <p class="text-muted">
                  This dialog morphs from a card shape into a larger dialog using layout animations.
                </p>
              </div>
              <div class="flex justify-end p-4">
                <UButton
                  label="Close"
                  color="neutral"
                  variant="outline"
                  @click="close"
                />
              </div>
            </div>
          </template>
        </MMorphingDialog>
      </UCard>
    </div>
  </div>
</template>
