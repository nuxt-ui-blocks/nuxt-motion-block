import type { MotionValue, SpringOptions } from 'motion-v'

import { inject, provide } from 'vue'

export interface DockContext {
  mouseX: MotionValue<number>
  spring: SpringOptions
  magnification: number
  distance: number
}

const DOCK_CONTEXT_KEY = Symbol('dock-context')

export function provideDockContext(context: DockContext) {
  provide(DOCK_CONTEXT_KEY, context)
}

export function useDockContext(): DockContext {
  const context = inject<DockContext>(DOCK_CONTEXT_KEY)
  if (!context) {
    throw new Error('useDockContext must be used within a Dock component')
  }
  return context
}
