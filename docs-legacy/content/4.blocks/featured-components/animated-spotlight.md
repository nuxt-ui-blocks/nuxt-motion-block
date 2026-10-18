---
title: Animated Spotlight
description: An interactive spotlight effect that follows the user's cursor.
navigation:
  icon: i-lucide-sun
---

# Animated Spotlight

An interactive spotlight effect that follows the user's cursor, creating a dynamic focus effect on cards and other UI elements.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-spotlight-feature" />
  :::
#code
```vue
<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
          <UIcon name="i-heroicons-sparkles" class="w-4 h-4" />
          Featured Component
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Animated Spotlight Effect
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Draw attention to important content with our animated spotlight component.
        </p>
      </div>

      <div class="flex justify-center">
        <MAnimatedGroup
          preset="slide"
          :stagger-children="0.1"
        >
          <div class="relative w-full max-w-2xl">
            <MAnimatedSpotlight
              class="absolute top-0 left-0 w-full h-full"
              :opacity="0.8"
              :blur="100"
              :speed="1"
            />
            <UCard
              class="relative z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg"
            >
              <div class="p-8 text-center">
                <div class="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-6">
                  <UIcon name="i-heroicons-light-bulb" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Interactive Demo
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  This card features our animated spotlight effect. Move your cursor around to see the spotlight follow your movement.
                </p>
                <UButton
                  to="#"
                  color="primary"
                  variant="solid"
                >
                  Try It Out
                </UButton>
              </div>
            </UCard>
          </div>
        </MAnimatedGroup>
      </div>
    </div>
  </section>
</template>
```
::