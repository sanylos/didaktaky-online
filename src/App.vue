<template>
    <div class="app-container">
        <Navbar />
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';
</script>

<style scoped>
.app-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
