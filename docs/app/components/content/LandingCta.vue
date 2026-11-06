<script setup lang="ts">
</script>

<template>
  <section
    id="install"
    class="relative isolate overflow-hidden bg-[#e4572e] text-[#141412]"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 opacity-[0.16]"
      style="background-image: repeating-linear-gradient(-45deg, #141412 0 2px, transparent 2px 26px)"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -right-32 top-[-30%] h-[640px] w-[640px] rounded-full bg-[#141412] opacity-[0.08] blur-[140px]"
    />

    <div class="mb-shell relative py-20 sm:py-24 lg:py-28">
      <div class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#141412]/75">
        <span>06</span>
        <span
          aria-hidden="true"
          class="h-px w-8 bg-[#141412]/60"
        />
        The install
      </div>

      <h2 class="display-tight mt-8 font-display text-[clamp(3rem,11vw,7.5rem)] font-semibold leading-[0.92] text-[#141412]">
        Make something<br>
        that moves.
      </h2>

      <div class="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
        <p class="max-w-md text-xl leading-snug text-[#141412]/85 lg:col-span-5">
          One install, then the components are yours — your theme, your tokens, your taste.
        </p>

        <div class="lg:col-span-4">
          <InstallCommand class="drop-shadow-[0_20px_32px_rgb(20_20_18/0.35)]" />
          <p class="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#141412]/70">
            MIT — peers install themselves
          </p>
        </div>

        <div class="flex flex-col gap-3 lg:col-span-3 lg:items-end">
          <UButton
            to="/getting-started"
            size="xl"
            class="w-full justify-center rounded-md bg-[#141412] font-medium text-[#f4f1ea] hover:bg-[#000000]"
            trailing-icon="i-lucide-arrow-right"
          >
            Start building
          </UButton>
          <UButton
            to="https://github.com/nuxt-ui-blocks/nuxt-motion-block"
            target="_blank"
            size="xl"
            class="w-full justify-center rounded-md border-2 border-[#141412] bg-transparent font-medium text-[#141412] hover:bg-[#141412] hover:text-[#f4f1ea]"
            icon="i-simple-icons-github"
            variant="ghost"
          >
            View source
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
