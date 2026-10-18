<template>
  <div class="grid h-full w-full place-items-center">
    <div class="flex flex-wrap items-center justify-center gap-3 px-4">
      <MAnimatedTooltip
        text="Copied to clipboard"
        :delay-duration="150"
      >
        <UButton
          icon="i-lucide-copy"
          label="Copy"
          color="neutral"
          variant="outline"
        />
      </MAnimatedTooltip>

      <MAnimatedTooltip
        text="Saved to drafts"
        :delay-duration="150"
      >
        <UButton
          icon="i-lucide-save"
          label="Save"
          color="neutral"
          variant="outline"
        />
      </MAnimatedTooltip>
    </div>
  </div>
</template>
