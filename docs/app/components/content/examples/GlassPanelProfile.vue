<template>
  <MGlassPanel
    background-image="https://picsum.photos/seed/studio-wall/1200/800"
    class="w-full max-w-sm rounded-3xl"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <UAvatar
          src="https://picsum.photos/seed/maya-alvarez/200/200"
          size="lg"
          alt="Maya Alvarez"
        />
        <div>
          <p class="font-semibold text-highlighted">
            Maya Alvarez
          </p>
          <p class="text-xs text-muted">
            Product designer · Lisbon
          </p>
        </div>
      </div>
    </template>

    <div class="space-y-4">
      <p class="text-sm leading-relaxed text-highlighted/90">
        Designing calm, legible interfaces for data-heavy products — and the design
        systems teams actually keep using.
      </p>

      <div class="grid grid-cols-3 gap-2 text-center">
        <div class="rounded-xl bg-default/40 py-2">
          <p class="text-lg font-semibold text-highlighted">
            128
          </p>
          <p class="text-xs text-muted">
            Projects
          </p>
        </div>
        <div class="rounded-xl bg-default/40 py-2">
          <p class="text-lg font-semibold text-highlighted">
            9.4k
          </p>
          <p class="text-xs text-muted">
            Followers
          </p>
        </div>
        <div class="rounded-xl bg-default/40 py-2">
          <p class="text-lg font-semibold text-highlighted">
            312
          </p>
          <p class="text-xs text-muted">
            Following
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex w-full gap-2">
        <UButton
          label="Follow"
          class="flex-1 justify-center"
        />
        <UButton
          label="Message"
          color="neutral"
          variant="soft"
          class="flex-1 justify-center"
        />
      </div>
    </template>
  </MGlassPanel>
</template>
