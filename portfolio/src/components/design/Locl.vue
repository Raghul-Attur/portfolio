<template>
    <div class="project-wrapper">
      <div class="fullwidth-header">
        <img src="/images/design/locl-01.jpg" alt="LOCL Billboard Ad" />
      </div>
  
      <div class="project-body">
        <button class="back-btn" @click="$router.push('/design')">← Back to Projects</button>
        <h1 class="project-title">LO.CL – Contextual Social Advertising</h1>
        <p class="project-subtitle">Ad Campaign for Hyperlocal Event Discovery App</p>
  
        <div class="section">
          <h3>Overview</h3>
          <p>
            LO.CL is a location-based social platform designed to connect users to nearby events, places, and shared experiences. The branding campaign focused on visually portraying how the app enhances everyday decisions—whether it's finding a great cycling route, a new café, or what's trending around you. Each visual was crafted to capture moments of curiosity, exploration, and spontaneity.
          </p>
        </div>
  
        <div class="section">
          <h3>Visual Strategy</h3>
          <p>
            The designs use strong principles of contrast, emphasis, and balance to grab attention in both print and digital settings. Center-aligned compositions, UI overlays, and natural color gradients keep the visuals realistic while still feeling modern and dynamic. Each ad reimagines common social search behaviors like "near me" in a way that invites users into the LO.CL experience.
          </p>
        </div>
  
        <div class="section image-gallery">
          <img src="/images/design/locl-02.jpg" alt="Newspaper Ad – Content Discovery" />
          <img src="/images/design/locl-03.jpg" alt="Social Feed Poster – Dining Discovery" />
          <img src="/images/design/locl-04.jpg" alt="Magazine Ad – Coffee Culture" />
        </div>
  
        <div class="section">
          <h3>Campaign Applications</h3>
          <p>
            The campaign was designed for multi-channel presence—targeting college students, urban explorers, foodies, and nightlife lovers. Ads were customized for formats like bus stop shelters, newspaper spreads, magazine columns, and digital banners. UI elements from the app were embedded into real-world photos to blur the boundary between discovery and reality.
          </p>
        </div>
  
        <div class="section">
          <h3>Design Rationale</h3>
          <p>
            The choice of minimal typography, intuitive flow, and lifestyle-centric imagery makes the LO.CL brand feel both personal and social. Each visual is guided by behavioral insights: cycling routes for fitness enthusiasts, coffee stains for casual explorers, and newsprint ads for avid readers. The mix of mobile UI, candid moments, and search interactions reinforces the idea of LO.CL being your intuitive companion for nearby experiences.
          </p>
          <button class="back-btn" @click="$router.push('/design')">← Back to Projects</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoclPage'
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
    width: 100%;
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