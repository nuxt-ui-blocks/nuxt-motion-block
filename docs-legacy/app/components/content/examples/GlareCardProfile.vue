<template>
  <MGlareCard class="w-72 h-80">
    <div class="flex flex-col items-center text-center space-y-4">
      <UAvatar
        src="https://picsum.photos/200/200"
        size="xl"
        alt="Profile picture"
      />
      <div>
        <h3 class="text-xl font-bold text-white">
          Alex Johnson
        </h3>
        <p class="text-blue-400">
          Senior Developer
        </p>
      </div>
      <p class="text-slate-400 text-sm">
        Passionate about creating beautiful and functional user interfaces with modern web technologies.
      </p>
      <div class="flex space-x-2 pt-2">
        <UButton
          icon="i-simple-icons-github"
          color="gray"
          variant="ghost"
          size="sm"
        />
        <UButton
          icon="i-simple-icons-linkedin"
          color="gray"
          variant="ghost"
          size="sm"
        />
        <UButton
          icon="i-simple-icons-twitter"
          color="gray"
          variant="ghost"
          size="sm"
        />
      </div>
    </div>
  </MGlareCard>
</template>
