<template>
  <div class="name-banner">
    <h1 class="name-header">RAGHUL<br>ATTUR<br>SUKUMAR</h1>
    <div class="floating-tags">
      <span class="tag tag1">Photographer</span>
      <span class="tag tag2">UI/UX Designer</span>
      <span class="tag tag3">Developer</span>
      <span class="tag tag4">Editor</span>
      <span class="tag tag5">Film Maker</span>
      <span class="tag tag6">Engineer</span>
      <span class="tag tag7">Motion Designer</span>
    </div>
  <div class="navigation-arrow">
    <h1>↓</h1>
  </div>
  </div>

  <div class="intro-section">
    <h2>Welcome to my digital portfolio!</h2>
    <p>
      This is where creativity meets precision, where the designer in me collaborates with the developer, and personal passion aligns with professional purpose.
      Here, you’ll find projects that reflect my journey from a junior designer to a full-stack developer, each thoughtfully crafted with attention to detail and user impact.
      Whether you’re a recruiter exploring talent or a curious visitor, I invite you to explore my work. If anything resonates with you, feel free to connect through the links at the bottom of the page.
    </p>
  </div>

  <div class="portfolio-wrapper">
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
  </div>

  <!-- CLIENT LOGO STRIP -->
  <div class="client-strip">
  <h4>BRANDS THAT I HAVE WORKED WITH</h4>
  <div class="logo-wrapper">
    <div class="logo-track">
      <img v-for="(logo, i) in clientLogos" :key="'a' + i" :src="logo" class="client-logo" alt="Client logo" />
      <img v-for="(logo, i) in clientLogos" :key="'b' + i" :src="logo" class="client-logo" alt="Client logo" />
    </div>
  </div>
</div>
</template>
  
