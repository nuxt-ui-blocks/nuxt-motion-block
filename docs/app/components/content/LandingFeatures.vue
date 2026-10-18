<script setup lang="ts">
const features = [
  {
    icon: 'i-lucide-palette',
    title: 'Theme-aware by default',
    desc: 'Components read your Nuxt UI colors and design tokens, so switching themes flows through every animation without overrides.',
  },
  {
    icon: 'i-lucide-zap',
    title: 'Powered by Motion for Vue',
    desc: 'Springs, gestures, and orchestration come from Motion for Vue, the engine behind some of the smoothest interfaces on the web.',
  },
  {
    icon: 'i-lucide-accessibility',
    title: 'Accessible without asking',
    desc: 'Reduced-motion preferences are honored, markup stays semantic, and keyboard and screen-reader users get the full experience.',
  },
  {
    icon: 'i-lucide-code-2',
    title: 'TypeScript-first API',
    desc: 'Props, slots, and events are typed end to end, with sensible defaults and a ui prop for when you need to reach deeper.',
  },
]

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}
</script>

<template>
  <div class="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
    <div class="lg:sticky lg:top-24 lg:self-start">
      <span class="text-sm font-medium uppercase tracking-widest text-primary">Why Motion Block</span>
      <h2 class="mt-3 text-3xl font-semibold tracking-tight text-highlighted text-pretty sm:text-4xl">
        Everything you need to ship motion
      </h2>
      <p class="mt-4 text-lg text-muted">
        Built on Nuxt UI and Motion for Vue, so components inherit your theme, respect your design tokens, and stay accessible by default.
      </p>
    </div>

    <div class="divide-y divide-default/70 border-y border-default/70">
      <MInView
        v-for="feature in features"
        :key="feature.title"
        :variants="variants"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
      >
        <div class="group flex gap-5 py-6 transition duration-300 hover:translate-x-0.5">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl border border-default/70 bg-elevated/50">
            <UIcon
              :name="feature.icon"
              class="size-5 text-primary"
            />
          </div>
          <div>
            <h3 class="text-lg font-medium text-highlighted">
              {{ feature.title }}
            </h3>
            <p class="mt-1 text-muted">
              {{ feature.desc }}
            </p>
          </div>
        </div>
      </MInView>
    </div>
  </div>
</template>
