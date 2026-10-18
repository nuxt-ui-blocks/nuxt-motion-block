<script setup lang="ts">
const email = ref('')
const username = ref('')
const password = ref('')
</script>

<template>
  <div class="space-y-12">
    <UPageHeader
      title="AnimatedInput"
      description="Text input with a floating animated label, themed with the Nuxt UI design system."
    />

    <section>
      <UCard>
        <template #header>
          <p class="text-2xl font-bold text-highlighted">
            Default
          </p>
          <p class="text-muted">
            Fill or focus the input and the label floats up into the border.
          </p>
        </template>
        <div class="w-full max-w-sm">
          <MAnimatedInput
            label="Name"
            placeholder="Enter your name"
          />
        </div>
      </UCard>
    </section>

    <section>
      <UCard>
        <template #header>
          <p class="text-2xl font-bold text-highlighted">
            With Icons
          </p>
          <p class="text-muted">
            Controlled inputs with leading icons, mirroring the reference docs.
          </p>
        </template>
        <div class="grid gap-8 md:grid-cols-3">
          <MAnimatedInput
            v-model="email"
            icon="i-lucide-mail"
            label="Email Address"
            placeholder="Enter your email"
          />
          <MAnimatedInput
            v-model="username"
            icon="i-lucide-user"
            label="Username"
            placeholder="Choose a username"
          />
          <MAnimatedInput
            v-model="password"
            icon="i-lucide-lock"
            label="Password"
            placeholder="Enter your password"
          />
        </div>
      </UCard>
    </section>

    <section>
      <UCard>
        <template #header>
          <p class="text-2xl font-bold text-highlighted">
            Slot Icon & Disabled
          </p>
          <p class="text-muted">
            Custom slot icon and disabled state.
          </p>
        </template>
        <div class="grid gap-8 md:grid-cols-2">
          <div>
            <MAnimatedInput
              label="Phone"
              placeholder="Enter your phone"
            >
              <template #icon>
                <UIcon
                  name="i-lucide-phone"
                  class="h-4 w-4"
                />
              </template>
            </MAnimatedInput>
          </div>
          <MAnimatedInput
            disabled
            label="Unavailable"
            default-value="Read only"
            icon="i-lucide-shield"
            placeholder="Disabled"
          />
        </div>
      </UCard>
    </section>
  </div>
</template>
