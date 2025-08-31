<template>
    <div class="name-banner">
        <h1 class="name-header">VIDEOS</h1>
      </div>
    <div>
      <VideoGallery :videoLinks="videos" />
    </div>
  </template>
  
  <script>
  import VideoGallery from "@/components/VideoGallery.vue";
  
  export default {
    name: "Video",
    components: { VideoGallery },
    data() {
      return {
        videos: [
          "https://youtu.be/LPFtsO1CuVQ",
          "https://youtu.be/32hKGUPsk7g",
          "https://youtu.be/KKN9RsGv2YY",
          "https://youtu.be/IxPqinGQR8o",
          "https://youtu.be/2S42BNMtn1M",
          "https://youtu.be/Sc5d1SZilLs?si=AyqjpxpYVRCXjk7h"

        ]
      };
    }
  };
  </script>
<style scoped>
.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    padding: 2rem;
    justify-items: center;
    align-items: start;
  }
  
  .video-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #000;
    transition: transform 0.3s ease;
  }
  
  .video-wrapper:hover {
    transform: scale(1.02);
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
    border-radius: 12px;
  }

  .name-banner {
  width: 100vw;
  margin-top: 50px;
  color: #000000;
  padding: 2rem 4rem;
  overflow-x: hidden;
}

.name-header {
  font-size: 100px;
  font-weight: 900;
  letter-spacing: 0.05em;
  margin: 0;
  text-align: left;
  line-height: 1;
}

/* 👇 Mobile overrides must come after the default styles */
@media (max-width: 768px) {
  .name-banner {
    padding: 1.5rem;
    text-align: center;
  }

  .name-header {
    font-size: 2.5rem;
    text-align: center;
    line-height: 1.2;
  }
}
</style>