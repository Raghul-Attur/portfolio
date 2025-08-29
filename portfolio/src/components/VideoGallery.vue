<template>
    <div class="video-grid">
      <div
        v-for="(video, index) in shuffledVideos"
        :key="index"
        class="video-wrapper"
      >
        <iframe
          :src="`https://www.youtube.com/embed/${extractVideoID(video)}`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "VideoGallery",
    props: {
      videoLinks: {
        type: Array,
        required: true
      }
    },
    computed: {
      shuffledVideos() {
        return [...this.videoLinks].sort(() => Math.random() - 0.5);
      }
    },
    methods: {
      extractVideoID(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : "";
      }
    }
  };
  </script>
  
  <style scoped>
  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(720px, 1fr));
    gap: 2rem;
    padding: 2rem;
  }
  
  .video-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>