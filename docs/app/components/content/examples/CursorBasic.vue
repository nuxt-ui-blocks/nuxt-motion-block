<template>
  <div class="flex items-center justify-center h-full w-full p-4">
    <div class="w-full max-w-md mx-auto">
      <div class="text-center mb-4">
        <h2 class="text-xl font-bold text-highlighted mb-2">
          Basic Cursor Example
        </h2>
        <p class="text-muted text-sm">
          Move your cursor in the box below
        </p>
      </div>

      <div class="bg-default rounded-lg shadow p-6 border border-default">
        <div class="h-48 w-full rounded bg-muted border border-default flex items-center justify-center relative">
          <!-- Simple cursor component -->
          <MCursor attach-to-parent>
            <div class="w-3 h-3 rounded-full bg-primary/70" />
          </MCursor>

          <div class="text-center">
            <p class="text-default text-sm">
              Move your cursor here to see the custom cursor
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This is the most basic example of using the MCursor component
// Just wrap any element with MCursor to replace the default cursor
</script>
