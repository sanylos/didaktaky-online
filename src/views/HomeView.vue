<template>
  <div class="d-flex flex-row main align-items-center">

    <div class="firstPart d-flex flex-column" style="height: 100vh; position:absolute; top:0px">

      <div class="rainbow_text_animated fs-1">
        <div class="d-flex flex-column main-title" style="width:100vw">

          <span class="fw-bold">Moderní a efektivní příprava</span>
          <span>na přijímací zkoušky a maturitu</span>

          <div class="d-flex flex-row justify-content-start">
            <button class="btn btn-dark bg-secondary-subtle shadow-lg rounded-5 my-3 mx-1 p-2">Začít procvičovat</button>
            <button class="btn btn-dark bg-secondary-subtle shadow-lg rounded-5 my-3 mx-1 p-2 w-auto px-3"
              @click="scrollPageDown()"><i class="bi bi-chevron-down"></i></button>

          </div>
        </div>

      </div>

      <div class="phone-mockup">
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useUserStore } from "@/stores/user"
import router from "@/router";
const scrollPageDown = () => {
  window.scrollTo({
    top: 5000,
    behavior: 'smooth',
  });
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');

.main {
  position: relative;
  z-index: 0;
  background: linear-gradient(to right, #6e17fa 0%, #8c39ff 33%, #6C33A3 66%, #812390 100%);
  width: 100vw;
  height: 200vh;
  animation: rainbow_animation 6s ease-in-out infinite;
  background-size: 400% 100%;
}

.firstPart {
  justify-content: center;
}

.main-title {
  justify-content: center;
  align-items: start;
  * {
    z-index: 1;
  }

  span,
  div {
    margin-left: 5rem;
    margin-right: 5rem;
  }

  .btn {
    width: 13rem;
    margin-right: 1rem;

    &:hover {
      color: darken($color: gray, $amount: 0);
    }
  }
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

@media only screen and (max-width: 600px) {
  .phone-mockup {
    visibility: hidden;
  }

  .main-title {
    align-items: center;
    margin: 0;
  }
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