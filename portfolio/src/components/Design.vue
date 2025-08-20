<template>
    <div class="design-gallery">
      <div class="design-header">
        <h1>Design</h1>
      </div>
  
      <div class="project-grid">
        <div v-for="(project, index) in projects" :key="index" class="project-card">
          <img :src="project.image" :alt="project.title" />
          <div class="project-meta">
            <small>{{ project.code }}</small>
            <h3>{{ project.title }}</h3>
            <p>{{ project.subtitle }}</p>
            <router-link :to="project.link" class="view-btn">
              VIEW → 
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Design",
    data() {
      return {
        projects: [
          {
            code: 'DS-01',
            title: 'Preventika',
            subtitle: 'Making websites accessible for dyslexic readers',
            image: '/Design-thumb-1.png',
            link: '/design/preventika',
          },
          {
            code: 'DS-02',
            title: 'phProjecct',
            subtitle: 'Jewellery e-commerce experience',
            image: '/Design-thumb-2.png',
            link: '/design/phprojecct',
          },
          {
            code: 'DS-03',
            title: 'Villgro',
            subtitle: 'Gamified food donation journey',
            image: '/Design-thumb-5.png',
            link: '/design/Villgro',
          },
          {
            code: 'DS-04',
            title: 'Chitram',
            subtitle: 'Rewarding eco-friendly behaviours',
            image: '/Design-thumb-6.png',
            link: '/design/chitram',
          },
          {
            code: 'DS-05',
            title: 'Ayra Mane',
            subtitle: 'Auslan learning for inclusive classrooms',
            image: '/Design-thumb-3.png',
            link: '/design/ayra-mane',
          },
          {
            code: 'DS-06',
            title: 'Lo.cl',
            subtitle: 'Fitness & wellness companion',
            image: '/Design-thumb-4.png',
            link: '/design/locl',
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .design-gallery {
    padding: 3rem;
    font-family: 'Arial', sans-serif;
  }
  
  .design-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .design-header h2 {
    font-size: 2.5rem;
    font-weight: bold;
  }
  
  .design-header p {
    font-size: 1rem;
    color: #666;
  }
  
  .project-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* default for mobile */
  gap: 0.5rem;
  justify-items: center;
}

@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr); /* tablets */
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr); /* desktop */
  }
}
  
  .project-card {
    width: 320px;
    text-align: center;
    background: #fff;
  }
  
  .project-card img {
    width: 100%;
    border-radius: 1rem;
    object-fit: cover;
  }
  
  .project-meta small {
    display: block;
    margin-top: 1rem;
    font-weight: 600;
    color: #888;
  }
  
  .project-meta h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0.2rem 0;
  }
  
  .project-meta p {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
  }
  
  .view-btn {
    display: inline-block;
    padding: 0.5rem 1.5rem;
    border: 2px solid #000;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
    color: #000;
    transition: all 0.3s ease;
  }
  
  .view-btn:hover {
    background: #000;
    color: #fff;
  }
  </style>