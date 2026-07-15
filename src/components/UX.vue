<template>

  <!-- ── PAGE HEADER ───────────────────────────────────────── -->
  <div class="ux-header">
    <div class="ux-header-inner">
      <span class="ux-eyebrow">Portfolio</span>
      <h1 class="ux-page-title">UI / UX<br>Design</h1>
      <p class="ux-page-desc">
        Research-led design across accessibility platforms, e-commerce, and social impact products.
      </p>
    </div>
    <div class="ux-header-count">{{ uxProjects.length }} Projects</div>
  </div>

  <!-- ── PROJECT LIST ──────────────────────────────────────── -->
  <transition name="page-fade">
    <div v-if="selectedProject === null" class="ux-project-list">
      <div
        v-for="(project, index) in uxProjects"
        :key="index"
        class="ux-project-row"
        @click="openProject(index)"
      >
        <div class="ux-row-left">
          <span class="ux-row-number">0{{ index + 1 }}</span>
          <div class="ux-row-meta">
            <div class="ux-row-tags">
              <span class="ux-tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
            <h2 class="ux-row-title">{{ project.title }}</h2>
            <p class="ux-row-desc">{{ project.summary }}</p>
            <span class="ux-row-cta">View Case Study →</span>
          </div>
        </div>
        <div class="ux-row-right">
          <img :src="project.thumbnail" :alt="project.title" loading="lazy" />
          <div v-if="project.award" class="ux-award-badge">{{ project.award }}</div>
        </div>
      </div>
    </div>
  </transition>

  <!-- ── PROJECT DETAIL ────────────────────────────────────── -->
  <transition name="page-fade">
    <div v-if="selectedProject !== null" class="ux-detail">

      <!-- Hero -->
      <div class="ux-detail-hero">
        <img :src="active.hero" :alt="active.title" loading="lazy" />
        <div class="ux-detail-hero-overlay">
          <div class="ux-detail-hero-inner">
            <div class="ux-detail-hero-tags">
              <span class="ux-tag ux-tag--light" v-for="tag in active.tags" :key="tag">{{ tag }}</span>
              <span v-if="active.award" class="ux-tag ux-tag--award">{{ active.award }}</span>
            </div>
            <h1 class="ux-detail-title">{{ active.title }}</h1>
            <p class="ux-detail-subtitle">{{ active.subtitle }}</p>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="ux-detail-body">

        <button class="ux-back-btn" @click="closeProject">← Back to Projects</button>

        <!-- Meta strip -->
        <div class="ux-meta-strip">
          <div class="ux-meta-item">
            <span class="ux-meta-label">Role</span>
            <span class="ux-meta-value">{{ active.role }}</span>
          </div>
          <div class="ux-meta-item">
            <span class="ux-meta-label">Year</span>
            <span class="ux-meta-value">{{ active.year }}</span>
          </div>
          <div class="ux-meta-item">
            <span class="ux-meta-label">Tools</span>
            <span class="ux-meta-value">{{ active.tools.join(', ') }}</span>
          </div>
          <div class="ux-meta-item" v-if="active.liveUrl">
            <span class="ux-meta-label">Live</span>
            <a :href="active.liveUrl" target="_blank" class="ux-meta-link">{{ active.liveUrl }}</a>
          </div>
          <div class="ux-meta-item" v-if="active.figma">
            <span class="ux-meta-label">Figma</span>
            <a :href="active.figma" target="_blank" class="ux-meta-link">View Prototype →</a>
          </div>
        </div>

        <!-- Case study sections -->
        <div class="ux-case-section" v-for="(section, i) in active.sections" :key="i">

          <!-- Image gallery -->
          <div v-if="section.type === 'images'" class="ux-gallery" :class="'ux-gallery--' + (section.layout || 'single')">
            <img v-for="(img, j) in section.images" :key="j" :src="img" loading="lazy" :alt="section.caption || 'Project image'" />
            <p v-if="section.caption" class="ux-gallery-caption">{{ section.caption }}</p>
          </div>

          <!-- Text section -->
          <div v-else-if="section.type === 'text'" class="ux-text-section">
            <div class="ux-text-label">{{ section.label }}</div>
            <div class="ux-text-content" v-html="section.content"></div>
          </div>

          <!-- Stats row -->
          <div v-else-if="section.type === 'stats'" class="ux-stats-row">
            <div class="ux-stat" v-for="stat in section.stats" :key="stat.number">
              <div class="ux-stat-number">{{ stat.number }}</div>
              <div class="ux-stat-label">{{ stat.label }}</div>
            </div>
          </div>

          <!-- Timeline -->
          <div v-else-if="section.type === 'timeline'" class="ux-text-section">
            <div class="ux-text-label">{{ section.label }}</div>
            <div class="ux-timeline">
              <div class="ux-timeline-step" v-for="step in section.steps" :key="step.number">
                <div class="ux-timeline-num">{{ step.number }}</div>
                <div class="ux-timeline-body">
                  <div class="ux-timeline-title">{{ step.title }}</div>
                  <div class="ux-timeline-desc">{{ step.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tech pills -->
          <div v-else-if="section.type === 'tech'" class="ux-text-section">
            <div class="ux-text-label">{{ section.label }}</div>
            <div class="ux-tech-pills">
              <span class="ux-pill" v-for="item in section.items" :key="item">{{ item }}</span>
            </div>
          </div>

          <!-- Browser mockup, tabbed (Option A) -->
          <div v-else-if="section.type === 'browsermockup'" class="ux-browser-wrap">
            <div class="ux-browser-tabs">
              <button
                v-for="(screen, j) in section.screens"
                :key="j"
                class="ux-browser-tab"
                :class="{ active: (browserIndex[i] || 0) === j }"
                @click="setBrowserTab(i, j)"
              >{{ screen.label }}</button>
            </div>
            <div class="ux-browser">
              <div class="ux-browser-bar">
                <div class="ux-browser-dots">
                  <span></span><span></span><span></span>
                </div>
                <div class="ux-browser-url">
                  {{ section.screens[browserIndex[i] || 0].url }}
                </div>
              </div>
              <div class="ux-browser-screen">
                <transition name="screen-fade" mode="out-in">
                  <img
                    :key="browserIndex[i] || 0"
                    :src="section.screens[browserIndex[i] || 0].src"
                    :alt="section.screens[browserIndex[i] || 0].label"
                    loading="lazy"
                  />
                </transition>
              </div>
            </div>
            <p v-if="section.caption" class="ux-gallery-caption">{{ section.caption }}</p>
          </div>

        </div>

        <!-- Nav to next project -->
        <div class="ux-detail-nav">
          <button class="ux-back-btn" @click="closeProject">← All Projects</button>
          <button
            v-if="selectedProject < uxProjects.length - 1"
            class="ux-next-btn"
            @click="openProject(selectedProject + 1)"
          >
            Next Project →
          </button>
        </div>

      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'UXProjects',

  data() {
    return {
      selectedProject: null,
      browserIndex: {},

      uxProjects: [

      {
          title: 'AusHealth Dashboard',
          subtitle: 'An executive intelligence platform for Australian private health insurance, designed to replace Power BI.',
          summary: 'Full-stack UX and product design for an executive health dashboard built for a Bupa pitch. Features AI-powered natural language search, dynamic board-ready narratives, annotation system, competitor intelligence, and a 3D Australia choropleth map, all powered by real APRA quarterly data.',
          award: null,
          tags: ['Product Design', 'Data Visualisation', 'AI', 'Full Stack'],
          thumbnail: '/images/ux/aushealth-hero.png',
          hero: '/images/ux/aushealth-hero.png',
          role: 'Solo, UX, UI & Full Stack Development',
          year: '2025',
          tools: ['Next.js', 'TypeScript', 'D3.js', 'Claude AI API', 'Figma', 'Tailwind'],
          liveUrl: 'https://aushealth-dashboard.vercel.app',
          figma: null,
          sections: []
        },

        // ── READEASE ─────────────────────────────────────────────
        {
          title: 'ReadEase',
          subtitle: 'An accessible reading platform for young Australians with dyslexia.',
          summary: 'Full-stack accessibility platform combining OCR, AI summarisation, phonetic learning, and gamified reading tools, built for young Australians with dyslexia.',
          award: 'Best Project, Monash Expo 2025',
          tags: ['UX Design', 'Full Stack', 'Accessibility'],
          thumbnail: '/dev/ReadEase1.png',
          hero: '/dev/ReadEase1.png',
          role: 'Lead Developer, UI/UX Designer',
          year: '2025',
          tools: ['Vue.js', 'Figma', 'AWS Lambda', 'Amazon RDS', 'Google Document AI', 'OpenAI API'],
          liveUrl: 'www.readease.me',
          figma: 'https://www.figma.com/design/yAAUoBrpgXCHeq0NzmWau1/FIT5120-Dyslexia?node-id=0-1',

          sections: [
            {
              type: 'text',
              label: 'Design Question',
              content: '<p><strong>How might we</strong> help young Australians with dyslexia by providing functional day-to-day reading tools and real-world support in a way that feels empowering rather than remedial?</p><p>This question shaped every decision from the first wireframe. The brief was not just to make text readable, it was to make the experience feel like something a 15-25 year old would actually want to use.</p>'
            },
            {
              type: 'timeline',
              label: 'Process',
              steps: [
                { number: '01', title: 'Iteration 1', desc: 'Research, personas, problem framing. Built text-to-speech, voice input, and phonetic word cards with difficulty levels.' },
                { number: '02', title: 'Iteration 2', desc: 'Usability testing revealed navigation bugs and missing game feedback. Added accessibility panel, colour themes, gamified spelling, and awareness data visualisations.' },
                { number: '03', title: 'Iteration 3', desc: 'Second round of testing flagged accessibility panel discoverability and OCR limitations. Added AI summariser, school map, Chrome extension, and improved homepage clarity.' },
              ]
            },
            {
              type: 'text',
              label: 'Testing Findings',
              content: '<p><strong>Iteration 2 testing</strong> (mobile and desktop, diverse backgrounds) surfaced several key issues we resolved before Iteration 3:</p><ul><li>Pages were scrolling to the middle on navigation, fixed by enforcing scroll-to-top on every route change.</li><li>The game interface lacked a "Next Word" button and some word content was unclear, we added navigation controls and improved content quality.</li><li>The support page was cut off on mobile, fixed with responsive layout corrections.</li><li>Graph visuals did not match the site aesthetic, redesigned to be consistent with the overall UI.</li><li>Buttons on the home page were not clickable on the support page, fixed interaction inconsistencies across shared layouts.</li></ul><p><strong>Iteration 3 testing</strong> identified further improvements:</p><ul><li>The accessibility panel was not easy to find, we made the entry point more visible and persistent across pages.</li><li>The homepage did not clearly communicate the platform purpose, revised copy and visual hierarchy to establish context immediately on landing.</li><li>The OCR feature struggled with certain image types like maps, we added scope clarification and graceful error handling.</li><li>The school map lacked a legend explaining school types, added explanations and colour coding.</li></ul>'
            },
            {
              type: 'text',
              label: 'Team Credits',
              content: '<p>ReadEase was built by a team of six: Jiayi Gu, Putu Anjali Antara, Raghul Sukumar, Tingyu Li, Yinjia Zhang, and Yuxuan Ge.</p><p>I shared UI/UX design responsibilities with a fellow designer, and led the frontend development. My specific contributions: Vue.js component architecture, accessibility panel design and implementation, OCR reader interface, word learning mode UI, gamified spelling flow, overall design system, and WCAG 2.1 AA compliance across all interactive components. My co-designer and I worked closely on the Figma prototypes across all three iterations.</p>'
            },
            {
              type: 'text',
              label: 'What I Would Do Differently',
              content: '<p>The biggest constraint we faced was user research access. All three rounds of usability testing were conducted with people outside our primary demographic, none of our testers actually had dyslexia. This meant our accessibility decisions were made on best-practice guidelines and secondhand feedback rather than direct input from the people we were designing for.</p><p>With more time, I would invest heavily in recruiting young Australians with dyslexia for co-design sessions from the very start. Designing with users rather than for them would have surfaced insights we missed, particularly around the emotional experience of using an accessibility tool, which is just as important as the functional experience. The platform works, but I do not know yet whether it feels right to the people it was built for.</p>'
            },
            {
              type: 'text',
              label: 'The Problem',
              content: '<p>1 in 10 Australians has dyslexia. Most digital reading tools are built for neurotypical users, and the few that exist for dyslexic readers are fragmented, clinical, or difficult for young people to engage with. There was no single platform that combined accessibility settings, document reading, vocabulary support, and gamified practice in one place.</p><p>The brief was to design and build a platform specifically for young Australians with dyslexia that felt engaging rather than remedial, and that addressed reading challenges at multiple levels simultaneously.</p>'
            },
            {
              type: 'browsermockup',
              screens: [
                { label: 'Homepage',     url: 'readease.me',                src: '/dev/ReadEase1.png' },
                { label: 'Accessibility Panel', url: 'readease.me',         src: '/dev/ReadEase2.png' },
              ],
              caption: 'ReadEase homepage and accessibility panel, tab to switch between screens'
            },
            {
              type: 'text',
              label: 'Research',
              content: '<p>The team conducted user research across three iterations, developing personas for two primary user groups: a 12-year-old student diagnosed with dyslexia navigating school reading tasks, and a parent seeking tools to support their child at home. Research drew on AIHW education data showing the impact of learning disabilities on educational outcomes across Australia.</p><p>We audited existing tools including Natural Reader, Beeline Reader, and Microsoft Immersive Reader to identify gaps. Key findings: most tools addressed only one aspect of the problem (text-to-speech only, or font adjustment only). None offered adaptive learning, gamified reinforcement, and document accessibility in one product.</p>'
            },
            {
              type: 'browsermockup',
              screens: [
                { label: 'Persona, Student',  url: 'readease.me/research', src: '/dev/ReadEase1.png' },
                { label: 'Persona, Parent',   url: 'readease.me/research', src: '/dev/ReadEase2.png' },
              ],
              caption: 'User personas developed across the Iteration 1 research phase'
            },
            {
              type: 'text',
              label: 'My Contribution',
              content: '<p>I led the frontend architecture and was responsible for the Vue.js component system, accessibility panel implementation, and the overall UI design. I designed and built the adjustable font, spacing, and colour theme controls that persist across sessions. I also built the OCR document reader interface, the word learning mode UI, and the gamified spelling and word-image matching flows.</p><p>Beyond frontend, I contributed to accessibility compliance, checking every interactive component against WCAG 2.1 AA contrast and spacing requirements using Figma Stark, and documenting each decision with its corresponding WCAG criterion for the development team.</p>'
            },
            {
              type: 'text',
              label: 'Accessibility Design',
              content: '<p>Accessibility was not retrofitted, it was the brief. Every design decision was made against WCAG 2.1 AA criteria from the first wireframe. Key decisions included: OpenDyslexic font support alongside Lexend Deca and standard options; minimum 16px body text with user-adjustable sizing; six colour themes (Light, Dark, Sepia, Night, Sky, Mint) each independently tested for contrast; generous line height and letter spacing controls; large touch targets across all interactive elements.</p><p>The accessibility panel was designed to be reachable within two interactions from any page and to persist user preferences across sessions without requiring login.</p>'
            },
            {
              type: 'browsermockup',
              screens: [
                { label: 'Accessibility Settings', url: 'readease.me/settings', src: '/dev/ReadEase2.png' },
                { label: 'Reading Interface',       url: 'readease.me/read',     src: '/dev/ReadEase1.png' },
              ],
              caption: 'Accessibility settings panel and reading interface, font, spacing, and colour theme controls'
            },
            {
              type: 'text',
              label: 'Key Features',
              content: '<p><strong>OCR Document Reader:</strong> Users upload images or PDFs and the system extracts text using Google Document AI, overlays numbered word markers, and enables word-level text-to-speech. Built to handle handwritten notes, printed textbook pages, and digital documents.</p><p><strong>AI Text Summariser:</strong> Long articles or documents are summarised using OpenAI API into simplified paragraph or bullet-point format, reducing the reading load for users who struggle with dense text.</p><p><strong>Phonetic Word Cards:</strong> Vocabulary organised by difficulty level (Beginner, Intermediate, Advanced) with CMU Pronouncing Dictionary phonetic breakdowns and stress markers. Users save words for later practice.</p><p><strong>Gamified Practice:</strong> Word-image matching and speak-and-spell games using saved vocabulary. Score tracking and round summaries encourage return engagement.</p><p><strong>Awareness Section:</strong> Data visualisations from AIHW education datasets, stories from public figures with dyslexia, and an interactive map of dyslexia-support schools across Australia.</p>'
            },
            {
              type: 'tech',
              label: 'Tech Stack',
              items: ['Vue.js 3', 'Bootstrap 5', 'AWS Lambda (Python 3.10)', 'Amazon API Gateway', 'Amazon RDS MySQL', 'Amazon S3', 'Google Document AI', 'OpenAI API', 'AWS Amplify', 'reCAPTCHA Enterprise', 'Vite', 'GitHub']
            },
            {
              type: 'stats',
              stats: [
                { number: '3', label: 'Usability testing iterations' },
                { number: '7', label: 'Core platform features' },
                { number: 'WCAG 2.1 AA', label: 'Accessibility compliance' },
                { number: '#1', label: 'Best Project, Monash Expo 2025' },
              ]
            },
            {
              type: 'text',
              label: 'Outcome',
              content: '<p>ReadEase won Best Project at the Monash University Postgraduate Industry Experience Expo 2025. The platform passed a WCAG 2.1 AA audit and received positive usability testing results across all three iterations, with users noting the accessibility panel and OCR reader as the most impactful features.</p><p>The live platform is available at readease.me. The Chrome browser extension extends ReadEase accessibility features across any website, available for download directly from the platform.</p>'
            },
          ]
        },

        // ── FOODLINK ─────────────────────────────────────────────
        {
          title: 'FoodLink',
          subtitle: 'A gamified donation experience that removes friction for first-time donors.',
          summary: 'UX research, wireframing, and high-fidelity prototyping for a food bank donation app focused on accessibility, heuristic compliance, and first-time donor engagement.',
          award: null,
          tags: ['UX Research', 'Interaction Design', 'Accessibility'],
          thumbnail: '/ux1.jpg',
          hero: '/ux1.jpg',
          role: 'UX Researcher, Interaction Designer',
          year: '2024',
          tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
          liveUrl: null,
          figma: 'https://www.figma.com/design/HJhyfxP3O6dBH4P1ThRaOs/Cyndaquil?node-id=1-2',

          sections: [
            {
              type: 'text',
              label: 'Design Question',
              content: '<p><strong>How might we</strong> reduce the friction of food bank donation so that a first-time donor can complete the full process, from discovery to drop-off, without confusion, hesitation, or giving up?</p>'
            },
            {
              type: 'timeline',
              label: 'Process',
              steps: [
                { number: '01', title: 'Research', desc: 'Developed user personas, mapped the existing donation journey, and identified key friction points through task analysis and heuristic evaluation.' },
                { number: '02', title: 'Wireframes', desc: 'Low-fidelity sketches testing navigation flow, map interaction, and the donation checklist. Iterated on filter system and chatbot placement.' },
                { number: '03', title: 'High Fidelity', desc: 'Built full prototype in Figma with WCAG-compliant contrast, screen reader support, and gamified progress indicators.' },
                { number: '04', title: 'Testing', desc: 'Usability sessions with diverse participants including first-time donors and low-tech users. Refined based on findings before final presentation.' },
              ]
            },
            {
              type: 'text',
              label: 'Testing Findings',
              content: '<p>Usability testing sessions with first-time donors and low-tech users produced three key refinements:</p><ul><li>Map navigation instructions were too dense, simplified into larger, step-by-step cards that users could follow without reading a block of text.</li><li>Users had no way to return to previously viewed food banks, added a Recently Viewed section on the home screen to encourage repeat engagement.</li><li>The chatbot failed when users asked donation-specific FAQs outside its trained responses, improved fallback options with pre-set donation guidance prompts.</li></ul>'
            },
            {
              type: 'text',
              label: 'What I Would Do Differently',
              content: '<p>The chatbot was designed as a support feature but became a weak point in testing. With more time I would have invested in building out the FAQ database more thoroughly before usability testing, so the chatbot failures did not undermine confidence in the rest of the product. A static FAQ page as a fallback would have been a simpler and more reliable solution at this stage of the project.</p>'
            },
            {
              type: 'text',
              label: 'The Problem',
              content: '<p>First-time food bank donors face unnecessary friction. Between locating a nearby food bank, understanding donation guidelines, and navigating drop-off, the process is fragmented enough that many people give up. The brief was to design a mobile app that simplified the end-to-end donation experience while making it feel rewarding rather than transactional.</p>'
            },
            {
              type: 'images',
              layout: 'two-col',
              images: ['/User Personas-01.png', '/User Personas-02.png'],
              caption: 'User personas, first-time donor and repeat community volunteer'
            },
            {
              type: 'text',
              label: 'My Role',
              content: '<p>I led UX research, low-fidelity sketching, and high-fidelity prototyping. I was responsible for applying heuristic evaluation principles and WCAG accessibility guidelines across all interactive components, the design system, iconography, and the final presentation flow.</p>'
            },
            {
              type: 'images',
              layout: 'two-col',
              images: ['/impact-01.png', '/impact-02.png'],
              caption: 'Research insights, key friction points in the existing donation process'
            },
            {
              type: 'text',
              label: 'Design Process',
              content: '<p><strong>Visual hierarchy:</strong> User-specific greetings, highlighted CTAs, and clean card layouts guided users through the flow without instructions. Navigation icons were standardised across all screens to reduce the learning curve.</p><p><strong>Error prevention:</strong> A donation checklist with checkboxes prevented users from arriving at drop-off with ineligible items. Contextual help about high-demand items appeared inline within the cart view.</p><p><strong>Map navigation:</strong> A continuous visual path on the map used Gestalt continuity to guide users from their location to the drop-off point. The filter overlay was condensed from a full-screen modal to a single top-right icon, reducing interface noise.</p><p><strong>Accessibility:</strong> High-contrast buttons, large touch targets, and screen reader support were implemented for key pages including the safety checklist and chatbot screens.</p>'
            },
            {
              type: 'images',
              layout: 'two-col',
              images: ['/Foodbank.jpg', '/Foodbank2.jpg'],
              caption: 'High-fidelity screens, home, map navigation, and donation checklist'
            },
            {
              type: 'text',
              label: 'Validation',
              content: '<p>Usability testing sessions were conducted with a small group representing diverse demographics including first-time donors and low-tech users. Key refinements after testing: map instructions were simplified into larger step-by-step cards; a Recently Viewed section was added to encourage repeat donations; chatbot fallback options were improved for donation FAQs.</p>'
            },
            {
              type: 'images',
              layout: 'single',
              images: ['/impact-03.png'],
              caption: 'Final prototype, refined navigation and feedback flows'
            },
          ]
        },

        // ── STYLORI ──────────────────────────────────────────────
        {
          title: 'Stylori Silver',
          subtitle: 'E-commerce UX designed to simplify jewellery discovery and reduce checkout friction.',
          summary: 'Responsive layout design, filter system architecture, and visual hierarchy optimisation for a jewellery e-commerce platform targeting middle-income women shoppers.',
          award: null,
          tags: ['E-Commerce UX', 'Responsive Design', 'Visual Design'],
          thumbnail: '/Stylori-01.jpg',
          hero: '/Stylori-01.jpg',
          role: 'UI/UX Designer',
          year: '2024',
          tools: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator'],
          liveUrl: null,
          figma: null,

          sections: [
            {
              type: 'text',
              label: 'Design Question',
              content: '<p><strong>How might we</strong> help a middle-income woman find and purchase jewellery online without being overwhelmed by choice, buried in filters, or frustrated by a slow checkout process?</p>'
            },
            {
              type: 'timeline',
              label: 'Process',
              steps: [
                { number: '01', title: 'Audit', desc: 'Reviewed the existing Stylori Silver experience against competitor jewellery platforms. Identified filter complexity, visual hierarchy issues, and checkout length as primary pain points.' },
                { number: '02', title: 'Design', desc: 'Redesigned the filter system, product grid, and checkout flow in Figma. Focused on reducing interaction steps and improving content density balance.' },
                { number: '03', title: 'Testing', desc: 'Cross-device testing with users on mobile and desktop across different screen sizes. Primarily design-led decisions validated through observation and feedback sessions.' },
              ]
            },
            {
              type: 'text',
              label: 'Testing Findings',
              content: '<p>Testing was conducted across multiple devices and screen sizes with users who represented the target demographic. Key observations: the collapsible filter drawer on mobile was intuitive without instruction, users found and used it immediately. Product card grid reflow from desktop to mobile maintained readability and did not require horizontal scrolling. Checkout step reduction was well received, no users asked "what happens next" during task completion. Minor feedback on button sizing on smaller Android screens was addressed with touch target adjustments.</p>'
            },
            {
              type: 'text',
              label: 'What I Would Do Differently',
              content: '<p>The design was primarily driven by heuristic evaluation and competitive audit rather than direct research with Stylori Silver customers. With more time I would have conducted interviews with actual shoppers in the target demographic to understand their mental models around jewellery browsing, particularly around how they evaluate trust and product quality before purchasing. This would have informed decisions around photography, sizing information, and social proof that I based on assumptions rather than evidence.</p>'
            },
            {
              type: 'text',
              label: 'The Problem',
              content: '<p>Stylori Silver is a jewellery e-commerce platform for lower to middle-income women shopping for daily and festive wear. The existing experience had a dense filter system, unclear product hierarchy, and a checkout flow with too many steps. The brief was to reduce browsing complexity while keeping the aesthetic premium.</p>'
            },
            {
              type: 'images',
              layout: 'single',
              images: ['/Stylori-02.jpg'],
              caption: 'Product listing page, redesigned filter system and visual hierarchy'
            },
            {
              type: 'text',
              label: 'Design Decisions',
              content: '<p><strong>Filter system:</strong> Grouped all price and category options into a logical collapsible structure. Reduced the number of filter interactions required to reach a relevant product set from five steps to two.</p><p><strong>Visual hierarchy:</strong> Used whitespace and card sizing to surface bestsellers and seasonal offers without requiring users to read promotional copy. Reduced cognitive load by separating browsing and purchase decision states.</p><p><strong>Checkout optimisation:</strong> Minimised the steps between product view and order confirmation. Removed intermediate screens that added no value to the decision process.</p>'
            },
            {
              type: 'images',
              layout: 'single',
              images: ['/Stylori-03.jpg'],
              caption: 'Mobile responsive layout, collapsible filters and touch-friendly grid'
            },
            {
              type: 'text',
              label: 'Responsive Design',
              content: '<p>The layout adapts across desktop, tablet, and mobile. Filters collapse to a drawer on mobile. Product card grids reflow from four columns on desktop to two on mobile. All interactive elements meet minimum touch target sizes. Typography scales fluidly using clamp values to maintain readability across screen widths.</p>'
            },
          ]
        },

        // ── CORPORATE CHEMISTRY WEBSITE ──────────────────────────
        {
          title: 'Corporate Chemistry',
          subtitle: 'Website UI design for a talent acquisition and recruitment firm.',
          summary: 'Five-page website UI for a recruitment agency, homepage, services, about, application forms, and contact, designed around a bold yellow and charcoal identity system.',
          award: null,
          tags: ['UI Design', 'Web Design', 'Brand Application'],
          thumbnail: '/CC_Web_01.jpg',
          hero: '/CC_Web_01.jpg',
          role: 'UI Designer',
          year: '2021',
          tools: ['Adobe Photoshop', 'Adobe Illustrator'],
          liveUrl: null,
          figma: null,

          sections: [
            {
              type: 'text',
              label: 'Brief',
              content: '<p>Corporate Chemistry is a talent acquisition and recruitment firm specialising in mid to senior-level placements across industries. Alongside the pitch deck (DS-15), the engagement included designing the full public-facing website, five pages covering the brand story, service offering, candidate and company application forms, and contact information.</p><p>The design challenge was to translate the pitch deck\'s visual identity, bold yellow, charcoal, geometric illustration, custom iconography, into a web layout that worked for two distinct audiences simultaneously: companies looking to hire, and candidates looking for roles.</p>'
            },
            {
              type: 'text',
              label: 'Design System',
              content: '<p>The visual language carries directly from the brand identity: golden yellow (#FFC107) as the dominant hero colour, dark charcoal (#555555) as the structural colour, and off-white (#F2F2F2) as the page ground. Typography uses a single bold sans-serif across all headings, keeping the design assertive and consistent at every scale.</p><p>Custom line icons were designed for all six service offerings, three for candidates (Consulting, Grooming, Interviewing) and three for companies (Sourcing, Shortlisting, Interviewing). Each icon uses a yellow rounded-square container, giving them a unified, badge-like quality across the services page. The same icons appear in the pitch deck, extending the visual system across both deliverables.</p>'
            },
            {
              type: 'browsermockup',
              screens: [
                { label: 'Homepage',    url: 'corporatechemistry.com',          src: '/CC_Web_01.jpg' },
                { label: 'Our Services', url: 'corporatechemistry.com/services', src: '/CC_Web_02.jpg' },
                { label: 'About Us',    url: 'corporatechemistry.com/about',    src: '/CC_Web_03.jpg' },
                { label: 'Apply Now',   url: 'corporatechemistry.com/apply',    src: '/CC_Web_04.jpg' },
                { label: 'Contact Us',  url: 'corporatechemistry.com/contact',  src: '/CC_Web_05.jpg' },
              ],
              caption: 'All five pages, click the tabs to browse each screen'
            },
            {
              type: 'text',
              label: 'Homepage',
              content: '<p>The homepage is structured around a clear binary entry point: Hiring for a job or Looking for a job. Both CTAs appear as equal-weight yellow buttons on a full-bleed black-and-white hero photograph, resolving the dual-audience problem immediately on landing without requiring users to read copy to understand where they belong.</p><p>Below the hero, two content blocks develop the brand positioning. The yellow band introduces the agency with a custom illustration of spotlit candidates, reinforcing the human-centric positioning. The grey section introduces the "chemistry" metaphor through a molecular structure motif rendered in yellow and charcoal, with the brand\'s core line: "We\'re making hiring human."</p>'
            },
            {
              type: 'text',
              label: 'Services & About',
              content: '<p>The Services page splits cleanly into two sections, For Candidates on a yellow background, For Companies on charcoal, using colour to establish the division before users read a word. Each service is presented in an identical white card with the custom icon at centre, service name, and a single explanatory line. The symmetry across both sections makes the offering readable at a glance.</p><p>The About Us page uses the same card grid to express four brand values: people-centric, human-centric, connection-centric, and Corporate Chemistry. The layout mirrors the Services page structurally, reducing the cognitive load of navigating between sections. A yellow band at the top maintains the page hierarchy established across the site.</p>'
            },
            {
              type: 'text',
              label: 'Forms & Contact',
              content: '<p>The Apply Now page handles the most complex content on the site, a 12-field candidate form and a 4-field company form, without feeling overwhelming. Both forms sit in white cards that emerge from their coloured band backgrounds (yellow for candidates, charcoal for companies), visually separating the two audiences while maintaining layout consistency. The yellow Submit button is the only coloured element inside each form, directing attention clearly to the action.</p><p>The Contact page keeps the same card-on-yellow structure and pairs the contact details with an embedded Google Maps panel, practical, clean, and requiring no additional design decisions to be useful.</p>'
            },
            {
              type: 'text',
              label: 'Navigation',
              content: '<p>The dark charcoal navigation bar persists across all five pages with the active page highlighted in yellow, providing orientation without requiring any additional wayfinding elements. The logo sits top-left in white against charcoal, maintaining legibility regardless of the page content below. The nav system is intentionally minimal: four links, no dropdowns, no hamburger menu at this design phase.</p><p>This project was completed as part of the same engagement as the Corporate Chemistry pitch deck (DS-15), with both deliverables sharing the same visual system and icon library.</p>'
            },
            {
              type: 'stats',
              stats: [
                { number: '5',  label: 'Pages designed' },
                { number: '6',  label: 'Custom service icons' },
                { number: '2',  label: 'Distinct audiences served' },
                { number: '1',  label: 'Unified system across web and pitch deck' },
              ]
            },
          ]
        },

      ]
    };
  },

  computed: {
    active() {
      return this.selectedProject !== null ? this.uxProjects[this.selectedProject] : null;
    }
  },

  methods: {
    openProject(index) {
      if (this.uxProjects[index].title === 'AusHealth Dashboard') {
        this.$router.push('/ux/aushealth')
        return
      }
      this.selectedProject = index;
      this.browserIndex = {};
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },
    closeProject() {
      this.selectedProject = null;
      this.browserIndex = {};
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },
    setBrowserTab(sectionIndex, tabIndex) {
      this.browserIndex = { ...this.browserIndex, [sectionIndex]: tabIndex };
    },
  }
};
</script>

<style scoped>

/* ── PAGE HEADER ─────────────────────────────────────────────── */
.ux-header {
  width: 100%;
  padding: 8rem 6vw 5rem;
  background: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  margin-top: 70px;
}

.ux-header-inner { flex: 1; }

.ux-eyebrow {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
  margin-bottom: 1rem;
}

.ux-page-title {
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 900;
  line-height: 0.9;
  color: #000;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem 0;
  font-family: Arial, sans-serif;
}

.ux-page-desc {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  color: #666;
  line-height: 1.7;
  max-width: 480px;
  font-family: Arial, sans-serif;
  margin: 0;
}

.ux-header-count {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ccc;
  font-family: Arial, sans-serif;
  padding-bottom: 0.5rem;
}

/* ── PROJECT LIST ────────────────────────────────────────────── */
.ux-project-list {
  max-width: 100%;
}

.ux-project-row {
  display: grid;
  grid-template-columns: 1fr 42%;
  align-items: center;
  gap: 0;
  padding: 5rem 6vw;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  transition: background 0.25s ease;
  background: #fff;
}

.ux-project-row:hover { background: #fafafa; }

.ux-row-left {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  padding-right: 4rem;
}

.ux-row-number {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #ccc;
  font-family: Arial, sans-serif;
  padding-top: 0.4rem;
  flex-shrink: 0;
}

.ux-row-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ux-row-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ux-tag {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888;
  background: #f2f2f2;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-family: Arial, sans-serif;
}

.ux-tag--light {
  background: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.75);
}

.ux-tag--award {
  background: #000;
  color: #fff;
}

.ux-row-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  color: #000;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.02em;
  font-family: Arial, sans-serif;
}

