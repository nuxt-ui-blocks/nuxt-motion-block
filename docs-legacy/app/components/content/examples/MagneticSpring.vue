<template>
  <div class="flex justify-center">
    <MMagnetic :spring-options="{ stiffness: 50, damping: 5, mass: 0.5 }">
      <UButton
        color="primary"
        variant="outline"
      >
        Custom Spring
      </UButton>
    </MMagnetic>
  </div>
</template>
