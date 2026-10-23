<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { computed, ref, useId, watch } from 'vue'

export type FormFieldType
  = | 'checkbox'
    | 'email'
    | 'password'
    | 'select'
    | 'tel'
    | 'text'
    | 'textarea'
    | 'url'

export interface FormFieldOption {
  label: string
  value: string
}

export interface FormFieldConfig {
  /** Browser autocomplete hint for the control. */
  autocomplete?: string
  /** Helper copy shown under the control. */
  description?: string
  /** Label rendered above the control. */
  label: string
  /** Key used in the values and errors objects. */
  name: string
  /** Choices for a `select` field. */
  options?: FormFieldOption[]
  /** Placeholder text. */
  placeholder?: string
  /** Marks the underlying control as required. */
  required?: boolean
  /** Textarea height in rows. Defaults to 3. */
  rows?: number
  /** Control to render. Defaults to `text`. */
  type?: FormFieldType
}

export type FormValue = boolean | string

export type FormValues = Record<string, FormValue>

export type FormErrors = Record<string, string | undefined>

export interface FormProps {
  /** Extra classes for the form element. */
  class?: string
  /** Disable every control and the default submit button. */
  disabled?: boolean
  /** Field errors keyed by field name. */
  errors?: FormErrors
  /** Field schema rendered in order. */
  fields: FormFieldConfig[]
  /** Controlled values keyed by field name. */
  modelValue?: FormValues
  /** Copy shown once a previously invalid field is fixed. */
  successMessage?: string
  /** Label for the default submit button. */
  submitLabel?: string
}

const props = withDefaults(defineProps<FormProps>(), {
  class: undefined,
  disabled: false,
  errors: () => ({}),
  modelValue: undefined,
  successMessage: 'Looks good',
  submitLabel: 'Submit',
})

const emit = defineEmits<{
  'submit': [values: FormValues]
  'update:modelValue': [values: FormValues]
}>()

const SHAKE_FRAMES = [0, -6, 5, -4, 3, -1, 0].map(offset => ({
  transform: `translateX(${offset}px)`,
}))
const SHAKE_DURATION = 400
const SHAKE_EASING = 'cubic-bezier(0.36, 0.07, 0.19, 0.97)'
const STAGGER_DELAY = 40
const ID_SAFE = /[^\w-]/g

const uid = useId().replace(ID_SAFE, '')
const internalValues = ref<FormValues>({})
const submitCount = ref(0)
const previousErrors = ref<FormErrors>({})
const fieldElements = new Map<string, HTMLElement>()

const isControlled = computed(() => props.modelValue !== undefined)
const values = computed(() => props.modelValue ?? internalValues.value)

function setFieldElement(
  name: string,
  element: Element | ComponentPublicInstance | null,
) {
  if (element instanceof HTMLElement) {
    fieldElements.set(name, element)
  }
  else {
    fieldElements.delete(name)
  }
}

function valueFor(field: FormFieldConfig): FormValue {
  const current = values.value[field.name]

  if (current !== undefined) {
    return current
  }

  return field.type === 'checkbox' ? false : ''
}

function textValue(field: FormFieldConfig) {
  const current = valueFor(field)

  return typeof current === 'string' ? current : ''
}

function checkboxValue(field: FormFieldConfig) {
  return Boolean(valueFor(field))
}

function inputType(field: FormFieldConfig) {
  switch (field.type) {
    case 'email':
    case 'password':
    case 'tel':
    case 'url':
      return field.type
    default:
      return 'text'
  }
}

function errorFor(field: FormFieldConfig) {
  return props.errors[field.name]
}

function isInvalid(field: FormFieldConfig) {
  return Boolean(errorFor(field))
}

function fieldId(name: string) {
  return `${uid}-${name}`
}

function descriptionId(name: string) {
  return `${uid}-${name}-description`
}

function messageId(name: string) {
  return `${uid}-${name}-message`
}

function describedBy(field: FormFieldConfig) {
  const ids: string[] = []

  if (field.description) {
    ids.push(descriptionId(field.name))
  }

  if (isInvalid(field)) {
    ids.push(messageId(field.name))
  }

  return ids.length > 0 ? ids.join(' ') : undefined
}

function showSuccess(field: FormFieldConfig) {
  return (
    submitCount.value > 0
    && Boolean(previousErrors.value[field.name])
    && !isInvalid(field)
  )
}

