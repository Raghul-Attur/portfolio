<template>

  <!-- ── PAGE HEADER ───────────────────────────────────────── -->
  <div class="dg-header">
    <div class="dg-header-inner">
      <span class="dg-eyebrow">Portfolio</span>
      <h1 class="dg-page-title">Design<br>&amp; Branding</h1>
      <p class="dg-page-desc">
        Brand identity, campaigns, packaging, print, and digital — produced across agency and freelance environments over 6 years.
      </p>
    </div>
    <div class="dg-header-count">{{ filteredProjects.length }} Works</div>
  </div>

  <!-- ── FILTER TABS ───────────────────────────────────────── -->
  <div class="dg-filters">
    <button
      v-for="cat in categories"
      :key="cat"
      class="dg-filter-btn"
      :class="{ active: activeFilter === cat }"
      @click="setFilter(cat)"
    >{{ cat }}</button>
  </div>

  <!-- ── BENTO GRID ─────────────────────────────────────────── -->
  <transition name="grid-fade">
    <div v-if="selectedProject === null" class="dg-bento">
      <div
        v-for="(project, index) in filteredProjects"
        :key="project.code"
        class="dg-bento-card"
        :class="'dg-bento-card--' + project.size"
        @click="openProject(index)"
      >
        <div class="dg-bento-img">
          <img :src="project.image" :alt="project.title" loading="lazy" />
        </div>
        <div class="dg-bento-overlay">
          <div class="dg-bento-top">
            <span class="dg-bento-code">{{ project.code }}</span>
            <span class="dg-bento-cat-badge">{{ project.category }}</span>
          </div>
          <div class="dg-bento-bottom">
            <span class="dg-bento-client">{{ project.client }}</span>
            <h3 class="dg-bento-title">{{ project.title }}</h3>
            <p class="dg-bento-sub">{{ project.subtitle }}</p>
            <span class="dg-bento-cta">View Project &#x2197;</span>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- ── PROJECT DETAIL ────────────────────────────────────── -->
  <transition name="detail-fade">
    <div v-if="selectedProject !== null" class="dg-detail">

      <!-- Hero -->
      <div class="dg-detail-hero">
        <img :src="active.heroImage" :alt="active.title" loading="lazy" />
        <div class="dg-detail-hero-overlay">
          <div class="dg-detail-hero-inner">
            <span class="dg-detail-cat">{{ active.category }}</span>
            <h1 class="dg-detail-title">{{ active.title }}</h1>
            <p class="dg-detail-subtitle">{{ active.subtitle }}</p>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="dg-detail-body">

        <button class="dg-back-btn" @click="closeProject">&#x2190; Back to Projects</button>

        <!-- Meta -->
        <div class="dg-meta-strip">
          <div class="dg-meta-item">
            <span class="dg-meta-label">Client</span>
            <span class="dg-meta-value">{{ active.client }}</span>
          </div>
          <div class="dg-meta-item">
            <span class="dg-meta-label">Year</span>
            <span class="dg-meta-value">{{ active.year }}</span>
          </div>
          <div class="dg-meta-item">
            <span class="dg-meta-label">Category</span>
            <span class="dg-meta-value">{{ active.category }}</span>
          </div>
          <div class="dg-meta-item" v-if="active.tools">
            <span class="dg-meta-label">Tools</span>
            <span class="dg-meta-value">{{ active.tools }}</span>
          </div>
          <div class="dg-meta-item" v-if="active.deliverables">
            <span class="dg-meta-label">Deliverables</span>
            <span class="dg-meta-value">{{ active.deliverables }}</span>
          </div>
        </div>

        <!-- Sections -->
        <div
          v-for="(section, i) in active.sections"
          :key="i"
          class="dg-case-section"
        >
          <!-- Text section -->
          <template v-if="section.type === 'text'">
            <div class="dg-section-label">{{ section.label }}</div>
            <div class="dg-section-content" v-html="section.content"></div>
          </template>

          <!-- Single image -->
          <template v-else-if="section.type === 'image'">
            <img :src="section.src" :alt="section.alt || active.title" class="dg-section-img" loading="lazy" />
            <p v-if="section.caption" class="dg-img-caption">{{ section.caption }}</p>
          </template>

          <!-- Image grid -->
          <template v-else-if="section.type === 'grid'">
            <div class="dg-img-grid" :class="'dg-img-grid--' + (section.cols || 2)">
              <img
                v-for="(img, j) in section.images"
                :key="j"
                :src="img.src"
                :alt="img.alt || active.title"
                loading="lazy"
              />
            </div>
            <p v-if="section.caption" class="dg-img-caption">{{ section.caption }}</p>
          </template>

          <!-- Carousel / Stacked Deck -->
          <template v-else-if="section.type === 'carousel'">
            <div class="dg-deck-wrapper">
              <div class="dg-deck-stage">
                <div
                  v-for="(img, j) in section.images"
                  :key="j"
                  class="dg-deck-card"
                  :class="getDeckClass(j, section.images.length)"
                  :style="getDeckStyle(j, section.images.length)"
                  @click="j === getNextIndex(section.images.length) && nextSlide(section)"
                >
                  <img :src="img.src" :alt="img.alt || active.title" loading="lazy" />
                </div>
              </div>
              <div class="dg-deck-controls">
                <button class="dg-deck-btn dg-deck-btn--prev" @click="prevSlide(section)">
                  &#x2190;
                </button>
                <div class="dg-deck-info">
                  <span class="dg-deck-count">{{ carouselIndex + 1 }} <em>of</em> {{ section.images.length }}</span>
                  <span class="dg-deck-title">{{ section.images[carouselIndex].alt }}</span>
                </div>
                <button class="dg-deck-btn dg-deck-btn--next" @click="nextSlide(section)">
                  &#x2192;
                </button>
              </div>
              <div class="dg-deck-dots">
                <span
                  v-for="(img, j) in section.images"
                  :key="j"
                  class="dg-deck-dot"
                  :class="{ active: carouselIndex === j }"
                  @click="goToSlide(j)"
                ></span>
              </div>
            </div>
            <p v-if="section.caption" class="dg-img-caption">{{ section.caption }}</p>
          </template>

          <!-- TV Mockup Carousel -->
          <template v-else-if="section.type === 'tvcarousel'">
            <div class="dg-tv-wrap">
              <div class="dg-tv-frame">
                <div class="dg-tv-screen">
                  <transition name="tv-fade" mode="out-in">
                    <img
                      :key="tvIndex"
                      :src="section.images[tvIndex].src"
                      :alt="section.images[tvIndex].alt || active.title"
                      class="dg-tv-img"
                      loading="lazy"
                    />
                  </transition>
                </div>
                <div class="dg-tv-stand">
                  <div class="dg-tv-neck"></div>
                  <div class="dg-tv-base"></div>
                </div>
              </div>
              <div class="dg-tv-dots">
                <span
                  v-for="(img, j) in section.images"
                  :key="j"
                  class="dg-tv-dot"
                  :class="{ active: tvIndex === j }"
                  @click="tvIndex = j; resetTvTimer(section)"
                ></span>
              </div>
            </div>
            <p v-if="section.caption" class="dg-img-caption">{{ section.caption }}</p>
          </template>

          <!-- Easel Mockup -->
          <template v-else-if="section.type === 'easel'">
            <div class="dg-easel-wrap">
              <div
                v-for="(img, j) in section.images"
                :key="j"
                class="dg-easel-item"
                :class="j % 2 === 0 ? 'dg-easel-item--left' : 'dg-easel-item--right'"
              >
                <div class="dg-easel-frame">
                  <div class="dg-easel-board">
                    <div class="dg-easel-poster">
                      <img :src="img.src" :alt="img.alt || active.title" loading="lazy" />
                    </div>
                    <div class="dg-easel-clip"></div>
                  </div>
                  <div class="dg-easel-legs">
                    <div class="dg-easel-leg dg-easel-leg--l"></div>
                    <div class="dg-easel-leg dg-easel-leg--r"></div>
                    <div class="dg-easel-leg dg-easel-leg--b"></div>
                  </div>
                </div>
                <p class="dg-easel-label">{{ img.alt }}</p>
              </div>
            </div>
            <p v-if="section.caption" class="dg-img-caption" style="margin-top:0;">{{ section.caption }}</p>
          </template>

        </div>

        <!-- Nav -->
        <div class="dg-detail-nav">
          <button class="dg-back-btn" @click="closeProject">&#x2190; All Projects</button>
          <button
            v-if="selectedProject < filteredProjects.length - 1"
            class="dg-next-btn"
            @click="openProject(selectedProject + 1)"
          >Next Project &#x2192;</button>
        </div>

      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Design',

  data() {
    return {
      activeFilter: 'All',
      selectedProject: null,
      carouselIndex: 0,
      tvIndex: 0,
      tvTimer: null,

      categories: ['All', 'Branding', 'Campaign', 'Packaging', 'Social', 'Print', 'Digital'],

      projects: [

        // ── PHPROJECCT ────────────────────────────────────────
        {
          code: 'DS-01',
          title: 'pH Projecct',
          subtitle: 'Brand identity for a high-fashion apparel label',
          client: 'Freelance',
          year: '2022',
          category: 'Branding',
          tools: 'Adobe Illustrator, Photoshop',
          deliverables: 'Logo system, typography guidelines, colour palette, brand collateral, runway applications',
          size: 'wide',
          image: '/images/design/ph-01.jpg',
          heroImage: '/images/design/ph-01.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>pH Projecct is a modern fashion label born from the creative collaboration of Pushkal Prasad and Harrshi Padmanabhan. The brand positions itself as a contemporary force in the high-fashion space, targeting audiences who value visual minimalism alongside expressive, editorial-forward aesthetics. The brief was to build a complete identity system that felt luxurious, experimental, and timeless — while resonating with a youthful, design-conscious demographic.</p>'
            },
            {
              type: 'text',
              label: 'Strategic Positioning',
              content: '<p>The name pH Projecct carries a deliberate double meaning. It derives from the founders initials and references the concept of pH balance — harmony through contrast. This idea became the brand\'s core visual language: every decision explored a tension between opposites. Serif vs. sans-serif. Dark vs. light. Structure vs. freedom. Utility vs. ornament.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/ph-02.jpg', alt: 'Founders vision and brand introduction' },
                { src: '/images/design/ph-03.jpg', alt: 'Visual mood and material textures' },
              ],
              caption: 'Brand mood and founder narrative — editorial tone established from the outset'
            },
            {
              type: 'text',
              label: 'Identity System',
              content: '<p>The logo system was developed with multiple lockups, spacing guides, and glyph specifications. The primary wordmark incorporates an extended descender on the j — instantly recognisable while retaining typographic integrity. Plus signs were used throughout as a compositional tool, representing the collaborative founding spirit.</p><p>Typography pairs Bodoni 72 Oldstyle for hero headers and editorial pull quotes with Gotham for body content. The monochrome palette of black, off-white, and soft grey creates a versatile backdrop for editorial applications.</p>'
            },
            {
              type: 'grid',
              cols: 3,
              images: [
                { src: '/images/design/ph-04.jpg', alt: 'Logo lockups and applications' },
                { src: '/images/design/ph-05.jpg', alt: 'Typography system' },
                { src: '/images/design/ph-06.jpg', alt: 'Colour palette' },
              ],
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/ph-07.jpg', alt: 'Brand application' },
                { src: '/images/design/ph-08.jpg', alt: 'Runway application' },
              ],
            },
            {
              type: 'image',
              src: '/images/design/ph-09.jpg',
              caption: 'Final brand system extended across touchpoints — from runway invitations to care labels'
            },
          ]
        },

        // ── AYRA MANE ─────────────────────────────────────────
        {
          code: 'DS-02',
          title: 'Ayra Mané',
          subtitle: 'Logo and brand identity for a heritage homestay in Coorg',
          client: 'Freelance',
          year: '2021',
          category: 'Branding',
          tools: 'Adobe Illustrator, Photoshop',
          deliverables: 'Logo, colour system, typography, guest touchpoints (signage, linen, packaging, collateral)',
          size: 'tall',
          image: '/images/design/ayra-01.jpg',
          heroImage: '/images/design/ayra-01.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Ayra Mané is a heritage homestay in the scenic hills of Coorg — coffee estates, tranquil greenery, and cultural depth. The brief was to craft a visual identity that captured the soul of the estate: rooted in tradition, refined in its hospitality. The design needed to balance rustic charm with a luxury feel that matched the authentic experiences the property promises.</p>'
            },
            {
              type: 'text',
              label: 'Design Direction',
              content: '<p>The logo symbol draws from traditional Kolam patterns — sacred geometries drawn outside homes in South India — representing hospitality, harmony, and rootedness. The pattern was stylised with a clean geometric grid to maintain elegance alongside tradition. This same geometric discipline extended to the layout grid and spatial system across all brand materials.</p><p>The colour palette reflects the Coorg environment directly: rich forest greens, muted browns, natural beige, deep charcoal, and off-white. Typography pairs a heritage serif with contemporary legibility.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/ayra-02.jpg', alt: 'Logo grid and construction' },
                { src: '/images/design/ayra-03.jpg', alt: 'Textile and cushion mockup' },
              ],
            },
            {
              type: 'grid',
              cols: 3,
              images: [
                { src: '/images/design/ayra-04.jpg', alt: 'Colour palette' },
                { src: '/images/design/ayra-05.jpg', alt: 'Brand application' },
                { src: '/images/design/ayra-06.jpg', alt: 'Guest touchpoints' },
              ],
              caption: 'Colour system derived directly from the Coorg environment — forest greens, estate browns, natural beige'
            },
            {
              type: 'text',
              label: 'Applications',
              content: '<p>The identity was applied across every guest touchpoint — slippers, mugs, soaps, towels, room signage, and print collateral. Visual consistency across these elements ensured a cohesive and elevated environment from arrival to departure. A final set of postcard-style visuals pays tribute to the timeless, memory-making experiences guests take home.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/ayra-07.jpg', alt: 'Postcards and collateral' },
                { src: '/images/design/ayra-08.jpg', alt: 'Final brand applications' },
              ],
            },
          ]
        },

        // ── PREVENTIKA ────────────────────────────────────────
        {
          code: 'DS-03',
          title: 'Preventika',
          subtitle: 'Branding and packaging for effervescent hygiene tablets',
          client: 'Sanmed (Freelance)',
          year: '2022',
          category: 'Packaging',
          tools: 'Adobe Illustrator, Photoshop',
          deliverables: 'Logo, packaging artwork, brand identity, marketing collateral, OOH advertising',
          size: 'normal',
          image: '/images/design/Preventika-01.jpg',
          heroImage: '/images/design/Preventika-01.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Preventika is part of Sanmed&#39;s product line introducing effervescent disinfectant tablets for domestic use. With the Indian market still largely unfamiliar with this product format, the branding and packaging were designed to create awareness, educate users, and position the product as a modern alternative to conventional disinfectants.</p>'
            },
            {
              type: 'text',
              label: 'Design Thinking',
              content: '<p>The brief called for a visual identity that read as safe, modern, and trustworthy while being approachable enough for first-time users. Rather than following the blue-and-white conventions of the Indian hygiene market, a high-contrast yellow and black system was developed to make Preventika immediately recognisable on shelf. The bold colour choice signals efficacy and confidence, while the dot-pattern motif across all packaging references the molecular structure of the active ingredient, giving the brand a science-forward visual language without feeling clinical.</p><p>The system was designed to scale across multiple product formats — tube labels, bulk tubs, and antimicrobial cards — all sharing the same typographic rhythm, icon language, and colour blocking. Each format reads as part of the same family while being optimised for its own packaging shape and retail context.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/Preventika-02.jpg', alt: 'Logo variations' },
                { src: '/images/design/Preventika-03.jpg', alt: 'Business cards' },
              ],
              caption: 'Logo system and brand identity — dot motif references the molecular structure of the active ingredient'
            },
            {
              type: 'image',
              src: '/Label_Mocks.jpg',
              caption: 'Tube label packaging — high-contrast yellow and black system designed to stand out in a crowded hygiene category'
            },
            {
              type: 'image',
              src: '/Tub_Mocks_Mocks.jpg',
              caption: 'Bulk tub format — the same visual language scaled to a larger retail and agricultural distribution format'
            },
            {
              type: 'image',
              src: '/Sanitary_card.jpg',
              caption: 'Antimicrobial card packaging — a secondary product line maintaining full brand consistency at a compact card format'
            },
            {
              type: 'grid',
              cols: 3,
              images: [
                { src: '/images/design/Preventika-04.jpg', alt: 'Packaging design detail' },
                { src: '/images/design/Preventika-05.jpg', alt: 'Packaging mockup' },
                { src: '/images/design/Preventika-06.jpg', alt: 'OOH advertising' },
              ],
              caption: 'Full packaging range and outdoor advertising — cohesive system launched across retail, collateral, and OOH'
            },
          ]
        },

        // ── VILLGRO ───────────────────────────────────────────
        {
          code: 'DS-04',
          title: 'Villgro iPitch',
          subtitle: 'Social impact campaign for inclusive entrepreneurship funding',
          client: 'Smitten Worldwide / Villgro',
          year: '2021',
          category: 'Campaign',
          tools: 'Adobe Illustrator, Photoshop',
          deliverables: 'Social media campaign, hero posts, partner posts, Instagram Stories, calls to action',
          size: 'wide',
          image: '/images/design/Villgro-01.jpg',
          heroImage: '/images/design/Villgro-01.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Villgro\'s iPitch 2021 campaign aimed to scale funding accessibility for social entrepreneurs across India. The initiative involved several funding partners targeting education, agriculture, clean tech, and more. The task was to create a social media campaign that communicated credibility, sector diversity, and urgency for application — cohesive, shareable, and immediately legible in a crowded social feed.</p>'
            },
            {
              type: 'text',
              label: 'Design Strategy',
              content: '<p>A modular identity system was developed using abstract geometric icons to represent core sectors — leaves for agriculture, crosses for health, books for education. Each colour block followed a grid-based system allowing flexibility across social formats while maintaining brand consistency. Vibrant flat colours and clean typography ensured legibility and impact across Instagram and LinkedIn.</p><p>The system was designed to scale quickly — every post reused the same visual framework with variations in colour and icon placement, keeping production efficient without sacrificing quality.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/Villgro-02.jpg', alt: 'Colour-coded campaign variants' },
                { src: '/images/design/Villgro-03.jpg', alt: 'Instagram Story mockup' },
              ],
              caption: 'Modular grid system — each sector gets its own colour block and icon while remaining visually cohesive across the campaign'
            },
          ]
        },

        // ── CHITRAM ───────────────────────────────────────────
        {
          code: 'DS-05',
          title: "Chitra'm",
          subtitle: 'Packaging design blending Indian heritage with artisanal craft',
          client: 'Smitten Worldwide',
          year: '2021',
          category: 'Packaging',
          tools: 'Adobe Illustrator, Photoshop',
          deliverables: 'Packaging system, flavour-specific label artwork, brand identity, retail and gift packaging',
          size: 'tall',
          image: '/images/design/chitram-01.jpg',
          heroImage: '/images/design/chitram-01.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Chitra\'m craft chocolates began as a tribute to the founder\'s late mother, Chitra. The brand was built around a desire to create artisanal chocolates tailored to the Indian palette while representing deep-rooted heritage through visual storytelling. The packaging had to appeal to both the local market and a global audience where handcrafted visual identity carries significant weight.</p>'
            },
            {
              type: 'text',
              label: 'Design Direction',
              content: '<p>Raja Ravi Varma\'s iconic paintings of Indian women served as the visual anchor — chosen for their emotive depth and ability to establish cultural and emotional connection. To balance this classical foundation, the packaging introduced modern digital art elements including geometric forms and molecular motifs, visually representing the fusion of tradition and culinary science behind the chocolate-making process.</p>'
            },
            {
              type: 'image',
              src: '/images/design/chitram-03.jpg',
              caption: 'Packaging detail — each variant uses motifs from Raja Ravi Varma alongside molecular and geometric elements'
            },
            {
              type: 'text',
              label: 'Colour System',
              content: '<p>Each flavour variant has its own colour palette extracted directly from its key ingredient — lemons and moringa for the white chocolate, rich reds and earth tones for the dark palm sugar variant. Every flavour feels distinct while remaining unmistakably part of the same brand system. Chitra\'m becomes more than packaging — it functions as a cultural artifact that bridges Indian storytelling and contemporary aesthetics.</p>'
            },
            {
              type: 'image',
              src: '/images/design/chitram-02.jpg',
              caption: 'Final packaging system — cohesive across flavours while each variant carries its own visual identity'
            },
          ]
        },

        // ── LO.CL ─────────────────────────────────────────────
        {
          code: 'DS-06',
          title: 'LO.CL',
          subtitle: 'Ad campaign for a hyperlocal event discovery app',
          client: 'Freelance',
          year: '2022',
          category: 'Campaign',
          tools: 'Adobe Illustrator, Photoshop',
          deliverables: 'OOH poster series, newspaper spreads, magazine ads, digital banners, social assets',
          size: 'normal',
          image: '/images/design/locl-01.jpg',
          heroImage: '/images/design/locl-01.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>LO.CL is a location-based social platform connecting users to nearby events, places, and shared experiences. The campaign brief was to visually portray how the app enhances everyday decisions — finding a cycling route, a new café, what\'s trending nearby. Each visual captures moments of curiosity, exploration, and spontaneity.</p>'
            },
            {
              type: 'text',
              label: 'Visual Strategy',
              content: '<p>Strong principles of contrast, emphasis, and balance drive every execution. Centre-aligned compositions, embedded UI overlays, and natural colour gradients keep the visuals grounded in real life while feeling modern and dynamic. Each ad reimagines a common search behaviour — near me — in a way that places the user inside the LO.CL experience rather than outside looking in.</p><p>The campaign was designed for multi-channel presence. Ads were customised for bus stop shelters, newspaper spreads, magazine columns, and digital banners. UI elements from the app were embedded directly into real-world photography to blur the line between discovery and reality.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/locl-02.jpg', alt: 'Newspaper ad — content discovery' },
                { src: '/images/design/locl-03.jpg', alt: 'Social feed poster — dining discovery' },
              ],
            },
            {
              type: 'image',
              src: '/images/design/locl-04.jpg',
              caption: 'Magazine ad — coffee culture. Minimal typography, lifestyle imagery, and embedded UI reinforce the idea of LO.CL as an intuitive social layer over everyday life.'
            },
          ]
        },

        // ── FUNSKOOL ──────────────────────────────────────────
        {
          code: 'DS-07',
          title: 'Funskool Campaign',
          subtitle: 'Animated social campaign — 125% engagement increase',
          client: 'Smitten Worldwide / Funskool',
          year: '2022',
          category: 'Campaign',
          tools: 'After Effects, Illustrator, Photoshop',
          deliverables: 'Animated Reels, Stories, product launch posts, motion template library',
          size: 'wide',
          image: '/Design-thumb-1.png',
          heroImage: '/Design-thumb-1.png',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Animated social campaign for Funskool that drove a 125% increase in account engagement over six months. The account moved from static product posts to motion-first content — short looping animations designed specifically for Reels and Stories. Modular animation templates were built in After Effects to allow rapid adaptation across different products and promotions.</p>'
            },
            {
              type: 'text',
              label: 'Approach',
              content: '<p>Animation was treated as the brief from the start, not a finishing layer. Posts were designed as 15-30 second looping sequences paced for mobile-first viewing. A consistent visual system was maintained across all posts to build brand recognition over time, compounding the engagement numbers across the campaign period.</p>'
            },
          ]
        },

        // ── JW MARRIOTT ───────────────────────────────────────
        {
          code: 'DS-08',
          title: 'JW Marriott',
          subtitle: 'In-hotel display TV slides and digital content for two restaurant launches',
          client: 'Smitten Worldwide / JW Marriott Bengaluru',
          year: '2021–2023',
          category: 'Social',
          tools: 'Photoshop, Illustrator',
          deliverables: 'In-hotel display TV slides, digital signage, restaurant launch content',
          size: 'wide',
          image: '/JWM_TV_01.jpg',
          heroImage: '/JWM_TV_01.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Digital signage and display TV content for JW Marriott Bengaluru, produced across a two-year engagement at Smitten Worldwide. These slides were designed for in-hotel screens throughout the property — lobby areas, elevator banks, and guest corridors — to promote restaurant launches and F&amp;B offerings to hotel guests.</p><p>Two distinct campaigns were produced. ALBA is the hotel&#39;s fine dining Mediterranean restaurant, requiring a dark, editorial aesthetic with full-bleed food photography and restrained typography. The Bengaluru Baking Co (BBC) is a lobby-level patisserie with a warmer, heritage-influenced tone — cream backgrounds, a custom logotype, and a more relaxed typographic system. Both campaigns maintained JW Marriott&#39;s global brand standards while developing distinct visual identities for each venue.</p>'
            },
            {
              type: 'text',
              label: 'Design Approach',
              content: '<p>Display TV content operates differently from social media — screens are viewed at distance and in passing, so the hierarchy needs to resolve immediately. The split-layout system used across both campaigns divides photography on the left from information on the right, ensuring both panels read clearly at any viewing distance. Typography is set large and tracked wide to hold legibility on low-resolution hotel display screens.</p>'
            },
            {
              type: 'tvcarousel',
              images: [
                { src: '/JWM_TV_01.jpg', alt: 'ALBA — Restaurant launch, Mediterranean cuisine' },
                { src: '/JWM_TV_03.jpg', alt: 'ALBA — Fine dining, nouvelle Mediterranean' },
                { src: '/JWM_TV_06.jpg', alt: 'BBC — Bengaluru Baking Co, food spread' },
                { src: '/JWM_TV_02.jpg', alt: 'BBC — Pastry and coffee launch' },
                { src: '/JWM_TV_04.jpg', alt: 'BBC — Restaurant interior, lobby level' },
                { src: '/JWM_TV_05.jpg', alt: 'BBC — Signature cocktail' },
              ],
              caption: 'ALBA (slides 1-2) and Bengaluru Baking Co (slides 3-6) — in-hotel display TV campaigns for JW Marriott Bengaluru'
            },
          ]
        },

        // ── WESTIN ────────────────────────────────────────────
        {
          code: 'DS-09',
          title: 'Westin Hotels',
          subtitle: 'Print campaign collateral for F&B events at Westin Chennai Velachery',
          client: 'Smitten Worldwide / The Westin Chennai',
          year: '2021–2022',
          category: 'Print',
          tools: 'Adobe InDesign, Illustrator, Photoshop',
          deliverables: 'Event posters, promotional print collateral, F&B campaign materials',
          size: 'wide',
          image: '/Westin_Navratri.jpg',
          heroImage: '/Westin_Navratri.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Print campaign collateral for F&amp;B events at The Westin Chennai Velachery, produced at Smitten Worldwide. Work spanned seasonal dining promotions, festival campaigns, and restaurant event advertising — all within the Westin and Marriott Bonvoy brand system while being adapted for local market messaging.</p><p>Two key campaigns shown here. The New Year Brunch poster for Seasonal Tastes uses a bright, food-centric flat-lay composition — scattered dishes and ingredients surrounding a bold typographic centrepiece. The Navratri Thali campaign takes a completely different tone: warm wood textures, a hero overhead shot of the thali spread, and script typography with cultural warmth to match the occasion.</p>'
            },
            {
              type: 'text',
              label: 'Design Approach',
              content: '<p>Both pieces needed to work as standalone print advertisements and as digital social assets — designed at A3 portrait format with enough visual density to hold attention at small sizes on a phone screen and at full poster scale on a noticeboard. The brand lockup hierarchy places Seasonal Tastes and The Westin together, maintaining Marriott global brand standards while giving each campaign its own personality through photography selection, colour temperature, and typographic tone.</p>'
            },
            {
              type: 'easel',
              images: [
                { src: '/Westin_NY_Brunch.jpg', alt: 'New Year Brunch — Seasonal Tastes, Westin Chennai' },
                { src: '/Westin_Navratri.jpg', alt: 'Navratri Thali campaign — Westin Chennai Velachery' },
              ],
              caption: 'New Year Brunch poster (2022) and Navratri Thali campaign (2021) — F&B print collateral for The Westin Chennai Velachery'
            },
          ]
        },

        // ── AYUNI ─────────────────────────────────────────────
        {
          code: 'DS-10',
          title: 'Ayuni',
          subtitle: 'Brand identity and packaging for a Middle Eastern condiment brand',
          client: 'Freelance',
          year: '2023',
          category: 'Packaging',
          tools: 'Adobe Illustrator, Photoshop',
          deliverables: 'Logo, wordmark, bottle label system, shopping bag, brand collateral',
          size: 'normal',
          image: '/images/design/ayuni-packaging.jpg',
          heroImage: '/images/design/ayuni-packaging.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Ayuni is a Middle Eastern condiment brand built around Amba — a pickled and spiced mango sauce with roots in Iraqi and Levantine cuisine. The brief called for a complete identity system that could carry the brand across retail packaging and physical touchpoints while positioning it for a modern international audience unfamiliar with the product.</p><p>The name Ayuni (عيوني) means "my eyes" in Arabic — a term of deep endearment. The brand leans into that warmth: familiar, inviting, and rooted in cultural pride without being inaccessible.</p>'
            },
            {
              type: 'text',
              label: 'Logo & Wordmark',
              content: '<p>The wordmark was designed as a custom lettering system, not a typeface selection. The letters of "ayuni" are drawn with flowing, continuous strokes that echo Arabic calligraphic forms while reading clearly in the Latin script. The descender of the "y" loops through the "u" and "n" of the second syllable, connecting both halves of the word into a single interlocking mark. A filled dot anchors the junction point — functioning both as a visual punctuation and a subtle nod to the dot forms in Arabic script.</p><p>The result is a logo that carries cultural specificity without relying on literal Arabesque ornamentation. It works at the small scale of a bottle label and scales cleanly to the large format of a shopping bag.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/ayuni-logo.jpg', alt: 'Ayuni wordmark — custom lettering system' },
                { src: '/images/design/ayuni-bag.jpg', alt: 'Shopping bag application' },
              ],
              caption: 'Custom wordmark with interlocking letterforms — applied across the shopping bag alongside the brand\'s landscape silhouette motif'
            },
            {
              type: 'text',
              label: 'Packaging System',
              content: '<p>Three heat variants were developed for the Amba Sauce range — Mild, Spicy, and Lava. Each bottle uses a distinct background colour drawn directly from the sauce inside: golden yellow for Mild, orange for Spicy, and deep red-orange for Lava. This gives the range immediate shelf legibility — customers can identify their heat level at a glance without reading copy.</p><p>The label centres the Ayuni wordmark set inside a mango silhouette, which doubles as a brand icon across all packaging. Below the logo, the heat level is called out in a high-contrast black band — bold, unambiguous, and consistent across the range. The bottom of each label carries a cityscape silhouette of Middle Eastern architecture with palm trees, grounding the brand in its cultural origin without being heavy-handed.</p><p>Typography throughout is confident and utilitarian — the product descriptor "Pickled and Spiced Mango" sits in a tight tracking above the product name, and the variant band reads clearly at bottle scale and on-shelf at distance.</p>'
            },
            {
              type: 'image',
              src: '/images/design/ayuni-packaging.jpg',
              caption: 'Amba Sauce range — Spicy, Mild, and Lava variants. Colour-coded by heat level with consistent label architecture across the range.'
            },
            {
              type: 'text',
              label: 'Brand Language',
              content: '<p>Across the shopping bag, a wave-form landscape silhouette runs along the base — palm trees rising from a dark undulating ground plane, with the Ayuni dot motif appearing again as a compositional element. The pale blue-grey of the bag grounds the brand outside of the warm condiment palette, giving the identity room to breathe across a wider set of touchpoints.</p><p>The overall system is intentionally minimal. The logo does the heavy lifting of cultural storytelling; the packaging system then uses colour and silhouette as fast-read signals. Both layers work together to make Ayuni feel credible on a retail shelf and considered in the hand.</p>'
            },
          ]
        },

        // ── CORPORATE CHEMISTRY ───────────────────────────────
        {
          code: 'DS-15',
          title: 'Corporate Chemistry',
          subtitle: 'Pitch deck design for a talent acquisition and recruitment firm',
          client: 'Smitten Worldwide / Corporate Chemistry',
          year: '2021',
          category: 'Digital',
          tools: 'Adobe Illustrator, Photoshop',
          deliverables: '16-slide pitch deck, brand-consistent design system, presentation-ready files',
          size: 'normal',
          image: '/CC_Slide_5.jpg',
          heroImage: '/CC_Slide_1.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Pitch deck design for Corporate Chemistry, a talent acquisition and recruitment firm specialising in mid to senior-level placements across industries. The deck was built to communicate the brand&#39;s positioning, methodology, and client experience to potential business partners and investors.</p><p>The design system uses a high-energy yellow and light grey palette with bold sans-serif typography, geometric abstract shapes, and custom line icon illustrations. The visual language needed to feel confident and modern without being cold — the brand&#39;s core idea of making hiring human called for warmth alongside professionalism.</p>'
            },
            {
              type: 'text',
              label: 'Design System',
              content: '<p>A modular slide template was developed so each section of the deck could be adapted quickly while maintaining visual consistency. Yellow is used as a full-bleed background for high-impact statements, and as an accent colour against grey for data-heavy slides. Custom illustrations across the deck replace stock photography, keeping the visual language ownable and consistent throughout.</p>'
            },
            {
              type: 'carousel',
              images: [
                { src: '/CC_Slide_1.jpg', alt: 'Cover slide' },
                { src: '/CC_Slide_2.jpg', alt: 'Intro — Is hiring an art or a science?' },
                { src: '/CC_Slide_3.jpg', alt: 'In a word, it is chemistry' },
                { src: '/CC_Slide_4.jpg', alt: 'Mission' },
                { src: '/CC_Slide_5.jpg', alt: 'USP — Making Hiring Human' },
                { src: '/CC_Slide_6.jpg', alt: 'Here is how we do it' },
                { src: '/CC_Slide_7.jpg', alt: 'Finding the spark' },
                { src: '/CC_Slide_8.jpg', alt: 'Our Services' },
                { src: '/CC_Slide_9.jpg', alt: 'For Candidates — Consulting' },
                { src: '/CC_Slide_10.jpg', alt: 'For Candidates — Grooming' },
                { src: '/CC_Slide_11.jpg', alt: 'For Candidates — Interviewing' },
                { src: '/CC_Slide_12.jpg', alt: 'For Companies — Sourcing' },
                { src: '/CC_Slide_13.jpg', alt: 'For Companies — Shortlisting' },
                { src: '/CC_Slide_14.jpg', alt: 'For Companies — Interviewing' },
                { src: '/CC_Slide_15.jpg', alt: 'Brand Experience' },
                { src: '/CC_Slide_16.jpg', alt: 'Contact Details' },
              ],
              caption: 'Use the arrows or dots to browse all 16 slides'
            },
          ]
        },

        // ── JW MARRIOTT COLOMBO ───────────────────────────────
        {
          code: 'DS-16',
          title: 'Flavours of Colombo',
          subtitle: 'Trifold brochure and menu design for a Sri Lankan food festival at JW Marriott',
          client: 'Smitten Worldwide / JW Marriott',
          year: '2022',
          category: 'Print',
          tools: 'Adobe InDesign, Photoshop, Illustrator',
          deliverables: 'Trifold brochure, menu design, print-ready files',
          size: 'normal',
          image: '/JW_Colombo_2.jpg',
          heroImage: '/JW_Colombo_1.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Trifold brochure and menu design for Flavours of Colombo, a Sri Lankan food festival hosted at JW Kitchen, JW Marriott Bengaluru. The brief was to create a premium printed piece that felt culturally immersive — transporting guests to Colombo through the design before they even sat down to eat.</p><p>The visual language centres on a watercolour treatment of aerial coastal photography, evoking the beaches, ocean, and landscape of Sri Lanka. Illustrated birds in flight carry across all three panels, tying the folded piece together as a single composition when opened flat. The result sits between editorial and hospitality design — refined enough for a five-star property while warm enough to feel like a genuine celebration of the cuisine.</p>'
            },
            {
              type: 'text',
              label: 'Design Approach',
              content: '<p>The challenge with trifold print is designing for two states simultaneously — the folded cover view and the fully open spread. The watercolour imagery was positioned to bleed across all three panels so the piece reads as one cohesive landscape when unfolded. The cover leads with the JW Kitchen and JW Marriott lockup alongside a bold serif headline, anchored by a photography composite of the Colombo Lotus Tower, palm trees, and a hero dish of curried crab.</p><p>Inside, the menu type hierarchy was set in a combination of serif headings and light body text to maintain an editorial tone throughout. The colour palette of muted navy, soft teal, and cream keeps the piece feeling premium without competing with the food imagery.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/JW_Colombo_1.jpg', alt: 'Trifold brochure open spread' },
                { src: '/JW_Colombo_2.jpg', alt: 'Trifold brochure cover close-up' },
              ],
              caption: 'Trifold menu for Flavours of Colombo — watercolour coastal photography carries across all three panels as a single composition'
            },
          ]
        },

        // ── DOUBLETREE BILLBOARD ──────────────────────────────
        {
          code: 'DS-14',
          title: 'DoubleTree Billboard',
          subtitle: 'OOH billboard campaign for Level 12 rooftop bar at DoubleTree by Hilton',
          client: 'Smitten Worldwide / DoubleTree by Hilton',
          year: '2021',
          category: 'Print',
          tools: 'Adobe Photoshop, Illustrator',
          deliverables: 'OOH billboard artworks, multiple copy variants, print-ready files',
          size: 'wide',
          image: '/Doubletree_Billboard_1.jpg',
          heroImage: '/Doubletree_Billboard_1.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>OOH billboard campaign for Level 12, the rooftop bar at DoubleTree by Hilton Pune, Chinchwad. The campaign promoted the venue as a premium destination with a promotional offer, designed to drive footfall through outdoor advertising across the city.</p><p>Two distinct creative directions were developed for the campaign. The first uses a dark navy palette with gold typography, a split-format layout pairing a venue photograph with bold copy and a promotional CTA. The second shifts to a lighter, more aspirational tone — white space, script typography, and a rooftop lifestyle image — leading with the emotional appeal before the offer. Both executions were built within DoubleTree and Hilton brand guidelines while giving Level 12 its own distinct visual identity as a venue property.</p>'
            },
            {
              type: 'text',
              label: 'Design Approach',
              content: '<p>Billboard design operates on a two-second read. The layout hierarchy was structured to land in order: venue name, key message, then offer. The split composition with the venue photograph on one half and copy on the other gives each billboard visual weight and legibility at distance without relying on the image alone to communicate. Typography was sized and tracked for maximum impact at large-format print scale.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/Doubletree_Billboard_1.jpg', alt: 'Level 12 billboard, dark navy variant' },
                { src: '/Doubletree_Billboard_2.jpg', alt: 'Level 12 billboard, light aspirational variant' },
              ],
              caption: 'Two creative directions — dark and premium for the discount CTA variant, light and lifestyle-led for the brand awareness variant'
            },
          ]
        },

        // ── ALBUM ARTWORK ─────────────────────────────────────
        {
          code: 'DS-13',
          title: 'Album Artwork',
          subtitle: 'Single covers for independent Indian hip-hop and R&B artists',
          client: 'Freelance',
          year: '2017, 2020',
          category: 'Branding',
          tools: 'Adobe Photoshop, Illustrator',
          deliverables: 'Single cover artwork, digital and print-ready files',
          size: 'wide',
          image: '/Audacity.jpg',
          heroImage: '/Audacity.jpg',
          sections: [
            {
              type: 'text',
              label: 'Overview',
              content: '<p>Two single covers designed for independent Indian artists working in hip-hop and R&amp;B. The brief for both was to create artwork that felt contemporary and shelf-ready, visuals that could sit alongside international releases without looking like an afterthought.</p><p>Each cover was built around the artist&#39;s visual identity and the emotional tone of the track. Audacity leans into a laid-back, sun-drenched energy with a teal palette, stacked display typography, and a candid street photograph that captures the looseness of the song. Kanave goes editorial and cinematic, with a warm gradient, floating abstract forms, and a digitally treated portrait that gives the cover a magazine-style finish.</p><p>Independent music in India is often underserved on the visual side. These were designed to close that gap: bold enough to read as a thumbnail on Spotify, refined enough to hold up at physical print size.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/Audacity.jpg', alt: 'Audacity, Shaq-T ft. DaSka single cover' },
                { src: '/Kanave.jpg', alt: 'Kanave, Shakthi Karthik single cover' },
              ],
              caption: 'Audacity by Shaq-T ft. DaSka (2020) and Kanave by Shakthi Karthik (2017)'
            },
          ]
        },

      ],
    };
  },

  computed: {
    filteredProjects() {
      if (this.activeFilter === 'All') return this.projects;
      return this.projects.filter(p => p.category === this.activeFilter);
    },
    active() {
      return this.selectedProject !== null ? this.filteredProjects[this.selectedProject] : null;
    },
  },

  methods: {
    setFilter(cat) {
      this.activeFilter = cat;
      this.selectedProject = null;
    },
    prevSlide(section) {
      this.carouselIndex = (this.carouselIndex - 1 + section.images.length) % section.images.length;
    },
    nextSlide(section) {
      this.carouselIndex = (this.carouselIndex + 1) % section.images.length;
    },
    goToSlide(index) {
      this.carouselIndex = index;
    },
    getNextIndex(total) {
      return (this.carouselIndex + 1) % total;
    },
    getDeckClass(j, total) {
      const offset = (j - this.carouselIndex + total) % total;
      if (offset === 0) return 'dg-deck-card--active';
      if (offset === 1) return 'dg-deck-card--next';
      if (offset === 2) return 'dg-deck-card--next2';
      return 'dg-deck-card--hidden';
    },
    getDeckStyle(j, total) {
      const offset = (j - this.carouselIndex + total) % total;
      if (offset === 0) return { zIndex: 10, transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)', opacity: 1 };
      if (offset === 1) return { zIndex: 7, transform: 'translateX(18px) translateY(-10px) rotate(2deg) scale(0.97)', opacity: 0.85 };
      if (offset === 2) return { zIndex: 4, transform: 'translateX(32px) translateY(-18px) rotate(4deg) scale(0.94)', opacity: 0.6 };
      return { zIndex: 1, transform: 'translateX(40px) translateY(-22px) rotate(5deg) scale(0.92)', opacity: 0 };
    },
    openProject(index) {
      this.selectedProject = index;
      this.carouselIndex = 0;
      this.tvIndex = 0;
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.startTvTimer();
      });
    },
    closeProject() {
      this.selectedProject = null;
      this.clearTvTimer();
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },
    startTvTimer() {
      this.clearTvTimer();
      const section = this.active && this.active.sections
        ? this.active.sections.find(s => s.type === 'tvcarousel')
        : null;
      if (!section) return;
      this.tvTimer = setInterval(() => {
        this.tvIndex = (this.tvIndex + 1) % section.images.length;
      }, 3500);
    },
    clearTvTimer() {
      if (this.tvTimer) { clearInterval(this.tvTimer); this.tvTimer = null; }
    },
    resetTvTimer(section) {
      this.clearTvTimer();
      this.tvTimer = setInterval(() => {
        this.tvIndex = (this.tvIndex + 1) % section.images.length;
      }, 3500);
    },
  },

  unmounted() {
    this.clearTvTimer();
  },
};
</script>

