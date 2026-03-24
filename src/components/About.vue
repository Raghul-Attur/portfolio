<template>

  <!-- ── HERO ───────────────────────────────────────────────── -->
  <div class="about-hero">
    <div class="about-hero-inner">
      <div class="about-hero-text">
        <span class="about-eyebrow">About</span>
        <h1 class="about-heading">Designing things<br>that actually work.</h1>
        <p class="about-lead">
          I'm Raghul — a designer and developer who has spent 6 years figuring out
          how to make brands look great, products feel intuitive, and code that holds together.
          Based in Melbourne. Full work rights.
        </p>
        <a href="/Raghul_Sukumar_Resume.pdf" download class="about-resume-btn">
          Download Resume ↓
        </a>
      </div>
      <div class="about-hero-image">
        <img src="/Raghul_Image.png" alt="Raghul Sukumar" class="about-photo" />
      </div>
    </div>
  </div>

  <!-- ── BIO ────────────────────────────────────────────────── -->
  <div class="about-bio-section">
    <div class="about-bio-inner">
      <div class="about-bio-label">Background</div>
      <div class="about-bio-text">
        <p>
          I started out studying Visual Communication, which gave me a foundation in
          design thinking, typography, and brand craft. From there I spent three years at
          Smitten Worldwide as a Senior Motion Designer, producing campaigns across
          hospitality, retail, and FMCG for brands like JW Marriott, Westin, Funskool,
          and Mount Sinai.
        </p>
        <p>
          Wanting to understand how products are built end-to-end, I went back to study
          a Master of Information Technology at Monash University, graduating in 2025 with
          a GPA of 3.44. My final project, ReadEase — an accessible reading platform for
          people with dyslexia — won Best Project at the Monash University Expo 2025.
        </p>
        <p>
          I work across the full design and development stack. UX research, interface
          design, motion, video, front-end development. I like problems that sit at
          the intersection of all of them.
        </p>
      </div>
    </div>
  </div>

  <!-- ── TIMELINE ───────────────────────────────────────────── -->
  <div class="about-timeline-section">
    <div class="about-section-inner">
      <h2 class="about-section-title">Experience</h2>
      <div class="timeline" ref="timeline">
        <div
          class="timeline-item"
          v-for="(item, i) in timeline"
          :key="i"
          :class="{ visible: timelineVisible }"
          :style="{ transitionDelay: (i * 100) + 'ms' }"
        >
          <div class="timeline-left">
            <div class="timeline-year">{{ item.year }}</div>
          </div>
          <div class="timeline-connector">
            <div class="timeline-dot"></div>
            <div class="timeline-line" v-if="i < timeline.length - 1"></div>
          </div>
          <div class="timeline-right">
            <div class="timeline-role">{{ item.role }}</div>
            <div class="timeline-company">{{ item.company }}</div>
            <div class="timeline-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── VALUES ─────────────────────────────────────────────── -->
  <div class="about-values-section">
    <div class="about-section-inner">
      <h2 class="about-section-title">How I work</h2>
      <div class="values-grid">
        <div class="value-card" v-for="v in values" :key="v.title">
          <div class="value-number">{{ v.number }}</div>
          <h3 class="value-title">{{ v.title }}</h3>
          <p class="value-desc">{{ v.desc }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- ── FUN FACTS ──────────────────────────────────────────── -->
  <div class="about-facts-section">
    <div class="about-section-inner">
      <h2 class="about-section-title">Outside of work</h2>
      <div class="facts-list">
        <div class="fact-item" v-for="fact in facts" :key="fact.label">
          <span class="fact-icon">{{ fact.icon }}</span>
          <div class="fact-text">
            <span class="fact-label">{{ fact.label }}</span>
            <span class="fact-value">{{ fact.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── PHOTOGRAPHY ────────────────────────────────────────── -->
  <div class="about-photo-section" ref="photoSection">
    <div class="about-photo-header">
      <div class="about-photo-header-inner">
        <div class="about-photo-label">Shot on Sony Alpha a6400 &amp; iPhone 15</div>
        <h2 class="about-photo-title">Through the lens</h2>
        <p class="about-photo-desc">Street, portrait, and travel — 10 cities, no colour grading.</p>
      </div>
      <div class="about-photo-hint">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 6l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        hover to lift · click to open
      </div>
    </div>

    <!-- Scatter surface -->
    <div class="photo-scatter" ref="scatter">
      <div
        v-for="(photo, i) in visiblePhotos"
        :key="photo.index"
        class="photo-card"
        :class="{ 'photo-card--active': activePhoto === i, 'photo-card--revealed': photo.revealed }"
        :style="getCardStyle(photo, i)"
        @mouseenter="liftCard(i)"
        @mouseleave="dropCard(i)"
        @click="openLightbox(photo)"
      >
        <div class="photo-card-inner">
          <img
            :src="photo.src"
            :alt="'Photography ' + photo.index"
            class="photo-card-img"
            loading="lazy"
          />
          <div class="photo-card-shadow"></div>
        </div>
      </div>
    </div>

    <!-- Show more -->
    <div class="photo-scatter-footer">
      <button
        v-if="visibleCount < photos.length"
        class="photo-more-btn"
        @click="showMore"
      >
        Show more photos ↓
      </button>
      <span class="photo-count">{{ visibleCount }} of {{ photos.length }}</span>
    </div>
  </div>

  <!-- ── LIGHTBOX ───────────────────────────────────────────── -->
  <transition name="lb-fade">
    <div v-if="lightboxPhoto" class="photo-lightbox" @click.self="closeLightbox">
      <button class="lb-close" @click="closeLightbox">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 3l14 14M17 3L3 17" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="lb-prev" @click.stop="prevPhoto">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 3L6 10l7 7" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="lb-img-wrap">
        <transition name="lb-img" mode="out-in">
          <img
            :key="lightboxIndex"
            :src="lightboxPhoto.src"
            class="lb-img"
            alt=""
          />
        </transition>
      </div>
      <button class="lb-next" @click.stop="nextPhoto">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 3l7 7-7 7" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="lb-counter">{{ lightboxIndex + 1 }} / {{ photos.length }}</div>
    </div>
  </transition>

  <!-- ── CTA ────────────────────────────────────────────────── -->
  <div class="about-cta">
    <h2 class="about-cta-heading">Want to work together?</h2>
    <div class="about-cta-actions">
      <a href="mailto:raghul.attursukumar@gmail.com" class="about-cta-btn about-cta-primary">
        Get in touch
      </a>
      <a href="https://linkedin.com/in/raghul-sukumar" target="_blank" class="about-cta-btn about-cta-secondary">
        LinkedIn →
      </a>
    </div>
  </div>

</template>

<script>
// Seeded random — consistent layout per session, no re-shuffles on re-render
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const INITIAL_COUNT = 18;
const STEP_COUNT    = 12;
const TOTAL_PHOTOS  = 47;

export default {
  name: 'About',

  data() {
    const photos = Array.from({ length: TOTAL_PHOTOS }, (_, i) => ({
      index: i + 1,
      src: `/images/photo/${i + 1}.jpg`,
      // Each card gets stable seeded position/rotation values
      rx: seededRandom(i * 3)      * 80 - 40,   // horizontal offset %  (-40 to +40)
      ry: seededRandom(i * 3 + 1)  * 60 - 30,   // vertical offset %    (-30 to +30)
      rot: seededRandom(i * 3 + 2) * 24 - 12,   // rotation deg         (-12 to +12)
      revealed: false,
    }));

    return {
      timelineVisible: true,
      photos,
      visibleCount: INITIAL_COUNT,
      activePhoto: null,
      liftedCards: new Set(),
      lightboxPhoto: null,
      lightboxIndex: 0,

      timeline: [
        {
          year: '2017 – 2020',
          role: 'Bachelor of Visual Communication',
          company: 'St. Joseph\'s College, Bengaluru',
          desc: 'Studied design fundamentals, typography, brand identity, and visual storytelling.'
        },
        {
          year: '2017 – 2019',
          role: 'Freelance Designer & Videographer',
          company: 'Self-Employed',
          desc: 'Shot and edited music videos, produced social content, and delivered brand identity work for independent clients.'
        },
        {
          year: '2018 – 2019',
          role: 'Creative Lead',
          company: 'Vegan Heat',
          desc: 'Led creative direction for brand and social content across digital channels.'
        },
        {
          year: '2019 – 2020',
          role: 'Creative Producer',
          company: 'Archive',
          desc: 'Produced editorial video and photography for digital distribution.'
        },
        {
          year: '2020 – 2023',
          role: 'Senior Graphic & Motion Designer',
          company: 'Smitten Worldwide',
          desc: 'Led motion and campaign design for 10+ brands including JW Marriott, Westin, Funskool, and Mount Sinai. Funskool campaign drove 125% engagement growth.'
        },
        {
          year: '2023 – 2025',
          role: 'Master of Information Technology',
          company: 'Monash University, Melbourne',
          desc: 'GPA 3.44. Specialised in UX, full-stack development, and AI. ReadEase won Best Project at the 2025 Expo.'
        },
        {
          year: '2023 – Present',
          role: 'UI/UX Designer & Developer',
          company: 'Forser & Freelance',
          desc: 'Redesigned Forser\'s checkout flow, reducing cart abandonment by 70%. Continued freelance design and dev work alongside study.'
        },
      ],

      values: [
        {
          number: '01',
          title: 'Design with purpose',
          desc: 'Every decision should solve something. I push back on decoration that does not serve the person using the product.'
        },
        {
          number: '02',
          title: 'Own it end-to-end',
          desc: 'I am comfortable taking a brief from first sketch through to shipped product. Handoff gaps are where quality gets lost.'
        },
        {
          number: '03',
          title: 'Stay honest',
          desc: 'If something is not working I will say so early. Good feedback loops make better work than polite silence.'
        },
        {
          number: '04',
          title: 'Keep learning',
          desc: 'The tools and platforms change fast. I spend time each week keeping up, not to chase trends but to know what is actually useful.'
        },
      ],

      facts: [
        { icon: '🎾', label: 'Currently playing',  value: 'Tennis — working on my serve'          },
        { icon: '🎬', label: 'Film habit',          value: 'Regular at Palace Cinemas, Melbourne'  },
        { icon: '📷', label: 'Side project',        value: 'Street and portrait photography'       },
        { icon: '🍳', label: 'In the kitchen',      value: 'Recreating my grandma\'s recipes'      },
        { icon: '🎵', label: 'Made this',           value: 'Shot and edited multiple music videos' },
        { icon: '🌏', label: 'From',                value: 'Bengaluru, India — now Melbourne'       },
      ],
    };
  },

  computed: {
    visiblePhotos() {
      return this.photos.slice(0, this.visibleCount);
    },
    scatterHeight() {
      const rows = Math.ceil(this.visibleCount / 6);
      return `${rows * 260 + 60}px`;
    },
  },

  mounted() {
    this.observeTimeline();
    this.observePhotoSection();
    window.addEventListener('keydown', this.handleKeydown);
  },

  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  },

  methods: {
    observeTimeline() {
      this.$nextTick(() => {
        const el = this.$refs.timeline;
        if (!el) { this.timelineVisible = true; return; }
        const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) { this.timelineVisible = true; observer.disconnect(); } },
          { threshold: 0 }
        );
        observer.observe(el);
      });
    },

    observePhotoSection() {
      this.$nextTick(() => {
        const el = this.$refs.photoSection;
        if (!el) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              // Stagger reveal of cards as section comes into view
              this.visiblePhotos.forEach((photo, i) => {
                setTimeout(() => { photo.revealed = true; }, i * 40);
              });
              observer.disconnect();
            }
          },
          { threshold: 0.05 }
        );
        observer.observe(el);
      });
    },

    getCardStyle(photo, i) {
      const isLifted  = this.liftedCards.has(i);
      const isRevealed = photo.revealed;
      const cols  = 6;
      const col   = i % cols;
      const row   = Math.floor(i / cols);
      const baseX = (col / (cols - 1)) * 82 + 4;
      const baseY = row * 250 + 30;

      return {
        left:      `calc(${baseX}% + ${photo.rx * 0.25}px)`,
        top:       `${baseY + photo.ry}px`,
        opacity:   isRevealed ? 1 : 0,
        transform: isLifted
          ? `rotate(${photo.rot * 0.3}deg) translateY(-18px) scale(1.07)`
          : isRevealed
            ? `rotate(${photo.rot}deg)`
            : `rotate(${photo.rot}deg) translateY(20px)`,
        zIndex:    isLifted ? 50 : 10 + (i % 8),
        transition: isLifted
          ? 'transform 0.22s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.22s ease, opacity 0.4s ease'
          : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s ease, opacity 0.4s ease',
        boxShadow: isLifted
          ? '0 28px 60px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.18)'
          : '0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.07)',
      };
    },

    liftCard(i) {
      this.liftedCards = new Set([...this.liftedCards, i]);
      this.activePhoto = i;
    },

    dropCard(i) {
      const next = new Set(this.liftedCards);
      next.delete(i);
      this.liftedCards = next;
      if (this.activePhoto === i) this.activePhoto = null;
    },

    showMore() {
      const prevCount = this.visibleCount;
      this.visibleCount = Math.min(this.visibleCount + STEP_COUNT, this.photos.length);
      // Reveal new cards with stagger
      this.$nextTick(() => {
        this.photos.slice(prevCount, this.visibleCount).forEach((photo, i) => {
          setTimeout(() => { photo.revealed = true; }, i * 40);
        });
      });
    },

    openLightbox(photo) {
      this.lightboxIndex = photo.index - 1;
      this.lightboxPhoto = this.photos[this.lightboxIndex];
      document.body.style.overflow = 'hidden';
    },

    closeLightbox() {
      this.lightboxPhoto = null;
      document.body.style.overflow = '';
    },

    prevPhoto() {
      this.lightboxIndex = (this.lightboxIndex - 1 + this.photos.length) % this.photos.length;
      this.lightboxPhoto = this.photos[this.lightboxIndex];
    },

    nextPhoto() {
      this.lightboxIndex = (this.lightboxIndex + 1) % this.photos.length;
      this.lightboxPhoto = this.photos[this.lightboxIndex];
    },

    handleKeydown(e) {
      if (!this.lightboxPhoto) return;
      if (e.key === 'ArrowRight') this.nextPhoto();
      if (e.key === 'ArrowLeft')  this.prevPhoto();
      if (e.key === 'Escape')     this.closeLightbox();
    },
  },
};
</script>

