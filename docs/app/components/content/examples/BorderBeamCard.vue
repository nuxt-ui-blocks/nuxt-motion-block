<template>
  <MBorderBeam
    class="w-full max-w-sm rounded-3xl bg-elevated/60 p-6 shadow-xl"
    :beams="1"
    :size="110"
    :duration="7"
    color-from="#a5b4fc"
    color-to="#f0abfc"
  >
    <div class="flex flex-col gap-4">
      <div class="flex items-baseline justify-between">
        <p class="text-sm font-medium text-muted">
          Pro
        </p>
        <p class="text-2xl font-semibold text-highlighted">
          $20<span class="text-sm font-normal text-muted">/mo</span>
        </p>
      </div>

      <ul class="flex flex-col gap-2 text-sm text-muted">
        <li class="flex items-center gap-2">
          <UIcon
            name="i-lucide-check"
            class="size-4 text-primary"
          />
          Unlimited projects
        </li>
        <li class="flex items-center gap-2">
          <UIcon
            name="i-lucide-check"
            class="size-4 text-primary"
          />
          Priority support
        </li>
        <li class="flex items-center gap-2">
          <UIcon
            name="i-lucide-check"
            class="size-4 text-primary"
          />
          Custom domains
        </li>
      </ul>

      <UButton
        color="primary"
        block
      >
        Upgrade
      </UButton>
    </div>
  </MBorderBeam>
</template>