<style scoped>

/* ── PAGE HEADER ─────────────────────────────────────────────── */
.dg-header {
  width: 100%;
  padding: 8rem 6vw 4rem;
  background: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
  margin-top: 70px;
}

.dg-eyebrow {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
  margin-bottom: 1rem;
}

.dg-page-title {
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 900;
  line-height: 0.9;
  color: #000;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem 0;
  font-family: Arial, sans-serif;
}

.dg-page-desc {
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: #666;
  line-height: 1.7;
  max-width: 460px;
  font-family: Arial, sans-serif;
  margin: 0;
}

.dg-header-count {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ccc;
  font-family: Arial, sans-serif;
  padding-bottom: 0.5rem;
}

/* ── FILTERS ─────────────────────────────────────────────────── */
.dg-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 1.5rem 6vw;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 70px;
  z-index: 100;
}

.dg-filter-btn {
  background: none;
  border: 1.5px solid #e0e0e0;
  border-radius: 999px;
  padding: 0.4rem 1.1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #888;
  cursor: pointer;
  font-family: Arial, sans-serif;
  transition: all 0.2s ease;
}

.dg-filter-btn:hover  { border-color: #000; color: #000; }
.dg-filter-btn.active { background: #000; border-color: #000; color: #fff; }

/* ── BENTO GRID ──────────────────────────────────────────────── */
.dg-bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 300px;
  gap: 6px;
  padding: 6px;
  background: #f0f0f0;
}

.dg-bento-card--wide   { grid-column: span 2; }
.dg-bento-card--tall   { grid-row: span 2; }
.dg-bento-card--large  { grid-column: span 2; grid-row: span 2; }
.dg-bento-card--normal { grid-column: span 1; grid-row: span 1; }

.dg-bento-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 12px;
  background: #ddd;
}

