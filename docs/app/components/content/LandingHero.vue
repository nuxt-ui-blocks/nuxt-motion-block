<script setup lang="ts">
const badgeWords = ['spotlights', 'beams', 'magnetic buttons', 'kinetic text', '3D cards']

let order = 0
const lines = ['Motion components', 'for Nuxt UI'].map(line =>
  line.split(' ').map(word => ({ word, i: order++ })),
)
</script>

<template>
  <section class="relative isolate overflow-hidden">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -z-10"
    >
      <ClientOnly>
        <MBackgroundBeams
          class="h-full w-full"
          :num-paths="16"
          :stroke-opacity="0.45"
          :gradient-colors="['primary', 'primary', 'primary', 'primary']"
        />
      </ClientOnly>
      <div class="absolute left-1/2 top-[-14%] h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-primary opacity-[0.14] blur-[130px]" />
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-default" />
      <div class="absolute inset-0 bg-gradient-to-r from-default via-transparent to-default" />
    </div>

    <div class="mx-auto w-full max-w-(--ui-container) px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
      <div class="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div class="max-w-xl">
          <div class="inline-flex h-7 items-center gap-2 rounded-full border border-default/70 bg-elevated/40 px-3 text-xs font-medium text-muted backdrop-blur">
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
              <span class="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span class="leading-4">Live</span>
            <MWordRotate
              :words="badgeWords"
              :duration="2600"
              :pause-duration="600"
              container-class="inline-flex h-4 w-[7.25rem] items-center overflow-hidden"
              class="text-highlighted"
              animation-style="slide-up"
            />
          </div>

          <h1
            aria-label="Motion components for Nuxt UI"
            class="mt-6 flex flex-col items-start gap-y-1 font-serif text-[2.75rem] leading-[1.03] text-highlighted sm:text-6xl xl:text-7xl"
          >
            <span
              v-for="(line, li) in lines"
              :key="li"
              aria-hidden="true"
              class="flex flex-wrap items-end gap-x-[0.28em]"
            >
              <span
                v-for="item in line"
                :key="item.word"
                class="hero-word"
                :style="{ '--word-index': item.i }"
              >{{ item.word }}</span>
            </span>
          </h1>

          <p class="mt-6 max-w-xl text-lg text-muted text-pretty">
            292 animated Vue components that inherit your Nuxt UI theme. Springs, staggers, scroll and 3D that feel designed, not bolted on.
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
              size="xl"
              color="neutral"
              variant="outline"
              icon="i-simple-icons-github"
            >
              GitHub
            </UButton>
          </div>

          <div class="mt-5">
            <InstallCommand />
          </div>
        </div>

        <LandingHeroPanel class="lg:pl-4" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-word {
  display: inline-block;
  animation: hero-word-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(0.12s + var(--word-index, 0) * 0.07s);
}

@keyframes hero-word-in {
  from {
    opacity: 0;
    transform: translateY(0.5em);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-word {
    animation: none;
  }
}
</style>
