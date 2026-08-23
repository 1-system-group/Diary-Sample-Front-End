<template>
  <v-container class="pa-4" fluid>
    <div class="complete-container">
      <div class="d-flex align-center mb-4">
        <v-icon size="large" class="mr-2">mdi-lock-check</v-icon>
        <span class="text-h5 font-weight-bold">PASSWORD RESET COMPLETE</span>
      </div>

      <v-divider class="mb-4" />

      <div class="text-body-1 mb-6">
        パスワードのリセットが完了しました。<br >
        新しいパスワードでログインしてください。
      </div>

      <div class="d-flex justify-start">
        <NuxtLink to="/" class="text-decoration-none text-primary"> ログイン画面に戻る </NuxtLink>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { PAGE_TITLES } from '~/constants/page-titles'

useHead({
  title: PAGE_TITLES.resetPasswordComplete,
})
</script>

<style scoped>
.complete-container {
  width: 100%;
}
</style>
