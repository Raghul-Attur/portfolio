<template>
    <div class="name-banner">
    <h1 class="name-header">USER</h1>
    <h1 class="name-header">EXPERIENCE</h1>
  </div>

    <div class="ux-projects-container">
      <transition name="fade">
        <div v-if="selectedProject === null" class="project-grid">
          <div
            v-for="(project, index) in uxProjects"
            :key="index"
            class="project-tile"
            @click="selectProject(index)"
          >
            <img :src="project.thumbnail" alt="Project Image" class="project-thumbnail" />
            <div class="project-title">{{ project.title }}</div>
          </div>
        </div>
      </transition>
  
      <transition name="fade">
        <div v-if="selectedProject !== null" class="project-details">
          <div class="fullwidth-header">
            <img :src="uxProjects[selectedProject].hero" alt="Hero Image" />
          </div>
  
          <div class="project-body">
            <button class="back-btn" @click="selectedProject = null">← Back to Projects</button>
  
            <h1 class="project-title">{{ uxProjects[selectedProject].title }}</h1>
            <p class="project-subtitle">{{ uxProjects[selectedProject].subtitle }}</p>
  
            <div class="section">
              <h3>Overview</h3>
              <p>{{ uxProjects[selectedProject].description }}</p>
            </div>
  
            <div class="section">
              <h3>My Role</h3>
              <p>{{ uxProjects[selectedProject].role }}</p>
            </div>
  
            <div class="section">
              <h3>Design Tools</h3>
              <div class="tech-buttons">
                <span
                  v-for="(tool, i) in uxProjects[selectedProject].tools"
                  :key="i"
                  class="tech-pill"
                >{{ tool }}</span>
              </div>
            </div>
  
            <div class="section image-gallery-personas">
              <h3></h3>
              <img
                v-for="(img, i) in uxProjects[selectedProject].images"
                :key="i"
                :src="img"
                alt="Project image"
              />
            </div>

            <div class="section image-gallery-insight">
              <img
                v-for="(img, i) in uxProjects[selectedProject].image"
                :key="i"
                :src="img"
                alt="Project image"
              />
            </div>

            <div class="section">
              <h3>Design Process</h3>
              <div class="ux-content" v-html="uxProjects[selectedProject].process"></div>
            </div>

            <div class="section image-gallery">
              <img
                v-for="(img, i) in uxProjects[selectedProject].images2"
                :key="i"
                :src="img"
                alt="Project image"
              />
            </div>

            <div class="section">
              <div class="ux-content" v-html="uxProjects[selectedProject].process2"></div>
            </div>

            <div class="section image-gallery3">
              <img
                v-for="(img, i) in uxProjects[selectedProject].images3"
                :key="i"
                :src="img"
                alt="Project image"
              />
            </div>
  
            <div class="button-group">
              <a
                class="btn-link"
                v-if="uxProjects[selectedProject].figma"
                :href="uxProjects[selectedProject].figma"
                target="_blank"
              >View Figma</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UXProjects',
    data() {
      return {
        selectedProject: null,
        uxProjects: [
          {
            title: 'FoodLink',
            subtitle: 'A gamified donation experience for impact-driven users.',
            thumbnail: '/ux1.jpg',
            hero: '/ux1.jpg',
            description:
              'The Food Bank Donation App was designed to simplify and gamify the food donation process while maintaining accessibility, feedback, and usability standards. This app serves as a platform for donors to locate nearby food banks, select items to donate, complete a checklist of donation guidelines, and receive step-by-step navigation to the drop-off point. Our main goal was to minimize user friction, especially for first-time donors and ensure the donation experience felt intuitive, supportive, and engaging.',
            role:
              'I was primarily responsible for UX research, low-fidelity sketching, high-fidelity prototyping in Figma, and ensuring that heuristic principles and WCAG accessibility guidelines were implemented across all interactive components. I also contributed significantly to the design system consistency, iconography decisions, and final presentation flow.',
              process: `
  <p><strong>In the high-fidelity version, we focused on modern, accessible interfaces:</strong></p>
  <ul>
    <li><strong>Visual Hierarchy:</strong> User-specific greetings, highlighted CTAs (“Donate”, “Navigate”), and clean card layouts made user engagement intuitive.</li>
    <li><strong>Consistency and Standards:</strong> Navigation bar icons were uniform across screens, enhancing recognition and reducing the learning curve.</li>
    <li><strong>Feedback and Accessibility:</strong> Buttons were designed with high contrast, touch targets were sufficiently large, and screen reader compatibility was included in the prototype.</li>
  </ul>

  <p><strong>UX Enhancements and Justifications</strong></p>
  <ul>
    <li>The filter section was condensed from a full overlay into a single top-right icon, streamlining the interface and improving user focus.</li>
    <li>The chatbot screen lacked real-time feedback (e.g., typing indicators), which we noted as a heuristic violation. A fix was recommended to improve perceived responsiveness and user trust.</li>
    <li>Error Prevention was addressed with checkboxes in the donation checklist and in-cart contextual help about high-demand items.</li>
    <li>Navigation was strengthened with a continuous visual path on the map, using Gestalt principles to guide users from their location to the drop-off.</li>
  </ul>

  <p><strong>Accessibility Highlights</strong></p>
  <ul>
    <li>Screen reader support was implemented for key pages like the Safety Checklist and Chatbot screens.</li>
    <li>High-contrast buttons and labels supported users with low vision or color blindness.</li>
    <li>Large touch targets reduced mis-taps and enhanced mobile usability for users with motor impairments.</li>
  </ul>

  <p>These considerations made the app inclusive and reliable under varying user needs.</p>
`,
process2: '<h3>Validation & Refinement</h3><p>After prototyping, we conducted usability testing sessions with a small user group representing diverse demographics, including first-time donors and low-tech users. Key refinements included:</p> <ul><li>Simplifying map instructions into clearer, larger step-by-step cards.</li><li>Adding a "Recently Viewed" section on the homepage to encourage repeat donations.</li><li>Improving the chatbot’s fallback options for donation-related FAQs.</li></ul><p>These iterations ensured the final product was user-friendly, intuitive, and aligned with real-world constraints observed during research.</p>',
            tools: ['Figma', 'Illustrator', 'Photoshop'],
            figma:
              'https://www.figma.com/design/HJhyfxP3O6dBH4P1ThRaOs/Cyndaquil?node-id=1-2',
            images: ['/User Personas-01.png', '/User Personas-02.png'],
            image: ['/impact-01.png', '/impact-02.png'],
            images2: ['/Foodbank.jpg', '/Foodbank2.jpg'],
            images3: ['/impact-03.png']
          },
          {
  title: 'Stylori Silver',
  subtitle: 'E-Commerce experience tailored for modern jewellery shoppers',
  thumbnail: '/Stylori-01.jpg',
  hero: '/Stylori-01.jpg',
  description:
    'Stylori Silver is a jewellery e-commerce platform that blends elegance with usability. Designed for lower to middle-income women shopping for daily and festive occasions, the site delivers a smooth browsing and purchase experience with simplified filtering, responsive layouts, and visual merchandising cues that enhance product discoverability.',
  role:
    'Led UI/UX efforts including wireframes, responsive layout design, interaction simplification, and filter system creation. My aim was to reduce browsing complexity while maintaining aesthetic appeal and product clarity.',
  process: `
    <p><strong>Design Objectives:</strong></p>
    <ul>
      <li>Streamline user journeys for quicker product discovery and checkout.</li>
      <li>Make filters and product categories simple and visible across device types.</li>
      <li>Use visual hierarchy to highlight bestsellers and seasonal offers.</li>
    </ul>
    <p><strong>Key UX Highlights:</strong></p>
    <ul>
      <li>Developed an intuitive filtering mechanism that grouped all price and category options logically.</li>
      <li>Minimized steps to product views and checkout to avoid user fatigue.</li>
      <li>Balanced content density with white space to support clarity and reduce cognitive load.</li>
    </ul>
  `,
  tools: ['Figma', 'Photoshop', 'Illustrator'],
  process2: `
    <h3>Responsive Design Considerations</h3>
    <p>We ensured the site was fully responsive, adapting seamlessly to mobile and desktop views. Key adjustments included:</p>
    <ul>
      <li>Collapsible filter menus on mobile to save screen space.</li>
      <li>Grid layouts that adjusted product card sizes based on screen width.</li>
      <li>Touch-friendly buttons and links for easier navigation on smaller devices.</li>
    </ul>
    <p>These changes made the site accessible and user-friendly across all platforms.</p>
  `,
  figma: '',
  images: [],
  image: ['/Stylori-02.jpg'],
  images2: ['/Stylori-03.jpg'],
  images3: []
}
        ]
      };
    },
    methods: {
      selectProject(index) {
        this.selectedProject = index;
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

  .ux-projects-container {
    padding: 2rem;
    max-width: 1200px;
    margin: auto;
  }
  
  .project-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }
  
  .project-tile {
    width: 100%;
    max-width: 500px;
    cursor: pointer;
    text-align: center;
  }
  
  .project-thumbnail {
    width: 100%;
    border-radius: 1rem;
    object-fit: cover;
    height: 300px;
  }
  
  .project-title {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1rem;
  }
  
  .project-details {
    animation: fadeIn 0.5s ease;
  }
  
  .fullwidth-header img {
    width: 100%;
    border-radius: 0;
    max-height: 500px;
    object-fit: cover;
  }
  
  .project-body {
    padding: 2rem;
    width:80%;
    align-items:center;
    margin: auto;
  }
  
  .project-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #555;
  }
  
  .section {
    margin-bottom: 2rem;
  }
  
  .tech-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .tech-pill {
    background-color: #f0f0f0;
    border-radius: 999px;
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
  }
  
  .image-gallery {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .image-gallery img {
    width: 100%;
    border-radius: 1rem;
    object-fit: cover;
  }

  .image-gallery-insight {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 100px;
}

.image-gallery-insight img {
  width: 80%;
  max-width: 900px;
  border-radius: 1rem;
  object-fit: cover;
  margin-top: 100px;
}


  .image-gallery-personas img {
    width: 100%;
    margin-bottom: -70px;
    border-radius: 1rem;
    object-fit: cover;
  }

  .image-gallery3 img {
    width: 100%;
    margin-bottom: -200px;
    border-radius: 1rem;
    object-fit: cover;
  }
  
  .button-group {
    margin-top: 2rem;
  }
  
  .btn-link {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: black;
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 600;
  }
  
  .back-btn {
    margin-bottom: 2rem;
    font-size: 1rem;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--text-muted);
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .ux-content {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #111;
}

.ux-content ul {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.ux-content li {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.ux-content p {
  margin-bottom: 1.25rem;
  font-weight: 400;
  line-height: 1.6;
}
  </style>