.ux-row-desc {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.7;
  margin: 0;
  max-width: 480px;
  font-family: Arial, sans-serif;
}

.ux-row-cta {
  font-size: 0.82rem;
  font-weight: 700;
  color: #000;
  letter-spacing: 0.06em;
  font-family: Arial, sans-serif;
  border-bottom: 1.5px solid #000;
  padding-bottom: 1px;
  width: fit-content;
  transition: opacity 0.2s;
}

.ux-project-row:hover .ux-row-cta { opacity: 0.5; }

.ux-row-right {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 12px;
}

.ux-row-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  display: block;
  opacity: 1;
}

.ux-project-row:hover .ux-row-right img { transform: scale(1.04); }

.ux-award-badge {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: #000;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  font-family: Arial, sans-serif;
}

/* ── DETAIL: HERO ────────────────────────────────────────────── */
.ux-detail-hero {
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  margin-top: 70px;
}

.ux-detail-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  filter: brightness(0.45);
  opacity: 1;
}

.ux-detail-hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 4rem 6vw;
}

.ux-detail-hero-inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
}

.ux-detail-hero-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ux-detail-title {
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.03em;
  font-family: Arial, sans-serif;
}

.ux-detail-subtitle {
  font-size: clamp(0.9rem, 1.3vw, 1.1rem);
  color: rgba(255,255,255,0.7);
  line-height: 1.65;
  margin: 0;
  font-family: Arial, sans-serif;
  max-width: 600px;
}

