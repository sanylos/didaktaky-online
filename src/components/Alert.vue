<template>
    <div v-if="message" class="alert alert-dismissible fade show" :class="'alert-'+type" role="alert">
        <i v-if="type=='info'" class="bi bi-info-circle-fill"></i>
        <i v-if="type=='danger'" class="bi bi-exclamation-circle-fill"></i>
        <i v-if="type=='success'" class="bi bi-check-circle-fill"></i>
        <i v-if="type=='warning'" class="bi bi-exclamation-triangle-fill"></i>
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