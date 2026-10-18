<template>
  <div class="flex w-full max-w-lg flex-col gap-3">
    <MAccordion
      v-model="expandedValue"
      :items="faqs"
    >
      <template #default="{ item }">
        <span class="text-sm font-medium text-highlighted">{{ item.label }}</span>
      </template>
    </MAccordion>

    <p class="text-xs text-dimmed">
      {{ expandedValue ? `Expanded: ${expandedValue}` : 'Nothing expanded' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const expandedValue = ref<string | string[] | null>(null)

const faqs = [
  {
    label: 'How do I install the module?',
    value: 'install',
    content: 'Add nuxt-motion-block to your modules array, then drop any M-prefixed component straight into your template.',
  },
  {
    label: 'Does the animation survive SSR?',
    value: 'ssr',
    content: 'Yes. Panels stay mounted when closed by default, so opening is a pure height spring and the content is preserved the whole time.',
  },
  {
    label: 'Can I change the open and close curve?',
    value: 'ui',
    content: 'The panel height runs on a motion-v spring (opening 500/40, closing 550/45). You can tune it or swap it for an easing through the accordion `ui` theme.',
  },
]
</script>
