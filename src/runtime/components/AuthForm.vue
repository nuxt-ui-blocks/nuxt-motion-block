<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import { cn } from '../utils/merge'

export type AuthFormMode = 'sign-in' | 'sign-up'

export type AuthFormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface AuthProvider {
  /** UIcon name for the provider mark. */
  icon: string
  /** Stable key, passed back with the `provider` event. */
  id: string
  /** Provider name, read as "Continue with {label}". */
  label: string
}

export interface AuthPasswordRequirement {
  /** Stable key. */
  id: string
  /** Copy shown beside the tick. */
  label: string
  /** Predicate run against the current password. */
  test: (password: string) => boolean
}

export interface AuthFormValues {
  email: string
  password: string
}

export interface AuthFormFieldErrors {
  email?: string
  password?: string
}

export interface AuthFormProps {
  /** Extra classes for the outer wrapper. */
  class?: string
  /** Mode used while `mode` is unbound. Defaults to `sign-in`. */
  defaultMode?: AuthFormMode
  /** Values used while `modelValue` is unbound. */
  defaultValues?: AuthFormValues
  /** Form-level error copy, shown when `status` is `error`. */
  error?: string
  /** Field errors keyed by field name. */
  fieldErrors?: AuthFormFieldErrors
  /** Controlled mode. Leave undefined to let the form switch its own. */
  mode?: AuthFormMode
  /** Controlled values. Leave undefined to let the form hold its own. */
  modelValue?: AuthFormValues
  /** OAuth-style buttons rendered above the email field. */
  providers?: AuthProvider[]
  /** Password rules shown in sign-up mode. */
  requirements?: AuthPasswordRequirement[]
  /** Renders a "Send a magic link instead" button under the password. */
  showMagicLink?: boolean
  /** Submission state driven by the caller. */
  status?: AuthFormStatus
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
const ID_SAFE = /[^\w-]/g

const props = withDefaults(defineProps<AuthFormProps>(), {
  class: undefined,
  defaultMode: 'sign-in',
  defaultValues: () => ({ email: '', password: '' }),
  error: undefined,
  fieldErrors: () => ({}),
  mode: undefined,
  modelValue: undefined,
  providers: () => [],
  requirements: () => [
    {
      id: 'length',
      label: 'At least 8 characters',
      test: (password: string) => password.length >= 8,
    },
    {
      id: 'uppercase',
      label: 'One uppercase letter',
      test: (password: string) => /[A-Z]/.test(password),
    },
    {
      id: 'number',
      label: 'One number',
      test: (password: string) => /\d/.test(password),
    },
  ],
  showMagicLink: false,
  status: 'idle',
})

const emit = defineEmits<{
  'magic-link': [values: AuthFormValues]
  'provider': [id: string]
  'submit': [values: AuthFormValues]
  'update:mode': [mode: AuthFormMode]
  'update:modelValue': [values: AuthFormValues]
}>()

const uid = useId().replace(ID_SAFE, '')
const emailId = `${uid}-email`
const emailErrorId = `${uid}-email-error`
const passwordId = `${uid}-password`
const passwordErrorId = `${uid}-password-error`
const requirementsId = `${uid}-requirements`

const internalMode = ref<AuthFormMode>(props.defaultMode)
const internalValues = ref<AuthFormValues>({ ...props.defaultValues })
const showPassword = ref(false)
const direction = ref(0)
const errorRef = ref<HTMLElement | null>(null)

const isModeControlled = computed(() => props.mode !== undefined)
const resolvedMode = computed(() => props.mode ?? internalMode.value)
const isSignUp = computed(() => resolvedMode.value === 'sign-up')

const isValuesControlled = computed(() => props.modelValue !== undefined)
const values = computed(() => props.modelValue ?? internalValues.value)
const email = computed(() => values.value.email ?? '')
const password = computed(() => values.value.password ?? '')

const isSubmitting = computed(() => props.status === 'submitting')
const isSuccess = computed(() => props.status === 'success')
const isLocked = computed(() => isSubmitting.value || isSuccess.value)
const isEmailValid = computed(() => EMAIL_PATTERN.test(email.value.trim()))
const showError = computed(() => props.status === 'error' && Boolean(props.error))

const submitKey = computed(() =>
  isSubmitting.value ? 'submitting' : isSuccess.value ? 'success' : 'idle',
)
const submitLabel = computed(() => {
  if (isSubmitting.value) return isSignUp.value ? 'Creating account…' : 'Signing in…'
  if (isSuccess.value) return 'Success'
  return isSignUp.value ? 'Create account' : 'Sign in'
})
const statusMessage = computed(() => {
  if (isSubmitting.value) return 'Submitting…'
  if (isSuccess.value) return 'Success. You are signed in.'
  if (showError.value) return props.error ?? ''
  return ''
})

const passwordDescribedBy = computed(() => {
  const ids = [
    props.fieldErrors.password ? passwordErrorId : null,
    isSignUp.value ? requirementsId : null,
  ].filter(Boolean)
  return ids.length ? ids.join(' ') : undefined
})

const requirementStates = computed(() =>
  props.requirements.map(requirement => ({
    ...requirement,
    passed: requirement.test(password.value),
  })))

watch(
  () => resolvedMode.value,
  (mode) => {
    direction.value = mode === 'sign-up' ? 1 : -1
  },
)

watch(
  () => [props.status, props.error] as const,
  async ([status, error]) => {
    if (status !== 'error' || !error) return
    await nextTick()
    errorRef.value?.focus()
  },
)

function setValue(key: keyof AuthFormValues, value: string) {
  const next = { ...values.value, [key]: value }
  if (!isValuesControlled.value) internalValues.value = next
  emit('update:modelValue', next)
}

function toggleMode() {
  const next: AuthFormMode = isSignUp.value ? 'sign-in' : 'sign-up'
  if (!isModeControlled.value) internalMode.value = next
  emit('update:mode', next)
}

function onSubmit() {
  if (isLocked.value) return
  emit('submit', { email: email.value, password: password.value })
}

function onMagicLink() {
  emit('magic-link', { email: email.value, password: '' })
}
</script>

<template>
  <div :class="cn('w-full max-w-sm', props.class)">
    <Transition
      :name="direction > 0 ? 'auth-next' : 'auth-prev'"
      mode="out-in"
    >
      <div :key="resolvedMode">
        <h2 class="text-xl font-semibold text-highlighted">
          {{ isSignUp ? 'Create your account' : 'Welcome back' }}
        </h2>
        <p class="mt-1 text-sm text-muted">
          {{
            isSignUp
              ? 'Start with your email, we will take it from there.'
              : 'Sign in to continue where you left off.'
          }}
        </p>
      </div>
    </Transition>

