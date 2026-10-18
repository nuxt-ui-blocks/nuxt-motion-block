<template>
  <div class="space-y-8 p-8 max-w-4xl mx-auto">
    <!-- Text Highlight -->
    <div class="relative">
      <MGlowEffect
        mode="flowHorizontal"
        :colors="['#60A5FA', '#3B82F6']"
        blur="medium"
        :scale="1.05"
        :duration="4"
      />
      <div class="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Important Announcement
        </h3>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
          We're excited to announce the launch of our new product line. This innovative solution will transform how you work with our platform.
        </p>
      </div>
    </div>

    <!-- Code Block Highlight -->
    <div class="relative">
      <MGlowEffect
        mode="colorShift"
        :colors="['#10B981', '#8B5CF6']"
        blur="strong"
        :scale="1.05"
        :duration="6"
      />
      <div class="relative z-10 p-6 bg-gray-900 rounded-lg shadow-lg">
        <div class="flex items-center justify-between mb-4">
          <span class="text-gray-400 text-sm">example.js</span>
          <UBadge
            variant="soft"
            color="success"
          >
            New
          </UBadge>
        </div>
        <pre class="text-gray-300 text-sm overflow-x-auto"><code>// New API endpoint
const handler = async (req, res) => {
  const result = await processRequest(req)
  return res.status(200).json(result)
}</code></pre>
      </div>
    </div>

    <!-- Feature Highlight -->
    <div class="relative">
      <MGlowEffect
        mode="pulse"
        :colors="['#F59E0B']"
        blur="medium"
        :scale="1.1"
        :duration="3"
      />
      <div class="relative z-10 flex items-start p-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-lg text-white">
        <UIcon
          name="i-heroicons-sparkles"
          class="w-6 h-6 mr-3 mt-1 flex-shrink-0"
        />
        <div>
          <h3 class="text-xl font-bold mb-2">
            Pro Feature
          </h3>
          <p>Unlock advanced capabilities with our premium plan</p>
        </div>
      </div>
    </div>
  </div>
</template>
