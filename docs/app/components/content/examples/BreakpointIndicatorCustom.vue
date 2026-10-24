<template>
  <ComponentPlayground
    name="BreakpointIndicator"
    :hide="['visible']"
    :defaults="{
      enabled: true,
      fixed: false,
      position: 'bottom-right',
      showSize: true,
      showRuler: true,
      hotkey: 'b',
      breakpoints: [
        { min: 640, name: 'sm' },
        { min: 768, name: 'md' },
        { min: 1024, name: 'lg' },
        { min: 1280, name: 'xl' },
        { min: 1536, name: '2xl' },
      ],
    }"
    :controls="{
      enabled: { label: 'Enabled', kind: 'boolean' },
      fixed: { label: 'Fixed to viewport', kind: 'boolean' },
      position: {
        label: 'Position',
        kind: 'select',
        options: [
          { label: 'Bottom left', value: 'bottom-left' },
          { label: 'Bottom right', value: 'bottom-right' },
          { label: 'Top left', value: 'top-left' },
          { label: 'Top right', value: 'top-right' },
        ],
      },
      showSize: { label: 'Show size', kind: 'boolean' },
      showRuler: { label: 'Show ruler', kind: 'boolean' },
      hotkey: { label: 'Hotkey', kind: 'string' },
      breakpoints: { label: 'Breakpoints (JSON)', kind: 'json' },
    }"
  />
</template>
