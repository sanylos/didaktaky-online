<template>
  <div class="d-flex flex-row main align-items-center">
    <div class="rainbow_text_animated fs-1">
      <div class="d-flex flex-column align-items-center main-title" style="width:100vw">
        <span class="fw-bold">Moderní a efektivní příprava</span>
        <span>na přijímací zkoušky a maturitu</span>
      </div>
    </div>
    <div class="phone-mockup">
    </div>
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
  position: relative;
  z-index: 0;
  background: linear-gradient(to right, #6e17fa 0%, #8c39ff 33%, #6C33A3 66%, #812390 100%);
  width: 100vw;
  height: 100vh;
  animation: rainbow_animation 6s ease-in-out infinite;
  background-size: 400% 100%;
}

.main-title {
  z-index: 1;
}

.phone-mockup {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 50%;
  top: 0px;
  left: 45%;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/prijimacky-online-phone-mockup.png');
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