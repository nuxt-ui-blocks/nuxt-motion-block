<script setup lang="ts">
const beams = [
  { initialX: 120, translateX: 120, duration: 8, repeatDelay: 4, delay: 1 },
  { initialX: 420, translateX: 420, duration: 5, repeatDelay: 5, className: 'h-10' },
  { initialX: 720, translateX: 720, duration: 7, repeatDelay: 4, delay: 2, className: 'h-16' },
  { initialX: 980, translateX: 980, duration: 6, repeatDelay: 6, className: 'h-8' },
]
</script>

<template>
  <div class="relative isolate overflow-hidden rounded-3xl border border-default/70 bg-elevated/20">
    <MCollisionBackgroundBeams
      style="position: absolute; inset: 0; height: auto; z-index: 0; background-image: none"
      :beams="beams"
    />

    <div class="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

    <div class="relative z-10 px-6 py-20 text-center sm:px-12 sm:py-28">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-4xl font-semibold tracking-tight text-highlighted text-pretty sm:text-5xl">
          Put your interface in motion
        </h2>

        <p class="mt-5 text-lg text-muted text-pretty">
          Install Motion Block, drop in a component, and watch your Nuxt UI app come alive. No configuration, no lock-in.
        </p>

        <div class="mt-9 flex flex-wrap items-center justify-center gap-4">
          <UButton
            to="/getting-started"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
          >
            Get started
          </UButton>
          <UButton
            to="https://github.com/nuxt-ui-blocks/nuxt-motion-block"
            target="_blank"
            color="neutral"
            variant="outline"
            size="xl"
            icon="i-simple-icons-github"
          >
            View on GitHub
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
