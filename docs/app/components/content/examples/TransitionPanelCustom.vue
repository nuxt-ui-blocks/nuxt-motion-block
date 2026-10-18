<template>
  <ComponentPlayground
    name="TransitionPanel"
    :hide="['custom']"
    :defaults="{
      activeIndex: 1,
      variants: {
        enter: { opacity: 0, y: 24, rotateX: -12 },
        center: { opacity: 1, y: 0, rotateX: 0 },
        exit: { opacity: 0, y: -24, rotateX: 12 },
      },
      transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
      class: 'w-full max-w-md overflow-hidden rounded-2xl',
    }"
    :controls="{
      activeIndex: { kind: 'number', label: 'Active index', min: 0, max: 2, step: 1 },
    }"
  >
    <div class="flex h-40 items-center justify-center bg-gradient-to-br from-indigo-500 to-slate-900 p-6 text-center text-white">
      <p class="text-lg font-semibold">
        Panel content
      </p>
    </div>
  </ComponentPlayground>
</template>