<style scoped>

/* ── TOKENS ──────────────────────────────────────────────────── */
:root {
  --black:  #0a0a0a;
  --white:  #ffffff;
  --grey:   #666666;
  --light:  #f5f5f5;
  --border: #e8e8e8;
}

/* ── HERO ────────────────────────────────────────────────────── */
.about-hero {
  width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  background: #fff;
  overflow: hidden;
}

.about-hero-inner {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 6vw;
  gap: 4rem;
}

.about-hero-text {
  flex: 0 0 55%;
  padding-bottom: 4rem;
}

.about-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
  margin-bottom: 1.2rem;
}

.about-heading {
  font-size: clamp(2.8rem, 5.5vw, 5.5rem);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: #000;
  margin: 0 0 1.8rem 0;
  font-family: Arial, sans-serif;
}

.about-lead {
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  color: #555;
  line-height: 1.8;
  margin: 0 0 2.5rem 0;
  font-family: Arial, sans-serif;
  max-width: 480px;
}

.about-resume-btn {
  display: inline-block;
  padding: 0.85rem 2rem;
  background: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 999px;
  border: 2px solid #000;
  transition: all 0.25s ease;
}

.about-resume-btn:hover { background: transparent; color: #000; }

.about-hero-image {
  flex: 0 0 38%;
  height: 70vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}

.about-photo {
  width: 100%;
  max-width: 380px;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  mix-blend-mode: multiply;
  filter: contrast(1.04);
  display: block;
}

/* ── SHARED SECTION STYLES ───────────────────────────────────── */
.about-section-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-section-title {
  font-size: 2rem;
  font-weight: 900;
  color: #000;
  margin: 0 0 3rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8e8e8;
  font-family: Arial, sans-serif;
}

/* ── BIO ─────────────────────────────────────────────────────── */
.about-bio-section {
  background: #f7f7f7;
  padding: 6rem 2rem;
}

.about-bio-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 4rem;
  align-items: start;
}

