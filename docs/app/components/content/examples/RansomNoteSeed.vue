<template>
  <div class="flex flex-col items-center gap-6">
    <MRansomNote
      :seed="1"
      text="SEED ONE"
    />
    <MRansomNote
      :seed="7"
      text="SEED SEVEN"
    />
    <p class="max-w-sm text-center text-sm text-muted">
      Same word, two seeds. Every scrap's rotation, skew, font and paper colour is
      drawn from one seeded generator in a fixed order, so a given seed always
      produces the same collage — on the server and on the client.
    </p>
  </div>
</template>