function updateField(name: string, value: FormValue | number | null | undefined) {
  const nextValue
    = typeof value === 'boolean'
      ? value
      : value === null || value === undefined
        ? ''
        : String(value)
  const next = { ...values.value, [name]: nextValue }

  if (!isControlled.value) {
    internalValues.value = next
  }

  emit('update:modelValue', next)
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function shakeField(name: string) {
  if (prefersReducedMotion()) {
    return
  }

  fieldElements.get(name)?.animate(SHAKE_FRAMES, {
    duration: SHAKE_DURATION,
    easing: SHAKE_EASING,
  })
}

function handleSubmit(event: SubmitEvent) {
  event.preventDefault()

  const existingErrors = { ...props.errors }
  previousErrors.value = existingErrors
  submitCount.value += 1

  for (const field of props.fields) {
    if (existingErrors[field.name]) {
      shakeField(field.name)
    }
  }

  emit('submit', { ...values.value })
}

function reset(nextValues: FormValues = {}) {
  submitCount.value = 0
  previousErrors.value = {}
  internalValues.value = { ...nextValues }
  emit('update:modelValue', { ...nextValues })
}

defineExpose({ reset })

watch(
  () => props.errors,
  (next, previous) => {
    if (submitCount.value === 0) {
      return
    }

    for (const field of props.fields) {
      if (next[field.name] && !previous?.[field.name]) {
        shakeField(field.name)
      }
    }
  },
  { deep: true },
)
</script>

<template>
  <form
    :class="['grid gap-4', props.class]"
    novalidate
    @submit="handleSubmit"
  >
    <div
      v-for="(field, index) in props.fields"
      :key="field.name"
      class="form-field"
      :style="{ animationDelay: `${index * STAGGER_DELAY}ms` }"
    >
      <div
        :ref="element => setFieldElement(field.name, element)"
        class="grid gap-1.5"
      >
        <template v-if="field.type === 'checkbox'">
          <UCheckbox
            :id="fieldId(field.name)"
            :aria-describedby="describedBy(field)"
            :aria-invalid="isInvalid(field) ? true : undefined"
            :color="isInvalid(field) ? 'error' : undefined"
            :disabled="props.disabled"
            :label="field.label"
            :model-value="checkboxValue(field)"
            :name="field.name"
            :required="field.required"
            @update:model-value="updateField(field.name, $event)"
          />
        </template>

        <template v-else>
          <label
            :for="fieldId(field.name)"
            class="text-sm font-medium leading-none"
            :class="isInvalid(field) ? 'text-error' : 'text-highlighted'"
          >
            {{ field.label }}
          </label>

          <div
            class="form-control"
            :class="isInvalid(field) ? 'is-invalid' : ''"
          >
            <UTextarea
              v-if="field.type === 'textarea'"
              :id="fieldId(field.name)"
              :aria-describedby="describedBy(field)"
              :aria-invalid="isInvalid(field) ? true : undefined"
              :autocomplete="field.autocomplete ?? 'off'"
              :color="isInvalid(field) ? 'error' : undefined"
              :disabled="props.disabled"
              :model-value="textValue(field)"
              :name="field.name"
              :placeholder="field.placeholder"
              :required="field.required"
              :rows="field.rows ?? 3"
              @update:model-value="updateField(field.name, $event)"
            />

            <USelect
              v-else-if="field.type === 'select'"
              :id="fieldId(field.name)"
              :aria-describedby="describedBy(field)"
              :aria-invalid="isInvalid(field) ? true : undefined"
              :color="isInvalid(field) ? 'error' : undefined"
              :disabled="props.disabled"
              :items="field.options ?? []"
              :model-value="textValue(field)"
              :name="field.name"
              :placeholder="field.placeholder ?? 'Select an option'"
              :required="field.required"
              @update:model-value="updateField(field.name, $event)"
            />

            <UInput
              v-else
              :id="fieldId(field.name)"
              :aria-describedby="describedBy(field)"
              :aria-invalid="isInvalid(field) ? true : undefined"
              :autocomplete="field.autocomplete ?? 'off'"
              :color="isInvalid(field) ? 'error' : undefined"
              :disabled="props.disabled"
              :model-value="textValue(field)"
              :name="field.name"
              :placeholder="field.placeholder"
              :required="field.required"
              :type="inputType(field)"
              @update:model-value="updateField(field.name, $event)"
            />
          </div>
        </template>

        <p
          v-if="field.description"
          :id="descriptionId(field.name)"
          class="text-sm text-muted"
        >
          {{ field.description }}
        </p>

        <Transition
          name="form-message"
          mode="out-in"
        >
          <p
            v-if="isInvalid(field)"
            :id="messageId(field.name)"
            class="text-sm text-error"
            role="alert"
          >
            {{ errorFor(field) }}
          </p>

          <p
            v-else-if="showSuccess(field)"
            class="flex items-center gap-1 text-sm text-success"
          >
            <UIcon
              name="i-lucide-check"
              class="size-3.5"
              aria-hidden="true"
            />
            <span>{{ props.successMessage }}</span>
          </p>
        </Transition>
      </div>
    </div>

    <div class="mt-1">
      <slot name="actions">
        <UButton
          type="submit"
          block
          :disabled="props.disabled"
        >
          {{ props.submitLabel }}
        </UButton>
      </slot>
    </div>
  </form>
</template>

<style scoped>
.form-field {
  animation: form-field-in 420ms cubic-bezier(0.23, 1, 0.32, 1) both;
}

.form-control {
  border-radius: 0.5rem;
  transition: box-shadow 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

.form-control:focus-within {
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--ui-primary) 30%, transparent);
}

.form-control.is-invalid:focus-within {
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--ui-error) 30%, transparent);
}

.form-message-enter-active,
.form-message-leave-active {
  transition:
    opacity 200ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

.form-message-enter-from,
.form-message-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@keyframes form-field-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .form-field {
    animation: none;
  }

  .form-control {
    transition: none;
  }

  .form-message-enter-active,
  .form-message-leave-active {
    transition: none;
  }
}
</style>
