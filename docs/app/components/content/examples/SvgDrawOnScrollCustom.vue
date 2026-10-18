<template>
  <ComponentPlayground
    name="SvgDrawOnScroll"
    :defaults="{
      path: 'M10 80 C 30 20, 70 20, 90 80',
      viewBox: '0 0 100 100',
      stroke: 'currentColor',
      strokeWidth: 2,
      once: false,
      offset: ['start 0.9', 'end 0.6'],
      class: 'mx-auto h-40 w-40 text-primary',
    }"
    :controls="{
      path: { kind: 'string', label: 'Path (d)' },
      viewBox: { kind: 'string', label: 'ViewBox' },
      stroke: { kind: 'string', label: 'Stroke' },
      strokeWidth: { kind: 'number', min: 0.5, max: 8, step: 0.5, label: 'Stroke width' },
      once: { kind: 'boolean', label: 'Once' },
    }"
    :hide="['paths', 'container', 'offset']"
    min-height="360px"
  />
</template>
