<template>
  <div class="not-prose w-full">
    <div class="flex flex-col overflow-hidden rounded-lg border border-default">
      <div class="flex flex-col lg:flex-row lg:divide-x divide-y lg:divide-y-0 divide-default">
        <div
          class="relative flex flex-1 items-center justify-center overflow-hidden bg-elevated/40 p-8"
          :style="{ minHeight: minHeight ?? '320px' }"
        >
          <slot
            name="preview"
            :model="model"
          >
            <component
              :is="targetComponent"
              v-if="targetComponent"
              :key="renderKey"
              v-bind="{ ...bindings, ...listeners }"
            >
              <div
                v-if="slotHtml"
                class="contents"
                v-html="slotHtml"
              />
              <slot v-else />
            </component>
            <p
              v-else
              class="text-sm text-muted"
            >
              Component “{{ name }}” is not registered for the playground yet.
            </p>
          </slot>
        </div>

        <div class="w-full shrink-0 bg-default lg:w-80">
          <div class="flex items-center justify-between gap-2 border-b border-default px-4 py-3">
            <p class="text-sm font-semibold text-highlighted">
              Customize
            </p>
            <UButton
              size="xs"
              color="neutral"
              variant="ghost"
              icon="i-lucide-rotate-ccw"
              label="Reset"
              :disabled="!controls.length"
              @click="reset"
            />
          </div>

          <div class="max-h-[520px] space-y-4 overflow-y-auto p-4">
            <slot
              name="controls"
              :model="model"
            >
              <p
                v-if="!controls.length"
                class="text-xs text-muted"
              >
                No customizable props detected for this component.
              </p>

              <div
                v-for="ctrl in controls"
                :key="ctrl.name"
                class="space-y-1.5"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-medium text-muted">{{ ctrl.label }}</span>
                  <span
                    v-if="ctrl.kind === 'number'"
                    class="text-xs tabular-nums text-dimmed"
                  >{{ model[ctrl.name] }}</span>
                  <span
                    v-else-if="ctrl.kind === 'string' || ctrl.kind === 'select'"
                    class="max-w-[9rem] truncate text-xs text-dimmed"
                  >{{ controlLabel(ctrl) }}</span>
                  <span
                    v-else-if="ctrl.kind === 'colors' || ctrl.kind === 'array'"
                    class="text-xs tabular-nums text-dimmed"
                  >{{ (model[ctrl.name] ?? []).length }}</span>
                </div>

                <USwitch
                  v-if="ctrl.kind === 'boolean'"
                  v-model="model[ctrl.name]"
                  :aria-label="ctrl.label"
                  size="sm"
                />
                <USlider
                  v-else-if="ctrl.kind === 'number'"
                  v-model="model[ctrl.name]"
                  :min="ctrl.min"
                  :max="ctrl.max"
                  :step="ctrl.step"
                  :aria-label="ctrl.label"
                />
                <USelect
                  v-else-if="ctrl.kind === 'select'"
                  v-model="model[ctrl.name]"
                  :items="ctrl.options"
                  :aria-label="ctrl.label"
                  size="sm"
                />
                <div
                  v-else-if="ctrl.kind === 'colors'"
                  class="space-y-2"
                >
                  <div
                    v-for="(color, index) in colorsOf(ctrl.name)"
                    :key="index"
                    class="flex items-center gap-2"
                  >
                    <label
                      class="relative size-7 shrink-0 cursor-pointer overflow-hidden rounded-md border border-default"
                      :style="{ background: color }"
                    >
                      <input
                        type="color"
                        :name="ctrl.name"
                        :value="normalizeHex(color)"
                        :aria-label="`${ctrl.label} ${index + 1}`"
                        class="absolute inset-0 size-full cursor-pointer opacity-0"
                        @input="setColor(ctrl.name, index, ($event.target as HTMLInputElement).value)"
                      >
                    </label>
                    <UInput
                      :model-value="color"
                      size="sm"
                      class="flex-1"
                      :name="ctrl.name"
                      :aria-label="`${ctrl.label} ${index + 1} value`"
                      @update:model-value="(value: string) => setColor(ctrl.name, index, value)"
                    />
                    <UButton
                      icon="i-lucide-x"
                      size="xs"
                      color="neutral"
                      variant="ghost"
                      :aria-label="`Remove ${ctrl.label} ${index + 1}`"
                      @click="removeColor(ctrl.name, index)"
                    />
                  </div>
                  <UButton
                    icon="i-lucide-plus"
                    size="xs"
                    color="neutral"
                    variant="soft"
                    label="Add color"
                    block
                    @click="addColor(ctrl.name)"
                  />
                </div>
                <div
                  v-else-if="ctrl.kind === 'color'"
                  class="flex items-center gap-2"
                >
                  <label
                    class="relative size-7 shrink-0 cursor-pointer overflow-hidden rounded-md border border-default"
                    :style="{ background: model[ctrl.name] }"
                  >
                    <input
                      type="color"
                      :name="ctrl.name"
                      :value="normalizeHex(model[ctrl.name])"
                      :aria-label="ctrl.label"
                      class="absolute inset-0 size-full cursor-pointer opacity-0"
                      @input="model[ctrl.name] = ($event.target as HTMLInputElement).value"
                    >
                  </label>
                  <UInput
                    v-model="model[ctrl.name]"
                    size="sm"
                    class="flex-1"
                    :name="ctrl.name"
                    :aria-label="ctrl.label"
                  />
                </div>
                <UInputTags
                  v-else-if="ctrl.kind === 'array'"
                  :id="ctrl.name"
                  v-model="model[ctrl.name]"
                  size="sm"
                  delimiter=","
                  add-on-paste
                  :placeholder="ctrl.placeholder"
                  :aria-label="ctrl.label"
                />
                <UTextarea
                  v-else-if="ctrl.kind === 'json'"
                  v-model="jsonInputs[ctrl.name]"
                  :rows="3"
                  size="sm"
                  :name="ctrl.name"
                  :placeholder="ctrl.placeholder"
                  :aria-label="ctrl.label"
                  :class="jsonError[ctrl.name] ? 'ring-2 ring-error' : ''"
                  @blur="applyJson(ctrl.name)"
                />
                <UTextarea
                  v-else-if="ctrl.kind === 'textarea'"
                  v-model="model[ctrl.name]"
                  :rows="2"
                  size="sm"
                  :name="ctrl.name"
                  :placeholder="ctrl.placeholder"
                  :aria-label="ctrl.label"
                />
                <UInput
                  v-else
                  v-model="model[ctrl.name]"
                  size="sm"
                  :name="ctrl.name"
                  :placeholder="ctrl.placeholder"
                  :aria-label="ctrl.label"
                />
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { playgroundComponents } from './playground-components'
import { playgroundData } from './playground-data'
import { usePlaygroundState } from '../../composables/usePlaygroundState'

