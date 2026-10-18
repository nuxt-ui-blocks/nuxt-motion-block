<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6 py-6">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <MClipCornersButton
        label="Deploy"
        color="primary"
        triangle-color="var(--ui-bg)"
      />
      <MClipCornersButton
        label="Destroy"
        color="error"
        variant="soft"
        triangle-color="var(--ui-bg)"
      />
      <MClipCornersButton
        label="Docs"
        color="neutral"
        variant="outline"
        triangle-color="var(--ui-bg)"
        trailing-icon="i-lucide-arrow-up-right"
      />
    </div>

    <p class="max-w-xs text-center text-xs text-muted">
      Four triangles sit a few pixels inside the button box and spring diagonally toward the centre
      on hover, reading as the corners being clipped away. They are painted in the colour of the
      surface behind the button, which is why <code>triangle-color</code> is set here rather than
      left at its default.
    </p>
  </div>
</template>
