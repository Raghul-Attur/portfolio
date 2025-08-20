<template>
    <div class="ux-details-page">
      <div class="hero-section">
        <img :src="project.heroImage" alt="Hero" />
      </div>
  
      <div class="content-section">
        <h1 class="project-title">{{ project.title }}</h1>
        <p class="project-subtitle">{{ project.subtitle }}</p>
  
        <div class="section">
          <h3>Overview</h3>
          <p>{{ project.overview }}</p>
        </div>
  
        <div class="section">
          <h3>My Role</h3>
          <p>{{ project.role }}</p>
        </div>
  
        <div class="section">
          <h3>Design Tools</h3>
          <div class="tech-buttons">
            <span v-for="(tool, i) in project.tools" :key="i" class="tech-pill">{{ tool }}</span>
          </div>
        </div>
  
        <div class="section gallery">
          <h3>Screens</h3>
          <img
            v-for="(img, i) in project.images"
            :key="i"
            :src="img"
            alt="Screenshot"
          />
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      projects: {
        'ux-01': {
          title: 'SignMates',
          subtitle: 'Making sign language fun and accessible for kids',
          overview: 'SignMates is a gamified Auslan learning platform designed for early learners. Built using child-centered design to help hearing children interact with deaf peers through storytelling, games, and AR sign detection.',
          role: 'Led the research and UX design, conducted user interviews, built high-fidelity prototype with Adobe XD, tested with peers and educators.',
          tools: ['Figma', 'Illustrator', 'Photoshop'],
          heroImage: '/code.jpeg',
          images: ['/code.jpeg', '/code.jpeg']
        },
        'ux-02': {
          title: 'RouteRefill',
          subtitle: 'Encouraging eco-friendly hydration in Melbourne',
          overview: 'RouteRefill helps cyclists locate public water fountains and plan refill-friendly routes. It promotes plastic-free behavior through rewards, reminders, and local content.',
          role: 'Worked on persona design, journey maps, task flow and UI wireframes using Figma, validated idea with user surveys and tutors.',
          tools: ['Figma', 'Photoshop'],
          heroImage: '/code.jpeg',
          images: ['/code.jpeg', '/code.jpeg']
        }
      }
    };
  },
  computed: {
    project() {
      const id = this.$route.params.id;
      return this.projects[id] || {
        title: 'Project Not Found',
        subtitle: '',
        overview: '',
        role: '',
        tools: [],
        heroImage: '',
        images: []
      };
    }
  }
};
</script>

<style scoped>
.ux-details-page {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  font-family: sans-serif;
}

.hero-section img {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.project-title {
  font-size: 2rem;
  font-weight: bold;
}

.project-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.section {
  margin-bottom: 2rem;
}

.tech-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-pill {
  background-color: #f0f0f0;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.gallery img {
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>