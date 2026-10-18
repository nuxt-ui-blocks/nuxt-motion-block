---
seo:
  title: Nuxt Motion Block
  description: Enhance your Nuxt UI with beautiful motion components. A collection of 40+ motion-enhanced components for Nuxt applications.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#title
Enhance Your Nuxt UI with 
::MTextGradient{text='Motion'}
::

#description
A powerful collection of motion components for Nuxt applications. Enhance your UI with beautiful animations and interactions that just work.

#links
  :::MMagnetic
  :::u-button
  ---
  to: /getting-started
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::
  :::
  
  :::div{class="relative"}
  :::MGlowEffect{mode='colorShift' blur="soft" :duration="3" :scale="0.9" class="-z-1" }
  :::
  :::u-button
  ---
  icon: i-simple-icons-github
  color: neutral
  variant: outline
  size: xl
  to: https://github.com/MuhammadKhizar7/nuxt-motion-block
  target: _blank
  ---
  View on GitHub
  :::
  <!-- ::: -->
  :::



#default
  :::prose-pre
  ---
  code: |
    export default defineNuxtConfig({
      modules: [
        '@nuxt/ui',
        'motion-v/nuxt',
        'nuxt-motion-block'
      ]
    })
  filename: nuxt.config.ts
  ---

  ```ts [nuxt.config.ts]
  export default defineNuxtConfig({
    modules: [
      '@nuxt/ui',
      'motion-v/nuxt',
      'nuxt-motion-block'
    ]
  })
  ```
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
30+ Motion-Enhanced Components

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /components
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  Explore Components
  :::

#features
  :::u-page-feature
  ---
  icon: i-lucide-type
  ---
  #title
  Text Animations

  #description
  Bring your content to life with text animations including morphing, scrambling, rolling, and gradient effects.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-sparkles
  ---
  #title
  Visual Effects

  #description
  Add stunning visual effects like glows, trails, and spotlights to enhance your UI components.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-mouse-pointer-2
  ---
  #title
  Interactive Elements

  #description
  Create engaging user experiences with interactive components like custom cursors, docks, and magnetic elements.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  Performance Optimized

  #description
  All components are built with performance in mind, using efficient animations and minimal JavaScript.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-accessibility
  ---
  #title
  Accessibility First

  #description
  Components follow accessibility best practices and work seamlessly with screen readers and keyboard navigation.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-settings
  ---
  #title
  Highly Customizable

  #description
  Every component can be customized through props, slots, and CSS classes to match your design system.
  :::
::

::u-page-section{class="dark:bg-gradient-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: Start building
      to: '/getting-started'
      trailingIcon: i-lucide-arrow-right
    - label: View on GitHub
      to: 'https://github.com/MuhammadKhizar7/nuxt-motion-block'
      target: _blank
      variant: subtle
      icon: i-simple-icons-github
  title: Ready to enhance your Nuxt application?
  description: Join thousands of developers building with Nuxt Motion Block. Install the module and start adding motion today.
  class: dark:bg-neutral-950
  ---

  :stars-bg
  :::
::