<template>
  <div class="flex w-full items-center justify-center p-6">
    <MUserAccountAvatar :user="user" />
  </div>
</template>

<script setup lang="ts">
const user = {
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces',
  name: 'Maya Chen',
  email: 'maya@northwind.studio',
}
</script>
