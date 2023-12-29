<template>
    <td>
        {{ answer.id }}
    </td>
    <td>
        <span v-if="answer.examType == 'PZ'">PŘIJÍMACÍ</span>
        <span v-if="answer.examType == 'MZ'">MATURITNÍ</span>
    </td>
    <td>
        {{ answer.exerciseType }}
    </td>
    <td>
        {{ answer.examSubject }}
    </td>
    <td>
        <span v-if="answer.isCorrect" class="fw-bold text-success">SPRÁVNĚ</span>
        <spam v-else class="fw-bold text-danger">ŠPATNĚ</spam>
        <i v-if="!answer.answered_at" style="font-size:12px"> (NEZODPOVĚZENO)</i>
    </td>
</template>

<script setup lang="ts">
defineProps({
    answer: Object
})
</script>

<style></style>