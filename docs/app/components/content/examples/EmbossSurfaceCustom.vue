<template>
  <ComponentPlayground
    name="EmbossSurface"
    :defaults="{
      variant: 'plaster',
      color: '#d6d3d1',
      softness: 0.8,
      interactive: true,
      class: 'flex h-48 w-full max-w-xs items-center justify-center rounded-2xl border border-default',
    }"
    :controls="{
      variant: {
        kind: 'select',
        options: [
          { label: 'Emboss', value: 'emboss' },
          { label: 'Deboss', value: 'deboss' },
          { label: 'Plaster', value: 'plaster' },
          { label: 'Metal stamp', value: 'metal-stamp' },
        ],
      },
      as: {
        kind: 'select',
        options: [
          { label: 'div', value: 'div' },
          { label: 'section', value: 'section' },
          { label: 'button', value: 'button' },
        ],
      },
    }"
  >
    <span class="text-lg font-semibold text-stone-800">Emboss Surface</span>
  </ComponentPlayground>
</template>
