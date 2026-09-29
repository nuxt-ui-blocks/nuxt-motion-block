<template>
  <div class="min-h-screen bg-default p-8">
    <UCard class="mb-8">
      <template #header>
        <h1 class="text-2xl font-bold">
          MDisclosure Demo
        </h1>
      </template>

      <div class="space-y-8">
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Basic Disclosure
          </h2>
          <MDisclosure>
            <MDisclosureTrigger>
              <UButton
                label="Toggle Content"
                trailing-icon="i-lucide-chevron-down"
              />
            </MDisclosureTrigger>
            <MDisclosureContent>
              <div class="bg-muted rounded-lg p-4 mt-2">
                <p>This is the hidden content revealed by the disclosure trigger.</p>
              </div>
            </MDisclosureContent>
          </MDisclosure>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Default Open
          </h2>
          <MDisclosure :default-open="true">
            <MDisclosureTrigger>
              <UButton
                label="Toggle Details"
                trailing-icon="i-lucide-chevron-down"
              />
            </MDisclosureTrigger>
            <MDisclosureContent>
              <div class="bg-muted rounded-lg p-4 mt-2">
                <p>This disclosure starts in the open state.</p>
              </div>
            </MDisclosureContent>
          </MDisclosure>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            FAQ Example
          </h2>
          <div class="space-y-2">
            <MDisclosure
              v-for="faq in faqs"
              :key="faq.id"
            >
              <MDisclosureTrigger>
                <UButton
                  variant="ghost"
                  :label="faq.question"
                  trailing-icon="i-lucide-chevron-down"
                  class="w-full justify-between"
                />
              </MDisclosureTrigger>
              <MDisclosureContent>
                <div class="text-muted p-4">
                  <p>{{ faq.answer }}</p>
                </div>
              </MDisclosureContent>
            </MDisclosure>
          </div>
        </div>
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Component: MDisclosure (motion-v compound components)
        </p>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  { id: 1, question: 'What is motion-v?', answer: 'motion-v is a Vue animation library that provides a simple, declarative API for animating elements.' },
  { id: 2, question: 'How do animations work?', answer: 'Animations are powered by the Web Animations API and CSS transforms, providing smooth 60fps performance.' },
  { id: 3, question: 'Is it production ready?', answer: 'Yes, motion-v is used in production by many Vue applications and provides stable, performant animations.' },
]
</script>
