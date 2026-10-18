<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MMailCard
      title="Q3 infrastructure invoice"
      preview="Your usage for July came in 12% under forecast. The itemised breakdown is attached, and the credit for the two idle replicas has been applied."
      :expanded="expanded"
      @update:expanded="onToggle"
    >
      <div class="space-y-3 text-sm">
        <p class="text-muted">
          Your usage for July came in 12% under forecast. The itemised breakdown is
          attached, and the credit for the two idle replicas has been applied to
          this invoice.
        </p>
        <div class="grid grid-cols-2 gap-2">
          <div class="rounded-lg bg-default p-3">
            <p class="text-xs text-muted">
              Compute
            </p>
            <p class="text-base font-semibold text-highlighted">
              $412.80
            </p>
          </div>
          <div class="rounded-lg bg-default p-3">
            <p class="text-xs text-muted">
              Storage
            </p>
            <p class="text-base font-semibold text-highlighted">
              $96.14
            </p>
          </div>
        </div>
      </div>
    </MMailCard>

    <span class="text-xs text-muted">
      {{ expanded ? 'Expanded by the card' : 'Collapsed' }}
    </span>
  </div>
</template>

<script setup lang="ts">
const expanded = ref(false)

function onToggle(value: boolean) {
  expanded.value = value
}
</script>
