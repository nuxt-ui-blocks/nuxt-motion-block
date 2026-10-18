<template>
  <div class="my-6 overflow-x-auto rounded-lg border border-default">
    <table class="w-full border-collapse text-sm">
      <thead>
        <tr class="border-b border-default bg-elevated/40">
          <th class="px-4 py-2.5 text-left text-xs font-semibold tracking-wide text-highlighted uppercase">
            Event
          </th>
          <th class="px-4 py-2.5 text-left text-xs font-semibold tracking-wide text-highlighted uppercase">
            Payload
          </th>
          <th class="px-4 py-2.5 text-left text-xs font-semibold tracking-wide text-highlighted uppercase">
            Description
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-default">
        <slot />
      </tbody>
    </table>
  </div>
</template>
