<template>
  <div class="flex w-full flex-col items-center gap-8 p-10 text-center">
    <div>
      <p class="text-xs font-medium tracking-wide text-muted uppercase">
        Split-flap headline
      </p>
      <p class="mt-3 text-4xl font-semibold text-highlighted">
        <MRollingText text="Ship something" />
      </p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
      <span>
        <MRollingText
          text="fast"
          class="font-medium text-primary"
        />
      </span>
      <span>
        <MRollingText
          text="readable"
          class="font-medium text-highlighted"
        />
      </span>
      <span>
        <MRollingText
          text="accessible"
          class="font-medium text-highlighted"
        />
      </span>
    </div>
  </div>
</template>