.dg-bento-img {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}

.dg-bento-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 1;
}

.dg-bento-card:hover .dg-bento-img img { transform: scale(1.07); }

.dg-bento-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2rem 1.4rem;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.0) 0%,
    rgba(0,0,0,0.0) 40%,
    rgba(0,0,0,0.75) 100%
  );
  transition: background 0.35s ease;
}

.dg-bento-card:hover .dg-bento-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.2) 0%,
    rgba(0,0,0,0.85) 100%
  );
}

.dg-bento-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dg-bento-card:hover .dg-bento-top {
  opacity: 1;
  transform: translateY(0);
}

.dg-bento-code {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: rgba(255,255,255,0.5);
  font-family: Arial, sans-serif;
}

.dg-bento-cat-badge {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-family: Arial, sans-serif;
}

.dg-bento-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.dg-bento-client {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  font-family: Arial, sans-serif;
}

.dg-bento-title {
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-family: Arial, sans-serif;
}

.dg-bento-sub {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.6);
  margin: 0.2rem 0 0.5rem;
  line-height: 1.4;
  font-family: Arial, sans-serif;
  max-width: 280px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
}

.dg-bento-card:hover .dg-bento-sub {
  opacity: 1;
  transform: translateY(0);
}

.dg-bento-cta {
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  font-family: Arial, sans-serif;
  letter-spacing: 0.06em;
  opacity: 0;
  transition: opacity 0.3s ease 0.1s;
  width: fit-content;
}

