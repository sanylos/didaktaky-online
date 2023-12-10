<template>
    <div class="app-container">
        <Navbar />
        <RouterView />
        <div class="footer">
            <a href="https://www.buymeacoffee.com/sanyl">PODPORA PROJEKTU</a>
        </div>
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

.footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 1rem;
}
</style>
