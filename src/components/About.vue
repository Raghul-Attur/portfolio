<template>
    <div class="name-banner">
      <h1 class="name-header">ABOUT ME</h1>
    </div>
  
    <div class="intro-section">
      <h2>Full Stack Developer | UX-Focused Engineer | AWS + Azure | Accessibility Advocate</h2>
      <p>
How you doing? I'm Raghul. 

I'm pursuing a Master's in Information Technology at Monash Uni and am on track to graduate by September 2025.

To Hiring Managers: 

I'm a skilled, versatile, and creative IT professional who is passionate about all things tech and eager to provide solutions that help things run smoothly. 

I bring solid foundational skills in IT, combined with a background in design and communication, to create highly functional products with an eye for detail on the design front. 

Previously, I have worked as a Senior Graphic Designer and Motion Designer at Smitten Worldwide, servicing 10+ brands like JW Marriott, Westin, Mount Sinai, Funskool, and Monsoon Harvest to name a few.

I keep myself inspired through photography and filmmaking. In my free time, you can find me playing tennis, watching films at Palace Cinemas, and cooking my grandma's recipes.
      </p>
    </div>
  
    <div></div>
  </template>
    
  <script>
  
  </script>
    
    <style scoped>
  
    .client-strip h4 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 1.5rem;
      color: #333;
    }
  
    .name-banner {
      width: 100%;
      margin-top: 50px;
      color: #000000;
      padding: 2rem 4rem;
      overflow-x: hidden;
    }
    
    .name-header {
      font-size: 200px;
      font-weight: 900;
      letter-spacing: 0.05em;
      margin: 0;
      text-align: left;
      line-height: 1;
      word-break: break-word;
    }
  
    .intro-section {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1.5rem;
    text-align: center;
    font-family: 'Arial', sans-serif;
    color: #333;
  }
  
  .intro-section h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .intro-section p {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
    
    .portfolio-sections {
      display: flex;
      width: 100vw;
      height: 85vh;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    
    .section-tile {
      flex: 1;
      text-decoration: none;
      color: white;
      transition: flex 0.4s ease;
      min-width: 0;
    }
    
    .section-tile:hover {
      flex: 2;
    }
    
    .section-content {
      height: 100%;
      background-size: cover;
      background-position: center;
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      padding: 20px;
    }
    
    .overlay {
      background: rgba(0, 0, 0, 0.6);
      padding: 1rem;
      border-top: 1px solid white;
    }
    
    .section-index {
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 2px;
    }
    
    .section-label {
      font-size: 1.3rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 0.3rem;
      letter-spacing: 2px;
    }
    
    /* === Responsive Styles === */
    @media (max-width: 768px) {
      .name-banner {
        padding: 1rem 1.5rem;
        margin-top: 40px;
      }
    
      .name-header {
        font-size: 8vw;
        text-align: center;
      }
    
      .portfolio-sections {
        flex-direction: column;
        height: auto;
      }
    
      .section-tile {
        flex: none;
        height: 30vh;
      }
    }
    
    @media (max-width: 480px) {
      .name-header {
        font-size: 10vw;
      }
    
      .section-tile {
        height: 25vh;
      }
    
      .section-label {
        font-size: 1rem;
      }
    }
  
    .client-strip {
    overflow: hidden;
    width: 100%;
    background: #f9f9f9;
    padding: 2rem 0;
    margin-top: 100px;
  }
  
  .logo-track {
    display: flex;
    width: max-content;
    animation: scroll-left 30s linear infinite;
    gap: 3rem;
    align-items: center;
    padding-inline: 2rem;
  }
  
  .client-logo {
    height: 60px;
    width: auto;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.9;
    transition: transform 0.3s ease;
  }
  
  .client-logo:hover {
    transform: scale(1.05);
    filter: grayscale(0%);
    opacity: 1;
  }
  
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  /* Make responsive on small screens */
  @media (max-width: 768px) {
    .client-logo {
      height: 40px;
    }
  
    .logo-track {
      gap: 1.5rem;
      animation-duration: 20s;
    }
  }
    </style>