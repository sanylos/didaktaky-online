<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">DIDAKTAKY-ONLINE</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">
              Náhodné cvičení
            </RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Generování testů</a>
          </li>
        </ul>
        <button v-if="!userStore.isLoggedIn" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#loginModal">Přihlásit se</button>
        <button v-if="userStore.isLoggedIn" @click="userStore.signOut" type="button" class="btn btn-outline-danger">Odhlásit se</button>
      </div>
    </div>
  </nav>
</template>
  
<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
</script>

<style scoped>
.nav-link {
  text-decoration: none;
}
</style>