.about-bio-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
  padding-top: 0.4rem;
}

.about-bio-text p {
  font-size: 1.05rem;
  color: #333;
  line-height: 1.85;
  margin: 0 0 1.4rem 0;
  font-family: Arial, sans-serif;
}

.about-bio-text p:last-child { margin-bottom: 0; }

/* ── TIMELINE ────────────────────────────────────────────────── */
.about-timeline-section {
  padding: 6rem 2rem;
  background: #fff;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-item {
  display: grid;
  grid-template-columns: 140px 40px 1fr;
  gap: 0 1rem;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.timeline-item.visible { opacity: 1; transform: translateY(0); }

.timeline-left { padding-top: 0.2rem; text-align: right; }

.timeline-year {
  font-size: 0.72rem;
  font-weight: 700;
  color: #aaa;
  letter-spacing: 0.08em;
  font-family: Arial, sans-serif;
  white-space: nowrap;
}

.timeline-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #000;
  flex-shrink: 0;
  margin-top: 0.25rem;
  z-index: 1;
}

.timeline-line {
  width: 1px;
  flex: 1;
  background: #e0e0e0;
  min-height: 3rem;
}

.timeline-right { padding-bottom: 3rem; }

.timeline-role {
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  font-family: Arial, sans-serif;
  line-height: 1.3;
}

