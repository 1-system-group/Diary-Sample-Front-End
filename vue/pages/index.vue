<template>
  <v-container class="pa-4" fluid>
    <div class="login-container">
      <div class="d-flex align-center mb-2">
        <v-icon size="large" class="mr-2">mdi-account</v-icon>
        <span class="text-h5 font-weight-bold">LOGIN</span>
      </div>

      <div class="text-subtitle-1 mb-2">アカウント情報を入力してください</div>

      <v-divider class="mb-4" />

      <form>
        <div class="mb-3">
          <label class="text-subtitle-2 mb-1 d-block">Eメール</label>
          <v-text-field
            v-model="email"
            type="email"
            variant="outlined"
            density="compact"
            hide-details
            class="login-field"
            bg-color="white"
          />
        </div>

        <div class="mb-3">
          <label class="text-subtitle-2 mb-1 d-block">パスワード</label>
          <v-text-field
            v-model="password"
            type="password"
            variant="outlined"
            density="compact"
            hide-details
            class="login-field"
            bg-color="white"
          />
        </div>

        <div class="mb-4">
          <v-checkbox
            v-model="rememberMe"
            label="次回から自動ログインする"
            density="compact"
            hide-details
          />
        </div>

        <div class="mb-4">
          <v-btn type="submit" color="#2b2b2b" class="px-4"> ログイン </v-btn>
        </div>

        <div>
          <NuxtLink to="/forgot-password" class="text-decoration-none text-primary">
            パスワードをお忘れですか？
          </NuxtLink>
        </div>
      </form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
</script>

<style scoped>
.login-field {
  max-width: 400px;
}

.login-container {
  width: 100%;
}
</style>
