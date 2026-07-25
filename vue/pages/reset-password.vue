<template>
  <v-container class="pa-4" fluid>
    <div class="reset-password-container">
      <div class="d-flex align-center mb-2">
        <v-icon size="large" class="mr-2">mdi-lock-reset</v-icon>
        <span class="text-h5 font-weight-bold">RESET YOUR PASSWORD</span>
      </div>

      <div class="text-subtitle-1 mb-2">新しいパスワードを入力してください</div>

      <v-divider class="mb-4" />

      <v-alert
        v-if="errorMessage"
        type="error"
        variant="tonal"
        class="mb-4 reset-password-error"
        closable
        @click:close="errorMessage = ''"
      >
        {{ errorMessage }}
      </v-alert>

      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label class="text-subtitle-2 mb-1 d-block">Eメール</label>
          <v-text-field
            v-model="emailInput"
            type="email"
            variant="outlined"
            density="compact"
            hide-details="auto"
            class="reset-password-field"
            bg-color="white"
            :error-messages="emailError"
            required
          />
        </div>

        <div class="mb-4">
          <label class="text-subtitle-2 mb-1 d-block">新しいパスワード</label>
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            density="compact"
            hide-details="auto"
            class="reset-password-field"
            bg-color="white"
            :error-messages="passwordError"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            required
            @click:append-inner="showPassword = !showPassword"
          />
        </div>

        <div class="mb-4">
          <label class="text-subtitle-2 mb-1 d-block">新しいパスワード（確認）</label>
          <v-text-field
            v-model="passwordConfirm"
            :type="showPasswordConfirm ? 'text' : 'password'"
            variant="outlined"
            density="compact"
            hide-details="auto"
            class="reset-password-field"
            bg-color="white"
            :error-messages="passwordConfirmError"
            :append-inner-icon="showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
            required
            @click:append-inner="showPasswordConfirm = !showPasswordConfirm"
          />
        </div>

        <div class="mb-4">
          <v-btn
            type="submit"
            color="#2b2b2b"
            class="px-4"
            :loading="isLoading"
            :disabled="!isFormValid"
          >
            リセット
          </v-btn>
        </div>
      </form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { VALIDATION_MESSAGES } from '~/constants/messages'
import { PAGE_TITLES } from '~/constants/page-titles'

const route = useRoute()
const code = computed(() => route.query.code as string)
const email = computed(() => route.query.email as string)

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const { handleSubmit, meta } = useForm({
  initialValues: {
    email: email.value ?? '',
    password: '',
    passwordConfirm: '',
  },
})

const { value: emailInput, errorMessage: emailError } = useField<string>('email', (value) => {
  if (!value) return VALIDATION_MESSAGES.emailRequired
  if (!isValidEmail(value)) return VALIDATION_MESSAGES.emailInvalid
  return true
})

const { value: password, errorMessage: passwordError } = useField<string>('password', (value) => {
  if (!value) return VALIDATION_MESSAGES.passwordRequired
  if (value.length < 6) return VALIDATION_MESSAGES.passwordMinLength
  return true
})

const {
  value: passwordConfirm,
  errorMessage: passwordConfirmError,
  validate: validatePasswordConfirm,
} = useField<string>('passwordConfirm', (value) => {
  if (!value) return VALIDATION_MESSAGES.passwordConfirmRequired
  if (value !== password.value) return VALIDATION_MESSAGES.passwordMismatch
  return true
})

watch(password, () => {
  if (passwordConfirm.value) validatePasswordConfirm()
})

const isFormValid = computed(() => meta.value.valid && meta.value.dirty)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl

    await $fetch(`${apiBaseUrl}/api/v1/ResetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        Email: values.email,
        Password: values.password,
        ConfirmPassword: values.passwordConfirm,
        Code: code.value,
      },
    })

    await navigateTo('/reset-password-complete')
  } catch (error: unknown) {
    errorMessage.value = getApiErrorMessage(error)
  } finally {
    isLoading.value = false
  }
})

useHead({
  title: PAGE_TITLES.resetPassword,
})
</script>

<style scoped>
.reset-password-field {
  max-width: 400px;
}

.reset-password-container {
  width: 100%;
}

.reset-password-error {
  white-space: pre-line;
}
</style>
