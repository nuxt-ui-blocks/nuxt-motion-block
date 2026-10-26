<template>
  <div class="flex flex-wrap items-center justify-center gap-8 py-8">
    <MCountBadge
      :count="8"
      variant="count"
    >
      <span class="grid size-12 place-items-center rounded-full bg-elevated ring-1 ring-default">
        <UIcon
          class="size-5 text-muted"
          name="i-lucide-bell"
        />
      </span>
    </MCountBadge>

    <MCountBadge
      :count="128"
      :max="99"
      variant="count"
    >
      <span class="grid size-12 place-items-center rounded-full bg-elevated ring-1 ring-default">
        <UIcon
          class="size-5 text-muted"
          name="i-lucide-inbox"
        />
      </span>
    </MCountBadge>

    <MCountBadge
      status="online"
      variant="status"
    >
      <span class="grid size-12 place-items-center rounded-full bg-elevated ring-1 ring-default">
        <UIcon
          class="size-5 text-muted"
          name="i-lucide-user"
        />
      </span>
    </MCountBadge>

    <MCountBadge
      ping
      variant="dot"
    >
      <span class="grid size-12 place-items-center rounded-full bg-elevated ring-1 ring-default">
        <UIcon
          class="size-5 text-muted"
          name="i-lucide-radio"
        />
      </span>
    </MCountBadge>
  </div>
</template>
