<template>
  <v-app>
    <AuthHeader />

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <AuthFooter />
  </v-app>
</template>
