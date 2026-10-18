<template>
  <div class="flex justify-center h-64">
    <MCardStack
      :items="[
        { id: 1, title: 'First Card', content: 'This is the first card in the stack.', name: 'Alice Johnson', designation: 'Software Engineer' },
        { id: 2, title: 'Second Card', content: 'This is the second card in the stack.', name: 'Bob Smith', designation: 'Product Manager' },
        { id: 3, title: 'Third Card', content: 'This is the third card in the stack.', name: 'Charlie Brown', designation: 'UX Designer' },
      ]"
    />
  </div>
</template>
