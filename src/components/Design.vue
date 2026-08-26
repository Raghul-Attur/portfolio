<template>

  <!-- ── INDEX: HEADER + FILTERS + GRID ─────────────────────── -->
  <transition name="grid-fade">
    <div v-if="selectedProject === null" class="dg-index">

      <!-- ── PAGE HEADER ─────────────────────────────────────── -->
      <div class="dg-header">
        <div class="dg-header-inner">
          <span class="dg-eyebrow">Portfolio</span>
          <h1 class="dg-page-title">Design<br>&amp; Branding</h1>
          <p class="dg-page-desc">
            Brand identity, campaigns, packaging, print, and digital, produced across agency and freelance environments over 6 years.
          </p>
        </div>
        <div class="dg-header-count">{{ filteredProjects.length }} Works</div>
      </div>

      <!-- ── FILTER TABS ─────────────────────────────────────── -->
      <div class="dg-filters">
        <button
          v-for="cat in categories"
          :key="cat"
          class="dg-filter-btn"
          :class="{ active: activeFilter === cat }"
          @click="setFilter(cat)"
        >{{ cat }}</button>
      </div>

      <!-- ── BENTO GRID ──────────────────────────────────────── -->
      <div class="dg-bento">
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
              content: '<p>pH Projecct is a modern fashion label founded by Pushkal Prasad and Harrshi Padmanabhan. It sits in the high-fashion space and speaks to an audience that values minimalism as much as expressive, editorial design. The brief was to build a full identity system that felt luxurious and experimental, and that would land with a young, design-conscious market.</p>'
            },
            {
              type: 'text',
              label: 'Strategic Positioning',
              content: '<p>The name carries a double meaning. It comes from the founders\' initials and points to the idea of pH balance: harmony reached through contrast. That became the brand\'s visual language, with most decisions set up as a tension between opposites such as serif against sans-serif, dark against light, and structure against freedom.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/ph-02.jpg', alt: 'Founders vision and brand introduction' },
                { src: '/images/design/ph-03.jpg', alt: 'Visual mood and material textures' },
              ],
              caption: 'Brand mood and founder narrative, editorial tone established from the outset'
            },
            {
              type: 'text',
              label: 'Identity System',
              content: '<p>The logo system was built with multiple lockups, spacing guides, and glyph specifications. The primary wordmark extends the descender on the "j" so the mark reads clearly while keeping its typographic structure intact. Plus signs run through the system as a compositional device, a nod to the two founders coming together.</p><p>Typography pairs Bodoni 72 Oldstyle for headers and editorial pull quotes with Gotham for body copy. A monochrome palette of black, off-white, and soft grey gives editorial layouts a flexible backdrop.</p>'
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
              caption: 'Final brand system extended across touchpoints, from runway invitations to care labels'
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
              content: '<p>Ayra Mané is a heritage homestay in the hills of Coorg, surrounded by coffee estates, greenery, and cultural history. The brief was to build a visual identity that captured the estate itself: rooted in tradition and refined in its hospitality. The design had to balance rustic character with the sense of luxury the property promises its guests.</p>'
            },
            {
              type: 'text',
              label: 'Design Direction',
              content: '<p>The logo symbol draws on traditional Kolam patterns, the sacred geometric designs drawn outside South Indian homes as a sign of welcome. The pattern was stylised on a clean geometric grid to keep it elegant as well as traditional, and that same grid discipline carried into the layout and spatial system across all brand materials.</p><p>The colour palette comes straight from the Coorg landscape: forest greens, muted browns, natural beige, deep charcoal, and off-white. Typography pairs a heritage serif with a contemporary, legible companion.</p>'
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
              caption: 'Colour system drawn directly from the Coorg landscape: forest greens, estate browns, and natural beige'
            },
            {
              type: 'text',
              label: 'Applications',
              content: '<p>The identity runs across every guest touchpoint: slippers, mugs, soaps, towels, room signage, and print collateral. Keeping these consistent gives guests a cohesive, considered environment from arrival to departure. A final set of postcard-style visuals captures the kind of memory guests take home with them.</p>'
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
              content: '<p>Preventika is part of Sanmed\'s range of effervescent disinfectant tablets for home use. Since the format was still new to most of the Indian market, the branding and packaging had to build awareness, explain the product, and position it as a modern alternative to conventional disinfectants.</p>'
            },
            {
              type: 'text',
              label: 'Design Thinking',
              content: '<p>The brief called for an identity that read as safe, modern, and trustworthy, and stayed approachable for first-time users. Instead of the blue-and-white look common to the Indian hygiene category, the system uses high-contrast yellow and black so Preventika stands out on shelf. The bold colour signals efficacy, and a dot-pattern motif across the packaging references the molecular structure of the active ingredient, which gives the brand a science-led feel that never turns clinical.</p><p>The system scales across formats: tube labels, bulk tubs, and antimicrobial cards. Each one shares the same typographic rhythm, icon language, and colour blocking, so every format reads as part of the same family while suiting its own shape and retail context.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/Preventika-02.jpg', alt: 'Logo variations' },
                { src: '/images/design/Preventika-03.jpg', alt: 'Business cards' },
              ],
              caption: 'Logo system and brand identity, with the dot motif referencing the molecular structure of the active ingredient'
            },
            {
              type: 'image',
              src: '/Label_Mocks.jpg',
              caption: 'Tube label packaging, high-contrast yellow and black built to stand out in a crowded hygiene category'
            },
            {
              type: 'image',
              src: '/Tub_Mocks_Mocks.jpg',
              caption: 'Bulk tub format, the same visual language scaled up for larger retail and agricultural distribution'
            },
            {
              type: 'image',
              src: '/Sanitary_card.jpg',
              caption: 'Antimicrobial card packaging, a secondary product line holding full brand consistency at a compact card format'
            },
            {
              type: 'grid',
              cols: 3,
              images: [
                { src: '/images/design/Preventika-04.jpg', alt: 'Packaging design detail' },
                { src: '/images/design/Preventika-05.jpg', alt: 'Packaging mockup' },
                { src: '/images/design/Preventika-06.jpg', alt: 'OOH advertising' },
              ],
              caption: 'Full packaging range and outdoor advertising, launched across retail, collateral, and OOH as one system'
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
              content: '<p>Villgro\'s iPitch 2021 campaign set out to widen funding access for social entrepreneurs across India, working with several partners across education, agriculture, clean tech, and more. The task was a social campaign that carried credibility, showed the range of sectors, and pushed people to apply, all while staying cohesive and legible in a busy social feed.</p>'
            },
            {
              type: 'text',
              label: 'Design Strategy',
              content: '<p>The system is modular, built on abstract geometric icons for each sector: leaves for agriculture, crosses for health, books for education. Colour blocks sit on a grid that flexes across social formats without breaking brand consistency, and flat, vibrant colour with clean typography keeps the posts legible on Instagram and LinkedIn.</p><p>It was built to scale quickly. Every post reuses the same framework and swaps only colour and icon placement, which kept production fast without dropping quality.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/Villgro-02.jpg', alt: 'Colour-coded campaign variants' },
                { src: '/images/design/Villgro-03.jpg', alt: 'Instagram Story mockup' },
              ],
              caption: 'Modular grid system, where each sector gets its own colour block and icon while staying visually cohesive'
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
              content: '<p>Chitra\'m craft chocolates began as a tribute to the founder\'s late mother, Chitra. The idea was artisanal chocolate made for the Indian palate, with heritage carried through the visual storytelling. The packaging had to work for the local market and for a global audience that responds to a handcrafted identity.</p>'
            },
            {
              type: 'text',
              label: 'Design Direction',
              content: '<p>Raja Ravi Varma\'s paintings of Indian women anchor the visuals, chosen for their emotional depth and cultural resonance. To balance that classical base, the packaging adds modern digital elements such as geometric forms and molecular motifs, a visual stand-in for the mix of tradition and food science behind the chocolate.</p>'
            },
            {
              type: 'image',
              src: '/images/design/chitram-03.jpg',
              caption: 'Packaging detail, where each variant uses motifs from Raja Ravi Varma alongside molecular and geometric elements'
            },
            {
              type: 'text',
              label: 'Colour System',
              content: '<p>Each flavour has its own palette pulled straight from its key ingredient: lemon and moringa for the white chocolate, deep reds and earth tones for the dark palm-sugar variant. Every flavour feels distinct while staying clearly part of one brand. The result reads less like packaging and more like a small cultural artifact that sits between Indian storytelling and contemporary design.</p>'
            },
            {
              type: 'image',
              src: '/images/design/chitram-02.jpg',
              caption: 'Final packaging system, cohesive across flavours while each variant keeps its own visual identity'
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
              content: '<p>LO.CL is a location-based social platform that connects people to nearby events, places, and experiences. The campaign brief was to show how the app shapes everyday decisions: finding a cycling route, a new café, or whatever is happening nearby. Each visual captures a small moment of curiosity and spontaneity.</p>'
            },
            {
              type: 'text',
              label: 'Visual Strategy',
              content: '<p>Contrast, emphasis, and balance drive every layout. Centre-aligned compositions, embedded UI overlays, and natural colour gradients keep the visuals grounded in real life while still feeling modern. Each ad reframes a common "near me" search so the viewer sits inside the LO.CL experience rather than watching from outside.</p><p>The campaign was built for multiple channels, with versions for bus-shelter panels, newspaper spreads, magazine columns, and digital banners. Real app UI was placed into real-world photography to blur the line between searching and doing.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/locl-02.jpg', alt: 'Newspaper ad, content discovery' },
                { src: '/images/design/locl-03.jpg', alt: 'Social feed poster, dining discovery' },
              ],
            },
            {
              type: 'image',
              src: '/images/design/locl-04.jpg',
              caption: 'Magazine ad, coffee culture. Minimal typography, lifestyle imagery, and embedded UI present LO.CL as an intuitive social layer over everyday life.'
            },
          ]
        },

        // ── FUNSKOOL ──────────────────────────────────────────
        {
          code: 'DS-07',
          title: 'Funskool Campaign',
          subtitle: 'Animated social campaign, 125% engagement increase',
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
              content: '<p>An animated social campaign for Funskool that lifted account engagement by 125% over six months. The account shifted from static product posts to motion-first content: short looping animations made specifically for Reels and Stories. Modular animation templates built in After Effects let the work adapt quickly across products and promotions.</p>'
            },
            {
              type: 'text',
              label: 'Approach',
              content: '<p>Animation drove the brief from the start rather than being added at the end. Posts were designed as 15 to 30 second loops paced for mobile viewing. A consistent visual system across every post built brand recognition over time, which is what compounded the engagement numbers through the campaign.</p>'
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
              content: '<p>Digital signage and display-TV content for JW Marriott Bengaluru, produced over a two-year engagement at Smitten Worldwide. The slides ran on in-hotel screens across the property, in lobby areas, elevator banks, and guest corridors, promoting restaurant launches and F&amp;B offers to guests.</p><p>Two distinct campaigns came out of it. ALBA is the hotel\'s Mediterranean fine-dining restaurant, which needed a dark, editorial look with full-bleed food photography and restrained typography. The Bengaluru Baking Co (BBC) is a lobby patisserie with a warmer, heritage-influenced tone: cream backgrounds, a custom logotype, and a more relaxed type system. Both held to JW Marriott\'s global brand standards while giving each venue its own identity.</p>'
            },
            {
              type: 'text',
              label: 'Design Approach',
              content: '<p>Display TV works differently from social. Screens are seen at a distance and in passing, so the hierarchy has to resolve at a glance. The split layout used across both campaigns keeps photography on the left and information on the right, so both panels read clearly from anywhere in the room. Type is set large and tracked wide to hold up on low-resolution hotel screens.</p>'
            },
            {
              type: 'tvcarousel',
              images: [
                { src: '/JWM_TV_01.jpg', alt: 'ALBA, Restaurant launch, Mediterranean cuisine' },
                { src: '/JWM_TV_03.jpg', alt: 'ALBA, Fine dining, nouvelle Mediterranean' },
                { src: '/JWM_TV_06.jpg', alt: 'BBC, Bengaluru Baking Co, food spread' },
                { src: '/JWM_TV_02.jpg', alt: 'BBC, Pastry and coffee launch' },
                { src: '/JWM_TV_04.jpg', alt: 'BBC, Restaurant interior, lobby level' },
                { src: '/JWM_TV_05.jpg', alt: 'BBC, Signature cocktail' },
              ],
              caption: 'ALBA (slides 1-2) and Bengaluru Baking Co (slides 3-6), in-hotel display TV campaigns for JW Marriott Bengaluru'
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
              content: '<p>Print campaign collateral for F&amp;B events at The Westin Chennai Velachery, produced at Smitten Worldwide. The work covered seasonal dining promotions, festival campaigns, and restaurant event advertising, all inside the Westin and Marriott Bonvoy brand system but adapted for local messaging.</p><p>Two campaigns are shown here. The New Year Brunch poster for Seasonal Tastes uses a bright, food-led flat-lay, with dishes and ingredients scattered around a bold typographic centrepiece. The Navratri Thali campaign takes a different tone: warm wood textures, a hero overhead shot of the thali spread, and script typography chosen to match the occasion.</p>'
            },
            {
              type: 'text',
              label: 'Design Approach',
              content: '<p>Both pieces had to work as standalone print ads and as digital social assets. They were designed at A3 portrait with enough visual density to hold attention on a phone screen and at full poster scale on a noticeboard. The lockup hierarchy places Seasonal Tastes and The Westin together to keep Marriott brand standards, while photography, colour temperature, and typographic tone give each campaign its own personality.</p>'
            },
            {
              type: 'easel',
              images: [
                { src: '/Westin_NY_Brunch.jpg', alt: 'New Year Brunch, Seasonal Tastes, Westin Chennai' },
                { src: '/Westin_Navratri.jpg', alt: 'Navratri Thali campaign, Westin Chennai Velachery' },
              ],
              caption: 'New Year Brunch poster (2022) and Navratri Thali campaign (2021), F&B print collateral for The Westin Chennai Velachery'
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
              content: '<p>Ayuni is a Middle Eastern condiment brand built around Amba, a pickled and spiced mango sauce with roots in Iraqi and Levantine cooking. The brief was a full identity system that could carry the brand across retail packaging and physical touchpoints, and position it for an international audience that may not know the product.</p><p>The name Ayuni (عيوني) means "my eyes" in Arabic, a term of real endearment. The brand leans into that warmth: familiar and inviting, rooted in cultural pride but never hard to approach.</p>'
            },
            {
              type: 'text',
              label: 'Logo & Wordmark',
              content: '<p>The wordmark is custom lettering rather than a chosen typeface. The letters of "ayuni" are drawn with flowing, continuous strokes that echo Arabic calligraphy while still reading clearly in Latin script. The descender of the "y" loops through the "u" and "n" of the second syllable, tying both halves of the word into one interlocking mark. A filled dot anchors the junction, working as both punctuation and a quiet nod to the dots in Arabic script.</p><p>The result carries cultural specificity without leaning on literal Arabesque ornament. It holds up small on a bottle label and scales cleanly to a shopping bag.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/images/design/ayuni-logo.jpg', alt: 'Ayuni wordmark, custom lettering system' },
                { src: '/images/design/ayuni-bag.jpg', alt: 'Shopping bag application' },
              ],
              caption: 'Custom wordmark with interlocking letterforms, applied across the shopping bag alongside the brand\'s landscape silhouette motif'
            },
            {
              type: 'text',
              label: 'Packaging System',
              content: '<p>The Amba Sauce range has three heat levels: Mild, Spicy, and Lava. Each bottle takes its background colour from the sauce inside, golden yellow for Mild, orange for Spicy, and deep red-orange for Lava, so shoppers can spot their heat level without reading a word.</p><p>Each label centres the Ayuni wordmark inside a mango silhouette, which also works as a brand icon across the packaging. Below it, the heat level sits in a high-contrast black band that stays consistent across the range. A cityscape silhouette of Middle Eastern architecture and palm trees runs along the bottom, grounding the brand in its origin without overstating it.</p><p>Typography stays confident and utilitarian. The descriptor "Pickled and Spiced Mango" sits in tight tracking above the product name, and the variant band reads clearly at bottle scale and from a distance on shelf.</p>'
            },
            {
              type: 'image',
              src: '/images/design/ayuni-packaging.jpg',
              caption: 'Amba Sauce range, Spicy, Mild, and Lava variants. Colour-coded by heat level with consistent label architecture across the range.'
            },
            {
              type: 'text',
              label: 'Brand Language',
              content: '<p>On the shopping bag, a wave-form landscape runs along the base, with palm trees rising from a dark, undulating ground and the Ayuni dot motif reappearing as a compositional element. The pale blue-grey of the bag sits outside the warm condiment palette, which gives the identity room to breathe across a wider set of touchpoints.</p><p>The system is deliberately minimal. The logo does the cultural storytelling, and the packaging leans on colour and silhouette as fast-read signals. Together they make Ayuni feel credible on a retail shelf and considered in the hand.</p>'
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
              content: '<p>Pitch-deck design for Corporate Chemistry, a talent acquisition and recruitment firm focused on mid to senior-level placements across industries. The deck had to communicate the firm\'s positioning, method, and client experience to potential partners and investors.</p><p>The system uses a high-energy yellow and light-grey palette with bold sans-serif type, abstract geometric shapes, and custom line-icon illustrations. It needed to feel confident and modern without going cold, since the firm\'s core idea, "making hiring human", calls for warmth alongside the professionalism.</p>'
            },
            {
              type: 'text',
              label: 'Design System',
              content: '<p>A modular slide template let each section adapt quickly while staying visually consistent. Yellow works as a full-bleed background for high-impact statements and as an accent against grey on data-heavy slides. Custom illustrations replace stock photography throughout, which keeps the visual language ownable from slide to slide.</p>'
            },
            {
              type: 'carousel',
              images: [
                { src: '/CC_Slide_1.jpg', alt: 'Cover slide' },
                { src: '/CC_Slide_2.jpg', alt: 'Intro, Is hiring an art or a science?' },
                { src: '/CC_Slide_3.jpg', alt: 'In a word, it is chemistry' },
                { src: '/CC_Slide_4.jpg', alt: 'Mission' },
                { src: '/CC_Slide_5.jpg', alt: 'USP, Making Hiring Human' },
                { src: '/CC_Slide_6.jpg', alt: 'Here is how we do it' },
                { src: '/CC_Slide_7.jpg', alt: 'Finding the spark' },
                { src: '/CC_Slide_8.jpg', alt: 'Our Services' },
                { src: '/CC_Slide_9.jpg', alt: 'For Candidates, Consulting' },
                { src: '/CC_Slide_10.jpg', alt: 'For Candidates, Grooming' },
                { src: '/CC_Slide_11.jpg', alt: 'For Candidates, Interviewing' },
                { src: '/CC_Slide_12.jpg', alt: 'For Companies, Sourcing' },
                { src: '/CC_Slide_13.jpg', alt: 'For Companies, Shortlisting' },
                { src: '/CC_Slide_14.jpg', alt: 'For Companies, Interviewing' },
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
              content: '<p>Trifold brochure and menu design for Flavours of Colombo, a Sri Lankan food festival at JW Kitchen, JW Marriott Bengaluru. The brief was a premium printed piece that felt culturally immersive, one that could carry guests to Colombo through the design before the food arrived.</p><p>The visuals centre on a watercolour treatment of aerial coastal photography that evokes Sri Lanka\'s beaches, ocean, and landscape. Illustrated birds in flight carry across all three panels, tying the folded piece into a single composition when it opens flat. The result sits between editorial and hospitality design, refined for a five-star property yet still warm enough to read as a genuine celebration of the cuisine.</p>'
            },
            {
              type: 'text',
              label: 'Design Approach',
              content: '<p>The challenge with a trifold is designing for two states at once: the folded cover and the fully open spread. The watercolour imagery bleeds across all three panels so the piece reads as one landscape when unfolded. The cover leads with the JW Kitchen and JW Marriott lockup and a bold serif headline, anchored by a composite of the Colombo Lotus Tower, palm trees, and a hero dish of curried crab.</p><p>Inside, the menu hierarchy pairs serif headings with light body text to keep an editorial tone. A palette of muted navy, soft teal, and cream keeps the piece premium without competing with the food photography.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/JW_Colombo_1.jpg', alt: 'Trifold brochure open spread' },
                { src: '/JW_Colombo_2.jpg', alt: 'Trifold brochure cover close-up' },
              ],
              caption: 'Trifold menu for Flavours of Colombo, with watercolour coastal photography carrying across all three panels as one composition'
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
              content: '<p>OOH billboard campaign for Level 12, the rooftop bar at DoubleTree by Hilton Pune, Chinchwad. The campaign promoted the venue as a premium destination with a limited offer, built to drive footfall through outdoor advertising across the city.</p><p>Two creative directions were developed. The first uses a dark navy palette with gold typography and a split layout that pairs a venue photograph with bold copy and a promotional CTA. The second is lighter and more aspirational, with white space, script typography, and a rooftop lifestyle image, leading with the mood before the offer. Both sit inside DoubleTree and Hilton brand guidelines while giving Level 12 its own identity as a venue.</p>'
            },
            {
              type: 'text',
              label: 'Design Approach',
              content: '<p>A billboard gets about a two-second read. The hierarchy was structured to land in order: venue name, key message, then offer. Splitting the layout, with the venue photograph on one half and copy on the other, gives each board weight and keeps it legible at a distance instead of relying on the image alone. Type was sized and tracked for impact at large-format print scale.</p>'
            },
            {
              type: 'grid',
              cols: 2,
              images: [
                { src: '/Doubletree_Billboard_1.jpg', alt: 'Level 12 billboard, dark navy variant' },
                { src: '/Doubletree_Billboard_2.jpg', alt: 'Level 12 billboard, light aspirational variant' },
              ],
              caption: 'Two creative directions: dark and premium for the discount CTA, light and lifestyle-led for brand awareness'
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
              content: '<p>Two single covers for independent Indian artists working in hip-hop and R&amp;B. Both briefs were the same at heart: artwork that felt contemporary and shelf-ready, able to sit next to international releases without looking like an afterthought.</p><p>Each cover was built around the artist\'s identity and the mood of the track. Audacity leans into a loose, sun-drenched energy with a teal palette, stacked display type, and a candid street photograph. Kanave goes cinematic, with a warm gradient, floating abstract forms, and a digitally treated portrait that gives it a magazine-style finish.</p><p>Independent music in India is often underserved on the visual side, so these were made to close that gap: bold enough to read as a Spotify thumbnail and refined enough to hold up at physical print size.</p>'
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
  white-space: nowrap;
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
  align-items: start;
}

