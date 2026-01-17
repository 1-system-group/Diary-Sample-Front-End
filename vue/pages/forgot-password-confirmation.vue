<template>
  <v-container class="pa-4" fluid>
    <div class="confirmation-container">
      <div class="d-flex align-center mb-4">
        <v-icon size="large" class="mr-2">mdi-key</v-icon>
        <span class="text-h5 font-weight-bold">PLEASE CHECK YOUR EMAIL TO RESET YOUR PASSWORD</span>
      </div>

      <v-divider class="mb-4" />

      <div class="text-body-1 mb-6">
        パスワードリセット用のメールを送信しました。<br />
        ご確認ください。
      </div>

      <div class="d-flex justify-start">
        <NuxtLink to="/" class="text-decoration-none text-primary"> ログイン画面に戻る </NuxtLink>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
// Set page meta
useHead({
  title: 'パスワードリセット確認',
})
</script>

<style scoped>
.confirmation-container {
  width: 100%;
}
</style>
