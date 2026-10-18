<template>
  <ComponentPlayground
    name="KineticTypeScroll"
    :defaults="{
      words: ['Tune', 'the', 'wave'],
      align: 'center',
      stagger: 0.12,
      offset: ['start 0.9', 'end 0.45'],
      scaleRange: [0.92, 1.18],
      trackingRange: [-0.5, 2.5],
      weightRange: [380, 800],
      liftRange: [0, -12],
      dimRange: [0.45, 1],
    }"
    :controls="{
      align: {
        kind: 'select',
        options: [
          { label: 'Start', value: 'start' },
          { label: 'Center', value: 'center' },
          { label: 'End', value: 'end' },
        ],
      },
      stagger: { kind: 'number', min: 0, max: 0.4, step: 0.02, label: 'Stagger' },
    }"
    :hide="['offset', 'scaleRange', 'trackingRange', 'weightRange', 'liftRange', 'dimRange', 'container']"
  />
</template>
