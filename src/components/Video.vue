<template>

  <!-- ── PAGE HEADER ───────────────────────────────────────── -->
  <div class="vd-header">
    <div class="vd-header-inner">
      <span class="vd-eyebrow">Portfolio</span>
      <h1 class="vd-page-title">Video<br>&amp; Motion</h1>
      <p class="vd-page-desc">
        Brand films, campaign edits, animated content, and motion graphics — produced across agency and freelance environments over 6 years.
      </p>
    </div>
    <div class="vd-header-count">{{ videos.length }} Films</div>
  </div>

  <!-- ── POSTER GRID ───────────────────────────────────────── -->
  <transition name="grid-fade">
    <div v-if="activeVideo === null" class="vd-grid">
      <div
        v-for="(video, index) in videos"
        :key="video.id"
        class="vd-poster"
        :class="'vd-poster--' + video.size"
        @click="open(index)"
      >
        <!-- YouTube thumbnail as poster -->
        <div class="vd-poster-img">
          <img
            :src="'https://img.youtube.com/vi/' + video.id + '/maxresdefault.jpg'"
            :alt="video.title"
            loading="lazy"
          />
        </div>

        <!-- Dark film grain overlay -->
        <div class="vd-poster-grain"></div>

        <!-- Info overlay -->
        <div class="vd-poster-overlay">
          <div class="vd-poster-top">
            <span class="vd-poster-cat">{{ video.category }}</span>
            <span class="vd-play-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 2L11 7L3 12V2Z" fill="white"/>
              </svg>
            </span>
          </div>
          <div class="vd-poster-bottom">
            <span class="vd-poster-client">{{ video.client }}</span>
            <h3 class="vd-poster-title">{{ video.title }}</h3>
            <p class="vd-poster-sub">{{ video.subtitle }}</p>
            <span class="vd-poster-cta">Watch Film ↗</span>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- ── LIGHTBOX DETAIL ───────────────────────────────────── -->
  <transition name="detail-fade">
    <div v-if="activeVideo !== null" class="vd-detail">

      <!-- Theatre embed -->
      <div class="vd-theatre">
        <div class="vd-embed-wrap">
          <iframe
            :src="'https://www.youtube.com/embed/' + current.id + '?autoplay=1&rel=0&modestbranding=1'"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Body -->
      <div class="vd-detail-body">

        <button class="vd-back-btn" @click="close">← Back to Films</button>

        <!-- Title block -->
        <div class="vd-title-block">
          <div class="vd-title-left">
            <span class="vd-detail-cat">{{ current.category }}</span>
            <h1 class="vd-detail-title">{{ current.title }}</h1>
            <p class="vd-detail-subtitle">{{ current.subtitle }}</p>
          </div>
        </div>

        <!-- Meta strip -->
        <div class="vd-meta-strip">
          <div class="vd-meta-item">
            <span class="vd-meta-label">Client</span>
            <span class="vd-meta-value">{{ current.client }}</span>
          </div>
          <div class="vd-meta-item">
            <span class="vd-meta-label">Year</span>
            <span class="vd-meta-value">{{ current.year }}</span>
          </div>
          <div class="vd-meta-item">
            <span class="vd-meta-label">Category</span>
            <span class="vd-meta-value">{{ current.category }}</span>
          </div>
          <div class="vd-meta-item" v-if="current.tools">
            <span class="vd-meta-label">Tools</span>
            <span class="vd-meta-value">{{ current.tools }}</span>
          </div>
          <div class="vd-meta-item" v-if="current.deliverables">
            <span class="vd-meta-label">Deliverables</span>
            <span class="vd-meta-value">{{ current.deliverables }}</span>
          </div>
        </div>

        <!-- Case study sections -->
        <div
          v-for="(section, i) in current.sections"
          :key="i"
          class="vd-case-section"
        >
          <div class="vd-section-label">{{ section.label }}</div>
          <div class="vd-section-content" v-html="section.content"></div>
        </div>

        <!-- Nav -->
        <div class="vd-detail-nav">
          <button class="vd-back-btn" @click="close">← All Films</button>
          <button
            v-if="activeVideo < videos.length - 1"
            class="vd-next-btn"
            @click="open(activeVideo + 1)"
          >Next Film →</button>
        </div>

      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Video',

  data() {
    return {
      activeVideo: null,

      videos: [

        // ── VM-01 ─────────────────────────────────────────────
        {
          id: 'LPFtsO1CuVQ',
          title: 'Deloitte — Learning in Motion',
          subtitle: 'Internal instructional motion graphics video for Deloitte employee training',
          client: 'Deloitte',
          year: '2023',
          category: 'Motion Graphics',
          tools: 'Adobe After Effects, Adobe Illustrator',
          deliverables: 'Full-length instructional video, motion graphics system, storyboard',
          size: 'wide',
          sections: [
            {
              label: 'Overview',
              content: '<p>An internal training video commissioned by Deloitte — designed to communicate complex procedural information to employees in a way that was clear, engaging, and unmistakably on-brand. The brief was to create something that felt like Deloitte: precise, professional, and authoritative, without tipping into dry corporate territory.</p><p>Every element was built from scratch — storyboard, illustration, animation, and sound — designed as a cohesive system rather than a sequence of slides with motion applied as an afterthought.</p>'
            },
            {
              label: 'Storyboard',
              content: '<p>The process started with pencil sketches. Before opening After Effects or Illustrator, the entire narrative arc was mapped as rough thumbnail frames — loose, gestural, fast. This forced every scene to justify its existence on story logic before any visual investment was made.</p><p>The decision to use simple geometric shapes as the core visual language came from the storyboard stage. Abstract forms strip away the noise and force the message to carry the weight — which is exactly what instructional content needs.</p>'
            },
            {
              label: 'Design & Motion',
              content: '<p>Deloitte\'s brand system — the green palette, the typographic rigour, the restrained use of colour — became the creative constraint rather than a limitation. Working strictly within the guidelines produced something that felt owned by the brand rather than borrowed from it.</p><p>Motion timing was treated with the same discipline as layout. Easing curves were dialled to feel deliberate and calm — nothing bounces, nothing overshoots. The pacing mirrors how a confident presenter speaks: unhurried, with weight behind each point. Music was selected to complement that tone, sitting underneath the content rather than competing with it.</p>'
            },
          ]
        },

        // ── VM-02 ─────────────────────────────────────────────
        {
          id: '32hKGUPsk7g',
          title: 'ReadEase — Product Launch Film',
          subtitle: 'Explainer and pitch film for the ReadEase accessibility platform',
          client: 'ReadEase (Personal)',
          year: '2025',
          category: 'Brand Film',
          tools: 'Adobe Premiere Pro, After Effects, Pexels Stock Library',
          deliverables: 'Hero launch film, investor pitch video',
          size: 'normal',
          sections: [
            {
              label: 'Overview',
              content: '<p>ReadEase is an accessibility platform built for young Australians with dyslexia — and it needed a film that could do two things simultaneously: introduce the product to first-time users and make a compelling case to investors. The brief was to communicate empathy, utility, and technological credibility without feeling clinical or remedial.</p><p>This film was conceived, edited, and finished as part of the broader ReadEase project — the same platform that won Best Project at the Monash Postgraduate Expo 2025.</p>'
            },
            {
              label: 'Approach',
              content: '<p>The entire film was built from stock footage sourced through Pexels — no original shoot. That constraint pushed the edit to work harder: every clip selection, every cut, every music choice had to carry the emotional and narrative load that original cinematography would normally provide.</p><p>The visual language was deliberately contemporary and inclusive — diverse subjects, natural light, real environments. The goal was a film that felt close to life rather than polished into abstraction. Technology is woven into the narrative as a bridge, not a spectacle: the product solves something real, and the film needed to make that felt before it made it understood.</p>'
            },
          ]
        },

        // ── VM-03 ─────────────────────────────────────────────
        {
          id: 'KKN9RsGv2YY',
          title: 'I\'m Here',
          subtitle: 'A personal travel film shot across 10 cities on an iPhone 15',
          client: 'Personal',
          year: '2024',
          category: 'Personal Film',
          tools: 'iPhone 15, Adobe Premiere Pro',
          deliverables: 'Short film',
          size: 'wide',
          sections: [
            {
              label: 'Overview',
              content: '<p>Melbourne. Singapore. Bangalore. Salem. Coimbatore. Dubai. Seattle. Portland. Los Angeles. Melbourne again.</p><p>Ten cities. One question underneath all of it: where do I fit? This film is the attempt to answer that — not with narration or text, but with the frames themselves. Shot entirely on an iPhone 15, deliberately forgoing the Sony Alpha a6400 that usually comes along for the ride.</p>'
            },
            {
              label: 'The Constraint',
              content: '<p>Shooting on a phone was a creative decision, not a compromise. The iPhone forces a different relationship with what you\'re filming — it\'s less deliberate, more instinctive. You shoot what you feel rather than what you\'ve set up. For a film about searching and presence, that felt right.</p><p>There is no colour grade. The footage is exactly as the camera rendered it — natural, unmanipulated, sometimes flat, sometimes overexposed. The imperfections are the point. This is what those places actually looked like. This is what it actually felt like to be there.</p>'
            },
            {
              label: 'The Idea',
              content: '<p>The search for belonging across continents only to arrive back where you started — and realise the answer was never geographic. <em>I\'m Here</em> is what the title says it is: a declaration made after a long look around. Not a discovery of place, but of self.</p>'
            },
          ]
        },

        // ── VM-04 ─────────────────────────────────────────────
        {
          id: 'IxPqinGQR8o',
          title: 'pH Projecct — pHact or pHiction',
          subtitle: 'Launch campaign film for pH Projecct\'s debut summer collection',
          client: 'pH Projecct (Freelance)',
          year: '2022',
          category: 'Campaign Edit',
          tools: 'Adobe Premiere Pro, After Effects',
          deliverables: 'Campaign launch film, social cutdowns',
          size: 'normal',
          sections: [
            {
              label: 'Overview',
              content: '<p>pH Projecct is a high-fashion label built on the tension between opposites — and their launch campaign needed a film that lived in that same space. pHact or pHiction introduced both the brand and its debut summer collection to the world: fast, loud, and unapologetically confident.</p><p>This was a full-service production — shot, edited, and colour graded from the ground up. No agency brief, no committee. Just a shared vision between a designer, a collection, and a camera.</p>'
            },
            {
              label: 'Direction',
              content: '<p>The energy brief was simple: fun, fast, and full of colour. A fashion launch film needs to make people feel something in the first three seconds or it\'s already lost. The edit was built around that — quick cuts timed to the music, colour that pops off the screen, movement that never sits still long enough to feel posed.</p><p>The colour grade pushed the summer palette hard — warm, saturated, alive. Every creative decision reinforced the same message: this brand has arrived and it knows exactly what it is.</p>'
            },
          ]
        },

        // ── VM-05 ─────────────────────────────────────────────
        {
          id: '2S42BNMtn1M',
          title: 'Moments',
          subtitle: 'A personal film — frames from life during the 2020 lockdowns',
          client: 'Personal',
          year: '2020',
          category: 'Personal Film',
          tools: 'Adobe Premiere Pro',
          deliverables: 'Short film',
          size: 'normal',
          sections: [
            {
              label: 'Overview',
              content: '<p>2020 gave everyone too much time and nowhere to put it. This film is what came out of that — a collection of moments shot during the Covid lockdowns. Not a document of the pandemic, not a statement. Just frames from a life that had gone very quiet.</p><p>Everything was shot personally. Nothing was planned. The camera came out when something felt worth keeping.</p>'
            },
            {
              label: 'Tone',
              content: '<p>The visual language mirrors the mental landscape of that period: grainy, moody, a little underexposed. Shots that sit in silence. The editing doesn\'t rush — it lets frames breathe in a way that felt honest to what those days actually felt like.</p><p>But the music holds something the images don\'t always show. There\'s hope underneath it. The film doesn\'t end in darkness — it ends in the quiet conviction that this, too, passes. <em>Moments</em> is both a record of what was hard and a reminder that it was still a life worth filming.</p>'
            },
          ]
        },

        // ── VM-06 ─────────────────────────────────────────────
        {
          id: 'Sc5d1SZilLs',
          title: 'XO — Shaq-T ft. Da$a',
          subtitle: 'No-budget music video shot, edited, and graded for independent hip-hop artists',
          client: 'Shaq-T & Da$a (Freelance)',
          year: '2020',
          category: 'Music Video',
          tools: 'Adobe Premiere Pro, After Effects',
          deliverables: 'Full music video, colour grade, visual effects',
          size: 'wide',
          sections: [
            {
              label: 'Overview',
              content: '<p>XO is a music video for independent Indian hip-hop artists Shaq-T and Da$a — shot, edited, colour graded, and finished with essentially no budget and a whole lot of problem-solving. The visual concept drew direct inspiration from ASAP Rocky\'s Forever video: a single rotating shot as the centrepiece, built around the artists rather than around resources.</p><p>This is one of the most technically and creatively satisfying projects in the portfolio — a reminder that constraints are just invitations to get inventive.</p>'
            },
            {
              label: 'The Rig',
              content: '<p>The rotating shot that anchors the video required equipment that didn\'t exist in the budget. So it was built. A custom camera rig, constructed specifically for this shoot, made the signature visual possible without a single rental invoice. The process of designing and building it was half the creative work of the project.</p><p>That\'s the thing about no-budget filmmaking done right — the limitations stop being limitations and start being the film\'s DNA. The constraints of XO are visible in the best possible way: the video looks like it could only have been made the way it was made.</p>'
            },
            {
              label: 'Post-Production',
              content: '<p>The colour grade pushed the footage into a filmic, high-contrast register that gave the video visual weight beyond its production scale. Effects were applied with restraint — used to reinforce moments rather than compensate for them. The final cut moves with the music rather than illustrating it, letting the artists carry the performance while the edit amplifies the energy.</p>'
            },
          ]
        },

      ],
    };
  },

  computed: {
    current() {
      return this.activeVideo !== null ? this.videos[this.activeVideo] : null;
    }
  },

  methods: {
    open(index) {
      this.activeVideo = index;
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },
    close() {
      this.activeVideo = null;
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },
  }
};
</script>

