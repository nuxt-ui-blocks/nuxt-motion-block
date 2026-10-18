<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Glare Card with custom rainbow colors -->
    <MGlareCard
      class="h-64"
      glare-color="rgba(239,68,68,0.8)"
      glare-color-inner="rgba(239,68,68,0.65)"
      glare-color-outer="rgba(239,68,68,0)"
      :rainbow-colors="['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']"
    >
      <div class="flex flex-col items-center justify-center h-full space-y-4">
        <h3 class="text-xl font-bold text-white">
          Custom Rainbow Effect
        </h3>
        <p class="text-slate-400 text-center">
          Custom rainbow colors with red glare
        </p>
      </div>
    </MGlareCard>

    <!-- Glare Card with default rainbow -->
    <MGlareCard
      class="h-64"
      glare-color="rgba(59,130,246,0.8)"
      glare-color-inner="rgba(59,130,246,0.65)"
      glare-color-outer="rgba(59,130,246,0)"
    >
      <div class="flex flex-col items-center justify-center h-full space-y-4">
        <h3 class="text-xl font-bold text-white">
          Default Rainbow
        </h3>
        <p class="text-slate-400 text-center">
          Default rainbow effect with blue glare
        </p>
      </div>
    </MGlareCard>
  </div>
</template>
