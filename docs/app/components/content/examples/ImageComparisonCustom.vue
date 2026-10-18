<template>
  <ComponentPlayground name="ImageComparison">
    <MImageComparisonImage
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80"
      alt="Mountain before editing"
      position="left"
      class="object-cover"
    />
    <MImageComparisonImage
      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
      alt="Mountain after editing"
      position="right"
      class="object-cover"
    />
    <MImageComparisonSlider>
      <div class="flex size-9 items-center justify-center rounded-full bg-default shadow-xl">
        <UIcon
          name="i-lucide-move-horizontal"
          class="size-4"
        />
      </div>
    </MImageComparisonSlider>
  </ComponentPlayground>
</template>
