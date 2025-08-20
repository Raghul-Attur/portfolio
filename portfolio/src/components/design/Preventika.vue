<template>
    <div class="project-wrapper">
      
      <div class="fullwidth-header">
        <img src="/images/design/Preventika-01.jpg" alt="Preventika Hero Image" />
        
      </div>

      <button class="back-btn" @click="goBack">← Back to Projects</button>
  
      <div class="project-body">
        <h1 class="project-title">Preventika</h1>
        <p class="project-subtitle">Branding & Packaging Design for Effervescent Hygiene Tablets</p>
  
        <div class="section">
          <h3>Overview</h3>
          <p>Preventika is a part of Sanmed’s product line that aims to introduce effervescent disinfectant tablets for domestic use. With the Indian market still new to such solutions, the branding and packaging were developed to create awareness, educate users, and present the product as a modern alternative to traditional disinfectants.</p>
        </div>
  
        <div class="section">
          <h3>Branding Objectives</h3>
          <p>The objective was to build a visual identity that reflects safety, clarity, and modernity. The branding focuses on household usability, distinguishing it from Sanmed’s industrial products. Elements like illustrative packaging, calming blue tones, and modern icons were used to drive familiarity and approachability.</p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/Preventika-02.jpg" alt="Preventika Logo Variations" />
          <img src="/images/design/Preventika-03.jpg" alt="Preventika Business Cards" />
          <img src="/images/design/Preventika-04.jpg" alt="Preventika Packaging" />
        </div>
  
        <div class="section">
          <h3>Design Thinking</h3>
          <p>The illustrative design approach was chosen to showcase real-life use cases and ease the learning curve for first-time users. This diverged from existing packaging styles in the Indian hygiene market, making the product appear unique, trustworthy, and approachable. Visual storytelling on the tube served as an instructional and branding tool.</p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/Preventika-05.jpg" alt="Preventika Billboard" />
          <img src="/images/design/Preventika-06.jpg" alt="Preventika Brand Collateral" />
          <img src="/images/design/Preventika-07.jpg" alt="Preventika Poster" />
        </div>
  
        <div class="section">
          <h3>Final Outcome</h3>
          <p>The brand was successfully launched with a cohesive identity across product packaging, marketing collateral, and outdoor advertising. Preventika stood out from conventional competitors by bringing a clean, science-forward aesthetic rooted in user empathy and modern design standards.</p>
          <button class="back-btn" @click="goBack">← Back to Projects</button>
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
export default {
  name: 'PreventikaPage',
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
    width: 80%;
    max-width: 800px;
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