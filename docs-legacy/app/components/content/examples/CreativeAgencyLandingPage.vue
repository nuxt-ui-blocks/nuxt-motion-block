<template>
  <div class="min-h-screen bg-default">
    <!-- Navigation -->
    <UHeader
      title="PixelCraft"
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
            Contact
          </UButton>
          <UButton
            to="#"
            variant="solid"
            color="primary"
          >
            Get a Quote
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
        </UNavigationMenu>
        <div class="flex space-x-3 pt-4">
          <UButton
            to="#"
            variant="ghost"
            color="neutral"
            class="flex-1 font-medium"
          >
            Contact
          </UButton>
          <UButton
            to="#"
            variant="solid"
            color="primary"
            class="flex-1"
          >
            Get a Quote
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
              <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                <UIcon
                  name="i-heroicons-sparkles"
                  class="w-4 h-4"
                />
                <span>Award Winning Agency</span>
              </div>
            </MInView>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5, delay: 0.1 }"
            >
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-default mb-6">
                <span class="block">We Craft Digital</span>
                <span class="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Masterpieces</span>
              </h1>
            </MInView>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5, delay: 0.2 }"
            >
              <p class="text-lg md:text-xl text-muted mb-8 max-w-2xl">
                PixelCraft transforms visionary ideas into stunning digital experiences that captivate audiences and drive measurable results.
              </p>
            </MInView>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5, delay: 0.3 }"
              class="grid grid-cols-2 gap-4 mb-10"
            >
              <UButton
                to="#"
                size="lg"
                color="primary"
                class="font-medium px-8 py-3"
              >
                View Portfolio
              </UButton>
              <UButton
                to="#"
                variant="outline"
                color="primary"
                size="lg"
                class="font-medium px-8 py-3"
              >
                Schedule Call
              </UButton>
            </MInView>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5, delay: 0.4 }"
            >
              <div class="flex items-center">
                <div class="flex -space-x-2">
                  <UAvatar
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    size="sm"
                    class="border-2 border-white dark:border-gray-900"
                  />
                  <UAvatar
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    size="sm"
                    class="border-2 border-white dark:border-gray-900"
                  />
                  <UAvatar
                    src="https://randomuser.me/api/portraits/men/22.jpg"
                    size="sm"
                    class="border-2 border-white dark:border-gray-900"
                  />
                </div>
                <div class="ml-3">
                  <p class="text-sm text-muted">
                    <span class="font-semibold text-default">42+</span> creative professionals ready to bring your vision to life
                  </p>
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
                <div class="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-900/5 dark:to-indigo-900/5" />
                <div class="relative p-8">
                  <div class="mb-8">
                    <div class="flex items-center mb-6">
                      <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-4">
                        <UIcon
                          name="i-heroicons-paint-brush"
                          class="w-6 h-6 text-purple-600 dark:text-purple-400"
                        />
                      </div>
                      <div>
                        <div class="font-bold text-xl text-default">
                          Creative Portfolio
                        </div>
                        <div class="text-sm text-muted">
                          Award-winning design solutions
                        </div>
                      </div>
                    </div>

                    <div class="relative rounded-xl overflow-hidden h-48 mb-6">
                      <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                        <div class="text-white text-center p-4">
                          <div class="text-2xl font-bold mb-2">
                            Featured Project
                          </div>
                          <div class="text-lg">
                            Brand Identity Redesign
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-wrap gap-2 mb-6">
                      <UBadge
                        variant="subtle"
                        color="purple"
                        size="sm"
                      >
                        Branding
                      </UBadge>
                      <UBadge
                        variant="subtle"
                        color="indigo"
                        size="sm"
                      >
                        UI/UX
                      </UBadge>
                      <UBadge
                        variant="subtle"
                        color="purple"
                        size="sm"
                      >
                        Web Design
                      </UBadge>
                      <UBadge
                        variant="subtle"
                        color="indigo"
                        size="sm"
                      >
                        Animation
                      </UBadge>
                    </div>
                  </div>

                  <div class="space-y-4 mb-8">
                    <div class="text-sm font-medium text-default mb-4">
                      Our Creative Process
                    </div>
                    <div class="space-y-3">
                      <div class="flex items-start">
                        <div class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                          1
                        </div>
                        <div>
                          <div class="font-medium text-default">
                            Discovery & Research
                          </div>
                          <div class="text-xs text-muted">
                            Understanding your brand and audience
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start">
                        <div class="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                          2
                        </div>
                        <div>
                          <div class="font-medium text-default">
                            Concept & Strategy
                          </div>
                          <div class="text-xs text-muted">
                            Developing creative solutions
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start">
                        <div class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                          3
                        </div>
                        <div>
                          <div class="font-medium text-default">
                            Design & Execution
                          </div>
                          <div class="text-xs text-muted">
                            Bringing ideas to life
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start">
                        <div class="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                          4
                        </div>
                        <div>
                          <div class="font-medium text-default">
                            Delivery & Support
                          </div>
                          <div class="text-xs text-muted">
                            Launch and ongoing assistance
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
                      <span class="text-sm text-muted ml-2">Team Online</span>
                    </div>
                    <UButton
                      to="#"
                      variant="ghost"
                      color="primary"
                      size="xs"
                      class="font-medium"
                    >
                      View Details
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

    <!-- Services Section -->
    <section class="py-20 bg-muted">
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
              Our Services
            </div>
          </MInView>
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: 0.1 }"
          >
            <h2 class="text-3xl md:text-4xl font-bold text-default mb-4">
              What We Offer
            </h2>
          </MInView>
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: 0.2 }"
          >
            <p class="text-lg text-muted max-w-2xl mx-auto">
              Comprehensive digital solutions to help your business thrive in the online world.
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
            v-for="(service, index) in services"
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
                  :name="service.icon"
                  class="w-6 h-6 text-primary"
                />
              </div>
              <h3 class="text-xl font-semibold text-default mb-2">
                {{ service.title }}
              </h3>
              <p class="text-muted mb-4 flex-1">
                {{ service.description }}
              </p>
              <ULink
                :to="service.link"
                class="text-primary font-medium hover:underline"
              >
                Learn more
              </ULink>
            </UCard>
          </MInView>
        </MAnimatedGroup>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5 }"
            >
              <h2 class="text-3xl md:text-4xl font-bold text-default mb-2">
                Our Portfolio
              </h2>
            </MInView>
            <MInView
              :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
              :transition="{ duration: 0.5, delay: 0.1 }"
            >
              <p class="text-lg text-muted">
                A showcase of our recent work and creative solutions
              </p>
            </MInView>
          </div>
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: 0.2 }"
            class="mt-4 md:mt-0"
          >
            <UButton
              to="#"
              variant="outline"
              color="primary"
              size="lg"
              class="font-medium"
            >
              View All Projects
            </UButton>
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
            v-for="(project, index) in projects"
            :key="index"
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
            class="group relative overflow-hidden rounded-2xl"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <div class="inline-block mb-2">
                <UBadge
                  :color="project.category.color"
                  variant="solid"
                >
                  {{ project.category.name }}
                </UBadge>
              </div>
              <h3 class="text-xl font-bold text-default mb-2">
                {{ project.title }}
              </h3>
              <p class="text-gray-200 mb-4">
                {{ project.description }}
              </p>
              <UButton
                :to="project.link"
                variant="solid"
                color="white"
                size="sm"
                class="font-medium"
              >
                View Case Study
              </UButton>
            </div>
          </MInView>
        </MAnimatedGroup>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                class="text-4xl md:text-5xl font-bold text-primary mb-2"
              />
            </MInView>
            <p class="text-muted">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5 }"
          >
            <div class="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <UIcon
                name="i-heroicons-user-group"
                class="w-4 h-4"
              />
              Our Team
            </div>
          </MInView>
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: 0.1 }"
          >
            <h2 class="text-3xl md:text-4xl font-bold text-default mb-4">
              Meet Our Creative Minds
            </h2>
          </MInView>
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: 0.2 }"
          >
            <p class="text-lg text-muted max-w-2xl mx-auto">
              Talented professionals dedicated to bringing your vision to life.
            </p>
          </MInView>
        </div>
        <MAnimatedGroup
          :stagger-children="0.1"
          preset="slide"
          initial="hidden"
          animate="visible"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <MInView
            v-for="(member, index) in team"
            :key="index"
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <UCard
              class="h-full text-center bg-elevated"
              :ui="{ body: { base: 'p-6' } }"
            >
              <UAvatar
                :src="member.avatar"
                :alt="member.name"
                size="xl"
                class="mx-auto mb-4"
              />
              <h3 class="text-xl font-semibold text-default mb-1">
                {{ member.name }}
              </h3>
              <p class="text-primary mb-3">
                {{ member.role }}
              </p>
              <p class="text-muted text-sm mb-4">
                {{ member.bio }}
              </p>
              <div class="flex justify-center space-x-2">
                <UButton
                  v-for="(social, socialIndex) in member.social"
                  :key="socialIndex"
                  :icon="social.icon"
                  :to="social.link"
                  color="gray"
                  variant="ghost"
                  size="sm"
                  square
                />
              </div>
            </UCard>
          </MInView>
        </MAnimatedGroup>
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
              What Our Clients Say
            </h2>
          </MInView>
          <MInView
            :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
            :transition="{ duration: 0.5, delay: 0.2 }"
          >
            <p class="text-lg text-muted max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
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
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Ready to Bring Your Vision to Life?
          </h2>
        </MInView>
        <MInView
          :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
          :transition="{ duration: 0.5, delay: 0.1 }"
        >
          <p class="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create something amazing. Get in touch with us today for a free consultation.
          </p>
        </MInView>
        <MInView
          :variants="{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }"
          :transition="{ duration: 0.5, delay: 0.2 }"
          class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <UButton
            to="#"
            color="white"
            variant="solid"
            size="lg"
            class="font-medium px-8"
          >
            Get a Quote
          </UButton>
          <UButton
            to="#"
            variant="outline"
            color="white"
            size="lg"
            class="font-medium px-8"
          >
            Schedule a Call
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
              PixelCraft
            </h3>
            <p class="mb-6 max-w-md">
              A full-service digital agency creating stunning websites, brands, and marketing solutions that drive results.
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
          <p>© 2023 PixelCraft. All rights reserved.</p>
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
    label: 'Work',
    to: '#',
  },
  {
    label: 'Services',
    to: '#',
  },
  {
    label: 'About',
    to: '#',
  },
  {
    label: 'Blog',
    to: '#',
  },
  {
    label: 'Contact',
    to: '#',
  },
]

