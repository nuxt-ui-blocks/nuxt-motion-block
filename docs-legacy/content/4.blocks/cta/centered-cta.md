---
title: Centered CTA
description: A centered call-to-action section with animated background elements.
navigation:
  icon: i-lucide-arrow-right-circle
---

# Centered CTA

A centered call-to-action section with animated background elements. Perfect for driving user engagement and conversions at key points in your website.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="centered-cta-example" />
  :::
#code
```vue
<template>
  <section class="py-20 bg-gradient-to-r from-primary-500 to-indigo-600 text-white">
    <MBackgroundRippleEffect 
      class="absolute inset-0 z-0"
      :colors="['#93c5fd', '#60a5fa', '#a5b4fc']"
    />
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm">
          <UIcon name="i-heroicons-rocket-launch" class="w-4 h-4" />
          What are you waiting for?
        </div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p class="text-lg text-primary-100 mb-8">
          Join thousands of developers who are already building amazing interfaces with our components.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <UButton
            to="#"
            color="white"
            variant="solid"
            size="lg"
          >
            Start Building
          </UButton>
          <UButton
            to="#"
            color="white"
            variant="outline"
            size="lg"
          >
            View Documentation
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
```
::