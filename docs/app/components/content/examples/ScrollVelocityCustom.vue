<template>
  <ComponentPlayground
    name="ScrollVelocity"
    :defaults="{
      texts: ['Nuxt Motion Block', 'Scroll to move'],
      velocity: 100,
      damping: 50,
      stiffness: 400,
      numCopies: 6,
      velocityMapping: { input: [0, 1000], output: [0, 5] },
      parallaxClass: '',
      scrollerClass: '',
    }"
    :controls="{
      texts: { kind: 'array', label: 'Texts', placeholder: 'Add a phrase...' },
      velocity: { kind: 'number', min: 0, max: 400, step: 10 },
      damping: { kind: 'number', min: 0, max: 100, step: 5 },
      stiffness: { kind: 'number', min: 50, max: 800, step: 50 },
      numCopies: { kind: 'number', min: 2, max: 12, step: 1, label: 'Copies' },
    }"
    :hide="['scrollContainerRef', 'velocityMapping', 'parallaxClass', 'scrollerClass', 'parallaxStyle', 'scrollerStyle']"
  />
</template>
