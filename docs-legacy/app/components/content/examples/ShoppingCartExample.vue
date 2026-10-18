<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
      Shopping Cart
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      Review and manage your items before checkout
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">
              Your Items ({{ cartItems.length }})
            </h2>
          </template>

          <div
            v-if="cartItems.length === 0"
            class="text-center py-12"
          >
            <UIcon
              name="i-heroicons-shopping-cart"
              class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500"
            />
            <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Your cart is empty
            </h3>
            <p class="mt-1 text-gray-500 dark:text-gray-400">
              Add some items to your cart to get started
            </p>
            <UButton
              class="mt-6"
              to="/#products"
            >
              Continue Shopping
            </UButton>
          </div>

          <div
            v-else
            class="space-y-6"
          >
            <div
              v-for="(item, index) in cartItems"
              :key="item.id"
              class="flex flex-col sm:flex-row items-start p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors gap-4"
            >
              <MInView
                :variants="{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }"
                :transition="{ duration: 0.3, delay: index * 0.05 }"
                class="w-full flex flex-col sm:flex-row gap-4"
              >
                <!-- Product Image -->
                <div class="flex-shrink-0 w-full sm:w-24 h-24 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-full h-full object-cover"
                  >
                </div>

                <!-- Product Details -->
                <div class="flex-1 min-w-0 w-full">
                  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div class="min-w-0">
                      <h3 class="text-base font-semibold text-gray-900 dark:text-white truncate">
                        {{ item.name }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {{ item.category }}
                      </p>
                    </div>
                    <p class="text-base font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      $<MAnimatedNumber
                        :value="item.price * item.quantity"
                        :decimals="2"
                      />
                    </p>
                  </div>

                  <div class="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="flex items-center">
                      <span class="text-gray-500 dark:text-gray-400 mr-3 text-sm">Qty:</span>
                      <div class="flex items-center border rounded-md bg-white dark:bg-gray-800">
                        <UButton
                          icon="i-heroicons-minus"
                          variant="ghost"
                          size="xs"
                          :disabled="item.quantity <= 1"
                          @click="updateQuantity(item.id, item.quantity - 1)"
                        />
                        <span class="px-3 py-1 text-sm font-medium">{{ item.quantity }}</span>
                        <UButton
                          icon="i-heroicons-plus"
                          variant="ghost"
                          size="xs"
                          @click="updateQuantity(item.id, item.quantity + 1)"
                        />
                      </div>
                    </div>

                    <UButton
                      color="error"
                      variant="ghost"
                      size="sm"
                      class="self-start sm:self-auto"
                      @click="removeItem(item.id)"
                    >
                      <UIcon
                        name="i-heroicons-trash"
                        class="w-4 h-4 mr-1"
                      />
                      Remove
                    </UButton>
                  </div>
                </div>
              </MInView>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Order Summary -->
      <div>
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">
              Order Summary
            </h2>
          </template>

          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span class="font-medium">$<MAnimatedNumber
                :value="subtotal"
                :decimals="2"
              /></span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Shipping</span>
              <span class="font-medium">$<MAnimatedNumber
                :value="shippingCost"
                :decimals="2"
              /></span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Tax</span>
              <span class="font-medium">$<MAnimatedNumber
                :value="tax"
                :decimals="2"
              /></span>
            </div>
            <div
              v-if="discount > 0"
              class="flex justify-between text-green-600 dark:text-green-400"
            >
              <span>Discount</span>
              <span>-$<MAnimatedNumber
                :value="discount"
                :decimals="2"
              /></span>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between text-base font-medium">
              <span>Total</span>
              <span>$<MAnimatedNumber
                :value="total"
                :decimals="2"
              /></span>
            </div>
          </div>

          <!-- Promo Code -->
          <div class="mt-6">
            <h3 class="text-lg font-medium mb-3">
              Promo Code
            </h3>
            <div class="flex gap-2">
              <UInput
                v-model="promoCode"
                placeholder="Enter promo code"
                class="flex-1"
              />
              <UButton
                :loading="applyingPromo"
                @click="applyPromoCode"
              >
                Apply
              </UButton>
            </div>
            <p
              v-if="promoMessage"
              class="mt-2 text-sm"
              :class="promoValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
            >
              {{ promoMessage }}
            </p>
          </div>

          <!-- Checkout Button -->
          <UButton
            color="primary"
            size="lg"
            class="mt-6 w-full"
            :disabled="cartItems.length === 0"
            @click="checkout"
          >
            Proceed to Checkout
          </UButton>

          <!-- Continue Shopping -->
          <UButton
            variant="ghost"
            class="mt-3 w-full"
            to="/#products"
          >
            Continue Shopping
          </UButton>
        </UCard>

        <!-- Savings Banner -->
        <UCard class="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div class="flex items-center">
            <UIcon
              name="i-heroicons-sparkles"
              class="w-6 h-6 mr-3"
            />
            <div>
              <h3 class="font-semibold">
                Free Shipping
              </h3>
              <p class="text-sm opacity-90">
                On orders over $50
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const promoCode = ref('')
const applyingPromo = ref(false)
const promoValid = ref(false)
const promoMessage = ref('')

const cartItems = ref([
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones',
    price: 199.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Track your heart rate and daily activity',
    price: 149.99,
    quantity: 2,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    description: 'Comfortable and breathable cotton t-shirt',
    price: 24.99,
    quantity: 1,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
])

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const shippingCost = computed(() => {
  return subtotal.value >= 50 ? 0 : 5.99
})

const tax = computed(() => {
  return (subtotal.value + shippingCost.value - discount.value) * 0.08
})

const discount = ref(0)

const total = computed(() => {
  return subtotal.value + shippingCost.value + tax.value - discount.value
})

const updateQuantity = (itemId: number, newQuantity: number) => {
  const item = cartItems.value.find(i => i.id === itemId)
  if (item) {
    if (newQuantity <= 0) {
      removeItem(itemId)
    }
    else {
      item.quantity = newQuantity
    }
  }
}

const removeItem = (itemId: number) => {
  const index = cartItems.value.findIndex(i => i.id === itemId)
  if (index !== -1) {
    // Animate removal
    cartItems.value.splice(index, 1)
  }
}

const applyPromoCode = async () => {
  applyingPromo.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Validate promo code
  if (promoCode.value.toUpperCase() === 'SAVE10') {
    promoValid.value = true
    promoMessage.value = 'Promo code applied! 10% discount'
    discount.value = subtotal.value * 0.10
  }
  else if (promoCode.value.toUpperCase() === 'FREESHIP') {
    promoValid.value = true
    promoMessage.value = 'Free shipping applied!'
    // Discount is already handled by shipping cost logic
  }
  else {
    promoValid.value = false
    promoMessage.value = 'Invalid promo code'
    discount.value = 0
  }

  applyingPromo.value = false
}

const checkout = () => {
  // In a real app, this would redirect to checkout page
  useToast().add({
    title: 'Checkout',
    description: 'Proceeding to secure checkout...',
    icon: 'i-heroicons-credit-card',
  })
}
</script>