.dg-bento-card:hover .dg-bento-cta { opacity: 1; }

/* ── DETAIL ──────────────────────────────────────────────────── */
.dg-detail { width: 100%; }

.dg-detail-hero {
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  margin-top: 70px;
}

.dg-detail-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  filter: brightness(0.45);
  opacity: 1;
}

.dg-detail-hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 4rem 6vw;
}

.dg-detail-hero-inner {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 800px;
}

.dg-detail-cat {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  font-family: Arial, sans-serif;
}

.dg-detail-title {
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.03em;
  font-family: Arial, sans-serif;
}

.dg-detail-subtitle {
  font-size: clamp(0.9rem, 1.3vw, 1.05rem);
  color: rgba(255,255,255,0.6);
  line-height: 1.65;
  margin: 0;
  max-width: 560px;
  font-family: Arial, sans-serif;
}

/* ── DETAIL BODY ─────────────────────────────────────────────── */
.dg-detail-body {
  max-width: 960px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.dg-back-btn {
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

.dg-back-btn:hover { color: #000; }

.dg-meta-strip {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  padding: 2rem 0;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 4rem;
}

.dg-meta-item { display: flex; flex-direction: column; gap: 0.3rem; }

.dg-meta-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
}

.dg-meta-value {
  font-size: 0.88rem;
  font-weight: 600;
  color: #000;
  font-family: Arial, sans-serif;
  max-width: 220px;
  line-height: 1.4;
}

.dg-case-section { margin-bottom: 3.5rem; }

.dg-case-section:has(.dg-section-label) {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 2rem;
  align-items: start;
}

.dg-section-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #aaa;
  font-family: Arial, sans-serif;
  padding-top: 0.3rem;
  position: sticky;
  top: 140px;
}

.dg-section-content {
  font-size: 1rem;
  color: #333;
  line-height: 1.85;
  font-family: Arial, sans-serif;
}

.dg-section-content p { margin: 0 0 1.1rem 0; }
.dg-section-content p:last-child { margin: 0; }

.dg-section-img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  display: block;
  opacity: 1;
}

