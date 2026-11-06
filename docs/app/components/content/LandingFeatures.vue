<script setup lang="ts">
const features = [
  {
    title: 'Theme-aware by default',
    desc: 'Swap your Nuxt UI palette and every animation follows. No overrides, no second design system.',
  },
  {
    title: 'Motion for Vue inside',
    desc: 'Springs, gestures and orchestration come from motion-v — the same engine behind the smoothest interfaces on the web.',
  },
  {
    title: 'Accessible without asking',
    desc: 'Reduced motion is honored, markup stays semantic, and keyboard and screen-reader users get the whole thing.',
  },
  {
    title: 'Typed end to end',
    desc: 'Props, slots and events are typed, with sensible defaults and a ui prop for when you need to reach deeper.',
  },
]

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
</script>

<template>
  <div class="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
    <div class="lg:sticky lg:top-24 lg:self-start">
      <div class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dimmed">
        <span class="text-primary">04</span>
        <span
          aria-hidden="true"
          class="h-px w-8 bg-primary/50"
        />
        The parts
      </div>
      <h2 class="display-tight mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.0] text-highlighted text-pretty">
        The parts you'd rather not rebuild.
      </h2>
      <p class="mt-5 max-w-md text-lg leading-relaxed text-muted text-pretty">
        Each component is a Nuxt UI primitive with motion bolted on properly — inheriting your tokens, honoring reduced-motion, and typed before you reach for the docs.
      </p>

      <div class="mt-8">
        <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-dimmed">
          One install
        </p>
        <div class="mt-3">
          <InstallCommand />
        </div>
        <p class="mt-3 text-xs text-muted">
          Peer deps install themselves. No config, no plugin order to remember.
        </p>
      </div>
    </div>

    <ul class="border-t border-line">
      <MInView
        v-for="(feature, index) in features"
        :key="feature.title"
        :variants="variants"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        as="li"
      >
        <div class="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-7 transition-colors duration-300 sm:grid-cols-[3rem_1fr]">
          <span class="pt-1 font-mono text-[12px] tabular-nums tracking-widest text-dimmed transition-colors group-hover:text-primary">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <div>
            <h3 class="text-lg font-medium leading-snug text-highlighted">
              {{ feature.title }}
            </h3>
            <p class="mt-1.5 text-muted text-pretty">
              {{ feature.desc }}
            </p>
          </div>
        </div>
      </MInView>
    </ul>
  </div>
</template>
