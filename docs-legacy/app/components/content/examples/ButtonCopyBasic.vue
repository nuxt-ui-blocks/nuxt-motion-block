<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex flex-col gap-2">
      <span class="text-sm font-medium text-highlighted">
        Install command
      </span>
      <div class="flex items-center justify-between gap-3 rounded-xl border border-default px-4 py-3">
        <code class="font-mono text-xs text-muted">npx nuxi module add nuxt-motion-block</code>
        <MButtonCopy
          text="npx nuxi module add nuxt-motion-block"
          size="sm"
          variant="soft"
        >
          Copy
        </MButtonCopy>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm font-medium text-highlighted">
        Package name — no slot, so <code>text</code> becomes the label
      </span>
      <div class="flex items-center justify-between gap-3 rounded-xl border border-default px-4 py-3">
        <code class="font-mono text-xs text-muted">nuxt-motion-block</code>
        <MButtonCopy
          text="nuxt-motion-block"
          :copied-duration="5000"
          size="sm"
          variant="soft"
        />
      </div>
    </div>
  </div>
</template>