.dg-img-grid {
  display: grid;
  gap: 8px;
}

.dg-img-grid--2 { grid-template-columns: 1fr 1fr; }
.dg-img-grid--3 { grid-template-columns: 1fr 1fr 1fr; }
.dg-img-grid--4 { grid-template-columns: repeat(4, 1fr); }

.dg-img-grid img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  opacity: 1;
}

.dg-img-caption {
  font-size: 0.78rem;
  color: #aaa;
  font-family: Arial, sans-serif;
  margin: 0.75rem 0 0;
  letter-spacing: 0.03em;
  line-height: 1.5;
}

.dg-detail-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;
  border-top: 1px solid #e8e8e8;
  margin-top: 2rem;
}

.dg-next-btn {
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
  transition: background 0.2s ease;
}

.dg-next-btn:hover { background: #333; }

/* ── STACKED DECK CAROUSEL ──────────────────────────────────── */
.dg-deck-wrapper {
  width: 100%;
  margin-bottom: 3rem;
}

.dg-deck-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  perspective: 1200px;
}

.dg-deck-card {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #f0f0f0;
  box-shadow: 0 8px 40px rgba(0,0,0,0.18);
  transition: transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1),
              opacity 0.5s ease,
              box-shadow 0.3s ease;
  transform-origin: left center;
  will-change: transform;
}

