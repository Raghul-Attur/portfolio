<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
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
  <Footer />
</template>

<style scoped>
</style>