<script>
import { onMounted } from 'vue';
export default {
  name: 'Home',
  data() {
    return {
      sections: [
        { name: 'Dev', path: '/dev', image: new URL('/home/5.jpg', import.meta.url).href },
        { name: 'UX', path: '/ux', image: new URL('/home/1.png', import.meta.url).href },
        { name: 'Design', path: '/design', image: new URL('/home/3.png', import.meta.url).href },
        { name: 'Photos', path: '/photography', image: new URL('/home/2.png', import.meta.url).href },
        { name: 'Videos', path: '/videography', image: new URL('/home/4.png', import.meta.url).href }
      ],
      clientLogos: [
        new URL('/images/logos/1.png', import.meta.url).href,
        new URL('/images/logos/2.png', import.meta.url).href,
        new URL('/images/logos/3.png', import.meta.url).href,
        new URL('/images/logos/4.png', import.meta.url).href,
        new URL('/images/logos/5.png', import.meta.url).href,
        new URL('/images/logos/6.png', import.meta.url).href,
        new URL('/images/logos/7.png', import.meta.url).href,
        new URL('/images/logos/8.png', import.meta.url).href
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }
}
</script>
  
  <style>

  .client-strip h4 {
    text-align: center;
    margin-bottom: 50px;
    font-size: 1rem;
    color: #333;
    letter-spacing: 10px;
    word-spacing: 10px;
  }

  .name-banner {
  height: 100vh;                /* fill entire viewport */
  display: flex;
  flex-direction: column;
  align-items: flex-start;      /* left aligned */
  justify-content: center;      /* center vertically */
  padding: 0 2rem;
  margin-top: 5vh;
  position: relative;
  overflow: hidden;
}

.name-header {
  font-size: 27vh;              /* scales based on viewport height */
  font-weight: 900;
  line-height: 0.95;
  text-align: left;
  word-break: break-word;
  white-space: pre-line;
  margin: 0;
}

  .portfolio-wrapper {
    margin-top: 50px;
  }

  .navigation-arrow h1{
    text-align: center;
    font-size: 3rem;
  }

  .navigation-arrow{
    margin-top: 20px;
    animation: bounce 2s infinite;
  }

  .intro-section {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  text-align: center;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.intro-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.intro-section p {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}
  
  .portfolio-sections {
    display: flex;
    width: 100vw;
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
  
  /* === Responsive Styles === */
  @media (max-width: 768px) {
    .name-banner {
      padding: 1rem 1.5rem;
      margin-top: 40px;
    }
  
    .name-header {
      font-size: 8vw;
      text-align: center;
    }
  
    .portfolio-sections {
      flex-direction: column;
      height: auto;
    }
  
    .section-tile {
      flex: none;
      height: 30vh;
    }
  }
  
  @media (max-width: 480px) {
    .name-header {
      font-size: 10vw;
    }
  
    .section-tile {
      height: 25vh;
    }
  
    .section-label {
      font-size: 1rem;
    }
  }

  .client-strip {
  overflow: hidden;
  width: 100%;
  background: #ffffff;
  padding: 2rem 0;
  margin-top: 100px;
}

.logo-wrapper {
  overflow: hidden;
  width: 100%;
}

.logo-track {
  display: flex;
  width: fit-content;
  animation: scroll-left 40s linear infinite;
  gap: 3rem;
  align-items: center;
  padding-inline: 2rem;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.client-logo {
  height: 60px;
  width: auto;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.9;
  transition: transform 0.3s ease;
}

.client-logo:hover {
  transform: scale(1.05);
  filter: grayscale(0%);
  opacity: 1;
}

/* Make responsive on small screens */
@media (max-width: 768px) {
  .client-logo {
    height: 40px;
  }

  .logo-track {
    gap: 1.5rem;
    animation-duration: 20s;
  }
}
/* === FLOATING TAGS DESKTOP + MOBILE SUPPORT === */

.floating-tags {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.tag {
  position: absolute;
  padding: 10px 24px;                         /* Bigger padding */
  border-radius: 24px;
  font-size: 2rem;                          /* Bigger font size */
  font-weight: 600;
  color: white;
  font-family: 'Courier New', monospace;
  white-space: nowrap;
  box-shadow: 0 0 14px rgba(255, 255, 255, 0.45); /* Slightly stronger glow */
  transform: rotate(var(--angle));
  animation: floatTag 6s ease-in-out infinite;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 2;
}

/* Optional: On hover, make them scale and glow more */
.tag:hover {
  transform: scale(1.1) rotate(var(--angle));
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.8);
  z-index: 5;
}

/* Individual tags */
.tag1 { top: 10%; left: 65%; background: #00d4a6; --angle: -12deg; }
.tag2 { top: 38%; left: 62%; background: #ff6c00; --angle: 10deg; }
.tag3 { top: 23%; left: 82%; background: #00b2ff; --angle: 20deg; }
.tag4 { top:57%; left: 60%; background: #ffe600; color: #000; --angle: -10deg; }
.tag5 { top: 58%; left: 78%; background: #9900ff; --angle: -15deg; }
.tag6 { top: 30%; left: 42%; background: #ff2fad; --angle: 8deg; }
.tag7 { top: 78%; left: 74%; background: #ff0059; --angle: -7deg; }

@media (max-width: 768px) {
  .floating-tags {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem 0.7rem;
    padding: 1.5rem 1rem 0 1rem;
    height: auto;
  }

  .tag {
    position: relative;
    font-size: 0.75rem;
    padding: 4px 12px;
    animation: none !important;
    transform: rotate(0deg) !important;
  }

  .tag1, .tag2, .tag3, .tag4, .tag5, .tag6, .tag7 {
    top: auto;
    left: auto;
  }
}

body {
  overflow-x: hidden;
}
  </style>

<style>
@keyframes floatTag {
  0%, 100% { transform: translateY(0) rotate(var(--angle)); }
  50% { transform: translateY(-10px) rotate(var(--angle)); }
}

</style>