<style scoped>

/* ── PAGE HEADER ─────────────────────────────────────────────── */
.vd-header {
  width: 100%;
  padding: 8rem 6vw 4rem;
  background: #0a0a0a;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #1e1e1e;
  margin-top: 70px;
}

.vd-eyebrow {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #444;
  font-family: Arial, sans-serif;
  margin-bottom: 1rem;
}

.vd-page-title {
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 900;
  line-height: 0.9;
  color: #fff;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem 0;
  font-family: Arial, sans-serif;
}

.vd-page-desc {
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: #666;
  line-height: 1.7;
  max-width: 460px;
  font-family: Arial, sans-serif;
  margin: 0;
}

.vd-header-count {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #333;
  font-family: Arial, sans-serif;
  padding-bottom: 0.5rem;
}

/* ── POSTER GRID ─────────────────────────────────────────────── */
.vd-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 280px;
  gap: 3px;
  padding: 3px;
  background: #060606;
}

.vd-poster--wide   { grid-column: span 2; }
.vd-poster--normal { grid-column: span 1; }

.vd-poster {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #111;
}

/* YouTube thumbnail */
.vd-poster-img {
  position: absolute;
  inset: 0;
}

.vd-poster-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.55) saturate(0.8);
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              filter 0.5s ease;
}

