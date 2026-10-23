<template>
  <ComponentPlayground
    name="MorphToggle"
    :defaults="{
      modelValue: true,
      variant: 'morph',
      size: 'md',
      label: 'Toggle',
      disabled: false,
    }"
    :controls="{
      modelValue: { label: 'Checked', kind: 'boolean' },
      variant: {
        label: 'Variant',
        kind: 'select',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Morph', value: 'morph' },
          { label: 'Icon', value: 'icon' },
        ],
      },
      size: {
        label: 'Size',
        kind: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
      disabled: { label: 'Disabled', kind: 'boolean' },
    }"
  />
</template>
