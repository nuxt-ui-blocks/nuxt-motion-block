import { ref } from 'vue'

export const appConfig = ref<Record<string, any>>({ ui: {} })

export function useAppConfig() {
  return appConfig.value
}

export const colorMode = ref<'light' | 'dark' | 'system'>('light')

export function useColorMode() {
  return colorMode
}
