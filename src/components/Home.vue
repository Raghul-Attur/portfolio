<template>

  <!-- ── HERO ───────────────────────────────────────────────── -->
  <div class="name-banner-1">
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>

    <div class="hero-content">
      <h1 class="name-header-1">RAGHUL<br>SUKUMAR</h1>

      <div class="typewriter-row">
        <span class="typewriter-static">I am a&nbsp;</span>
        <span class="typewriter-text">{{ displayedRole }}<span class="cursor">|</span></span>
      </div>

      <div class="hero-cta">
        <a href="#portfolio" class="hero-btn hero-btn--primary" @click.prevent="scrollToPortfolio">
          View My Work
        </a>
        <a href="/Raghul_Sukumar_Resume.pdf" download class="hero-btn hero-btn--secondary">
          Download Resume
        </a>
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

  <!-- ── PORTFOLIO TILES ────────────────────────────────────── -->
  <div class="portfolio-wrapper" id="portfolio">
    <div class="portfolio-sections">
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

  <!-- ── MARQUEE BAND 2 ─────────────────────────────────────── -->
  <div class="marquee-band marquee-band--reverse">
    <div class="marquee-track marquee-track--reverse">
      <span v-for="n in 3" :key="n">
        After Effects &nbsp;✦&nbsp; Figma &nbsp;✦&nbsp; Adobe Creative Suite &nbsp;✦&nbsp;
        Vue.js &nbsp;✦&nbsp; React &nbsp;✦&nbsp; Python &nbsp;✦&nbsp; AWS &nbsp;✦&nbsp;
        Premiere Pro &nbsp;✦&nbsp; InDesign &nbsp;✦&nbsp; Photoshop &nbsp;✦&nbsp;
      </span>
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

  <!-- ── CTA STRIP ──────────────────────────────────────────── -->
  <div class="cta-strip">
    <p class="cta-label">Want to work together?</p>
    <div class="cta-actions">
      <a href="mailto:raghul.attursukumar@gmail.com" class="cta-btn cta-outline">
        raghul.attursukumar@gmail.com
      </a>
      <a href="https://linkedin.com/in/raghul-sukumar" target="_blank" class="cta-btn cta-outline">
        LinkedIn
      </a>
      <a href="/Raghul_Sukumar_Resume.pdf" download class="cta-btn cta-solid">
        Download Resume
      </a>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      // ── Typewriter ──────────────────────────────────────────
      roles: ['UX Designer.', 'Motion Designer.', 'Developer.', 'Brand Designer.', 'Graphic Designer', 'Digital Designer'],
      roleIndex: 0,
      charIndex: 0,
      displayedRole: '',
      isDeleting: false,
      typeTimer: null,

      // ── Particle canvas ─────────────────────────────────────
      mouse: { x: -9999, y: -9999 },
      particles: [],
      animFrameId: null,

      // ── Portfolio tiles ─────────────────────────────────────
      sections: [
        { name: 'UX',     path: '/ux',         image: new URL('/home/1.png', import.meta.url).href },
        { name: 'Design', path: '/design',      image: new URL('/home/3.png', import.meta.url).href },
        { name: 'Videos', path: '/videography', image: new URL('/home/4.png', import.meta.url).href },
        { name: 'Dev',    path: '/dev',         image: new URL('/home/5.jpg', import.meta.url).href },
      ],

      // ── Featured work ───────────────────────────────────────
      featuredProjects: [
        {
          title: 'ReadEase',
          tag: 'UX Design / Full Stack',
          description: 'An accessible learning platform built for young Australians with dyslexia. OCR document reader, AI summarisation, phonetic support, and gamified learning tools.',
          result: '🏆 Best Project — Monash University Expo 2025',
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

      // ── Results ─────────────────────────────────────────────
      results: [
        { number: '125%',  label: 'Engagement increase — Funskool campaign' },
        { number: '70%',   label: 'Cart abandonment reduction — Forser' },
        { number: '200+',  label: 'Digital assets delivered' },
        { number: '6+',    label: 'Years of experience' },
      ],

      // ── Client logos ────────────────────────────────────────
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
    // ── Typewriter ────────────────────────────────────────────
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
          this.typeTimer = setTimeout(() => this.startTypewriter(), pauseEnd);
          return;
        }
        this.typeTimer = setTimeout(() => this.startTypewriter(), typeSpeed);
      } else {
        this.displayedRole = currentRole.substring(0, this.charIndex - 1);
        this.charIndex--;
        if (this.charIndex === 0) {
          this.isDeleting  = false;
          this.roleIndex   = (this.roleIndex + 1) % this.roles.length;
          this.typeTimer   = setTimeout(() => this.startTypewriter(), pauseStart);
          return;
        }
        this.typeTimer = setTimeout(() => this.startTypewriter(), deleteSpeed);
      }
    },

    // ── Particle canvas ───────────────────────────────────────
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  margin-top: 5vh;
  position: relative;
  overflow: hidden;
  background: #fff;
}

/* ── HERO SKILLS STACK ───────────────────────────────────────── */

.hero-cta {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-block;
  padding: 0.85rem 2.2rem;
  border-radius: 999px;
  font-family: 'Arial', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.25s ease;
  cursor: pointer;
}

.hero-btn--primary {
  background: #000;
  color: #fff;
  border: 2px solid #000;
}

.hero-btn--primary:hover {
  background: transparent;
  color: #000;
}

.hero-btn--secondary {
  background: transparent;
  color: #000;
  border: 2px solid #000;
}

.hero-btn--secondary:hover {
  background: #000;
  color: #fff;
}

