import { defineNuxtPlugin, useAppConfig } from '#imports'
import { setMotionBlockConfig } from '../utils/use-motion-block-config'

export default defineNuxtPlugin(() => {
  // Seed our shared config from `app.config.ui` so `useMotionBlockUI` behaves
  // exactly as it did when it read `app.config` directly. In plain Vue apps
  // the Vue plugin seeds the same store via `setMotionBlockConfig`.
  const appConfig = useAppConfig() as any
  setMotionBlockConfig({ ui: appConfig?.ui ?? {} })
})
