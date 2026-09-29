import type { MaybeRefOrGetter } from 'vue'
import { onBeforeUnmount, onMounted, toValue } from 'vue'

export type ClickOutsideEventType
  = | 'focusin'
    | 'focusout'
    | 'mousedown'
    | 'mouseup'
    | 'touchend'
    | 'touchstart'

export type ClickOutsideTarget = HTMLElement | null | undefined

function isOutside(
  elements: HTMLElement[],
  isTargetList: boolean,
  node: Node,
): boolean {
  // The React reference uses `every` for the list form, so an unresolved list
  // still counts as "outside", while a single unresolved ref counts as
  // "inside". Both branches are reproduced here.
  if (isTargetList) {
    return elements.every(element => !element.contains(node))
  }

  return elements.length > 0 && !elements[0].contains(node)
}

/**
 * Calls `handler` whenever an event of `eventType` lands outside every supplied
 * target. Ports the smoothui `use-click-outside` helper to Vue.
 */
export function useClickOutside(
  target: MaybeRefOrGetter<ClickOutsideTarget | ClickOutsideTarget[]>,
  handler: (event: Event) => void,
  eventType: ClickOutsideEventType = 'mousedown',
): void {
  function callback(event: Event) {
    const node = event.target

    // Ignore events coming from detached nodes.
    if (!(node instanceof Node) || !node.isConnected) {
      return
    }

    const value = toValue(target)
    const isTargetList = Array.isArray(value)
    const elements = (isTargetList ? value : [value]).filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    )

    if (isOutside(elements, isTargetList, node)) {
      handler(event)
    }
  }

  onMounted(() => {
    window.addEventListener(eventType, callback)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(eventType, callback)
  })
}
