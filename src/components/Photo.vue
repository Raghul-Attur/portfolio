<template>
  <div class="name-banner">
        <h1 class="name-header">PHOTOGRAPHY</h1>
      </div>
  <div :id="galleryID" class="gallery-grid">
    <a
      v-for="(image, key) in imagesData"
      :key="key"
      :href="image.largeURL"
      :data-pswp-width="image.width"
      :data-pswp-height="image.height"
      target="_blank"
      rel="noreferrer"
    >
      <div class="thumbnail">
        <img :src="image.thumbnailURL" loading="lazy" alt="" />
      </div>
    </a>
  </div>
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export default {
  name: 'PhotoGallery',
  data() {
    return {
      imagesData: []
    };
  },
  mounted() {
    const imageCount = 47;
    const imagePromises = [];

    for (let i = 1; i <= imageCount; i++) {
      const url = `/images/photo/${i}.jpg`;
      imagePromises.push(this.loadImageDimensions(url));
    }

    Promise.all(imagePromises).then((loadedImages) => {
      // Randomize the order
      this.imagesData = loadedImages.sort(() => Math.random() - 0.5);

      // Initialize PhotoSwipe
      this.initLightbox();
    });
  },
  beforeUnmount() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
  props: {
    galleryID: {
      type: String,
      default: 'photo-gallery'
    }
  },
  methods: {
    loadImageDimensions(src) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            largeURL: src,
            thumbnailURL: src,
            width: img.naturalWidth,
            height: img.naturalHeight
          });
        };
        img.src = src;
      });
    },
    initLightbox() {
      if (!this.lightbox) {
        this.lightbox = new PhotoSwipeLightbox({
          gallery: '#' + this.galleryID,
          children: 'a',
          pswpModule: () => import('photoswipe'),
        });
        this.lightbox.init();
      }
    }
  }
};
</script>

<style scoped>
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
}

.photo-grid img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s;
}

.photo-grid img:hover {
  transform: scale(1.05);
}

#photo-gallery {
  column-count: 4;
  column-gap: 1rem;
  padding: 1rem;
}

#photo-gallery a {
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;
  break-inside: avoid;
}

#photo-gallery img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  transition: transform 0.2s ease-in-out;
}

#photo-gallery img:hover {
  transform: scale(1.02);
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