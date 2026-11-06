<template>
  <div class="overflow-x-clip">
    <LandingHero />

    <LandingMarquee />

    <LandingManifesto />

    <section class="mx-auto w-full max-w-(--ui-container) px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <LandingStats />
    </section>

    <section class="dark relative isolate overflow-hidden border-y border-white/10 bg-default">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(16,185,129,0.16),transparent_60%)]"
      />
      <div class="relative mx-auto w-full max-w-(--ui-container) px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <LandingAi />
      </div>
    </section>

    <section class="mx-auto w-full max-w-(--ui-container) px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-xl">
          <LandingEyebrow
            index="03"
            label="Live"
          />
          <h2 class="mt-5 text-3xl font-semibold tracking-tight text-highlighted text-pretty sm:text-4xl">
            Live components, not screenshots
          </h2>
          <p class="mt-4 text-lg text-muted text-pretty">
            Every tile below is running on this page right now. Hover, click and scroll the real thing.
          </p>
        </div>

        <NuxtLink
          to="/components"
          class="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition hover:text-primary"
        >
          All 292 components
          <UIcon
            name="i-lucide-arrow-right"
            class="size-3.5 transition group-hover:translate-x-0.5"
          />
        </NuxtLink>
      </div>

      <div class="mt-10">
        <LandingShowcase />
      </div>
    </section>

    <section class="mx-auto w-full max-w-(--ui-container) px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <LandingFeatures />
    </section>

    <LandingNewBand />

    <section class="mx-auto w-full max-w-(--ui-container) px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <LandingCta />
    </section>
  </div>
</template>
