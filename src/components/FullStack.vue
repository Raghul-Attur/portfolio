<template>
    <div class="name-banner">
    <h1 class="name-header">FULL STACK DEVELOPMENT</h1>
  </div>
    <div class="code-page">
      <div class="project-row" v-for="(project, index) in projects" :key="index">
        <div class="project-header">
          <div class="project-tag" :style="{ backgroundColor: project.idColor }">{{ project.id }}</div>
          <div class="project-title">{{ project.title }}</div>
          <div class="project-meta">{{ project.flavour }}</div>
          <div class="project-meta">{{ project.origin }}</div>
          <div class="project-meta">{{ project.profile }}</div>
          <button class="toggle-btn" @click="toggleProject(index)">
            {{ activeProjectIndex === index ? '×' : '+' }}
          </button>
        </div>
  
        <transition name="slide-fade">
          <div class="project-details" v-if="activeProjectIndex === index">
            <div class="project-content-wrapper">
              <div class="project-carousel">
                <swiper
                  :slides-per-view="1"
                  :modules="swiperModules"
                  navigation
                >
                  <swiper-slide v-for="(img, i) in project.screenshots" :key="i">
                    <img :src="img" alt="Screenshot" />
                  </swiper-slide>
                </swiper>
              </div>
  
              <div class="project-description">
                <div class="project-techstack">
                  <h5>Tech Stack</h5>
                  <div class="tech-buttons">
                    <span v-for="(tech, i) in project.techstack" :key="i" class="tech-pill">{{ tech }}</span>
                  </div>
                </div>
  
                <h4>About the Project</h4>
                <p>{{ project.description }}</p>
                <h4>My Role</h4>
                <p>{{ project.role }}</p>
                <!-- <h4>Highlights</h4>
                <ul>
                  <li v-for="(point, i) in project.highlights" :key="i">{{ point }}</li>
                </ul> -->
                <div class="project-buttons">
                  <a class="button-link" :href="project.github" target="_blank">GitHub</a>
                  <a v-if="project.website" class="button-link" :href="project.website" target="_blank">Visit Site</a>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import { Navigation } from 'swiper/modules';
  
  
  export default {
    components: { Swiper, SwiperSlide },
    data() {
      return {
        activeProjectIndex: null,
        swiperModules: [Navigation],
        projects: [
          {
            id: 'FS-WEB-01',
            idColor: '#000000',
            title: 'ReadEase',
            flavour: 'DYSLEXIA SUPPORT',
            origin: 'FULLSTACK APP',
            profile: 'ACCESSIBILITY',
            description: 'A platform to support users with dyslexia by offering OCR-based document readers, voice output, summarizers, and learning games.',
            role: 'Vue frontend lead, handled OCR integration, gamified elements, speech and theme settings.',
            github: 'https://github.com/ratt0008/readease.git',
            website: 'https://www.readease.me',
            screenshots: ['/dev/ReadEase1.png','/dev/ReadEase2.png','/dev/ReadEase3.png'],
            techstack: ['Vue.js', 'Bootstrap', 'Node.js', 'AWS', 'RDS', 'MySQL', 'Google Cloud'],
            highlights: ['Built accessibility panel', 'Integrated text-to-speech', 'Created rating logic and dashboard']
          },
          {
            id: 'FS-WEB-02',
            idColor: '#000000',
            title: 'CultureWell',
            flavour: 'HEALTH CHARITY',
            origin: 'FULLSTACK APP',
            profile: 'INCLUSIVE DESIGN',
            description: 'Built to support Indigenous health causes, CultureWell includes pathways for volunteers, researchers, and communities.',
            role: 'Frontend/UI dev, implemented login auth and role-based views, secured input validation and dynamic rating logic.',
            github: 'https://github.com/ratt0008/raghul-fit5032.git',
            website: 'https://culturewell.netlify.app',
            screenshots: ['/dev/CultureWell1.png','/dev/CultureWell2.png','/dev/CultureWell3.png'],
            techstack: ['Vue.js', 'Bootstrap', 'Node.js', 'Firebase', 'MySQL'],
            highlights: ['Dynamic user dashboard', 'Role-based access system', 'Live rating mechanism']
          },
          {
            id: 'FS-WEB-03',
            idColor: '#000000',
            title: 'PixTag',
            flavour: 'IMAGE TAGGING',
            origin: 'SERVERLESS APP',
            profile: 'AWS + REACT',
            description: 'A tagging and retrieval system built on AWS. Uploads images, detects objects, and organizes them with tags.',
            role: 'Built full React frontend, integrated Cognito, thumbnail conversions, and S3 upload pipeline.',
            github: 'https://github.com/Shivasuryan/FIT5225-ass3-group41.git',
            website: '',
            screenshots: ['/dev/PixTag1.png'],
            techstack: ['React', 'AWS S3', 'Cognito', 'DynamoDB'],
            highlights: ['Tag-based image search', 'Secure user auth with Cognito', 'Serverless backend integration']
          }
        ]
      };
    },
    methods: {
      toggleProject(index) {
        this.activeProjectIndex = this.activeProjectIndex === index ? null : index;
      }
    }
  };
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

  .code-page {
    padding: 4rem 2rem;
  }
  
  .project-row {
    border-bottom: 1px solid #ccc;
    padding: 2rem 0;
  }
  
  .project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .project-tag {
    padding: 0.5rem 1.2rem;
    border-radius: 999px;
    font-weight: bold;
    color: white;
  }
  
  .project-title {
    font-size: 1.5rem;
    font-weight: bold;
    flex-grow: 1;
    min-width: 150px;
  }
  
  .project-meta {
    font-size: 0.9rem;
    font-weight: 500;
    min-width: 120px;
    text-align: center;
  }
  
  .toggle-btn {
    border: 2px solid black;
    border-radius: 999px;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    font-weight: bold;
    background: black;
    color: white;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .project-details {
    margin-top: 2rem;
    min-height: 400px;
  }
  
  .project-content-wrapper {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  
  .project-carousel {
    flex: 2;
    min-width: 300px;
    max-width: 800px;
    aspect-ratio: 16 / 8;
    background: #f4f4f4;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .project-carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .project-description {
    flex: 1;
    text-align: left;
    line-height: 1.6;
    min-width: 100px;
  }
  
  .project-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }
  
  .button-link {
    background-color: black;
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    font-weight: bold;
    text-decoration: none;
    font-size: 0.9rem;
    transition: 0.3s;
  }
  
  .button-link:hover {
    background-color: #333;
  }
  
  .project-techstack {
    margin-top: 1rem;
  }
  
  .tech-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }
  
  .tech-pill {
    background-color: #f0f0f0;
    border-radius: 999px;
    padding: 0.4rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }
  
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.5s ease;
    overflow: hidden;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    max-height: 0;
    opacity: 0;
  }
  .slide-fade-enter-to,
  .slide-fade-leave-from {
    max-height: 1000px;
    opacity: 1;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: black !important;
    background-color: white;
    border: 1px solid black;
    border-radius: 999px;
    width: 36px;
    height: 36px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
    transition: background 0.3s, color 0.3s;
    z-index: 10;
  }
  
  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background-color: black;
    color: white !important;
  }
  
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 16px;
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    .project-content-wrapper {
      flex-direction: column;
    }
  }
  </style>
  