<template>
  <div class="flex w-full max-w-md justify-center">
    <div class="flex flex-col gap-3">
      <UButton
        label="Open Drawer"
        @click="open = true"
      />
      <MDrawer
        v-model:open="open"
        title="Drawer"
        description="A simple drawer example"
      >
        <template #body>
          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted">
              This is the drawer body content.
            </p>
            <UButton
              label="Close"
              @click="open = false"
            />
          </div>
        </template>
      </MDrawer>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
</script>
