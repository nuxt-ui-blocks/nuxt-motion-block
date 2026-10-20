import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative block',
    body: 'absolute',
    understudy: 'absolute rounded-full',
    orb: 'size-full',
    face: 'absolute inset-0 block size-full overflow-visible',
    mouth: '',
  },
}

export type AiOrbFaceMouthTheme = typeof defaultTheme

export type AiOrbFaceMouthConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiOrbFaceMouth', 'ui'>

export default defaultTheme
