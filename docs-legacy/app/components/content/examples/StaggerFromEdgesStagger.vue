<template>
  <div class="flex flex-col items-center gap-4">
    <MStaggerFromEdges
      class="text-2xl font-semibold"
      :stagger="0"
      text="Without stagger"
    />
    <MStaggerFromEdges
      class="text-2xl font-semibold"
      :stagger="22"
      text="Default stagger"
    />
    <MStaggerFromEdges
      class="text-2xl font-semibold"
      :stagger="60"
      text="Wide fan"
    />
  </div>
</template>
