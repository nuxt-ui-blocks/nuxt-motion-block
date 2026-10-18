<template>
  <div class="flex w-full max-w-md justify-center">
    <div class="flex flex-col items-center gap-6">
      <MMorphingDialog layout-id>
        <MMorphingDialogTrigger class="rounded-lg bg-primary px-4 py-2 text-inverted">
          Open Dialog
        </MMorphingDialogTrigger>
        <template #content="{ close }">
          <div class="flex flex-col gap-4 p-6">
            <h3 class="text-lg font-semibold">
              Shape-shift dialog
            </h3>
            <p class="text-sm text-muted">
              This dialog morphs from its trigger with a smooth layout animation.
            </p>
            <div class="flex justify-end">
              <UButton
                label="Close"
                @click="close"
              />
            </div>
          </div>
        </template>
      </MMorphingDialog>
    </div>
  </div>
</template>
