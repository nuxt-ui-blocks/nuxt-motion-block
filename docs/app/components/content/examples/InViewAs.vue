<template>
  <div class="mx-auto max-w-2xl space-y-6 p-6">
    <MInView
      as="section"
      class="rounded-2xl border border-default p-6"
    >
      <h2 class="text-2xl font-semibold text-highlighted">
        Rendered as a section
      </h2>
      <p class="mt-2 text-muted">
        The <code>as</code> prop swaps the root element while keeping the in-view animation.
      </p>
    </MInView>

    <MInView
      as="blockquote"
      class="border-l-4 border-primary pl-4 italic text-muted"
    >
      Semantic markup, animated on entry.
    </MInView>
  </div>
</template>
