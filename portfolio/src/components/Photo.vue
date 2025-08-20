<template>
    <div class="code-page">
      <div class="project-list">
        <div 
          class="project-tile" 
          v-for="(project, index) in projects" 
          :key="index" 
          @click="openProject(project)"
        >
          <img :src="project.image" alt="Project thumbnail" />
          <div class="project-info">
            <h6>{{ project.tag }}</h6>
            <h2>{{ project.title }}</h2>
            <div class="stack-tags">
              <span 
                v-for="(tech, i) in project.stack" 
                :key="i" 
                class="stack-pill" 
                :style="{ backgroundColor: tech.color }"
              >
                {{ tech.label }}
              </span>
            </div>
            <button class="launch-btn">Launch <span>→</span></button>
          </div>
        </div>
      </div>
  
      <!-- Full-screen popup -->
      <div v-if="activeProject" class="project-modal" @click.self="closeProject">
        <div class="project-modal-content">
          <button class="close-btn" @click="closeProject">×</button>
          <h1>{{ activeProject.title }}</h1>
          <p>{{ activeProject.description }}</p>
          <div class="modal-links">
            <a v-if="activeProject.github" :href="activeProject.github" target="_blank">GitHub Repo</a>
            <a v-if="activeProject.website" :href="activeProject.website" target="_blank">Live Site</a>
          </div>
          <div class="modal-images">
            <img 
              v-for="(img, i) in activeProject.screenshots" 
              :key="i" 
              :src="require(`@/assets/${img}`)" 
              alt="Project screenshot" 
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CodePage',
    data() {
      return {
        projects: [
          {
            title: 'ReadEase',
            tag: 'FULLSTACK APP',
            image: new URL('@/assets/code.jpeg', import.meta.url).href,
            stack: [
              { label: 'Vue.js', color: '#41B883' },
              { label: 'AWS Lambda', color: '#FF9900' },
              { label: 'RDS', color: '#00758F' },
              { label: 'Google OCR', color: '#EA4335' }
            ],
            description: `ReadEase is a personalized accessibility platform built for young Australians with dyslexia. The platform includes text-to-speech, AI-powered summarization tools, image-to-text document conversion, and interactive learning games categorized by difficulty.`,
            github: 'https://github.com/ratt0008/readease.git',
            website: 'https://www.readease.me'
          },
          {
            title: 'CultureWell',
            tag: 'FULLSTACK APP',
            image: new URL('@/assets/code.jpeg', import.meta.url).href,
            stack: [
              { label: 'Vue.js', color: '#41B883' },
              { label: 'Bootstrap', color: '#7952B3' },
              { label: 'Node.js', color: '#3C873A' },
              { label: 'RDS', color: '#00758F' }
            ],
            description: `CultureWell is a web platform supporting Indigenous health charities in Australia, featuring role-based access, donation portals, and interactive project maps.`,
            github: 'https://github.com/ratt0008/raghul-fit5032.git',
            website: 'https://culturewell.netlify.app'
          },
          {
            title: 'PixTag',
            tag: 'FULLSTACK APP',
            image: new URL('@/assets/code.jpeg', import.meta.url).href,
            stack: [
              { label: 'React', color: '#61DAFB' },
              { label: 'AWS S3', color: '#569A31' },
              { label: 'Cognito', color: '#232F3E' },
              { label: 'DynamoDB', color: '#4053D6' }
            ],
            description: `PixTag is a serverless image management app using AWS. Users can upload images, auto-tag them via object detection, and retrieve or modify tags with full auth control.`,
            github: 'https://github.com/Shivasuryan/FIT5225-ass3-group41.git',
            website: ''
          }
        ],
        activeProject: null
      };
    },
    methods: {
      openProject(project) {
        this.activeProject = project;
      },
      closeProject() {
        this.activeProject = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .code-page {
    padding: 4rem 2rem;
  }
  
  .project-list {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    align-items: center;
  }
  
  .project-tile {
    display: flex;
    gap: 3rem;
    align-items: center;
    cursor: pointer;
    max-width: 1000px;
    width: 100%;
  }
  
  .project-tile img {
    width: 50%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    border-radius: 4px;
  }
  
  .project-info h6 {
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  
  .project-info h2 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  
  .stack-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  
  .stack-pill {
    color: black;
    background-color: #eee;
    border-radius: 999px;
    padding: 0.4rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .launch-btn {
    background: transparent;
    border: 2px solid black;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .launch-btn span {
    margin-left: 1rem;
    transition: margin-left 0.3s;
  }
  
  .launch-btn:hover span {
    margin-left: 1.5rem;
  }
  
  .project-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: white;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  
  .project-modal-content {
    max-width: 800px;
    width: 100%;
    text-align: center;
    position: relative;
  }
  
  .modal-links a {
    display: inline-block;
    margin: 1rem;
    font-weight: bold;
    color: #0073e6;
    text-decoration: underline;
  }
  
  .modal-images img {
    max-width: 100%;
    margin-top: 1rem;
    border-radius: 6px;
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    border: none;
    background: none;
    cursor: pointer;
  }
  </style>