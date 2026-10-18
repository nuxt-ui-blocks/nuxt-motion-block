<template>
  <div class="grid grid-cols-2 gap-8 p-8 text-center text-2xl font-bold">
    <MTextGradient
      text="Horizontal"
      direction="horizontal"
    />
    <MTextGradient
      text="Vertical"
      direction="vertical"
    />
    <MTextGradient
      text="Diagonal"
      direction="diagonal"
    />
    <MTextGradient
      text="Radial"
      direction="radial"
      :colors="['#f472b6', '#a855f7', '#22d3ee']"
    />
  </div>
</template>