    <div
      v-if="props.providers.length"
      class="mt-5 grid gap-2"
    >
      <UButton
        v-for="provider in props.providers"
        :key="provider.id"
        :leading-icon="provider.icon"
        variant="outline"
        color="neutral"
        size="lg"
        block
        @click="emit('provider', provider.id)"
      >
        Continue with {{ provider.label }}
      </UButton>
      <div class="relative my-2 text-center text-xs">
        <span class="relative z-10 bg-default px-2 text-muted">or continue with email</span>
        <div
          aria-hidden="true"
          class="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-default"
        />
      </div>
    </div>

    <div
      class="grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none"
      :class="showError ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
      :aria-hidden="showError ? undefined : 'true'"
      :inert="showError ? undefined : true"
    >
      <div class="min-h-0 overflow-hidden">
        <div
          :id="`${uid}-error`"
          ref="errorRef"
          role="alert"
          tabindex="-1"
          class="mt-4 rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error"
        >
          {{ props.error }}
        </div>
      </div>
    </div>

    <form
      class="mt-4 grid gap-4"
      :aria-busy="isSubmitting ? true : undefined"
      @submit.prevent="onSubmit"
    >
      <div class="grid gap-1.5">
        <label
          :for="emailId"
          class="text-sm font-medium text-highlighted"
        >
          Email
        </label>
        <UInput
          :id="emailId"
          :model-value="email"
          :aria-describedby="props.fieldErrors.email ? emailErrorId : undefined"
          :aria-invalid="props.fieldErrors.email ? true : undefined"
          :color="props.fieldErrors.email ? 'error' : undefined"
          :disabled="isLocked"
          type="email"
          name="email"
          autocomplete="email"
          inputmode="email"
          size="lg"
          class="w-full"
          required
          @update:model-value="value => setValue('email', String(value ?? ''))"
        />
        <p
          v-if="props.fieldErrors.email"
          :id="emailErrorId"
          role="alert"
          class="text-sm text-error"
        >
          {{ props.fieldErrors.email }}
        </p>
      </div>

