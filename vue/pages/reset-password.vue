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
        v-if="successMessage"
        type="success"
        variant="tonal"
        class="mb-4"
        closable
        @click:close="successMessage = ''"
      >
        {{ successMessage }}
      </v-alert>

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

      <form @submit.prevent="handleSubmit">
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
            :rules="emailRules"
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
            :rules="passwordRules"
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
            :rules="passwordConfirmRules"
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
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from '~/constants/messages'
import { PAGE_TITLES } from '~/constants/page-titles'

const route = useRoute()
const code = computed(() => route.query.code as string)
const email = computed(() => route.query.email as string)

const emailInput = ref(email.value ?? '')
const password = ref('')
const passwordConfirm = ref('')
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const emailRules = [
  (v: string) => !!v || VALIDATION_MESSAGES.emailRequired,
  (v: string) => /.+@.+\..+/.test(v) || VALIDATION_MESSAGES.emailInvalid,
]

const passwordRules = [
  (v: string) => !!v || VALIDATION_MESSAGES.passwordRequired,
  (v: string) => v.length >= 6 || VALIDATION_MESSAGES.passwordMinLength,
]

const passwordConfirmRules = [
  (v: string) => !!v || VALIDATION_MESSAGES.passwordConfirmRequired,
  (v: string) => v === password.value || VALIDATION_MESSAGES.passwordMismatch,
]

const isFormValid = computed(() => {
  return password.value.length >= 6 && passwordConfirm.value === password.value
})

const handleSubmit = async () => {
  if (!isFormValid.value) {
    errorMessage.value = VALIDATION_MESSAGES.passwordInvalid
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl

    await $fetch(`${apiBaseUrl}/api/v1/ResetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        Email: emailInput.value,
        Password: password.value,
        ConfirmPassword: passwordConfirm.value,
        Code: code.value,
      },
    })

    await navigateTo('/reset-password-complete')
  } catch (error: unknown) {
    const fetchError = error as {
      status?: number
      data?: {
        message?: string
        errors?: Record<string, string[]>
      }
    }
    if (fetchError.status && fetchError.status >= 500) {
      errorMessage.value = ERROR_MESSAGES.serverError
    } else if (fetchError.data?.errors) {
      errorMessage.value = Object.values(fetchError.data.errors).flat().join('\n')
    } else if (fetchError.data?.message) {
      errorMessage.value = fetchError.data.message
    } else {
      errorMessage.value = ERROR_MESSAGES.generic
    }
  } finally {
    isLoading.value = false
  }
}

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
