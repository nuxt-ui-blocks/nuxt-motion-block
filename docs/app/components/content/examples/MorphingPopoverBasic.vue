<template>
  <div class="flex justify-center items-center">
    <MMorphingPopover>
      <UButton
        color="primary"
        size="lg"
      >
        <UIcon
          name="i-lucide-help-circle"
          class="w-5 h-5 mr-2"
        />
        Help Center
      </UButton>

      <template #content>
        <div class="p-8 w-96">
          <div class="flex items-start mb-6">
            <div class="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/70 flex items-center justify-center mr-4 flex-shrink-0">
              <UIcon
                name="i-lucide-help-circle"
                class="w-6 h-6 text-primary"
              />
            </div>
            <div>
              <h3 class="font-bold text-xl mb-2 text-highlighted">
                Need Help?
              </h3>
              <p class="text-muted text-sm">
                Get assistance with our platform features
              </p>
            </div>
          </div>

          <div class="space-y-4 mb-8">
            <div class="flex items-center p-4 rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <UIcon
                name="i-lucide-book-open"
                class="w-6 h-6 text-muted mr-4"
              />
              <div>
                <div class="font-medium text-highlighted">
                  Documentation
                </div>
                <div class="text-sm text-muted">
                  Comprehensive guides and tutorials
                </div>
              </div>
            </div>
            <div class="flex items-center p-4 rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <UIcon
                name="i-lucide-message-circle"
                class="w-6 h-6 text-muted mr-4"
              />
              <div>
                <div class="font-medium text-highlighted">
                  Contact Support
                </div>
                <div class="text-sm text-muted">
                  24/7 support team ready to help
                </div>
              </div>
            </div>
            <div class="flex items-center p-4 rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <UIcon
                name="i-lucide-youtube"
                class="w-6 h-6 text-muted mr-4"
              />
              <div>
                <div class="font-medium text-highlighted">
                  Video Tutorials
                </div>
                <div class="text-sm text-muted">
                  Step-by-step video guides
                </div>
              </div>
            </div>
          </div>

          <UButton
            color="primary"
            variant="solid"
            block
            size="lg"
          >
            Visit Help Center
          </UButton>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
