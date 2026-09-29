<template>
  <div class="space-y-12">
    <UPageHeader
      title="GlassCard"
      description="Liquid glass pane with a frosted body, a refractive rim, and pointer-tracked specular highlight."
    />

    <div class="relative overflow-hidden rounded-xl">
      <div
        aria-hidden="true"
        class="absolute inset-0"
        :style="{ background: PHOTO }"
      />
      <div
        aria-hidden="true"
        class="absolute inset-0"
        :style="{ background: VIVID, clipPath: 'polygon(44% 0, 100% 0, 100% 100%, 18% 100%)' }"
      />
      <div
        aria-hidden="true"
        class="absolute inset-0"
        :style="{ background: STRIPES, clipPath: 'polygon(0 68%, 100% 68%, 100% 100%, 0 100%)' }"
      />

      <div class="relative flex size-full flex-col justify-center gap-4 p-5 h-[420px]">
        <MGlassCard
          class="w-full"
          :radius="28"
        >
          <div class="flex items-center gap-3">
            <div
              aria-hidden="true"
              class="size-14 shrink-0 rounded-lg ring-1 ring-inset ring-white/25"
              :style="{ backgroundImage: 'url(https://ik.imagekit.io/16u211libb/smoothui/scenes/cobalt-pink.webp?tr=w-160,h-160,f-auto)', backgroundPosition: 'center', backgroundSize: 'cover' }"
            />
            <div class="min-w-0 flex-1">
              <p
                class="truncate font-semibold text-[0.9375rem] tracking-tight text-white"
                :class="SHADOWED"
              >
                Refraction Index
              </p>
              <p
                class="truncate text-xs text-white/85"
                :class="SHADOWED"
              >
                Liquid Glass — Side A
              </p>
            </div>
            <div class="flex shrink-0 items-center gap-0.5">
              <UButton
                square
                size="sm"
                variant="ghost"
                color="neutral"
                aria-label="Shuffle"
                :ui="{ base: 'text-white hover:bg-white/15' }"
                class="hidden sm:inline-flex"
              >
                <UIcon name="i-lucide-shuffle" />
              </UButton>
              <UButton
                square
                size="sm"
                variant="ghost"
                color="neutral"
                aria-label="Previous track"
                :ui="{ base: 'text-white hover:bg-white/15' }"
              >
                <UIcon name="i-lucide-skip-back" />
              </UButton>
              <UButton
                square
                size="lg"
                variant="solid"
                color="neutral"
                :aria-label="isPlaying ? 'Pause' : 'Play'"
                :ui="{ base: 'rounded-full' }"
                @click="isPlaying = !isPlaying"
              >
                <UIcon :name="isPlaying ? 'i-lucide-pause' : 'i-lucide-play'" />
              </UButton>
              <UButton
                square
                size="sm"
                variant="ghost"
                color="neutral"
                aria-label="Next track"
                :ui="{ base: 'text-white hover:bg-white/15' }"
              >
                <UIcon name="i-lucide-skip-forward" />
              </UButton>
              <UButton
                square
                size="sm"
                variant="ghost"
                color="neutral"
                aria-label="Repeat"
                :ui="{ base: 'text-white hover:bg-white/15' }"
                class="hidden sm:inline-flex"
              >
                <UIcon name="i-lucide-repeat" />
              </UButton>
            </div>
          </div>

          <div class="mt-4">
            <div
              class="h-1 w-full overflow-hidden rounded-full bg-white/25"
              role="progressbar"
              aria-label="Playback progress"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-valuenow="PROGRESS"
            >
              <div
                class="h-full rounded-full bg-white/90"
                :style="{ width: `${PROGRESS}%` }"
              />
            </div>
            <div
              class="mt-1.5 flex justify-between text-[0.6875rem] tabular-nums text-white/80"
              :class="SHADOWED"
            >
              <span>1:42</span>
              <span>3:58</span>
            </div>
          </div>
        </MGlassCard>

        <div class="flex gap-3">
          <MGlassCard
            class="min-w-0 flex-1"
            :radius="22"
            :refraction="30"
            :rim-width="18"
          >
            <p
              class="font-medium text-[0.8125rem] text-white"
              :class="SHADOWED"
            >
              refraction 30
            </p>
            <p
              class="mt-0.5 text-[0.6875rem] leading-relaxed text-white/85"
              :class="SHADOWED"
            >
              The rim bends the stripes.
            </p>
          </MGlassCard>
          <MGlassCard
            class="min-w-0 flex-1"
            :radius="22"
            :refraction="0"
            :rim-width="18"
          >
            <p
              class="font-medium text-[0.8125rem] text-white"
              :class="SHADOWED"
            >
              refraction 0
            </p>
            <p
              class="mt-0.5 text-[0.6875rem] leading-relaxed text-white/85"
              :class="SHADOWED"
            >
              Same blur, straight through.
            </p>
          </MGlassCard>
        </div>
      </div>
    </div>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Prop Variants
        </p>
      </template>
      <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 p-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MGlassCard :radius="26">
            <p class="font-medium text-highlighted">
              Defaults
            </p>
            <p class="mt-1 text-sm text-muted">
              blur 11, rim 12, refraction 24
            </p>
          </MGlassCard>
          <MGlassCard
            :border="false"
            :rim-width="4"
          >
            <p class="font-medium text-highlighted">
              Rim 4, no inner ring
            </p>
            <p class="mt-1 text-sm text-muted">
              A hairline edge, content padding drops to 20
            </p>
          </MGlassCard>
          <MGlassCard
            :specular="false"
            :tint="'oklch(0.6 0.2 280 / 0.25)'"
          >
            <p class="font-medium text-highlighted">
              No specular
            </p>
            <p class="mt-1 text-sm text-muted">
              Tinted body, highlight and sweep removed
            </p>
          </MGlassCard>
          <MGlassCard
            :interactive="false"
            :shadow="false"
          >
            <p class="font-medium text-highlighted">
              Static
            </p>
            <p class="mt-1 text-sm text-muted">
              interactive false, shadow false
            </p>
          </MGlassCard>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const PROGRESS = 42

const PHOTO
  = 'url(https://ik.imagekit.io/16u211libb/smoothui/scenes/cyan-tangerine.webp?tr=w-1200,h-800,f-auto) center/cover no-repeat'
/**
 * Saturated gradient over the right two thirds — the diagonal seam it forms
 * with the photo is the first hard edge the rim has to bend.
 */
const VIVID
  = 'linear-gradient(140deg, oklch(0.7 0.2 28) 0%, oklch(0.58 0.22 318) 48%, oklch(0.72 0.14 205) 100%)'
/**
 * Hard black-and-white stripes, banded across the lower third so both
 * comparison panes cross the same ones below their text. A bent stripe at the
 * rim is impossible to argue with.
 */
const STRIPES
  = 'repeating-linear-gradient(28deg, oklch(0.98 0 0) 0 18px, transparent 18px 44px, oklch(0.15 0 0) 44px 62px, transparent 62px 88px)'

const SHADOWED = '[text-shadow:0_1px_3px_oklch(0_0_0/0.6)]'

const isPlaying = ref(true)
</script>
