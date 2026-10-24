<template>
  <div class="flex w-full items-center justify-center p-6">
    <MGitHubStarsAnimation
      :star-count="1284"
      :stargazers="stargazers"
    />
  </div>
</template>

<script setup lang="ts">
const stargazers = [
  {
    login: 'averycole',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces',
    html_url: 'https://github.com/averycole',
  },
  {
    login: 'jordanlee',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces',
    html_url: 'https://github.com/jordanlee',
  },
  {
    login: 'samrivera',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces',
    html_url: 'https://github.com/samrivera',
  },
  {
    login: 'morganchen',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces',
    html_url: 'https://github.com/morganchen',
  },
  {
    login: 'rileyng',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=faces',
    html_url: 'https://github.com/rileyng',
  },
]
</script>
