<template>
  <div class="p-4">
    <MTextLoop
      :items="['Bounce', 'Effect', 'Text']"
      :transition="{ type: 'spring', stiffness: 300, damping: 10 }"
    />
  </div>
</template>