.timeline-company {
  font-size: 0.82rem;
  font-weight: 600;
  color: #aaa;
  margin: 0.25rem 0 0.6rem;
  font-family: Arial, sans-serif;
  letter-spacing: 0.04em;
}

.timeline-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.7;
  font-family: Arial, sans-serif;
}

/* ── VALUES ──────────────────────────────────────────────────── */
.about-values-section {
  padding: 6rem 2rem;
  background: #000;
}

.about-values-section .about-section-title {
  color: #fff;
  border-bottom-color: #333;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.value-card {
  padding: 2rem 0;
  border-top: 1px solid #333;
}

.value-number {
  font-size: 0.72rem;
  font-weight: 700;
  color: #555;
  letter-spacing: 0.12em;
  font-family: Arial, sans-serif;
  margin-bottom: 1rem;
}

.value-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.8rem 0;
  font-family: Arial, sans-serif;
  line-height: 1.3;
}

.value-desc {
  font-size: 0.88rem;
  color: #888;
  line-height: 1.75;
  margin: 0;
  font-family: Arial, sans-serif;
}

/* ── FUN FACTS ───────────────────────────────────────────────── */
.about-facts-section {
  padding: 6rem 2rem;
  background: #f7f7f7;
}

.facts-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.fact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #fff;
  border: 1.5px solid #e8e8e8;
  border-radius: 14px;
  padding: 1.4rem 1.6rem;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.fact-item:hover { border-color: #000; transform: translateY(-2px); }

.fact-icon { font-size: 1.6rem; flex-shrink: 0; margin-top: 0.1rem; }

.fact-text { display: flex; flex-direction: column; gap: 0.25rem; }

.fact-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
}

