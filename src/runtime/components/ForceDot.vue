<script setup>
import { ref, onMounted } from 'vue'
import { Motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import forceDot from '../theme/force-dot'

const props = defineProps({
  count: { type: Number, default: 80 }, // number of dots
  width: { type: Number, default: 600 },
  height: { type: Number, default: 600 },
  radius: { type: Number, default: 12 }, // collision radius
  repel: { type: Boolean, default: true }, // mouse repulsion
  attract: { type: Boolean, default: false }, // mouse attraction
  influenceRadius: { type: Number, default: 250 }, // px distance of mouse effect
  maxForce: { type: Number, default: 3 }, // strength of mouse effect
  speed: { type: Number, default: 1 }, // velocity multiplier
  dotClass: { type: String, default: 'fill-neutral-200' }, // style for dots
  class: { type: String, default: undefined },
  ui: { type: Object, default: undefined },
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'forceDot',
  props,
  theme: forceDot,
})

// --- dots state ---
const dots = ref(
  Array.from({ length: props.count }, () => ({
    x: Math.random() * props.width,
    y: Math.random() * props.height,
  })),
)

// --- velocities ---
const velocities = Array.from({ length: props.count }, () => ({
  vx: (Math.random() - 0.5) * 2 * props.speed,
  vy: (Math.random() - 0.5) * 2 * props.speed,
}))

// --- mouse state ---
const mouse = ref({ x: null, y: null, active: false })
function onMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  mouse.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    active: true,
  }
}
function onMouseLeave() {
  mouse.value.active = false
}

// --- fake physics loop ---
onMounted(() => {
  function step() {
    dots.value = dots.value.map((dot, i) => {
      let { vx, vy } = velocities[i]
      let x = dot.x + vx
      let y = dot.y + vy

      // bounce off walls
      if (x < 0 || x > props.width) {
        vx *= -0.9 // reverse & damp for elasticity
        x = Math.max(0, Math.min(props.width, x))
      }
      if (y < 0 || y > props.height) {
        vy *= -0.9
        y = Math.max(0, Math.min(props.height, y))
      }

      // --- mouse influence ---
      if (mouse.value.active) {
        const dx = x - mouse.value.x
        const dy = y - mouse.value.y
        const distSq = dx * dx + dy * dy

        if (distSq < props.influenceRadius * props.influenceRadius) {
          const dist = Math.sqrt(distSq) || 1
          const strength = (1 - dist / props.influenceRadius) * props.maxForce

          if (props.repel) {
            vx += (dx / dist) * strength
            vy += (dy / dist) * strength
          }
          else if (props.attract) {
            vx -= (dx / dist) * strength
            vy -= (dy / dist) * strength
          }
        }
      }

      // store back velocity
      velocities[i].vx = vx * props.speed
      velocities[i].vy = vy * props.speed

      return { x, y }
    })

    // --- collisions (always on) ---
    for (let i = 0; i < props.count; i++) {
      for (let j = i + 1; j < props.count; j++) {
        const dx = dots.value[j].x - dots.value[i].x
        const dy = dots.value[j].y - dots.value[i].y
        const distSq = dx * dx + dy * dy
        const minDist = props.radius * 2
        if (distSq < minDist * minDist && distSq > 0) {
          const dist = Math.sqrt(distSq)
          const overlap = (minDist - dist) / 2
          const nx = dx / dist
          const ny = dy / dist

          dots.value[i].x -= nx * overlap
          dots.value[i].y -= ny * overlap
          dots.value[j].x += nx * overlap
          dots.value[j].y += ny * overlap

          // elastic bounce velocities
          velocities[i].vx -= nx * 0.5
          velocities[i].vy -= ny * 0.5
          velocities[j].vx += nx * 0.5
          velocities[j].vy += ny * 0.5
        }
      }
    }

    requestAnimationFrame(step)
  }

  step()
})
</script>

<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ width: `${width}px`, height: `${height}px` }"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <svg
      :width="width"
      :height="height"
      :class="ui.svg({ class: uiProps.ui?.svg })"
    >
      <Motion
        v-for="(dot, i) in dots"
        :key="i"
        as="g"
        :animate="{ x: dot.x, y: dot.y }"
        :transition="{
          type: 'spring',
          stiffness: 120,
          damping: 15,
          mass: 0.5,
        }"
      >
        <circle
          :r="6"
          :class="ui.dot({ class: [dotClass, uiProps.ui?.dot] })"
        />
      </Motion>
    </svg>
  </div>
</template>
