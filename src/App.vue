<template>
    <div class="app-container bg-dark-subtle" data-bs-theme="dark">
        <Navbar />
        <RouterView class="current-page"/>
        <div class="footer mt-1">
            <a href="https://www.buymeacoffee.com/sanyl">PODPORA PROJEKTU</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';
import { useUserStore } from './stores/user';
import { onBeforeMount, onMounted } from 'vue';

const userStore = useUserStore();

onMounted(async () => {
    await userStore.initialize();
})

</script>

<style scoped>
.current-page {
    margin-top: 50px;
}
.app-container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
}

.footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
