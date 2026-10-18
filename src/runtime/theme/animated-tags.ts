import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    chips: 'contents',
    chip: 'group inline-flex cursor-pointer items-center gap-0.5 rounded-sm px-1.5 py-0.5 font-medium ring ring-inset ring-accented bg-elevated text-default transition-colors data-[state=active]:bg-accented',
    chipIcon: 'inline-flex size-3.5 shrink-0 items-center justify-center rounded-xs text-dimmed transition-colors duration-200 hover:bg-accented/75 hover:text-default',
  },
}

export type AnimatedTagsTheme = typeof defaultTheme

export type AnimatedTagsConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedTags', 'ui'>

export default defaultTheme
