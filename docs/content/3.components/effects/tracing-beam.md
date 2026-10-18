---
title: Tracing Beam
description: A beam that follows the user's scroll position.
---

The Tracing Beam component creates a visual beam that follows the user's scroll position, connecting different sections of a page.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="tracing-beam-example" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-12">
    <MTracingBeam>
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-highlighted mb-4">
          The Future of Web Development
        </h1>
        <p class="text-xl text-muted">
          Exploring the latest trends and technologies shaping the web development landscape
        </p>
      </div>

      <div class="space-y-12">
        <div class="bg-default rounded-xl shadow-lg p-6 border border-default">
          <h2 class="text-2xl font-bold text-highlighted mb-4">
            Introduction to Modern Frameworks
          </h2>
          <p class="text-muted mb-4">
            The web development landscape has evolved dramatically over the past decade. With the rise of modern frameworks like Vue.js, React, and Angular,
            developers now have powerful tools at their disposal to build complex, interactive applications.
          </p>
          <div class="flex items-center mt-6">
            <UAvatar
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Author"
              size="md"
              class="mr-4"
            />
            <div>
              <p class="font-medium text-highlighted">
                Alex Johnson
              </p>
              <p class="text-sm text-muted">
                Senior Developer
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h2 class="text-2xl font-bold mb-4">
            Why Vue 3 is Leading the Pack
          </h2>
          <p class="mb-4">
            Vue 3's Composition API has revolutionized how developers approach component architecture. Its flexibility and ease of use make it an excellent
            choice for both beginners and experienced developers.
          </p>
          <div class="flex items-center justify-between mt-6">
            <div class="flex items-center">
              <UIcon
                name="i-heroicons-lightning-bolt"
                class="w-5 h-5 mr-2"
              />
              <span>Performance Focused</span>
            </div>
            <UButton
              color="neutral"
              variant="solid"
              size="sm"
            >
              Learn More
            </UButton>
          </div>
        </div>

        <div class="bg-default rounded-xl shadow-lg p-6 border border-default">
          <h2 class="text-2xl font-bold text-highlighted mb-4">
            The Rise of Server-Side Rendering
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-muted mb-4">
                Server-side rendering (SSR) has become increasingly popular due to its SEO benefits and improved initial load performance.
                Frameworks like Nuxt.js and Next.js have made SSR more accessible than ever.
              </p>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 text-green-500 mr-2"
                  />
                  <span>Faster initial page loads</span>
                </li>
                <li class="flex items-center">
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 text-green-500 mr-2"
                  />
                  <span>Better SEO performance</span>
                </li>
                <li class="flex items-center">
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="w-5 h-5 text-green-500 mr-2"
                  />
                  <span>Improved accessibility</span>
                </li>
              </ul>
            </div>
            <div class="bg-muted rounded-lg p-4 flex items-center justify-center">
              <div class="text-center">
                <UIcon
                  name="i-heroicons-server"
                  class="w-12 h-12 text-muted mx-auto mb-2"
                />
                <p class="text-muted">
                  SSR Architecture
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-default rounded-xl shadow-lg p-6 border border-default">
          <h2 class="text-2xl font-bold text-highlighted mb-4">
            Conclusion
          </h2>
          <p class="text-muted mb-4">
            As we look toward the future, it's clear that web development will continue to evolve rapidly. Staying current with these trends and
            technologies will be crucial for developers who want to build cutting-edge applications.
          </p>
          <div class="mt-6 p-4 bg-primary/5 dark:bg-primary/20 rounded-lg border border-primary/20 dark:border-primary/80">
            <p class="text-primary">
              <span class="font-semibold">Tip:</span> Consider experimenting with these technologies in your next project to see the benefits firsthand.
            </p>
          </div>
        </div>
      </div>
    </MTracingBeam>
  </div>
