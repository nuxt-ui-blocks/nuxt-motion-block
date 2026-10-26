<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import { computed, ref, watch } from 'vue'

export type FormFieldType
  = | 'checkbox'
    | 'email'
    | 'password'
    | 'radio'
    | 'select'
    | 'switch'
    | 'tel'
    | 'text'
    | 'textarea'
    | 'url'

export interface FormFieldOption {
  /** Optional description shown under the option label. */
  description?: string
  /** Optional icon shown with the option. */
  icon?: string
  label: string
  value: string
}

export interface FormFieldConfig {
  /** Browser autocomplete hint for the control. */
  autocomplete?: string
  /** Helper copy shown under the label, or under the control for checkboxes. */
  description?: string
  /** Icon shown inside text, email, password and URL inputs. */
  icon?: string
  /** Label rendered above the control, inline for checkboxes. */
  label: string
  /** Key used in the values and errors objects. */
  name: string
  /** Choices for a `select` or `radio` field. */
  options?: FormFieldOption[]
  /** Layout for a `radio` field. Defaults to `vertical`. */
  orientation?: 'horizontal' | 'vertical'
  /** Placeholder text. */
  placeholder?: string
  /** Marks the underlying control as required. */
  required?: boolean
  /** Show a show/hide toggle on `password` fields. */
  reveal?: boolean
  /** Textarea height in rows. Defaults to 3. */
  rows?: number
  /** Icon shown at the end of a text input. */
  trailingIcon?: string
  /** Control to render. Defaults to `text`. */
  type?: FormFieldType
}

export type FormValue = boolean | string

export type FormValues = Record<string, FormValue>

export type FormErrors = Record<string, string | undefined>

export interface FormError {
  /** Field name the message belongs to. */
  name?: string
  /** Message shown under the control. */
  message: string
}

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
  /** Any Standard Schema validator, such as Zod or Valibot. */
  schema?: StandardSchemaV1
  /** Copy shown once a previously invalid field is fixed. */
  successMessage?: string
  /** Label for the default submit button. */
  submitLabel?: string
  /** Custom validation called with the current values. */
  validate?: (state: FormValues) => FormError[] | Promise<FormError[]>
  /** Events that trigger validation. Defaults to input, blur and change. */
  validateOn?: ('blur' | 'change' | 'focus' | 'input')[]
  /** Delay before input validation runs, in milliseconds. */
  validateOnInputDelay?: number
}

