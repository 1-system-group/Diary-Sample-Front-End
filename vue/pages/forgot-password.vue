<template>
  <v-container class="pa-4" fluid>
    <div class="forgot-password-container">
      <div class="d-flex align-center mb-2">
        <v-icon size="large" class="mr-2">mdi-key</v-icon>
        <span class="text-h5 font-weight-bold">PASSWORD RESET</span>
      </div>

      <div class="text-subtitle-1 mb-2">
        入力したEメールアドレスにパスワードリセット用のリンクを送信します
      </div>

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
        class="mb-4"
        closable
        @click:close="errorMessage = ''"
      >
        {{ errorMessage }}
      </v-alert>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="text-subtitle-2 mb-1 d-block">Eメール</label>
          <v-text-field
            v-model="email"
            type="email"
            variant="outlined"
            density="compact"
            hide-details="auto"
            class="forgot-password-field"
            bg-color="white"
            :rules="emailRules"
            required
          />
        </div>

        <div class="mb-4">
          <v-btn
            type="submit"
            color="#2b2b2b"
            class="px-4"
            :loading="isLoading"
            :disabled="!isEmailValid"
          >
            送信
          </v-btn>
        </div>

        <div class="d-flex justify-space-between">
          <NuxtLink to="/" class="text-decoration-none text-primary"> ログイン画面に戻る </NuxtLink>
        </div>
      </form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const email = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Email validation rules
const emailRules = [
  (v: string) => !!v || 'メールアドレスは必須です',
  (v: string) => /.+@.+\..+/.test(v) || '有効なメールアドレスを入力してください',
]

// Computed property to check if email is valid
const isEmailValid = computed(() => {
  return email.value && /.+@.+\..+/.test(email.value)
})

// Handle form submission
const handleSubmit = async () => {
  if (!isEmailValid.value) {
    errorMessage.value = '有効なメールアドレスを入力してください'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl

    await $fetch(`${apiBaseUrl}/api/v1/ForgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        Email: email.value,
      },
    })

    // Success response - navigate to confirmation page
    await navigateTo('/forgot-password-confirmation')
  } catch (error: unknown) {
    // Handle different error scenarios
    const fetchError = error as { status?: number }
    if (fetchError.status && fetchError.status >= 500) {
      errorMessage.value = 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください'
    } else {
      errorMessage.value = 'エラーが発生しました。再度お試しください'
    }
  } finally {
    isLoading.value = false
  }
}

// Set page meta
useHead({
  title: 'パスワードリセット',
})
</script>

<style scoped>
.forgot-password-field {
  max-width: 400px;
}

.forgot-password-container {
  width: 100%;
}
</style>
