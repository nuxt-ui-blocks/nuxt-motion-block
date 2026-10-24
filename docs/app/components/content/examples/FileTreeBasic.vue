<template>
  <div class="flex w-full justify-center py-6">
    <MFileTree
      :items="items"
      :default-expanded="['src', 'src/components']"
      show-lines
      class="w-full max-w-sm rounded-lg border border-default bg-default p-3"
    />
  </div>
</template>

<script setup lang="ts">
interface TreeItem {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: TreeItem[]
  badge?: string
}

const items: TreeItem[] = [
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
          {
            id: 'src/components/file-tree',
            name: 'FileTree.vue',
            type: 'file',
            badge: 'modified',
          },
        ],
      },
      { id: 'src/app', name: 'App.vue', type: 'file' },
      { id: 'src/main', name: 'main.ts', type: 'file' },
    ],
  },
  {
    id: 'docs',
    name: 'docs',
    type: 'folder',
    children: [
      { id: 'docs/readme', name: 'README.md', type: 'file' },
    ],
  },
  { id: 'package', name: 'package.json', type: 'file' },
]
</script>
