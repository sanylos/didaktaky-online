<template>
    <td>
        {{ answer?.id }}
    </td>
    <td>
        <span v-if="answer?.examType == 'PZ'">PŘIJÍMACÍ</span>
        <span v-if="answer?.examType == 'MZ'">MATURITNÍ</span>
    </td>
    <td>
        {{ answer?.exerciseType }}
    </td>
    <td>
        {{ answer?.examSubject }}
    </td>
    <td>
        <span v-if="answer?.isCorrect" class="fw-bold text-success">SPRÁVNĚ</span>
        <spam v-else class="fw-bold text-danger">ŠPATNĚ</spam>
    </td>
    <td>
        <span v-if="answer?.answered_at" class="text-success">{{ getTimeRangeOfDate(answer?.generated_at, answer?.answered_at) }}s</span>
        <i v-else style="font-size:12px" class="text-danger"> NEZODPOVĚZENO</i>
    </td>
</template>

<script setup lang="ts">
defineProps({
    answer: Object
})

const getTimeRangeOfDate = (from: string, to: string) => {
    const startDate = new Date(from);
    const endDate = new Date(to);
    return ((endDate.getTime() - startDate.getTime()) / 1000).toString();
}
</script>

<style></style>