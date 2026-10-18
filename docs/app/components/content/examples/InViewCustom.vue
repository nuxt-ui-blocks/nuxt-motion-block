<template>
  <ComponentPlayground
    name="InView"
    :defaults="{
      as: 'div',
      once: true,
      variants: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
      transition: { duration: 0.6, ease: 'easeOut' },
      viewOptions: { threshold: 0.1, margin: '0px' },
    }"
    :controls="{
      as: {
        kind: 'select',
        options: [
          { label: 'div', value: 'div' },
          { label: 'section', value: 'section' },
          { label: 'article', value: 'article' },
          { label: 'span', value: 'span' },
        ],
      },
      once: { kind: 'boolean', label: 'Once' },
    }"
  >
    <div class="rounded-xl bg-primary/10 p-6 text-center text-highlighted">
      Scroll me into view
    </div>
  </ComponentPlayground>
</template>