.particle-canvas {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 900px;
  text-align: left;
}

.name-header-1 {
  font-size: 18vh;
  font-weight: 900;
  line-height: 0.95;
  margin: 0;
  color: #000;
  word-break: break-word;
  white-space: pre-line;
}

/* Typewriter row */
.typewriter-row {
  display: flex;
  align-items: baseline;
  margin-top: 1.2rem;
  font-family: 'Arial', sans-serif;
  font-size: 2.6rem;
  font-weight: 400;
  color: #111;
}

.typewriter-static {
  color: #888;
}

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

.role-descriptor {
  font-size: 0.95rem;
  font-weight: 400;
  color: #999;
  margin: 0.6rem 0 0;
  letter-spacing: 0.04em;
  font-family: 'Arial', sans-serif;
}

/* ── MARQUEE BAND ────────────────────────────────────────────── */
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

/* ── PORTFOLIO TILES ─────────────────────────────────────────── */
.portfolio-wrapper { margin-top: 0; }

.portfolio-sections {
  display: flex;
  width: 100vw;
  height: 85vh;
  overflow: hidden;
  margin: 0; padding: 0;
}

.section-tile {
  flex: 1;
  text-decoration: none;
  color: white;
  transition: flex 0.4s ease;
  min-width: 0;
}

.section-tile:hover { flex: 2; }

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
  background: rgba(0,0,0,0.6);
  padding: 1rem;
  border-top: 1px solid white;
}

.section-index { font-size: 1rem; font-weight: 600; letter-spacing: 2px; }

.section-label {
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0.3rem;
  letter-spacing: 2px;
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

.featured-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #000;
  margin: 0;
}

.featured-view-all {
  font-size: 0.9rem;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: opacity 0.2s;
}

.featured-view-all:hover { opacity: 0.5; }

.featured-project {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
}

.featured-project--reverse {
  direction: rtl;
}

.featured-project--reverse > * {
  direction: ltr;
}

.featured-image-wrap {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 12px;
  aspect-ratio: 16 / 10;
}

.featured-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}

.featured-image-wrap:hover img {
  transform: scale(1.04);
}

.featured-image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-family: 'Arial', sans-serif;
}

.featured-image-wrap:hover .featured-image-overlay {
  opacity: 1;
}

.featured-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.featured-tag {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #888;
  font-family: 'Arial', sans-serif;
}

.featured-name {
  font-size: 2.2rem;
  font-weight: 900;
  color: #000;
  margin: 0;
  line-height: 1.1;
}

.featured-desc {
  font-size: 1rem;
  color: #555;
  line-height: 1.7;
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.featured-result {
  font-size: 0.9rem;
  font-weight: 700;
  color: #000;
  background: #f4f4f4;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border-left: 3px solid #000;
  font-family: 'Arial', sans-serif;
}

.featured-link {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #000;
  text-decoration: none;
  letter-spacing: 0.06em;
  border-bottom: 2px solid #000;
  padding-bottom: 2px;
  width: fit-content;
  transition: opacity 0.2s;
  font-family: 'Arial', sans-serif;
}

.featured-link:hover { opacity: 0.5; }

/* ── RESULTS STRIP ───────────────────────────────────────────── */
.results-strip {
  background: #000;
  padding: 4rem 2rem;
  width: 100%;
}

.results-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
}

.result-number {
  font-size: 4rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
  font-family: 'Arial', sans-serif;
}

.result-label {
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.5rem;
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ── CLIENT LOGOS ────────────────────────────────────────────── */
.client-strip {
  width: 100%;
  padding: 4rem 0;
  background: #fff;
  text-align: center;
}

.client-heading {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  color: #111;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-family: 'Arial', sans-serif;
}

.logo-wrapper { overflow: hidden; width: 100%; }

.logo-track {
  display: flex;
  gap: 3rem;
  width: max-content;
  animation: scroll-left 40s linear infinite;
  align-items: center;
  padding-inline: 2rem;
}

.client-logo {
  height: 60px;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: 0.3s ease;
}

.client-logo:hover { filter: grayscale(0%); opacity: 1; transform: scale(1.05); }

/* ── CTA STRIP ───────────────────────────────────────────────── */
.cta-strip {
  width: 100%;
  padding: 5rem 2rem;
  background: #f7f7f7;
  text-align: center;
}

.cta-label {
  font-size: 2.2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 2rem;
  font-family: 'Arial', sans-serif;
}

.cta-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Arial', sans-serif;
  text-decoration: none;
  transition: all 0.25s ease;
  letter-spacing: 0.04em;
}

.cta-outline {
  border: 2px solid #000;
  color: #000;
  background: transparent;
}

.cta-outline:hover { background: #000; color: #fff; }

.cta-solid { background: #000; color: #fff; border: 2px solid #000; }
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
    padding: 3rem 1rem 1rem;
    align-items: center;
    text-align: center;
  }

  .name-header-1 { font-size: 12vw; line-height: 1.1; text-align: center; white-space: normal; }

  .typewriter-row { font-size: 1.1rem; justify-content: center; }

  .role-descriptor { text-align: center; }

  .hero-cta { justify-content: center; }
  .hero-btn { font-size: 0.8rem; padding: 0.7rem 1.6rem; }
    .portfolio-sections { flex-direction: column; height: auto; }
  .section-tile { flex: none; height: 30vh; }
  .section-label { font-size: 1rem; }

  .featured-project {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

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
  .section-tile { height: 25vh; }
  .results-inner { grid-template-columns: 1fr 1fr; gap: 1rem; }
}
</style>