<template>
  <div class="w-full max-w-md rounded-2xl border border-default p-6 text-sm leading-relaxed text-highlighted">
    <p>
      Animation primitives usually animate
      <MAiCitation
        label="1"
        title="Spring defaults"
        url="https://motion-primitives.com"
        description="The easing and stiffness values that every component in this kit falls back to when you do not pass your own."
      >
        <template #favicon>
          <UIcon name="i-lucide-sparkles" />
        </template>
      </MAiCitation>
      on first paint and then never touch
      <MAiCitation
        label="2"
        title="Interruptible by default"
        url="https://motion.dev/docs/react-motion"
      />
      again. The same rules hold for
      <MAiCitation
        label="3"
        title="Reduced motion"
        url="https://motion-primitives.com/docs/accessibility"
        description="Every primitive in this kit reads prefers-reduced-motion and falls back to an instant state change."
      />
      .
    </p>

    <p class="mt-4 text-xs text-muted">
      Hover or focus a pill to peek. Press Escape to dismiss.
    </p>
  </div>
</template>

<script setup lang="ts">
</script>
