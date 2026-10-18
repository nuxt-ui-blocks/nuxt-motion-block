<template>
  <MGlareCard
    class="w-80 h-96 rounded-2xl border-2 border-purple-500/30 bg-gray-800"
    glare-color="rgba(192,132,252,0.8)"
    glare-color-inner="rgba(192,132,252,0.65)"
    glare-color-outer="rgba(192,132,252,0)"
  >
    <div class="flex flex-col items-center justify-center h-full space-y-6 p-6">
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
        <UIcon
          name="i-heroicons-light-bulb"
          class="w-8 h-8 text-white"
        />
      </div>
      <div>
        <h3 class="text-2xl font-bold text-white text-center">
          Creative Idea
        </h3>
        <p class="text-purple-300 text-center mt-2">
          This card uses custom styling with a purple gradient border and rounded corners.
        </p>
      </div>
      <UButton
        color="purple"
        variant="outline"
        class="mt-4"
        @click="handleClick"
      >
        Try It Out
      </UButton>
    </div>
  </MGlareCard>
</template>

<script setup>
const handleClick = () => {
  alert('Glare effect is working!')
}
</script>
