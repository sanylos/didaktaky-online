<template>
  <LoginModal></LoginModal>
  <nav class="navbar fixed-top navbar-expand-lg bg-secondary-subtle">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click="router.push('/')">🧠 DIDAKTAKY-ONLINE</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item mx-1">
            <RouterLink to="/cviceni" class="nav-link">
              <i class="bi bi-shuffle"></i> Náhodné cvičení
            </RouterLink>
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/prehled" class="nav-link">
              <i class="bi bi-bar-chart"></i> Přehled
            </RouterLink>
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/test" class="nav-link">
              <i class="bi bi-gear"></i> Generování testů
            </RouterLink>
          </li>
        </ul>

        <div class="d-flex">
          <a class="bg-dark rounded rounded-pill btn btn-secondary btn-outline-secondary text-white px-3 mx-1"
            href="https://www.buymeacoffee.com/sanyl"><i class="bi bi-cup-hot-fill"></i> PODPORA PROJEKTU</a>

          <button v-if="!userStore.isLoggedIn" type="button" class="btn btn-light rounded-pill px-3 mx-1"
            data-bs-toggle="modal" data-bs-target="#loginModal"><i class="bi bi-person-lock"></i> Přihlásit se</button>

          <div v-if="userStore.isLoggedIn" class="dropdown mx-1">
            <button class="text-white bg-dark rounded rounded-pill btn-secondary btn btn-outline-secondary px-3"
              type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="bi bi-person-check"></i> {{ userStore.email }}</span>
            </button>
            <ul class="dropdown-menu">
              <li><a @click="userStore.signOut" class="dropdown-item text-danger" href="#">Odhlásit se</a></li>
            </ul>
          </div>
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
import router from '@/router';
const userStore = useUserStore();
</script>

<style scoped lang="scss">
nav {
  z-index: 999;
}
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