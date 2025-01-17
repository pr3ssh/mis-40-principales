<template>
  <div
    class="slider-container"
    @keyup.left="prevTrack"
    @keyup.right="nextTrack"
    @click.prevent="handleClick($event)"
    tabindex="0"
  >
    <div
      class="slide"
      v-for="(track, index) in tracks"
      v-show="index === currentIndex"
      :key="track.name"
      :style="{ background: gradients[currentIndex % gradients.length] }"
    >
      <!-- Sección superior 80% -->
      <div class="slide-top">
        <div class="text-wrapper">
          <!-- Persona que recomienda -->
          <h2 class="message">{{ track.message }}</h2>
          <!-- Mensaje o frase -->
          <p class="recommendedBy">{{ track.recommendedBy }}</p>
        </div>
      </div>

      <!-- Sección inferior 20% -->
      <div class="slide-bottom">
        <div class="cover-wrapper">
          <img
            class="album-cover"
            :src="track.image"
            alt="Carátula del Álbum"
            v-if="track.image"
          />
        </div>
        <div class="info-wrapper">
          <h3 class="song-title">{{ track.name }}</h3>
          <h4 class="song-artist">{{ track.artist }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tracks from "../tracks.json";
import gradients from "../gradients.json";

export default {
  name: "Slider",
  data() {
    return {
      tracks: tracks,
      currentIndex: 0,
      gradients: gradients,
    };
  },
  mounted() {
    // Para que reciba eventos de teclado al tener focus
    this.$el.focus();
  },
  methods: {
    handleClick(e) {
      if (e.clientX < window.innerWidth / 2) {
        this.prevTrack();
      } else {
        this.nextTrack();
      }
    },
    nextTrack() {
      if (this.currentIndex < this.tracks.length - 1) {
        this.currentIndex++;
      } else {
        // Si quieres que sea cíclico
        this.currentIndex = 0;
      }
    },
    prevTrack() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        // Si quieres que sea cíclico
        this.currentIndex = this.tracks.length - 1;
      }
    },
  },
};
</script>

<style scoped>
.slider-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  outline: none; /* para el focus() */
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slide {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  text-align: left;
  color: #fff;
  outline: none;
  opacity: 1;
}

.slide-top {
  flex: 0 0 80%;
  display: flex;
  align-items: center;
  padding: 2vw;
}

.text-wrapper {
  width: 100%;
  margin: 1rem;
}

.person {
  font-size: clamp(1.5rem, 5vw, 4rem);
  margin: 0;
}

.message {
  font-size: clamp(1rem, 4vw, 2.5rem);
  line-height: 1.2;
  margin-top: 1rem;
}

.slide-bottom {
  flex: 0 0 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1vw;
  gap: 1rem;
}

.cover-wrapper {
  flex: 0 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
}

.album-cover {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.song-title {
  font-size: clamp(1rem, 3vw, 2rem);
  margin: 0;
}

.song-artist {
  font-size: clamp(0.8rem, 2vw, 1.5rem);
  margin: 0.3rem 0 0 0;
  font-weight: 300;
  opacity: 0.9;
}
</style>