.dg-deck-card--active {
  cursor: default;
  box-shadow: 0 20px 60px rgba(0,0,0,0.22);
}

.dg-deck-card--next { cursor: pointer; }

.dg-deck-card--next:hover {
  transform: translateX(22px) translateY(-12px) rotate(2.5deg) scale(0.975) !important;
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
}

.dg-deck-card--hidden { pointer-events: none; }

.dg-deck-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 1;
  pointer-events: none;
}

.dg-deck-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 0 0.6rem;
  gap: 1rem;
}

.dg-deck-btn {
  background: #000;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-weight: 700;
  transition: background 0.2s ease, transform 0.15s ease;
  flex-shrink: 0;
}

.dg-deck-btn:hover {
  background: #333;
  transform: scale(1.05);
}

.dg-deck-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  flex: 1;
  text-align: center;
}

.dg-deck-count {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #bbb;
  font-family: Arial, sans-serif;
  text-transform: uppercase;
}

.dg-deck-count em {
  font-style: normal;
  font-weight: 400;
}

.dg-deck-title {
  font-size: 0.82rem;
  color: #555;
  font-family: Arial, sans-serif;
  font-weight: 500;
  max-width: 360px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dg-deck-dots {
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
  padding-bottom: 0.5rem;
}

.dg-deck-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ddd;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;
}

