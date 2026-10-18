<template>
  <ComponentPlayground
    name="ShaderRevealTransition"
    :defaults="{
      variant: 'noise',
      duration: 1080,
      transitionKey: 1,
      class: 'h-44 w-full max-w-md overflow-hidden rounded-2xl',
    }"
    :controls="{
      variant: {
        kind: 'select',
        options: [
          { label: 'Noise', value: 'noise' },
          { label: 'Zoom', value: 'zoom' },
          { label: 'Circle', value: 'circle' },
          { label: 'Luma', value: 'luma' },
          { label: 'Planetary', value: 'planetary' },
          { label: 'Push', value: 'push' },
          { label: 'Stripes', value: 'stripes' },
          { label: 'Wipe', value: 'wipe' },
        ],
      },
      duration: { kind: 'number', min: 200, max: 3000, step: 20 },
      transitionKey: { kind: 'number', label: 'Replay', min: 0, max: 20, step: 1 },
    }"
  >
    <div class="grid h-full place-items-center bg-gradient-to-br from-sky-500 to-blue-950 p-6 text-center text-white">
      <div class="space-y-1">
        <p class="text-xs uppercase tracking-widest text-white/60">
          Shader reveal
        </p>
        <p class="text-2xl font-semibold">
          Content behind the reveal
        </p>
      </div>
    </div>
  </ComponentPlayground>
</template>
