<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-highlighted mb-6">
      RichPopover Demo
    </h1>

    <div class="space-y-8">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-highlighted">
            With Image Content
          </h2>
        </template>
        <div class="flex gap-4">
          <MRichPopover mode="hover">
            <UButton
              label="Hover for Image"
              color="primary"
            />
            <template #content>
              <div class="p-1">
                <img
                  src="https://picsum.photos/300/200"
                  alt="Preview"
                  class="w-full h-40 object-cover rounded-lg"
                >
                <p class="text-xs text-muted mt-2">
                  A random image from the web
                </p>
              </div>
            </template>
          </MRichPopover>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-highlighted">
            With Form
          </h2>
        </template>
        <MRichPopover mode="click">
          <UButton
            label="Click to Open Form"
            color="primary"
          />
          <template #content>
            <div class="p-4 space-y-3 w-72">
              <h3 class="text-sm font-bold text-highlighted">
                Quick Feedback
              </h3>
              <UInput
                placeholder="Your name"
                class="w-full"
              />
              <UTextarea
                placeholder="Your feedback..."
                class="w-full"
                :rows="3"
              />
              <div class="flex justify-end gap-2">
                <UButton
                  label="Cancel"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                />
                <UButton
                  label="Submit"
                  color="primary"
                  size="xs"
                />
              </div>
            </div>
          </template>
        </MRichPopover>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-highlighted">
            With List
          </h2>
        </template>
        <MRichPopover
          mode="click"
          arrow
        >
          <UButton
            label="Notifications"
            icon="i-lucide-bell"
            color="primary"
          />
          <template #content>
            <div class="w-64">
              <div class="p-2 border-b border-default">
                <h3 class="text-xs font-bold text-muted uppercase">
                  Notifications
                </h3>
              </div>
              <div class="divide-y divide-default">
                <div
                  v-for="(item, i) in notifications"
                  :key="i"
                  class="p-3 hover:bg-muted/50 transition-colors"
                >
                  <p class="text-sm text-highlighted">
                    {{ item.title }}
                  </p>
                  <p class="text-xs text-muted">
                    {{ item.time }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </MRichPopover>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-highlighted">
            Hover Trigger with Arrow
          </h2>
        </template>
        <div class="flex gap-4">
          <MRichPopover
            mode="hover"
            arrow
          >
            <UButton
              label="Hover Me"
              color="secondary"
            />
            <template #content>
              <div class="p-3 w-48">
                <p class="text-sm text-highlighted font-medium">
                  Popover Content
                </p>
                <p class="text-xs text-muted mt-1">
                  This popover has an arrow pointing to the trigger.
                </p>
              </div>
            </template>
          </MRichPopover>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold text-highlighted">
            User Profile Card
          </h2>
        </template>
        <MRichPopover mode="hover">
          <span class="text-primary underline cursor-pointer">@username</span>
          <template #content>
            <div class="p-4 w-64">
              <div class="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/80?u=user1"
                  alt="User"
                  class="w-12 h-12 rounded-full"
                >
                <div>
                  <h3 class="text-sm font-bold text-highlighted">
                    Jane Doe
                  </h3>
                  <p class="text-xs text-muted">
                    @janedoe
                  </p>
                </div>
              </div>
              <p class="text-xs text-muted mt-3">
                Product designer building the future of design tools.
              </p>
              <div class="flex gap-4 mt-3 text-xs">
                <span><strong class="text-highlighted">1.2K</strong> <span class="text-muted">followers</span></span>
                <span><strong class="text-highlighted">430</strong> <span class="text-muted">following</span></span>
              </div>
            </div>
          </template>
        </MRichPopover>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const notifications = [
  { title: 'New comment on your post', time: '2 min ago' },
  { title: 'Sarah liked your photo', time: '15 min ago' },
  { title: 'New follower: @alexdev', time: '1 hour ago' },
]
</script>