type ControlKind = 'number' | 'boolean' | 'string' | 'select' | 'array' | 'color' | 'colors' | 'json' | 'textarea'

interface ControlOverride {
  label?: string
  kind?: ControlKind
  min?: number
  max?: number
  step?: number
  placeholder?: string
  options?: { label: string, value: string | number }[]
  /**
   * Select option value that means "bind nothing at all". Useful for props
   * whose absence carries meaning, like `mood` falling back to `state`:
   * the option exists only in the panel, and the prop is left off the preview
   * and out of the generated snippet. Reka's select items reject an empty
   * string, so a sentinel stands in for "unset".
   */
  unsetValue?: string
}

const props = withDefaults(defineProps<{
  name: string
  minHeight?: string
  hide?: string[]
  controls?: Record<string, ControlOverride>
  defaults?: Record<string, any>
  /**
   * Event handlers keyed by emitted-event name (e.g. `react`). Each handler
   * receives the emitted args plus the reactive `model`, so examples can mutate
   * controlled props (arrays/objects) to demonstrate real interaction.
   */
  handlers?: Record<string, (context: { args: any[], model: Record<string, any> }) => void>
}>(), {
  hide: () => [],
  controls: () => ({}),
  defaults: () => ({}),
})

const HIDDEN = new Set(['class', 'className', 'ui', 'uiProps', 'style', 'containerClass'])

const targetComponent = computed<any>(() => playgroundComponents[props.name] ?? null)

const model = reactive<Record<string, any>>({})
const jsonInputs = reactive<Record<string, string>>({})
const jsonError = reactive<Record<string, boolean>>({})
const renderKey = ref(0)

// Per-component starter data (registry) layered under any explicit `:defaults`,
// so panels begin with meaningful values instead of empty shells.
const mergedDefaults = computed<Record<string, any>>(() => ({
  ...(playgroundData[props.name] ?? {}),
  ...props.defaults,
}))

// Optional default-slot markup supplied via the registry (`__slot`) or an
// explicit `:defaults="{ __slot: '...' }"`. Injected into the component's
// default slot so slot-driven components (cards, panels, lists) render content
// instead of an empty box.
const slotHtml = computed<string>(() => {
  const raw = props.defaults?.__slot ?? (playgroundData[props.name] ?? {}).__slot
  return typeof raw === 'string' ? raw : ''
})

