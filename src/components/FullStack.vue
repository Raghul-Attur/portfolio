<template>

  <!-- ── PAGE HEADER ───────────────────────────────────────── -->
  <div class="dev-header">
    <div class="dev-header-inner">
      <span class="dev-eyebrow">Portfolio</span>
      <h1 class="dev-page-title">Full Stack<br>Development</h1>
      <p class="dev-page-desc">
        Web applications, serverless systems, and accessible digital products, built across Vue.js, React, AWS, and Firebase.
      </p>
    </div>
    <div class="dev-header-count">{{ projects.length }} Projects</div>
  </div>

  <!-- ── TERMINAL ──────────────────────────────────────────── -->
  <div class="dev-terminal">

    <!-- Terminal chrome bar -->
    <div class="dev-terminal-bar">
      <div class="dev-terminal-dots">
        <span class="dev-tdot dev-tdot--red"></span>
        <span class="dev-tdot dev-tdot--yellow"></span>
        <span class="dev-tdot dev-tdot--green"></span>
      </div>
      <span class="dev-terminal-title">raghul@portfolio: ~/projects</span>
      <span class="dev-terminal-count">{{ projects.length }} entries</span>
    </div>

    <!-- Terminal body -->
    <div class="dev-terminal-body">

      <!-- Intro line -->
      <div class="dev-line dev-line--intro">
        <span class="dev-prompt">$</span>
        <span class="dev-cmd">ls -la ./projects</span>
        <span class="dev-cursor dev-cursor--blink"></span>
      </div>

      <!-- Column header -->
      <div class="dev-line dev-line--header">
        <span class="dev-th dev-th--id">ID</span>
        <span class="dev-th dev-th--name">NAME</span>
        <span class="dev-th dev-th--type">TYPE</span>
        <span class="dev-th dev-th--domain">DOMAIN</span>
        <span class="dev-th dev-th--stack">STACK</span>
        <span class="dev-th dev-th--status">STATUS</span>
        <span class="dev-th dev-th--action"></span>
      </div>

      <!-- Project rows -->
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="dev-entry-wrap"
        :class="{ 'dev-entry-wrap--open': activeIndex === index }"
      >
        <!-- Row -->
        <div
          class="dev-line dev-line--entry"
          :class="{ 'dev-line--active': activeIndex === index }"
          @click="toggle(index)"
        >
          <span class="dev-prompt dev-prompt--dim">›</span>
          <span class="dev-th dev-th--id">
            <code class="dev-id">{{ project.id }}</code>
          </span>
          <span class="dev-th dev-th--name">
            <span class="dev-entry-name">{{ project.title }}</span>
          </span>
          <span class="dev-th dev-th--type">
            <span class="dev-badge">{{ project.type }}</span>
          </span>
          <span class="dev-th dev-th--domain">
            <span class="dev-muted">{{ project.domain }}</span>
          </span>
          <span class="dev-th dev-th--stack dev-stack-preview">
            <code v-for="(t, i) in project.techstack.slice(0, 2)" :key="i" class="dev-stack-chip">{{ t }}</code>
            <span v-if="project.techstack.length > 2" class="dev-muted"> +{{ project.techstack.length - 2 }}</span>
          </span>
          <span class="dev-th dev-th--status">
            <span class="dev-status" :class="'dev-status--' + project.status">
              <span class="dev-status-dot"></span>{{ project.statusLabel }}
            </span>
          </span>
          <span class="dev-th dev-th--action">
            <span class="dev-expand-btn" :class="{ open: activeIndex === index }">
              {{ activeIndex === index ? '[ - ]' : '[ + ]' }}
            </span>
          </span>
        </div>

        <!-- Expanded panel -->
        <transition name="terminal-expand">
          <div v-if="activeIndex === index" class="dev-panel">

            <!-- Panel prompt line -->
            <div class="dev-panel-prompt">
              <span class="dev-prompt">$</span>
              <span class="dev-cmd">cat ./{{ project.id.toLowerCase() }}/README.md</span>
            </div>

            <!-- Panel content -->
            <div class="dev-panel-inner">

              <!-- Left: screenshot -->
              <div class="dev-panel-screen">
                <div class="dev-screen-chrome">
                  <div class="dev-screen-chromebar">
                    <div class="dev-screen-dots-row">
                      <span class="dev-sdot dev-sdot--r"></span>
                      <span class="dev-sdot dev-sdot--y"></span>
                      <span class="dev-sdot dev-sdot--g"></span>
                    </div>
                    <span class="dev-screen-url">{{ project.website || project.github }}</span>
                  </div>
                  <div class="dev-screen-img-wrap">
                    <transition name="screen-fade" mode="out-in">
                      <img
                        :key="screenshotIndex"
                        :src="project.screenshots[screenshotIndex] || project.screenshots[0]"
                        :alt="project.title"
                        class="dev-screen-img"
                        loading="lazy"
                      />
                    </transition>
                  </div>
                </div>
                <div v-if="project.screenshots.length > 1" class="dev-screen-nav">
                  <span
                    v-for="(s, i) in project.screenshots"
                    :key="i"
                    class="dev-screen-navdot"
                    :class="{ active: screenshotIndex === i }"
                    @click.stop="screenshotIndex = i"
                  ></span>
                </div>
              </div>

              <!-- Right: info -->
              <div class="dev-panel-info">

                <div class="dev-panel-block">
                  <div class="dev-panel-key">// tech_stack</div>
                  <div class="dev-chips">
                    <code
                      v-for="(tech, i) in project.techstack"
                      :key="i"
                      class="dev-chip"
                      :style="{ animationDelay: i * 35 + 'ms' }"
                    >{{ tech }}</code>
                  </div>
                </div>

                <div class="dev-panel-block">
                  <div class="dev-panel-key">// about</div>
                  <p class="dev-panel-text">{{ project.description }}</p>
                </div>

                <div class="dev-panel-block">
                  <div class="dev-panel-key">// my_role</div>
                  <p class="dev-panel-text">{{ project.role }}</p>
                </div>

                <div class="dev-panel-block">
                  <div class="dev-panel-key">// links</div>
                  <div class="dev-panel-links">
                    <a :href="project.github" target="_blank" class="dev-link">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <a v-if="project.website" :href="project.website" target="_blank" class="dev-link dev-link--green">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                      Visit Site
                    </a>
                  </div>
                </div>

              </div>
            </div>

            <!-- Close line -->
            <div class="dev-panel-close" @click="toggle(index)">
              <span class="dev-prompt">$</span>
              <span class="dev-cmd dev-cmd--dim">exit</span>
              <span class="dev-close-btn">[ close ]</span>
            </div>

          </div>
        </transition>
      </div>

      <!-- Footer line -->
      <div class="dev-line dev-line--footer">
        <span class="dev-prompt">$</span>
        <span class="dev-muted">{{ projects.length }} projects listed.</span>
        <span class="dev-cursor dev-cursor--blink"></span>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: 'Dev',

  data() {
    return {
      activeIndex: null,
      screenshotIndex: 0,

      projects: [
        {
          id: 'FS-01',
          title: 'ReadEase',
          type: 'FULL STACK',
          domain: 'ACCESSIBILITY',
          status: 'live',
          statusLabel: 'LIVE',
          description: 'A full-stack accessibility platform designed for young Australians with dyslexia. Combines an OCR document reader, AI text summariser, phonetic word cards, gamified spelling games, and an awareness section with school map and AIHW data visualisations. Won Best Project at the Monash University Postgraduate Industry Experience Expo 2025.',
          role: 'Vue.js frontend lead across all three iterations. Responsible for component architecture, accessibility panel, OCR reader interface, word learning UI, gamified spelling flow, colour theme system, and full WCAG 2.1 AA compliance across all interactive components. Co-designed Figma prototypes with one fellow designer.',
          github: 'https://github.com/ratt0008/readease.git',
          website: 'https://www.readease.me',
          screenshots: ['/dev/ReadEase1.png', '/dev/ReadEase2.png', '/dev/ReadEase3.png'],
          techstack: ['Vue.js 3', 'Bootstrap 5', 'AWS Lambda', 'Amazon RDS', 'MySQL', 'Amazon S3', 'Google Document AI', 'OpenAI API', 'AWS Amplify', 'Vite', 'Figma'],
        },
        {
          id: 'FS-02',
          title: 'CultureWell',
          type: 'FULL STACK',
          domain: 'HEALTH & CHARITY',
          status: 'live',
          statusLabel: 'LIVE',
          description: 'A community health platform built to support Indigenous health causes, connecting volunteers, researchers, and communities through role-based access control, secure authentication, dynamic user dashboards, and a live rating system for community resources.',
          role: 'Frontend and UI development. Implemented login authentication and role-based views using Firebase, secured input validation, built the dynamic rating mechanism, and designed the component layout and user flows for each role type.',
          github: 'https://github.com/ratt0008/raghul-fit5032.git',
          website: 'https://culturewell.netlify.app',
          screenshots: ['/dev/CultureWell1.png', '/dev/CultureWell2.png', '/dev/CultureWell3.png'],
          techstack: ['Vue.js', 'Bootstrap', 'Node.js', 'Firebase', 'MySQL', 'Netlify'],
        },
        {
          id: 'FS-03',
          title: 'PixTag',
          type: 'SERVERLESS',
          domain: 'IMAGE INTELLIGENCE',
          status: 'archived',
          statusLabel: 'ARCHIVED',
          description: 'A serverless image tagging and retrieval system built entirely on AWS. Users upload images which are processed for object detection, automatically tagged, and made searchable. Designed as a scalable, fully cloud-native application with no traditional backend server.',
          role: 'Built the full React frontend, integrated AWS Cognito for secure user authentication, implemented the S3 upload pipeline with thumbnail generation, and connected the DynamoDB tag retrieval system to the UI for live tag-based search and filter.',
          github: 'https://github.com/Shivasuryan/FIT5225-ass3-group41.git',
          website: '',
          screenshots: ['/dev/PixTag1.png'],
          techstack: ['React', 'AWS S3', 'AWS Cognito', 'DynamoDB', 'AWS Lambda', 'API Gateway'],
        },
        {
        id: 'FS-04',
        title: 'AusHealth Dashboard',
        type: 'FULL STACK',
        domain: 'HEALTH INTELLIGENCE',
        status: 'live',
        statusLabel: 'LIVE',
        description: 'Executive intelligence dashboard for Australian private health insurance, built for a Bupa pitch. Real APRA quarterly data, AI-powered natural language search via Claude API, competitor analysis (Bupa vs Medibank), dynamic board-ready headlines, and a quarterly briefing drawer that generates narrative automatically. Charts include a Sankey revenue flow, D3 choropleth Australia map with 3D perspective, Visx layered area chart with Quarterly/TTM/YoY toggle, and a radar chart. Annotation system lets board members flag KPIs with notes and @mentions. Fully responsive.',
        role: 'Solo across the entire product. Data architecture, Next.js 15 App Router server components, Tailwind v4 design system, D3 and Nivo chart implementations, Claude AI search API, annotation system, responsive layout, Vercel deployment.',
        github: 'https://github.com/Raghul-Attur/aushealth-dashboard',
        website: 'https://aushealth-dashboard.vercel.app',
        screenshots: ['public/dev/Aushealth1.png', 'public/dev/AusHealth2.png', 'public/dev/AusHealth3.png'],
        techstack: ['Next.js 15', 'React 18', 'TypeScript', 'Tailwind v4', 'D3.js', 'Nivo', 'Visx', 'Claude AI API', 'Zustand', 'nuqs', 'Framer Motion', 'Vercel'],
      },
      ],
    };
  },

  methods: {
    toggle(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
        this.screenshotIndex = 0;
        this.$nextTick(() => {
          const entries = document.querySelectorAll('.dev-entry-wrap');
          if (entries[index]) {
            setTimeout(() => {
              entries[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 80);
          }
        });
      }
    },
  },
};
</script>

