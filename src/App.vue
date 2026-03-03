<script setup>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  </script>
  
  <template>
    <div class="app-container">
      <Header />
      <main class="main-content">
        <router-view />
      </main>
    </div>
    <Footer />
  </template>
  
  <style scoped>
  </style>