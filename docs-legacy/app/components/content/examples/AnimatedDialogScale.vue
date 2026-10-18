<template>
  <MAnimatedDialog :scale="0.8">
    <UButton
      label="Strong Morph"
      color="secondary"
    />

    <template #body>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">
          Strong Morphing
        </h3>
        <p>This dialog uses a stronger motion-v morphing effect.</p>
      </div>
    </template>
  </MAnimatedDialog>
</template>