const services = [
  {
    title: 'Web Design',
    description: 'Beautiful, responsive websites that engage your audience and drive conversions.',
    icon: 'i-heroicons-computer-desktop',
    link: '#',
  },
  {
    title: 'Branding',
    description: 'Comprehensive brand identity solutions that make your business memorable.',
    icon: 'i-heroicons-paint-brush',
    link: '#',
  },
  {
    title: 'Marketing',
    description: 'Data-driven digital marketing strategies that deliver measurable results.',
    icon: 'i-heroicons-megaphone',
    link: '#',
  },
  {
    title: 'Development',
    description: 'Custom web applications and platforms built with the latest technologies.',
    icon: 'i-heroicons-code-bracket',
    link: '#',
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that creates intuitive and delightful experiences.',
    icon: 'i-heroicons-pencil-square',
    link: '#',
  },
  {
    title: 'Consulting',
    description: 'Strategic guidance to help your business grow and succeed in the digital landscape.',
    icon: 'i-heroicons-light-bulb',
    link: '#',
  },
]

const projects = [
  {
    title: 'EcoLife App',
    description: 'Sustainable living made simple with our comprehensive mobile application.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: { name: 'Mobile App', color: 'blue' },
    link: '#',
  },
  {
    title: 'FinTech Dashboard',
    description: 'Modern financial dashboard for real-time analytics and reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: { name: 'Web Design', color: 'primary' },
    link: '#',
  },
  {
    title: 'Brewery Branding',
    description: 'Complete brand identity for a craft brewery with packaging design.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: { name: 'Branding', color: 'amber' },
    link: '#',
  },
]

