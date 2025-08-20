<template>
    <div class="project-wrapper">

  
      <div class="fullwidth-header">
        <img src="/images/design/ph-01.jpg" alt="pH Projecct Cover" />
      </div>

      <button class="back-btn" @click="goBack">← Back to Projects</button>
  
      <div class="project-body">
        <h1 class="project-title">pH Projecct</h1>
        <p class="project-subtitle">Brand Identity for a High-Fashion Apparel Label</p>
  
        <div class="section">
          <h3>Overview</h3>
          <p><strong>pH Projecct</strong> is a modern fashion label born from the creative collaboration of Pushkal Prasad and Harrshi Padmanabhan. The brand positions itself as a contemporary force in the high-fashion space, targeting audiences who value both visual minimalism and expressive, editorial-forward aesthetics. My task was to build a complete identity system that felt luxurious, experimental, and timeless — while resonating with a youthful yet design-conscious demographic.</p>
        </div>
  
        <div class="section">
          <h3>Strategic Positioning</h3>
          <p>The name "pH Projecct" was a clever linguistic and conceptual double entendre. Not only did it derive from the initials of the founders, but it also referenced the idea of pH balance — an idea that inspired the brand's core positioning: harmony through contrast. This balance was explored across every visual decision, from serif vs. sans-serif, dark vs. light, structure vs. freedom, and utility vs. ornament.</p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/ph-02.jpg" alt="Founders Introduction and Vision" />
          <img src="/images/design/ph-03.jpg" alt="Visual Mood and Material Textures" />
          <img src="/images/design/ph-04.jpg" alt="Logo Lockups and Applications" />
        </div>
  
        <div class="section">
          <h3>Visual Identity System</h3>
          <p>The logo system was developed with multiple lockups, spacing guides, and glyph specifications to allow flexibility across print and digital media. The primary logo mark incorporates a minimalist wordmark with an extended descender on the 'j' — making it instantly recognizable while retaining typographic integrity. Plus signs (+) were used throughout the system as a compositional tool, representing intersection, collaboration, and alignment.</p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/ph-05.jpg" alt="Typography and Font Pairing Examples" />
          <img src="/images/design/ph-06.jpg" alt="Brand Book and Tone of Voice Layouts" />
          <img src="/images/design/ph-07.jpg" alt="Product Tagging and Card Layouts" />
        </div>
  
        <div class="section">
          <h3>Typography and Color Palette</h3>
          <p>The brand's typography follows a two-typeface structure. The serif typeface <em>Bodoni 72 Oldstyle</em> is used for hero headers, magazine-style pull quotes, and brand names — bringing an air of sophistication and editorial grace. This is balanced by the modern sans-serif family <em>Gotham</em>, used for body content, subheadings, and callouts. The monochrome color palette of black, off-white, and soft grey creates a neutral canvas that highlights garment textures and photography without distraction.</p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/ph-08.jpg" alt="Editorial Layout - Lookbook Example" />
          <img src="/images/design/ph-09.jpg" alt="Stationery and Packaging System" />
          <img src="/images/design/ph-10.jpg" alt="Garment Tags and Labeling Details" />
        </div>
  
        <div class="section">
          <h3>Outcome</h3>
          <p>Through cohesive branding, pH Projecct successfully established itself as a fashion brand that felt intelligent, balanced, and culturally relevant. The identity system was extended to multiple touchpoints — from runway invitations to care labels — ensuring brand consistency and recognizability. The final system not only aligned with the brand’s visual values but also set a foundation for future campaign adaptability, pop-up installations, and e-commerce presence.</p>
          <button class="back-btn" @click="goBack">← Back to Projects</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PhProjecctPage',
    methods: {
    goBack() {
      this.$router.push('/design'); 
    }
  }
  };
  </script>
  
  <style scoped>
  .project-wrapper {
    max-width: 1200px;
    margin: auto;
    padding: 2rem;
  }
  
  .back-button {
    margin-bottom: 1rem;
    font-weight: bold;
  }
  
  .fullwidth-header img {
    width: 100%;
    max-height: 800px;
    object-fit: cover;
    border-radius: 0;
  }
  
  .project-body {
    padding: 2rem;
    width: 80%;
    margin: auto;
  }
  
  .project-title {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
  }
  
  .project-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #555;
  }
  
  .section {
    margin-bottom: 3rem;
  }
  
  .image-gallery {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-bottom: 2rem;
  }
  
  .image-gallery img {
    width: 120%;
    max-width: 900px;
    border-radius: 1rem;
    object-fit: cover;
    margin: auto;
  }
  .back-btn {
  margin-bottom: 2rem;
  font-size: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #666;
  font-weight: bold;
  transition: color 0.2s ease;
}

.back-btn:hover {
  color: #000;
}  
  </style>