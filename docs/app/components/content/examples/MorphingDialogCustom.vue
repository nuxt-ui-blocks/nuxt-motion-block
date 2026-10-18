<template>
  <div class="flex w-full justify-center">
    <MMorphingDialog layout-id>
      <MMorphingDialogTrigger class="w-64 overflow-hidden rounded-2xl border bg-elevated text-left">
        <div class="h-28 bg-gradient-to-br from-primary to-secondary" />
        <div class="flex items-center gap-3 p-4">
          <span class="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-inverted">
            AM
          </span>
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold">
              Ada Lovelace
            </p>
            <p class="truncate text-xs text-muted">
              Mathematician
            </p>
          </div>
        </div>
      </MMorphingDialogTrigger>

      <template #content="{ close }">
        <div class="w-full">
          <div class="h-40 bg-gradient-to-br from-primary to-secondary" />
          <div class="flex flex-col gap-4 p-6">
            <div class="flex items-center gap-3">
              <div class="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-inverted">
                AL
              </div>
              <div>
                <p class="text-base font-semibold">
                  Ada Lovelace
                </p>
                <p class="text-sm text-muted">
                  Mathematician · London
                </p>
              </div>
            </div>
            <p class="text-sm text-muted">
              The dialog shares the trigger's layout id, so it grows out of the card
              instead of fading in.
            </p>
            <div class="flex justify-end gap-2">
              <UButton
                label="Close"
                color="neutral"
                variant="outline"
                @click="close"
              />
            </div>
          </div>
        </div>
      </template>
    </MMorphingDialog>
  </div>
</template>
