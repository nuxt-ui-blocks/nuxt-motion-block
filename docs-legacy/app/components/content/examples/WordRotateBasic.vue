<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <div class="text-center max-w-2xl">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        <span class="text-gray-900 dark:text-white">We </span>
        <MWordRotate
          :words="['Design', 'Build', 'Create', 'Develop']"
          class="text-blue-600 dark:text-blue-400 inline-block"
        />
        <span class="text-gray-900 dark:text-white"> Amazing Experiences</span>
      </h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Transform your digital presence with our cutting-edge solutions that
        <MWordRotate
          :words="['innovate', 'inspire', 'elevate', 'revolutionize']"
          animation="slide"
          class="text-purple-600 dark:text-purple-400 font-semibold"
        />
        the way users interact with technology.
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <UButton
          size="lg"
          color="primary"
        >
          Get Started
        </UButton>
        <UButton
          size="lg"
          variant="outline"
        >
          Learn More
        </UButton>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-12">
      <div class="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
          <MWordRotate
            :words="['99%', '100%', '98%', '99.9%']"
            animation="flip"
            :duration="2000"
          />
        </div>
        <div class="text-gray-600 dark:text-gray-400 text-sm">
          Uptime
        </div>
      </div>

      <div class="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="text-3xl font-bold text-green-600 dark:text-green-400">
          <MWordRotate
            :words="['24/7', 'Always', 'Round', 'Full']"
            animation="slide"
            :duration="2500"
          />
        </div>
        <div class="text-gray-600 dark:text-gray-400 text-sm">
          Support
        </div>
      </div>

      <div class="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
          <MWordRotate
            :words="['10K+', '15K+', '20K+', '25K+']"
            animation="fade"
            :duration="3000"
          />
        </div>
        <div class="text-gray-600 dark:text-gray-400 text-sm">
          Users
        </div>
      </div>

      <div class="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
          <MWordRotate
            :words="['5★', '4.9★', 'A+', 'Top']"
            animation="flip"
            :duration="2000"
          />
        </div>
        <div class="text-gray-600 dark:text-gray-400 text-sm">
          Rating
        </div>
      </div>
    </div>
  </div>
</template>
