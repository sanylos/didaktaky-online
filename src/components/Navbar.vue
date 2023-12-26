<template>
  <LoginModal></LoginModal>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">🧠  DIDAKTAKY-ONLINE</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item mx-1">
            <RouterLink to="/" class="nav-link">
              🎲 Náhodné cvičení
            </RouterLink>
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/prehled" class="nav-link">
              🔎 Přehled
            </RouterLink>
          </li>
          <li class="nav-item mx-1">
            <a class="nav-link disabled" aria-disabled="true">🔧 Generování testů</a>
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/addExercise" class="nav-link">
              + Přidat cvičení
            </RouterLink>
          </li>
        </ul>

        <a class="me-3 bg-dark rounded rounded-pill btn btn-secondary btn-outline-secondary text-white"
          href="https://www.buymeacoffee.com/sanyl">☕ PODPORA PROJEKTU</a>

        <button v-if="!userStore.isLoggedIn" type="button" class="btn btn-outline-light" data-bs-toggle="modal"
          data-bs-target="#loginModal">🔑 Přihlásit se</button>

        <div v-if="userStore.isLoggedIn" class="dropdown mx-1">
          <button class="userInfo text-white bg-dark rounded rounded-pill btn-secondary btn row btn-outline-secondary"
            type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span>👤 {{ userStore.email }}</span>
          </button>
          <ul class="dropdown-menu">
            <li><a @click="userStore.signOut" class="dropdown-item text-danger" href="#">Odhlásit se</a></li>
          </ul>
        </div>

      </div>
    </div>
  </nav>
</template>
  
<script setup lang="ts">
// @ts-nocheck
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import LoginModal from './LoginModal.vue';
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.nav-link {
  text-decoration: none;

  &:hover {
    background-color: rgba(128, 128, 128, 0.056);
    border-radius: 10px;
    color: rgb(255, 255, 255);
  }
}

.userInfo span:hover {
  color: gray;
}

.router-link-active {
  background-color: rgba(128, 128, 128, 0.192);
  border-radius: 10px;
}
</style>