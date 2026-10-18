<template>
  <div class="flex flex-col items-center gap-4">
    <MFocusBlurResolve
      class="text-2xl font-semibold"
      text="No delay"
    />
    <MFocusBlurResolve
      class="text-2xl font-semibold"
      :delay="180"
      text="180ms delay"
    />
    <MFocusBlurResolve
      class="text-2xl font-semibold"
      :delay="360"
      text="360ms delay"
    />
  </div>
</template>
