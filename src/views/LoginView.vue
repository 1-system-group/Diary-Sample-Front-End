<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const login = () => {
  // Login logic would go here
  console.log('Login attempt', { email: email.value, password: password.value, rememberMe: rememberMe.value })
}
</script>

<template>
  <v-container class="pa-4" fluid>
    <div class="login-container">
      <div class="d-flex align-center mb-2">
        <v-icon size="large" class="mr-2">mdi-account</v-icon>
        <span class="text-h5 font-weight-bold">LOGIN</span>
      </div>

      <div class="text-subtitle-1 mb-2">
        アカウント情報を入力してください
      </div>

      <v-divider class="mb-4"></v-divider>

      <form @submit.prevent="login">
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
          ></v-text-field>
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
          ></v-text-field>
        </div>

        <div class="mb-4">
          <v-checkbox
            v-model="rememberMe"
            label="次回から自動ログインする"
            density="compact"
            hide-details
          ></v-checkbox>
        </div>

        <div class="mb-4">
          <v-btn
            type="submit"
            color="#2b2b2b"
            class="px-4"
          >
            ログイン
          </v-btn>
        </div>

        <div>
          <a href="#" class="text-decoration-none text-primary">パスワードをお忘れですか？</a>
        </div>
      </form>
    </div>
  </v-container>
</template>

<style scoped>
.login-container {
  max-width: 400px;
}

.login-field {
  width: 100%;
}
</style>
