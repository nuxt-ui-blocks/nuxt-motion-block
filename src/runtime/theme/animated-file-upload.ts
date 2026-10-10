import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'm-file-upload',
  },
}

export type AnimatedFileUploadTheme = typeof defaultTheme

export type AnimatedFileUploadConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedFileUpload', 'ui'>

export default defaultTheme
