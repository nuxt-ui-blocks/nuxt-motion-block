<template>
  <ComponentPlayground
    name="InlineTestimonials"
    min-height="260px"
    :hide="['openId']"
    :controls="{
      text: { kind: 'textarea' },
      testimonials: { kind: 'json' },
      avatarSize: { kind: 'number', min: 16, max: 40, step: 1 },
    }"
  />
</template>
