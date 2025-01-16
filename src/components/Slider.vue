<template>
  <div class="slider-container" @click="handleClick($event)">
    <div class="slider-container" @keyup.left="prevTrack" @keyup.right="nextTrack" tabindex="0">
      <div
        class="slide"
        v-for="(track, index) in tracks"
        :key="track.id"
        v-show="currentIndex === index"
        :style="{
          backgroundImage: `url(${track.albumCoverUrl})`,
        }"
        @click.left="prevTrack"
        @click.right="nextTrack"
      >
        <div class="info">
          <h1>{{ track.title }}</h1>
          <h2>{{ track.artist }}</h2>
          <p>Regalo de <strong>{{ track.recommendedBy }}</strong></p>
          <blockquote>"{{ track.reason }}"</blockquote>
          <audio :src="track.previewUrl" controls autoplay></audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data() {
    return {
      tracks: [
        {
          id: 'xxx',
          title: 'Ya no te acuerdah',
          artist: 'Triple XXX',
          recomendedBy: 'Pres',
          readon: 'La M manda',
          previewUrl: '',
          albumCoverUrl: 'https://mp3.hhgroups.com/albumes/Triple-XXX-Primera-clase-31868_front.jpg'
        }
        // Aquí irán tus 40 canciones o las que sean, con su info
        // { id, title, artist, recommendedBy, reason, previewUrl, albumCoverUrl, etc. }
      ],
      currentIndex: 0
    }
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
    }
  }
}
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
  /* Transición suave */
  transition: opacity 0.8s ease-in-out;
}

.slide:not([v-show="true"]) {
  opacity: 0;
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
