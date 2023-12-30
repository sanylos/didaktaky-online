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
                            📑 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">{{ answerCount }}</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📃 Vyplněných testů</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">0</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📋 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">0</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6">
                    <div class="container p-3 bg-dark rounded-1 shadow">
                        <div class=" mb-1 fs-6">
                            📋 Vyplněných cvičení</div>
                        <div class="fs-3 d-flex flex-row justify-content-between">
                            <div class="">0</div><i class="bi bi-caret-up-fill text-success"></i>
                        </div>
                    </div>
                </div>

            </div>
            <div class="container rounded-3 bg-dark table-responsive">
                <HistoryTable></HistoryTable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HistoryTable from '@/components/Overview/HistoryTable.vue'
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
    if (count) answerCount.value = count;
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