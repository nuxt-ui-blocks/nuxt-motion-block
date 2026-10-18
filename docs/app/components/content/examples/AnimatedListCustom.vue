<template>
  <ComponentPlayground
    name="AnimatedList"
    :hide="['items']"
    :defaults="{
      items: [
        { id: 1, label: 'Deploy', text: 'Production build shipped' },
        { id: 2, label: 'Signup', text: 'New account created' },
        { id: 3, label: 'Payment', text: 'Invoice #1042 paid' },
        { id: 4, label: 'Alert', text: 'CPU usage above 80%' },
      ],
      animation: 'slide',
      maxVisible: 4,
      direction: 'down',
      stagger: 0.05,
      recede: true,
      feed: false,
      feedInterval: 2000,
      pauseOnHover: true,
      class: 'w-full max-w-md',
    }"
    :controls="{
      animation: {
        kind: 'select',
        options: [
          { label: 'Slide', value: 'slide' },
          { label: 'Fade', value: 'fade' },
          { label: 'Scale', value: 'scale' },
        ],
      },
      direction: {
        kind: 'select',
        options: [
          { label: 'Down', value: 'down' },
          { label: 'Up', value: 'up' },
        ],
      },
      maxVisible: { kind: 'number', min: 1, max: 10, step: 1, label: 'Max visible' },
      stagger: { kind: 'number', min: 0, max: 0.3, step: 0.01, label: 'Stagger (s)' },
      recede: { kind: 'boolean', label: 'Recede' },
      feed: { kind: 'boolean', label: 'Feed' },
      feedInterval: { kind: 'number', min: 250, max: 5000, step: 250, label: 'Feed interval (ms)' },
      pauseOnHover: { kind: 'boolean', label: 'Pause on hover' },
    }"
    min-height="360px"
  />
</template>