.fact-value {
  font-size: 0.92rem;
  font-weight: 600;
  color: #111;
  font-family: Arial, sans-serif;
  line-height: 1.4;
}

/* ── PHOTOGRAPHY SECTION ─────────────────────────────────────── */
.about-photo-section {
  background: #fff;
  padding: 6rem 0 4rem;
  overflow: hidden;
}

.about-photo-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 6vw 3rem;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 3rem;
}

.about-photo-header-inner { display: flex; flex-direction: column; gap: 0.5rem; }

.about-photo-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
}

.about-photo-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  color: #000;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.02em;
  font-family: Arial, sans-serif;
}

.about-photo-desc {
  font-size: 0.95rem;
  color: #888;
  margin: 0;
  font-family: Arial, sans-serif;
}

.about-photo-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #bbb;
  font-family: Arial, sans-serif;
  text-transform: uppercase;
}

/* ── SCATTER SURFACE ─────────────────────────────────────────── */
.photo-scatter {
  position: relative;
  width: 100%;
  min-height: v-bind(scatterHeight);
  padding: 1rem 4vw 2rem;
}

.photo-card {
  position: absolute;
  width: clamp(160px, 15vw, 220px);
  cursor: pointer;
}

.photo-card--revealed {
  /* reveal handled via inline style, class kept for potential future use */
}

