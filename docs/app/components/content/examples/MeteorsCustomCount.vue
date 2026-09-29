<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-black">
    <MMeteors :count="50" />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-xl font-bold text-white mb-2">
        Dense Meteor Shower
      </h3>
      <p class="text-gray-300">
        50 meteors for a more intense effect
      </p>
    </div>
  </div>
</template>
