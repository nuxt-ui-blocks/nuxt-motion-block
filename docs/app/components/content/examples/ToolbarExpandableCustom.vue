<template>
  <ComponentPlayground
    name="ToolbarExpandable"
    :defaults="{
      items: [
        { id: 'cut', label: 'Cut', icon: 'i-lucide-scissors', content: 'Cut the current selection.' },
        { id: 'copy', label: 'Copy', icon: 'i-lucide-copy', content: 'Copy the selection to the clipboard.' },
        { id: 'paste', label: 'Paste', icon: 'i-lucide-clipboard', content: 'Paste from the clipboard.' },
      ],
    }"
    :hide="['items']"
  />
</template>
