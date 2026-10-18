<template>
  <div class="flex justify-center h-64">
    <MCardStack
      :items="[
        { id: 1, title: 'Card One', content: 'This card has custom spacing.', name: 'Designer One', designation: 'UI Designer' },
        { id: 2, title: 'Card Two', content: 'Notice the increased offset.', name: 'Designer Two', designation: 'UX Designer' },
        { id: 3, title: 'Card Three', content: 'And the different scale factor.', name: 'Designer Three', designation: 'Product Designer' },
      ]"
      :offset="20"
      :scale-factor="0.1"
    />
  </div>
</template>
