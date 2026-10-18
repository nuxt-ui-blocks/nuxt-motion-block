<template>
  <div class="min-h-screen bg-default">
    <!-- Navigation -->
    <UHeader
      title="SaaSFlow"
      class="sticky top-0 z-50 backdrop-blur-sm bg-default/90 border-b border-default"
    >
      <template #right>
        <div class="hidden md:flex items-center space-x-4">
          <UButton
            to="#"
            variant="ghost"
            color="neutral"
            class="font-medium"
          >
            Sign in
          </UButton>
          <UButton
            to="#"
            variant="solid"
            color="primary"
          >
            Get Started
          </UButton>
        </div>
      </template>

      <template #body>
        <UNavigationMenu
          :items="navigationItems"
          class="flex flex-col space-y-4 md:hidden py-4"
          orientation="vertical"
        >
          <template #item="{ item }">
            <ULink
              v-bind="item"
              class="font-medium text-default hover:text-primary py-2"
            >
              {{ item.label }}
            </ULink>
          </template>
          <template #item-child="{ item }">
            <ULink
              v-bind="item"
              class="block text-sm text-muted hover:text-primary py-1 pl-4 border-l-2 border-primary ml-1"
            >
              {{ item.label }}
            </ULink>
          </template>
        </UNavigationMenu>
        <div class="flex space-x-3 pt-4">
          <UButton
            to="#"
            variant="ghost"
            color="neutral"
            class="flex-1 font-medium"
          >
            Sign in
          </UButton>
          <UButton
            to="#"
            variant="solid"
            color="primary"
            class="flex-1"
          >
            Get Started
          </UButton>
        </div>
      </template>

      <template #default>
        <UNavigationMenu
          :items="navigationItems"
          class="hidden md:flex space-x-6"
        >
          <template #item="{ item }">
            <ULink
              v-bind="item"
              class="font-medium text-default hover:text-primary px-3 py-2 rounded-lg hover:bg-muted"
            >
              {{ item.label }}
            </ULink>
          </template>
          <template #item-child="{ item }">
            <ULink
              v-bind="item"
              class="block px-4 py-3 text-sm hover:bg-muted"
            >
              <div class="font-medium text-default">{{ item.label }}</div>
              <div
                v-if="item.description"
                class="text-muted mt-1"
              >{{ item.description }}</div>
            </ULink>
          </template>
        </UNavigationMenu>
      </template>
    </UHeader>

    <!-- Hero Section -->
    <section class="relative py-20 md:py-28 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10" />
        <div class="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5 }"
            >
              <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                <UIcon
                  name="i-heroicons-sparkles"
                  class="w-4 h-4"
                />
                <span>Enterprise-Grade Security</span>
              </div>
            </MInView>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5, delay: 0.1 }"
            >
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-default mb-6">
                <span class="block">Transform Your</span>
                <span class="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Business Workflow</span>
              </h1>
            </MInView>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5, delay: 0.2 }"
            >
              <p class="text-lg md:text-xl text-muted mb-8 max-w-2xl">
                AI-powered platform that automates complex processes, integrates with your existing tools, and scales with your growing business needs.
              </p>
            </MInView>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5, delay: 0.3 }"
              class="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <UButton
                to="#"
                size="lg"
                color="primary"
                class="font-medium px-8 py-3"
              >
                Start Free Trial
              </UButton>
              <UButton
                to="#"
                variant="outline"
                color="primary"
                size="lg"
                class="font-medium px-8 py-3"
              >
                <UIcon
                  name="i-heroicons-play-circle"
                  class="w-5 h-5 mr-2"
                />
                Watch Demo
              </UButton>
            </MInView>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5, delay: 0.4 }"
            >
              <div class="grid grid-cols-3 gap-8 mt-12">
                <div class="text-center">
                  <div class="text-3xl font-bold text-default mb-2">
                    99.9%
                  </div>
                  <div class="text-sm text-muted">
                    Uptime
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-default mb-2">
                    24/7
                  </div>
                  <div class="text-sm text-muted">
                    Support
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-default mb-2">
                    ISO 27001
                  </div>
                  <div class="text-sm text-muted">
                    Certified
                  </div>
                </div>
              </div>
            </MInView>
          </div>
          <div class="relative">
            <MInView
              :variants="{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }"
              :transition="{ duration: 0.5, delay: 0.2 }"
            >
              <div class="relative rounded-2xl overflow-hidden shadow-xl border border-default bg-elevated">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/5 dark:to-cyan-900/5" />
                <div class="relative p-8">
                  <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center">
                      <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-4">
                        <UIcon
                          name="i-heroicons-chart-bar"
                          class="w-6 h-6 text-blue-600 dark:text-blue-400"
                        />
                      </div>
                      <div>
                        <div class="font-bold text-lg text-default">
                          Performance Metrics
                        </div>
                        <div class="text-sm text-muted">
                          Real-time business insights
                        </div>
                      </div>
                    </div>
                    <UBadge
                      variant="subtle"
                      color="blue"
                      size="sm"
                    >
                      Live Data
                    </UBadge>
                  </div>

                  <div class="space-y-6 mb-8">
                    <div class="flex justify-between items-center pb-4 border-b border-default">
                      <div class="text-sm font-medium text-default">
                        Key Performance Indicators
                      </div>
                      <div class="text-sm text-muted">
                        Updated just now
                      </div>
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                      <div class="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                        <div class="flex items-center">
                          <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                            <UIcon
                              name="i-heroicons-arrow-trending-up"
                              class="w-5 h-5 text-blue-600 dark:text-blue-400"
                            />
                          </div>
                          <div>
                            <div class="font-medium text-default">
                              Revenue Growth
                            </div>
                            <div class="text-xs text-muted">
                              Monthly increase
                            </div>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-xl font-bold text-blue-600 dark:text-blue-400">
                            24%
                          </div>
                          <div class="flex items-center justify-end text-xs text-green-500">
                            <UIcon
                              name="i-heroicons-arrow-up"
                              class="w-3 h-3 mr-1"
                            />
                            <span>+5%</span>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center justify-between p-4 bg-cyan-50 dark:bg-cyan-900/10 rounded-xl">
                        <div class="flex items-center">
                          <div class="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center mr-3">
                            <UIcon
                              name="i-heroicons-user-group"
                              class="w-5 h-5 text-cyan-600 dark:text-cyan-400"
                            />
                          </div>
                          <div>
                            <div class="font-medium text-default">
                              Customer Retention
                            </div>
                            <div class="text-xs text-muted">
                              Quarterly rate
                            </div>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                            87%
                          </div>
                          <div class="flex items-center justify-end text-xs text-green-500">
                            <UIcon
                              name="i-heroicons-arrow-up"
                              class="w-3 h-3 mr-1"
                            />
                            <span>+12%</span>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/10 rounded-xl">
                        <div class="flex items-center">
                          <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800/20 flex items-center justify-center mr-3">
                            <UIcon
                              name="i-heroicons-building-office"
                              class="w-5 h-5 text-gray-600 dark:text-gray-400"
                            />
                          </div>
                          <div>
                            <div class="font-medium text-default">
                              Operational Cost
                            </div>
                            <div class="text-xs text-muted">
                              Reduced this month
                            </div>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-xl font-bold text-gray-600 dark:text-gray-400">
                            42%
                          </div>
                          <div class="flex items-center justify-end text-xs text-green-500">
                            <UIcon
                              name="i-heroicons-arrow-up"
                              class="w-3 h-3 mr-1"
                            />
                            <span>+8%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-between items-center pt-4 border-t border-default">
                    <div class="flex items-center">
                      <div class="flex -space-x-2">
                        <UAvatar
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          size="xs"
                          class="border-2 border-white dark:border-gray-800"
                        />
                        <UAvatar
                          src="https://randomuser.me/api/portraits/women/44.jpg"
                          size="xs"
                          class="border-2 border-white dark:border-gray-800 -ml-2"
                        />
                      </div>
                      <span class="text-sm text-muted ml-2">Active Users</span>
                    </div>
                    <UButton
                      to="#"
                      variant="ghost"
                      color="primary"
                      size="xs"
                      class="font-medium"
                    >
                      View Report
                      <UIcon
                        name="i-heroicons-arrow-right-20-solid"
                        class="w-4 h-4 ml-1"
                      />
                    </UButton>
                  </div>
                </div>
              </div>
            </MInView>
          </div>
        </div>
      </div>
    </section>

    <!-- Logo Cloud -->
    <section class="py-12 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MInView
          :variants="{ hidden: { opacity: 0 }, visible: { opacity: 1 } }"
          :transition="{ duration: 0.5 }"
          class="text-center mb-12"
        >
          <p class="text-muted">
            Trusted by innovative teams at
          </p>
        </MInView>
        <MAnimatedGroup
          :stagger-children="0.1"
          preset="fade"
          initial="hidden"
          animate="visible"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          <div
            v-for="(logo, index) in logos"
            :key="index"
            class="flex justify-center"
          >
            <div class="text-muted font-bold text-xl">
              {{ logo }}
            </div>
          </div>
        </MAnimatedGroup>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5 }"
          >
            <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <UIcon
                name="i-heroicons-light-bulb"
                class="w-4 h-4"
              />
              Powerful Features
            </div>
          </MInView>
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: 0.1 }"
          >
            <h2 class="text-3xl md:text-4xl font-bold text-default mb-4">
              Everything you need in one place
            </h2>
          </MInView>
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: 0.2 }"
          >
            <p class="text-lg text-muted max-w-2xl mx-auto">
              Comprehensive suite of tools designed to streamline your workflow and boost productivity.
            </p>
          </MInView>
        </div>
        <MAnimatedGroup
          :stagger-children="0.1"
          preset="slide"
          initial="hidden"
          animate="visible"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <MInView
            v-for="(feature, index) in features"
            :key="index"
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <UCard
              class="h-full flex flex-col hover:shadow-lg transition-all duration-300 bg-elevated"
              :ui="{ body: { base: 'flex-1 flex flex-col p-6' } }"
            >
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <UIcon
                  :name="feature.icon"
                  class="w-6 h-6 text-primary"
                />
              </div>
              <h3 class="text-xl font-semibold text-default mb-2">
                {{ feature.title }}
              </h3>
              <p class="text-muted mb-4 flex-1">
                {{ feature.description }}
              </p>
            </UCard>
          </MInView>
        </MAnimatedGroup>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gradient-to-r from-primary to-secondary text-white relative">
      <MBackgroundRippleEffect
        class="absolute inset-0 z-0"
        :colors="['var(--ui-color-primary-400)', 'var(--ui-color-secondary-400)', 'var(--ui-color-primary-300)']"
      />
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div
            v-for="(stat, index) in stats"
            :key="index"
          >
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5, delay: index * 0.1 }"
            >
              <MCountingNumber
                :to="stat.value"
                :format="(value) => `${Math.round(value)}${stat.suffix || ''}`"
                class="text-4xl md:text-5xl font-bold mb-2"
              />
            </MInView>
            <p class="text-primary-100">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5 }"
          >
            <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <UIcon
                name="i-heroicons-chat-bubble-left-right"
                class="w-4 h-4"
              />
              Testimonials
            </div>
          </MInView>
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: 0.1 }"
          >
            <h2 class="text-3xl md:text-4xl font-bold text-default mb-4">
              Loved by teams worldwide
            </h2>
          </MInView>
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: 0.2 }"
          >
            <p class="text-lg text-muted max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say.
            </p>
          </MInView>
        </div>
        <MAnimatedGroup
          :stagger-children="0.1"
          preset="slide"
          initial="hidden"
          animate="visible"
          class="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <MInView
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <UCard
              class="bg-elevated"
              :ui="{ body: { base: 'p-6' } }"
            >
              <div class="flex items-center mb-4">
                <UAvatar
                  :src="testimonial.author.avatar"
                  :alt="testimonial.author.name"
                  size="md"
                  class="mr-3"
                />
                <div>
                  <h4 class="font-semibold text-default">
                    {{ testimonial.author.name }}
                  </h4>
                  <p class="text-sm text-muted">
                    {{ testimonial.author.role }}
                  </p>
                </div>
              </div>
              <p class="text-muted mb-4">
                {{ testimonial.content }}
              </p>
              <div class="flex">
                <UIcon
                  v-for="i in 5"
                  :key="i"
                  :name="i <= testimonial.rating ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
                  class="w-5 h-5 text-amber-400"
                />
              </div>
            </UCard>
          </MInView>
        </MAnimatedGroup>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary to-secondary text-white relative">
      <MBackgroundRippleEffect
        class="absolute inset-0 z-0"
        :colors="['var(--ui-color-primary-400)', 'var(--ui-color-secondary-400)', 'var(--ui-color-primary-300)']"
      />
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <MInView
          :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
          :transition="{ duration: 0.5 }"
        >
          <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white">
            <UIcon
              name="i-heroicons-rocket-launch"
              class="w-4 h-4"
            />
            Get Started Today
          </div>
        </MInView>
        <MInView
          :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
          :transition="{ duration: 0.5, delay: 0.1 }"
        >
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform your workflow?
          </h2>
        </MInView>
        <MInView
          :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
          :transition="{ duration: 0.5, delay: 0.2 }"
        >
          <p class="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who are already boosting their productivity with SaaSFlow.
          </p>
        </MInView>
        <MInView
          :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
          :transition="{ duration: 0.5, delay: 0.3 }"
          class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <UButton
            to="#"
            color="white"
            variant="solid"
            size="lg"
            class="font-medium px-8"
          >
            Start Free Trial
          </UButton>
          <UButton
            to="#"
            variant="outline"
            color="white"
            size="lg"
            class="font-medium px-8"
          >
            Schedule a Demo
          </UButton>
        </MInView>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-elevated text-muted py-12 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div class="lg:col-span-2">
            <h3 class="text-white text-xl font-bold mb-4">
              SaaSFlow
            </h3>
            <p class="mb-6 max-w-md">
              Streamline your business operations with our all-in-one platform. Trusted by 10,000+ companies worldwide.
            </p>
            <div class="flex space-x-4">
              <UButton
                v-for="(social, index) in socialLinks"
                :key="index"
                :icon="social.icon"
                :to="social.to"
                color="gray"
                variant="ghost"
                size="sm"
                square
                class="hover:bg-gray-800"
              />
            </div>
          </div>
          <div
            v-for="(column, index) in footerLinks"
            :key="index"
          >
            <h4 class="text-white font-semibold mb-4">
              {{ column.title }}
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(link, linkIndex) in column.links"
                :key="linkIndex"
              >
                <ULink
                  :to="link.to"
                  class="hover:text-white transition-colors hover:underline"
                >
                  {{ link.label }}
                </ULink>
              </li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-12 pt-8 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2023 SaaSFlow. All rights reserved.</p>
          <div class="mt-4 md:mt-0 flex space-x-6">
            <ULink
              to="#"
              class="hover:text-white transition-colors hover:underline"
            >Privacy Policy</ULink>
            <ULink
              to="#"
              class="hover:text-white transition-colors hover:underline"
            >Terms of Service</ULink>
            <ULink
              to="#"
              class="hover:text-white transition-colors hover:underline"
            >Cookies</ULink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const navigationItems = [
  {
    label: 'Product',
    children: [
      {
        label: 'Features',
        description: 'Explore all features',
        to: '#',
      },
      {
        label: 'Integrations',
        description: 'Connect with your tools',
        to: '#',
      },
      {
        label: 'Roadmap',
        description: 'Upcoming features',
        to: '#',
      },
    ],
  },
  {
    label: 'Solutions',
    children: [
      {
        label: 'Marketing',
        description: 'Boost your marketing efforts',
        to: '#',
      },
      {
        label: 'Sales',
        description: 'Close more deals',
        to: '#',
      },
      {
        label: 'HR',
        description: 'Manage your team',
        to: '#',
      },
    ],
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Documentation',
        description: 'Learn how to use SaaSFlow',
        to: '#',
      },
      {
        label: 'Blog',
        description: 'Latest updates and tips',
        to: '#',
      },
      {
        label: 'Community',
        description: 'Join our community',
        to: '#',
      },
    ],
  },
  {
    label: 'Pricing',
    to: '#',
  },
]

