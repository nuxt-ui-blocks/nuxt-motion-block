<template>
  <ComponentPlayground
    name="CodeBlock"
    :defaults="{
      code: 'export function useCounter(initial = 0) {\n  const count = ref(initial)\n  const increment = () => count.value++\n  return { count, increment }\n}',
    }"
  />
</template>