.dg-img-grid--2 { grid-template-columns: 1fr 1fr; }
.dg-img-grid--3 { grid-template-columns: 1fr 1fr 1fr; }
.dg-img-grid--4 { grid-template-columns: repeat(4, 1fr); }

.dg-img-grid img {
  width: 100%;
  height: auto;          /* natural ratio, nothing gets cropped */
  border-radius: 8px;
  display: block;
}

/* Opt-in: uniform cropped boxes for a row of photographic mockups,
   where a clean grid matters more than showing every edge.
   Use class "dg-img-grid--3 dg-img-grid--uniform" on the section. */
.dg-img-grid--uniform img {
  aspect-ratio: 4 / 3;
  height: 100%;
  object-fit: cover;
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

/* Tablet: ease the header down before the full mobile stack */
@media (max-width: 900px) {
  .dg-header { padding: 7rem 4vw 3rem; }
  .dg-filters { padding: 1.3rem 4vw; }
  .dg-detail-hero-overlay { padding: 3rem 4vw; }
  .dg-detail-body { padding: 3rem 4vw 5rem; }
}

@media (max-width: 768px) {
  .dg-header { padding: 6rem 1.5rem 3rem; flex-direction: column; align-items: flex-start; gap: 1rem; }
  .dg-filters { padding: 1.2rem 1.5rem; top: 60px; }

  /* Let the sticky filter row scroll sideways instead of wrapping to 3 lines */
  .dg-filters {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .dg-filters::-webkit-scrollbar { display: none; }
  .dg-filter-btn { flex-shrink: 0; }

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
  .dg-detail-hero-overlay { padding: 2rem 1.5rem; }
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

  .dg-detail-title { font-size: clamp(2.2rem, 11vw, 3rem); }
  .dg-meta-strip { gap: 1.25rem 1.75rem; }
}
</style>