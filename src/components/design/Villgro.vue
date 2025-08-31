<template>
    <div class="project-wrapper">
      <div class="fullwidth-header">
        <img src="/images/design/Villgro-01.jpg" alt="Villgro Hero Image" />
      </div>
  
      <div class="project-body">
        <button class="back-btn" @click="$router.push('/design')">← Back to Projects</button>
        <h1 class="project-title">Villgro – iPitch 2021</h1>
        <p class="project-subtitle">Social Impact Campaign for Inclusive Entrepreneurship Funding</p>
  
        <div class="section">
          <h3>Overview</h3>
          <p>
            Villgro's iPitch campaign in 2021 aimed to scale funding accessibility for social entrepreneurs across India. The initiative involved several funding partners, each targeting sectors like education, agriculture, clean tech, and more. The task was to create a social media campaign that communicated credibility, sector diversity, and urgency for application—all while being cohesive and easily shareable.
          </p>
        </div>
  
        <div class="section">
          <h3>Design Strategy</h3>
          <p>
            I developed a modular identity system using abstract geometric icons to represent core sectors (e.g., leaves for agriculture, crosses for health, books for education). Each color block followed a grid-based system, allowing flexibility across social formats while maintaining brand consistency. Vibrant, flat colors and clean typography ensured legibility and impact across platforms like Instagram and LinkedIn.
          </p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/Villgro-02.jpg" alt="Color-coded Campaign Variants" />
          <img src="/images/design/Villgro-03.jpg" alt="Instagram Story Mockup" />
        </div>
  
        <div class="section">
          <h3>Execution</h3>
          <p>
            The campaign included hero posts, thematic partner posts, and calls to action. Each post reused the visual system with variations in color and icon placement to highlight different focus areas. The result was a scroll-stopping, high-recall visual system optimized for digital attention spans.
          </p>
        </div>
  
        <div class="section">
          <h3>Impact</h3>
          <p>
            The visual consistency and modular grid system allowed the campaign to scale quickly across posts and stories. Engagement increased due to clarity and recognizable visual rhythm. The campaign helped establish iPitch 2021 as a modern, inclusive, and credible initiative for social good.
          </p>
          <button class="back-btn" @click="$router.push('/design')">← Back to Projects</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VillgroPage'
  }
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
  
  .back-btn {
    margin-bottom: 2rem;
    font-size: 1rem;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--text-muted);
  }
  </style>