// Optional snippet-only default-slot markup (`__code`). Unlike `__slot` (which is
// injected into the live preview via `v-html` and therefore restricted to raw
// HTML), `__code` feeds only the copy-ready code snippet. This lets components
// whose default slot requires real Vue children (e.g. `ImageComparison`, whose
// `<MImageComparisonImage>` children read injected context) show complete, usable
// usage code while the actual preview children come from the example component.
const codeSlot = computed<string>(() => {
  const raw = props.defaults?.__code ?? (playgroundData[props.name] ?? {}).__code
  return typeof raw === 'string' ? raw : slotHtml.value
})

// Props actually bound to the preview component — strips the reserved `__slot`
// key (and any other `__`-prefixed control-only keys) so Vue doesn't warn about
// extraneous attributes.
// Controls whose select sits on their "unset" option, so the prop is left off
// entirely instead of being passed a placeholder value.
const unsetControls = computed(() => {
  const names = new Set<string>()
  for (const ctrl of controls.value) {
    if (ctrl.unsetValue && model[ctrl.name] === ctrl.unsetValue) names.add(ctrl.name)
  }
  return names
})

const bindings = computed<Record<string, any>>(() => {
  const out: Record<string, any> = {}
  const unset = unsetControls.value
  for (const [key, value] of Object.entries(mergedDefaults.value)) {
    if (!key.startsWith('__') && !unset.has(key)) out[key] = value
  }
  for (const [key, value] of Object.entries(model)) {
    if (!key.startsWith('__') && !unset.has(key)) out[key] = value
  }
  return out
})

function hasType(propDef: any, ctor: any): boolean {
  return propDef?.type === ctor || (Array.isArray(propDef?.type) && propDef.type.includes(ctor))
}

function resolveDefault(propDef: any): any {
  if (!propDef || !('default' in propDef)) return undefined
  const d = propDef.default
  if (typeof d === 'function') {
    try {
      return d()
    }
    catch {
      return undefined
    }
  }
  return d
}

function humanize(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, c => c.toUpperCase())
}

const isColorName = (name: string) => /colou?r|palette/i.test(name)

// Show the selected option's label rather than its raw value, so sentinels and
// lowercase enum values read like the words in the dropdown.
function controlLabel(ctrl: any): string {
  const raw = model[ctrl.name]
  if (ctrl.kind === 'select' && Array.isArray(ctrl.options)) {
    const hit = ctrl.options.find((option: any) =>
      (option && typeof option === 'object' ? option.value : option) === raw)
    if (hit && typeof hit === 'object' && hit.label) return String(hit.label)
  }
  return raw ?? ''
}

const controls = computed(() => {
  const comp = targetComponent.value
  const defs = comp?.props
  if (!defs) return [] as any[]

  const out: any[] = []
  for (const [pname, pdef] of Object.entries<any>(defs)) {
    if (HIDDEN.has(pname) || pname.startsWith('_')) continue
    if (props.hide?.includes(pname)) continue

    const ov = props.controls?.[pname]
    const seeded = mergedDefaults.value[pname]
    const dv = pname in mergedDefaults.value ? seeded : resolveDefault(pdef)
    let kind: ControlKind | undefined = ov?.kind

    if (!kind) {
      if (hasType(pdef, Boolean)) kind = 'boolean'
      else if (hasType(pdef, Number)) kind = 'number'
      else if (hasType(pdef, Array)) {
        const arr = Array.isArray(dv) ? dv : []
        const allStrings = arr.length === 0 || arr.every(x => typeof x === 'string')
        if (isColorName(pname)) kind = 'colors'
        else kind = allStrings ? 'array' : 'json'
      }
      else if (hasType(pdef, Object)) {
        if (isColorName(pname)) kind = 'color'
        else if (pname in mergedDefaults.value) kind = 'json'
        else continue
      }
      else if (hasType(pdef, Function)) continue
      else {
        if (isColorName(pname)) kind = 'color'
        else if (typeof dv === 'number') kind = 'number'
        else if (typeof dv === 'object' || typeof dv === 'function') continue
        else kind = ov?.options ? 'select' : 'string'
      }
    }
    if ((kind as string) === 'object') continue

    const label = ov?.label ?? humanize(pname)
    const control: any = { name: pname, label, kind }
    if (kind === 'number') {
      const base = typeof dv === 'number' ? dv : 0
      control.min = ov?.min ?? Math.min(0, base)
      control.max = ov?.max ?? (base > 0 ? base * 3 : 100)
      control.step = ov?.step ?? (Number.isInteger(base) ? 1 : 0.01)
    }
    if (kind === 'select') control.options = ov?.options ?? []
    if (ov?.unsetValue) control.unsetValue = ov.unsetValue
    control.placeholder = ov?.placeholder
    out.push(control)
  }
  return out
})

