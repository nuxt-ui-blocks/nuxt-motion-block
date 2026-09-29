import type { InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export interface AccordionContext {
  expandedValue: Ref<string | number | null>
  toggleItem: (value: string | number) => void
  variants?: { expanded: Record<string, any>, collapsed: Record<string, any> }
}

export const ACCORDION_INJECTION_KEY = Symbol('accordion') as InjectionKey<AccordionContext>

export function provideAccordion(context: AccordionContext) {
  provide(ACCORDION_INJECTION_KEY, context)
}

export function injectAccordion(): AccordionContext {
  const context = inject<AccordionContext>(ACCORDION_INJECTION_KEY)
  if (!context) {
    throw new Error('injectAccordion must be used within an MAccordion component')
  }
  return context
}

export interface AccordionItemContext {
  value: string | number
  isExpanded: Ref<boolean>
}

export const ACCORDION_ITEM_INJECTION_KEY = Symbol('accordionItem') as InjectionKey<AccordionItemContext>

export function provideAccordionItem(context: AccordionItemContext) {
  provide(ACCORDION_ITEM_INJECTION_KEY, context)
}

export function injectAccordionItem(): AccordionItemContext {
  const context = inject<AccordionItemContext>(ACCORDION_ITEM_INJECTION_KEY)
  if (!context) {
    throw new Error('injectAccordionItem must be used within an MAccordionItem component')
  }
  return context
}
