<template>
    <div class="app-container">
        <Navbar />
        <RouterView />
        <div class="footer mb-1">
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
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