/* ── DETAIL: BODY ────────────────────────────────────────────── */
.ux-detail-body {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.ux-back-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  color: #888;
  letter-spacing: 0.06em;
  font-family: Arial, sans-serif;
  padding: 0;
  margin-bottom: 3rem;
  transition: color 0.2s;
}

.ux-back-btn:hover { color: #000; }

/* Meta strip */
.ux-meta-strip {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 2rem 0;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 4rem;
}

.ux-meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.ux-meta-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
}

.ux-meta-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #000;
  font-family: Arial, sans-serif;
}

.ux-meta-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: #000;
  font-family: Arial, sans-serif;
  text-decoration: none;
  border-bottom: 1px solid #000;
}

/* Case study sections */
.ux-case-section {
  margin-bottom: 4rem;
}

/* Text section */
.ux-text-section {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 2rem;
  align-items: start;
}

.ux-text-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
  padding-top: 0.3rem;
}

.ux-text-content {
  font-size: 1rem;
  color: #333;
  line-height: 1.85;
  font-family: Arial, sans-serif;
}

.ux-text-content p { margin: 0 0 1.2rem 0; }
.ux-text-content p:last-child { margin-bottom: 0; }
.ux-text-content strong { color: #000; font-weight: 700; }

/* Tech pills */
.ux-tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ux-pill {
  font-size: 0.78rem;
  font-weight: 600;
  color: #333;
  background: #f2f2f2;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-family: Arial, sans-serif;
}

/* Image galleries */
.ux-gallery {
  margin: 0;
}

.ux-gallery--single img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  display: block;
  opacity: 1;
}

