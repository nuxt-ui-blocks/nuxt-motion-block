import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    base: 'm-basic-dropdown__trigger min-h-[44px] w-full justify-between gap-2 rounded-lg px-4 text-left',
    trailing: 'pe-4',
    content: 'm-basic-dropdown__content rounded-lg',
    group: 'm-basic-dropdown__group',
    item: 'm-basic-dropdown__item',
    itemLabel: 'm-basic-dropdown__item-label',
    viewport: 'm-basic-dropdown__viewport',
    itemLeadingIcon: 'size-5 shrink-0',
    itemWrapper: 'm-basic-dropdown__item-wrapper',
    itemTrailing: 'm-basic-dropdown__item-trailing',
    itemTrailingIcon: 'm-basic-dropdown__check',
    checkIcon: 'h-4 w-4 text-primary',
    chevronIcon: 'h-4 w-4',
  },
}

export type BasicDropdownTheme = typeof defaultTheme

export type BasicDropdownConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'basicDropdown', 'ui'>

export default defaultTheme
