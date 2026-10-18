<template>
  <ComponentPlayground
    name="PrismSweepTransition"
    :defaults="{
      direction: 'left',
      tone: 'prism',
      duration: 1240,
      transitionKey: 1,
      class: 'h-44 w-full max-w-md overflow-hidden rounded-2xl',
    }"
    :controls="{
      direction: {
        kind: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
          { label: 'Up', value: 'up' },
          { label: 'Down', value: 'down' },
        ],
      },
      tone: {
        kind: 'select',
        options: [
          { label: 'Prism', value: 'prism' },
          { label: 'Aperture', value: 'aperture' },
          { label: 'Beam', value: 'beam' },
          { label: 'Chroma', value: 'chroma' },
        ],
      },
      duration: { kind: 'number', min: 200, max: 3000, step: 20 },
      transitionKey: { kind: 'number', label: 'Replay', min: 0, max: 20, step: 1 },
    }"
  >
    <div class="grid h-full place-items-center bg-gradient-to-br from-slate-900 to-indigo-950 p-6 text-center text-white">
      <div class="space-y-1">
        <p class="text-xs uppercase tracking-widest text-white/50">
          Prism sweep
        </p>
        <p class="text-2xl font-semibold">
          Content behind the band
        </p>
      </div>
    </div>
  </ComponentPlayground>
</template>