.ux-gallery--two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.ux-gallery--two-col img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  display: block;
  opacity: 1;
}

.ux-gallery-caption {
  font-size: 0.78rem;
  color: #aaa;
  font-family: Arial, sans-serif;
  margin: 0.75rem 0 0;
  letter-spacing: 0.04em;
}

/* Stats */
.ux-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 2.5rem 0;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
}

.ux-stat-number {
  font-size: 1.8rem;
  font-weight: 900;
  color: #000;
  line-height: 1;
  font-family: Arial, sans-serif;
}

.ux-stat-label {
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.4rem;
  font-family: Arial, sans-serif;
  line-height: 1.4;
}

/* Detail nav */
.ux-detail-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;
  border-top: 1px solid #e8e8e8;
  margin-top: 2rem;
}

.ux-next-btn {
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  font-family: Arial, sans-serif;
  padding: 0.85rem 2rem;
  border-radius: 999px;
  transition: background 0.25s ease;
}

.ux-next-btn:hover { background: #333; }

/* Timeline */
.ux-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.ux-timeline-step {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding-bottom: 2rem;
  position: relative;
}

.ux-timeline-step:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 19px;
  top: 32px;
  width: 1px;
  height: calc(100% - 8px);
  background: #e8e8e8;
}

.ux-timeline-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.ux-timeline-body {
  padding-top: 0.6rem;
}

