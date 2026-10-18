<template>
  <div class="flex justify-center h-64">
    <MCardStack
      :items="[
        { id: 1, title: 'Fast Rotation', content: 'This stack rotates every 2 seconds.', name: 'Timer', designation: 'Demo' },
        { id: 2, title: 'Second Card', content: 'Notice the faster rotation speed.', name: 'Timer', designation: 'Demo' },
        { id: 3, title: 'Third Card', content: 'Great for dynamic content.', name: 'Timer', designation: 'Demo' },
      ]"
      :rotate-interval="2000"
    />
  </div>
</template>
