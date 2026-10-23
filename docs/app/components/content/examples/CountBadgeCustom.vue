<template>
  <ComponentPlayground
    name="CountBadge"
    :defaults="{
      count: 12,
      max: 99,
      variant: 'count',
      status: 'online',
      position: 'top-right',
      showZero: true,
      ping: false,
      __slot: '<span class=\'grid size-12 place-items-center rounded-full bg-elevated ring-1 ring-default\'><span class=\'size-5 rounded-full bg-muted\'></span></span>',
    }"
    :controls="{
      variant: {
        label: 'Variant',
        kind: 'select',
        options: [
          { label: 'Dot', value: 'dot' },
          { label: 'Count', value: 'count' },
          { label: 'Status', value: 'status' },
        ],
      },
      count: { label: 'Count', kind: 'number', min: 0, max: 200, step: 1 },
      max: { label: 'Max', kind: 'number', min: 1, max: 200, step: 1 },
      status: {
        label: 'Status',
        kind: 'select',
        options: [
          { label: 'Online', value: 'online' },
          { label: 'Offline', value: 'offline' },
          { label: 'Busy', value: 'busy' },
          { label: 'Away', value: 'away' },
        ],
      },
      position: {
        label: 'Position',
        kind: 'select',
        options: [
          { label: 'Top right', value: 'top-right' },
          { label: 'Top left', value: 'top-left' },
          { label: 'Bottom right', value: 'bottom-right' },
          { label: 'Bottom left', value: 'bottom-left' },
        ],
      },
      showZero: { label: 'Show zero', kind: 'boolean' },
      ping: { label: 'Ping', kind: 'boolean' },
    }"
  />
</template>