      <div
        class="grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none"
        :class="isEmailValid ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
        :aria-hidden="isEmailValid ? undefined : 'true'"
        :inert="isEmailValid ? undefined : true"
      >
        <div class="grid min-h-0 gap-1.5 overflow-hidden pt-1">
          <label
            :for="passwordId"
            class="text-sm font-medium text-highlighted"
          >
            Password
          </label>
          <UInput
            :id="passwordId"
            :model-value="password"
            :aria-describedby="passwordDescribedBy"
            :aria-invalid="props.fieldErrors.password ? true : undefined"
            :color="props.fieldErrors.password ? 'error' : undefined"
            :disabled="isLocked"
            :type="showPassword ? 'text' : 'password'"
            :minlength="isSignUp ? 8 : undefined"
            :required="isEmailValid"
            :tabindex="isEmailValid ? undefined : -1"
            name="password"
            :autocomplete="isSignUp ? 'new-password' : 'current-password'"
            size="lg"
            class="w-full"
            @update:model-value="value => setValue('password', String(value ?? ''))"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                :tabindex="isEmailValid ? undefined : -1"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>

          <p
            v-if="props.fieldErrors.password"
            :id="passwordErrorId"
            role="alert"
            class="text-sm text-error"
          >
            {{ props.fieldErrors.password }}
          </p>

          <ul
            v-if="isSignUp"
            :id="requirementsId"
            aria-label="Password requirements"
            class="mt-1 grid gap-1"
          >
            <li
              v-for="requirement in requirementStates"
              :key="requirement.id"
              class="flex items-center gap-2 text-sm"
            >
              <span
                aria-hidden="true"
                class="flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 motion-reduce:transition-none"
                :class="
                  requirement.passed
                    ? 'border-success bg-success text-inverted'
                    : 'border-default text-transparent'
                "
              >
                <UIcon
                  name="i-lucide-check"
                  class="size-3"
                />
              </span>
              <span
                class="transition-colors duration-150 motion-reduce:transition-none"
                :class="requirement.passed ? 'text-highlighted' : 'text-muted'"
              >
                {{ requirement.label }}
              </span>
              <span class="sr-only">
                {{ requirement.passed ? 'met' : 'not met' }}
              </span>
            </li>
          </ul>

          <UButton
            v-if="props.showMagicLink"
            color="primary"
            variant="link"
            size="sm"
            class="mt-1 -ml-3 justify-self-start"
            @click="onMagicLink"
          >
            Send a magic link instead
          </UButton>
        </div>
      </div>

      <UButton
        type="submit"
        color="primary"
        size="lg"
        block
        class="mt-1 overflow-hidden font-semibold"
        :loading="isSubmitting"
        :disabled="isLocked"
      >
        <Transition
          name="auth-morph"
          mode="out-in"
        >
          <span
            :key="submitKey"
            class="flex items-center gap-2"
          >
            <UIcon
              v-if="isSuccess"
              name="i-lucide-check"
              class="size-4"
              aria-hidden="true"
            />
            {{ submitLabel }}
          </span>
        </Transition>
      </UButton>

      <p
        role="status"
        aria-live="polite"
        class="sr-only"
      >
        {{ statusMessage }}
      </p>
    </form>

    <p class="mt-5 text-center text-sm text-muted">
      {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
      <UButton
        color="primary"
        variant="link"
        size="sm"
        class="h-auto p-0 font-medium"
        type="button"
        @click="toggleMode"
      >
        {{ isSignUp ? 'Sign in' : 'Sign up' }}
      </UButton>
    </p>

    <slot name="footer" />
  </div>
</template>

<style scoped>
.auth-next-enter-active,
.auth-next-leave-active,
.auth-prev-enter-active,
.auth-prev-leave-active {
  transition:
    opacity 180ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 180ms cubic-bezier(0.23, 1, 0.32, 1);
}

.auth-next-enter-from {
  opacity: 0;
  transform: translateX(16px);
}

.auth-next-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

.auth-prev-enter-from {
  opacity: 0;
  transform: translateX(-16px);
}

.auth-prev-leave-to {
  opacity: 0;
  transform: translateX(16px);
}

.auth-morph-enter-active,
.auth-morph-leave-active {
  transition:
    opacity 150ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
}

.auth-morph-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.auth-morph-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .auth-next-enter-active,
  .auth-next-leave-active,
  .auth-prev-enter-active,
  .auth-prev-leave-active,
  .auth-morph-enter-active,
  .auth-morph-leave-active {
    transition: opacity 120ms linear;
  }

  .auth-next-enter-from,
  .auth-next-leave-to,
  .auth-prev-enter-from,
  .auth-prev-leave-to,
  .auth-morph-enter-from,
  .auth-morph-leave-to {
    transform: none;
  }
}
</style>
