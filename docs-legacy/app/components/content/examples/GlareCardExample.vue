<template>
  <MGlareCard class="bg-gray-800">
    <div class="flex flex-col items-center justify-center h-full space-y-4">
      <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
        <UIcon
          name="i-heroicons-sparkles"
          class="w-8 h-8 text-white"
        />
      </div>
      <h3 class="text-2xl font-bold text-white">
        Glare Effect
      </h3>
      <p class="text-slate-400 text-center">
        Move your cursor over the card to see the dynamic glare effect in action.
      </p>
      <UButton
        color="primary"
        @click="handleClick"
      >
        Try It
      </UButton>
    </div>
  </MGlareCard>
</template>

<script setup>
const handleClick = () => {
  alert('Glare effect is working!')
}
</script>
