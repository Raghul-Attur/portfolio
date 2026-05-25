<template>
    <div class="ux-detail">
  
      <div class="ux-detail-hero">
        <img src="/images/ux/aushealth-hero.png" alt="AusHealth Dashboard" loading="lazy" />
        <div class="ux-detail-hero-overlay">
          <div class="ux-detail-hero-inner">
            <div class="ux-detail-hero-tags">
              <span class="ux-tag ux-tag--light">Product Design</span>
              <span class="ux-tag ux-tag--light">Data Visualisation</span>
              <span class="ux-tag ux-tag--light">AI</span>
              <span class="ux-tag ux-tag--light">Full Stack</span>
            </div>
            <h1 class="ux-detail-title">AusHealth Dashboard</h1>
            <p class="ux-detail-subtitle">Executive intelligence platform for Australian private health insurance. Built for a Bupa pitch. Designed to make Power BI obsolete.</p>
          </div>
        </div>
      </div>
  
      <div class="ux-detail-body">
  
        <button class="ux-back-btn" @click="$router.push('/ux')">← Back to Projects</button>
  
        <div class="ux-meta-strip">
          <div class="ux-meta-item">
            <span class="ux-meta-label">Role</span>
            <span class="ux-meta-value">Solo — UX, UI and Full Stack</span>
          </div>
          <div class="ux-meta-item">
            <span class="ux-meta-label">Year</span>
            <span class="ux-meta-value">2025</span>
          </div>
          <div class="ux-meta-item">
            <span class="ux-meta-label">Tools</span>
            <span class="ux-meta-value">Next.js, TypeScript, D3, Nivo, Claude AI, Tailwind</span>
          </div>
          <div class="ux-meta-item">
            <span class="ux-meta-label">Live</span>
            <a href="https://aushealth-dashboard.vercel.app" target="_blank" class="ux-meta-link">aushealth-dashboard.vercel.app ↗</a>
          </div>
          <div class="ux-meta-item">
            <span class="ux-meta-label">GitHub</span>
            <a href="https://github.com/Raghul-Attur/aushealth-dashboard" target="_blank" class="ux-meta-link">View Repository →</a>
          </div>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-text-section">
            <div class="ux-text-label">The Brief</div>
            <div class="ux-text-content">
              <p>This started as a pitch to Dinesh Kanthiti, Head of Enterprise Intelligence at Bupa Australia. The ask was simple: show what a modern executive dashboard could look like if you started from scratch instead of patching Power BI.</p>
              <p>I used real APRA quarterly statistics as the data source and built the entire thing solo — design, data layer, charts, AI integration, and deployment.</p>
            </div>
          </div>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-stats-row">
            <div class="ux-stat">
              <div class="ux-stat-number">4</div>
              <div class="ux-stat-label">Dashboard tabs: Overview, Financial, Customer, Operational</div>
            </div>
            <div class="ux-stat">
              <div class="ux-stat-number">AI</div>
              <div class="ux-stat-label">Natural language search powered by Claude API</div>
            </div>
            <div class="ux-stat">
              <div class="ux-stat-number">Real</div>
              <div class="ux-stat-label">APRA quarterly data, 8 periods, CC BY 3.0 AU</div>
            </div>
            <div class="ux-stat">
              <div class="ux-stat-number">3D</div>
              <div class="ux-stat-label">Australia choropleth map with D3 and real GeoJSON boundaries</div>
            </div>
          </div>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-text-section">
            <div class="ux-text-label">The Problem</div>
            <div class="ux-text-content">
              <p>Power BI shows you numbers. It doesn't tell you what they mean. A CEO opens a dashboard and sees 4.84%. They still need to call an analyst to find out if that's good, bad, or somewhere in between.</p>
              <p>The goal here was to flip that. The first thing you see when you open this dashboard isn't a chart. It's a sentence: "Softening margin and claims holding." Generated automatically from the data, every quarter, no analyst required.</p>
            </div>
          </div>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-text-section">
            <div class="ux-text-label">How I Built It</div>
            <div class="ux-text-content"></div>
          </div>
          <div class="ux-timeline">
            <div class="ux-timeline-step">
              <div class="ux-timeline-num">01</div>
              <div class="ux-timeline-body">
                <div class="ux-timeline-title">Data and architecture</div>
                <div class="ux-timeline-desc">Sourced real APRA quarterly statistics, built the Next.js 15 App Router structure with server components, defined data schemas using Zod validation.</div>
              </div>
            </div>
            <div class="ux-timeline-step">
              <div class="ux-timeline-num">02</div>
              <div class="ux-timeline-body">
                <div class="ux-timeline-title">Design system</div>
                <div class="ux-timeline-desc">Built a Bupa-accurate design system in Tailwind v4 using the exact brand palette, glass morphism surface treatment, and Inter 800 for KPI numbers.</div>
              </div>
            </div>
            <div class="ux-timeline-step">
              <div class="ux-timeline-num">03</div>
              <div class="ux-timeline-body">
                <div class="ux-timeline-title">Headline engine</div>
                <div class="ux-timeline-desc">Built insights.ts, a rules engine that reads margin delta, loss ratio trend, and consecutive quarter counts to generate two-part headlines and board-ready signals automatically.</div>
              </div>
            </div>
            <div class="ux-timeline-step">
              <div class="ux-timeline-num">04</div>
              <div class="ux-timeline-body">
                <div class="ux-timeline-title">Charts</div>
                <div class="ux-timeline-desc">Visx layered area chart with Quarterly/TTM/YoY toggle, Nivo Sankey for revenue flow, D3 choropleth map with 3D CSS perspective, radar and timeline charts for the competitor tab.</div>
              </div>
            </div>
            <div class="ux-timeline-step">
              <div class="ux-timeline-num">05</div>
              <div class="ux-timeline-body">
                <div class="ux-timeline-title">AI search and annotations</div>
                <div class="ux-timeline-desc">AI-powered search using Claude API: type a question, get a bento grid of relevant KPIs with an insight and board recommendations. Annotation system lets execs tag notes to specific tiles and flag them for discussion.</div>
              </div>
            </div>
            <div class="ux-timeline-step">
              <div class="ux-timeline-num">06</div>
              <div class="ux-timeline-body">
                <div class="ux-timeline-title">Responsive and deployed</div>
                <div class="ux-timeline-desc">Tablet-first responsive layout with 2-col KPI grid, hamburger nav, and compact period selector. Deployed to Vercel with password protection.</div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="ux-case-section">
          <img src="/images/ux/aushealth-hero.png" alt="AusHealth Overview" class="ux-section-img" loading="lazy" />
          <p class="ux-gallery-caption">Overview tab — headline and signal strip generated from real APRA data, KPI tiles with annotation system</p>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-text-section">
            <div class="ux-text-label">Design decisions</div>
            <div class="ux-text-content">
              <p><strong>Headlines before numbers.</strong> The two-part headline at the top is generated from the actual data using threshold logic. "Softening margin" comes from the margin delta. "Claims holding" comes from the loss ratio vs the 8-quarter average. The system tracks consecutive rising quarters and adjusts the language. This is the most important design decision in the whole product.</p>
              <p><strong>Signal strip.</strong> Three data pills directly below the headline show Net margin, Loss ratio, and TTM revenue with direction arrows and deltas. A board member landing on this page should be able to read the quarter's story in under 10 seconds.</p>
              <p><strong>Glass morphism on a Bupa canvas.</strong> The background is Bupa's exact blue-tinted palette with an atmospheric grain overlay. KPI tiles use backdrop-filter blur. It's designed to look like something that costs a lot, not something you templated.</p>
              <p><strong>Annotations.</strong> Every KPI tile has a comment button. You can add a note, set it as FYI, Needs Discussion, or Action Required, tag board members by initials, and it persists across sessions. The idea is that conversations happen inside the data instead of in email threads with screenshot attachments.</p>
            </div>
          </div>
        </div>
  
        <div class="ux-case-section">
          <img src="/images/ux/aushealth-search.png" alt="AusHealth AI Search" class="ux-section-img" loading="lazy" />
          <p class="ux-gallery-caption">AI search in action: "claims performance last quarter" generates a contextual bento grid from real APRA data</p>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-text-section">
            <div class="ux-text-label">AI search</div>
            <div class="ux-text-content">
              <p>This is the feature that separates it most clearly from any BI tool. You type "claims performance last quarter" and the system sends the full APRA dataset to Claude as context, gets back structured JSON, and renders a bento grid of the most relevant KPIs with a summary, a key insight, and board recommendations.</p>
              <p>It also knows about the competitor data. Search "Bupa vs Medibank loss ratio" and it pulls real FY2024 figures from both companies' public filings and displays them side by side. The whole thing runs in about 3 seconds.</p>
            </div>
          </div>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-gallery ux-gallery--two-col">
            <img src="/images/ux/aushealth-map.png" alt="Australia choropleth map" loading="lazy" />
            <img src="/images/ux/aushealth-competitor.png" alt="Competitor tab" loading="lazy" />
          </div>
          <p class="ux-gallery-caption">3D Australia map with real GeoJSON state boundaries (left) and Bupa vs Medibank competitor intelligence tab (right)</p>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-text-section">
            <div class="ux-text-label">Why it's better than Power BI</div>
            <div class="ux-text-content">
              <p><strong>It interprets, not just displays.</strong> 4.84% tells you nothing. "Fourth consecutive quarter of margin compression" tells you something worth acting on.</p>
              <p><strong>Briefings on demand.</strong> One button opens a slide-in drawer with a full board narrative generated from the live data: exec summary, signal breakdown, recommendation. No analyst, no waiting.</p>
              <p><strong>Collaboration is built in.</strong> Notes and flags are anchored to specific data points, not stuck in an email chain.</p>
              <p><strong>It actually works on mobile.</strong> Not the Power BI "pinch to zoom on a desktop layout" kind of mobile. Properly responsive, built tablet-first.</p>
              <p><strong>Every view is shareable.</strong> Period, chart mode, and compare toggle are all URL-encoded. Send the link, the recipient sees exactly what you're looking at.</p>
            </div>
          </div>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-text-section">
            <div class="ux-text-label">Stack</div>
            <div class="ux-text-content"></div>
          </div>
          <div class="ux-tech-pills">
            <span class="ux-pill" v-for="tech in techStack" :key="tech">{{ tech }}</span>
          </div>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-stats-row">
            <div class="ux-stat">
              <div class="ux-stat-number">8</div>
              <div class="ux-stat-label">Quarters of real APRA data behind every chart</div>
            </div>
            <div class="ux-stat">
              <div class="ux-stat-number">5</div>
              <div class="ux-stat-label">Tabs including AI search and competitor intelligence</div>
            </div>
            <div class="ux-stat">
              <div class="ux-stat-number">~3s</div>
              <div class="ux-stat-label">Average time from search query to bento grid result</div>
            </div>
            <div class="ux-stat">
              <div class="ux-stat-number">Live</div>
              <div class="ux-stat-label">Deployed on Vercel, password protected for demo access</div>
            </div>
          </div>
        </div>
  
        <div class="ux-case-section">
          <div class="ux-text-section">
            <div class="ux-text-label">Outcome</div>
            <div class="ux-text-content">
              <p>The live dashboard was shared with Dinesh at Bupa as the primary pitch deliverable. Beyond that, it's a proof of concept for a direction I think most enterprise BI tools are moving toward too slowly: dashboards that interpret the data, not just display it.</p>
              <p>Building this solo across design, data, charts, AI, and deployment in one sprint was the most complete end-to-end product build I've done. It's also the project I'm most proud of.</p>
            </div>
          </div>
        </div>
  
        <div class="ux-detail-nav">
          <button class="ux-back-btn" @click="$router.push('/ux')">← All Projects</button>
          <a href="https://aushealth-dashboard.vercel.app" target="_blank" class="ux-next-btn">
            View Live Dashboard ↗
          </a>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AusHealthUX',
    data() {
      return {
        techStack: [
          'Next.js 15', 'React 18', 'TypeScript', 'Tailwind v4',
          'D3.js', 'Nivo', 'Visx', 'Framer Motion',
          'Claude AI API', 'Zustand', 'nuqs', 'Radix UI',
          'TanStack Query', 'Zod', 'Vercel'
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .ux-detail { width: 100%; }
  
  .ux-detail-hero {
    position: relative; width: 100%;
    height: 70vh; overflow: hidden; margin-top: 70px;
  }
  
  .ux-detail-hero img {
    width: 100%; height: 100%; object-fit: cover;
    object-position: top center; display: block;
    filter: brightness(0.4); opacity: 1;
  }
  
  .ux-detail-hero-overlay {
    position: absolute; inset: 0;
    display: flex; align-items: flex-end; padding: 4rem 6vw;
  }
  
  .ux-detail-hero-inner {
    display: flex; flex-direction: column; gap: 1rem; max-width: 800px;
  }
  
  .ux-detail-hero-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  
  .ux-tag {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 0.3rem 0.75rem;
    border-radius: 999px; font-family: Arial, sans-serif;
  }
  
  .ux-tag--light { background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.75); }
  
  .ux-detail-title {
    font-size: clamp(3rem, 7vw, 6rem); font-weight: 900;
    color: #fff; margin: 0; line-height: 1;
    letter-spacing: -0.03em; font-family: Arial, sans-serif;
  }
  
  .ux-detail-subtitle {
    font-size: clamp(0.9rem, 1.3vw, 1.1rem); color: rgba(255,255,255,0.7);
    line-height: 1.65; margin: 0; font-family: Arial, sans-serif; max-width: 600px;
  }
  
  .ux-detail-body { max-width: 900px; margin: 0 auto; padding: 4rem 2rem 6rem; }
  
  .ux-back-btn {
    background: none; border: none; cursor: pointer;
    font-size: 0.85rem; font-weight: 700; color: #888;
    letter-spacing: 0.06em; font-family: Arial, sans-serif;
    padding: 0; margin-bottom: 3rem; transition: color 0.2s;
  }
  .ux-back-btn:hover { color: #000; }
  
  .ux-meta-strip {
    display: flex; gap: 3rem; flex-wrap: wrap; padding: 2rem 0;
    border-top: 1px solid #e8e8e8; border-bottom: 1px solid #e8e8e8;
    margin-bottom: 4rem;
  }
  
  .ux-meta-item { display: flex; flex-direction: column; gap: 0.3rem; }
  
  .ux-meta-label {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: #aaa; font-family: Arial, sans-serif;
  }
  
  .ux-meta-value { font-size: 0.9rem; font-weight: 600; color: #000; font-family: Arial, sans-serif; }
  
  .ux-meta-link {
    font-size: 0.9rem; font-weight: 600; color: #000;
    font-family: Arial, sans-serif; text-decoration: none; border-bottom: 1px solid #000;
  }
  
  .ux-case-section { margin-bottom: 4rem; }
  
  .ux-text-section { display: grid; grid-template-columns: 160px 1fr; gap: 2rem; align-items: start; }
  
  .ux-text-label {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: #aaa; font-family: Arial, sans-serif; padding-top: 0.3rem;
  }
  
  .ux-text-content { font-size: 1rem; color: #333; line-height: 1.85; font-family: Arial, sans-serif; }
  .ux-text-content p { margin: 0 0 1.2rem 0; }
  .ux-text-content p:last-child { margin-bottom: 0; }
  .ux-text-content strong { color: #000; font-weight: 700; }
  
  .ux-section-img { width: 100%; border-radius: 12px; object-fit: cover; display: block; }
  
  .ux-gallery { margin: 0; }
  .ux-gallery--two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .ux-gallery--two-col img { width: 100%; border-radius: 12px; object-fit: cover; display: block; }
  
  .ux-gallery-caption {
    font-size: 0.78rem; color: #aaa; font-family: Arial, sans-serif;
    margin: 0.75rem 0 0; letter-spacing: 0.04em;
  }
  
  .ux-stats-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
    padding: 2.5rem 0; border-top: 1px solid #e8e8e8; border-bottom: 1px solid #e8e8e8;
  }
  
  .ux-stat-number { font-size: 1.8rem; font-weight: 900; color: #000; line-height: 1; font-family: Arial, sans-serif; }
  .ux-stat-label { font-size: 0.75rem; color: #888; margin-top: 0.4rem; font-family: Arial, sans-serif; line-height: 1.4; }
  
  .ux-tech-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .ux-pill {
    font-size: 0.78rem; font-weight: 600; color: #333;
    background: #f2f2f2; border-radius: 999px; padding: 0.4rem 1rem; font-family: Arial, sans-serif;
  }
  
  .ux-timeline { display: flex; flex-direction: column; gap: 0; }
  
  .ux-timeline-step {
    display: flex; gap: 1.5rem; align-items: flex-start;
    padding-bottom: 2rem; position: relative;
  }
  
  .ux-timeline-step:not(:last-child)::before {
    content: ''; position: absolute; left: 19px; top: 32px;
    width: 1px; height: calc(100% - 8px); background: #e8e8e8;
  }
  
  .ux-timeline-num {
    width: 40px; height: 40px; border-radius: 50%; background: #000; color: #fff;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em;
    display: flex; align-items: center; justify-content: center;
    font-family: Arial, sans-serif; flex-shrink: 0; position: relative; z-index: 1;
  }
  
  .ux-timeline-body { padding-top: 0.6rem; }
  .ux-timeline-title { font-size: 0.9rem; font-weight: 700; color: #000; font-family: Arial, sans-serif; margin-bottom: 0.35rem; }
  .ux-timeline-desc { font-size: 0.88rem; color: #666; line-height: 1.65; font-family: Arial, sans-serif; }
  
  .ux-detail-nav {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 3rem; border-top: 1px solid #e8e8e8; margin-top: 2rem;
  }
  
  .ux-next-btn {
    background: #000; color: #fff; border: none; cursor: pointer;
    font-size: 0.85rem; font-weight: 700; letter-spacing: 0.08em;
    font-family: Arial, sans-serif; padding: 0.85rem 2rem; border-radius: 999px;
    transition: background 0.25s ease; text-decoration: none;
    display: inline-flex; align-items: center;
  }
  .ux-next-btn:hover { background: #333; }
  
  @media (max-width: 768px) {
    .ux-detail-hero { height: 50vh; }
    .ux-detail-body { padding: 2rem 1.5rem 4rem; }
    .ux-text-section { grid-template-columns: 1fr; gap: 0.75rem; }
    .ux-gallery--two-col { grid-template-columns: 1fr; }
    .ux-stats-row { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .ux-meta-strip { gap: 1.5rem; }
    .ux-detail-nav { flex-direction: column; gap: 1rem; align-items: flex-start; }
  }
  </style>