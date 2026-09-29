import type { InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export interface DisclosureContext {
  open: Ref<boolean>
  toggle: () => void
  variants?: Record<string, any>
}

export const DISCLOSURE_INJECTION_KEY = Symbol('disclosure') as InjectionKey<DisclosureContext>

export function provideDisclosure(context: DisclosureContext) {
  provide(DISCLOSURE_INJECTION_KEY, context)
}

export function injectDisclosure(): DisclosureContext {
  const context = inject<DisclosureContext>(DISCLOSURE_INJECTION_KEY)
  if (!context) {
    throw new Error('injectDisclosure must be used within a MDisclosure component')
  }
  return context
}
