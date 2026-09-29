<template>
  <div class="space-y-12">
    <UPageHeader
      title="MailCard"
      description="UCard with expandable/collapsible content and layout animation."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Expandable Mail Cards
        </p>
      </template>
      <div class="space-y-3">
        <MMailCard
          v-for="(email, index) in emails"
          :key="index"
          :title="email.title"
          :preview="email.preview"
        >
          <p class="text-muted">
            {{ email.body }}
          </p>
          <div class="flex gap-2 mt-4">
            <UButton
              label="Reply"
              size="xs"
              color="primary"
              variant="outline"
            />
            <UButton
              label="Forward"
              size="xs"
              color="neutral"
              variant="outline"
            />
          </div>
        </MMailCard>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Single Controlled Card
        </p>
      </template>
      <MMailCard
        title="Welcome to our platform!"
        preview="Thank you for signing up..."
        :expanded="isExpanded"
        @update:expanded="isExpanded = $event"
      >
        <div class="space-y-3">
          <p class="text-muted">
            We're excited to have you on board. Here are a few things to get you started:
          </p>
          <ul class="list-disc list-inside text-sm text-muted space-y-1">
            <li>Complete your profile setup</li>
            <li>Connect your first integration</li>
            <li>Explore the dashboard</li>
          </ul>
        </div>
      </MMailCard>
      <p class="text-sm text-muted mt-3">
        Expanded: {{ isExpanded }}
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const isExpanded = ref(false)

const emails = [
  {
    title: 'Meeting Update',
    preview: 'The quarterly review has been rescheduled to next Tuesday at 2 PM.',
    body: 'The quarterly review has been rescheduled to next Tuesday at 2 PM. Please update your calendars accordingly. The meeting will be held in Conference Room B.',
  },
  {
    title: 'New Feature Release',
    preview: 'We just shipped version 2.0 with exciting new features...',
    body: 'We just shipped version 2.0 with exciting new features including real-time collaboration, improved performance, and a redesigned dashboard. Check out the release notes for full details.',
  },
  {
    title: 'Action Required',
    preview: 'Your account needs verification to continue.',
    body: 'Please verify your email address by clicking the link in the verification email we sent. This is required to maintain access to your account.',
  },
]
</script>
