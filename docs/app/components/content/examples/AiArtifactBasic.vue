<template>
  <div class="w-full max-w-md">
    <MAiArtifact
      title="PricingCard.tsx"
      :copy-text="snippet"
    >
      <template #preview>
        <div class="rounded-lg border border-default bg-muted/40 p-4">
          <p class="text-sm font-medium text-highlighted">
            Pro
          </p>
          <p class="mt-1 text-2xl font-semibold text-highlighted">
            $24<span class="text-sm font-normal text-muted">/mo</span>
          </p>
          <p class="mt-2 text-xs leading-relaxed text-muted">
            Unlimited blocks, every theme, and priority support.
          </p>
        </div>
      </template>

      <template #code>
        {{ snippet }}
      </template>
    </MAiArtifact>
  </div>
</template>

<script setup lang="ts">
const snippet = `<PricingCard
  name="Pro"
  price={24}
  features={['Unlimited blocks']}
/>`
</script>
