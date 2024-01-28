<template>
  <div class="d-flex flex-row main">
    <div class="rainbow_text_animated text-center fs-1">
      <div class="d-flex flex-column">
        <span class="fw-bold">Moderní a efektivní příprava</span>
        <span>na přijímací zkoušky a maturitu</span>
      </div>
    </div>
    <div class="text-white">cs</div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useUserStore } from "@/stores/user"
import router from "@/router";


</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

.main {
  background: linear-gradient(to right, #6e17fa 0%, #8c39ff 33%, #6C33A3 66%, #812390 100%);
  width: 100vw;
  height: 100vh;
  animation: rainbow_animation 6s ease-in-out infinite;
  background-size: 400% 100%;
}

/*.rainbow_text_animated {
  font-family: 'Roboto';
  background: linear-gradient(to right, #6e17fa 0%, #8c39ff 33%, #6C33A3 66%, #812390 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbow_animation 6s ease-in-out infinite;
  background-size: 400% 100%;
}*/

@keyframes rainbow_animation {

  0%,
  100% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 0;
  }
}
</style>