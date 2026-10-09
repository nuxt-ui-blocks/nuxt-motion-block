<template>
  <div class="flex flex-col items-center gap-8">
    <div class="flex flex-col items-center gap-2">
      <MMicroScaleFade
        class="text-2xl font-semibold"
        text="One block"
      />
      <p class="text-xs text-muted">
        One animated element for the whole string.
      </p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <MBottomUpLetters
        class="text-2xl font-semibold"
        text="Eleven letters"
      />
      <p class="text-xs text-muted">
        One animated element per character, 88ms apart.
      </p>
    </div>
  </div>
</template>
