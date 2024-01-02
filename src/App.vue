<script setup>
import {onMounted, ref} from "vue";

const backgroundMusic = ref(null);

onMounted(() => {
  if (backgroundMusic.value) {
    backgroundMusic.value.play().catch(e => {
      console.error("Audio playback failed:", e);
    });
  }
});
</script>

<template>
  <audio ref="backgroundMusic" loop autoplay hidden>
    <source src="../static/epic-hollywood-trailer-9489.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <router-view></router-view>
</template>

<style scoped>
</style>