.dg-deck-dot.active {
  background: #000;
  transform: scale(1.4);
}

@media (max-width: 768px) {
  .dg-deck-controls { padding: 1rem 0 0.4rem; }
  .dg-deck-btn { padding: 0.5rem 1rem; font-size: 0.9rem; }
  .dg-deck-title { display: none; }
}

/* ── EASEL MOCKUP ────────────────────────────────────────────── */
.dg-easel-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.dg-easel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.dg-easel-item--left { transform: rotate(-2deg); }
.dg-easel-item--right { transform: rotate(2deg); margin-top: 3rem; }

.dg-easel-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  filter: drop-shadow(0 20px 50px rgba(0,0,0,0.18));
}

.dg-easel-board {
  position: relative;
  width: 100%;
  background: #e8ddd0;
  border-radius: 3px 3px 0 0;
  padding: 10px 10px 14px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
}

.dg-easel-clip {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 14px;
  background: #b0a090;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.15);
  z-index: 2;
}

.dg-easel-clip::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 6px;
  right: 6px;
  height: 3px;
  background: #8a7a6a;
  border-radius: 1px;
}

.dg-easel-poster {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 1px;
}

.dg-easel-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 1;
}

.dg-easel-legs {
  position: relative;
  width: 70%;
  height: 60px;
}

