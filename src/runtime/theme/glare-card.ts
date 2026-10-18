import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative isolate [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform',
    card: 'h-full will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden relative',
    background: 'absolute inset-0 mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity pointer-events-none z-0 [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)] after:content-[""] after:absolute after:inset-0 after:mix-blend-exclusion after:[background-size:var(--foil-size),_200%_400%,_800%,_200%] after:[background-position:center,_0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)] after:[background-blend-mode:soft-light,_hue,_hard-light]',
    glare: 'absolute inset-0 mix-blend-soft-light opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background pointer-events-none z-10',
    header: 'relative z-10',
    content: 'relative z-10',
    footer: 'relative z-10',
    placeholder: 'text-white space-y-4',
    placeholderIcon: 'w-12 h-12 mx-auto text-blue-400',
    placeholderTitle: 'text-2xl font-bold',
    placeholderText: 'text-slate-400',
  },
}

export type GlareCardTheme = typeof defaultTheme

export type GlareCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'glareCard', 'ui'>

export default defaultTheme