.vd-poster:hover .vd-poster-img img {
  transform: scale(1.06);
  filter: brightness(0.35) saturate(0.6);
}

/* Film grain overlay */
.vd-poster-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
}

/* Info overlay */
.vd-poster-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2rem 1.4rem;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.0) 0%,
    rgba(0,0,0,0.0) 35%,
    rgba(0,0,0,0.85) 100%
  );
  transition: background 0.35s ease;
}

.vd-poster:hover .vd-poster-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.3) 0%,
    rgba(0,0,0,0.95) 100%
  );
}

/* Top row */
.vd-poster-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.vd-poster-cat {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-family: Arial, sans-serif;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.vd-poster:hover .vd-poster-cat { opacity: 1; }

.vd-play-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.2s ease;
}

.vd-poster:hover .vd-play-icon {
  opacity: 1;
  transform: scale(1);
  border-color: rgba(255,255,255,0.7);
}

/* Bottom row */
.vd-poster-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.vd-poster-client {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-family: Arial, sans-serif;
}

.vd-poster-title {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-family: Arial, sans-serif;
}

.vd-poster-sub {
  font-size: 0.76rem;
  color: rgba(255,255,255,0.5);
  margin: 0.2rem 0 0.4rem;
  line-height: 1.4;
  font-family: Arial, sans-serif;
  max-width: 280px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
}

