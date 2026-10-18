<template>
  <ComponentPlayground
    name="DynamicGroup"
    :hide="['keyField']"
    :defaults="{ items: ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'] }"
    :controls="{
      direction: {
        kind: 'select',
        options: [
          { label: 'Grid', value: 'grid' },
          { label: 'Row', value: 'row' },
          { label: 'Column', value: 'column' },
        ],
      },
    }"
  />
</template>
