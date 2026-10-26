<template>
  <ComponentPlayground
    name="FileTree"
    :defaults="{
      items: [
        {
          id: 'src',
          name: 'src',
          type: 'folder',
          children: [
            {
              id: 'src/components',
              name: 'components',
              type: 'folder',
              children: [
                { id: 'src/components/button', name: 'Button.vue', type: 'file' },
                { id: 'src/components/card', name: 'Card.vue', type: 'file' },
              ],
            },
            { id: 'src/app', name: 'App.vue', type: 'file' },
          ],
        },
        { id: 'package', name: 'package.json', type: 'file' },
      ],
      expanded: ['src'],
      selected: 'src/app',
      indent: 16,
      showLines: true,
    }"
    :handlers="{
      'update:expanded': handleExpanded,
      'update:selected': handleSelected,
    }"
    :controls="{
      expanded: { label: 'Expanded ids', kind: 'array' },
      selected: { label: 'Selected id', kind: 'string' },
      indent: { label: 'Indent', kind: 'number', min: 8, max: 32, step: 4 },
      showLines: { label: 'Guide lines', kind: 'boolean' },
      items: { label: 'Items', kind: 'json' },
    }"
  />
</template>

<script setup lang="ts">
function handleExpanded({ args, model }: { args: unknown[], model: Record<string, any> }) {
  model.expanded = args[0]
}

function handleSelected({ args, model }: { args: unknown[], model: Record<string, any> }) {
  model.selected = args[0]
}
</script>