const logos = [
  'Acme',
  'Globex',
  'Wayne',
  'Stark',
  'Oscorp',
  'Daily',
]

const features = [
  {
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks and streamline your processes with our intuitive workflow builder.',
    icon: 'i-heroicons-arrow-path',
  },
  {
    title: 'Real-time Analytics',
    description: 'Gain valuable insights with real-time dashboards and customizable reports.',
    icon: 'i-heroicons-chart-bar',
  },
  {
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team through shared workspaces and real-time collaboration.',
    icon: 'i-heroicons-user-group',
  },
  {
    title: 'Secure Data Storage',
    description: 'Enterprise-grade security with end-to-end encryption and compliance certifications.',
    icon: 'i-heroicons-lock-closed',
  },
  {
    title: 'Integrations',
    description: 'Connect with 100+ popular tools including Slack, Google Workspace, and Microsoft 365.',
    icon: 'i-heroicons-plug',
  },
  {
    title: 'Customizable',
    description: 'Tailor the platform to your specific needs with custom fields, views, and automations.',
    icon: 'i-heroicons-adjustments-horizontal',
  },
]

const stats = [
  { value: 10000, label: 'Active Users' },
  { value: 99.9, label: 'Uptime %' },
  { value: 42, label: 'Average % Savings' },
  { value: 24, label: 'Hours Saved/Week' },
]

