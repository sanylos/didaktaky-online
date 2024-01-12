<template>
    <div v-if="message" class="alert alert-dismissible fade show" :class="'alert-'+type" role="alert">
        <i class="bi bi-info-circle-fill"></i>
        <span class="ms-2">{{ message }}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    message: String,
    type: String
})
</script>

<style></style>