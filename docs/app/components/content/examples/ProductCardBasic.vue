<template>
  <div class="grid w-full max-w-lg grid-cols-1 gap-5 sm:grid-cols-2">
    <MProductCard
      title="Studio Headphones"
      :price="249"
      :original-price="329"
      currency="$"
      badge="sale"
      :rating="4.6"
      image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
      @add-to-cart="added++"
    />

    <MProductCard
      title="Mechanical Keyboard"
      :price="149"
      currency="$"
      badge="new"
      :rating="4"
      image="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
      @wishlist="wishlisted++"
    />

    <span class="col-span-full text-xs text-muted">
      Added to cart: {{ added }} · wishlisted: {{ wishlisted }}
    </span>
  </div>
</template>

<script setup lang="ts">
const added = ref(0)
const wishlisted = ref(0)
</script>
