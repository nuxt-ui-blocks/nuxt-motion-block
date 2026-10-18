<template>
  <div class="flex flex-col items-center gap-4">
    <MStaggerFromCenter
      class="text-2xl font-semibold"
      :stagger="0"
      text="Without stagger"
    />
    <MStaggerFromCenter
      class="text-2xl font-semibold"
      :stagger="22"
      text="Default stagger"
    />
    <MStaggerFromCenter
      class="text-2xl font-semibold"
      :stagger="60"
      text="Wide fan"
    />
  </div>
</template>
