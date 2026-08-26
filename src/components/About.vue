<template>

  <!-- ── HERO ───────────────────────────────────────────────── -->
  <div class="about-hero">
    <div class="about-hero-inner">
      <div class="about-hero-text">
        <span class="about-eyebrow">About</span>
        <h1 class="about-heading">Designer and developer,<br>six years in.</h1>
        <p class="about-lead">
          I'm Raghul, a designer and developer based in Melbourne with full work rights.
          For the last six years I've worked across brand design, UX, and front-end
          development, usually on the same projects rather than sticking to one.
        </p>

        <!-- Quick actions -->
        <div class="about-socials">
          <a
            href="mailto:raghul.attursukumar@gmail.com"
            class="about-social"
            aria-label="Email"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>

          <a
            href="https://instagram.com/raghul.sukumar"
            target="_blank"
            rel="noopener"
            class="about-social"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

          <a
            href="https://linkedin.com/in/raghul-sukumar"
            target="_blank"
            rel="noopener"
            class="about-social"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>

          <a
            href="https://github.com/raghul-attur"
            target="_blank"
            rel="noopener"
            class="about-social"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
        </div>
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
          I started out in Visual Communication, which gave me my foundation in design
          thinking, typography, and brand craft. From there I spent three years at Smitten
          Worldwide as a Senior Graphic Designer, working on campaigns across hospitality,
          retail, and FMCG for brands like JW Marriott, Westin, Funskool, and Mount Sinai.
        </p>
        <p>
          I wanted to understand how products get built end to end, so I went back to study
          a Master of Information Technology at Monash University, finishing in 2025. My final
          project, ReadEase, an accessible reading platform for people with dyslexia, won Best
          Project at the Monash University Expo.
        </p>
        <p>
          The mix is on purpose. I like work that needs both a designer and a developer, where
          I can take something from the first sketch through to a shipped product instead of
          handing it off halfway.
        </p>
        <p>
          Away from work I play tennis, spend too much time at Palace Cinemas, and cook my way
          through my grandmother's recipes. I also shoot street and portrait photography.
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

</template>

<script>
export default {
  name: 'About',

  data() {
    return {
      timelineVisible: true,

      timeline: [
        {
          year: '2017 – 2020',
          role: 'Bachelor of Visual Communication',
          company: 'St. Joseph\'s College, Bengaluru',
          desc: 'Studied design fundamentals, typography, brand identity, and visual storytelling.'
        },
        {
          year: '2017 – 2020',
          role: 'Freelance Designer & Motion Designer',
          company: 'Freelance',
          desc: 'Branding, identity, and motion design for independent clients, plus shooting and editing video.'
        },
        {
          year: '2018 – 2019',
          role: 'Content & Design',
          company: 'Vegan Heat',
          desc: 'Social media content and digital marketing for the brand, alongside design across its channels.'
        },
        {
          year: '2020 – 2022',
          role: 'Graphic Designer',
          company: 'Smitten Worldwide',
          desc: 'Motion and campaign design for 10+ brands including JW Marriott, Westin, Funskool, and Mount Sinai. The Funskool campaign drove 125% engagement growth.'
        },
        {
          year: '2022 – 2023',
          role: 'Senior Digital Designer',
          company: 'Smitten Worldwide',
          desc: 'Moved into web and product design, leading UX and interface work across client digital projects.'
        },
        {
          year: '2023 – 2025',
          role: 'Master of Information Technology',
          company: 'Monash University, Melbourne',
          desc: 'GPA 3.44. Specialised in UX, full-stack development, and AI. ReadEase won Best Project at the 2025 Expo.'
        },
        {
          year: '2024 – Present',
          role: 'Sales & IT Support',
          company: 'JB Hi-Fi, Melbourne',
          desc: 'IT sales and customer service in-store, supporting customers across the tech range.'
        },
      ],
    };
  },

  mounted() {
    this.observeTimeline();
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
  },
};
</script>

<style scoped>

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
  margin: 0;
  font-family: Arial, sans-serif;
  max-width: 480px;
}

/* ── QUICK ACTIONS ───────────────────────────────────────────── */
.about-socials {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
}

.about-social {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #e0e0e0;
  border-radius: 50%;
  color: #888;
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.about-social:hover {
  color: #000;
  border-color: #000;
  transform: translateY(-2px);
}

.about-social svg {
  width: 19px;
  height: 19px;
  display: block;
}

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

/* ── RESPONSIVE ──────────────────────────────────────────────── */
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

  .about-socials { justify-content: center; }

  .about-hero-image { flex: none; width: 60%; height: 35vh; }

  .about-bio-inner { grid-template-columns: 1fr; gap: 1rem; }

  .timeline-item { grid-template-columns: 100px 32px 1fr; }
}

@media (max-width: 480px) {
  .timeline-item { grid-template-columns: 80px 28px 1fr; }
}
</style>