const stats = [
  { value: 250, label: 'Projects Completed', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
  { value: 42, label: 'Team Members', suffix: '+' },
  { value: 5, label: 'Years Experience', suffix: '+' },
]

const team = [
  {
    name: 'Alex Johnson',
    role: 'Creative Director',
    bio: '10+ years of experience in digital design and brand strategy.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    social: [
      { icon: 'i-simple-icons-dribbble', link: '#' },
      { icon: 'i-simple-icons-linkedin', link: '#' },
    ],
  },
  {
    name: 'Sarah Williams',
    role: 'Lead Designer',
    bio: 'Specializes in UI/UX design and front-end development.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    social: [
      { icon: 'i-simple-icons-dribbble', link: '#' },
      { icon: 'i-simple-icons-behance', link: '#' },
    ],
  },
  {
    name: 'Michael Chen',
    role: 'Development Lead',
    bio: 'Full-stack developer with expertise in modern web technologies.',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    social: [
      { icon: 'i-simple-icons-github', link: '#' },
      { icon: 'i-simple-icons-linkedin', link: '#' },
    ],
  },
  {
    name: 'Emma Davis',
    role: 'Marketing Strategist',
    bio: 'Data-driven marketer focused on growth and customer engagement.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    social: [
      { icon: 'i-simple-icons-twitter', link: '#' },
      { icon: 'i-simple-icons-linkedin', link: '#' },
    ],
  },
]

const testimonials = [
  {
    content: 'PixelCraft transformed our online presence completely. Their team understood our vision and delivered beyond expectations. The new website has increased our conversions by 45%.',
    author: {
      name: 'Robert Garcia',
      role: 'CEO, TechStart Inc.',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    },
    rating: 5,
  },
  {
    content: 'Working with PixelCraft was a game-changer for our brand. Their attention to detail and creative approach resulted in a brand identity that perfectly represents who we are.',
    author: {
      name: 'Jennifer Lee',
      role: 'Marketing Director, EcoLife',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    rating: 5,
  },
  {
    content: 'The team at PixelCraft is incredibly talented and professional. They delivered our project on time and within budget, with exceptional quality. Highly recommended!',
    author: {
      name: 'David Wilson',
      role: 'Founder, BrewCraft',
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    },
    rating: 4,
  },
]

const socialLinks = [
  { label: 'Dribbble', to: '#', icon: 'i-simple-icons-dribbble' },
  { label: 'Behance', to: '#', icon: 'i-simple-icons-behance' },
  { label: 'Instagram', to: '#', icon: 'i-simple-icons-instagram' },
  { label: 'LinkedIn', to: '#', icon: 'i-simple-icons-linkedin' },
]

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Web Design', to: '#' },
      { label: 'Branding', to: '#' },
      { label: 'Marketing', to: '#' },
      { label: 'Development', to: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '#' },
      { label: 'Our Team', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Contact', to: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '#' },
      { label: 'Case Studies', to: '#' },
      { label: 'Portfolio', to: '#' },
      { label: 'FAQs', to: '#' },
    ],
  },
]
</script>
