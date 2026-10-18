<script setup lang="ts">
const { seo } = useAppConfig()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <!-- <AppHeader />

    <UMain> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- </UMain>

    <AppFooter /> -->
  </UApp>
</template>
