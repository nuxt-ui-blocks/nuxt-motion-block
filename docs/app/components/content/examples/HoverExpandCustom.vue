<template>
  <ComponentPlayground
    name="HoverExpand"
    :defaults="{
      items: [
        {
          id: 'lakeside',
          title: 'Lakeside',
          description: 'Still water at first light',
          image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=700&fit=crop',
          alt: 'A lake between mountains at sunrise',
        },
        {
          id: 'desert',
          title: 'Desert',
          description: 'Dunes after the wind',
          image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=700&fit=crop',
          alt: 'Rippled sand dunes',
        },
        {
          id: 'forest',
          title: 'Forest',
          description: 'Fog between the trunks',
          image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=700&fit=crop',
          alt: 'Sunlight through a dense forest',
        },
      ],
      orientation: 'horizontal',
      expandedFlex: 4,
      collapsedFlex: 1,
      showLabelsWhenCollapsed: true,
      class: 'max-w-3xl',
    }"
    :controls="{
      items: { label: 'Items (JSON)', kind: 'json' },
      orientation: {
        label: 'Orientation',
        kind: 'select',
        options: [
          { label: 'Horizontal', value: 'horizontal' },
          { label: 'Vertical', value: 'vertical' },
        ],
      },
      expandedFlex: { label: 'Expanded flex', kind: 'number', min: 1, max: 10, step: 1 },
      collapsedFlex: { label: 'Collapsed flex', kind: 'number', min: 0.2, max: 3, step: 0.2 },
      showLabelsWhenCollapsed: { label: 'Labels when collapsed', kind: 'boolean' },
    }"
  />
</template>
