<template>
  <div class="flex w-full max-w-lg flex-col items-center gap-6">
    <div class="flex flex-wrap items-center justify-center gap-3">
      <MAnimatedTooltip
        text="Copied to clipboard"
        :delay-duration="200"
      >
        <UButton
          icon="i-lucide-copy"
          label="Copy link"
          color="neutral"
          variant="outline"
        />
      </MAnimatedTooltip>

      <MAnimatedTooltip
        text="Save this build"
        :kbds="['⌘', 'S']"
      >
        <UButton
          icon="i-lucide-save"
          label="Save"
          color="neutral"
          variant="outline"
        />
      </MAnimatedTooltip>

      <MAnimatedTooltip
        :delay-duration="200"
        :disabled="disabled"
      >
        <UButton
          icon="i-lucide-rocket"
          label="Deploy"
        />
        <template #content>
          <div class="max-w-56 space-y-1">
            <p class="font-medium text-white">
              Deploy to production
            </p>
            <p class="text-white/70">
              Builds on the edge, then swaps traffic once the health check passes.
            </p>
          </div>
        </template>
      </MAnimatedTooltip>
    </div>

    <USwitch
      v-model="disabled"
      label="Disable the deploy tooltip"
    />
  </div>
</template>

<script setup lang="ts">
const disabled = ref(false)
</script>
