export default defineAppConfig({
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://nuxt-motion-block.pages.dev',
  },
  ui: {
    colors: {
      primary: 'teal',
      neutral: 'stone',
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
      },
    },
  },
  seo: {
    siteName: 'Nuxt Motion Block',
  },
  header: {
    title: 'Nuxt Motion Block',
    to: '/',
    logo: {
      alt: 'Nuxt Motion Block',
      light: '',
      dark: '',
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/MuhammadKhizar7/nuxt-motion-block',
      'target': '_blank',
      'aria-label': 'GitHub',
    }],
  },
  footer: {
    credits: `Nuxt Motion Block • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/MuhammadKhizar7/nuxt-motion-block',
      'target': '_blank',
      'aria-label': 'Nuxt Motion Block on GitHub',
    }],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/MuhammadKhizar7/nuxt-motion-block/edit/main/docs/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/MuhammadKhizar7/nuxt-motion-block',
        target: '_blank',
      }, {
        icon: 'i-lucide-book-open',
        label: 'Nuxt Motion Block docs',
        to: '/getting-started',
        target: '_blank',
      }],
    },
  },
})
