<template>
  <MAnimatedDialog
    title="Dialog with Header and Footer"
    description="This dialog has custom header and footer slots"
  >
    <UButton
      label="Open Complex Dialog"
      color="primary"
    />

    <template #body>
      <div class="p-4">
        <p>This is the main content of the dialog. It can contain any Vue components or HTML elements.</p>
        <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p>You can include forms, images, or any other content here.</p>
        </div>
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
