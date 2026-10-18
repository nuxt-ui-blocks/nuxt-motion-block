<template>
  <div class="p-4 space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">
        With Delay and Formatting
      </h3>
      <MCountingNumber
        :to="123456"
        :delay="1000"
        :format="(value) => value.toLocaleString()"
      />
    </div>
  </div>
</template>
