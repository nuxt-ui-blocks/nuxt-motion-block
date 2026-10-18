---
title: Pricing Cards
description: A responsive pricing section with billing period toggle and feature comparisons.
navigation:
  icon: i-lucide-credit-card
---

# Pricing Cards

A responsive pricing section with billing period toggle and feature comparisons. Perfect for showcasing subscription plans and packages.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="pricing-cards-example" />
  :::
#code
```vue
<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
          <UIcon name="i-heroicons-credit-card" class="w-4 h-4" />
          Pricing
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Simple, Transparent Pricing
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include our core features.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div
          v-for="(plan, index) in plans"
          :key="index"
          class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 relative"
          :class="{ 'ring-2 ring-primary-500 border-primary-500': plan.popular }"
        >
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <div
              v-if="plan.popular"
              class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <span class="bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
            <div class="text-center mb-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {{ plan.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ plan.description }}
              </p>
              <div class="mb-6">
                <span class="text-4xl font-bold text-gray-900 dark:text-white">
                  {{ plan.monthlyPrice }}
                </span>
                <span class="text-gray-600 dark:text-gray-400">
                  /month
                </span>
              </div>
            </div>
            <ul class="space-y-3 mb-8">
              <li 
                v-for="(feature, featureIndex) in plan.features" 
                :key="featureIndex"
                class="flex items-center"
              >
                <UIcon name="i-heroicons-check-circle-solid" class="w-5 h-5 text-green-500 mr-2" />
                <span class="text-gray-700 dark:text-gray-300">
                  {{ feature }}
                </span>
              </li>
            </ul>
            <UButton
              :to="plan.cta.to"
              :color="plan.popular ? 'primary' : 'neutral'"
              :variant="plan.popular ? 'solid' : 'outline'"
              size="lg"
              block
            >
              {{ plan.cta.label }}
            </UButton>
          </MInView>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const plans = [
  {
    name: 'Starter',
    monthlyPrice: '$29',
    annualPrice: '$290',
    description: 'Perfect for individuals and small projects',
    features: [
      'Up to 5 projects',
      'Basic components',
      'Email support',
      '1GB storage'
    ],
    cta: {
      label: 'Get Started',
      to: '#'
    }
  },
  {
    name: 'Professional',
    monthlyPrice: '$79',
    annualPrice: '$790',
    description: 'Ideal for growing teams and businesses',
    features: [
      'Unlimited projects',
      'All components',
      'Priority support',
      '10GB storage',
      'Advanced animations',
      'Custom branding'
    ],
    cta: {
      label: 'Try for free',
      to: '#'
    },
    popular: true
  },
  {
    name: 'Enterprise',
    monthlyPrice: '$199',
    annualPrice: '$1990',
    description: 'For large organizations with complex needs',
    features: [
      'Unlimited projects',
      'All components',
      '24/7 dedicated support',
      'Unlimited storage',
      'Advanced animations',
      'Custom branding',
      'Team management',
      'API access'
    ],
    cta: {
      label: 'Contact sales',
      to: '#'
    }
  }
]
</script>
```
::