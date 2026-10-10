import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative block',
    body: 'absolute',
    understudy: 'absolute rounded-full',
    orb: 'size-full',
    face: 'absolute inset-0 block size-full overflow-visible',
  },
}

export type AiOrbFaceTheme = typeof defaultTheme

export type AiOrbFaceConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiOrbFace', 'ui'>

export default defaultTheme
