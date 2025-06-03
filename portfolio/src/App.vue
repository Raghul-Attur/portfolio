<script setup>
import Header from './components/Header.vue';
</script>

<template>
  <div class="app-container">
    <header>
      <Header />
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
</style>