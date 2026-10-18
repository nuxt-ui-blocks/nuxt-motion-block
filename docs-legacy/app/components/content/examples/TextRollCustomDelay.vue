<template>
  <div class="p-4">
    <MTextRoll
      children="Staggered Roll"
      :get-enter-delay="(i) => i * 0.2"
      :get-exit-delay="(i) => i * 0.2 + 0.5"
    />
  </div>
</template>
