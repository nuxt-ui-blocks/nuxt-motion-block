<template>
  <div class="flex w-full max-w-md flex-col items-center gap-3">
    <MExposureSlider
      class="w-full"
      label="Focus"
      accent-color="#f472b6"
      :show-indicator="false"
    />
    <p class="text-center text-sm text-muted">
      Focus is a one-sided control: the rail fades toward the centre, so there
      is no indicator to get in the way of the type.
    </p>
  </div>
</template>