.ux-timeline-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #000;
  font-family: Arial, sans-serif;
  margin-bottom: 0.35rem;
}

.ux-timeline-desc {
  font-size: 0.88rem;
  color: #666;
  line-height: 1.65;
  font-family: Arial, sans-serif;
}

/* List styling inside ux-text-content */
.ux-text-content ul {
  padding-left: 1.2rem;
  margin: 0.5rem 0 1rem;
}

.ux-text-content li {
  font-size: 1rem;
  color: #333;
  line-height: 1.75;
  margin-bottom: 0.5rem;
  font-family: Arial, sans-serif;
}

/* ── BROWSER MOCKUP ──────────────────────────────────────────── */
.ux-browser-wrap {
  width: 100%;
}

.ux-browser-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.ux-browser-tab {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 5px 16px;
  border-radius: 999px;
  border: 1.5px solid #e0e0e0;
  background: transparent;
  color: #888;
  cursor: pointer;
  font-family: Arial, sans-serif;
  letter-spacing: 0.04em;
  transition: all 0.18s ease;
}

.ux-browser-tab:hover {
  border-color: #aaa;
  color: #333;
}

.ux-browser-tab.active {
  background: #000;
  border-color: #000;
  color: #fff;
}

.ux-browser {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
}

.ux-browser-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #e8e8e8;
}

