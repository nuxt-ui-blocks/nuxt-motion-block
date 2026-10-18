<template>
  <ComponentPlayground
    name="SdfBlobTransition"
    :defaults="{
      variant: 'final',
      duration: 1120,
      transitionKey: 1,
      class: 'h-44 w-full max-w-md overflow-hidden rounded-2xl',
    }"
    :controls="{
      variant: {
        kind: 'select',
        options: [
          { label: 'Final', value: 'final' },
          { label: 'Circle', value: 'circle' },
          { label: 'Warped', value: 'warped' },
          { label: 'Radial', value: 'radial' },
          { label: 'Merge', value: 'merge' },
        ],
      },
      duration: { kind: 'number', min: 200, max: 3000, step: 20 },
      transitionKey: { kind: 'number', label: 'Replay', min: 0, max: 20, step: 1 },
    }"
  >
    <div class="grid h-full place-items-center bg-gradient-to-br from-rose-500 to-pink-950 p-6 text-center text-white">
      <div class="space-y-1">
        <p class="text-xs uppercase tracking-widest text-white/60">
          Signed distance blob
        </p>
        <p class="text-2xl font-semibold">
          Content behind the blob
        </p>
      </div>
    </div>
  </ComponentPlayground>
</template>
