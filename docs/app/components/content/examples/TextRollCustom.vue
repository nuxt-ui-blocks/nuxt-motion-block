<template>
  <ComponentPlayground
    name="TextRoll"
    :defaults="{
      children: 'Rolling letters',
      duration: 0.5,
    }"
    :controls="{
      children: { label: 'Text', kind: 'string' },
      duration: { label: 'Duration (s)', kind: 'number', min: 0.1, max: 2, step: 0.1 },
    }"
    :hide="['getEnterDelay', 'getExitDelay', 'transition', 'variants', 'onAnimationComplete']"
  />
</template>
