<template>
  <div
    class="slider-container"
    @keyup.left="prevTrack"
    @keyup.right="nextTrack"
    @click="handleClick($event)"
    tabindex="0"
  >
    <div
      class="slide"
      v-for="(track, index) in tracks"
      :key="track.title"
      v-show="currentIndex === index"
      :style="{
        backgroundImage: `url(${track.image})`,
      }"
      @click.left="prevTrack"
      @click.right="nextTrack"
    >
      <div class="info">
        <h1>{{ track.name }}</h1>
        <h2>{{ track.artist }}</h2>
        <p>
          Regalo de <strong>{{ track.recommendedBy }}</strong>
        </p>
        <blockquote>"{{ track.reason }}"</blockquote>
        <audio :src="track.audio" controls autoplay></audio>
      </div>
    </div>
  </div>
</template>

<script>

import tracks from '../tracks.json';

export default {
  name: "Slider",
  data() {
    return {
      tracks: tracks,
      currentIndex: 0,
    };
  },
  mounted() {
    // Para que el componente tenga focus y reciba eventos de teclado:
    this.$el.focus();
  },
  methods: {
    handleClick(event) {
      if (event.clientX < window.innerWidth / 2) {
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
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 1;
  /* Transición suave */
  transition: opacity 0.8s ease-in-out;
}

.slide:not([v-show="true"]) {
  opacity: 1;
  pointer-events: none;
}

/* info: para agrupar texto y audio */
.info {
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  border-radius: 8px;
  text-align: center;
}
</style>