const listeners = computed(() => {
  const defs = targetComponent.value?.props ?? {}
  const out: Record<string, any> = {}
  if ('modelValue' in defs) {
    out['onUpdate:modelValue'] = (value: any) => {
      model.modelValue = value
    }
  }
  // Overlay components (dialog, drawer, popover) expose `open` rather than
  // `modelValue`. Forward its updates so closing via overlay/Escape keeps the
  // "Open" control in sync instead of leaving it stuck on.
  if ('open' in model) {
    out['onUpdate:open'] = (value: any) => {
      model.open = value
    }
  }
  for (const [event, handler] of Object.entries(props.handlers ?? {})) {
    out[`on${event.charAt(0).toUpperCase()}${event.slice(1)}`] = (...args: any[]) => {
      handler({ args, model })
    }
  }
  return out
})

function initModel() {
  for (const k of Object.keys(model)) Reflect.deleteProperty(model, k)
  for (const k of Object.keys(jsonInputs)) Reflect.deleteProperty(jsonInputs, k)
  for (const k of Object.keys(jsonError)) Reflect.deleteProperty(jsonError, k)

  const defs = targetComponent.value?.props ?? {}
  for (const ctrl of controls.value) {
    const seeded = ctrl.name in mergedDefaults.value
    const dv = seeded ? mergedDefaults.value[ctrl.name] : resolveDefault(defs[ctrl.name])
    if (ctrl.kind === 'boolean') model[ctrl.name] = dv ?? false
    else if (ctrl.kind === 'number') model[ctrl.name] = typeof dv === 'number' ? dv : ctrl.min ?? 0
    else if (ctrl.kind === 'colors' || ctrl.kind === 'array') {
      const arr = Array.isArray(dv) ? dv : []
      model[ctrl.name] = [...arr]
    }
    else if (ctrl.kind === 'json') {
      model[ctrl.name] = dv ?? null
      jsonInputs[ctrl.name] = dv === undefined || dv === null ? '' : JSON.stringify(dv, null, 2)
    }
    else model[ctrl.name] = dv ?? ''
  }
  // Seed non-control defaults (e.g. object/array props hidden from the panel)
  // so they live in the reactive `model` and can be mutated by `handlers`.
  for (const [key, value] of Object.entries(mergedDefaults.value)) {
    if (key.startsWith('__')) continue
    if (!(key in model)) model[key] = value
  }
  renderKey.value += 1
}

function normalizeHex(value: unknown): string {
  const c = typeof value === 'string' ? value.trim() : ''
  const short = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(c)
  if (short) return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`
  if (/^#[0-9a-f]{6}$/i.test(c)) return c
  if (/^[0-9a-f]{6}$/i.test(c)) return `#${c}`
  return '#000000'
}

function colorsOf(name: string): string[] {
  return Array.isArray(model[name]) ? model[name] : []
}

function setColor(name: string, index: number, value: string) {
  const next = Array.isArray(model[name]) ? [...model[name]] : []
  next[index] = value
  model[name] = next
}

function addColor(name: string) {
  const next = Array.isArray(model[name]) ? [...model[name]] : []
  next.push('#888888')
  model[name] = next
}

function removeColor(name: string, index: number) {
  const next = Array.isArray(model[name]) ? [...model[name]] : []
  next.splice(index, 1)
  model[name] = next
}

function applyJson(name: string) {
  const raw = (jsonInputs[name] ?? '').trim()
  if (!raw) {
    model[name] = null
    jsonError[name] = false
    return
  }
  try {
    model[name] = JSON.parse(raw)
    jsonError[name] = false
  }
  catch {
    jsonError[name] = true
  }
}

function reset() {
  initModel()
}

watch([targetComponent, controls], initModel, { immediate: true })

// Publish the live configuration so the code area below the customizer can
// render a copy-ready usage snippet that tracks every control change.
const playgroundState = usePlaygroundState()

const snapshotProps = computed(() => {
  const out: { name: string, value: unknown }[] = []
  for (const [key, value] of Object.entries(bindings.value)) {
    if (typeof value === 'function') continue
    out.push({ name: key, value })
  }
  return out
})

watchEffect(() => {
  playgroundState.value[props.name] = {
    tag: `M${props.name}`,
    props: snapshotProps.value,
    slot: codeSlot.value,
  }
})
</script>
