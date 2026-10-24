<template>
  <ComponentPlayground
    name="SocialSelector"
    :defaults="{
      handle: 'nuxt',
      platforms: [
        { domain: 'x.com', icon: 'x', name: 'X', url: 'https://x.com/' },
        { domain: 'bsky.app', icon: 'bluesky', name: 'Bluesky', url: 'https://bsky.app/' },
        { domain: 'threads.net', icon: 'threads', name: 'Threads', url: 'https://threads.net/' },
      ],
    }"
    :controls="{
      handle: { label: 'Handle', kind: 'string' },
      platforms: { label: 'Platforms (JSON)', kind: 'json' },
    }"
  />
</template>
