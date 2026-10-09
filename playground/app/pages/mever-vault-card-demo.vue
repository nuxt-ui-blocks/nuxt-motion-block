<template>
  <div class="space-y-12">
    <UPageHeader
      title="EverVault Card"
      description="A card that fills with a moving cipher under the pointer and a gradient masked to a radial spot."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Two layers sit above the card body and only fade in while it is hovered: a gradient and a
        wall of random characters. Both are masked with a
        <code class="font-mono">250px</code> radial gradient pinned to the pointer, so the cipher
        appears only where the cursor actually is — and it regenerates on every mouse move.
      </p>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <MEverVaultCard
          data-testid="card-basic"
          class="w-full max-w-sm"
        >
          <template #header>
            <p class="text-lg font-semibold text-highlighted">
              Hover to decrypt
            </p>
          </template>

          <div class="space-y-3 py-2 text-sm text-muted">
            <p>
              The card body stays readable underneath — the effect is layered on top with
              <code class="font-mono">pointer-events-none</code> and
              <code class="font-mono">mix-blend-overlay</code>.
            </p>
            <p class="font-mono text-xs">
              gradient from-green-500 to-blue-700
            </p>
          </div>

          <template #footer>
            <div class="flex items-center justify-between">
              <span class="text-xs text-muted">mask follows the pointer</span>
              <UBadge
                variant="subtle"
                data-testid="card-badge"
              >
                hover
              </UBadge>
            </div>
          </template>
        </MEverVaultCard>
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          mask radius
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-radius"
        >
          250px
        </dd>
        <dt class="text-muted">
          cipher length
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cipher"
        >
          1500 chars
        </dd>
        <dt class="text-muted">
          regenerate
        </dt>
        <dd class="font-mono">
          on mousemove
        </dd>
        <dt class="text-muted">
          base layer
        </dt>
        <dd class="font-mono">
          bg-transparent + overflow-hidden
        </dd>
        <dt class="text-muted">
          blend mode
        </dt>
        <dd class="font-mono">
          mix-blend-overlay
        </dd>
        <dt class="text-muted">
          reveal
        </dt>
        <dd class="font-mono">
          group-hover/card opacity 0 → 1
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Gradient presets
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">gradientColors</code> expects whole utility pairs
        (<code class="font-mono">from-… to-…</code>) because the classes are applied directly —
        both halves have to be written out literally so the bundler can see them. The default is
        <code class="font-mono">from-green-500 to-blue-700</code>.
      </p>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <MEverVaultCard
          :key="gradient"
          data-testid="card-gradient"
          class="w-full max-w-sm"
          :gradient-colors="gradient"
        >
          <template #header>
            <p class="text-lg font-semibold text-highlighted">
              {{ gradient }}
            </p>
          </template>

          <div class="space-y-3 py-2 text-sm text-muted">
            <p>
              The preset is read while the card renders, so the card is keyed on the current value
              to re-lay out the gradient layer.
            </p>
            <p class="font-mono text-xs">
              {{ gradient }}
            </p>
          </div>
        </MEverVaultCard>
      </div>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="preset in gradients"
          :key="preset"
          :label="preset"
          :variant="gradient === preset ? 'solid' : 'outline'"
          size="sm"
          :data-testid="`gradient-${preset.split(' ')[0]}`"
          @click="gradient = preset"
        />
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          active
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-gradient"
        >
          {{ gradient }}
        </dd>
        <dt class="text-muted">
          transitions
        </dt>
        <dd class="font-mono">
          duration-500
        </dd>
        <dt class="text-muted">
          options
        </dt>
        <dd class="font-mono">
          {{ gradients.length }}
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Slots
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The header and footer are the slots of the underlying <code class="font-mono">UCard</code>,
        while the default slot is injected between them. Content in the default slot still sits
        below the pointer layers, so buttons stay clickable.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <MEverVaultCard
          data-testid="card-slots"
          class="w-full"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-highlighted">Header slot</span>
              <UIcon
                name="i-lucide-shield-check"
                class="size-4 text-primary"
              />
            </div>
          </template>

          <div class="flex items-center justify-between gap-4 py-2">
            <span class="text-sm text-muted">Default slot</span>
            <UButton
              label="Click me"
              size="sm"
              variant="soft"
              data-testid="slot-action"
            />
          </div>

          <template #footer>
            <span class="text-xs text-muted">footer slot · stays above the cipher</span>
          </template>
        </MEverVaultCard>

        <div class="flex items-center rounded-2xl border border-dashed border-default p-6">
          <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <dt class="text-muted">
              slots
            </dt>
            <dd class="font-mono">
              header · default · footer
            </dd>
            <dt class="text-muted">
              ui prop
            </dt>
            <dd class="font-mono">
              root / header / body / footer
            </dd>
            <dt class="text-muted">
              default body
            </dt>
            <dd class="font-mono">
              w-full h-full bg-default
            </dd>
            <dt class="text-muted">
              touch devices
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-touch"
            >
              mousemove only
            </dd>
          </dl>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const gradients = [
  'from-green-500 to-blue-700',
  'from-rose-500 to-amber-600',
  'from-violet-500 to-fuchsia-600',
  'from-sky-500 to-indigo-700',
] as const

const gradient = ref<string>(gradients[0])
</script>
