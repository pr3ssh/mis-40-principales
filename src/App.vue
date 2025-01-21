<template>
  <div>
    <div v-if="!hasClicked && tracks" class="welcome-container">
      <div class="mosaic-container">
        <div
           class="mosaic-item"
           v-for="(track, index) in tracks"
           :key="index"
           >
           <img v-if="track.image" :src="track.image" alt="Mosaic Image" />
           <img v-else src="https://picsum.photos/id/1015/200/300" alt="Mosaic Image" />
        </div>
          <div class="overlay"></div>
      </div>
      <div class="welcome-content">
        <h1>Mis 40 Principales</h1>
        <p>Un viaje por la música que ha marcado tu vida (por ahora)</p>
        <button @click="activateSound">Comenzar</button>
      </div>
    </div>

    <Slider
      v-else
      :tracks="tracks"
    />
  </div>
</template>

<script>
import Slider from './components/Slider.vue';
import tracks from "./tracks.json";

export default {
  name: 'App',
  components: {
    Slider
  },
  data() {
    return {
      tracks: tracks,
      hasClicked: false,
    };
  },
  methods: {
    activateSound() {
      // Hacemos un pequeño playback vacío para "desbloquear" el sonido
      const silentAudio = new Audio();
      silentAudio.play().catch(() => {
        /* ignorar error */
      });

      this.hasClicked = true;
    }
  }
};
</script>

<style>
.welcome-container {
  background-color: white;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mosaic-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 0px;
}
.mosaic-item {
  position: relative;
  overflow: hidden;
}
.mosaic-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 10% 80%,
    rgba(0, 0, 0, 0.75) 20%,   /* Transparente en el 20% central */
    rgba(0, 0, 0, 0.85) 60%, /* Transición a un gris oscuro */
    rgba(0, 0, 0, 0.95) 100% /* Acaba en negro más opaco */
  );
  pointer-events: none;
  z-index: 5;
}
.welcome-content {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 4rem;
  z-index: 10;
  color: #fff;
}
.welcome-content h1 {
  margin-block-end: 10px;
}
.welcome-content button {
  background-color: black;
  color: white;
  border: 2px solid black;
  border-radius: 4px;
  width: 200px;
  height: 50px;
}
.welcome-content button:hover {
  border: 2px solid white;
}
</style>
