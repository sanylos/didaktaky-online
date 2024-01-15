<template>
    <div v-if="props.isLoading" class="d-flex justify-content-center p-5 text-white">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    isLoading: Boolean
})
</script>

<style></style>