.vd-poster:hover .vd-poster-sub {
  opacity: 1;
  transform: translateY(0);
}

.vd-poster-cta {
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  font-family: Arial, sans-serif;
  letter-spacing: 0.06em;
  opacity: 0;
  transition: opacity 0.3s ease 0.1s;
  width: fit-content;
}

.vd-poster:hover .vd-poster-cta { opacity: 1; }

/* ── DETAIL ──────────────────────────────────────────────────── */
.vd-detail {
  width: 100%;
  background: #0a0a0a;
  min-height: 100vh;
}

/* Theatre embed — full-bleed dark */
.vd-theatre {
  width: 100%;
  background: #000;
  padding: 4rem 0 0;
  margin-top: 70px;
}

.vd-embed-wrap {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  background: #000;
}

.vd-embed-wrap iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: none;
}

/* Detail body */
.vd-detail-body {
  max-width: 960px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.vd-back-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  color: #555;
  letter-spacing: 0.06em;
  font-family: Arial, sans-serif;
  padding: 0;
  margin-bottom: 3rem;
  transition: color 0.2s;
}

.vd-back-btn:hover { color: #fff; }

/* Title block */
.vd-title-block {
  margin-bottom: 3rem;
}

.vd-detail-cat {
  display: block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #444;
  font-family: Arial, sans-serif;
  margin-bottom: 0.8rem;
}

.vd-detail-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  color: #fff;
  margin: 0 0 0.75rem 0;
  line-height: 1;
  letter-spacing: -0.03em;
  font-family: Arial, sans-serif;
}