.dg-easel-leg {
  position: absolute;
  bottom: 0;
  width: 6px;
  border-radius: 3px;
  background: linear-gradient(to bottom, #c8b89a, #a89070);
}

.dg-easel-leg--l {
  left: 10%;
  height: 56px;
  transform-origin: top center;
  transform: rotate(-8deg);
}

.dg-easel-leg--r {
  right: 10%;
  height: 56px;
  transform-origin: top center;
  transform: rotate(8deg);
}

.dg-easel-leg--b {
  left: 50%;
  height: 44px;
  transform: translateX(-50%) rotate(0deg);
  transform-origin: top center;
  background: linear-gradient(to bottom, #b8a882, #988060);
}

.dg-easel-label {
  font-size: 0.75rem;
  color: #888;
  font-family: Arial, sans-serif;
  text-align: center;
  letter-spacing: 0.04em;
  line-height: 1.4;
  max-width: 220px;
}

@media (max-width: 768px) {
  .dg-easel-wrap { grid-template-columns: 1fr; gap: 3rem; }
  .dg-easel-item--left,
  .dg-easel-item--right { transform: none; margin-top: 0; }
}

/* ── TV MOCKUP ───────────────────────────────────────────────── */
.dg-tv-wrap {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dg-tv-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.dg-tv-screen {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #111;
  border-top: 12px solid #1c1c1c;
  border-left: 12px solid #1c1c1c;
  border-right: 12px solid #1c1c1c;
  border-bottom: 8px solid #1c1c1c;
  box-shadow: 0 0 0 1px #333, 0 40px 100px rgba(0,0,0,0.4);
  position: relative;
}

.dg-tv-screen::before {
  content: '';
  position: absolute;
  bottom: 6px;
  right: 14px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #2e2e2e;
  z-index: 2;
}

.dg-tv-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.dg-tv-stand { display: flex; flex-direction: column; align-items: center; }

.dg-tv-neck {
  width: 40px;
  height: 28px;
  background: linear-gradient(to bottom, #1c1c1c, #161616);
  clip-path: polygon(25% 0%, 75% 0%, 95% 100%, 5% 100%);
}

.dg-tv-base {
  width: 180px;
  height: 12px;
  background: linear-gradient(to bottom, #1c1c1c, #141414);
  border-radius: 0 0 8px 8px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.dg-tv-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 1.2rem 0 0.5rem;
}

.dg-tv-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ddd;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;
}

.dg-tv-dot.active {
  background: #000;
  transform: scale(1.4);
}

.tv-fade-enter-active,
.tv-fade-leave-active { transition: opacity 0.6s ease; }
.tv-fade-enter-from,
.tv-fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .dg-tv-screen { border-width: 8px 8px 6px; }
  .dg-tv-neck { width: 28px; height: 20px; }
  .dg-tv-base { width: 120px; height: 9px; }
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
  .dg-bento {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 260px;
  }
}

@media (max-width: 768px) {
  .dg-header { padding: 6rem 1.5rem 3rem; flex-direction: column; align-items: flex-start; gap: 1rem; }
  .dg-filters { padding: 1.2rem 1.5rem; top: 60px; }

  .dg-bento {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
    gap: 4px;
    padding: 4px;
  }

  .dg-bento-card--wide,
  .dg-bento-card--large { grid-column: span 2; }
  .dg-bento-card--tall  { grid-row: span 1; }

  .dg-bento-top,
  .dg-bento-sub,
  .dg-bento-cta { opacity: 1; transform: none; }

  .dg-detail-hero { height: 50vh; margin-top: 60px; }
  .dg-detail-body { padding: 2rem 1.5rem 4rem; }

  .dg-case-section:has(.dg-section-label) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }

  .dg-section-label { position: static; }

  .dg-img-grid--3 { grid-template-columns: 1fr 1fr; }
  .dg-img-grid--4 { grid-template-columns: 1fr 1fr; }

  .dg-meta-strip { gap: 1.5rem; }
  .dg-detail-nav { flex-direction: column; align-items: flex-start; gap: 1rem; }
}

@media (max-width: 480px) {
  .dg-bento { grid-template-columns: 1fr; grid-auto-rows: 240px; }
  .dg-bento-card--wide,
  .dg-bento-card--large,
  .dg-bento-card--tall { grid-column: 1; grid-row: span 1; }
}
</style>