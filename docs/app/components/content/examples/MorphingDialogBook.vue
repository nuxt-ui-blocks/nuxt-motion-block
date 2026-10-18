<script setup lang="ts">
const books = [
  {
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    excerpt:
      'I was thirty-seven then, strapped in my seat as the huge 747 plunged through dense cloud cover on approach to Hamburg airport. Cold November rains drenched the earth and lent everything the gloomy air of a Flemish landscape: the ground crew in rain gear, a flag atop a squat airport building, a BMW billboard. So Germany again. Once the plane was on the ground, soft music began to flow from the ceiling speakers.',
  },
  {
    title: 'The Wind-Up Bird Chronicle',
    author: 'Haruki Murakami',
    excerpt:
      'When the phone rang I was in the kitchen, boiling a potful of spaghetti and whistling along with an FM broadcast of the overture to Rossini\'s The Thieving Magpie, which has to be the perfect music for cooking pasta. I wanted to ignore the phone, not only because the spaghetti was nearly done, but because Claudio Abbado was bringing the London Symphony to its musical climax.',
  },
  {
    title: 'Kafka on the Shore',
    author: 'Haruki Murakami',
    excerpt:
      'Cash isn\'t the only thing you can have too much of. Money finds its way into your pocket and out again, but solitude is a different matter. It settles in. It has weight. The kind of weight that makes the air in a room feel thicker, until you are sure you can see the shape of it when you breathe out.',
  },
]
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-2">
    <MMorphingDialog
      v-for="book in books"
      :key="book.title"
      layout-id
    >
      <MMorphingDialogTrigger class="flex w-full items-center gap-3 rounded-xl border border-default bg-elevated p-3 text-left">
        <span class="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
          {{ book.title.charAt(0) }}
        </span>
        <span class="min-w-0">
          <span class="block truncate text-sm font-medium">{{ book.title }}</span>
          <span class="block truncate text-xs text-muted">{{ book.author }}</span>
        </span>
      </MMorphingDialogTrigger>

      <template #content="{ close }">
        <div class="flex max-h-[70vh] flex-col">
          <div class="border-b border-default p-6">
            <h3 class="text-lg font-semibold text-highlighted">
              {{ book.title }}
            </h3>
            <p class="text-sm text-muted">
              {{ book.author }}
            </p>
          </div>
          <div class="overflow-y-auto p-6 text-sm leading-relaxed text-muted">
            <p>{{ book.excerpt }}</p>
          </div>
          <div class="flex justify-end border-t border-default p-4">
            <UButton
              label="Close"
              color="neutral"
              variant="outline"
              @click="close"
            />
          </div>
        </div>
      </template>
    </MMorphingDialog>
  </div>
</template>