.photo-card-inner {
  position: relative;
  background: #fff;
  padding: 8px 8px 28px;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
}

.photo-card-img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
  border-radius: 1px;
}

/* Slight vignette at bottom of photo */
.photo-card-shadow {
  position: absolute;
  bottom: 28px;
  left: 8px;
  right: 8px;
  height: 30%;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.04));
  pointer-events: none;
  border-radius: 0 0 1px 1px;
}

/* ── SCATTER FOOTER ──────────────────────────────────────────── */
.photo-scatter-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 6vw 1rem;
  border-top: 1px solid #e8e8e8;
  margin-top: 2rem;
}

.photo-more-btn {
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  font-family: Arial, sans-serif;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  transition: background 0.2s ease;
}

.photo-more-btn:hover { background: #333; }

.photo-count {
  font-size: 0.72rem;
  font-weight: 600;
  color: #ccc;
  letter-spacing: 0.1em;
  font-family: Arial, sans-serif;
  text-transform: uppercase;
}

/* ── LIGHTBOX ────────────────────────────────────────────────── */
.photo-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.94);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-img-wrap {
  max-width: 90vw;
  max-height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lb-img {
  max-width: 90vw;
  max-height: 88vh;
  object-fit: contain;
  border-radius: 2px;
  display: block;
}

.lb-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255,255,255,0.08);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.lb-close:hover { background: rgba(255,255,255,0.16); }

.lb-prev,
.lb-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.08);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.lb-prev { left: 1.5rem; }
.lb-next { right: 1.5rem; }
.lb-prev:hover,
.lb-next:hover { background: rgba(255,255,255,0.18); }

.lb-counter {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.4);
  font-family: Arial, sans-serif;
}

/* Lightbox transitions */
.lb-fade-enter-active,
.lb-fade-leave-active { transition: opacity 0.25s ease; }
.lb-fade-enter-from,
.lb-fade-leave-to     { opacity: 0; }

.lb-img-enter-active,
.lb-img-leave-active { transition: opacity 0.18s ease; }
.lb-img-enter-from,
.lb-img-leave-to     { opacity: 0; }

/* ── CTA ─────────────────────────────────────────────────────── */
.about-cta {
  padding: 6rem 2rem;
  background: #fff;
  text-align: center;
}

.about-cta-heading {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  color: #000;
  margin: 0 0 2.5rem 0;
  font-family: Arial, sans-serif;
}

.about-cta-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.about-cta-btn {
  display: inline-block;
  padding: 0.9rem 2.4rem;
  border-radius: 999px;
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.25s ease;
}

.about-cta-primary  { background: #000; color: #fff; border: 2px solid #000; }
.about-cta-primary:hover  { background: transparent; color: #000; }
.about-cta-secondary { background: transparent; color: #000; border: 2px solid #000; }
.about-cta-secondary:hover { background: #000; color: #fff; }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 900px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .about-hero-inner {
    flex-direction: column-reverse;
    align-items: center;
    padding: 1.5rem;
    gap: 0;
  }

  .about-hero-text {
    flex: none;
    width: 100%;
    padding-bottom: 2rem;
    text-align: center;
  }

  .about-lead { max-width: 100%; }
  .about-resume-btn { margin: 0 auto; }

  .about-hero-image { flex: none; width: 60%; height: 35vh; }

  .about-bio-inner { grid-template-columns: 1fr; gap: 1rem; }

  .timeline-item { grid-template-columns: 100px 32px 1fr; }

  .values-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }

  .facts-list { grid-template-columns: 1fr 1fr; }

  .about-photo-header { flex-direction: column; align-items: flex-start; gap: 1rem; }

  .photo-card { width: clamp(120px, 40vw, 180px); }

  .lb-prev { left: 0.5rem; }
  .lb-next { right: 0.5rem; }
}

@media (max-width: 480px) {
  .facts-list { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: 1fr; }
  .timeline-item { grid-template-columns: 80px 28px 1fr; }
  .photo-card { width: clamp(110px, 38vw, 160px); }
}
</style>