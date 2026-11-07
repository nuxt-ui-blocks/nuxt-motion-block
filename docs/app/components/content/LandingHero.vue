<script setup lang="ts">
</script>

<template>
  <section class="relative overflow-hidden">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -z-10 bg-grid-paper"
    />

    <div class="mb-shell flex min-h-[calc(100svh-4rem)] items-center py-12 sm:py-16 lg:py-8">
      <div class="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-6 xl:col-span-6">
          <p class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dimmed">
            <span class="h-[3px] w-8 rounded-full bg-primary" />
            Nuxt Motion — v0.2
          </p>

          <h1
            aria-label="Motion components for Nuxt UI"
            class="display-tight mt-6 font-display text-[#141412] text-[clamp(2.9rem,9vw,6.2rem)] font-semibold leading-[0.98] text-highlighted dark:text-[#f4f1ea]"
          >
            Motion components,<br>
            for Nuxt UI.
          </h1>

          <p class="mt-6 max-w-md text-lg leading-relaxed text-muted text-pretty">
            292 animated Vue components, typed end to end and wired into your
            Nuxt UI tokens. Springs, staggers, scroll and 3D — one install away.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <UButton
              to="/getting-started"
              size="xl"
              class="font-medium"
              trailing-icon="i-lucide-arrow-right"
            >
              Start building
            </UButton>
            <UButton
              to="https://github.com/nuxt-ui-blocks/nuxt-motion-block"
              target="_blank"
              size="xl"
              color="neutral"
              variant="outline"
              icon="i-simple-icons-github"
            >
              GitHub
            </UButton>
          </div>

          <div class="mt-7 max-w-md">
            <InstallCommand />
          </div>

          <p class="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-dimmed">
            292 components
            <span
              aria-hidden="true"
              class="mx-2 text-primary"
            >/</span>
            800+ examples
            <span
              aria-hidden="true"
              class="mx-2 text-primary"
            >/</span>
            17 families
            <span
              aria-hidden="true"
              class="mx-2 text-primary"
            >/</span>
            MIT
          </p>
        </div>

        <div class="relative lg:col-span-6">
          <LandingHeroPanel />
          <p class="mt-4 hidden justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-dimmed sm:flex">
            <span>Live from the kit</span>
            <span>No mocks — 292 of them</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
