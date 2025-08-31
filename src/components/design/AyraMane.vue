<template>
    <div class="project-wrapper">
      <div class="fullwidth-header">
        <img src="/images/design/ayra-01.jpg" alt="Ayra Mane Hero Image" />
      </div>
  
      <div class="project-body">
        <h1 class="project-title">Ayra Mané</h1>
        <p class="project-subtitle">Logo & Branding Design for a Heritage Stay in Coorg</p>
  
        <div class="section">
          <h3>Project Overview</h3>
          <p>Ayra Mané is a heritage homestay nestled in the scenic hills of Coorg, known for its coffee estates, tranquil greenery, and cultural depth. The brief was to craft a visual identity that would capture the soul of the estate – one rooted in tradition, yet refined and modern in its hospitality. This meant striking a balance between rustic charm and luxury, echoing the authentic experiences that Ayra Mané promises.</p>
        </div>
  
        <div class="section">
          <h3>Branding Direction</h3>
          <p>We began the design process by delving into the cultural motifs and earthy essence of Coorg. The logo symbol was inspired by traditional <em>Kolam</em> patterns – sacred geometries drawn outside homes in South India – chosen to represent hospitality, harmony, and rootedness. The symbol was then stylized with a clean grid to maintain a balance between tradition and elegance. This geometric discipline was also applied to the layout grid and spatial system of the brand.</p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/ayra-02.jpg" alt="Logo Grid Variations" />
          <img src="/images/design/ayra-03.jpg" alt="Textile and Cushion Mockup" />
          <img src="/images/design/ayra-04.jpg" alt="Color Palette and Reference" />
        </div>
  
        <div class="section">
          <h3>Color Palette & Typography</h3>
          <p>The color palette draws directly from the environment of Coorg: rich forest greens, muted browns, and natural beige tones to reflect the organic setting and sustainable ethos of the stay. These are complemented by deep charcoal and off-whites for a contemporary touch. The typeface chosen is a serif font that pairs modern legibility with a touch of heritage elegance.</p>
        </div>
  
        <div class="section">
          <h3>Applications & Touchpoints</h3>
          <p>The brand identity was applied across a wide array of guest touchpoints – including slippers, mugs, soaps, towels, room signage, and more. The visual consistency across these elements ensured that guests experienced a cohesive and elevated environment from the moment they arrived. Each item was customized to reflect the calm, introspective spirit of the estate.</p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/ayra-05.jpg" alt="Botanical Illustration Style" />
          <img src="/images/design/ayra-06.jpg" alt="Landscape with Brand Overlay" />
          <img src="/images/design/ayra-07.jpg" alt="Branded Hotel Amenities" />
        </div>
  
        <div class="section">
          <h3>Visual Storytelling</h3>
          <p>From the winding paths of the estate to the fresh coffee beans and botanical illustrations, every element of Ayra Mané's brand evokes a connection to place. The design tells a story of heritage, family, and tranquility. A final set of postcard-style visuals pays tribute to the timeless, memory-making experiences the guests are meant to take home.</p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/ayra-08.jpg" alt="Postcard Branding" />
        </div>
  
        <div class="section">
          <button class="back-btn" @click="$router.push('/design')">&larr; Back to Projects</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AyraManePage'
  };
  </script>
  
  <style scoped>
  .project-wrapper {
    max-width: 1200px;
    margin: auto;
    padding: 2rem;
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
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }
  
  .image-gallery img {
    width: 120%;
    max-width: 900px;
    border-radius: 1rem;
    object-fit: cover;
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