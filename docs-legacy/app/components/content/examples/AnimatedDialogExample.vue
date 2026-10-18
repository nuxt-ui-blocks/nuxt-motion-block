<template>
  <MAnimatedDialog
    title="Animated Dialog"
    description="A modal dialog with smooth animations"
  >
    <UButton
      label="Open Dialog"
      color="primary"
    />

    <template #body>
      <div class="space-y-4">
        <p>This is the content of the animated dialog.</p>
        <p>You can add any content here, including forms, images, or other components.</p>
      </div>
    </template>

    <template #footer="{ close }">
      <div class="flex gap-2">
        <UButton
          label="Cancel"
          color="neutral"
          variant="outline"
          @click="close"
        />
        <UButton
          label="Confirm"
          color="primary"
          @click="close"
        />
      </div>
    </template>
  </MAnimatedDialog>
</template>
