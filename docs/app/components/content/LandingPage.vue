<template>
  <div class="overflow-x-clip">
    <LandingHero />

    <LandingMarquee />

    <section class="mx-auto w-full max-w-(--ui-container) px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <LandingStats />
    </section>

    <section class="mx-auto w-full max-w-(--ui-container) px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <LandingAi />
    </section>

    <section class="mx-auto w-full max-w-(--ui-container) px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-semibold tracking-tight text-highlighted text-pretty sm:text-4xl">
          Live components, not screenshots
        </h2>
        <p class="mt-4 text-lg text-muted">
          Every tile below is running on this page right now. Hover, click, and scroll the real thing.
        </p>
      </div>

      <div class="mt-12">
        <LandingShowcase />
      </div>
    </section>

    <section class="mx-auto w-full max-w-(--ui-container) px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <LandingFeatures />
    </section>

    <section class="mx-auto w-full max-w-(--ui-container) px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <LandingNewBand />
    </section>

    <section class="mx-auto w-full max-w-(--ui-container) px-4 pb-24 pt-4 sm:px-6 lg:px-8">
      <LandingCta />
    </section>
  </div>
</template>
