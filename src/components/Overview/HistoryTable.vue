<template>
    <table class="table table-dark table-hover">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">TYP ZKOUŠKY</th>
                <th scope="col">TYP CVIČENÍ</th>
                <th score="col">SKUPINA CVIČENÍ</th>
                <th score="col">PŘEDMĚT</th>
                <th scope="col">ZODPOVĚZENO</th>
                <th scope="col">ČAS</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="answer, index in answers" :key="index">
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
                    {{ answer?.exerciseGroup }}
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
                    <i v-else style="font-size:12px" class="text-danger">NEZODPOVĚZENO</i>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="d-flex justify-content-center mb-3 fs-6">
        <a href="javascript:;" @click="fetchMoreData">Zobrazit více</a>
    </div>
</template>

<script setup lang="ts">
import { supabase } from '@/supabase';
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const answers: any = ref([]);
const pagination = ref(0);

const fetchMoreData = async () => {
    const { data, error: dataError } = await supabase
        .from('userAnswers')
        .select('*')
        .eq('user_id', userStore.id)
        .order('generated_at', { ascending: false })
        .range(pagination.value, pagination.value + 9)
    if (dataError) console.log(dataError);
    else {
        answers.value.push(...data);
        pagination.value += 10;
    }
}

const getTimeRangeOfDate = (from: string, to: string) => {
    const startDate = new Date(from);
    const endDate = new Date(to);
    return ((endDate.getTime() - startDate.getTime()) / 1000).toString();
}

onMounted(() => {
    fetchMoreData();
})
</script>

<style></style>