<style scoped>

/* ── PAGE HEADER ─────────────────────────────────────────────── */
.dev-header {
  width: 100%;
  padding: 8rem 6vw 4rem;
  background: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  margin-top: 70px;
}

.dev-eyebrow {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
  margin-bottom: 1rem;
}

.dev-page-title {
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 900;
  line-height: 0.9;
  color: #000;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem 0;
  font-family: Arial, sans-serif;
}

.dev-page-desc {
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: #666;
  line-height: 1.7;
  max-width: 480px;
  font-family: Arial, sans-serif;
  margin: 0;
}

.dev-header-count {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ccc;
  font-family: Arial, sans-serif;
  padding-bottom: 0.5rem;
}

/* ── TERMINAL WRAPPER ────────────────────────────────────────── */
.dev-terminal {
  margin: 3rem 6vw 5rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #2a2a2a;
  background: #0d0d0d;
  box-shadow: 0 24px 80px rgba(0,0,0,0.35);
}

/* ── TERMINAL BAR ────────────────────────────────────────────── */
.dev-terminal-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #1a1a1a;
  border-bottom: 1px solid #2a2a2a;
}

.dev-terminal-dots { display: flex; gap: 6px; flex-shrink: 0; }

.dev-tdot { width: 12px; height: 12px; border-radius: 50%; }
.dev-tdot--red    { background: #ff5f57; }
.dev-tdot--yellow { background: #febc2e; }
.dev-tdot--green  { background: #28c840; }

.dev-terminal-title {
  flex: 1;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  color: #555;
  letter-spacing: 0.04em;
}

.dev-terminal-count {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.65rem;
  color: #444;
}

/* ── TERMINAL BODY ───────────────────────────────────────────── */
.dev-terminal-body { padding: 1.5rem 0; }

/* ── LINE BASE ───────────────────────────────────────────────── */
.dev-line {
  display: flex;
  align-items: center;
  padding: 0.3rem 1.5rem;
  gap: 0.75rem;
  font-family: Arial, sans-serif;
  font-size: 0.8rem;
}

.dev-line--intro {
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #1e1e1e;
  margin-bottom: 0.2rem;
}

.dev-line--header {
  padding: 0.5rem 1.5rem;
  background: #111;
  border-top: 1px solid #1e1e1e;
  border-bottom: 1px solid #1e1e1e;
  gap: 0;
}

.dev-line--entry {
  cursor: pointer;
  gap: 0;
  padding: 0.9rem 1.5rem;
  transition: background 0.15s ease;
  border-bottom: 1px solid #141414;
}

.dev-line--entry:hover { background: #111; }
.dev-line--active { background: #111 !important; }

.dev-line--footer {
  padding-top: 0.8rem;
  border-top: 1px solid #1e1e1e;
  margin-top: 0.2rem;
}

/* ── PROMPT & CMD ────────────────────────────────────────────── */
.dev-prompt {
  color: #22c55e;
  font-weight: 700;
  font-family: 'Courier New', Courier, monospace;
  flex-shrink: 0;
  margin-right: 0.4rem;
  font-size: 0.85rem;
}

.dev-prompt--dim { color: #2a2a2a; }

.dev-cmd { color: #ccc; font-family: 'Courier New', Courier, monospace; font-size: 0.78rem; }
.dev-cmd--dim { color: #666; }

/* ── CURSOR ──────────────────────────────────────────────────── */
.dev-cursor {
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #22c55e;
  margin-left: 4px;
  vertical-align: middle;
}

.dev-cursor--blink { animation: blink 1.1s step-end infinite; }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* ── COLUMN SYSTEM ───────────────────────────────────────────── */
.dev-th {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.dev-th--id     { width: 80px;  flex-shrink: 0; }
.dev-th--name   { flex: 1;      min-width: 120px; padding-right: 1rem; }
.dev-th--type   { width: 110px; flex-shrink: 0; }
.dev-th--domain { width: 160px; flex-shrink: 0; }
.dev-th--stack  { width: 200px; flex-shrink: 0; gap: 4px; flex-wrap: wrap; }
.dev-th--status { width: 100px; flex-shrink: 0; }
.dev-th--action { width: 70px;  flex-shrink: 0; justify-content: flex-end; }

.dev-line--header .dev-th {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #555;
  text-transform: uppercase;
}
.dev-id {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.68rem;
  color: #22c55e;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.dev-entry-name {
  font-family: Arial, sans-serif;
  font-size: 1.15rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dev-badge {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #aaa;
  background: #1e1e1e;
  border: 1px solid #333;
  padding: 0.25rem 0.55rem;
  border-radius: 3px;
  white-space: nowrap;
}

.dev-muted {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.65rem;
  color: #666;
  letter-spacing: 0.04em;
}

.dev-stack-chip {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.6rem;
  color: #888;
  background: #1e1e1e;
  border: 1px solid #333;
  padding: 0.18rem 0.45rem;
  border-radius: 2px;
  white-space: nowrap;
}

/* ── STATUS ──────────────────────────────────────────────────── */
.dev-status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.dev-status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

.dev-status--live { color: #22c55e; }
.dev-status--live .dev-status-dot {
  background: #22c55e;
  animation: pulse 2s ease infinite;
}

.dev-status--archived { color: #333; }
.dev-status--archived .dev-status-dot { background: #2a2a2a; }

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
  50%       { box-shadow: 0 0 0 4px rgba(34,197,94,0); }
}

/* ── EXPAND BUTTON ───────────────────────────────────────────── */
.dev-expand-btn {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.68rem;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s ease;
  letter-spacing: 0.04em;
}

.dev-line--entry:hover .dev-expand-btn { color: #666; }
.dev-expand-btn.open { color: #22c55e; }

/* ── EXPANDED PANEL ──────────────────────────────────────────── */
.dev-panel {
  background: #0a0a0a;
  border-top: 1px solid #1e1e1e;
  border-bottom: 1px solid #1e1e1e;
  padding: 1.5rem;
}

.dev-panel-prompt {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
}

.dev-panel-inner {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2.5rem;
  align-items: start;
}

/* ── SCREENSHOT ──────────────────────────────────────────────── */
.dev-panel-screen {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dev-screen-chrome {
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  background: #111;
}

.dev-screen-chromebar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #161616;
  border-bottom: 1px solid #2a2a2a;
}

.dev-screen-dots-row { display: flex; gap: 5px; flex-shrink: 0; }

.dev-sdot { width: 10px; height: 10px; border-radius: 50%; }
.dev-sdot--r { background: #ff5f57; }
.dev-sdot--y { background: #febc2e; }
.dev-sdot--g { background: #28c840; }

.dev-screen-url {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.65rem;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dev-screen-img-wrap {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #0a0a0a;
}

.dev-screen-img { width: 100%; height: 100%; object-fit: cover; display: block; }

.dev-screen-nav {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.dev-screen-navdot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #2a2a2a;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.dev-screen-navdot.active {
  background: #22c55e;
  transform: scale(1.3);
}

/* ── INFO ────────────────────────────────────────────────────── */
.dev-panel-info { display: flex; flex-direction: column; gap: 1.5rem; }

.dev-panel-block { display: flex; flex-direction: column; gap: 0.5rem; }

.dev-panel-key {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.68rem;
  color: #22c55e;
  letter-spacing: 0.06em;
  font-weight: 700;
  margin-bottom: 0.1rem;
}

.dev-panel-text {
  font-family: Arial, sans-serif;
  font-size: 0.92rem;
  color: #bbb;
  line-height: 1.75;
  margin: 0;
}

/* ── CHIPS ───────────────────────────────────────────────────── */
.dev-chips { display: flex; flex-wrap: wrap; gap: 4px; }

.dev-chip {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.68rem;
  color: #ddd;
  background: #1e1e1e;
  border: 1px solid #333;
  padding: 0.25rem 0.6rem;
  border-radius: 3px;
  letter-spacing: 0.02em;
  animation: chip-in 0.2s ease both;
}

@keyframes chip-in {
  from { opacity: 0; transform: translateY(3px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── LINKS ───────────────────────────────────────────────────── */
.dev-panel-links { display: flex; gap: 0.6rem; flex-wrap: wrap; }

.dev-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #333;
  color: #aaa;
  background: #141414;
  transition: all 0.15s ease;
}

.dev-link:hover { border-color: #666; color: #eee; }

.dev-link--green {
  border-color: #22c55e;
  color: #22c55e;
  background: rgba(34,197,94,0.06);
}

.dev-link--green:hover { background: rgba(34,197,94,0.12); }

/* ── CLOSE LINE ──────────────────────────────────────────────── */
.dev-panel-close {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #1a1a1a;
  cursor: pointer;
}

.dev-close-btn {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.68rem;
  color: #333;
  transition: color 0.15s ease;
  margin-left: 0.5rem;
}

.dev-panel-close:hover .dev-close-btn { color: #777; }

/* ── TRANSITIONS ─────────────────────────────────────────────── */
.terminal-expand-enter-active {
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.terminal-expand-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.terminal-expand-enter-from { opacity: 0; transform: translateY(-6px); }
.terminal-expand-leave-to   { opacity: 0; transform: translateY(-4px); }

.screen-fade-enter-active,
.screen-fade-leave-active { transition: opacity 0.2s ease; }
.screen-fade-enter-from,
.screen-fade-leave-to     { opacity: 0; }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 1100px) {
  .dev-th--domain,
  .dev-th--stack,
  .dev-th--status { display: none; }
  .dev-panel-inner { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .dev-header {
    padding: 6rem 1.5rem 3rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .dev-terminal { margin: 2rem 1.5rem 4rem; border-radius: 8px; }
  .dev-line--entry { padding: 0.8rem 1rem; }

  .dev-th--type,
  .dev-th--domain,
  .dev-th--stack,
  .dev-th--status { display: none; }

  .dev-th--id     { width: 65px; }
  .dev-th--action { width: 55px; }

  .dev-panel { padding: 1rem; }
  .dev-panel-inner { grid-template-columns: 1fr; gap: 1.5rem; }
}
</style>