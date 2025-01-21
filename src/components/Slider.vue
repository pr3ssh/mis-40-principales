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
      :style="{
        backgroundImage: `url(${track.image}), ${gradients[currentIndex]}`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    >
      <!-- Sección superior 80% -->
      <div class="slide-top">
        <div class="text-wrapper">
          <!-- Persona que recomienda -->
          <h2 class="message">{{ track.reason }}</h2>
          <!-- Mensaje o frase -->
          <p class="recommendedBy">{{ track.recommendedBy }}</p>
        </div>
      </div>

      <!-- Sección inferior 20% -->
      <div class="slide-bottom">
        <div class="info-wrapper">
          <div class="cover-wrapper">
            <img
              class="album-cover"
              :src="track.image"
              alt="Carátula del Álbum"
              v-if="track.image"
            />
            <img
              class="album-cover"
              src="https://picsum.photos/id/1015/200/300"
              alt="Carátula del Álbum"
              v-else
            />
          </div>
          <div class="info-wrapper-text">
            <h3 class="song-title">{{ track.name }}</h3>
            <h4 class="song-artist">{{ track.artist }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gradients from "../gradients.json";

let audioInstance = null;

export default {
  name: "Slider",
  props: {
    tracks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      gradients: gradients,
      currentIndex: 0,
      isPlaying: false,
    };
  },
  mounted() {
    // Para que reciba eventos de teclado al tener focus
    this.$el.focus();
    this.stopPreview();
    this.playPreview(this.tracks[this.currentIndex].previewUrl);
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

      this.stopPreview();
      this.playPreview(this.tracks[this.currentIndex].previewUrl);
    },
    prevTrack() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.tracks.length - 1;
      }

      this.stopPreview();
      this.playPreview(this.tracks[this.currentIndex].previewUrl);
    },
    playPreview(url) {
      audioInstance = new Audio(url);
      audioInstance.volume = 0.25;
      audioInstance
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((err) => {
          console.log("Cant play audio", err);
          this.isPlaying = false;
        });
    },
    stopPreview() {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance = null;
        this.isPlaying = false;
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
  flex: 0 0 calc(80vh - 24px);
  display: flex;
  align-items: center;
  padding: 12px;
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
  background-color: black;
  flex: 0 0 calc(20vh - 24px);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 1rem;
}

@media (min-width: 768px) {
  .slide-top {
    flex: 0 0 calc(80vh - 72px);
    padding: 36px;
  }

  .slide-bottom {
    flex: 0 0 calc(20vh - 72px);
    padding: 36px;
  }
}

.cover-wrapper {
  flex: 0 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
}

.album-cover {
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  width: 80px;
  height: 80px;
}

.info-wrapper {
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 1rem;
}

.info-wrapper-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.song-title {
  font-size: clamp(1rem, 2vw, 2rem);
  margin: 0;
}

.song-artist {
  font-size: clamp(0.8rem, 1vw, 1.5rem);
  margin: 0.3rem 0 0 0;
  font-weight: 300;
}
</style>