const props = withDefaults(defineProps<FormProps>(), {
  class: undefined,
  disabled: false,
  errors: () => ({}),
  modelValue: undefined,
  schema: undefined,
  successMessage: 'Looks good',
  submitLabel: 'Submit',
  validate: undefined,
  validateOn: undefined,
  validateOnInputDelay: 300,
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

const internalValues = ref<FormValues>({})
const submitCount = ref(0)
const previousErrors = ref<FormErrors>({})
const fieldElements = new Map<string, HTMLElement>()

const isControlled = computed(() => props.modelValue !== undefined)
const values = computed(() => props.modelValue ?? internalValues.value)

const uform = ref<{ errors?: FormError[] } | null>(null)
const isSchemaValidated = computed(() => Boolean(props.schema || props.validate))

const validationErrors = computed<FormErrors>(() => {
  const map: FormErrors = {}

  for (const issue of uform.value?.errors ?? []) {
    if (issue.name && issue.message) {
      map[issue.name] = issue.message
    }
  }

  return map
})

const resolvedErrors = computed<FormErrors>(() => ({
  ...validationErrors.value,
  ...props.errors,
}))

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

  return isBooleanField(field) ? false : ''
}

function isBooleanField(field: FormFieldConfig) {
  return field.type === 'checkbox' || field.type === 'switch'
}

function hasInlineLabel(field: FormFieldConfig) {
  return isBooleanField(field)
}

function textValue(field: FormFieldConfig) {
  const current = valueFor(field)

  return typeof current === 'string' ? current : ''
}

function booleanValue(field: FormFieldConfig) {
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

const revealedFields = ref<Record<string, boolean>>({})

function isRevealed(name: string) {
  return Boolean(revealedFields.value[name])
}

function toggleReveal(name: string) {
  revealedFields.value = {
    ...revealedFields.value,
    [name]: !revealedFields.value[name],
  }
}

function errorFor(field: FormFieldConfig) {
  return resolvedErrors.value[field.name]
}

function isInvalid(field: FormFieldConfig) {
  return Boolean(errorFor(field))
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

  if (!isSchemaValidated.value) {
    previousErrors.value = { ...props.errors }
  }

  submitCount.value += 1

  for (const field of props.fields) {
    if (isInvalid(field)) {
      shakeField(field.name)
    }
  }

  emit('submit', { ...values.value })
}

function handleValidationError(event: { errors: FormError[] }) {
  const map: FormErrors = {}

  for (const issue of event.errors) {
    if (!issue.name) {
      continue
    }

    map[issue.name] = issue.message
    shakeField(issue.name)
  }

  previousErrors.value = map
  submitCount.value += 1
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
    if (submitCount.value === 0 || isSchemaValidated.value) {
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
  <UForm
    ref="uform"
    :class="['grid gap-4', props.class]"
    :state="values"
    :disabled="props.disabled"
    :loading-auto="false"
    :schema="props.schema"
    :validate="props.validate"
    :validate-on="props.validateOn"
    :validate-on-input-delay="props.validateOnInputDelay"
    novalidate
    @error="handleValidationError"
    @submit="handleSubmit"
  >
    <div
      v-for="(field, index) in props.fields"
      :key="field.name"
      :ref="element => setFieldElement(field.name, element)"
      class="form-field"
      :style="{ animationDelay: `${index * STAGGER_DELAY}ms` }"
    >
      <UFormField
        :label="hasInlineLabel(field) || field.type === 'radio' ? undefined : field.label"
        :description="hasInlineLabel(field) ? undefined : field.description"
        :help="hasInlineLabel(field) ? field.description : undefined"
        :error="errorFor(field)"
        :name="field.name"
        :eager-validation="true"
        :ui="isInvalid(field) ? { label: 'text-error' } : undefined"
      >
        <UCheckbox
          v-if="field.type === 'checkbox'"
          :label="field.label"
          :model-value="booleanValue(field)"
          :required="field.required"
          @update:model-value="updateField(field.name, $event)"
        />

        <USwitch
          v-else-if="field.type === 'switch'"
          :label="field.label"
          :model-value="booleanValue(field)"
          :required="field.required"
          @update:model-value="updateField(field.name, $event)"
        />

        <URadioGroup
          v-else-if="field.type === 'radio'"
          :items="field.options ?? []"
          :legend="field.label"
          :model-value="textValue(field)"
          :orientation="field.orientation ?? 'vertical'"
          :required="field.required"
          :ui="isInvalid(field) ? { legend: 'text-error' } : undefined"
          @update:model-value="updateField(field.name, $event)"
        />

        <UTextarea
          v-else-if="field.type === 'textarea'"
          class="w-full"
          :autocomplete="field.autocomplete ?? 'off'"
          :model-value="textValue(field)"
          :placeholder="field.placeholder"
          :required="field.required"
          :rows="field.rows ?? 3"
          @update:model-value="updateField(field.name, $event)"
        />

        <USelect
          v-else-if="field.type === 'select'"
          class="w-full"
          :items="field.options ?? []"
          :model-value="textValue(field)"
          :placeholder="field.placeholder ?? 'Select an option'"
          :required="field.required"
          @update:model-value="updateField(field.name, $event)"
        />

        <UInput
          v-else
          class="w-full"
          :autocomplete="field.autocomplete ?? 'off'"
          :icon="field.icon"
          :model-value="textValue(field)"
          :placeholder="field.placeholder"
          :required="field.required"
          :trailing-icon="field.type === 'password' && field.reveal ? undefined : field.trailingIcon"
          :type="field.type === 'password' && isRevealed(field.name) ? 'text' : inputType(field)"
          :ui="field.type === 'password' && field.reveal ? { trailing: 'pe-1' } : undefined"
          @update:model-value="updateField(field.name, $event)"
        >
          <template
            v-if="field.type === 'password' && field.reveal"
            #trailing
          >
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="isRevealed(field.name) ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="isRevealed(field.name) ? 'Hide password' : 'Show password'"
              @click="toggleReveal(field.name)"
            />
          </template>
        </UInput>
      </UFormField>

      <Transition name="form-message">
        <p
          v-if="showSuccess(field)"
          class="mt-2 flex items-center gap-1 text-sm text-success"
        >
          <UIcon
            name="i-lucide-check"
            class="size-3.5"
            aria-hidden="true"
          />
          <span>{{ props.successMessage }}</span>
        </p>
      </Transition>

      <p
        class="sr-only"
        role="status"
      >
        {{ errorFor(field) ?? '' }}
      </p>
    </div>

    <div>
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
  </UForm>
</template>

<style scoped>
.form-field {
  animation: form-field-in 420ms cubic-bezier(0.23, 1, 0.32, 1) both;
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

  .form-message-enter-active,
  .form-message-leave-active {
    transition: none;
  }
}
</style>
