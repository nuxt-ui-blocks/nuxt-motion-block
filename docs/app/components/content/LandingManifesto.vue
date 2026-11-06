<script setup lang="ts">
const stats = [
  { value: '292', label: 'components, all typed' },
  { value: '800+', label: 'working examples' },
  { value: '17', label: 'families to steal from' },
  { value: 'MIT', label: 'no strings attached' },
]
</script>

<template>
  <section
    id="problem"
    class="relative isolate overflow-hidden bg-[#141412] text-[#f4f1ea]"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 bg-grid-ink opacity-60"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#e4572e] opacity-[0.07] blur-[140px]"
    />

    <div class="mb-shell relative py-20 sm:py-24 lg:py-28">
      <div class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#a9a79e]">
        <span class="text-[#f06a3c]">01</span>
        <span
          aria-hidden="true"
          class="h-px w-8 bg-[#f06a3c]/60"
        />
        The problem
      </div>

      <div class="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <h2 class="display-tight max-w-4xl font-display text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.02] text-[#f4f1ea] lg:col-span-9">
          Every team rebuilds<br>
          the same <span class="text-[#f06a3c]">eleven</span><br>
          animations.
        </h2>

        <div class="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-6">
          <p class="text-lg leading-relaxed text-[#c9c7bd] text-pretty">
            The spotlight, the magnetic button, the headline that resolves out of noise —
            once per project, until it seemed silly to start over.
          </p>
          <p class="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#8a887f]">
            So we packaged them.<br>
            Typed. Themed.<br>
            MIT.
          </p>
        </div>
      </div>

      <div class="mt-16 grid grid-cols-2 gap-y-10 border-t border-white/10 pt-10 sm:grid-cols-4 sm:gap-y-0">
        <div
          v-for="stat in stats"
          :key="stat.label"
        >
          <p class="font-display text-4xl leading-none tabular-nums text-[#f4f1ea] sm:text-6xl">
            {{ stat.value }}
          </p>
          <p class="mt-3 max-w-[10rem] text-xs leading-snug text-[#a9a79e]">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
