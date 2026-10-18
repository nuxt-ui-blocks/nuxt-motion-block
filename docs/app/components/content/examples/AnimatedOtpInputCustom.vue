<template>
  <ComponentPlayground
    name="AnimatedOTPInput"
    :defaults="{ length: 6, variant: 'outline', size: 'lg', color: 'primary', disabled: false }"
    :controls="{ length: { kind: 'number', min: 4, max: 8, step: 1 }, disabled: { kind: 'boolean', label: 'Disabled' }, variant: { kind: 'select', options: [{ label: 'Outline', value: 'outline' }, { label: 'Soft', value: 'soft' }, { label: 'Subtle', value: 'subtle' }, { label: 'Ghost', value: 'ghost' }, { label: 'None', value: 'none' }] }, size: { kind: 'select', options: [{ label: 'Extra small', value: 'xs' }, { label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }, { label: 'Extra large', value: 'xl' }] }, color: { kind: 'select', options: [{ label: 'Primary', value: 'primary' }, { label: 'Error', value: 'error' }, { label: 'Success', value: 'success' }, { label: 'Warning', value: 'warning' }, { label: 'Info', value: 'info' }, { label: 'Neutral', value: 'neutral' }] } }"
  />
</template>
