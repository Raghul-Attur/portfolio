<template>

  <!-- ── HERO ───────────────────────────────────────────────── -->
  <div class="name-banner-1">
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>

    <div class="hero-inner">

      <!-- Left: text -->
      <div class="hero-content">
        <h1 class="name-header-1">RAGHUL<br>SUKUMAR</h1>

        <div class="typewriter-row">
          <span class="typewriter-static">I am a&nbsp;</span>
          <span class="typewriter-text">{{ displayedRole }}<span class="cursor">|</span></span>
        </div>

        <p class="hero-bio">
          Designer and developer based in Melbourne.<br>
          6+ years crafting brands, motion, and digital products.
        </p>

        <div class="hero-cta">
          <a href="#portfolio" class="hero-btn hero-btn--primary" @click.prevent="scrollToPortfolio">
            View My Work
          </a>
          <a href="/Raghul_Sukumar_Resume.pdf" download class="hero-btn hero-btn--secondary">
            Download Resume
          </a>
        </div>
      </div>

      <!-- Right: photo -->
      <div class="hero-image-wrap">
        <img src="/Raghul_Image.png" alt="Raghul Sukumar" class="hero-photo" />
      </div>

    </div>
  </div>

  <!-- ── MARQUEE BAND 1 ─────────────────────────────────────── -->
  <div class="marquee-band">
    <div class="marquee-track">
      <span v-for="n in 3" :key="n">
        UI/UX Design &nbsp;✦&nbsp; Motion Graphics &nbsp;✦&nbsp; Brand Identity &nbsp;✦&nbsp;
        Web Development &nbsp;✦&nbsp; Campaign Design &nbsp;✦&nbsp; Accessibility &nbsp;✦&nbsp;
        Video Production &nbsp;✦&nbsp; Design Systems &nbsp;✦&nbsp;
      </span>
    </div>
  </div>

  <!-- ── PORTFOLIO BENTO ───────────────────────────────────── -->
  <div class="bento-wrapper" id="portfolio">
    <div class="bento-header">
      <span class="bento-eyebrow">Work</span>
      <h2 class="bento-title">Selected Projects</h2>
    </div>
    <div class="bento-grid">

      <router-link :to="sections[0].path" class="bento-tile bento-tile--large">
        <div class="bento-bg" :style="{ backgroundImage: 'url(' + sections[0].image + ')' }"></div>
        <div class="bento-content">
          <span class="bento-index">01</span>
          <div class="bento-bottom">
            <span class="bento-cat">UI / UX Design</span>
            <h3 class="bento-name">UX</h3>
            <span class="bento-arrow">&#x2192;</span>
          </div>
        </div>
      </router-link>

      <router-link :to="sections[1].path" class="bento-tile bento-tile--tall">
        <div class="bento-bg" :style="{ backgroundImage: 'url(' + sections[1].image + ')' }"></div>
        <div class="bento-content">
          <span class="bento-index">02</span>
          <div class="bento-bottom">
            <span class="bento-cat">Brand &amp; Campaign</span>
            <h3 class="bento-name">Design</h3>
            <span class="bento-arrow">&#x2192;</span>
          </div>
        </div>
      </router-link>

      <router-link :to="sections[2].path" class="bento-tile bento-tile--small">
        <div class="bento-bg" :style="{ backgroundImage: 'url(' + sections[2].image + ')' }"></div>
        <div class="bento-content">
          <span class="bento-index">03</span>
          <div class="bento-bottom">
            <span class="bento-cat">Motion &amp; Film</span>
            <h3 class="bento-name">Videos</h3>
            <span class="bento-arrow">&#x2192;</span>
          </div>
        </div>
      </router-link>

      <router-link :to="sections[3].path" class="bento-tile bento-tile--wide">
        <div class="bento-bg" :style="{ backgroundImage: 'url(' + sections[3].image + ')', backgroundPosition: 'top center' }"></div>
        <div class="bento-content">
          <span class="bento-index">04</span>
          <div class="bento-bottom">
            <span class="bento-cat">Development</span>
            <h3 class="bento-name">Dev</h3>
            <span class="bento-arrow">&#x2192;</span>
          </div>
        </div>
      </router-link>

    </div>
  </div>


  <!-- ── TOOLS & SKILLS ────────────────────────────────────── -->
  <div class="tools-section">
    <h2 class="tools-heading">Tools & Skills</h2>
    <div class="tools-categories">

      <div class="tools-category" v-for="cat in toolCategories" :key="cat.name">
        <h3 class="tools-cat-label">{{ cat.name }}</h3>
        <div class="tools-grid">
          <div class="tool-item" v-for="tool in cat.tools" :key="tool.name">
            <img :src="tool.icon" :alt="tool.name" />
            <span class="tool-tooltip">{{ tool.name }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- ── FEATURED WORK ──────────────────────────────────────── -->
  <div class="featured-section">
    <div class="featured-header">
      <h2 class="featured-title">Selected Work</h2>
      <router-link to="/ux" class="featured-view-all">View all →</router-link>
    </div>

    <div
      v-for="(project, index) in featuredProjects"
      :key="index"
      class="featured-project"
      :class="index % 2 === 1 ? 'featured-project--reverse' : ''"
    >
      <router-link :to="project.link" class="featured-image-wrap">
        <img :src="project.image" :alt="project.title" />
        <div class="featured-image-overlay">View Project →</div>
      </router-link>

      <div class="featured-info">
        <span class="featured-tag">{{ project.tag }}</span>
        <h3 class="featured-name">{{ project.title }}</h3>
        <p class="featured-desc">{{ project.description }}</p>
        <div v-if="project.result" class="featured-result">
          {{ project.result }}
        </div>
        <router-link :to="project.link" class="featured-link">View Project →</router-link>
      </div>
    </div>
  </div>

  <!-- ── RESULTS STRIP ──────────────────────────────────────── -->
  <div class="results-strip">
    <div class="results-inner">
      <div class="result-item" v-for="(r, i) in results" :key="i">
        <div class="result-number">{{ r.number }}</div>
        <div class="result-label">{{ r.label }}</div>
      </div>
    </div>
  </div>

  <!-- ── CLIENT LOGOS ───────────────────────────────────────── -->
  <div class="client-strip">
    <h4 class="client-heading">Brands I have worked with</h4>
    <div class="logo-wrapper">
      <div class="logo-track">
        <img v-for="(logo, i) in clientLogos" :key="'a' + i" :src="logo" class="client-logo" />
        <img v-for="(logo, i) in clientLogos" :key="'b' + i" :src="logo" class="client-logo" />
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      roles: ['UX Designer.', 'Motion Designer.', 'Developer.', 'Brand Designer.', 'Graphic Designer.', 'Digital Designer.'],
      roleIndex: 0,
      charIndex: 0,
      displayedRole: '',
      isDeleting: false,
      typeTimer: null,

      mouse: { x: -9999, y: -9999 },
      particles: [],
      animFrameId: null,

      sections: [
        { name: 'UX',     path: '/ux',         image: new URL('/home/1.png', import.meta.url).href,         position: 'center' },
        { name: 'Design', path: '/design',      image: new URL('/home/3.png', import.meta.url).href,         position: 'center' },
        { name: 'Videos', path: '/videography', image: new URL('/home/4.png', import.meta.url).href,         position: 'center' },
        { name: 'Dev',    path: '/dev',         image: new URL('/dev/ReadEase1.png', import.meta.url).href,  position: 'top center' },
      ],

      featuredProjects: [
        {
          title: 'ReadEase',
          tag: 'UX Design / Full Stack',
          description: 'An accessible learning platform built for young Australians with dyslexia. OCR document reader, AI summarisation, phonetic support, and gamified learning tools.',
          result: 'Best Project — Monash University Expo 2025',
          image: '/dev/ReadEase1.png',
          link: '/dev',
        },
        {
          title: 'FoodLink',
          tag: 'UX Design',
          description: 'A gamified donation platform designed to reduce friction for first-time donors. Built with accessibility and usability at the core.',
          result: '',
          image: '/ux1.jpg',
          link: '/ux',
        },
        {
          title: 'Villgro Campaign',
          tag: 'Campaign Design',
          description: 'Full multi-channel campaign suite for a social enterprise. Social posts, EDMs, display ads, and web banners delivered end to end.',
          result: '',
          image: '/Design-thumb-5.png',
          link: '/design/Villgro',
        },
      ],

      results: [
        { number: '125%', label: 'Engagement increase — Funskool campaign' },
        { number: '70%',  label: 'Cart abandonment reduction — Forser'     },
        { number: '200+', label: 'Digital assets delivered'                },
        { number: '6+',   label: 'Years of experience'                     },
      ],

      toolCategories: [
        {
          name: 'Design',
          tools: [
            { name: 'Figma',          icon: 'https://cdn.simpleicons.org/figma' },
            { name: 'Illustrator',    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg' },
            { name: 'Photoshop',      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg' },
            { name: 'InDesign',       icon: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg' },
            { name: 'Lightroom',      icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg' },
            { name: 'Framer',         icon: 'https://cdn.simpleicons.org/framer' },
          ]
        },
        {
          name: 'Motion & Video',
          tools: [
            { name: 'After Effects',  icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg' },
            { name: 'Premiere Pro',   icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg' },
          ]
        },
        {
          name: 'Development',
          tools: [
            { name: 'Vue.js',         icon: 'https://cdn.simpleicons.org/vuedotjs' },
            { name: 'React',          icon: 'https://cdn.simpleicons.org/react' },
            { name: 'HTML',           icon: 'https://cdn.simpleicons.org/html5' },
            { name: 'CSS',            icon: 'https://cdn.simpleicons.org/css' },
            { name: 'Python',         icon: 'https://cdn.simpleicons.org/python' },
            { name: 'JavaScript',     icon: 'https://cdn.simpleicons.org/javascript' },
            { name: 'Docker',         icon: 'https://cdn.simpleicons.org/docker' },
          ]
        },
      ],

      clientLogos: [
        new URL('/images/logos/1.png', import.meta.url).href,
        new URL('/images/logos/2.png', import.meta.url).href,
        new URL('/images/logos/3.png', import.meta.url).href,
        new URL('/images/logos/4.png', import.meta.url).href,
        new URL('/images/logos/5.png', import.meta.url).href,
        new URL('/images/logos/6.png', import.meta.url).href,
        new URL('/images/logos/7.png', import.meta.url).href,
        new URL('/images/logos/8.png', import.meta.url).href,
      ],
    };
  },

  mounted() {
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    this.initParticles();
    this.startTypewriter();
    window.addEventListener('resize', this.resizeCanvas);
  },

  beforeUnmount() {
    clearTimeout(this.typeTimer);
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.resizeCanvas);
    const banner = this.$refs.particleCanvas?.parentElement;
    if (banner) {
      banner.removeEventListener('mousemove',  this.onMouseMove);
      banner.removeEventListener('mouseleave', this.onMouseLeave);
    }
  },

  methods: {
    startTypewriter() {
      const currentRole = this.roles[this.roleIndex];
      const typeSpeed   = 80;
      const deleteSpeed = 40;
      const pauseEnd    = 1800;
      const pauseStart  = 300;

      if (!this.isDeleting) {
        this.displayedRole = currentRole.substring(0, this.charIndex + 1);
        this.charIndex++;
        if (this.charIndex === currentRole.length) {
          this.isDeleting = true;
          this.typeTimer  = setTimeout(() => this.startTypewriter(), pauseEnd);
          return;
        }
        this.typeTimer = setTimeout(() => this.startTypewriter(), typeSpeed);
      } else {
        this.displayedRole = currentRole.substring(0, this.charIndex - 1);
        this.charIndex--;
        if (this.charIndex === 0) {
          this.isDeleting = false;
          this.roleIndex  = (this.roleIndex + 1) % this.roles.length;
          this.typeTimer  = setTimeout(() => this.startTypewriter(), pauseStart);
          return;
        }
        this.typeTimer = setTimeout(() => this.startTypewriter(), deleteSpeed);
      }
    },

    buildGrid(width, height) {
      const SPACING = 28;
      this.particles = [];
      const cols = Math.ceil(width  / SPACING);
      const rows = Math.ceil(height / SPACING);
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          this.particles.push({ ox: c * SPACING, oy: r * SPACING, x: c * SPACING, y: r * SPACING });
        }
      }
    },

    resizeCanvas() {
      const canvas = this.$refs.particleCanvas;
      if (!canvas) return;
      const banner  = canvas.parentElement;
      canvas.width  = banner.offsetWidth;
      canvas.height = banner.offsetHeight;
      this.buildGrid(canvas.width, canvas.height);
    },

    initParticles() {
      const canvas = this.$refs.particleCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      this.resizeCanvas();
      const banner = canvas.parentElement;
      banner.addEventListener('mousemove',  this.onMouseMove);
      banner.addEventListener('mouseleave', this.onMouseLeave);
      this.animate(ctx, canvas);
    },

    onMouseMove(e) {
      const banner = this.$refs.particleCanvas?.parentElement;
      if (!banner) return;
      const rect   = banner.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    },

    onMouseLeave() {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    },

    animate(ctx, canvas) {
      const RADIUS     = 130;
      const MAX_PUSH   = 50;
      const DOT_RADIUS = 1.8;
      const EASE       = 0.08;

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of this.particles) {
          const dist = Math.sqrt((p.ox - this.mouse.x) ** 2 + (p.oy - this.mouse.y) ** 2);
          let targetX = p.ox, targetY = p.oy;
          if (dist < RADIUS && dist > 0) {
            const force = (RADIUS - dist) / RADIUS;
            const angle = Math.atan2(p.oy - this.mouse.y, p.ox - this.mouse.x);
            targetX = p.ox + Math.cos(angle) * force * MAX_PUSH;
            targetY = p.oy + Math.sin(angle) * force * MAX_PUSH;
          }
          p.x += (targetX - p.x) * EASE;
          p.y += (targetY - p.y) * EASE;
          const opacity = dist < RADIUS ? 0.12 + ((RADIUS - dist) / RADIUS) * 0.6 : 0.12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,0,0,${opacity})`;
          ctx.fill();
        }
        this.animFrameId = requestAnimationFrame(draw);
      };
      draw();
    },

    scrollToPortfolio() {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>

<style>

/* ── HERO ────────────────────────────────────────────────────── */
.name-banner-1 {
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin-top: 0;
  padding-top: 70px;
  position: relative;
  overflow: hidden;
  background: #fff;
}

.particle-canvas {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  padding: 0 6vw 0 6vw;
  position: relative;
  z-index: 1;
  gap: 0;
}

.hero-content {
  flex: 0 0 auto;
  width: 50%;
  text-align: left;
}

.name-header-1 {
  font-size: clamp(4rem, 12vw, 11rem);
  font-weight: 900;
  line-height: 0.92;
  margin: 0 0 1.4rem 0;
  color: #000;
  letter-spacing: -0.02em;
}

.typewriter-row {
  display: flex;
  align-items: baseline;
  font-family: 'Arial', sans-serif;
  font-size: clamp(1.2rem, 2.2vw, 2rem);
  font-weight: 400;
  color: #111;
  margin-bottom: 1rem;
}

.typewriter-static { color: #888; }

.typewriter-text {
  font-weight: 700;
  color: #000;
  min-width: 2ch;
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 0.75s step-end infinite;
  color: #000;
  font-weight: 300;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.hero-bio {
  font-family: 'Arial', sans-serif;
  font-size: clamp(0.85rem, 1.1vw, 1rem);
  color: #777;
  line-height: 1.75;
  margin: 0 0 2rem 0;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-block;
  padding: 0.85rem 2.2rem;
  border-radius: 999px;
  font-family: 'Arial', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.25s ease;
  cursor: pointer;
}

.hero-btn--primary  { background: #000; color: #fff; border: 2px solid #000; }
.hero-btn--primary:hover  { background: transparent; color: #000; }
.hero-btn--secondary { background: transparent; color: #000; border: 2px solid #000; }
.hero-btn--secondary:hover { background: #000; color: #fff; }

.hero-image-wrap {
  flex: 0 0 auto;
  width: 44%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-left: -2rem;
}

.hero-photo {
  mix-blend-mode: multiply;
  width: 100%;
  max-width: 480px;
  height: 92%;
  object-fit: cover;
  object-position: top center;
  display: block;
  filter: contrast(1.04);
}

/* ── MARQUEE ─────────────────────────────────────────────────── */
.marquee-band {
  width: 100%;
  background: #000;
  padding: 1rem 0;
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: inline-block;
  animation: marquee-left 30s linear infinite;
  font-family: 'Arial', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
}

.marquee-track--reverse {
  animation: marquee-right 30s linear infinite;
}

@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-33.33%); }
}

@keyframes marquee-right {
  0%   { transform: translateX(-33.33%); }
  100% { transform: translateX(0); }
}

/* ── BENTO GRID ──────────────────────────────────────────────── */
.bento-wrapper {
  background: #0a0a0a;
  padding: 5rem 3rem;
  width: 100%;
}

.bento-header {
  max-width: 1300px;
  margin: 0 auto 2.5rem;
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
}

.bento-eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #555;
  font-family: Arial, sans-serif;
}

.bento-title {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  font-family: Arial, sans-serif;
  letter-spacing: -0.02em;
}

.bento-grid {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 380px 260px;
  gap: 12px;
}

.bento-tile--large { grid-column: 1 / 3; grid-row: 1; }
.bento-tile--tall  { grid-column: 3;     grid-row: 1 / 3; }
.bento-tile--small { grid-column: 1;     grid-row: 2; }
.bento-tile--wide  { grid-column: 2;     grid-row: 2; }

.bento-tile {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.bento-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: brightness(0.55);
}

.bento-tile:hover .bento-bg {
  transform: scale(1.06);
  filter: brightness(0.35);
}

.bento-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.4rem 1.6rem;
}

.bento-index {
  font-family: Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: rgba(255,255,255,0.3);
}

.bento-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.bento-cat {
  font-family: Arial, sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  transition: color 0.3s ease;
}

.bento-tile:hover .bento-cat { color: rgba(255,255,255,0.75); }

.bento-name {
  font-family: Arial, sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.02em;
  transition: letter-spacing 0.3s ease;
}

.bento-tile:hover .bento-name { letter-spacing: 0.02em; }

.bento-arrow {
  font-size: 1.2rem;
  color: rgba(255,255,255,0);
  transition: color 0.3s ease, transform 0.3s ease;
  display: inline-block;
  transform: translateX(-8px);
  margin-top: 0.4rem;
}

.bento-tile:hover .bento-arrow {
  color: #fff;
  transform: translateX(0);
}

/* ── TOOLS & SKILLS ──────────────────────────────────────────── */
.tools-section {
  max-width: 1200px;
  margin: 5rem auto;
  padding: 0 2rem;
}

.tools-heading {
  font-size: 2.5rem;
  font-weight: 900;
  color: #000;
  margin: 0 0 3rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'Arial', sans-serif;
}

.tools-categories {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.tools-cat-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #aaa;
  margin: 0 0 1rem 0;
  font-family: 'Arial', sans-serif;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tool-item {
  position: relative;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #ebebeb;
  border-radius: 14px;
  background: #fff;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
}

.tool-item:hover {
  border-color: #000;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}

.tool-item img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: block;
}

.tool-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #111;
  color: #fff;
  font-family: 'Arial', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform: translateX(-50%) translateY(4px);
  z-index: 10;
}

.tool-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #111;
}

.tool-item:hover .tool-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ── FEATURED WORK ───────────────────────────────────────────── */
.featured-section {
  max-width: 1200px;
  margin: 6rem auto;
  padding: 0 2rem;
}

.featured-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
}

.featured-title   { font-size: 2.5rem; font-weight: 900; color: #000; margin: 0; }

.featured-view-all {
  font-size: 0.9rem; font-weight: 600; color: #000;
  text-decoration: none; letter-spacing: 0.06em; transition: opacity 0.2s;
}
.featured-view-all:hover { opacity: 0.5; }

.featured-project {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
}

.featured-project--reverse          { direction: rtl; }
.featured-project--reverse > *      { direction: ltr; }

.featured-image-wrap {
  position: relative; display: block;
  overflow: hidden; border-radius: 12px; aspect-ratio: 16 / 10;
}

.featured-image-wrap img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s ease; display: block;
}

.featured-image-wrap:hover img { transform: scale(1.04); }

.featured-image-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.45); color: #fff;
  font-weight: 700; font-size: 1rem; letter-spacing: 0.08em;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s ease;
  font-family: 'Arial', sans-serif;
}

.featured-image-wrap:hover .featured-image-overlay { opacity: 1; }

.featured-info { display: flex; flex-direction: column; gap: 1rem; }

.featured-tag {
  font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: #888; font-family: 'Arial', sans-serif;
}

.featured-name { font-size: 2.2rem; font-weight: 900; color: #000; margin: 0; line-height: 1.1; }

.featured-desc { font-size: 1rem; color: #555; line-height: 1.7; margin: 0; font-family: 'Arial', sans-serif; }

.featured-result {
  font-size: 0.9rem; font-weight: 700; color: #000;
  background: #f4f4f4; padding: 0.6rem 1rem;
  border-radius: 6px; border-left: 3px solid #000;
  font-family: 'Arial', sans-serif;
}

.featured-link {
  display: inline-block; font-size: 0.9rem; font-weight: 700;
  color: #000; text-decoration: none; letter-spacing: 0.06em;
  border-bottom: 2px solid #000; padding-bottom: 2px;
  width: fit-content; transition: opacity 0.2s;
  font-family: 'Arial', sans-serif;
}
.featured-link:hover { opacity: 0.5; }

/* ── RESULTS STRIP ───────────────────────────────────────────── */
.results-strip { background: #000; padding: 4rem 2rem; width: 100%; }

.results-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 2rem; text-align: center;
}

.result-number { font-size: 4rem; font-weight: 900; color: #fff; line-height: 1; font-family: 'Arial', sans-serif; }
.result-label  { font-size: 0.8rem; color: #888; margin-top: 0.5rem; font-family: 'Arial', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; }

/* ── CLIENT LOGOS ────────────────────────────────────────────── */
.client-strip { width: 100%; padding: 4rem 0; background: #fff; text-align: center; }

.client-heading {
  font-size: 1.1rem; font-weight: 700; margin-bottom: 2.5rem;
  color: #111; letter-spacing: 0.06em; text-transform: uppercase;
  font-family: 'Arial', sans-serif;
}

.logo-wrapper { overflow: hidden; width: 100%; }

.logo-track {
  display: flex; gap: 3rem; width: max-content;
  animation: scroll-left 40s linear infinite;
  align-items: center; padding-inline: 2rem;
}

.client-logo { height: 60px; filter: grayscale(100%); opacity: 0.6; transition: 0.3s ease; }
.client-logo:hover { filter: grayscale(0%); opacity: 1; transform: scale(1.05); }

/* ── CTA STRIP ───────────────────────────────────────────────── */
.cta-strip { width: 100%; padding: 5rem 2rem; background: #f7f7f7; text-align: center; }

.cta-label { font-size: 2.2rem; font-weight: 700; color: #000; margin-bottom: 2rem; font-family: 'Arial', sans-serif; }

.cta-actions { display: flex; justify-content: center; align-items: center; gap: 1.2rem; flex-wrap: wrap; }

.cta-btn {
  display: inline-block; padding: 0.8rem 2rem; border-radius: 999px;
  font-size: 0.95rem; font-weight: 600; font-family: 'Arial', sans-serif;
  text-decoration: none; transition: all 0.25s ease; letter-spacing: 0.04em;
}

.cta-outline { border: 2px solid #000; color: #000; background: transparent; }
.cta-outline:hover { background: #000; color: #fff; }
.cta-solid   { background: #000; color: #fff; border: 2px solid #000; }
.cta-solid:hover { background: transparent; color: #000; }

/* ── ANIMATIONS ──────────────────────────────────────────────── */
@keyframes scroll-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

body { overflow-x: hidden; }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .name-banner-1 {
    height: auto;
    min-height: 100vh;
    align-items: center;
    padding-top: 70px;
  }

  .hero-inner {
    flex-direction: column-reverse;
    padding: 1.5rem 1.5rem 2rem;
    gap: 0;
    align-items: center;
  }

  .hero-content { width: 100%; text-align: center; }

  .hero-image-wrap {
    width: 70%;
    height: 40vw;
    max-height: 280px;
    align-items: flex-end;
  }

  .hero-photo { height: 100%; object-position: top center; }
  .hero-cta { justify-content: center; }
  .hero-btn { font-size: 0.8rem; padding: 0.7rem 1.6rem; }
  .typewriter-row { justify-content: center; }

  .tools-section { margin: 3rem auto; }
  .tools-heading { font-size: 1.8rem; }
  .tools-grid { gap: 0.5rem; }
  .tool-item { width: 46px; height: 46px; border-radius: 12px; }
  .tool-item img { width: 24px; height: 24px; }

  .bento-wrapper { padding: 3rem 1.2rem; }
  .bento-grid {
    grid-template-columns: 1fr !important;
    grid-template-rows: repeat(4, 220px) !important;
  }
  .bento-tile--large,
  .bento-tile--tall,
  .bento-tile--small,
  .bento-tile--wide {
    grid-column: 1 !important;
    grid-row: auto !important;
  }
  .bento-name { font-size: 2rem !important; }

  .featured-project { grid-template-columns: 1fr; gap: 2rem; margin-bottom: 3rem; }
  .featured-project--reverse { direction: ltr; }
  .featured-name { font-size: 1.6rem; }

  .results-inner { grid-template-columns: repeat(2, 1fr); }
  .result-number { font-size: 2.5rem; }

  .cta-label { font-size: 1.5rem; }
  .cta-actions { flex-direction: column; }
  .cta-btn { width: 100%; max-width: 320px; text-align: center; }
  .client-logo { height: 40px; }
}

@media (max-width: 480px) {
  .results-inner { grid-template-columns: 1fr 1fr; gap: 1rem; }
}
</style>