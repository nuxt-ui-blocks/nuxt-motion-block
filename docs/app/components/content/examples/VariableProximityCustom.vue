<template>
  <ComponentPlayground
    name="VariableProximity"
    :defaults="{
      label: 'Proximity effect',
      fromFontVariationSettings: '\'wght\' 400, \'opsz\' 9',
      toFontVariationSettings: '\'wght\' 1000, \'opsz\' 40',
      radius: 100,
    }"
    :controls="{
      label: { label: 'Label', kind: 'string', placeholder: 'Proximity effect' },
      radius: { label: 'Radius (px)', kind: 'number', min: 20, max: 300, step: 10 },
      fromFontVariationSettings: {
        label: 'From variation settings',
        kind: 'string',
        placeholder: 'wght 400, opsz 9',
      },
      toFontVariationSettings: {
        label: 'To variation settings',
        kind: 'string',
        placeholder: 'wght 1000, opsz 40',
      },
    }"
  />
</template>