.ux-browser-dots {
  display: flex;
  gap: 5px;
  flex-shrink: 0;
}

.ux-browser-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
}

.ux-browser-dots span:nth-child(1) { background: #ff5f57; }
.ux-browser-dots span:nth-child(2) { background: #febc2e; }
.ux-browser-dots span:nth-child(3) { background: #28c840; }

.ux-browser-url {
  flex: 1;
  font-size: 0.72rem;
  color: #999;
  font-family: Arial, sans-serif;
  background: #fff;
  border-radius: 5px;
  padding: 4px 12px;
  border: 1px solid #e8e8e8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ux-browser-screen img {
  width: 100%;
  display: block;
}

/* Screen fade transition */
.screen-fade-enter-active,
.screen-fade-leave-active {
  transition: opacity 0.2s ease;
}

.screen-fade-enter-from,
.screen-fade-leave-to {
  opacity: 0;
}

/* ── TRANSITIONS ─────────────────────────────────────────────── */
.page-fade-enter-active,
.page-fade-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }

.page-fade-enter-from,
.page-fade-leave-to { opacity: 0; transform: translateY(12px); }

.page-fade-enter-to,
.page-fade-leave-from { opacity: 1; transform: translateY(0); }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ux-stats-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .ux-header {
    padding: 6rem 1.5rem 3rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .ux-project-row {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem;
    gap: 2rem;
  }

  .ux-row-left { padding-right: 0; }

  .ux-row-right { aspect-ratio: 16 / 9; }

  .ux-detail-hero { height: 50vh; }

  .ux-text-section {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .ux-gallery--two-col {
    grid-template-columns: 1fr;
  }

  .ux-meta-strip { gap: 1.5rem; }

  .ux-stats-row { grid-template-columns: 1fr 1fr; gap: 1.5rem; }

  .ux-detail-body { padding: 2rem 1.5rem 4rem; }

  .ux-detail-nav { flex-direction: column; gap: 1rem; align-items: flex-start; }

  .ux-browser-tab { font-size: 0.68rem; padding: 4px 12px; }
}
</style>