<template>
  <div class="text-white">
    <div class="rainbow_text_animated text-center fs-1">DIDAKTAKY-ONLINE</div>
    <div class="text-center fs-5">Moderní a efektivní příprava na přijímací zkoušky a maturitu</div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useUserStore } from "@/stores/user"
import router from "@/router";


</script>

<style>
.rainbow_text_animated {
  background: linear-gradient(to right, #6e17fa 0%, #8c39ff 33%, #6C33A3 66%, #812390 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbow_animation 6s ease-in-out infinite;
  background-size: 400% 100%;
}

@keyframes rainbow_animation {

  0%,
  100% {
    background-position: 0 0;
  }

  25% {
    background-position: 100% 0;
  }
}
</style>