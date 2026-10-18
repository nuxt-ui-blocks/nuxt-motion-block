<template>
  <MWobbleCard
    class="h-52 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ring-0"
    :ui="{ wrapper: 'mx-auto max-w-sm', body: 'h-full' }"
  >
    <div class="flex h-full flex-col justify-between">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-white/90">
          Pro plan
        </p>
        <UIcon
          name="i-lucide-rocket"
          class="h-5 w-5 text-white/80"
        />
      </div>

      <div>
        <p class="text-3xl font-semibold text-white">
          $12<span class="text-base font-normal text-white/80">/mo</span>
        </p>
        <p class="mt-1 text-sm text-white/80">
          Everything you need to ship motion-rich interfaces.
        </p>
      </div>

      <UButton
        size="sm"
        class="w-fit bg-white text-neutral-900 hover:bg-white/90"
      >
        Start free trial
      </UButton>
    </div>
  </MWobbleCard>
</template>
