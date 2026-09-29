import type { InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export interface MorphingDialogContext {
  isOpen: Ref<boolean>
  setIsOpen: (value: boolean) => void
  uniqueId: string
}

export const MORPHING_DIALOG_INJECTION_KEY = Symbol('morphingDialog') as InjectionKey<MorphingDialogContext>

export function provideMorphingDialog(context: MorphingDialogContext) {
  provide(MORPHING_DIALOG_INJECTION_KEY, context)
}

export function injectMorphingDialog(): MorphingDialogContext {
  const context = inject<MorphingDialogContext>(MORPHING_DIALOG_INJECTION_KEY)
  if (!context) {
    throw new Error('injectMorphingDialog must be used within a MMorphingDialog component')
  }
  return context
}
