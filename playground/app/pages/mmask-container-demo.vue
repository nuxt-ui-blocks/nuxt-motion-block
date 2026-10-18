<template>
  <div class="space-y-12">
    <UPageHeader
      title="MaskContainer"
      description="Content wrapped in an overlay mask that fades and scales away when show flips to true."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">show</code> defaults to <code class="font-mono">false</code>, so
        the overlay covers the content on first paint. Flipping it to
        <code class="font-mono">true</code> animates the mask to
        <code class="font-mono">opacity 0</code> and <code class="font-mono">scale 1.05</code> over
        0.3s and sets <code class="font-mono">pointer-events: none</code>, so the content underneath
        becomes clickable again. It is a one-way prop — there is no
        <code class="font-mono">v-model</code>.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          :label="show ? 'Hide content' : 'Reveal content'"
          icon="i-lucide-eye"
          variant="outline"
          data-testid="toggle-show"
          @click="show = !show"
        />
      </div>

      <div class="rounded-2xl bg-(--ui-bg-muted) p-4">
        <MMaskContainer
          :show="show"
          label="Reveal to see the content"
          class="h-56 rounded-xl bg-gray-950"
          data-testid="mask"
        >
          <div class="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <p class="text-2xl font-bold text-white">
              Revealed content
            </p>
            <p class="text-sm text-gray-400">
              Whatever you place in the default slot sits under the mask.
            </p>
          </div>
        </MMaskContainer>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          show
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-show"
        >
          {{ show }}
        </dd>
        <dt class="text-muted">
          color
        </dt>
        <dd class="font-mono">
          rgba(0,0,0,0.5)
        </dd>
        <dt class="text-muted">
          transition
        </dt>
        <dd class="font-mono">
          0.3s easeInOut
        </dd>
        <dt class="text-muted">
          mask while hidden
        </dt>
        <dd class="font-mono">
          opacity 1, pointer-events auto
        </dd>
        <dt class="text-muted">
          mask while shown
        </dt>
        <dd class="font-mono">
          opacity 0, scale 1.05, none
        </dd>
        <dt class="text-muted">
          mask content
        </dt>
        <dd class="font-mono">
          icon + label fallback
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Prop tour
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">icon</code> and <code class="font-mono">label</code> are only the
        fallback content of the <code class="font-mono">#mask</code> slot — provide that slot and
        they are ignored. <code class="font-mono">color</code> paints the overlay.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            icon + label
          </p>
          <MMaskContainer
            icon="i-lucide-lock"
            label="Locked"
            class="h-48 rounded-xl bg-gray-950"
            data-testid="variant-icon"
          >
            <div class="flex h-full items-center justify-center p-6">
              <p class="text-sm text-gray-400">
                Secret content
              </p>
            </div>
          </MMaskContainer>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            custom #mask slot, opaque color
          </p>
          <MMaskContainer
            color="rgba(15, 23, 42, 0.94)"
            class="h-48 rounded-xl bg-gray-900"
            data-testid="variant-slot"
          >
            <div class="flex h-full items-center justify-center p-6">
              <p class="text-sm text-gray-400">
                Secret content
              </p>
            </div>
            <template #mask>
              <div class="flex flex-col items-center gap-3 p-6 text-center">
                <UIcon
                  name="i-lucide-scan-eye"
                  class="h-8 w-8 text-primary-400"
                />
                <p class="text-sm font-medium text-white">
                  Custom mask slot content
                </p>
              </div>
            </template>
          </MMaskContainer>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            shown (end state)
          </p>
          <MMaskContainer
            :show="true"
            label="Ignored while revealed"
            class="h-48 rounded-xl bg-gray-950"
            data-testid="variant-revealed"
          >
            <div class="flex h-full items-center justify-center p-6">
              <p class="text-sm font-medium text-white">
                Overlay faded out
              </p>
            </div>
          </MMaskContainer>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Caveats
        </p>
      </template>

      <ul class="grid gap-2 text-sm text-muted sm:grid-cols-2">
        <li>
          The root has no intrinsic height — it is
          <code class="font-mono">relative overflow-hidden</code> plus your
          <code class="font-mono">class</code>. Always pass an explicit height or the mask has
          nothing to cover.
        </li>
        <li>
          <code class="font-mono">icon</code>/<code class="font-mono">label</code> disappear
          entirely once the <code class="font-mono">#mask</code> slot is provided; they are not
          merged into it.
        </li>
        <li>
          While hidden, the overlay intercepts pointer events on the whole area — underlying
          buttons and links are unreachable until <code class="font-mono">show</code> is true.
        </li>
        <li>
          The entrance is opacity + scale only (0.3s easeInOut); there is no slide, no exit
          animation beyond reversing, and no reduced-motion branch in the component.
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
