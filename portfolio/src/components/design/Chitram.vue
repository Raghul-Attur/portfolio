<template>
    <div class="project-wrapper">
      <div class="fullwidth-header">
        <img src="/images/design/chitram-01.jpg" alt="Chitram Hero Image" />
        <button class="back-btn" @click="goBack">← Back to Projects</button>
      </div>
  
      <div class="project-body">
        <h1 class="project-title">Chitra'm</h1>
        <p class="project-subtitle">A Packaging Tribute Blending Indian Heritage with Contemporary Flavor</p>
  
        <div class="section">
          <h3>Overview</h3>
          <p>
            Chitra’m craft chocolates began as a tribute to the founder’s late mother, Chitra. The brand was born out of a desire to design exquisite artisanal chocolates tailored to the Indian palette. The core idea was to represent deep-rooted Indian heritage using visual storytelling while also appealing to a global market. 
          </p>
        </div>
  
        <div class="section">
          <h3>Design Direction</h3>
          <p>
            Raja Ravi Varma’s iconic paintings of Indian women served as the anchor for the visual narrative. These artworks were chosen not only for their emotive depth but also to establish a cultural and emotional connection. To balance this classical foundation, the packaging introduced modern digital art elements like geometric forms and molecular motifs, illustrating the fusion of tradition and science behind the artisanal chocolate-making process.
          </p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/chitram-03.jpg" alt="Chitram Packaging Detail 2" />
        </div>
  
        <div class="section">
          <h3>Color & Moodboard</h3>
          <p>
            To reflect each chocolate’s flavor, a color palette was extracted directly from key visual and ingredient inspirations—like lemons, palm sugar, chocolate, moringa, and heritage paintings. A detailed moodboard was crafted to map these associations and inform the final visual tone. This process ensured that every flavor had its own visual identity that was still cohesive with the brand.
          </p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/chitram-02.jpg" alt="Chitram Moodboard and Colors" />
        </div>
  
        <div class="section">
          <h3>Design Concept</h3>
          <p>
            Each packaging variant visually mirrors its dominant ingredient using a regional-meets-global style. For instance, the Palm Sugar Moelgapodi 70% Dark Chocolate uses rich reds and traditional motifs to evoke earthiness, while the Moringa & Lemon White Chocolate uses a fresher, zesty green-yellow blend. Elements like chemical bonds and stylized atoms visually represent the culinary experimentation behind the chocolates.
          </p>
        </div>
  
        <div class="section">
          <h3>Outcome & Relevance</h3>
          <p>
            The final outcome bridges Indian storytelling and contemporary aesthetics. Chitra’m becomes more than a chocolate brand—it acts as a cultural artifact that appeals both emotionally and visually to its audience. The packaging allowed the product to gain visibility in boutique retail environments and international markets where handcrafted visual identity carries weight.
          </p>
          <button class="back-btn" @click="goBack">← Back to Projects</button>
        </div>
  
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChitramPage',
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
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .image-gallery img {
    width: 120%;
    max-width: 900px;
    border-radius: 1rem;
    object-fit: cover;
    margin: auto;
  }
  
  .button-group {
    margin-top: 2rem;
    text-align: center;
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