</template>
```
::

## Examples

### Custom Beam Color

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="tracing-beam-custom" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-12">
    <MTracingBeam :beam-color="['#FF0000', '#00FF00', '#0000FF']">
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-highlighted mb-4">
          Custom Tracing Beam
        </h1>
        <p class="text-xl text-muted">
          Showcasing custom beam colors with vibrant red, green, and blue gradients
        </p>
      </div>

      <div class="space-y-12">
        <div class="bg-default rounded-xl shadow-lg p-6 border border-default">
          <div class="flex items-center mb-4">
            <div class="w-3 h-3 rounded-full bg-red-500 mr-2" />
            <h2 class="text-2xl font-bold text-highlighted">
              Red Section
            </h2>
          </div>
          <p class="text-muted mb-4">
            This section is highlighted with a vibrant red beam color. Red is often associated with energy, passion, and urgency,
            making it perfect for drawing attention to important content.
          </p>
          <div class="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <UIcon
              name="i-heroicons-fire"
              class="w-8 h-8 text-red-500 mr-3"
            />
            <span class="text-red-700 dark:text-red-300 font-medium">High Energy Content</span>
          </div>
        </div>

        <div class="bg-default rounded-xl shadow-lg p-6 border border-default">
          <div class="flex items-center mb-4">
            <div class="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <h2 class="text-2xl font-bold text-highlighted">
              Green Section
            </h2>
          </div>
          <p class="text-muted mb-4">
            The green beam color represents growth, harmony, and balance. It's often used to indicate positive progress or
            successful outcomes in user interfaces.
          </p>
          <div class="grid grid-cols-3 gap-4 mt-6">
            <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <UIcon
                name="i-heroicons-arrow-trending-up"
                class="w-6 h-6 text-green-500 mx-auto mb-2"
              />
              <span class="text-sm text-green-700 dark:text-green-300">Growth</span>
            </div>
            <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <UIcon
                name="i-heroicons-check-badge"
                class="w-6 h-6 text-green-500 mx-auto mb-2"
              />
              <span class="text-sm text-green-700 dark:text-green-300">Success</span>
            </div>
            <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <UIcon
                name="i-heroicons-heart"
                class="w-6 h-6 text-green-500 mx-auto mb-2"
              />
              <span class="text-sm text-green-700 dark:text-green-300">Harmony</span>
            </div>
          </div>
        </div>

        <div class="bg-default rounded-xl shadow-lg p-6 border border-default">
          <div class="flex items-center mb-4">
            <div class="w-3 h-3 rounded-full bg-primary/70 mr-2" />
            <h2 class="text-2xl font-bold text-highlighted">
              Blue Section
            </h2>
          </div>
          <p class="text-muted mb-4">
            Blue is associated with trust, stability, and professionalism. The blue beam color provides a sense of reliability
            and calmness to the content it highlights.
          </p>
          <div class="flex items-center p-4 bg-primary/5 dark:bg-primary/20 rounded-lg border border-primary/20 dark:border-primary/80">
            <UIcon
              name="i-heroicons-shield-check"
              class="w-8 h-8 text-primary mr-3"
            />
            <div>
              <p class="font-medium text-primary">
                Trusted Content
              </p>
              <p class="text-sm text-primary">
                Verified and secure information
              </p>
            </div>
          </div>
        </div>
      </div>
    </MTracingBeam>
  </div>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="tracing-beam-playground" />
  :::
#code
  <PlaygroundCode name="TracingBeam" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container element.
  ::
  ::component-prop{name="beamColor" type="string[]" default="['#18CCFC', '#6344F5', '#AE48FF']"}
  An array of three colors to customize the beam gradient.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.tracingBeam` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative mx-auto h-full w-full max-w-4xl`
  ::
  ::component-slot-row{name="beam"}
  `absolute top-3 -left-4 md:-left-20`
  ::
  ::component-slot-row{name="dot"}
  `border-default ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm`
  ::
  ::component-slot-row{name="dotInner"}
  `h-2 w-2 rounded-full border border-default bg-default`
  ::
  ::component-slot-row{name="svg"}
  `ml-4 block`
  ::
  ::component-slot-row{name="content"}
  ::
::