const testimonials = [
  {
    content: 'SaaSFlow has completely transformed how our team works. We\'ve reduced manual work by 60% and improved our response times significantly.',
    author: {
      name: 'Alex Johnson',
      role: 'Operations Manager',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    rating: 5,
  },
  {
    content: 'The automation features alone are worth the investment. We\'ve automated over 200 recurring tasks, freeing up our team to focus on strategic work.',
    author: {
      name: 'Sarah Williams',
      role: 'CTO',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    rating: 5,
  },
  {
    content: 'Implementation was seamless and the support team is exceptional. We were up and running in just two weeks with minimal training required.',
    author: {
      name: 'Michael Chen',
      role: 'IT Director',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    rating: 4,
  },
]

const socialLinks = [
  { label: 'Twitter', to: '#', icon: 'i-simple-icons-x' },
  { label: 'GitHub', to: '#', icon: 'i-simple-icons-github' },
  { label: 'LinkedIn', to: '#', icon: 'i-simple-icons-linkedin' },
  { label: 'Facebook', to: '#', icon: 'i-simple-icons-facebook' },
]

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '#' },
      { label: 'Solutions', to: '#' },
      { label: 'Pricing', to: '#' },
      { label: 'Changelog', to: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', to: '#' },
      { label: 'Tutorials', to: '#' },
      { label: 'Blog', to: '#' },
      { label: 'Support', to: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Contact', to: '#' },
      { label: 'Partners', to: '#' },
    ],
  },
]
</script>
