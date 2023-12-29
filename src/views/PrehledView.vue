<template>
    <div class="d-flex justify-content-center text-white">
        <div class="alert alert-danger" role="alert" v-if="!userStore.isLoggedIn">
            ❗ Pro zobrazení přehledu se musíš přihlásit!
        </div>
        <div v-else class="container d-flex flex-column">
            <div class="row my-2">

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📋 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">{{ answerCount }}</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📋 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">126</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📋 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">126</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📋 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">126</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

            </div>
            <div class="container rounded-3 bg-dark table-responsive">
                <div class="">
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
                            <tr v-for="answer, index in answers" :key="index">
                                <HistoryRecord :answer="answer"></HistoryRecord>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HistoryRecord from '@/components/Overview/HistoryRecord.vue'
import { useUserStore } from '@/stores/user';
import { supabase } from '@/supabase';
import { onMounted, onUpdated, onBeforeMount, ref, onBeforeUpdate, onServerPrefetch, onActivated } from 'vue';

const userStore = useUserStore();
const answerCount = ref(0);
const answers = ref();

const getData = async () => {

    //FETCH ANSWER COUNT
    const { count, error: countError } = await supabase
        .from('userAnswers')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userStore.id)
    if (countError) console.log(countError);
    else answerCount.value = count ? count : 0;

    //FETCH ANSWERS
    const { data, error: dataError } = await supabase
        .from('userAnswers')
        .select('*')
        .eq('user_id', userStore.id)
        .order('generated_at', { ascending: false })
        .limit(10);
    if (dataError) console.log(dataError);
    else answers.value = data;
    console.log(data);
}

const fetchData = () => {
    getData();
}

onMounted(() => {
    fetchData();
})
/*onUpdated(() => {
    fetchData();
})*/
</script>

<style></style>