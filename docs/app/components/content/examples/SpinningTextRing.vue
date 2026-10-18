<template>
  <div class="flex flex-col items-center gap-10 p-8">
    <MSpinningText
      children="TIGHT-AND-FAST"
      class="text-sm font-bold tracking-widest text-primary"
      :radius="2.5"
      :font-size="0.8"
      :duration="4"
    />
    <MSpinningText
      children="REVERSED-SLOW"
      class-name="text-xs uppercase text-muted"
      reverse
      :radius="4"
      :font-size="0.6"
      :duration="16"
    />
  </div>
</template>
