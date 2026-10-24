<template>
  <div class="relative flex h-40 w-full items-center justify-center rounded-lg border border-dashed border-default">
    <p class="max-w-xs text-center text-sm text-muted">
      Resize the window, or press Ctrl/Cmd + B to hide the badge.
    </p>

    <MBreakpointIndicator
      :fixed="false"
      position="bottom-right"
      show-ruler
    />
  </div>
</template>
