<template>
  <div class="grid h-full w-full place-items-center">
    <MMagnetic
      :intensity="0.8"
      :range="140"
    >
      <UButton
        size="lg"
        trailing-icon="i-lucide-mouse-pointer"
      >
        Hover me
      </UButton>
    </MMagnetic>
  </div>
</template>
