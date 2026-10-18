<template>
  <div class="w-full max-w-6xl mx-auto px-4 py-12">
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Interactive Journey Showcase
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Experience a guided journey through our platform features with animated progress indicators
      </p>
    </div>

    <MTracingBeam class="pb-20">
      <!-- Introduction Section -->
      <div class="mb-16">
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div class="max-w-3xl mx-auto text-center">
            <UIcon
              name="i-heroicons-lightning-bolt"
              class="w-12 h-12 mx-auto mb-6"
            />
            <h2 class="text-3xl font-bold mb-4">
              Welcome to Our Platform
            </h2>
            <p class="text-xl opacity-90 mb-8">
              Discover how our innovative solutions can transform your workflow and boost productivity
            </p>
            <UButton
              color="neutral"
              variant="solid"
              size="lg"
              class="font-medium"
            >
              Get Started
            </UButton>
          </div>
        </div>
      </div>

      <!-- Feature 1: Analytics -->
      <div class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <UBadge
              color="primary"
              variant="subtle"
              size="lg"
              class="mb-4"
            >
              Feature 1
            </UBadge>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Real-time Analytics Dashboard
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Gain instant insights with our powerful analytics engine. Track performance metrics, user engagement, and conversion rates in real-time.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <UIcon
                  name="i-heroicons-check-circle-solid"
                  class="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                />
                <span class="text-gray-700 dark:text-gray-300">Live data visualization with customizable charts</span>
              </li>
              <li class="flex items-start">
                <UIcon
                  name="i-heroicons-check-circle-solid"
                  class="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                />
                <span class="text-gray-700 dark:text-gray-300">Automated reporting and alerts</span>
              </li>
              <li class="flex items-start">
                <UIcon
                  name="i-heroicons-check-circle-solid"
                  class="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                />
                <span class="text-gray-700 dark:text-gray-300">Export data in multiple formats</span>
              </li>
            </ul>
            <UButton
              color="primary"
              variant="solid"
              size="md"
            >
              Explore Analytics
            </UButton>
          </div>
          <div class="order-1 lg:order-2">
            <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 aspect-video flex items-center justify-center">
              <div class="text-center">
                <UIcon
                  name="i-heroicons-chart-bar"
                  class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4"
                />
                <p class="text-gray-500 dark:text-gray-400 font-medium">
                  Analytics Dashboard Preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature 2: Automation -->
      <div class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="lg:col-span-2 text-center mb-12">
            <UBadge
              color="secondary"
              variant="subtle"
              size="lg"
              class="mb-4"
            >
              Feature 2
            </UBadge>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Intelligent Automation
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Streamline your workflows with AI-powered automation that learns and adapts to your business needs
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div class="flex items-start mb-6">
              <div class="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                <UIcon
                  name="i-heroicons-cog-8-tooth"
                  class="w-6 h-6 text-blue-600 dark:text-blue-400"
                />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Workflow Builder
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Create complex automation sequences with our intuitive drag-and-drop interface
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div class="flex items-start mb-6">
              <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4">
                <UIcon
                  name="i-heroicons-bolt"
                  class="w-6 h-6 text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  AI Recommendations
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Get smart suggestions for optimizing your automated processes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature 3: Collaboration -->
      <div class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <UBadge
              color="success"
              variant="subtle"
              size="lg"
              class="mb-4"
            >
              Feature 3
            </UBadge>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Seamless Collaboration
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Work together in real-time with your team members, regardless of their location. Share ideas, provide feedback, and make decisions faster.
            </p>
            <div class="space-y-4 mb-8">
              <div class="flex items-center">
                <UIcon
                  name="i-heroicons-user-group"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3"
                />
                <span class="text-gray-700 dark:text-gray-300">Real-time document editing</span>
              </div>
              <div class="flex items-center">
                <UIcon
                  name="i-heroicons-chat-bubble-left-right"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3"
                />
                <span class="text-gray-700 dark:text-gray-300">Integrated messaging system</span>
              </div>
              <div class="flex items-center">
                <UIcon
                  name="i-heroicons-lock-closed"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3"
                />
                <span class="text-gray-700 dark:text-gray-300">Enterprise-grade security</span>
              </div>
            </div>
            <UButton
              color="success"
              variant="solid"
              size="md"
            >
              Start Collaborating
            </UButton>
          </div>
          <div>
            <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <div class="flex items-center mb-6">
                <UAvatar
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Team Member"
                  size="md"
                  class="mr-3 ring-2 ring-white"
                />
                <UAvatar
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Team Member"
                  size="md"
                  class="mr-3 ring-2 ring-white -ml-2"
                />
                <UAvatar
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Team Member"
                  size="md"
                  class="mr-3 ring-2 ring-white -ml-2"
                />
                <div class="bg-gray-200 dark:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center -ml-2">
                  <span class="text-xs font-bold">+5</span>
                </div>
              </div>
              <h3 class="text-xl font-bold mb-2">
                Active Collaboration
              </h3>
              <p class="opacity-90 mb-6">
                Join ongoing discussions and contribute to team projects in real-time
              </p>
              <div class="bg-black/20 rounded-lg p-4">
                <div class="flex items-center mb-3">
                  <span class="text-xs font-mono bg-gray-800 px-2 py-1 rounded mr-2">Sarah</span>
                  <span class="text-xs opacity-75">2 minutes ago</span>
                </div>
                <p class="text-sm">
                  Just finished the analytics dashboard prototype. Would love your feedback on the color scheme!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div>
        <div class="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl shadow-xl p-12 text-center text-white">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using our platform to boost productivity and collaboration
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <UButton
              color="neutral"
              variant="solid"
              size="lg"
              class="font-medium"
            >
              Start Free Trial
            </UButton>
            <UButton
              color="primary"
              variant="solid"
              size="lg"
              class="font-medium bg-white/10 hover:bg-white/20"
            >
              Schedule Demo
            </UButton>
          </div>
        </div>
      </div>
    </MTracingBeam>
  </div>
</template>
