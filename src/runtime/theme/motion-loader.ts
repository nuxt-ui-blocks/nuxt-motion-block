import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-flex shrink-0 items-center justify-center',
    srLabel: 'sr-only',
    orbitTrack: 'absolute inset-0 rounded-full border border-current',
    orbitSpin: 'absolute inset-0',
    orbitDot: 'absolute top-0 left-1/2 rounded-full bg-current',
    cradle: 'absolute inset-0 flex items-start justify-center',
    cradleBall: 'relative block',
    cradleRod: 'absolute top-0 bottom-0 left-1/2 w-px bg-current',
    cradleBob: 'absolute bottom-0 left-1/2 rounded-full bg-current',
    pendulumSwing: 'absolute inset-0',
    pendulumRod: 'absolute top-0 bottom-2 left-1/2 w-px bg-current',
    pendulumBob: 'absolute bottom-0 left-1/2 rounded-full bg-current',
    hourglass: 'absolute inset-0 fill-current',
    morphRing: 'absolute inset-0 stroke-current',
    snakeCell: 'absolute rounded-sm bg-current',
    snakeHead: 'absolute top-0 left-0 rounded-sm bg-current',
    cometSpin: 'absolute inset-0',
    cometTrail: 'absolute inset-0',
    cometDot: 'absolute top-0 left-1/2 rounded-full bg-current',
    radarTrack: 'absolute inset-0 rounded-full border border-current',
    radarWrapper: 'absolute inset-0 overflow-hidden rounded-full',
    radarSweep: 'absolute inset-0',
    radarDot: 'absolute top-1/2 left-1/2 rounded-full bg-current',
    cubePerspective: 'absolute inset-0',
    cube: 'absolute inset-0 rounded-md bg-current',
    waveWrapper: 'absolute inset-0 flex items-center justify-between',
    waveBar: 'flex-1 rounded-full bg-current',
    glowRing: 'absolute inset-0 rounded-full bg-current blur-md',
    glowCore: 'rounded-full bg-current',
    dotRingItem: 'absolute top-1/2 left-1/2 rounded-full bg-current',
  },
}

export type MotionLoaderTheme = typeof defaultTheme

export type MotionLoaderConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'motionLoader', 'ui'>

export default defaultTheme
