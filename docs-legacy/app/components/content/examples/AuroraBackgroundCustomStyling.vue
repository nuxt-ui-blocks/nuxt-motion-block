<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-background">
    <MAuroraBackground
      :show-radial-gradient="false"
      class="bg-slate-900"
    >
      <div class="relative z-10 flex h-full flex-col items-center justify-center space-y-4">
        <h3 class="text-2xl font-bold text-white">
          Custom Aurora
        </h3>
        <p class="text-white/80 text-center max-w-md">
          Aurora background without radial gradient and with custom background color
        </p>
      </div>
    </MAuroraBackground>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
