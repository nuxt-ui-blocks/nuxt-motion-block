<template>
  <div class="grid w-full gap-4 p-6 sm:grid-cols-2">
    <figure class="flex flex-col gap-2">
      <MDitherImage
        alt="Mountain ridges fading into mist"
        algorithm="floyd-steinberg"
        :height="180"
        :levels="4"
        :palette="warm"
        :pixel-size="3"
        progressive
        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=700&q=80&auto=format&fit=crop"
        :width="240"
      />
      <figcaption class="text-xs text-muted">
        Floyd-Steinberg · 4 tones · 3px cells
      </figcaption>
    </figure>

    <figure class="flex flex-col gap-2">
      <MDitherImage
        alt="A still lake beneath snowy peaks"
        algorithm="atkinson"
        :height="180"
        :levels="3"
        :palette="cool"
        :pixel-size="5"
        progressive
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700&q=80&auto=format&fit=crop"
        :width="240"
      />
      <figcaption class="text-xs text-muted">
        Atkinson · 3 tones · 5px cells
      </figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
const warm = ['#101820', '#f2aa4c', '#fff8e7']
const cool = ['#0a1128', '#3b82f6', '#eaf2ff']
</script>
