<template>
  <div class="space-y-6">
    <div class="flex justify-center h-64">
      <MCardStack
        ref="cardStackRef"
        :items="[
          { id: 1, title: 'Manual Control', content: 'Use the buttons below to control this card stack.', name: 'Control Panel', designation: 'Demo' },
          { id: 2, title: 'Second Card', content: 'This card can be manually rotated.', name: 'Manual Control', designation: 'Demo' },
          { id: 3, title: 'Third Card', content: 'The rotation interval has been disabled.', name: 'Manual Control', designation: 'Demo' },
        ]"
        :auto-rotate="false"
      />
    </div>

    <div class="flex justify-center gap-4">
      <UButton @click="prevCard">
        Previous
      </UButton>
      <UButton @click="nextCard">
        Next
      </UButton>
      <UButton @click="toggleAutoRotate">
        {{ isAutoRotating ? 'Stop' : 'Start' }} Auto Rotate
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cardStackRef = ref()
const isAutoRotating = ref(false)

const nextCard = () => {
  cardStackRef.value.nextCard()
}

const prevCard = () => {
  cardStackRef.value.prevCard()
}

const toggleAutoRotate = () => {
  if (isAutoRotating.value) {
    cardStackRef.value.stopFlipping()
  }
  else {
    cardStackRef.value.startFlipping()
  }
  isAutoRotating.value = !isAutoRotating.value
}
</script>
