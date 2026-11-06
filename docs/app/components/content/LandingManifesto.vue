<template>
  <section class="border-y border-default">
    <div class="mx-auto w-full max-w-(--ui-container) px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <LandingEyebrow
        index="01"
        label="Why this exists"
      />

      <div class="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        <p class="max-w-3xl font-display text-3xl leading-[1.15] tracking-tight text-highlighted text-pretty sm:text-4xl lg:text-[3.25rem]">
          We kept rebuilding the same eleven animations — the spotlight, the magnetic button, the headline that resolves out of noise.
          One project at a time, until it seemed silly to start over.
          <span class="text-muted">So we packaged them: typed, themed, accessible, MIT.</span>
        </p>

        <div class="flex flex-col gap-4 lg:border-l lg:border-default lg:pl-8">
          <p class="text-sm leading-relaxed text-muted">
            Start with one. You'll end up using twelve.
          </p>
          <p class="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-dimmed">
            No runtime styles to port, no Figma file to chase.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
