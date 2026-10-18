<script setup lang="ts">
import { Motion } from 'motion-v'
</script>

<template>
  <div class="relative mx-auto w-full max-w-md">
    <div
      aria-hidden="true"
      class="absolute -inset-8 rounded-[2.5rem] bg-primary/10 blur-3xl"
    />

    <Motion
      class="relative overflow-hidden rounded-3xl border border-default/70 bg-elevated/40 shadow-2xl backdrop-blur"
      :initial="{ opacity: 0, y: 24, scale: 0.97 }"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :transition="{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }"
    >
      <div class="flex items-center gap-2 border-b border-default/60 px-3 py-2.5">
        <span class="size-2.5 rounded-full bg-red-400/60" />
        <span class="size-2.5 rounded-full bg-amber-400/60" />
        <span class="size-2.5 rounded-full bg-emerald-400/60" />
        <span class="ml-2 font-mono text-xs text-dimmed">App.vue</span>
        <span class="ml-auto rounded-full border border-default/60 px-2 py-0.5 text-[10px] font-medium text-dimmed">Nuxt</span>
      </div>

      <div class="relative flex h-44 items-center justify-center overflow-hidden bg-default/40">
        <div
          aria-hidden="true"
          class="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_center,var(--ui-border)_1px,transparent_1px)] [background-size:16px_16px]"
        />
        <MTilt
          :rotation-factor="18"
          class="relative"
        >
          <div class="rounded-xl border border-default/70 bg-elevated/80 px-8 py-6 text-center shadow-xl">
            <div class="text-sm font-medium text-highlighted">
              Hover to tilt
            </div>
            <div class="mt-1 text-xs text-dimmed">
              follows your cursor
            </div>
          </div>
        </MTilt>
      </div>

      <div class="border-t border-default/60 bg-default/60 px-3 py-3">
        <div class="grid grid-cols-[1.25rem_1fr] gap-x-3 text-[11px] leading-relaxed">
          <span class="select-none text-right text-dimmed/60">1</span>
          <code class="whitespace-pre text-muted"><span class="text-cyan-300">&lt;MTilt</span> <span class="text-sky-300">:rotation-factor</span>=<span class="text-emerald-300">"18"</span><span class="text-cyan-300">&gt;</span></code>

          <span class="text-right text-dimmed/60 select-none">2</span>
          <code class="whitespace-pre text-muted">  <span class="text-cyan-300">&lt;UButton&gt;</span>Hover me<span class="text-cyan-300">&lt;/UButton&gt;</span></code>

          <span class="text-right text-dimmed/60 select-none">3</span>
          <code class="whitespace-pre text-muted"><span class="text-cyan-300">&lt;/MTilt&gt;</span></code>
        </div>
      </div>
    </Motion>
  </div>
</template>
