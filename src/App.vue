<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './views/HeaderView.vue'
import Footer from './views/FooterView.vue'
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <!-- <nav>
          <RouterLink to="/login">ログイン</RouterLink>
        </nav> -->
        <RouterView />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<style scoped>
</style>