.vd-detail-subtitle {
  font-size: clamp(0.9rem, 1.3vw, 1.05rem);
  color: #555;
  line-height: 1.65;
  margin: 0;
  max-width: 560px;
  font-family: Arial, sans-serif;
}

/* Meta strip */
.vd-meta-strip {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  padding: 2rem 0;
  border-top: 1px solid #1e1e1e;
  border-bottom: 1px solid #1e1e1e;
  margin-bottom: 4rem;
}

.vd-meta-item { display: flex; flex-direction: column; gap: 0.3rem; }

.vd-meta-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #333;
  font-family: Arial, sans-serif;
}

.vd-meta-value {
  font-size: 0.88rem;
  font-weight: 600;
  color: #ccc;
  font-family: Arial, sans-serif;
  max-width: 220px;
  line-height: 1.4;
}

/* Case sections */
.vd-case-section {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 2rem;
  align-items: start;
  margin-bottom: 3.5rem;
}

.vd-section-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #333;
  font-family: Arial, sans-serif;
  padding-top: 0.3rem;
  position: sticky;
  top: 100px;
}

.vd-section-content {
  font-size: 1rem;
  color: #888;
  line-height: 1.85;
  font-family: Arial, sans-serif;
}

.vd-section-content p { margin: 0 0 1.1rem 0; }
.vd-section-content p:last-child { margin: 0; }
.vd-section-content strong { color: #ddd; font-weight: 700; }

/* Nav */
.vd-detail-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;
  border-top: 1px solid #1e1e1e;
  margin-top: 2rem;
}

.vd-next-btn {
  background: #fff;
  color: #000;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  font-family: Arial, sans-serif;
  padding: 0.85rem 2rem;
  border-radius: 999px;
  transition: background 0.2s ease, color 0.2s ease;
}

.vd-next-btn:hover {
  background: #e0e0e0;
}

/* ── TRANSITIONS ─────────────────────────────────────────────── */
.grid-fade-enter-active,
.grid-fade-leave-active  { transition: opacity 0.3s ease; }
.grid-fade-enter-from,
.grid-fade-leave-to      { opacity: 0; }

.detail-fade-enter-active,
.detail-fade-leave-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.detail-fade-enter-from,
.detail-fade-leave-to     { opacity: 0; transform: translateY(10px); }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .vd-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 240px;
  }
}

@media (max-width: 768px) {
  .vd-header {
    padding: 6rem 1.5rem 3rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .vd-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
    gap: 2px;
    padding: 2px;
  }

  .vd-poster--wide { grid-column: span 2; }

  /* Always show overlay on mobile */
  .vd-poster-cat,
  .vd-play-icon,
  .vd-poster-sub,
  .vd-poster-cta { opacity: 1; transform: none; }

  .vd-theatre { padding: 3rem 0 0; }

  .vd-embed-wrap { max-width: 100%; }

  .vd-detail-body { padding: 2rem 1.5rem 4rem; }

  .vd-case-section {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }

  .vd-section-label { position: static; }

  .vd-meta-strip { gap: 1.5rem; }

  .vd-detail-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .vd-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 220px;
  }
  .vd-poster--wide { grid-column: 1; }
}
</style>