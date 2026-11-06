<template>
  <div class="relative isolate overflow-hidden rounded-2xl border border-default bg-elevated/20">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(16,185,129,0.14),transparent_60%)]"
    />

    <div class="relative z-10 px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
      <div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-center lg:gap-16">
        <div>
          <LandingEyebrow
            index="06"
            label="Start"
          />

          <h2 class="mt-5 max-w-xl font-display text-4xl leading-[1.05] text-highlighted text-pretty sm:text-5xl lg:text-6xl">
            Make something that moves
          </h2>

          <p class="mt-5 max-w-md text-lg text-muted text-pretty">
            One install, then the components are yours — your theme, your tokens, your taste.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <MMagnetic>
              <UButton
                to="/getting-started"
                size="xl"
                trailing-icon="i-lucide-arrow-right"
              >
                Get started
              </UButton>
            </MMagnetic>
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

        <div>
          <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-dimmed">
            Install
          </p>
          <InstallCommand class="mt-3" />
          <p class="mt-3 text-xs leading-relaxed text-muted">
            Peers: <code class="font-mono text-[11px] text-dimmed">@nuxt/ui</code> and
            <code class="font-mono text-[11px] text-dimmed">motion-v</code>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
