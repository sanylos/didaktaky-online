<template>
  <div class="d-flex flex-column main align-items-center">

    <section class="purpleAnimatedBackground">
      <div class="d-flex flex-column justify-content-center mobileImageWrapper"
        style="height: 100vh; position: relative;">
        <div class="main-title fs-1" style="position: absolute;">
          <div class="fw-bold">Moderní a efektivní příprava</div>
          <div>na přijímací zkoušky a maturitu</div>
          <div class="d-flex flex-row justify-content-start">
            <button class="btn btn-dark bg-secondary-subtle shadow-lg rounded-5 my-3 mx-1 p-2"
              @click="router.push('/cviceni')">Začít procvičovat</button>
            <a class="btn btn-dark bg-secondary-subtle shadow-lg rounded-5 my-3 mx-1 p-2 w-auto px-3" href="#about"><i
                class="bi bi-chevron-down"></i></a>
          </div>
        </div>
        <img src="@/assets/prijimacky-online-phone-mockup.png" class="desktop">
        <div style="position: absolute; bottom: 10vh;"
          class="container-fluid d-flex align-items-center justify-content-start">
          <div class="mx-5" v-if="answeredExerciseCount">
            <span class="fs-1 fw-bold">{{ answeredExerciseCount }}</span><span class="fs-6"> vyplněných cvičení</span>
          </div>
          <div class="mx-5" v-if="submittedTestCount">
            <span class="fs-1 fw-bold">{{ submittedTestCount }}</span><span class="fs-6"> vyplněných testů</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="mt-5 mb-5" id="about">
        <div class="text-center mx-2">
          <div class="row d-flex align-items-center mx-1">

            <div class="col-sm-4 mb-3 mb-sm-0">
              <div class="card bg-secondary-subtle shadow-lg border-23 border-dark rounded-4">
                <div class="card-body">
                  <i class="bi bi-hdd-fill fs-1"></i>
                  <div class="fs-3 mb-2 fw-medium">Rozsáhlá databáze testů</div>
                  <p class="card-text">Procvičujte si autentické testy z minulých let, rozdělené podle předmětů nebo
                    variant.</p>
                  <a @click="router.push('/test')" class="btn btn-dark">Zkusit test</a>
                </div>
              </div>
            </div>
            <div class="col-sm-4 mb-3 mb-sm-0">
              <div class="card bg-secondary-subtle shadow-lg border-23 border-dark rounded-4">
                <div class="card-body">
                  <i class="bi bi-file-earmark-text-fill fs-1"></i>
                  <div class="fs-3 mb-2 fw-medium">Reálné zkouškové podmínky</div>
                  <p class="card-text">Naše cvičení simulují reálné zkoušky, abyste si osvojili potřebné znalosti a
                    dovednosti.</p>
                  <a @click="router.push('/cviceni')" class="btn btn-dark">Začít procvičovat</a>
                </div>
              </div>
            </div>
            <div class="col-sm-4 mb-3 mb-sm-0">
              <div class="card bg-secondary-subtle shadow-lg border-23 border-dark rounded-4">
                <div class="card-body">
                  <i class="bi bi-speedometer2 fs-1"></i>
                  <div class="fs-3 mb-2 fw-medium">Přehled pokroku</div>
                  <p class="card-text">Sledujte svůj vývoj a motivujte se k dosažení vašich cílů.</p>
                  <a @click="router.push('/prehled')" class="btn btn-dark">Zobrazit přehled</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/stores/user"
import router from "@/router";
import { supabase } from "@/supabase";
const scrollPageDown = () => {
  window.scrollTo({
    top: 750,
    behavior: 'smooth',
  });
}

const answeredExerciseCount = ref(0);
const submittedTestCount = ref(0);

const getCountOfAnsweredExercises = async () => {
  const { count, error } = await supabase
    .from('userAnswers')
    .select('*', { count: 'exact', head: true });
  if (error) console.log(error);
  else {
    if (count) answeredExerciseCount.value = count;
  }
}

const getCountOfSubmittedTests = async () => {
  const { count, error } = await supabase
    .from('userTests')
    .select('*', { count: 'exact', head: true });
  if (error) console.log(error);
  else {
    if (count) submittedTestCount.value = count;
  }
}

onMounted(() => {
  getCountOfAnsweredExercises();
  getCountOfSubmittedTests();
})

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');

* {
  scroll-behavior: smooth;
}

section {
  width: 100vw;
}

//Makes the purple animation effect overflow the background image
.mobileImageWrapper {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url('@/assets/home-page-desktop-background.jpg');
    background-size: cover;
    opacity: 0.2;
  }
}

.purpleAnimatedBackground {
  z-index: 0;
  position: relative;
  background: linear-gradient(to right, #6e17fa 0%, #8c39ff 33%, #6C33A3 66%, #812390 100%);
  animation: rainbow_animation 6s ease-in-out infinite;
  background-size: 400% 100%;

  img {
    position: absolute;
    left: 50%;
    height: 100vh;
  }
}

.main-title {
  justify-content: center;
  align-items: start;

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

@media only screen and (max-width: 600px) {

  .main-title {

    span,
    div {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }

    margin: 0;
  }

  .desktop {
    visibility: hidden;
  }

  .mobileImageWrapper {
    &::before {
      background-image: url('@/assets/home-page-mobile-background.jpg');
    }
  }

}

@keyframes rainbow_animation {

  0%,
  100% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 0;
  }
}</style>
