<template>
  <div class="w-full max-w-md">
    <MTweetCard
      avatar="https://randomuser.me/api/portraits/men/11.jpg"
      author="Devon Achebe"
      handle="devon"
      time="2h"
      :likes="1842"
      :retweets="316"
      content="Spent the afternoon removing a backdrop-filter from a card. The layout shift I was chasing was never the blur — it was the repaint the blur forced on every scroll frame."
    />
  </div>
</template>
