<template>
    <div class="mx-1 my-3 fs-6 d-flex justify-content-between">
        <div><i class="bi bi-clock-history"></i> Historie</div>
        <div class="d-flex">
            <input type="checkbox" value="PZ" v-model="filter.examType" class="btn-check" id="option10" autocomplete="off"
                checked>
            <label class="btn btn-sm btn-outline-light me-1" for="option10">PZ</label>

            <input type="checkbox" value="MZ" v-model="filter.examType" class="btn-check" id="option20" autocomplete="off">
            <label class="btn btn-sm btn-outline-light me-1" for="option20">MZ</label>

            <div class="me-1">|</div>

            <input type="checkbox" value="CJL" v-model="filter.examSubject" class="btn-check" id="option6"
                autocomplete="off" checked>
            <label class="btn btn-sm btn-outline-light me-1" for="option6">CJL</label>

            <input type="checkbox" value="MAT" v-model="filter.examSubject" class="btn-check" id="option7"
                autocomplete="off">
            <label class="btn btn-sm btn-outline-light me-1" for="option7">MAT</label>

            <input type="checkbox" value="ANJ" v-model="filter.examSubject" class="btn-check" id="option8"
                autocomplete="off">
            <label class="btn btn-sm btn-outline-light" for="option8">ANJ</label>
        </div>
    </div>
    <div v-if="filteredAnswers.length">
        <div class="table-responsive">
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
                    <tr v-for="answer, index in filteredAnswers" :key="index">
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
                            <span v-if="answer?.answered_at" class="text-success">{{
                                getTimeRangeOfDate(answer?.generated_at,
                                    answer?.answered_at) }}s</span>
                            <i v-else style="font-size:12px" class="text-danger">NEZODPOVĚZENO</i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center mb-3 fs-6">
            <a href="javascript:;" @click="fetchMoreData">Zobrazit více</a>
        </div>
    </div>
    <div v-else class="text-secondary text-center fst-italic p-3 mb-3">Nebyla nalezena žádná data odpovídající
        zadaným filtrům</div>
</template>

<script setup lang="ts">
import { supabase } from '@/supabase';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, reactive, ref } from 'vue';

const userStore = useUserStore();
const answers: any = ref([]);
const pagination = ref(0);
const filter = reactive({
    examType: ['PZ', 'MZ'],
    examSubject: ['CJL', 'MAT', 'ANJ']
})

const filteredAnswers = computed(() => {
    return answers.value.filter((item: any) => filter.examSubject.includes(item.examSubject) && filter.examType.includes(item.examType))
})

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
        console.log(answers.value)
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