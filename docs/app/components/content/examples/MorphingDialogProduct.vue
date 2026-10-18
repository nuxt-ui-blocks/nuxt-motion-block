<script setup lang="ts">
const product = {
  name: 'Bauhaus Table Lamp',
  price: '$349',
  description:
    'A sculptural brass table lamp with an adjustable shade, produced in small batches and inspired by 1920s Bauhaus design.',
  image:
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
}
</script>

<template>
  <MMorphingDialog layout-id>
    <MMorphingDialogTrigger
      class="w-64 overflow-hidden rounded-2xl border border-default bg-elevated text-left"
    >
      <img
        :src="product.image"
        :alt="product.name"
        class="h-40 w-full object-cover"
      >
      <div class="flex items-center justify-between gap-2 p-4">
        <span class="text-sm font-medium text-highlighted">{{ product.name }}</span>
        <span class="text-sm text-muted">{{ product.price }}</span>
      </div>
    </MMorphingDialogTrigger>

    <template #content="{ close }">
      <div class="w-full">
        <img
          :src="product.image"
          :alt="product.name"
          class="h-56 w-full object-cover"
        >
        <div class="flex flex-col gap-4 p-6">
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-lg font-semibold text-highlighted">
              {{ product.name }}
            </h3>
            <span class="text-lg font-medium text-muted">{{ product.price }}</span>
          </div>
          <p class="text-sm text-muted">
            {{ product.description }}
          </p>
          <div class="flex justify-end gap-2">
            <UButton
              label="Close"
              color="neutral"
              variant="outline"
              @click="close"
            />
            <UButton
              label="Add to cart"
              @click="close"
            />
          </div>
        </div>
      </div>
    </template>
  </MMorphingDialog>
</template>
