<template>
  <div class="flex justify-center">
    <MImageComparison class="h-64 w-96 rounded-lg overflow-hidden">
      <MImageComparisonImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        alt="Before"
        position="left"
      />
      <MImageComparisonImage
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        alt="After"
        position="right"
      />
      <MImageComparisonSlider>
        <div class="text-xs font-medium text-gray-900 bg-white px-2 py-1 rounded absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          Drag to compare
        </div>
      </MImageComparisonSlider>
    </MImageComparison>
  </div>
</template>
