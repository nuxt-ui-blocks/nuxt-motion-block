<template>
  <ComponentPlayground
    name="AnimatedStepper"
    :hide="['items']"
    :defaults="{
      items: [
        { label: 'Account', description: 'Your details', content: 'Create your account and pick a handle.' },
        { label: 'Workspace', description: 'Set up a team', content: 'Name your workspace and invite teammates.' },
        { label: 'Billing', description: 'Add a payment method', content: 'Add a card to start the trial.' },
        { label: 'Review', description: 'Confirm and finish', content: 'Review your setup and launch.' },
      ],
    }"
  />
</template>
