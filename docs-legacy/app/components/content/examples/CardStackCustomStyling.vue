<template>
  <div class="flex justify-center h-64">
    <MCardStack
      :items="[
        { id: 1, title: 'Custom Style', content: 'This stack has custom dimensions and styling.', name: 'Designer', designation: 'UI/UX' },
        { id: 2, title: 'Second Card', content: 'Notice the different size and colors.', name: 'Designer', designation: 'UI/UX' },
        { id: 3, title: 'Third Card', content: 'Perfect for branded presentations.', name: 'Designer', designation: 'UI/UX' },
      ]"
      class="h-72 w-80"
    />
  </div>
</template>
