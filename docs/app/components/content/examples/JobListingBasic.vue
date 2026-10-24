<template>
  <div class="w-full max-w-xl">
    <MJobListing :jobs="jobs" />
  </div>
</template>

<script setup lang="ts">
const jobs = [
  {
    company: 'Northwind',
    title: 'Senior product designer',
    salary: '$140k – $170k',
    location: 'Berlin',
    remote: 'Hybrid' as const,
    postedAt: '2d ago',
    description:
      'Own the end-to-end design of our scheduling product, from the first sketch to the shadcn-free component library the team ships with. You will pair with two engineers and a researcher, run weekly critiques, and keep the design system honest as it grows.',
  },
  {
    company: 'Lumen Labs',
    title: 'Front-end engineer',
    salary: '$120k – $150k',
    location: 'Lisbon',
    remote: 'Yes' as const,
    postedAt: '5d ago',
    description:
      'Build the interface for a real-time analytics tool used by small studios. The stack is Vue, TypeScript and a lot of careful CSS. You will care about keyboard navigation, loading states and the two hundred small decisions that make a dashboard feel fast.',
  },
  {
    company: 'Harbor Studio',
    title: 'Motion designer',
    salary: '$95k – $120k',
    location: 'Copenhagen',
    remote: 'No' as const,
    postedAt: '1w ago',
    description:
      'Shape how our brand moves across product and film. Day to day that means prototyping interactions, writing precise animation specs, and sitting with engineers until the easing curve matches the intent. A reel is worth more than a résumé.',
  },
]
</script>
