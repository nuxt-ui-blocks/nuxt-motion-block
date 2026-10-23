<template>
  <ComponentPlayground
    name="CountryPicker"
    :hide="['countries', 'modelValue', 'defaultValue', 'open', 'defaultOpen', 'disabled']"
    :defaults="{
      label: 'Billing country',
      groupBy: true,
      recent: ['DE', 'US'],
      placeholder: 'Search countries…',
      emptyMessage: 'No countries found',
      showDialCode: true,
      class: 'w-72',
    }"
    :controls="{
      label: { label: 'Label', kind: 'string' },
      groupBy: { label: 'Group by region', kind: 'boolean' },
      recent: { label: 'Recent codes', kind: 'array', placeholder: 'DE, US' },
      placeholder: { label: 'Search placeholder', kind: 'string' },
      emptyMessage: { label: 'Empty message', kind: 'string' },
      showDialCode: { label: 'Show dial code', kind: 'boolean' },
    }"
  />
</template>
