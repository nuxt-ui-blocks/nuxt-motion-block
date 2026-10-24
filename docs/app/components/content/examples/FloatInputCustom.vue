<template>
  <ComponentPlayground
    name="FloatInput"
    :defaults="{
      modelValue: '',
      label: 'Email address',
      placeholder: 'you@example.com',
      icon: 'i-lucide-mail',
      disabled: false,
    }"
    :controls="{
      label: { label: 'Label', kind: 'string' },
      placeholder: { label: 'Placeholder', kind: 'string' },
      icon: { label: 'Icon', kind: 'string' },
      disabled: { label: 'Disabled', kind: 'boolean' },
    }"
  />
</template>
