<template>
    <table class="table table-dark table-hover">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">TYP ZKOUŠKY</th>
                <th scope="col">TYP CVIČENÍ</th>
                <th score="col">PŘEDMĚT</th>
                <th scope="col">ZODPOVĚZENO</th>
                <th scope="col">ČAS</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="answer, index in data" :key="index">
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
                    <span v-else class="fw-bold text-danger">ŠPATNĚ</span>
                </td>
                <td>
                    <span v-if="answer?.answered_at" class="text-success">{{ getTimeRangeOfDate(answer?.generated_at,
                        answer?.answered_at) }}s</span>
                    <i v-else style="font-size:12px" class="text-danger"> NEZODPOVĚZENO</i>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
defineProps({
    data: Array as any
})

const getTimeRangeOfDate = (from: string, to: string) => {
    const startDate = new Date(from);
    const endDate = new Date(to);
    return ((endDate.getTime() - startDate.getTime()) / 1000).toString();
}
</script>

<style></style>