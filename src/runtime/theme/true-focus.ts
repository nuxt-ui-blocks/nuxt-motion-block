import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative flex gap-4 justify-center items-center flex-wrap',
    word: 'relative text-[3rem] font-black cursor-pointer',
    focus: 'absolute top-0 left-0 pointer-events-none box-border border-0',
    corner: 'absolute w-4 h-4 border-[3px] rounded-[3px]',
  },
  variants: {
    position: {
      topLeft: { corner: 'top-[-10px] left-[-10px] border-r-0 border-b-0' },
      topRight: { corner: 'top-[-10px] right-[-10px] border-l-0 border-b-0' },
      bottomLeft: { corner: 'bottom-[-10px] left-[-10px] border-r-0 border-t-0' },
      bottomRight: { corner: 'bottom-[-10px] right-[-10px] border-l-0 border-t-0' },
    },
  },
}

export type TrueFocusTheme = typeof defaultTheme

export type TrueFocusConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'trueFocus', 'ui'>

export default defaultTheme
