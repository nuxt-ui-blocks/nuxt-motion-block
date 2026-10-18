<template>
  <div class="flex justify-center">
    <MImageComparison
      class="h-96 w-64 rounded-lg overflow-hidden"
      orientation="vertical"
    >
      <MImageComparisonImage
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        alt="Ocean before"
        position="left"
      />
      <MImageComparisonImage
        src="https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        alt="Ocean after"
        position="right"
      />
      <MImageComparisonSlider />
    </MImageComparison>
  </div>
</template>
