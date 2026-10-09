import { useMediaQuery } from '@vueuse/core'

export const HOVER_CAPABLE_QUERY = '(hover: hover) and (pointer: fine)'

export function useHoverCapable() {
  return useMediaQuery(HOVER_CAPABLE_QUERY)
}
