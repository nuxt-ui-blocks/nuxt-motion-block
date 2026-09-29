<template>
  <div class="min-h-screen bg-default p-8">
    <UCard class="mb-8">
      <template #header>
        <h1 class="text-2xl font-bold">
          MToolbarDynamic Demo
        </h1>
      </template>

      <div class="space-y-12">
        <div>
          <h2 class="text-lg font-semibold mb-4">
            Collapsible Toolbar
          </h2>
          <div class="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
            <MToolbarDynamic>
              <template #default>
                <span class="text-sm text-muted px-2">Quick actions</span>
              </template>
              <template #expanded>
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium">Expanded content goes here</span>
                  <UButton
                    size="xs"
                    variant="outline"
                    label="Action 1"
                  />
                  <UButton
                    size="xs"
                    variant="outline"
                    label="Action 2"
                  />
                </div>
              </template>
            </MToolbarDynamic>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">
            Custom Width
          </h2>
          <div class="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
            <MToolbarDynamic
              width="400px"
              collapsed-width="120px"
            >
              <template #default>
                <span class="text-sm text-muted px-2">Menu</span>
              </template>
              <template #expanded>
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium">Custom width toolbar</span>
                  <UButton
                    size="xs"
                    variant="solid"
                    label="Save"
                  />
                </div>
              </template>
            </MToolbarDynamic>
          </div>
        </div>
      </div>

      <template #footer>
        <p class="text-sm text-muted">
          Component: MToolbarDynamic
        </p>
      </template>
    </UCard>
  </div>
</template>
