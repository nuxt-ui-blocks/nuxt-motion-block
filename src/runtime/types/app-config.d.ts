import type { ComponentConfig } from '@nuxt/ui'
import type * as theme from '../theme'

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

export type MotionBlockComponentConfig<K extends keyof typeof theme> = ComponentConfig<
  (typeof theme)[K],
  Record<string, any>,
  K & string,
  'ui'
>

export type MotionBlockUIConfig = {
  [K in keyof typeof theme]?: DeepPartial<(typeof theme)[K]>
}

export interface MotionBlockAppConfig {
  ui?: MotionBlockUIConfig
}
