<template>
  <div class="name-banner">
    <h1 class="name-header">RAGHUL ATTUR SUKUMAR</h1>
  </div>
  <div class="portfolio-sections container-fluid p-0">
    <router-link
      v-for="(section, index) in sections"
      :key="section.name"
      :to="section.path"
      class="section-tile"
    >
      <div class="section-content" :style="{ backgroundImage: `url(${section.image})` }">
        <div class="overlay">
          <div class="section-index">0{{ index + 1 }}</div>
          <div class="section-label">{{ section.name }}</div>
        </div>
      </div>
    </router-link>
  </div>
  <div></div>
</template>
  
  <script>
  export default {
    name: 'Home',
    data() {
      return {
        sections: [
          { name: 'Dev', path: '/dev', image: new URL('/home/5.jpg', import.meta.url).href },
          { name: 'UX', path: '/ux', image: new URL('/home/1.png', import.meta.url).href },
          { name: 'Design', path: '/design', image: new URL('/home/3.png', import.meta.url).href },
          { name: 'Photo', path: '/photography', image: new URL('/home/2.png', import.meta.url).href },
          { name: 'Video', path: '/videography', image: new URL('/home/4.png', import.meta.url).href }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
.name-banner {
  width: 100vw;
  margin-top: 50px;
  color: #000000;
  padding: 2rem 4rem;
  overflow-x: hidden;
}

.name-header {
  font-size: 100px;
  font-weight: 900;
  letter-spacing: 0.05em;
  margin: 0;
  text-align: left;
  line-height: 1;
}

.portfolio-sections {
  display: flex;
  width: 100vw; /* Force full width */
  height: 85vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.section-tile {
  flex: 1;
  text-decoration: none;
  color: white;
  transition: flex 0.4s ease;
  min-width: 0;
}

.section-tile:hover {
  flex: 2;
}

.section-content {
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 20px;
}

.overlay {
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  border-top: 1px solid white;
}

.section-index {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
}

.section-label {
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0.3rem;
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .portfolio-sections {
    flex-direction: column;
    height: auto;
  }

  .section-tile {
    flex: none;
    height: 30vh;
  }
}
  </style>