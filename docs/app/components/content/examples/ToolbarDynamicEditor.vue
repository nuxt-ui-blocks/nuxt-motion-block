<template>
  <div class="relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-default bg-muted/20">
    <p class="p-6 text-sm text-muted">
      Press the toolbar button to reveal the quick actions.
    </p>

    <div class="absolute inset-x-0 bottom-6 flex justify-center">
      <MToolbarDynamic width="360px">
        <UButton
          variant="ghost"
          size="sm"
          square
          icon="i-lucide-plus"
        />
        <template #expanded>
          <div class="flex items-center gap-2">
            <UButton
              variant="ghost"
              size="sm"
              square
              icon="i-lucide-image"
            />
            <UButton
              variant="ghost"
              size="sm"
              square
              icon="i-lucide-link"
            />
            <UButton
              variant="ghost"
              size="sm"
              square
              icon="i-lucide-list"
            />
            <span class="mx-1 h-5 w-px bg-default" />
            <UButton
              variant="ghost"
              size="sm"
              square
              icon="i-lucide-undo-2"
            />
            <UButton
              variant="ghost"
              size="sm"
              square
              icon="i-lucide-redo-2"
            />
          </div>
        </template>
      </MToolbarDynamic>
    </div>
  </div>
</template>
